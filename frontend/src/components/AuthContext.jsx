// src/components/AuthContext.js
import React, { createContext, useState, useContext, useEffect } from 'react';

// Create the Auth Context
const AuthContext = createContext();

// AuthProvider Component to wrap around parts of the app that need access to auth state
export const AuthProvider = ({ children }) => {
  // Initialize authentication state with token check
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Check authentication status on component mount
  useEffect(() => {
    const token = localStorage.getItem('authToken'); // Check if a token exists in localStorage
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  // Function to handle login
  const login = (token) => {
    // Here you would typically handle authentication logic (e.g., API calls)
    localStorage.setItem('authToken', token); // Save token to localStorage
    setIsAuthenticated(true);
  };

  // Function to handle logout
  const logout = () => {
    // Handle logout logic (e.g., clearing tokens)
    localStorage.removeItem('authToken'); // Remove token from localStorage
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
