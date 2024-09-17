// src/admin/ManageUsers.js
import React, { useEffect, useState, useContext } from 'react';
import './ManageUsers.css';
import { getUsers, deleteUser } from '../services/userService';
import { AdminContext } from './AdminContext';

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const { theme } = useContext(AdminContext);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const usersData = await getUsers();
        setUsers(usersData);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  const handleDelete = async (id) => {
    try {
      await deleteUser(id);
      setUsers(users.filter(user => user.id !== id));
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  return (
    <div className={`manage-users ${theme}`}>
      <h2>Manage Users</h2>
      <table className="users-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id} className={!user.active ? 'inactive' : ''}>
              <td>{user.id}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.role}</td>
              <td>
                <button className="delete-btn" onClick={() => handleDelete(user.id)}>
                  Delete
                </button>
                {/* Add more action buttons as needed */}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManageUsers;
