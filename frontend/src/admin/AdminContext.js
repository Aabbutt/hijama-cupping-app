// src/admin/AdminContext.js
import React, { createContext, useState } from 'react';

// Create the context
export const AdminContext = createContext();

// Create the provider
export const AdminProvider = ({ children }) => {
  // State for sidebar collapsed state
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  
  // State for notifications
  const [notifications, setNotifications] = useState([
    { id: 1, message: 'New user registered', read: false },
    { id: 2, message: 'Product X added', read: false },
    { id: 3, message: 'Appointment booked by John Doe', read: false },
  ]);

  // Function to toggle the sidebar's collapsed state
  const toggleSidebar = () => {
    setIsSidebarCollapsed(prev => !prev);
  };

  // Function to mark a notification as read
  const markNotificationAsRead = (id) => {
    setNotifications(prev =>
      prev.map(notif => (notif.id === id ? { ...notif, read: true } : notif))
    );
  };

  // Provide the state and functions to children components
  return (
    <AdminContext.Provider value={{
      isSidebarCollapsed,
      toggleSidebar,
      notifications,
      markNotificationAsRead,
    }}>
      {children}
    </AdminContext.Provider>
  );
};
