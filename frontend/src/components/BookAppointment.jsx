import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './BookAppointment.css';

const BookAppointment = ({ onSuccess, onCancel }) => {
  const [date, setDate] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [selectedServices, setSelectedServices] = useState([]);
  const [practitioners, setPractitioners] = useState([]);
  const [availablePractitioners, setAvailablePractitioners] = useState([]);
  const [selectedPractitioner, setSelectedPractitioner] = useState('');
  const [availableRooms, setAvailableRooms] = useState([]);
  const [selectedRoom, setSelectedRoom] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Available services with durations
  const services = [
    { name: 'Hijama', duration: 60 },
    { name: 'Cupping Therapy', duration: 45 },
    { name: 'Massage', duration: 60 },
    { name: 'Consultation', duration: 30 }
  ];

  useEffect(() => {
    // Fetch all practitioners when component mounts
    fetchPractitioners();
  }, []);

  const fetchPractitioners = async () => {
    try {
      const response = await axios.get('http://localhost:3000/practitioners');
      setPractitioners(response.data);
    } catch (error) {
      setError('Error fetching practitioners');
      console.error('Error:', error);
    }
  };

  // When date or time changes, check practitioner and room availability
  useEffect(() => {
    if (date && startTime && endTime) {
      checkPractitionerAvailability();
      checkRoomAvailability();
    }
  }, [date, startTime, endTime]);

  const checkPractitionerAvailability = async () => {
    try {
      const response = await axios.get('http://localhost:3000/practitioners/available', {
        params: { date, startTime, endTime }
      });
      setAvailablePractitioners(response.data);
    } catch (error) {
      setError('Error checking practitioner availability');
      console.error('Error:', error);
    }
  };

  const checkRoomAvailability = async () => {
    try {
      const response = await axios.get('http://localhost:3000/rooms/available', {
        params: { date, startTime, endTime }
      });
      setAvailableRooms(response.data);
    } catch (error) {
      setError('Error checking room availability');
      console.error('Error:', error);
    }
  };

  // Calculate end time based on selected services
  const updateEndTime = (newStartTime) => {
    setStartTime(newStartTime);
    if (newStartTime && selectedServices.length > 0) {
      // Calculate total duration based on selected services
      const totalDuration = selectedServices.reduce((total, service) => {
        const serviceInfo = services.find(s => s.name === service);
        return total + (serviceInfo ? serviceInfo.duration : 0);
      }, 0);

      const [hours, minutes] = newStartTime.split(':').map(Number);
      const endDateTime = new Date(2024, 0, 1, hours, minutes + totalDuration);
      const newEndTime = `${String(endDateTime.getHours()).padStart(2, '0')}:${String(endDateTime.getMinutes()).padStart(2, '0')}`;
      setEndTime(newEndTime);
    }
  };

  const handleServiceChange = (serviceName) => {
    const updatedServices = selectedServices.includes(serviceName)
      ? selectedServices.filter(s => s !== serviceName)
      : [...selectedServices, serviceName];
    setSelectedServices(updatedServices);
    
    // Recalculate end time when services change
    if (startTime) {
      const totalDuration = updatedServices.reduce((total, service) => {
        const serviceInfo = services.find(s => s.name === service);
        return total + (serviceInfo ? serviceInfo.duration : 0);
      }, 0);

      const [hours, minutes] = startTime.split(':').map(Number);
      const endDateTime = new Date(2024, 0, 1, hours, minutes + totalDuration);
      const newEndTime = `${String(endDateTime.getHours()).padStart(2, '0')}:${String(endDateTime.getMinutes()).padStart(2, '0')}`;
      setEndTime(newEndTime);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const token = localStorage.getItem('token');
      const config = {
        headers: { Authorization: `Bearer ${token}` }
      };

      // Create the appointment with room and practitioner info
      const appointmentData = {
        date,
        startTime,
        endTime,
        services: selectedServices,
        practitionerId: selectedPractitioner,
        roomId: selectedRoom,
        name: user?.name || '',
        email: user?.email || '',
        phone: user?.phone || '',
        status: 'pending'
      };

      const appointmentResponse = await axios.post(
        'http://localhost:3000/appointments',
        appointmentData,
        config
      );

      // Schedule the room
      await axios.post(
        `http://localhost:3000/rooms/${selectedRoom}/schedule`,
        {
          appointmentId: appointmentResponse.data._id,
          practitionerId: selectedPractitioner,
          date,
          startTime,
          endTime,
          services: selectedServices
        },
        config
      );

      onSuccess(appointmentResponse.data);
    } catch (error) {
      console.error('Error creating appointment:', error);
      setError(error.response?.data?.message || 'Failed to create appointment');
    } finally {
      setLoading(false);
    }
  };

  // Calculate total duration of selected services
  const getTotalDuration = () => {
    return selectedServices.reduce((total, service) => {
      const serviceInfo = services.find(s => s.name === service);
      return total + (serviceInfo ? serviceInfo.duration : 0);
    }, 0);
  };

  return (
    <div className="book-appointment-container">
      <h2>Book Appointment</h2>
      {error && <div className="error-message">{error}</div>}
      
      <form onSubmit={handleSubmit} className="appointment-form">
        <div className="form-group">
          <label>Date:</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            min={new Date().toISOString().split('T')[0]}
            required
          />
        </div>

        <div className="form-group">
          <label>Start Time:</label>
          <input
            type="time"
            value={startTime}
            onChange={(e) => updateEndTime(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label>Services:</label>
          <div className="services-grid">
            {services.map(service => (
              <label key={service.name} className="service-checkbox">
                <input
                  type="checkbox"
                  checked={selectedServices.includes(service.name)}
                  onChange={() => handleServiceChange(service.name)}
                />
                {service.name} ({service.duration} min)
              </label>
            ))}
          </div>
        </div>

        {date && startTime && endTime && (
          <>
            <div className="form-group">
              <label>Available Practitioners:</label>
              <select
                value={selectedPractitioner}
                onChange={(e) => setSelectedPractitioner(e.target.value)}
                required
              >
                <option value="">Select a practitioner</option>
                {availablePractitioners.map(practitioner => (
                  <option key={practitioner._id} value={practitioner._id}>
                    {practitioner.name} - {practitioner.specialization}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label>Available Rooms:</label>
              <select
                value={selectedRoom}
                onChange={(e) => setSelectedRoom(e.target.value)}
                required
              >
                <option value="">Select a room</option>
                {availableRooms.map(room => (
                  <option key={room._id} value={room._id}>
                    Room {room.roomNumber} - {room.equipment.join(', ')}
                  </option>
                ))}
              </select>
            </div>
          </>
        )}

        <div className="appointment-summary">
          <h3>Appointment Summary</h3>
          <p>Date: {date}</p>
          <p>Time: {startTime} - {endTime}</p>
          <p>Services: {selectedServices.join(', ')}</p>
          <p>Total Duration: {getTotalDuration()} minutes</p>
          {selectedPractitioner && (
            <p>Practitioner: {practitioners.find(p => p._id === selectedPractitioner)?.name}</p>
          )}
          {selectedRoom && (
            <p>Room: {availableRooms.find(r => r._id === selectedRoom)?.roomNumber}</p>
          )}
        </div>

        <div className="form-actions">
          <button type="button" onClick={onCancel} className="cancel-button">
            Cancel
          </button>
          <button 
            type="submit" 
            disabled={loading || !selectedPractitioner || !selectedRoom || selectedServices.length === 0} 
            className="submit-button"
          >
            {loading ? 'Booking...' : 'Book Appointment'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default BookAppointment; 