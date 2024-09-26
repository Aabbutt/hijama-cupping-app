// src/admin/AdminFooter.jsx
import React from 'react';
import './AdminFooter.css';

const AdminFooter = () => {
  return (
    <footer className="admin-footer">
      <p>&copy; {new Date().getFullYear()} Your Company Name. All rights reserved.</p>
    </footer>
  );
};

export default AdminFooter;
