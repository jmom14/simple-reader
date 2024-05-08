import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { RootState } from '../store';
import { HOST, baseQueryInterceptor } from './interceptor';


const baseQuery = fetchBaseQuery({
  baseUrl: `${HOST}/api/translation/`,
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth.token;
    if (token) {
      headers.set('authorization', `Bearer ${token}`)
    }
    return headers;
  },
});

export const translateApi = createApi({
  reducerPath: 'translateAPI',
  baseQuery: (args, api, extra) =>  baseQueryInterceptor(args, api, extra, baseQuery),
  endpoints: (builder) => ({
    translate: builder.query<any, any>({ 
      query: (request) => {
        return {
          url: '/translate',
          params: request,
        }
      }
    }),
    getTralations: builder.query<any, any>({
      query: (request: number) => ({
        url: '/',
        params: request,
      }),
    }),
    createTranslation: builder.mutation<any, any>({
      query: (request) => {
        return {
          method: 'POST',
          body: request,
        }
      }
    })
  }),
});

export const { useTranslateQuery, useCreateTranslationMutation, useGetTralationsQuery } = translateApi;