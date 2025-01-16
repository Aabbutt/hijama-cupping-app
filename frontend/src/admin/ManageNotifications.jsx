import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ManageNotifications.css';

const ManageNotifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);
  const [newNotification, setNewNotification] = useState({
    title: '',
    message: '',
    type: 'info',
    target: 'all'
  });

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:3000/notifications', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setNotifications(response.data);
    } catch (error) {
      setError('Error fetching notifications');
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddNotification = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post('http://localhost:3000/notifications', newNotification, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setNotifications([...notifications, response.data]);
      setShowAddForm(false);
      setNewNotification({
        title: '',
        message: '',
        type: 'info',
        target: 'all'
      });
    } catch (error) {
      setError('Error adding notification');
      console.error('Error:', error);
    }
  };

  const handleDeleteNotification = async (id) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`http://localhost:3000/notifications/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setNotifications(notifications.filter(notification => notification._id !== id));
    } catch (error) {
      setError('Error deleting notification');
      console.error('Error:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewNotification(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="manage-notifications-container">
      <h2>Manage Notifications</h2>
      {error && <div className="error-message">{error}</div>}

      <button 
        className="add-notification-button"
        onClick={() => setShowAddForm(!showAddForm)}
      >
        {showAddForm ? 'Cancel' : 'Add New Notification'}
      </button>

      {showAddForm && (
        <form onSubmit={handleAddNotification} className="notification-form">
          <div className="form-group">
            <label htmlFor="title">Title:</label>
            <input
              type="text"
              id="title"
              name="title"
              value={newNotification.title}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="message">Message:</label>
            <textarea
              id="message"
              name="message"
              value={newNotification.message}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="type">Type:</label>
            <select
              id="type"
              name="type"
              value={newNotification.type}
              onChange={handleInputChange}
            >
              <option value="info">Info</option>
              <option value="success">Success</option>
              <option value="warning">Warning</option>
              <option value="error">Error</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="target">Target Audience:</label>
            <select
              id="target"
              name="target"
              value={newNotification.target}
              onChange={handleInputChange}
            >
              <option value="all">All Users</option>
              <option value="patients">Patients Only</option>
              <option value="practitioners">Practitioners Only</option>
              <option value="admins">Admins Only</option>
            </select>
          </div>

          <button type="submit" className="submit-button">
            Add Notification
          </button>
        </form>
      )}

      {loading ? (
        <p>Loading notifications...</p>
      ) : (
        <div className="notifications-list">
          <table>
            <thead>
              <tr>
                <th>Title</th>
                <th>Message</th>
                <th>Type</th>
                <th>Target</th>
                <th>Created At</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {notifications.map(notification => (
                <tr key={notification._id}>
                  <td>{notification.title}</td>
                  <td>{notification.message}</td>
                  <td>
                    <span className={`notification-type ${notification.type}`}>
                      {notification.type}
                    </span>
                  </td>
                  <td>{notification.target}</td>
                  <td>{new Date(notification.createdAt).toLocaleDateString()}</td>
                  <td>
                    <button 
                      className="delete-btn"
                      onClick={() => handleDeleteNotification(notification._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ManageNotifications;
