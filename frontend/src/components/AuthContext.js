// src/components/AuthContext.js
import React, { createContext, useState, useContext } from 'react';

// Create the Auth Context
const AuthContext = createContext();

// AuthProvider Component to wrap around parts of the app that need access to auth state
export const AuthProvider = ({ children }) => {
  // Initialize authentication state
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Function to handle login
  const login = () => {
    // Here you would typically handle authentication logic (e.g., API calls)
    setIsAuthenticated(true);
  };

  // Function to handle logout
  const logout = () => {
    // Here you would typically handle logout logic (e.g., clearing tokens)
    setIsAuthenticated(false);
  };

  // Provide the authentication state and functions to children components
  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook for easier access to AuthContext
export const useAuth = () => {
  return useContext(AuthContext);
};
