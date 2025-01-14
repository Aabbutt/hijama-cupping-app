import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import "./ManageRoomScheduling.css";

const ManageRoomScheduling = () => {
  const [rooms, setRooms] = useState([]);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [roomHistory, setRoomHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showAddRoom, setShowAddRoom] = useState(false);
  const [newRoom, setNewRoom] = useState({
    roomNumber: '',
    capacity: '',
    equipment: [],
    status: 'available'
  });

  const initializeAndFetchRooms = useCallback(async () => {
    try {
      setLoading(true);
      setError('');
      await axios.post('http://localhost:3000/api/rooms/initialize');
      const response = await axios.get('http://localhost:3000/api/rooms');
      setRooms(response.data);
    } catch (error) {
      setError('Error fetching rooms');
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchRoomHistory = useCallback(async (roomId) => {
    if (!roomId) return;
    try {
      setLoading(true);
      setError('');
      const response = await axios.get(`http://localhost:3000/api/rooms/${roomId}/history`);
      setRoomHistory(response.data);
    } catch (error) {
      setError('Error fetching room history');
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  // Fetch all rooms when component mounts
  useEffect(() => {
    initializeAndFetchRooms();
  }, [initializeAndFetchRooms]);

  // Fetch room history when a room is selected
  useEffect(() => {
    if (selectedRoom?._id) {
      fetchRoomHistory(selectedRoom._id);
    }
  }, [selectedRoom, fetchRoomHistory]);

  const handleAddRoom = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError('');

      // Validate room number
      if (!newRoom.roomNumber || isNaN(newRoom.roomNumber)) {
        setError('Please enter a valid room number');
        return;
      }

      // Validate capacity
      if (!newRoom.capacity || isNaN(newRoom.capacity) || newRoom.capacity <= 0) {
        setError('Please enter a valid capacity');
        return;
      }

      // Create the room object
      const roomData = {
        roomNumber: parseInt(newRoom.roomNumber),
        capacity: parseInt(newRoom.capacity),
        equipment: newRoom.equipment,
        status: newRoom.status
      };

      // Send request to create new room
      const response = await axios.post('http://localhost:3000/api/rooms', roomData);

      // Update the rooms list with the new room
      setRooms(prevRooms => [...prevRooms, response.data]);
      
      // Reset form and close modal
      setNewRoom({
        roomNumber: '',
        capacity: '',
        equipment: [],
        status: 'available'
      });
      setShowAddRoom(false);

      // Show success message
      alert('Room added successfully!');
    } catch (error) {
      if (error.response?.data?.error) {
        setError(error.response.data.error);
      } else {
        setError('Error adding room. Please try again.');
      }
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleEquipmentChange = (e) => {
    const equipment = e.target.value.split(',').map(item => item.trim()).filter(item => item !== '');
    setNewRoom(prevRoom => ({ ...prevRoom, equipment }));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewRoom(prevRoom => ({ ...prevRoom, [name]: value }));
  };

  const formatDate = useCallback((dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  }, []);

  return (
    <div className="manage-room-scheduling" style={{ marginTop: '0px' }}>
      <h2>Manage Room Scheduling</h2>
      {error && <div className="error-message">{error}</div>}

      <div className="room-actions">
        <button 
          className="add-room-btn"
          onClick={() => setShowAddRoom(true)}
        >
          Add New Room
        </button>
      </div>

      {showAddRoom && (
        <div className="modal-overlay">
          <div className="room-registration-container">
            <h2 className="room-registration-title">Add New Room</h2>
            <form onSubmit={handleAddRoom} className="room-registration-form">
              <div className="room-form-group">
                <label className="room-label">Room Number:</label>
                <input
                  type="number"
                  name="roomNumber"
                  value={newRoom.roomNumber}
                  onChange={handleInputChange}
                  className="room-input"
                  min="1"
                  required
                  placeholder="Enter room number"
                />
              </div>

              <div className="room-form-group">
                <label className="room-label">Capacity:</label>
                <input
                  type="number"
                  name="capacity"
                  value={newRoom.capacity}
                  onChange={handleInputChange}
                  className="room-input"
                  min="1"
                  required
                  placeholder="Enter room capacity"
                />
              </div>

              <div className="room-form-group">
                <label className="room-label">Equipment (comma-separated):</label>
                <input
                  type="text"
                  value={newRoom.equipment.join(', ')}
                  onChange={handleEquipmentChange}
                  className="room-input"
                  placeholder="e.g., Cupping Set, Massage Table"
                />
              </div>

              <div className="room-form-group">
                <label className="room-label">Status:</label>
                <select
                  name="status"
                  value={newRoom.status}
                  onChange={handleInputChange}
                  className="room-select"
                  required
                >
                  <option value="available">Available</option>
                  <option value="maintenance">Maintenance</option>
                </select>
              </div>

              <div className="room-form-actions">
                <button 
                  type="submit" 
                  className="room-submit-btn" 
                  disabled={loading}
                >
                  {loading ? 'Adding...' : 'Add Room'}
                </button>
                <button 
                  type="button" 
                  onClick={() => setShowAddRoom(false)} 
                  className="room-close-btn"
                >
                  Close
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="rooms-grid">
        {rooms.map(room => (
          <div 
            key={room._id}
            className={`room-card ${selectedRoom?._id === room._id ? 'selected' : ''}`}
            onClick={() => setSelectedRoom(room)}
          >
            <h3>Room {room.roomNumber}</h3>
            <p>Status: <span className={`status ${room.status}`}>{room.status}</span></p>
            <p>Capacity: {room.capacity}</p>
            <p>Equipment: {room.equipment.join(', ')}</p>
          </div>
        ))}
      </div>

      {selectedRoom && (
        <div className="room-history">
          <h3>Room {selectedRoom.roomNumber} History</h3>
          {loading ? (
            <p>Loading history...</p>
          ) : roomHistory.length > 0 ? (
            <table>
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Patient</th>
                  <th>Practitioner</th>
                  <th>Services</th>
                  <th>Equipment Used</th>
                </tr>
              </thead>
              <tbody>
                {roomHistory.map(booking => (
                  <tr key={booking._id}>
                    <td>{formatDate(booking.date)}</td>
                    <td>{booking.patient?.name || 'N/A'}</td>
                    <td>{booking.practitioner?.name || 'N/A'}</td>
                    <td>{booking.services?.join(', ') || 'N/A'}</td>
                    <td>{booking.equipmentUsed?.map(e => `${e.name} (${e.quantity})`).join(', ') || 'N/A'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>No history available for this room</p>
          )}
        </div>
      )}
    </div>
  );
};

export default ManageRoomScheduling;
