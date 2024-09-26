// src/components/PrivateRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from './AuthContext'; // Ensure this path is correct

const PrivateRoute = ({ children }) => {
  const { isAuthenticated } = useAuth(); // Adjust based on your AuthContext

  return isAuthenticated ? children : <Navigate to="/admin/login" />;
};

export default PrivateRoute; // Ensure the component is exported as default
