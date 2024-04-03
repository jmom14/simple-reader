import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { RootState } from '../store';
import { removeCredentials } from '../../features/auth/authSlice';


const HOST = process.env.REACT_APP_HOST;

const baseQuery = fetchBaseQuery({
  baseUrl: `${HOST}/api/users/`,
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth.token;
    if (token) {
      headers.set('authorization', `Bearer ${token}`)
    }
    return headers
  },
});

export const baseQueryInterceptor = async (args: any, api: any, extraOptions: any) => {
  let result = await baseQuery(args, api, extraOptions);
  if (result.error && result.error.status === 401) {
    api.dispatch(removeCredentials());
  }
  return result;
};

export const usersApi = createApi({
  reducerPath: 'usersAPI',
  baseQuery: baseQueryInterceptor,
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
      }}
    })
  })
});

export const { useGetUserQuery, useUpdateUserMutation } = usersApi;
