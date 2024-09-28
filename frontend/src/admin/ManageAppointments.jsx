// src/admin/ManageAppointments.js

import React, { useState } from 'react';
import AddAppointment from '../components/AddAppointment';
import './ManageAppointments.css'; // Create this CSS file for styling

const ManageAppointments = ({ appointments, onAddAppointment, onEditAppointment, onDeleteAppointment }) => {
  const [showAddAppointment, setShowAddAppointment] = useState(false);
  const [currentAppointment, setCurrentAppointment] = useState(null); // For editing appointment
  const [showEditAppointment, setShowEditAppointment] = useState(false);

  // Function to toggle Add Appointment form
  const handleAddClick = () => {
    setShowAddAppointment(true);
    setShowEditAppointment(false); // Ensure the edit modal is closed
  };

  // Function to handle closing Add or Edit form
  const handleCloseForm = () => {
    setShowAddAppointment(false);
    setShowEditAppointment(false);
    setCurrentAppointment(null);
  };

  // Function to open Edit form with current appointment data
  const handleEditClick = (appointment) => {
    setCurrentAppointment(appointment);
    setShowEditAppointment(true);
    setShowAddAppointment(false); // Ensure the add modal is closed
  };

  // Function to handle updating an appointment
  const handleUpdateAppointment = (updatedAppointment) => {
    onEditAppointment(updatedAppointment);
    handleCloseForm();
  };

  // Function to handle deleting an appointment
  const handleDeleteClick = (appointmentId) => {
    onDeleteAppointment(appointmentId);
  };

  return (
    <div className="manage-appointments-container">
      <h1>Manage Appointments</h1>
      <button className="add-appointment-button" onClick={handleAddClick}>
        {showAddAppointment ? 'Close Add Appointment' : 'Add New Appointment'}
      </button>
      {showAddAppointment && (
        <AddAppointment
          onAddAppointment={onAddAppointment}
          appointments={appointments} // Pass current appointments for validation
          onClose={handleCloseForm}
        />
      )}
      {showEditAppointment && currentAppointment && (
        <AddAppointment
          appointment={currentAppointment}
          onAddAppointment={handleUpdateAppointment}
          isEditing={true}
          appointments={appointments} // Pass current appointments for validation
          onClose={handleCloseForm}
        />
      )}
      <div className="appointments-list">
        <table className="appointments-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Patient Name</th>
              <th>Therapist</th>
              <th>Date</th>
              <th>Time</th>
              <th>Notes</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {appointments.length > 0 ? (
              appointments.map((appointment) => (
                <tr key={appointment.id}>
                  <td>{appointment.id}</td>
                  <td>{appointment.patientName}</td>
                  <td>{appointment.therapist}</td>
                  <td>{appointment.date}</td>
                  <td>{appointment.time}</td>
                  <td>{appointment.notes || 'N/A'}</td>
                  <td>
                    <button className="edit-button" onClick={() => handleEditClick(appointment)}>
                      Edit
                    </button>
                    <button className="delete-button" onClick={() => handleDeleteClick(appointment.id)}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7">No appointments available.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageAppointments;
