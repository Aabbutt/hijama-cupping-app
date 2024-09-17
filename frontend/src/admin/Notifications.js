// src/admin/Notifications.js
import React, { useContext } from 'react';
import { AdminContext } from './AdminContext';
import './Notifications.css';

const Notifications = () => {
  const { notifications, markNotificationAsRead, theme } = useContext(AdminContext);

  return (
    <div className={`notifications-panel ${theme}`}>
      <h2>Notifications</h2>
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
  );
};

export default Notifications;
