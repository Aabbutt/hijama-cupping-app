// src/components/AddAppointment.js

import React, { useState, useEffect } from 'react';
import './AddAppointment.css'; // Styling file

const AddAppointment = ({
  appointment = {},
  onAddAppointment,
  appointments = [], // Pass existing appointments for duplicate checking
  isEditing = false,
  onClose,
}) => {
  const [formData, setFormData] = useState({
    patientName: appointment.patientName || '',
    therapist: appointment.therapist || '',
    date: appointment.date || '',
    time: appointment.time || '',
    notes: appointment.notes || '',
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (isEditing) {
      setFormData({
        patientName: appointment.patientName,
        therapist: appointment.therapist,
        date: appointment.date,
        time: appointment.time,
        notes: appointment.notes,
      });
    }
  }, [appointment, isEditing]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    const newErrors = {};
    const selectedDateTime = new Date(`${formData.date}T${formData.time}`);
    const currentDateTime = new Date();

    // Check for past date and time
    if (selectedDateTime < currentDateTime) {
      newErrors.date = 'The appointment date and time must be in the future.';
    }

    // Check for duplicates
    const isDuplicate = appointments.some(
      (app) =>
        app.date === formData.date &&
        app.time === formData.time &&
        app.therapist === formData.therapist
    );

    if (isDuplicate) {
      newErrors.duplicate = 'An appointment with the same date, time, and therapist already exists.';
    }

    setErrors(newErrors);

    // If no errors, return true
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) {
      return; // Stop form submission if validation fails
    }

    const newAppointment = {
      id: appointment.id || Date.now(), // Use existing ID if editing, otherwise generate new
      ...formData,
    };
    onAddAppointment(newAppointment);
    if (onClose) onClose(); // Close the modal after adding/updating
  };

  return (
    <div className="modal" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <span className="close-button" onClick={onClose}>
          &times;
        </span>
        <h2>{isEditing ? 'Edit Appointment' : 'Add New Appointment'}</h2>
        <form onSubmit={handleSubmit} className="add-appointment-form">
          <div className="form-group">
            <label htmlFor="patientName">Patient Name</label>
            <input
              type="text"
              id="patientName"
              name="patientName"
              value={formData.patientName}
              onChange={handleChange}
              required
              placeholder="Enter patient name"
            />
          </div>
          <div className="form-group">
            <label htmlFor="therapist">Therapist</label>
            <input
              type="text"
              id="therapist"
              name="therapist"
              value={formData.therapist}
              onChange={handleChange}
              required
              placeholder="Enter therapist name"
            />
          </div>
          <div className="form-group">
            <label htmlFor="date">Date</label>
            <input
              type="date"
              id="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              required
            />
            {errors.date && <span className="error-message">{errors.date}</span>}
          </div>
          <div className="form-group">
            <label htmlFor="time">Time</label>
            <input
              type="time"
              id="time"
              name="time"
              value={formData.time}
              onChange={handleChange}
              required
            />
          </div>
          {errors.duplicate && <span className="error-message">{errors.duplicate}</span>}
          <div className="form-group">
            <label htmlFor="notes">Notes</label>
            <textarea
              id="notes"
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              placeholder="Enter any additional notes"
            />
          </div>
          <button type="submit">{isEditing ? 'Update Appointment' : 'Add Appointment'}</button>
        </form>
      </div>
    </div>
  );
};

export default AddAppointment;
