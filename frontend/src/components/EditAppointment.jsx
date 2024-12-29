// src/components/EditAppointment.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import "./EditAppointment.css";

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
      const response = await axios.put(
        `http://localhost:3000/appointments/${appointmentData._id}`,
        appointmentData
      );
      onUpdate(response.data);
      onClose();
    } catch (error) {
      console.error("Error updating appointment:", error);
    }
  };

  return (
    <div className="hc-appointment-form">
      <h2 className="hc-appointment-form-title">Edit Appointment</h2>
      <form onSubmit={handleSubmit}>
        <div className="hc-form-group">
          <label className="hc-form-label">Full Name</label>
          <input
            type="text"
            name="name"
            value={appointmentData.name}
            onChange={handleInputChange}
            className="hc-form-input"
            required
          />
        </div>

        <div className="hc-form-group">
          <label className="hc-form-label">Email Address</label>
          <input
            type="email"
            name="email"
            value={appointmentData.email}
            onChange={handleInputChange}
            className="hc-form-input"
            required
          />
        </div>

        <div className="hc-form-group">
          <label className="hc-form-label">Mobile Number</label>
          <input
            type="tel"
            name="phoneNumber"
            value={appointmentData.phoneNumber}
            onChange={handleInputChange}
            className="hc-form-input"
            required
          />
        </div>

        <div className="hc-form-group">
          <label className="hc-form-label">Service</label>
          <select
            name="services"
            value={appointmentData.services}
            onChange={handleInputChange}
            className="hc-form-select"
            required
          >
            <option value="">Select Service</option>
            <option value="Consultation">Consultation</option>
            <option value="Treatment">Treatment</option>
            <option value="Checkup">Checkup</option>
          </select>
        </div>

        <div className="hc-form-group">
          <label className="hc-form-label">Preferred Date</label>
          <input
            type="date"
            name="preferredDate"
            value={appointmentData.preferredDate}
            onChange={handleInputChange}
            min={new Date().toISOString().split("T")[0]}
            className="hc-form-input"
            required
          />
        </div>

        <div className="hc-form-group">
          <label className="hc-form-label">Preferred Time</label>
          <select
            name="preferredTime"
            value={appointmentData.preferredTime}
            onChange={handleInputChange}
            className="hc-form-select"
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

        <div className="hc-form-group">
          <label className="hc-form-label">Additional Message</label>
          <textarea
            name="message"
            value={appointmentData.message}
            onChange={handleInputChange}
            className="hc-form-textarea"
            rows="4"
          />
        </div>

        <button type="submit" className="hc-form-submit-btn">
          Update Appointment
        </button>
      </form>
      <button onClick={onClose} className="hc-form-close-btn">
        Close
      </button>
    </div>
  );
};

export default EditAppointment;
