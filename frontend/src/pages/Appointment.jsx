import React, { useState } from 'react';
import axios from 'axios';

const Appointment = () => {
  const [appointmentData, setAppointmentData] = useState({
    name: '',
    email: '',
    phoneNumber: '',
    services: 'Service1',  // Default service option
    preferredDate: '',
    preferredTime: 'Morning',  // Default time option
    message: ''
  });

  // Handle input changes and update state accordingly
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAppointmentData({ ...appointmentData, [name]: value });
  };

  // Handle form submission to add a new appointment
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Send the appointment data to the backend
      const response = await axios.post('http://localhost:5000/appointments', appointmentData);
      
      // After successful submission, alert the user or take another action
      alert('Appointment booked successfully!');
      setAppointmentData({  // Reset form
        name: '',
        email: '',
        phoneNumber: '',
        services: 'Service1',
        preferredDate: '',
        preferredTime: 'Morning',
        message: ''
      });
    } catch (error) {
      // Handle errors
      console.error('Error booking appointment:', error);
      alert('Failed to book appointment. Please try again.');
    }
  };

  return (
    <div className="appointment-form-container">
      <h2>Book an Appointment</h2>
      <form onSubmit={handleSubmit}>
        {/* Name Field */}
        <div className="form-field">
          <label htmlFor="name">Full Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={appointmentData.name}
            onChange={handleInputChange}
            required
          />
        </div>

        {/* Email Field */}
        <div className="form-field">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={appointmentData.email}
            onChange={handleInputChange}
            required
          />
        </div>

        {/* Phone Number Field */}
        <div className="form-field">
          <label htmlFor="phoneNumber">Phone Number:</label>
          <input
            type="text"
            id="phoneNumber"
            name="phoneNumber"
            value={appointmentData.phoneNumber}
            onChange={handleInputChange}
            required
          />
        </div>

        {/* Service Dropdown */}
        <div className="form-field">
          <label htmlFor="services">Select Service:</label>
          <select
            id="services"
            name="services"
            value={appointmentData.services}
            onChange={handleInputChange}
            required
          >
            <option value="Service1">Service1</option>
            <option value="Service2">Service2</option>
            <option value="Service3">Service3</option>
          </select>
        </div>

        {/* Preferred Date Field */}
        <div className="form-field">
          <label htmlFor="preferredDate">Preferred Appointment Date:</label>
          <input
            type="date"
            id="preferredDate"
            name="preferredDate"
            value={appointmentData.preferredDate}
            onChange={handleInputChange}
            required
          />
        </div>

        {/* Preferred Time Dropdown */}
        <div className="form-field">
          <label htmlFor="preferredTime">Preferred Time:</label>
          <select
            id="preferredTime"
            name="preferredTime"
            value={appointmentData.preferredTime}
            onChange={handleInputChange}
            required
          >
            <option value="Morning">Morning</option>
            <option value="Afternoon">Afternoon</option>
            <option value="Evening">Evening</option>
          </select>
        </div>

        {/* Message Field (Optional) */}
        <div className="form-field">
          <label htmlFor="message">Additional Message (optional):</label>
          <textarea
            id="message"
            name="message"
            value={appointmentData.message}
            onChange={handleInputChange}
            placeholder="Enter any additional details or requests"
          />
        </div>

        {/* Submit Button */}
        <div className="form-field">
          <button type="submit">Book Appointment</button>
        </div>
      </form>
    </div>
  );
};

export default Appointment;
