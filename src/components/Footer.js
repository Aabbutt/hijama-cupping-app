import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section company">
          <h3>Company</h3>
          <ul>
            <li>About</li>
            <li>FAQ</li>
            <li>Career</li>
          </ul>
        </div>
        <div className="footer-section legal">
          <h3>Legal</h3>
          <ul>
            <li>Terms of Use</li>
            <li>Privacy</li>
            <li>Cookie</li>
          </ul>
        </div>
        <div className="footer-section social">
          <h3>Social</h3>
          <ul>
            <li>Facebook</li>
            <li>Twitter</li>
            <li>LinkedIn</li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
