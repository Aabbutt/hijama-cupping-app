// src/admin/AdminHeader.js
import React, { useContext, useState } from 'react';
import { FaBell, FaUserCircle } from 'react-icons/fa';
import { AdminContext } from './AdminContext';
import './AdminHeader.css';

const AdminHeader = () => {
  const { notifications, markNotificationAsRead } = useContext(AdminContext);
  const [showNotifications, setShowNotifications] = useState(false);

  if (!notifications) return null; // Optional: handle cases when notifications are undefined

  const unreadCount = notifications.filter((notif) => !notif.read).length;

  const toggleNotifications = () => {
    setShowNotifications(!showNotifications);
  };

  return (
    <header className="admin-header">
      <div className="header-left">
        <h1>Dashboard</h1>
      </div>
      <div className="header-right">
        {/* Notifications */}
        <div className="notifications-container">
          <FaBell className="icon" onClick={toggleNotifications} aria-label="Notifications" />
          {unreadCount > 0 && <span className="notification-count">{unreadCount}</span>}
          {showNotifications && (
            <div className="notifications-dropdown">
              <h3>Notifications</h3>
              <ul>
                {notifications.map((notif) => (
                  <li
                    key={notif.id}
                    className={!notif.read ? 'unread' : ''}
                    onClick={() => markNotificationAsRead(notif.id)}
                  >
                    {notif.message}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
        {/* User Profile */}
        <div className="profile-container">
          <FaUserCircle className="icon" aria-label="User Profile" />
          <span className="user-name">Admin</span>
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;
