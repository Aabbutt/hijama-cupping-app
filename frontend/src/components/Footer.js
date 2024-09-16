import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section about">
          <h3>About Us</h3>
          <p>UG Healing Center is one of the leading ISO Certified Hijama Alternative Clinics across Pakistan which provide quality health care services and Certified Training for Hijama Cupping Therapy.</p>
        </div>
        <div className="footer-section links">
          <h3>Quick Links</h3>
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/about">About</a></li>
            <li><a href="/knowledge-base">Knowledge Base</a></li>
            <li><a href="/products">Products</a></li>
            <li><a href="/contact">Contact</a></li>
          </ul>
        </div>
        <div className="footer-section products">
          <h3>Products</h3>
          <ul>
            <li><a href="/products#hijama-cups">Hijama Cups</a></li>
            <li><a href="/products#hijama-pumps">Hijama Pumps</a></li>
            <li><a href="/products#hijama-kits">Hijama Kits</a></li>
            <li><a href="/products#honey">Honey</a></li>
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; 2023 UG Healing Center. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
