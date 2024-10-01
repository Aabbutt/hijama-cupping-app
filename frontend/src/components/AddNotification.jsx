import React, { useState } from 'react';
import './AddNotification.css'; // Add styling as needed

const AddNotification = ({ onAddNotification, onEditNotification, notification = null, onClose }) => {
  const [formData, setFormData] = useState({
    title: notification ? notification.title : '',
    message: notification ? notification.message : '',
    date: notification ? notification.date : '',
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
    if (!formData.title.trim()) {
      newErrors.title = 'Notification Title is required.';
    }
    if (!formData.message.trim()) {
      newErrors.message = 'Notification Message is required.';
    }
    if (!formData.date) {
      newErrors.date = 'Date is required.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Return true if no errors
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) {
      return; // Stop if validation fails
    }
    
    const newNotification = {
      id: notification ? notification.id : Date.now(), // Unique ID
      ...formData,
    };

    if (notification) {
      onEditNotification(newNotification);
    } else {
      onAddNotification(newNotification);
    }
    onClose(); // Close the modal after adding or editing notification
  };

  return (
    <div className="modal" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <span className="close-button" onClick={onClose}>
          &times;
        </span>
        <h2>{notification ? 'Edit Notification' : 'Add New Notification'}</h2>
        <form onSubmit={handleSubmit} className="add-notification-form">
          <div className="form-group">
            <label htmlFor="title">Notification Title</label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              placeholder="Enter notification title"
            />
            {errors.title && <span className="error-message">{errors.title}</span>}
          </div>
          <div className="form-group">
            <label htmlFor="message">Notification Message</label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              placeholder="Enter notification message"
            />
            {errors.message && <span className="error-message">{errors.message}</span>}
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
          <button type="submit">{notification ? 'Update Notification' : 'Add Notification'}</button>
        </form>
      </div>
    </div>
  );
};

export default AddNotification;
