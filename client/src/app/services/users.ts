import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { RootState } from '../store';
import { HOST, baseQueryInterceptor } from './interceptor';

const baseQuery = fetchBaseQuery({
  baseUrl: `${HOST}/api/users/`,
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth.token || localStorage.getItem("token");
    if (token) {
      headers.set('authorization', `Bearer ${token}`)
    }
    return headers
  },
});

export const usersApi = createApi({
  reducerPath: 'usersAPI',
  baseQuery: (args, api, extra) => baseQueryInterceptor(args, api, extra, baseQuery),
  endpoints: (builder) => ({
    getUser: builder.query<any, void>({
      query: () => '/me/',
    }),
    updateUser: builder.mutation<any, any>({
      query: (request) => {
        const { id, data } = request;
        return {
          url: `${id}/`,
          method: 'PUT',
          body: data,
        }
      }
    })
  })
});

export const { useGetUserQuery, useUpdateUserMutation } = usersApi;
