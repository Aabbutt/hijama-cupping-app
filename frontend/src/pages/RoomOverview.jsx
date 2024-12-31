import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './RoomOverview.css';

const RoomOverview = () => {
  const [rooms, setRooms] = useState([]);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [roomHistory, setRoomHistory] = useState([]);

  useEffect(() => {
    fetchRooms();
  }, []);

  const fetchRooms = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/rooms');
      setRooms(response.data);
    } catch (error) {
      console.error('Error fetching rooms:', error);
    }
  };

  const fetchRoomHistory = async (roomNumber) => {
    try {
      const today = new Date();
      const thirtyDaysAgo = new Date(today.setDate(today.getDate() - 30));
      
      const response = await axios.get(`http://localhost:3000/api/rooms/schedule`, {
        params: {
          roomNumber,
          startDate: thirtyDaysAgo.toISOString(),
          endDate: new Date().toISOString()
        }
      });
      setRoomHistory(response.data);
    } catch (error) {
      console.error('Error fetching room history:', error);
    }
  };

  const handleRoomClick = async (room) => {
    setSelectedRoom(room);
    await fetchRoomHistory(room.roomNumber);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'occupied':
        return '#ff4d4d';
      case 'available':
        return '#4CAF50';
      case 'maintenance':
        return '#ff9800';
      default:
        return '#gray';
    }
  };

  return (
    <div className="room-overview-container">
      <h1>Room Overview</h1>
      
      <div className="rooms-grid">
        {rooms.map((room) => (
          <div
            key={room.roomNumber}
            className="room-card"
            onClick={() => handleRoomClick(room)}
          >
            <h2>Room {room.roomNumber}</h2>
            <div 
              className="status-indicator"
              style={{ backgroundColor: getStatusColor(room.status) }}
            >
              {room.status.toUpperCase()}
            </div>
            {room.currentAppointment && (
              <div className="current-info">
                <p>Current Patient: {room.currentAppointment.name}</p>
                <p>Practitioner: {room.currentPractitioner?.name}</p>
              </div>
            )}
          </div>
        ))}
      </div>

      {selectedRoom && (
        <div className="room-details-modal">
          <div className="modal-content">
            <h2>Room {selectedRoom.roomNumber} History</h2>
            <button className="close-button" onClick={() => setSelectedRoom(null)}>×</button>
            
            <div className="room-history">
              <h3>Recent Appointments</h3>
              <table>
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Time</th>
                    <th>Patient</th>
                    <th>Practitioner</th>
                  </tr>
                </thead>
                <tbody>
                  {roomHistory.flatMap(day => 
                    day.timeSlots
                      .filter(slot => slot.appointmentId)
                      .map((slot, index) => (
                        <tr key={`${day.date}-${index}`}>
                          <td>{new Date(day.date).toLocaleDateString()}</td>
                          <td>{`${slot.startTime} - ${slot.endTime}`}</td>
                          <td>{slot.appointmentId?.name || 'N/A'}</td>
                          <td>{slot.practitionerId?.name || 'N/A'}</td>
                        </tr>
                      ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RoomOverview; 