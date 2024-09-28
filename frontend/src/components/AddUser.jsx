// src/components/AddUser.js

import React, { useState } from 'react';
import './AddUser.css'; // Add styling as needed

const AddUser = ({ onAddUser, users = [], onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    role: 'User', // Default role
    experience: '',
    certification: '',
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
    if (!formData.name.trim()) {
      newErrors.name = 'Full Name is required.';
    }
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required.';
    }
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required.';
    }

    // Email format validation
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address.';
    }

    // Check for duplicate email
    const isDuplicate = users.some(
      (user) => user.email.toLowerCase() === formData.email.toLowerCase()
    );
    if (isDuplicate) {
      newErrors.email = 'This email is already registered.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Return true if no errors
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) {
      return; // Stop if validation fails
    }
    const newUser = {
      id: Date.now(), // Unique ID
      ...formData,
    };
    onAddUser(newUser);
    onClose(); // Close the modal after adding user
  };

  return (
    <div className="modal" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <span className="close-button" onClick={onClose}>
          &times;
        </span>
        <h2>Add New User</h2>
        <form onSubmit={handleSubmit} className="add-user-form">
          <div className="form-group">
            <label htmlFor="name">Full Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              placeholder="Enter full name"
            />
            {errors.name && <span className="error-message">{errors.name}</span>}
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="Enter email"
            />
            {errors.email && <span className="error-message">{errors.email}</span>}
          </div>
          <div className="form-group">
            <label htmlFor="phone">Phone</label>
            <input
              type="text"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
              placeholder="Enter phone number"
            />
            {errors.phone && <span className="error-message">{errors.phone}</span>}
          </div>
          <div className="form-group">
            <label htmlFor="role">Role</label>
            <select
              id="role"
              name="role"
              value={formData.role}
              onChange={handleChange}
              required
            >
              <option value="User">User</option>
              <option value="Admin">Admin</option>
              <option value="Moderator">Moderator</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="experience">Experience (Years)</label>
            <input
              type="number"
              id="experience"
              name="experience"
              value={formData.experience}
              onChange={handleChange}
              placeholder="Enter years of experience"
            />
          </div>
          <div className="form-group">
            <label htmlFor="certification">Certification</label>
            <input
              type="text"
              id="certification"
              name="certification"
              value={formData.certification}
              onChange={handleChange}
              placeholder="Enter certifications"
            />
          </div>
          <button type="submit">Add User</button>
        </form>
      </div>
    </div>
  );
};

export default AddUser;
