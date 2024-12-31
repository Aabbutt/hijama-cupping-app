// src/admin/ManageUsers.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ManageUsers.css';

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [practitioners, setPractitioners] = useState([]);
  const [showUsersList, setShowUsersList] = useState(false);
  const [showPractitionersList, setShowPractitionersList] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchUsers();
    fetchPractitioners();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await axios.get('http://localhost:3000/api/users');
      setUsers(response.data);
    } catch (error) {
      setError('Error fetching users');
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchPractitioners = async () => {
    try {
      setLoading(true);
      const response = await axios.get('http://localhost:3000/api/practitioners');
      setPractitioners(response.data);
    } catch (error) {
      setError('Error fetching practitioners');
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteUser = async (userId) => {
    try {
      await axios.delete(`http://localhost:3000/api/users/${userId}`);
      setUsers(users.filter(user => user._id !== userId));
    } catch (error) {
      setError('Error deleting user');
      console.error('Error:', error);
    }
  };

  const handleDeletePractitioner = async (practitionerId) => {
    try {
      await axios.delete(`http://localhost:3000/api/practitioners/${practitionerId}`);
      setPractitioners(practitioners.filter(practitioner => practitioner._id !== practitionerId));
    } catch (error) {
      setError('Error deleting practitioner');
      console.error('Error:', error);
    }
  };

  return (
    <div className="manage-users-container">
      <h2>Manage Users</h2>
      {error && <div className="error-message">{error}</div>}

      <div className="dashboard-cards">
        <div className="dashboard-card" onClick={() => setShowUsersList(true)}>
          <h3>Users</h3>
          <p>Total Users: {users.length}</p>
          <button className="view-btn">View Users</button>
        </div>

        <div className="dashboard-card" onClick={() => setShowPractitionersList(true)}>
          <h3>Practitioners</h3>
          <p>Total Practitioners: {practitioners.length}</p>
          <button className="view-btn">View Practitioners</button>
        </div>
      </div>

      {showUsersList && (
        <div className="modal-overlay">
          <div className="list-container">
            <h2>Users List</h2>
            {loading ? (
              <p>Loading users...</p>
            ) : (
              <div className="users-list">
                <table>
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Phone</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map(user => (
                      <tr key={user._id}>
                        <td>{user.name}</td>
                        <td>{user.email}</td>
                        <td>{user.phone || 'N/A'}</td>
                        <td>
                          <button 
                            className="delete-btn"
                            onClick={() => handleDeleteUser(user._id)}
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
            <button 
              className="close-btn"
              onClick={() => setShowUsersList(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}

      {showPractitionersList && (
        <div className="modal-overlay">
          <div className="list-container">
            <h2>Practitioners List</h2>
            {loading ? (
              <p>Loading practitioners...</p>
            ) : (
              <div className="practitioners-list">
                <table>
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Specialization</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {practitioners.map(practitioner => (
                      <tr key={practitioner._id}>
                        <td>{practitioner.name}</td>
                        <td>{practitioner.email}</td>
                        <td>{practitioner.specialization}</td>
                        <td>
                          <span className={`status ${practitioner.status}`}>
                            {practitioner.status}
                          </span>
                        </td>
                        <td>
                          <button 
                            className="delete-btn"
                            onClick={() => handleDeletePractitioner(practitioner._id)}
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
            <button 
              className="close-btn"
              onClick={() => setShowPractitionersList(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageUsers;
