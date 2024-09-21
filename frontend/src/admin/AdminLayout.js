// src/admin/AdminLayout.js
import React, { useContext } from 'react';
import { Outlet } from 'react-router-dom';
import { AdminContext } from './AdminContext';
import AdminSidebar from './AdminSidebar';
import AdminFooter from './AdminFooter';
import './AdminLayout.css'; // Ensure you have styles here

const AdminLayout = () => {
  const { isSidebarCollapsed } = useContext(AdminContext);

  return (
    <div className={`admin-layout ${isSidebarCollapsed ? 'collapsed' : ''}`}>
      <AdminSidebar />
      <div className="admin-content">
        <header className="admin-header">
          <h1>Admin Dashboard</h1>
        </header>
        <main className="admin-main">
          <Outlet />
        </main>
        <AdminFooter />
      </div>
    </div>
  );
};

export default AdminLayout;
