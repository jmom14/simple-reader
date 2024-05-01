import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { RootState } from '../store';
import { HOST, baseQueryInterceptor } from './interceptor';

const baseQuery = fetchBaseQuery({
  baseUrl: `${HOST}/api/readings/`,
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth.token;
    if (token) {
      headers.set('authorization', `Bearer ${token}`)
    }
    return headers
  },
});

export const readingsApi = createApi({
  reducerPath: 'readingsAPI',
  baseQuery: (args, api, extra) =>  baseQueryInterceptor(args, api, extra, baseQuery),
  endpoints: (builder) => ({
    getReadings: builder.query<any, void>({ query: () => '/' }),
    createReading: builder.mutation<any, any>({
      query: ({ file, reading, cover }) => {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("cover", cover);
        formData.append("reading", reading);
        return {
          method: 'POST',
          body: formData
        }
      }
    }),
  })
});

export const { useCreateReadingMutation, useGetReadingsQuery } = readingsApi;
