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
    setShowAdd(false);
  };

  const handleUpdateAppointment = (updatedAppointment) => {
    setAppointments((prevAppointments) =>
      prevAppointments.map((appointment) =>
        appointment._id === updatedAppointment._id
          ? updatedAppointment
          : appointment
      )
    );
    setShowEdit(false);
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

  const getStatusClass = (status) => {
    return `hc-status-badge hc-status-${status.toLowerCase()}`;
  };

  return (
    <div className="hc-appointment-management" style={{ padding: "2rem" , minHeight: "0vh"}}>
      <h2 className="hc-appointment-title">Manage Appointments</h2>
      <button className="hc-add-appointment-btn" onClick={() => setShowAdd(true)}>
        Add Appointment
      </button>

      {showAdd && (
        <div className="hc-modal-overlay">
          <AddAppointment
            onAddAppointment={handleAddAppointment}
            onClose={() => setShowAdd(false)}
          />
        </div>
      )}
      
      {showEdit && (
        <div className="hc-modal-overlay">
          <EditAppointment
            appointment={currentAppointment}
            onUpdate={handleUpdateAppointment}
            onClose={() => setShowEdit(false)}
          />
        </div>
      )}

      <div className="hc-table-container">
        <table className="hc-appointments-table">
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
                <td>
                  <span className={getStatusClass(appointment.status)}>
                    {appointment.status}
                  </span>
                </td>
                <td>
                  {appointment.practitioner ? (
                    appointment.practitioner.fullName
                  ) : (
                    <select
                      className="hc-practitioner-select"
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
                  <div className="hc-action-buttons">
                    <button
                      className="hc-edit-btn"
                      onClick={() => {
                        setCurrentAppointment(appointment);
                        setShowEdit(true);
                      }}
                    >
                      Edit
                    </button>
                    <button
                      className="hc-delete-btn"
                      onClick={() => handleDeleteAppointment(appointment._id)}
                    >
                      Delete
                    </button>
                  </div>
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
