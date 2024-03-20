import { configureStore } from '@reduxjs/toolkit'
import authReducer from "../features/auth/authSlice";
import { authApi } from './services/auth';
import { usersApi } from './services/users';

export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    [usersApi.reducerPath]: usersApi.reducer,
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(authApi.middleware).concat(usersApi.middleware),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;
