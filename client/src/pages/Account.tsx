import React, { useEffect } from 'react'
import useIsAuthenticated from '../hooks/isAutheticated';
import axios from 'axios';

export default function Account() {
  const isAuthenticated = useIsAuthenticated();

  useEffect(() => {
    const fetchUser = async () => {
      console.log('fetching...')
    };
    fetchUser();
  }, [])
  
  return isAuthenticated ? <div>Account</div> : <div>You need to Login </div>;
}
