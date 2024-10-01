import React, { useState } from 'react';
import AddNotification from '../components/AddNotification';
import './ManageNotifications.css';

const ManageNotifications = ({ notifications, onAddNotification, onEditNotification, onDeleteNotification }) => {
  const [showAddNotification, setShowAddNotification] = useState(false);
  const [currentNotification, setCurrentNotification] = useState(null); // For editing notification

  const handleAddClick = () => {
    setShowAddNotification(true);
    setCurrentNotification(null); // Reset for new addition
  };

  const handleCloseForm = () => {
    setShowAddNotification(false);
    setCurrentNotification(null);
  };

  const handleEditClick = (notification) => {
    setCurrentNotification(notification);
    setShowAddNotification(true);
  };

  return (
    <div className="manage-notifications-container">
      <h1>Manage Notifications</h1>
      <button className="add-notification-button" onClick={handleAddClick}>
        {showAddNotification ? 'Close Add Notification' : 'Add New Notification'}
      </button>
      
      {showAddNotification && (
        <AddNotification
          notification={currentNotification}
          onAddNotification={onAddNotification}
          onEditNotification={onEditNotification}
          onClose={handleCloseForm}
        />
      )}
      
      <div className="notifications-list">
        <table className="notifications-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Title</th>
              <th>Message</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {notifications.length > 0 ? (
              notifications.map((notification) => (
                <tr key={notification.id}>
                  <td>{notification.id}</td>
                  <td>{notification.title}</td>
                  <td>{notification.message}</td>
                  <td>{new Date(notification.date).toLocaleDateString()}</td>
                  <td>
                    <button className="edit-button" onClick={() => handleEditClick(notification)}>
                      Edit
                    </button>
                    <button className="delete-button" onClick={() => onDeleteNotification(notification.id)}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5">No notifications available.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageNotifications;
