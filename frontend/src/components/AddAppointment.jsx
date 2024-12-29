// src/components/AddAppointment.js
import React, { useState } from "react";
import axios from "axios";
import "./AddAppointment.css";

const AddAppointment = ({ onAddAppointment, onClose }) => {
  const [appointmentData, setAppointmentData] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    services: "",
    preferredDate: "",
    preferredTime: "",
    message: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAppointmentData({ ...appointmentData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3000/appointments",
        appointmentData
      );
      onAddAppointment(response.data);
      onClose();
    } catch (error) {
      console.error("Error adding appointment:", error);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="appointment-registration-container">
        <h2 className="appointment-registration-title">Add New Appointment</h2>
        <form onSubmit={handleSubmit} className="appointment-registration-form">
          <div className="appointment-form-group">
            <label className="appointment-label">Full Name</label>
            <input
              type="text"
              name="name"
              value={appointmentData.name}
              onChange={handleInputChange}
              className="appointment-input"
              required
            />
          </div>

          <div className="appointment-form-group">
            <label className="appointment-label">Email Address</label>
            <input
              type="email"
              name="email"
              value={appointmentData.email}
              onChange={handleInputChange}
              className="appointment-input"
              required
            />
          </div>

          <div className="appointment-form-group">
            <label className="appointment-label">Mobile Number</label>
            <input
              type="tel"
              name="phoneNumber"
              value={appointmentData.phoneNumber}
              onChange={handleInputChange}
              className="appointment-input"
              required
            />
          </div>

          <div className="appointment-form-group">
            <label className="appointment-label">Service</label>
            <select
              name="services"
              value={appointmentData.services}
              onChange={handleInputChange}
              className="appointment-select"
              required
            >
              <option value="">Select Service</option>
              <option value="Consultation">Consultation</option>
              <option value="Treatment">Treatment</option>
              <option value="Checkup">Checkup</option>
            </select>
          </div>

          <div className="appointment-form-group">
            <label className="appointment-label">Preferred Date</label>
            <input
              type="date"
              name="preferredDate"
              value={appointmentData.preferredDate}
              onChange={handleInputChange}
              min={new Date().toISOString().split("T")[0]}
              className="appointment-input"
              required
            />
          </div>

          <div className="appointment-form-group">
            <label className="appointment-label">Preferred Time</label>
            <select
              name="preferredTime"
              value={appointmentData.preferredTime}
              onChange={handleInputChange}
              className="appointment-select"
              required
            >
              <option value="">Select Time</option>
              <option value="8:30">8:30</option>
              <option value="10:00">10:00</option>
              <option value="11:30">11:30</option>
              <option value="1:00">1:00</option>
              <option value="2:30">2:30</option>
              <option value="4:00">4:00</option>
              <option value="5:30">5:30</option>
            </select>
          </div>

          <div className="appointment-form-group">
            <label className="appointment-label">Additional Message</label>
            <textarea
              name="message"
              value={appointmentData.message}
              onChange={handleInputChange}
              className="appointment-textarea"
              rows="4"
            />
          </div>

          <button type="submit" className="appointment-submit-btn">
            Add Appointment
          </button>
          <button type="button" onClick={onClose} className="appointment-close-btn">
            Close
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddAppointment;
