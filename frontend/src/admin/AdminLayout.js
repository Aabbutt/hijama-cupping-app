// src/admin/AdminLayout.js
import React from 'react';
import { Outlet } from 'react-router-dom';
import AdminSidebar from './AdminSidebar';
import AdminHeader from './AdminHeader';
import AdminFooter from './AdminFooter';
import Breadcrumb from './Breadcrumb';
import Notifications from './Notifications';
import { AdminProvider } from './AdminContext'; // Ensure you import the provider
import './AdminLayout.css';

const AdminLayout = () => (
  <AdminProvider>
    <div className="admin-layout">
      <AdminSidebar />
      <div className="admin-content">
        <AdminHeader />
        <div className="admin-main">
          <Breadcrumb />
          <Notifications />
          <Outlet />
        </div>
        <AdminFooter />
      </div>
    </div>
  </AdminProvider>
);

export default AdminLayout;
