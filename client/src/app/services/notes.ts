import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { RootState } from '../store';
import { HOST, baseQueryInterceptor } from './interceptor';

const baseQuery = fetchBaseQuery({
  baseUrl: `${HOST}/api/notes/`,
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth.token;
    if (token) {
      headers.set('authorization', `Bearer ${token}`)
    }
    return headers
  },
});

export const notesApi = createApi({
  reducerPath: 'notesAPI',
  baseQuery: (args, api, extra) =>  baseQueryInterceptor(args, api, extra, baseQuery),
  endpoints: (builder) => ({
    getNotes: builder.query<any, any>({ 
      query: (request: any) => ({
        url: '/',
        params: request,
      })
    }),
    creteaNote: builder.mutation<any, any>({
      query: (request) => {
        return {
          method: 'POST',
          body: request,
        }
      }
    }),
  }),
});

export const { useCreteaNoteMutation, useGetNotesQuery } = notesApi;