import React from 'react';
import { Link } from 'react-router-dom';
import './AdminLogin.css';

const AdminLogin = () => {
  return (
    <div className="admin-login-page">
      <div className="admin-login-left">
        <h1>Welcome Admin</h1>
        <p>Access the management dashboard</p>
        <ul>
          <li>Manage users and appointments</li>
          <li>Oversee product inventory</li>
          <li>Generate reports and insights</li>
        </ul>
      </div>
      <div className="admin-login-right">
        <div className="admin-login-container">
          <h2>Admin Login</h2>
          <p>Enter your credentials to continue</p>
          <form>
            <div className="form-group">
              <label htmlFor="admin-username">Username</label>
              <input type="text" id="admin-username" placeholder="Enter your username" />
            </div>
            <div className="form-group">
              <label htmlFor="admin-password">Password</label>
              <input type="password" id="admin-password" placeholder="Enter your password" />
            </div>
            <button type="submit">Login</button>
          </form>
          <div className="admin-additional-options">
            <Link to="/forgot-password">Forgot Password?</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
