import { configureStore } from '@reduxjs/toolkit'
import authReducer from "../features/auth/authSlice";
import { authApi } from './services/auth';
import { usersApi } from './services/users';
import { readingsApi } from './services/readings';

export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    [usersApi.reducerPath]: usersApi.reducer,
    [readingsApi.reducerPath]: readingsApi.reducer,
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware()
    .concat(authApi.middleware)
    .concat(usersApi.middleware)
    .concat(readingsApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;
