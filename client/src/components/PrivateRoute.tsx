import React from 'react'
import { Navigate } from "react-router-dom";
import useIsAuthenticated from '../hooks/useIsAutheticated';

interface PrivateRouteProps {
  Component: any
}

function PrivateRoute(props: PrivateRouteProps) {
  const { Component } = props;
  const isAuthenticated = useIsAuthenticated();

  if (!isAuthenticated) {
    return <Navigate to="/unauthorized" />
  }

  return <Component />
}

export default PrivateRoute;
