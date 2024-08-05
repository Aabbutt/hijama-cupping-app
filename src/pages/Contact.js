import React from 'react';
import './Contact.css';

const Contact = () => {
  return (
    <div className="contact-page">
      <div className="contact-left">
        <h1>Benefits of Hijama Cupping Therapy</h1>
        <p>Discover the healing power of hijama cupping therapy</p>
        <ul>
          <li>Relieves muscle tension and pain</li>
          <li>Improves blood circulation</li>
          <li>Boosts immune system</li>
          <li>Detoxifies the body</li>
          <li>Reduces stress and anxiety</li>
        </ul>
      </div>
      <div className="contact-right">
        <div className="contact-container">
          <h2>Contact Us</h2>
          <p>Please fill out the form below to get in touch</p>
          <form className="contact-form">
            <div className="form-group">
              <label htmlFor="name">Name:</label>
              <input type="text" id="name" name="name" required />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email:</label>
              <input type="email" id="email" name="email" required />
            </div>
            <div className="form-group">
              <label htmlFor="message">Message:</label>
              <textarea id="message" name="message" required></textarea>
            </div>
            <button type="submit">Send Message</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
