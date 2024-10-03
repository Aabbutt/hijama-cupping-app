import React, { useState } from 'react';
import './AddRoomSchedule.css'; // Add styling as needed

const AddRoomSchedule = ({ onAddSchedule, onEditSchedule, schedule = null, onClose }) => {
  const [formData, setFormData] = useState({
    roomName: schedule ? schedule.roomName : '',
    clientName: schedule ? schedule.clientName : '',
    date: schedule ? schedule.date : '',
    time: schedule ? schedule.time : '',
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Validation function to ensure all fields are correctly filled
  const validateForm = () => {
    const newErrors = {};

    // Check for empty fields
    if (!formData.roomName.trim()) {
      newErrors.roomName = 'Room Name is required.';
    }
    if (!formData.clientName.trim()) {
      newErrors.clientName = 'Client Name is required.';
    }
    if (!formData.date) {
      newErrors.date = 'Date is required.';
    }
    if (!formData.time) {
      newErrors.time = 'Time is required.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Return true if no errors
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) {
      return; // Stop if validation fails
    }
    
    const newSchedule = {
      id: schedule ? schedule.id : Date.now(), // Unique ID
      ...formData,
    };

    if (schedule) {
      onEditSchedule(newSchedule);
    } else {
      onAddSchedule(newSchedule);
    }
    onClose(); // Close the modal after adding or editing schedule
  };

  return (
    <div className="modal" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <span className="close-button" onClick={onClose}>
          &times;
        </span>
        <h2>{schedule ? 'Edit Room Schedule' : 'Add New Room Schedule'}</h2>
        <form onSubmit={handleSubmit} className="add-room-schedule-form">
          <div className="form-group">
            <label htmlFor="roomName">Room Name</label>
            <input
              type="text"
              id="roomName"
              name="roomName"
              value={formData.roomName}
              onChange={handleChange}
              required
              placeholder="Enter room name"
            />
            {errors.roomName && <span className="error-message">{errors.roomName}</span>}
          </div>
          <div className="form-group">
            <label htmlFor="clientName">Client Name</label>
            <input
              type="text"
              id="clientName"
              name="clientName"
              value={formData.clientName}
              onChange={handleChange}
              required
              placeholder="Enter client name"
            />
            {errors.clientName && <span className="error-message">{errors.clientName}</span>}
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
            {errors.time && <span className="error-message">{errors.time}</span>}
          </div>
          <button type="submit">{schedule ? 'Update Schedule' : 'Add Schedule'}</button>
        </form>
      </div>
    </div>
  );
};

export default AddRoomSchedule;
