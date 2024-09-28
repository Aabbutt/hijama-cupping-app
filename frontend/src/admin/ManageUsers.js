// src/admin/ManageUsers.js

import React, { useState } from 'react';
import AddUser from '../components/AddUser';
import EditUser from '../components/EditUser'; // Import the EditUser component
import './ManageUsers.css'; // Ensure this CSS file exists

const ManageUsers = ({ users, onAddUser, onEdit, onDelete }) => {
  const [showAddUser, setShowAddUser] = useState(false);
  const [showEditUser, setShowEditUser] = useState(false); // State to control EditUser modal
  const [currentUser, setCurrentUser] = useState(null); // State to hold the user being edited
  const [successMessage, setSuccessMessage] = useState('');
  const [deleteConfirm, setDeleteConfirm] = useState({ show: false, userId: null });

  const toggleAddUser = () => {
    setShowAddUser(!showAddUser);
    setShowEditUser(false); // Close edit modal if open
  };

  const handleAddUserInternal = (newUser) => {
    onAddUser(newUser);
    setSuccessMessage('User added successfully!');
    setShowAddUser(false);
    setTimeout(() => setSuccessMessage(''), 3000); // Clear message after 3 seconds
  };

  const handleEditClick = (user) => {
    setCurrentUser(user);
    setShowEditUser(true);
  };

  const handleUpdateUser = (updatedUser) => {
    onEdit(updatedUser);
    setSuccessMessage('User updated successfully!');
    setShowEditUser(false);
    setCurrentUser(null);
    setTimeout(() => setSuccessMessage(''), 3000);
  };

  const handleDelete = (userId) => {
    setDeleteConfirm({ show: true, userId });
  };

  const confirmDelete = () => {
    onDelete(deleteConfirm.userId);
    setDeleteConfirm({ show: false, userId: null });
    setSuccessMessage('User deleted successfully!');
    setTimeout(() => setSuccessMessage(''), 3000);
  };

  const cancelDelete = () => {
    setDeleteConfirm({ show: false, userId: null });
  };

  return (
    <div className="manage-users-container">
      <h1>Manage Users</h1>
      <button className="add-user-button" onClick={toggleAddUser}>
        {showAddUser ? 'Close Add User' : 'Add New User'}
      </button>
      {successMessage && <div className="success-message">{successMessage}</div>}
      {showAddUser && <AddUser onAddUser={handleAddUserInternal} />}
      {showEditUser && currentUser && (
        <EditUser 
          user={currentUser} 
          onUpdate={handleUpdateUser} 
          onClose={() => setShowEditUser(false)} 
        />
      )}
      <div className="users-list">
        <table className="users-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Full Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Role</th>
              <th>Experience (Years)</th>
              <th>Certification</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.length > 0 ? (
              users.map((user) => (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.phone}</td>
                  <td>{user.role}</td>
                  <td>{user.experience || 'N/A'}</td>
                  <td>{user.certification || 'N/A'}</td>
                  <td>
                    <button className="edit-button" onClick={() => handleEditClick(user)}>
                      Edit
                    </button>
                    <button className="delete-button" onClick={() => handleDelete(user.id)}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8">No users available.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Delete Confirmation Modal */}
      {deleteConfirm.show && (
        <div className="modal" onClick={cancelDelete}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <span className="close-button" onClick={cancelDelete}>
              &times;
            </span>
            <p>Are you sure you want to delete this user?</p>
            <div className="modal-actions">
              <button className="confirm-button" onClick={confirmDelete}>
                Yes, Delete
              </button>
              <button className="cancel-button" onClick={cancelDelete}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageUsers;
