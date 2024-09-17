// src/admin/ManageAppointments.js
import React, { useEffect, useState } from 'react';
import { getAppointments } from '../services/appointmentService'; // Assuming you have a service to fetch appointments
import './ManageAppointments.css'; // Custom styles for appointments

const ManageAppointments = () => {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    async function fetchAppointments() {
      const data = await getAppointments();
      setAppointments(data);
    }
    fetchAppointments();
  }, []);

  return (
    <div className="manage-appointments">
      <h2>Manage Appointments</h2>
      <table>
        <thead>
          <tr>
            <th>User</th>
            <th>Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {appointments.map(appointment => (
            <tr key={appointment.id}>
              <td>{appointment.user}</td>
              <td>{appointment.date}</td>
              <td>
                <button>Edit</button>
                <button>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManageAppointments;
