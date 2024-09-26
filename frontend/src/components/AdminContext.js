import React, { createContext, useState } from 'react';

// Create the Admin Context
export const AdminContext = createContext();

// Create a Provider component
export const AdminProvider = ({ children }) => {
  const [adminData, setAdminData] = useState({}); // Initialize adminData state

  return (
    <AdminContext.Provider value={{ adminData, setAdminData }}>
      {children}
    </AdminContext.Provider>
  );
};

// Optional: Export a custom hook for easier access to the context
export const useAdminContext = () => {
  const context = React.useContext(AdminContext);
  if (!context) {
    throw new Error('useAdminContext must be used within an AdminProvider');
  }
  return context;
};
