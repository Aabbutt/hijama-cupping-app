import React from 'react';
import { Navigate } from 'react-router-dom';

// Mock authentication function (replace with actual auth logic)
const isAuthenticated = () => {
  // Example: Check if the user is authenticated by checking localStorage or context
  // You can replace this with actual authentication logic
  return localStorage.getItem('isAdminAuthenticated') === 'true';
};

const PrivateRoute = ({ children }) => {
  return isAuthenticated() ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
