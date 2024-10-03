import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa';
import './Header.css';
import logo from '../components/images/logo.png';

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [menuRef]);

  return (
    <>
      {/* Top header bar for contact and actions */}
      <div className="top-header">
        <div className="contact-info">
          <span>Phone: 0315 1766375 | 0300 0308910</span>
          <a href="https://wa.me/03000308910" target="_blank" rel="noopener noreferrer">
            <img src="/images/whatsapp-icon.png" alt="WhatsApp" className="whatsapp-icon" />
          </a>
        </div>
        <div className="actions">
          <Link to="/appointment" className="appointment-button">Book An Appointment</Link>
          <Link to="/join-as-practitioner" className="join-practitioner-button">Join as Practitioner</Link>
        </div>
      </div>

      {/* Main header container */}
        <div className="header-container">
          <div className="menu-icon" onClick={toggleMenu}>
            {menuOpen ? <FaTimes /> : <FaBars />}
          </div>
          <div className="logo">
            <img src={logo} alt="Hijama" />
          </div>
          <nav ref={menuRef} className={`nav-bar ${menuOpen ? 'active' : ''}`}>
            <div className="Nav-Items">
            <ul className="nav-links">
              <li><Link to="/" onClick={toggleMenu}>Home</Link></li>
              <li><Link to="/about" onClick={toggleMenu}>About</Link></li>
              <li><Link to="/knowledge-base" onClick={toggleMenu}>Knowledge Base</Link></li>
              
              {/* <li className="dropdown">
                <span>Knowledge Base</span>
                <ul className="dropdown-content">
                  <li><Link to="/knowledge-base/hijama-in-islam" onClick={toggleMenu}>Hijama in Islam</Link></li>
                  <li><Link to="/knowledge-base/hijama-modern-world" onClick={toggleMenu}>Hijama & Modern World</Link></li>
                  <li><Link to="/knowledge-base/hijama-history" onClick={toggleMenu}>Hijama History</Link></li>
                  <li><Link to="/knowledge-base/benefits-of-hijama" onClick={toggleMenu}>Benefits of Hijama</Link></li>
                  <li><Link to="/knowledge-base/hijama-sunnah-dates" onClick={toggleMenu}>Hijama Sunnah Dates</Link></li>
                  <li><Link to="/knowledge-base/sunnah-points" onClick={toggleMenu}>Sunnah Points</Link></li>
                  <li><Link to="/knowledge-base/hijama-course" onClick={toggleMenu}>Hijama Course</Link></li>
                </ul>
              </li> */}
              {/* <li className="dropdown">
                <span>Products</span>
                <ul className="dropdown-content">
                  <li><Link to="/products/hijama-cups" onClick={toggleMenu}>Hijama Cups</Link></li>
                  <li><Link to="/products/hijama-pumps" onClick={toggleMenu}>Hijama Pumps</Link></li>
                  <li><Link to="/products/hijama-kits" onClick={toggleMenu}>Hijama Kits</Link></li>
                  <li><Link to="/products/honey" onClick={toggleMenu}>Honey</Link></li>
                </ul>
              </li> */}
              <li><Link to="/products" onClick={toggleMenu}>Products</Link></li>
              <li><Link to="/contact" onClick={toggleMenu}>Contact</Link></li>
              <li><Link to="/login" onClick={toggleMenu}>Login</Link></li>
            </ul>
            </div>
          </nav>
        </div>
    </>
  );
};

export default Header;
