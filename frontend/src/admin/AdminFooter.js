// src/admin/AdminFooter.js
import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaGithub, FaArrowUp } from 'react-icons/fa';
import './AdminFooter.css'; // Import styles

const AdminFooter = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <footer className="admin-footer">
      <div className="footer-container">
        {/* About Us Section */}
        <div className="footer-section about">
          <h3>About Us</h3>
          <p>
            UG Healing Center is a leading ISO Certified Hijama Alternative Clinic across Pakistan,
            providing quality healthcare services and Certified Training for Hijama Cupping Therapy.
          </p>
        </div>

        {/* Quick Links Section */}
        <div className="footer-section links">
          <h3>Quick Links</h3>
          <ul>
            <li><Link to="/admin/dashboard" className="footer-link">Dashboard</Link></li>
            <li><Link to="/admin/manage-users" className="footer-link">Manage Users</Link></li>
            <li><Link to="/admin/manage-products" className="footer-link">Manage Products</Link></li>
            <li><Link to="/admin/manage-appointments" className="footer-link">Manage Appointments</Link></li>
          </ul>
        </div>

        {/* Social Media Icons */}
        <div className="footer-social">
          <a href="https://facebook.com" aria-label="Facebook" target="_blank" rel="noopener noreferrer" className="social-icon">
            <FaFacebookF />
          </a>
          <a href="https://twitter.com" aria-label="Twitter" target="_blank" rel="noopener noreferrer" className="social-icon">
            <FaTwitter />
          </a>
          <a href="https://linkedin.com" aria-label="LinkedIn" target="_blank" rel="noopener noreferrer" className="social-icon">
            <FaLinkedinIn />
          </a>
          <a href="https://github.com" aria-label="GitHub" target="_blank" rel="noopener noreferrer" className="social-icon">
            <FaGithub />
          </a>
        </div>
      </div>

      {/* Footer Bottom Section */}
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
