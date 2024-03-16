import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { RootState } from '../store'

export interface User {
  first_name: string
  last_name: string
}

export interface UserResponse {
  user: User
  token: string
}

export interface LoginRequest {
  username: string
  password: string
}

const HOST = process.env.REACT_APP_HOST;

export const api = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: `${HOST}/api/auth/`,
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).auth.token;
      if (token) {
        headers.set('authorization', `Bearer ${token}`)
      }
      return headers
    },
  }),
  endpoints: (builder) => ({
    login: builder.mutation<UserResponse, LoginRequest>({
      query: (request) => {
        return {
          url: 'login',
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          },
          body: new URLSearchParams({
            'username': request.username,
            'password': request.password,
          })
        }
      },
    }),
    signup: builder.mutation<any, any>({
      query: (request) => {
        return {
          url: '/signup',
          method: 'POST',
          body: {
            email: request.email,
            password: request.password
          }
        }
      }
    }),
    logout: builder.mutation<any, any>({
      query: () => {
        return {
          url: 'logout',
          method: 'POST',
        }
      }
    }),
    protected: builder.mutation<{ message: string }, void>({
      query: () => 'protected',
    }),
  }),
})

export const { useLoginMutation, useSignupMutation, useProtectedMutation } = api;
