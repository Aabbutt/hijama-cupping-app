import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import './AdminLayout.css';
import { useNavigate } from 'react-router-dom';
const AdminLayout = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('isAdmin');
    navigate('/admin/login');
  };
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
          <span onClick={handleLogout} >Logout</span>
        </nav>
      </header>

      

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
