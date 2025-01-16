import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './PractitionerDashboard.css';

const PractitionerDashboard = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [stats, setStats] = useState({
    totalAppointments: 0,
    pendingAppointments: 0,
    completedAppointments: 0,
    todayAppointments: 0
  });

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          setError('Authentication token not found');
          return;
        }

        const config = {
          headers: { Authorization: `Bearer ${token}` }
        };

        // Fetch appointments assigned to this practitioner
        const response = await axios.get('http://localhost:3000/appointments/practitioner', config);
        
        const appointments = response.data.appointments;
        setAppointments(appointments);

        // Calculate statistics
        const today = new Date().toISOString().split('T')[0];
        setStats({
          totalAppointments: appointments.length,
          pendingAppointments: appointments.filter(app => app.status === 'pending').length,
          completedAppointments: appointments.filter(app => app.status === 'completed').length,
          todayAppointments: appointments.filter(app => app.preferredDate.split('T')[0] === today).length
        });

      } catch (err) {
        console.error('Error fetching dashboard data:', err);
        setError('Failed to load dashboard data');
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  const handleStatusUpdate = async (appointmentId, newStatus) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.put(
        `http://localhost:3000/appointments/${appointmentId}/status`,
        { status: newStatus },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      // Update the appointments list with the new status
      setAppointments(appointments?.map(app => 
        app._id === appointmentId ? { ...app, status: newStatus } : app
      ));

    } catch (err) {
      console.error('Error updating appointment status:', err);
      setError('Failed to update appointment status');
    }
  };

  if (loading) return <div className="practitioner-dashboard loading">Loading dashboard...</div>;
  if (error) return <div className="practitioner-dashboard error">{error}</div>;

  return (
    <div className="practitioner-dashboard">
      <h1>Practitioner Dashboard</h1>
      
      <div className="dashboard-stats">
        <div className="stat-card">
          <h3>Total Appointments</h3>
          <p>{stats.totalAppointments}</p>
        </div>
        <div className="stat-card">
          <h3>Pending Appointments</h3>
          <p>{stats.pendingAppointments}</p>
        </div>
        <div className="stat-card">
          <h3>Completed Appointments</h3>
          <p>{stats.completedAppointments}</p>
        </div>
        <div className="stat-card">
          <h3>Today's Appointments</h3>
          <p>{stats.todayAppointments}</p>
        </div>
      </div>

      <div className="appointments-section">
        <h2>Recent Appointments</h2>
        <div className="appointments-list">
          {appointments.length === 0 ? (
            <p>No appointments found</p>
          ) : (
            <table>
              <thead>
                <tr>
                  <th>Patient Name</th>
                  <th>Date</th>
                  <th>Time</th>
                  <th>Service</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {appointments?.map(appointment => (
                  <tr key={appointment._id}>
                    <td>{appointment.name}</td>
                    <td>{new Date(appointment.preferredDate).toLocaleDateString()}</td>
                    <td>{appointment.preferredTime}</td>
                    <td>{appointment.services}</td>
                    <td>
                      <span className={`status ${appointment.status}`}>
                        {appointment.status}
                      </span>
                    </td>
                    <td>
                      <select
                        value={appointment.status}
                        onChange={(e) => handleStatusUpdate(appointment._id, e.target.value)}
                        className="status-select"
                      >
                        <option value="pending">Pending</option>
                        <option value="confirmed">Confirmed</option>
                        <option value="completed">Completed</option>
                        <option value="cancelled">Cancelled</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default PractitionerDashboard; 