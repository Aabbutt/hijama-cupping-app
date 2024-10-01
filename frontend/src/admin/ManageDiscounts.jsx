import React, { useState } from 'react';
import AddDiscount from '../components/AddDiscount';
import './ManageDiscounts.css';

const ManageDiscounts = ({ discounts, onAddDiscount, onEditDiscount, onDeleteDiscount }) => {
  const [showAddDiscount, setShowAddDiscount] = useState(false);
  const [currentDiscount, setCurrentDiscount] = useState(null); // For editing discount

  const handleAddClick = () => {
    setShowAddDiscount(true);
    setCurrentDiscount(null); // Reset for new addition
  };

  const handleCloseForm = () => {
    setShowAddDiscount(false);
    setCurrentDiscount(null);
  };

  const handleEditClick = (discount) => {
    setCurrentDiscount(discount);
    setShowAddDiscount(true);
  };

  return (
    <div className="manage-discounts-container">
      <h1>Manage Discounts & Offers</h1>
      <button className="add-discount-button" onClick={handleAddClick}>
        {showAddDiscount ? 'Close Add Discount' : 'Add New Discount'}
      </button>
      
      {showAddDiscount && (
        <AddDiscount
          discount={currentDiscount}
          onAddDiscount={onAddDiscount}
          onEditDiscount={onEditDiscount}
          onClose={handleCloseForm}
        />
      )}
      
      <div className="discounts-list">
        <table className="discounts-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Discount Name</th>
              <th>Percentage</th>
              <th>Valid Until</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {discounts.length > 0 ? (
              discounts.map((discount) => (
                <tr key={discount.id}>
                  <td>{discount.id}</td>
                  <td>{discount.name}</td>
                  <td>{discount.percentage}%</td>
                  <td>{new Date(discount.validUntil).toLocaleDateString()}</td>
                  <td>
                    <button className="edit-button" onClick={() => handleEditClick(discount)}>
                      Edit
                    </button>
                    <button className="delete-button" onClick={() => onDeleteDiscount(discount.id)}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5">No discounts available.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageDiscounts;
