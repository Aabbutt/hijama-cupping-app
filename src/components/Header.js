import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

const Header = () => {
  return (
    <header>
      <div className="header-container">
        <div className="logo">
          <img src="/images/logo.png" alt="Hijama Clinic" />
        </div>
        <nav>
          <ul className="other-content">
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
  );
};

export default Header;
