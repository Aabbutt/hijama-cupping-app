// src/components/AddAppointment.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import "./AddAppointment.css";

const AddAppointment = ({ onSuccess, onClose, isAdminContext = false }) => {
  const [appointmentData, setAppointmentData] = useState({
    name: "",
    email: "",
    phone: "",
    services: "",
    preferredDate: "",
    preferredTime: "",
    message: "",
    status: "pending"
  });

  const [error, setError] = useState("");
  const [user, setUser] = useState(null);

  // Get user data on component mount - only if not in admin context
  useEffect(() => {
    if (!isAdminContext) {
      const token = localStorage.getItem('token');
      const userData = localStorage.getItem('user');
      
      if (token && userData) {
        try {
          const parsedUser = JSON.parse(userData);
          setUser(parsedUser);
          // Pre-fill the form with user data
          setAppointmentData(prev => ({
            ...prev,
            name: parsedUser.name || "",
            email: parsedUser.email || "",
            phone: parsedUser.phone || ""
          }));
        } catch (error) {
          console.error('Error parsing user data:', error);
          setError('Error loading user data');
        }
      }
    }
  }, [isAdminContext]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAppointmentData({ ...appointmentData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const config = {
        headers: { Authorization: `Bearer ${token}` }
      };

      const response = await axios.post(
        "http://localhost:3000/appointments",
        appointmentData,
        config
      );

      console.log("Appointment created:", response.data);
      onSuccess(response.data);
      onClose();
    } catch (error) {
      console.error("Error creating appointment:", error);
      setError(error.response?.data?.message || "Failed to create appointment");
    }
  };

  return (
    <div className="modal-overlay">
      <div className="appointment-registration-container">
        <button className="close-button" onClick={onClose} aria-label="Close modal">&times;</button>
        <h2 className="appointment-registration-title">
          {isAdminContext ? "Add New Appointment" : "Book Appointment"}
        </h2>
        {error && <div className="appointment-error-message">{error}</div>}
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
              name="phone"
              value={appointmentData.phone}
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
              <option value="wet cupping">Wet Cupping</option>
              <option value="dry cupping">Dry Cupping</option>
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

          <div className="appointment-form-buttons">
            <button type="button" onClick={onClose} className="appointment-cancel-btn">
              Cancel
            </button>
            <button type="submit" className="appointment-submit-btn">
              Book Appointment
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddAppointment;
