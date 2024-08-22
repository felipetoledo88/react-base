import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../../contexts/Auth';

interface PrivateRouteProps {
  accessLevel?: number;
}

const PrivateRoute = ({ accessLevel }: PrivateRouteProps) => {
  const { isAuthenticated, userAccessLevel, loading } = useAuth();

  if (loading) {
    return <div>Carregando...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  if (accessLevel !== undefined && userAccessLevel !== accessLevel) {
    return <Navigate to="/unauthorized" replace />;
  }

  return <Outlet />;
};

export default PrivateRoute;