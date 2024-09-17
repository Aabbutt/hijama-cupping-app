// src/admin/AdminFooter.js
import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaGithub, FaArrowUp } from 'react-icons/fa';
import './AdminFooter.css';

const AdminFooter = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <footer className="admin-footer">
      <div className="footer-content">
        {/* About Section */}
        <div className="footer-section about">
          <h3>About Admin Panel</h3>
          <p>
            Manage your platform efficiently with the UG Healing Center admin panel. Access key features like user management, product updates, and system monitoring.
          </p>
        </div>

        {/* Quick Links Section */}
        <div className="footer-section links">
          <h3>Quick Links</h3>
          <ul>
            <li><Link to="/admin/dashboard" className="footer-link">Dashboard</Link></li>
            <li><Link to="/admin/manage-users" className="footer-link">Manage Users</Link></li>
            <li><Link to="/admin/manage-products" className="footer-link">Manage Products</Link></li>
            <li><Link to="/admin/manage-appointments" className="footer-link">Appointments</Link></li>
            <li><Link to="/admin/settings" className="footer-link">Settings</Link></li>
          </ul>
        </div>

        {/* Resources and Support Section */}
        <div className="footer-section resources">
          <h3>Resources & Support</h3>
          <ul>
            <li><Link to="/docs" className="footer-link">Documentation</Link></li>
            <li><Link to="/support" className="footer-link">Technical Support</Link></li>
            <li><Link to="/contact" className="footer-link">Contact Admin</Link></li>
            <li><Link to="/admin/logs" className="footer-link">System Logs</Link></li>
          </ul>
        </div>
      </div>

      {/* Social Media Links */}
      <div className="footer-social">
        <a href="https://facebook.com" aria-label="Facebook" target="_blank" rel="noopener noreferrer">
          <FaFacebookF />
        </a>
        <a href="https://twitter.com" aria-label="Twitter" target="_blank" rel="noopener noreferrer">
          <FaTwitter />
        </a>
        <a href="https://linkedin.com" aria-label="LinkedIn" target="_blank" rel="noopener noreferrer">
          <FaLinkedinIn />
        </a>
        <a href="https://github.com" aria-label="GitHub" target="_blank" rel="noopener noreferrer">
          <FaGithub />
        </a>
      </div>

      {/* Back to Top Button */}
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} UG Healing Center. All rights reserved.</p>
        <button className="back-to-top" onClick={scrollToTop} aria-label="Back to Top">
          <FaArrowUp className="arrow-icon" />
          Back to Top
        </button>
      </div>
    </footer>
  );
};

export default AdminFooter;
