// src/components/AddAppointment.js
import React, { useState } from "react";
import axios from "axios";
import "./AddAppointment.css";

const AddAppointment = ({ onAddAppointment, onClose }) => {
  const [appointmentData, setAppointmentData] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    services: "Service1",
    preferredDate: "",
    preferredTime: "Morning",
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
      onClose(); // Close the add appointment form
    } catch (error) {
      console.error("Error adding appointment:", error);
    }
  };

  return (
    <div className="appointment-form">
      <h2>Add New Appointment</h2>
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
          <option value="Service1">Consultation</option>
          <option value="Service2">Treatement</option>
          <option value="Service3">Checkup</option>
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
          min={new Date().toISOString().split("T")[0]}
        >
          <option value="8:30">8:30</option>
          <option value="10:00">10:00</option>
          <option value="11:30">11:30</option>
          <option value="11:00">11:00</option>
          <option value="2:30">2:30</option>
          <option value="4:00">4:00</option>
          <option value="5:30">5:30</option>
        </select>
        <textarea
          name="message"
          value={appointmentData.message}
          onChange={handleInputChange}
          placeholder="Message (optional)"
        />
        <button type="submit">Add Appointment</button>
      </form>
      <button onClick={onClose}>Close</button>
    </div>
  );
};

export default AddAppointment;
