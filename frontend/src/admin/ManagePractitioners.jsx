import React, { useState } from 'react';
import AddPractitioner from '../components/AddPractitioner';
import './ManagePractitioners.css';

const ManagePractitioners = ({ practitioners, onAddPractitioner, onEditPractitioner, onDeletePractitioner }) => {
  const [showAddPractitioner, setShowAddPractitioner] = useState(false);
  const [currentPractitioner, setCurrentPractitioner] = useState(null); // For editing practitioner

  const handleAddClick = () => {
    setShowAddPractitioner(true);
    setCurrentPractitioner(null); // Reset for new addition
  };

  const handleCloseForm = () => {
    setShowAddPractitioner(false);
    setCurrentPractitioner(null);
  };

  const handleEditClick = (practitioner) => {
    setCurrentPractitioner(practitioner);
    setShowAddPractitioner(true);
  };

  return (
    <div className="manage-practitioners-container">
      <h1>Manage Practitioners</h1>
      <button className="add-practitioner-button" onClick={handleAddClick}>
        {showAddPractitioner ? 'Close Add Practitioner' : 'Add New Practitioner'}
      </button>
      
      {showAddPractitioner && (
        <AddPractitioner
          practitioner={currentPractitioner}
          onAddPractitioner={onAddPractitioner}
          onEditPractitioner={onEditPractitioner}
          onClose={handleCloseForm}
        />
      )}
      
      <div className="practitioners-list">
        <table className="practitioners-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Specialization</th>
              <th>Experience</th>
              <th>Contact</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {practitioners.length > 0 ? (
              practitioners.map((practitioner) => (
                <tr key={practitioner.id}>
                  <td>{practitioner.id}</td>
                  <td>{practitioner.name}</td>
                  <td>{practitioner.specialization}</td>
                  <td>{practitioner.experience} years</td>
                  <td>{practitioner.contact}</td>
                  <td>
                    <button className="edit-button" onClick={() => handleEditClick(practitioner)}>
                      Edit
                    </button>
                    <button className="delete-button" onClick={() => onDeletePractitioner(practitioner.id)}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6">No practitioners available.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManagePractitioners;
