// src/admin/ManageUsers.js
import React from 'react';
import UserCard from './UserCard';

const ManageUsers = ({ users = [], onEdit, onDelete }) => { // Default to an empty array
  return (
    <div>
      <h2>Manage Users</h2>
      <div className="user-list">
        {users.length === 0 ? (
          <p>No users available.</p>
        ) : (
          users.map(user => (
            <UserCard key={user.id} user={user} onEdit={onEdit} onDelete={onDelete} />
          ))
        )}
      </div>
    </div>
  );
};

export default ManageUsers;
