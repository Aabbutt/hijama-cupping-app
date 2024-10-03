import React, { useState } from 'react';
import './AddInvoice.css'; // Add styling as needed

const AddInvoice = ({ onAddInvoice, onEditInvoice, invoice = null, onClose }) => {
  const [formData, setFormData] = useState({
    clientName: invoice ? invoice.clientName : '',
    amount: invoice ? invoice.amount : '',
    dateIssued: invoice ? invoice.dateIssued : '',
    status: invoice ? invoice.status : 'Pending',
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
    if (!formData.clientName.trim()) {
      newErrors.clientName = 'Client Name is required.';
    }
    if (!formData.amount.trim() || isNaN(formData.amount) || formData.amount <= 0) {
      newErrors.amount = 'Please enter a valid amount.';
    }
    if (!formData.dateIssued) {
      newErrors.dateIssued = 'Date Issued is required.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Return true if no errors
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) {
      return; // Stop if validation fails
    }
    
    const newInvoice = {
      id: invoice ? invoice.id : Date.now(), // Unique ID
      ...formData,
    };

    if (invoice) {
      onEditInvoice(newInvoice);
    } else {
      onAddInvoice(newInvoice);
    }
    onClose(); // Close the modal after adding or editing invoice
  };

  return (
    <div className="modal" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <span className="close-button" onClick={onClose}>
          &times;
        </span>
        <h2>{invoice ? 'Edit Invoice' : 'Add New Invoice'}</h2>
        <form onSubmit={handleSubmit} className="add-invoice-form">
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
            <label htmlFor="amount">Amount</label>
            <input
              type="number"
              id="amount"
              name="amount"
              value={formData.amount}
              onChange={handleChange}
              required
              placeholder="Enter invoice amount"
              min="0"
            />
            {errors.amount && <span className="error-message">{errors.amount}</span>}
          </div>
          <div className="form-group">
            <label htmlFor="dateIssued">Date Issued</label>
            <input
              type="date"
              id="dateIssued"
              name="dateIssued"
              value={formData.dateIssued}
              onChange={handleChange}
              required
            />
            {errors.dateIssued && <span className="error-message">{errors.dateIssued}</span>}
          </div>
          <div className="form-group">
            <label htmlFor="status">Status</label>
            <select
              id="status"
              name="status"
              value={formData.status}
              onChange={handleChange}
            >
              <option value="Pending">Pending</option>
              <option value="Paid">Paid</option>
              <option value="Cancelled">Cancelled</option>
            </select>
          </div>
          <button type="submit">{invoice ? 'Update Invoice' : 'Add Invoice'}</button>
        </form>
      </div>
    </div>
  );
};

export default AddInvoice;
