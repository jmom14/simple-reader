import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';


const useIsAuthenticated = () => {
  const [authenticated, setAuthenticated] = useState(false);
  
  const token = useSelector((state: any) => state.auth.token);

  useEffect(() => {
    const isAuthenticated = token !== null && token;

    setAuthenticated(isAuthenticated);
  }, [token]); 

  return authenticated;
};

export default useIsAuthenticated;