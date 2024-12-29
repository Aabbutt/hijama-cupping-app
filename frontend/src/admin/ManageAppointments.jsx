import React, { useState, useEffect } from "react";
import axios from "axios";
import AddAppointment from "../components/AddAppointment";
import EditAppointment from "../components/EditAppointment";
import "./ManageAppointments.css";

const ManageAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [practitioners, setPractitioners] = useState([]);
  const [showAdd, setShowAdd] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [currentAppointment, setCurrentAppointment] = useState(null);

  const fetchAppointments = async () => {
    try {
      const response = await axios.get("http://localhost:3000/appointments");
      setAppointments(response.data);
    } catch (error) {
      console.error("Error fetching appointments:", error);
    }
  };

  const fetchPractitioners = async () => {
    try {
      const response = await axios.get("http://localhost:3000/practitioners");
      setPractitioners(response.data);
    } catch (error) {
      console.error("Error fetching practitioners:", error);
    }
  };

  useEffect(() => {
    fetchAppointments();
    fetchPractitioners();
  }, []);

  const handleAddAppointment = (appointment) => {
    setAppointments((prevAppointments) => [...prevAppointments, appointment]);
  };

  const handleUpdateAppointment = (updatedAppointment) => {
    setAppointments((prevAppointments) =>
      prevAppointments.map((appointment) =>
        appointment._id === updatedAppointment._id
          ? updatedAppointment
          : appointment
      )
    );
  };

  const handleDeleteAppointment = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/appointments/${id}`);
      setAppointments((prevAppointments) =>
        prevAppointments.filter((appointment) => appointment._id !== id)
      );
    } catch (error) {
      console.error("Error deleting appointment:", error);
    }
  };

  const handleAssignPractitioner = async (appointmentId, practitionerId) => {
    try {
      const response = await axios.put(
        `http://localhost:3000/appointments/${appointmentId}/assign`,
        {
          practitionerId,
        }
      );
      handleUpdateAppointment(response.data);
    } catch (error) {
      console.error("Error assigning practitioner:", error);
    }
  };

  return (
    <div className="appointment-management">
      <h2>Manage Appointments</h2>
      <button onClick={() => setShowAdd(true)}>Add Appointment</button>

      {showAdd && (
        <AddAppointment
          onAddAppointment={handleAddAppointment}
          onClose={() => setShowAdd(false)}
        />
      )}
      {showEdit && (
        <EditAppointment
          appointment={currentAppointment}
          onUpdate={handleUpdateAppointment}
          onClose={() => setShowEdit(false)}
        />
      )}

      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone Number</th>
            <th>Service</th>
            <th>Preferred Date</th>
            <th>Preferred Time</th>
            <th>Status</th>
            <th>Assigned To</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {appointments.map((appointment) => (
            <tr key={appointment._id}>
              <td>{appointment.name}</td>
              <td>{appointment.email}</td>
              <td>{appointment.phoneNumber}</td>
              <td>{appointment.services}</td>
              <td>
                {new Date(appointment.preferredDate).toLocaleDateString()}
              </td>
              <td>{appointment.preferredTime}</td>
              <td>{appointment.status}</td>
              <td>
                {appointment.practitioner ? (
                  appointment.practitioner.fullName
                ) : (
                  <select
                    onChange={(e) =>
                      handleAssignPractitioner(appointment._id, e.target.value)
                    }
                    value=""
                  >
                    <option value="">Select Practitioner</option>
                    {practitioners.map((practitioner) => (
                      <option key={practitioner._id} value={practitioner._id}>
                        {practitioner.fullName}
                      </option>
                    ))}
                  </select>
                )}
              </td>
              <td>
                <button
                  onClick={() => {
                    setCurrentAppointment(appointment);
                    setShowEdit(true);
                  }}
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteAppointment(appointment._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManageAppointments;
