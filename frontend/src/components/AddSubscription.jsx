import React, { useState } from 'react';
import './AddSubscription.css'; // Add styling as needed

const AddSubscription = ({ onAddSubscription, onEditSubscription, subscription = null, onClose }) => {
  const [formData, setFormData] = useState({
    subscriberName: subscription ? subscription.subscriberName : '',
    planType: subscription ? subscription.planType : 'Basic',
    startDate: subscription ? subscription.startDate : '',
    status: subscription ? subscription.status : 'Active',
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
    if (!formData.subscriberName.trim()) {
      newErrors.subscriberName = 'Subscriber Name is required.';
    }
    if (!formData.startDate) {
      newErrors.startDate = 'Start Date is required.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Return true if no errors
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) {
      return; // Stop if validation fails
    }
    
    const newSubscription = {
      id: subscription ? subscription.id : Date.now(), // Unique ID
      ...formData,
    };

    if (subscription) {
      onEditSubscription(newSubscription);
    } else {
      onAddSubscription(newSubscription);
    }
    onClose(); // Close the modal after adding or editing subscription
  };

  return (
    <div className="modal" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <span className="close-button" onClick={onClose}>
          &times;
        </span>
        <h2>{subscription ? 'Edit Subscription' : 'Add New Subscription'}</h2>
        <form onSubmit={handleSubmit} className="add-subscription-form">
          <div className="form-group">
            <label htmlFor="subscriberName">Subscriber Name</label>
            <input
              type="text"
              id="subscriberName"
              name="subscriberName"
              value={formData.subscriberName}
              onChange={handleChange}
              required
              placeholder="Enter subscriber name"
            />
            {errors.subscriberName && <span className="error-message">{errors.subscriberName}</span>}
          </div>
          <div className="form-group">
            <label htmlFor="planType">Plan Type</label>
            <select
              id="planType"
              name="planType"
              value={formData.planType}
              onChange={handleChange}
            >
              <option value="Basic">Basic</option>
              <option value="Premium">Premium</option>
              <option value="VIP">VIP</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="startDate">Start Date</label>
            <input
              type="date"
              id="startDate"
              name="startDate"
              value={formData.startDate}
              onChange={handleChange}
              required
            />
            {errors.startDate && <span className="error-message">{errors.startDate}</span>}
          </div>
          <div className="form-group">
            <label htmlFor="status">Status</label>
            <select
              id="status"
              name="status"
              value={formData.status}
              onChange={handleChange}
            >
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>
          <button type="submit">{subscription ? 'Update Subscription' : 'Add Subscription'}</button>
        </form>
      </div>
    </div>
  );
};

export default AddSubscription;
