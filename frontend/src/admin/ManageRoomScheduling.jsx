import React, { useState, useEffect } from "react";
import AddRoomSchedule from "../components/AddRoomSchedule";
import axios from "axios";
import "./ManageRoomScheduling.css";

const ManageRoomScheduling = () => {
  const [schedules, setSchedules] = useState([]);
  const [showAddSchedule, setShowAddSchedule] = useState(false);
  const [currentSchedule, setCurrentSchedule] = useState(null);

  // Fetch all schedules from the backend on component load
  useEffect(() => {
    const fetchSchedules = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/rooms/schedules"
        );
        setSchedules(response.data);
      } catch (error) {
        console.error("Error fetching schedules:", error);
      }
    };
    fetchSchedules();
  }, []);

  const handleAddClick = () => {
    setShowAddSchedule(true);
    setCurrentSchedule(null); // Reset for new addition
  };

  const handleCloseForm = () => {
    setShowAddSchedule(false);
    setCurrentSchedule(null);
  };

  // Add or Edit Schedule and call backend API accordingly
  const handleAddOrEditSchedule = async (schedule) => {
    try {
      if (schedule.id) {
        // Editing existing schedule
        const response = await axios.put(
          `http://localhost:3000/api/rooms/schedules${schedule.id}`,
          schedule
        );
        setSchedules(
          schedules.map((s) => (s.id === schedule.id ? response.data : s))
        );
      } else {
        // Adding new schedule
        const response = await axios.post(
          "http://localhost:3000/api/rooms/schedules",
          schedule
        );
        setSchedules([...schedules, response.data]);
      }
      handleCloseForm();
    } catch (error) {
      console.error("Error adding or editing schedule:", error);
    }
  };

  const handleDeleteSchedule = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/api/rooms/schedules${id}`);
      setSchedules(schedules.filter((schedule) => schedule.id !== id));
    } catch (error) {
      console.error("Error deleting schedule:", error);
    }
  };

  const handleEditClick = (schedule) => {
    setCurrentSchedule(schedule);
    setShowAddSchedule(true);
  };

  return (
    <div className="manage-room-scheduling-container">
      <h1>Manage Room Scheduling</h1>
      <button className="add-schedule-button" onClick={handleAddClick}>
        {showAddSchedule ? "Close Add Schedule" : "Add New Schedule"}
      </button>

      {showAddSchedule && (
        <AddRoomSchedule
          schedule={currentSchedule}
          onAddOrEditSchedule={handleAddOrEditSchedule}
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
                    <button
                      className="edit-button"
                      onClick={() => handleEditClick(schedule)}
                    >
                      Edit
                    </button>
                    <button
                      className="delete-button"
                      onClick={() => handleDeleteSchedule(schedule.id)}
                    >
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
