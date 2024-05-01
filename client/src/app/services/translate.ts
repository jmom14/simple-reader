import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { RootState } from '../store';
import { HOST, baseQueryInterceptor } from './interceptor';


const baseQuery = fetchBaseQuery({
  baseUrl: `${HOST}/api/translate/`,
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
        console.log(request)
        return {
          url: '',
          params: request,
        }
      }
    })
  }),
});

export const { useTranslateQuery } = translateApi;