// src/admin/AdminContext.js
import React, { createContext, useState, useContext } from 'react';

export const AdminContext = createContext();

export const AdminProvider = ({ children }) => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarCollapsed((prev) => !prev);
  };

  return (
    <AdminContext.Provider value={{ isSidebarCollapsed, toggleSidebar }}>
      {children}
    </AdminContext.Provider>
  );
};

export const useAdmin = () => useContext(AdminContext);
