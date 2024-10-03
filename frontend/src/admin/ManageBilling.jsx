import React, { useState } from 'react';
import AddInvoice from '../components/AddInvoice';
import './ManageBilling.css';

const ManageBilling = ({ invoices, onAddInvoice, onEditInvoice, onDeleteInvoice }) => {
  const [showAddInvoice, setShowAddInvoice] = useState(false);
  const [currentInvoice, setCurrentInvoice] = useState(null); // For editing invoice

  const handleAddClick = () => {
    setShowAddInvoice(true);
    setCurrentInvoice(null); // Reset for new addition
  };

  const handleCloseForm = () => {
    setShowAddInvoice(false);
    setCurrentInvoice(null);
  };

  const handleEditClick = (invoice) => {
    setCurrentInvoice(invoice);
    setShowAddInvoice(true);
  };

  return (
    <div className="manage-billing-container">
      <h1>Manage Billing & Invoicing</h1>
      <button className="add-invoice-button" onClick={handleAddClick}>
        {showAddInvoice ? 'Close Add Invoice' : 'Add New Invoice'}
      </button>
      
      {showAddInvoice && (
        <AddInvoice
          invoice={currentInvoice}
          onAddInvoice={onAddInvoice}
          onEditInvoice={onEditInvoice}
          onClose={handleCloseForm}
        />
      )}
      
      <div className="invoices-list">
        <table className="invoices-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Client Name</th>
              <th>Amount</th>
              <th>Date Issued</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {invoices.length > 0 ? (
              invoices.map((invoice) => (
                <tr key={invoice.id}>
                  <td>{invoice.id}</td>
                  <td>{invoice.clientName}</td>
                  <td>${invoice.amount}</td>
                  <td>{new Date(invoice.dateIssued).toLocaleDateString()}</td>
                  <td>{invoice.status}</td>
                  <td>
                    <button className="edit-button" onClick={() => handleEditClick(invoice)}>
                      Edit
                    </button>
                    <button className="delete-button" onClick={() => onDeleteInvoice(invoice.id)}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6">No invoices available.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageBilling;
