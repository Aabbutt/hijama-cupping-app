import React, { useState, useEffect } from "react";
import axios from "axios";
import AddAppointment from "../components/AddAppointment";
import EditAppointment from "../components/EditAppointment";
import "./ManageAppointments.css";

const ManageAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showAdd, setShowAdd] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState(null);

  const fetchAppointments = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get("http://localhost:3000/appointments", {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      console.log("Fetched appointments:", response.data);
      setAppointments(response.data.appointments || []);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching appointments:", error);
      setError("Failed to fetch appointments");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  const handleAddAppointment = (newAppointment) => {
    setAppointments([...appointments, newAppointment]);
    setShowAdd(false);
  };

  const handleEditAppointment = (updatedAppointment) => {
    setAppointments(appointments?.map(apt => 
      apt._id === updatedAppointment._id ? updatedAppointment : apt
    ));
    setShowEdit(false);
  };

  const handleDeleteAppointment = async (id) => {
    if (window.confirm("Are you sure you want to delete this appointment?")) {
      try {
        const token = localStorage.getItem('token');
        await axios.delete(`http://localhost:3000/appointments/${id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setAppointments(appointments.filter(apt => apt._id !== id));
      } catch (error) {
        console.error("Error deleting appointment:", error);
        setError("Failed to delete appointment");
      }
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="manage-appointments-container">
      <h2>Manage Appointments</h2>
      <button onClick={() => setShowAdd(true)} className="add-appointment-btn">
        Add New Appointment
      </button>

      {showAdd && (
        <AddAppointment
          onSuccess={handleAddAppointment}
          onClose={() => setShowAdd(false)}
          isAdminContext={true}
        />
      )}

      {showEdit && selectedAppointment && (
        <EditAppointment
          appointment={selectedAppointment}
          onSuccess={handleEditAppointment}
          onClose={() => setShowEdit(false)}
        />
      )}

      <div className="appointments-list">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Service</th>
              <th>Date</th>
              <th>Time</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {appointments?.map((appointment) => (
              <tr key={appointment._id}>
                <td>{appointment.name}</td>
                <td>{appointment.email}</td>
                <td>{appointment.phone}</td>
                <td>{appointment.services}</td>
                <td>{new Date(appointment.preferredDate).toLocaleDateString()}</td>
                <td>{appointment.preferredTime}</td>
                <td>{appointment.status}</td>
                <td>
                  <button
                    onClick={() => {
                      setSelectedAppointment(appointment);
                      setShowEdit(true);
                    }}
                    className="edit-btn"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteAppointment(appointment._id)}
                    className="delete-btn"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageAppointments;
