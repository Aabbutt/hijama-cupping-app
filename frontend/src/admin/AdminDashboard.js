import React from 'react';
import { Link } from 'react-router-dom';
import './AdminDashboard.css';

const AdminDashboard = () => {
  return (
    <div className="admin-dashboard">
      <section className="welcome-section">
        <div className="welcome-text">
          <h1>Welcome, Admin</h1>
          <p>Manage Your Clinic's Data and Users Efficiently</p>
          <h2>Admin Dashboard Overview</h2>
          <p>
            Here you can manage users, monitor activities, and maintain the overall functionality of the clinic. Use the tools below to navigate to different administrative features.
          </p>
          {/* Admin Layout Button */}
          <Link to="/admin" className="admin-layout-button">Admin Layout</Link>
        </div>
      </section>

      <section className="admin-features">
        <Link to="/manage-users" className="feature feature-square">
          <img src="/images/user-management.png" alt="User Management" />
          <h3>User Management</h3>
          <p>View and manage user data</p>
        </Link>
        <Link to="/manage-products" className="feature feature-square">
          <img src="/images/system-status.png" alt="Product Management" />
          <h3>Product Management</h3>
          <p>Manage clinic products and services</p>
        </Link>
        <Link to="/manage-appointments" className="feature feature-square">
          <img src="/images/content-moderation.png" alt="Appointment Management" />
          <h3>Appointment Management</h3>
          <p>View and manage appointments</p>
        </Link>
        <Link to="/admin/manage-settings" className="feature feature-square">
  <img src="/images/settings.png" alt="Settings" />
  <h3>Settings</h3>
  <p>Adjust system settings and preferences</p>
</Link>
      </section>

      <section className="admin-info">
        <h2>Administrative Tools</h2>
        <div className="info-grid">
          <div className="info-item info-square">
            <img src="/images/user-reports.png" alt="User Reports" />
            <h3>User Reports</h3>
            <p>Generate detailed user activity reports</p>
          </div>
          <div className="info-item info-square">
            <img src="/images/system-logs.png" alt="System Logs" />
            <h3>System Logs</h3>
            <p>Review system activity and error logs</p>
          </div>
        </div>
        <button className="view-all">View All Tools</button>
      </section>

      <div className="admin-support">
        <h2>Admin Support</h2>
        <p>If you encounter issues, contact technical support at +92-332-XXXXXXX.</p>
        <Link to="/admin-support" className="admin-support">Contact Support</Link>
      </div>
    </div>
  );
};

export default AdminDashboard;
