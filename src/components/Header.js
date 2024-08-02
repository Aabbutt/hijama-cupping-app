import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

const Header = () => {
  return (
    <header className="header">
      <div className="logo">
        <img src="/logo.png" alt="Hijama Cupping App" />
      </div>
      <nav>
        <ul>
          <li><Link to="/">Main</Link></li>
          <li><Link to="/services">Services</Link></li>
          <li><Link to="/testimonials">Testimonials</Link></li>
          <li><Link to="/about">About Us</Link></li>
          <li><Link to="/contact">Contact</Link></li>
          <li><Link to="/login">Login</Link></li>
          <li><button className="book-now">Book Now</button></li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;