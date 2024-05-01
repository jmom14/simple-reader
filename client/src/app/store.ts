import { configureStore } from '@reduxjs/toolkit'
import authReducer from "../features/auth/authSlice";
import { authApi } from './services/auth';
import { usersApi } from './services/users';
import { readingsApi } from './services/readings';
import { highglightsApi } from './services/highlights';
import { notesApi } from './services/notes';
import { translateApi } from './services/translate';

export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    [usersApi.reducerPath]: usersApi.reducer,
    [readingsApi.reducerPath]: readingsApi.reducer,
    [highglightsApi.reducerPath]: highglightsApi.reducer,
    [notesApi.reducerPath]: notesApi.reducer,
    [translateApi.reducerPath]: translateApi.reducer,
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware()
    .concat(authApi.middleware)
    .concat(usersApi.middleware)
    .concat(readingsApi.middleware)
    .concat(highglightsApi.middleware)
    .concat(translateApi.middleware)
    .concat(notesApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;
