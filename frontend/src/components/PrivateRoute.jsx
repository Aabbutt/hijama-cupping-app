// src/components/PrivateRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from './AuthContext';
const PrivateRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  const isAdmin = localStorage.getItem('isAdmin');
  if (!isAuthenticated && !isAdmin) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default PrivateRoute;
