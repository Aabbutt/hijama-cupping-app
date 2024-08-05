import React from 'react';
import './Appointment.css';

const Appointment = () => {
  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle form submission logic here
    alert("Appointment request submitted successfully!");
  };

  return (
    <div className="appointment-page">
      <div className="appointment-left">
        <h1>Benefits of Hijama</h1>
        <p>Hijama (cupping therapy) is an ancient form of alternative medicine in which a therapist puts special cups on your skin for a few minutes to create suction. People get it for many purposes, including to help with pain, inflammation, blood flow, relaxation, and well-being, and as a type of deep-tissue massage.</p>
        <ul>
          <li>Improves blood circulation</li>
          <li>Removes toxins from the body</li>
          <li>Relieves muscle tension and pain</li>
          <li>Boosts immune system</li>
          <li>Promotes relaxation and well-being</li>
        </ul>
      </div>
      <div className="appointment-right">
        <div className="appointment-container">
          <h2>Book Your Appointment</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input type="text" id="name" name="name" required />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input type="email" id="email" name="email" required />
            </div>
            <div className="form-group">
              <label htmlFor="phone">Phone Number</label>
              <div className="phone-input">
                <span className="country-code">+92</span>
                <input type="text" id="phone" name="phone" required />
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="services">Services</label>
              <select id="services" name="services" required>
                <option value="">Choose a Service</option>
                <option value="Service1">Service 1</option>
                <option value="Service2">Service 2</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="preferredDate">Preferred Date</label>
              <input type="date" id="preferredDate" name="preferredDate" required />
            </div>
            <div className="form-group">
              <label htmlFor="preferredTime">Preferred Time</label>
              <select id="preferredTime" name="preferredTime" required>
                <option value="">—Please choose an option—</option>
                <option value="Morning">Morning</option>
                <option value="Afternoon">Afternoon</option>
                <option value="Evening">Evening</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="message">Message</label>
              <textarea id="message" name="message" rows="4"></textarea>
            </div>
            <button type="submit" className="submit-button">Submit</button>
          </form>
          <p className="confirmation-message">
            Your preferred timing will be confirmed by our receptionist based on availability. For other timing options, call us at <a href="tel:043351200">04-3351200</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Appointment;
