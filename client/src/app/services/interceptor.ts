import { removeCredentials } from '../../features/auth/authSlice';

export const HOST = process.env.NODE_ENV === 'development' ? 'http://localhost:8000' : process.env.REACT_APP_HOST;

export const baseQueryInterceptor = async (args: any, api: any, extraOptions: any, baseQuery: any) => {
  let result = await baseQuery(args, api, extraOptions);
  if (result.error && result.error.status === 401) {
    api.dispatch(removeCredentials());
  }
  return result;
}