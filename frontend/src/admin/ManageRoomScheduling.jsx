import React, { useState } from 'react';
import AddRoomSchedule from '../components/AddRoomSchedule';
import './ManageRoomScheduling.css';

const ManageRoomScheduling = ({ schedules, onAddSchedule, onEditSchedule, onDeleteSchedule }) => {
  const [showAddSchedule, setShowAddSchedule] = useState(false);
  const [currentSchedule, setCurrentSchedule] = useState(null); // For editing schedule

  const handleAddClick = () => {
    setShowAddSchedule(true);
    setCurrentSchedule(null); // Reset for new addition
  };

  const handleCloseForm = () => {
    setShowAddSchedule(false);
    setCurrentSchedule(null);
  };

  const handleEditClick = (schedule) => {
    setCurrentSchedule(schedule);
    setShowAddSchedule(true);
  };

  return (
    <div className="manage-room-scheduling-container">
      <h1>Manage Room Scheduling</h1>
      <button className="add-schedule-button" onClick={handleAddClick}>
        {showAddSchedule ? 'Close Add Schedule' : 'Add New Schedule'}
      </button>
      
      {showAddSchedule && (
        <AddRoomSchedule
          schedule={currentSchedule}
          onAddSchedule={onAddSchedule}
          onEditSchedule={onEditSchedule}
          onClose={handleCloseForm}
        />
      )}
      
      <div className="schedules-list">
        <table className="schedules-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Room Name</th>
              <th>Client Name</th>
              <th>Date</th>
              <th>Time</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {schedules.length > 0 ? (
              schedules.map((schedule) => (
                <tr key={schedule.id}>
                  <td>{schedule.id}</td>
                  <td>{schedule.roomName}</td>
                  <td>{schedule.clientName}</td>
                  <td>{new Date(schedule.date).toLocaleDateString()}</td>
                  <td>{schedule.time}</td>
                  <td>
                    <button className="edit-button" onClick={() => handleEditClick(schedule)}>
                      Edit
                    </button>
                    <button className="delete-button" onClick={() => onDeleteSchedule(schedule.id)}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6">No schedules available.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageRoomScheduling;
