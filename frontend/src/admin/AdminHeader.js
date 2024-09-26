// src/admin/AdminHeader.jsx
import React, { useContext, useState } from 'react';
import { FaBell, FaUserCircle } from 'react-icons/fa';
import './AdminHeader.css';
import { AdminContext } from '../components/AdminContext'; // Optional if needed

const AdminHeader = () => {
  const { notifications } = useContext(AdminContext) || { notifications: [] };
  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <header className="admin-header">
      <div className="header-left">
        <h1>Admin Dashboard</h1>
      </div>
      <div className="header-right">
        <FaBell className="icon" aria-label="Notifications" />
        {unreadCount > 0 && <span className="notification-count">{unreadCount}</span>}
        <div className="profile-container">
          <FaUserCircle className="icon" aria-label="User Profile" />
          <span className="user-name">Admin</span>
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;
