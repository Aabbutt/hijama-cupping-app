// src/components/Footer.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
  FaArrowUp,
} from 'react-icons/fa';
import './Footer.css';

const Footer = () => {
  const [email, setEmail] = useState('');
  const [subscriptionStatus, setSubscriptionStatus] = useState('');

  const handleSubscription = (e) => {
    e.preventDefault();
    // Placeholder for subscription logic (e.g., API call)
    if (email) {
      setSubscriptionStatus('Thank you for subscribing!');
      setEmail('');
    } else {
      setSubscriptionStatus('Please enter a valid email.');
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <footer className="footer">
      <div className="footer-container">
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
            <li>
              <Link to="/" className="footer-link">
                Home
              </Link>
            </li>
            <li>
              <Link to="/about" className="footer-link">
                About
              </Link>
            </li>
            <li>
              <Link to="/knowledge-base" className="footer-link">
                Knowledge Base
              </Link>
            </li>
            <li>
              <Link to="/products" className="footer-link">
                Products
              </Link>
            </li>
            <li>
              <Link to="/contact" className="footer-link">
                Contact
              </Link>
            </li>
            {/* Admin Login Link */}
            <li>
              <Link to="/admin/login" className="admin-login-link">
                Admin Login
              </Link>
            </li>
          </ul>
        </div>

        {/* Products Section */}
        <div className="footer-section products">
          <h3>Our Products</h3>
          <ul>
            <li>
              <Link to="/products#hijama-cups" className="footer-link">
                Hijama Cups
              </Link>
            </li>
            <li>
              <Link to="/products#hijama-pumps" className="footer-link">
                Hijama Pumps
              </Link>
            </li>
            <li>
              <Link to="/products#hijama-kits" className="footer-link">
                Hijama Kits
              </Link>
            </li>
            <li>
              <Link to="/products#honey" className="footer-link">
                Honey
              </Link>
            </li>
          </ul>
        </div>

        {/* Newsletter Subscription Section */}
        <div className="footer-section newsletter">
          <h3>Newsletter</h3>
          <form onSubmit={handleSubscription} className="newsletter-form">
            <input
              type="email"
              placeholder="Enter your email"
              aria-label="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <button type="submit" className="subscribe-button">
              Subscribe
            </button>
          </form>
          {subscriptionStatus && (
            <p className="subscription-status">{subscriptionStatus}</p>
          )}
        </div>
      </div>

      {/* Social Media Icons */}
      <div className="footer-social">
        <a
          href="https://facebook.com"
          aria-label="Facebook"
          target="_blank"
          rel="noopener noreferrer"
          className="social-icon"
        >
          <FaFacebookF />
        </a>
        <a
          href="https://twitter.com"
          aria-label="Twitter"
          target="_blank"
          rel="noopener noreferrer"
          className="social-icon"
        >
          <FaTwitter />
        </a>
        <a
          href="https://instagram.com"
          aria-label="Instagram"
          target="_blank"
          rel="noopener noreferrer"
          className="social-icon"
        >
          <FaInstagram />
        </a>
        <a
          href="https://linkedin.com"
          aria-label="LinkedIn"
          target="_blank"
          rel="noopener noreferrer"
          className="social-icon"
        >
          <FaLinkedinIn />
        </a>
      </div>

      {/* Footer Bottom Section */}
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} UG Healing Center. All rights reserved.</p>
        <button
          className="back-to-top"
          onClick={scrollToTop}
          aria-label="Back to Top"
        >
          <FaArrowUp className="arrow-icon" />
          Back to Top
        </button>
      </div>
    </footer>
  );
};

export default Footer;
