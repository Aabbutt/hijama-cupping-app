// src/components/AdminContext.js
import React, { createContext, useState, useContext } from 'react';

// Create the Admin Context
const AdminContext = createContext();

// AdminProvider Component to wrap around admin-related parts of the app
export const AdminProvider = ({ children }) => {
  // Initialize admin-specific data
  const [adminData, setAdminData] = useState({
    // Add any initial admin data here
    users: [],
    products: [],
    appointments: [],
  });

  // Provide the admin data and a function to update it to children components
  return (
    <AdminContext.Provider value={{ adminData, setAdminData }}>
      {children}
    </AdminContext.Provider>
  );
};

// Custom hook for easier access to AdminContext
export const useAdmin = () => {
  const context = useContext(AdminContext);
  if (!context) {
    throw new Error('useAdmin must be used within an AdminProvider');
  }
  return context;
};
