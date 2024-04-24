import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { RootState } from '../store';
import { HOST, baseQueryInterceptor } from './interceptor';

const baseQuery = fetchBaseQuery({
  baseUrl: `${HOST}/api/highlights/`,
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth.token;
    if (token) {
      headers.set('authorization', `Bearer ${token}`)
    }
    return headers
  },
});


export const highglightsApi = createApi({
  reducerPath: 'highglightsAPI',
  baseQuery: (args, api, extra) =>  baseQueryInterceptor(args, api, extra, baseQuery),
  endpoints: (builder) => ({
    getHighlights: builder.query<any, any>({ query: (readingId: number) => `${readingId}/`}),
    creteaHighlight: builder.mutation<any, any>({
      query: (request) => {
        return {
          method: 'POST',
          body: request,
        }
      }
    }),
  }),
});

export const  { useCreteaHighlightMutation, useGetHighlightsQuery } = highglightsApi;