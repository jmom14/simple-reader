import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { User } from '../../app/services/auth'
import type { RootState } from '../../app/store'

type AuthState = {
  user: User | null
  token: string | null
}

const slice = createSlice({
  name: 'auth',
  initialState: { user: null, token: localStorage.getItem('token') || null } as AuthState,
  reducers: {
    setCredentials: (state, { payload: { user, token } }: PayloadAction<{ user: User; token: string }>) => {
      state.user = user
      state.token = token
      localStorage.setItem('token', token);
    },
    removeCredentials: (state) => {
      state.user = null;
      state.token = null;
      localStorage.removeItem('token');
    }
  },
})

export const { setCredentials, removeCredentials } = slice.actions

export default slice.reducer

export const selectCurrentUser = (state: RootState) => state.auth.user
