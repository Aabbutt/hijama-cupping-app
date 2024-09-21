// src/admin/AdminSidebar.js
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AdminContext } from './AdminContext';
import { FaTachometerAlt, FaUsers, FaBoxOpen, FaCalendarAlt, FaCog, FaSignOutAlt } from 'react-icons/fa';
import './AdminSidebar.css';

const AdminSidebar = () => {
  const { isSidebarCollapsed, toggleSidebar } = useContext(AdminContext);

  const menuItems = [
    { path: '/admin/dashboard', name: 'Dashboard', icon: <FaTachometerAlt /> },
    { path: '/admin/manage-users', name: 'Manage Users', icon: <FaUsers /> },
    { path: '/admin/manage-products', name: 'Manage Products', icon: <FaBoxOpen /> },
    { path: '/admin/manage-appointments', name: 'Manage Appointments', icon: <FaCalendarAlt /> },
    { path: '/admin/settings', name: 'Settings', icon: <FaCog /> },
  ];

  return (
    <aside className={`admin-sidebar ${isSidebarCollapsed ? 'collapsed' : ''}`}>
      <div className="sidebar-header">
        <h2 className="sidebar-logo">{isSidebarCollapsed ? 'AP' : 'Admin Panel'}</h2>
        <button className="collapse-btn" onClick={toggleSidebar} aria-label="Toggle Sidebar">
          {isSidebarCollapsed ? '→' : '←'}
        </button>
      </div>
      <ul className="sidebar-menu">
        {menuItems.map((item) => (
          <li key={item.name} className="sidebar-item">
            <Link to={item.path} className="sidebar-link">
              <span className="icon">{item.icon}</span>
              {!isSidebarCollapsed && <span className="link-text">{item.name}</span>}
            </Link>
          </li>
        ))}
      </ul>
      <div className="sidebar-footer">
        <Link to="/admin/logout" className="logout-link">
          <FaSignOutAlt className="icon" />
          {!isSidebarCollapsed && <span className="link-text">Logout</span>}
        </Link>
      </div>
    </aside>
  );
};

export default AdminSidebar;
