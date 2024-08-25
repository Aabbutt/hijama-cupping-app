import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

const Header = () => {
  return (
    <>
      {/* Top header bar for contact and actions */}
      <div className="top-header">
        <div className="contact-info">
          <span>UAN: 051 111 000 432 | 03 111 000 432</span>
          <a href="https://wa.me/03111000432" target="_blank" rel="noopener noreferrer">
            <img src="/images/whatsapp-icon.png" alt="WhatsApp" className="whatsapp-icon" />
          </a>
        </div>
        <div className="actions">
          <Link to="/appointment" className="appointment-button">Book An Appointment</Link>
          <Link to="/discount-card" className="discount-card-button">Join as Practitioner</Link>
        </div>
      </div>

      {/* Main header container */}
      <header>
        <div className="header-container">
          <div className="logo">
            <img src="/images/logo.png" alt="Hijama Clinic" />
          </div>
          <nav>
            <ul className="nav-links">
              <li><Link to="/">Home</Link></li>
              <li><Link to="/about">About</Link></li>
              <li className="dropdown">
                <span>Knowledge Base</span>
                <ul className="dropdown-content">
                  <li><Link to="/knowledge-base/hijama-in-islam">Hijama in Islam</Link></li>
                  <li><Link to="/knowledge-base/hijama-modern-world">Hijama & Modern World</Link></li>
                  <li><Link to="/knowledge-base/hijama-history">Hijama History</Link></li>
                  <li><Link to="/knowledge-base/benefits-of-hijama">Benefits of Hijama</Link></li>
                  <li><Link to="/knowledge-base/hijama-sunnah-dates">Hijama Sunnah Dates</Link></li>
                  <li><Link to="/knowledge-base/sunnah-points">Sunnah Points</Link></li>
                  <li><Link to="/knowledge-base/hijama-course">Hijama Course</Link></li>
                </ul>
              </li>
              <li className="dropdown">
                <span>Products</span>
                <ul className="dropdown-content">
                  <li><Link to="/products/hijama-cups">Hijama Cups</Link></li>
                  <li><Link to="/products/hijama-pumps">Hijama Pumps</Link></li>
                  <li><Link to="/products/hijama-kits">Hijama Kits</Link></li>
                  <li><Link to="/products/honey">Honey</Link></li>
                </ul>
              </li>
              <li><Link to="/contact">Contact</Link></li>
              <li><Link to="/login">Login</Link></li>
            </ul>
          </nav>
          <div className="search-container">
            <input type="text" placeholder="Search" />
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
