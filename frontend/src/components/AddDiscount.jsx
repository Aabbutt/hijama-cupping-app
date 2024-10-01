import React, { useState } from 'react';
import './AddDiscount.css'; // Add styling as needed

const AddDiscount = ({ onAddDiscount, onEditDiscount, discount = null, onClose }) => {
  const [formData, setFormData] = useState({
    name: discount ? discount.name : '',
    percentage: discount ? discount.percentage : '',
    validUntil: discount ? discount.validUntil : '',
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
      newErrors.name = 'Discount Name is required.';
    }
    if (!formData.percentage.trim() || isNaN(formData.percentage) || formData.percentage < 0) {
      newErrors.percentage = 'Please enter a valid percentage.';
    }
    if (!formData.validUntil) {
      newErrors.validUntil = 'Valid Until date is required.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Return true if no errors
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) {
      return; // Stop if validation fails
    }
    
    const newDiscount = {
      id: discount ? discount.id : Date.now(), // Unique ID
      ...formData,
    };

    if (discount) {
      onEditDiscount(newDiscount);
    } else {
      onAddDiscount(newDiscount);
    }
    onClose(); // Close the modal after adding or editing discount
  };

  return (
    <div className="modal" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <span className="close-button" onClick={onClose}>
          &times;
        </span>
        <h2>{discount ? 'Edit Discount' : 'Add New Discount'}</h2>
        <form onSubmit={handleSubmit} className="add-discount-form">
          <div className="form-group">
            <label htmlFor="name">Discount Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              placeholder="Enter discount name"
            />
            {errors.name && <span className="error-message">{errors.name}</span>}
          </div>
          <div className="form-group">
            <label htmlFor="percentage">Discount Percentage</label>
            <input
              type="number"
              id="percentage"
              name="percentage"
              value={formData.percentage}
              onChange={handleChange}
              required
              placeholder="Enter discount percentage"
              min="0"
            />
            {errors.percentage && <span className="error-message">{errors.percentage}</span>}
          </div>
          <div className="form-group">
            <label htmlFor="validUntil">Valid Until</label>
            <input
              type="date"
              id="validUntil"
              name="validUntil"
              value={formData.validUntil}
              onChange={handleChange}
              required
            />
            {errors.validUntil && <span className="error-message">{errors.validUntil}</span>}
          </div>
          <button type="submit">{discount ? 'Update Discount' : 'Add Discount'}</button>
        </form>
      </div>
    </div>
  );
};

export default AddDiscount;
