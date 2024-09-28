import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './AdminLogin.css';

const AdminLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    if (username === 'admin' && password === 'admin123') {
      // Redirect to the admin panel
      navigate('/admin-dashboard');
    } else {
      // Display an error message
      setError('Invalid username or password');
    }
  };

  return (
    <div className="login-page">
      <div className="login-left">
        <h1>Admin Portal</h1>
        <p>Manage the system and keep everything running smoothly</p>
        <ul>
          <li>Monitor user activity</li>
          <li>Manage appointments and products</li>
          <li>Access system reports and analytics</li>
        </ul>
      </div>
      <div className="login-right">
        <div className="login-container">
          <h2>Admin Login</h2>
          <p>Please enter your admin credentials to continue</p>
          {error && <p className="error-message">{error}</p>}
          <form onSubmit={handleLogin}>
            <div className="form-group">
              <label htmlFor="admin-username">Admin Username</label>
              <input
                type="text"
                id="admin-username"
                placeholder="Enter your username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="admin-password">Password</label>
              <input
                type="password"
                id="admin-password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button type="submit">Login</button>
          </form>
          <div className="additional-options">
            <Link to="/forgot-password">Forgot Password?</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
