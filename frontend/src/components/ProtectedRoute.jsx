// src/components/ProtectedRoute.js

import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();

  // Check if user is logged in as admin
  const isAdmin = localStorage.getItem('isAdmin');
  const adminToken = localStorage.getItem('adminToken');

  if (!isAuthenticated && !isAdmin) {
    return <Navigate to="/admin/login" />;
  }

  return children;
};

export default ProtectedRoute;
