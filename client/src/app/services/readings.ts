import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { RootState } from '../store';
import { removeCredentials } from '../../features/auth/authSlice';

const HOST = process.env.REACT_APP_HOST;

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

export const baseQueryInterceptor = async (args: any, api: any, extraOptions: any) => {
  let result = await baseQuery(args, api, extraOptions);
  if (result.error && result.error.status === 401) {
    api.dispatch(removeCredentials());
  }
  return result;
};

export const readingsApi = createApi({
  reducerPath: 'readingsAPI',
  baseQuery: baseQueryInterceptor,
  endpoints: (builder) => ({
    createReading: builder.mutation<any, any>({
      query: ({ file,reading }) => {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("reading", JSON.stringify(reading));
        return {
          method: 'POST',
          body: formData
        }
      }
    }),
    fetchReadings: builder.query<any, void>({
      query: () => '/',
    })
  })
});

export const { useCreateReadingMutation, useFetchReadingsQuery } = readingsApi;
