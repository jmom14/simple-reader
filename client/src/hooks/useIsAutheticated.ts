import { useSelector } from 'react-redux';

const useIsAuthenticated = () => {
  const token = useSelector((state: any) => state.auth.token);

  return token !== null && !!token;
};

export default useIsAuthenticated;