// src/components/PrivateRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

// PrivateRoute Component to protect admin routes
const PrivateRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();

  // If the user is authenticated, render the child components
  // Otherwise, redirect to the admin login page
  return isAuthenticated ? children : <Navigate to="/admin/login" replace />;
};

export default PrivateRoute;
