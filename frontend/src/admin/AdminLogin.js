// src/admin/AdminLogin.js
import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../components/AuthContext'; // Import AuthContext
import './AdminLogin.css';

const AdminLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { login } = useContext(AuthContext); // Get the login function from context

  const handleLogin = (e) => {
    e.preventDefault();

    // Simulate admin credentials
    if (username === 'admin' && password === 'admin123') {
      login(); // Call the login function to set authentication state

      // Redirect to admin dashboard
      navigate('/admin/dashboard');
    } else {
      alert('Invalid admin username or password');
    }
  };

  return (
    <div className="admin-login-page">
      <h2>Admin Panel Login</h2>
      <form onSubmit={handleLogin}>
        <div>
          <label>Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default AdminLogin;
