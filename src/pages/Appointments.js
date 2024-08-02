import React from 'react';
import './Appointments.css';

const Appointments = () => {
  return (
    <div className="appointments">
      <h1>Book an Appointment</h1>
      <p>Schedule your Hijama treatment session with our certified practitioners.</p>
      <form className="appointment-form">
        <label htmlFor="name">Name:</label>
        <input type="text" id="name" name="name" required />

        <label htmlFor="email">Email:</label>
        <input type="email" id="email" name="email" required />

        <label htmlFor="date">Preferred Date:</label>
        <input type="date" id="date" name="date" required />

        <label htmlFor="time">Preferred Time:</label>
        <input type="time" id="time" name="time" required />

        <button type="submit">Book Appointment</button>
      </form>
    </div>
  );
};

export default Appointments;
