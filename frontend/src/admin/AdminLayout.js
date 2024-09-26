import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import './AdminLayout.css';

const AdminLayout = () => {
  return (
    <div className="admin-layout">
      <header className="admin-header">
        <h1>Admin Dashboard</h1>
        <nav>
          <Link to="/admin/dashboard">Dashboard</Link>
          <Link to="/admin/manage-users">Manage Users</Link>
          <Link to="/admin/manage-products">Manage Products</Link>
          <Link to="/admin/manage-appointments">Manage Appointments</Link>
          <Link to="/admin/support">Support</Link>
          <Link to="/admin/logout">Logout</Link>
        </nav>
      </header>

      <aside className="admin-sidebar">
        <h2>Navigation</h2>
        <ul>
          <li><Link to="/admin/dashboard">Overview</Link></li>
          <li><Link to="/admin/manage-users">User Management</Link></li>
          <li><Link to="/admin/manage-products">Product Management</Link></li>
          <li><Link to="/admin/manage-appointments">Appointment Management</Link></li>
          <li><Link to="/admin/settings">Settings</Link></li>
          <li><Link to="/admin/reports">Reports</Link></li>
        </ul>
      </aside>

      <main className="admin-content">
        <Outlet />
      </main>

      <footer className="admin-footer">
        <p>&copy; {new Date().getFullYear()} Your Clinic Name. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default AdminLayout;
