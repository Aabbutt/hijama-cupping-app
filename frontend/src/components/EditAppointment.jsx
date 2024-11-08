// src/components/EditAppointment.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const EditAppointment = ({ appointment, onUpdate, onClose }) => {
  const [appointmentData, setAppointmentData] = useState(appointment);

  useEffect(() => {
    setAppointmentData(appointment);
  }, [appointment]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAppointmentData({ ...appointmentData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`http://localhost:5000/appointments/${appointmentData._id}`, appointmentData);
      onUpdate(response.data);
      onClose(); // Close the edit appointment form
    } catch (error) {
      console.error('Error updating appointment:', error);
    }
  };

  return (
    <div className="appointment-form">
      <h2>Edit Appointment</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          value={appointmentData.name}
          onChange={handleInputChange}
          placeholder="Name"
          required
        />
        <input
          type="email"
          name="email"
          value={appointmentData.email}
          onChange={handleInputChange}
          placeholder="Email"
          required
        />
        <input
          type="text"
          name="phoneNumber"
          value={appointmentData.phoneNumber}
          onChange={handleInputChange}
          placeholder="Phone Number"
          required
        />
        <select
          name="services"
          value={appointmentData.services}
          onChange={handleInputChange}
        >
          <option value="Service1">Service1</option>
          <option value="Service2">Service2</option>
          <option value="Service3">Service3</option>
        </select>
        <input
          type="date"
          name="preferredDate"
          value={appointmentData.preferredDate}
          onChange={handleInputChange}
          required
        />
        <select
          name="preferredTime"
          value={appointmentData.preferredTime}
          onChange={handleInputChange}
        >
          <option value="Morning">Morning</option>
          <option value="Afternoon">Afternoon</option>
          <option value="Evening">Evening</option>
        </select>
        <textarea
          name="message"
          value={appointmentData.message}
          onChange={handleInputChange}
          placeholder="Message (optional)"
        />
        <button type="submit">Update Appointment</button>
      </form>
      <button onClick={onClose}>Close</button>
    </div>
  );
};

export default EditAppointment;
