// src/components/ManagePractitioners.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import AddPractitioner from "../components/AddPractitioner";
import EditPractitioner from "../components/EditPractitioner";
import Modal from "../components/Modal";
import "./ManagePractitioners.css";

const ManagePractitioners = () => {
  const [practitioners, setPractitioners] = useState([]);
  const [showAdd, setShowAdd] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [currentPractitioner, setCurrentPractitioner] = useState(null);

  // Fetching all practitioners
  const fetchPractitioners = async () => {
    try {
      const response = await axios.get("http://localhost:3000/practitioners");
      setPractitioners(response.data);
    } catch (error) {
      console.error("Error fetching practitioners:", error);
    }
  };

  useEffect(() => {
    fetchPractitioners();
  }, []);

  // Handle the addition of a new practitioner
  const handleAddPractitioner = (practitioner) => {
    setPractitioners((prevPractitioners) => [
      ...prevPractitioners,
      practitioner,
    ]);
  };

  // Handle updating a practitioner
  const handleUpdatePractitioner = (updatedPractitioner) => {
    setPractitioners((prevPractitioners) =>
      prevPractitioners.map((practitioner) =>
        practitioner._id === updatedPractitioner._id
          ? updatedPractitioner
          : practitioner
      )
    );
  };

  // Handle the deletion of a practitioner
  const handleDeletePractitioner = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/practitioners/${id}`);
      setPractitioners((prevPractitioners) =>
        prevPractitioners.filter((practitioner) => practitioner._id !== id)
      );
    } catch (error) {
      console.error("Error deleting practitioner:", error);
    }
  };

  // Add this new handler function after the other handlers
  const handleVerifyPractitioner = async (id, currentStatus) => {
    try {
      const endpoint = currentStatus
        ? `http://localhost:3000/practitioners/${id}/unverify`
        : `http://localhost:3000/practitioners/${id}/verify`;

      const response = await axios.put(endpoint);

      setPractitioners((prevPractitioners) =>
        prevPractitioners.map((practitioner) =>
          practitioner._id === id ? response.data.practitioner : practitioner
        )
      );
    } catch (error) {
      console.error("Error verifying practitioner:", error);
    }
  };

  return (
    <div className="hc-practitioner-management">
      <h2 className="hc-practitioner-title">Manage Practitioners</h2>
      <button
        className="hc-add-practitioner-btn"
        onClick={() => setShowAdd(true)}
      >
        Add Practitioner
      </button>

      <Modal
        isOpen={showAdd}
        onClose={() => setShowAdd(false)}
        title="Add New Practitioner"
      >
        <AddPractitioner
          onAddPractitioner={handleAddPractitioner}
          onClose={() => setShowAdd(false)}
        />
      </Modal>

      <Modal
        isOpen={showEdit}
        onClose={() => setShowEdit(false)}
        title="Edit Practitioner"
      >
        <EditPractitioner
          practitioner={currentPractitioner}
          onUpdate={handleUpdatePractitioner}
          onClose={() => setShowEdit(false)}
        />
      </Modal>

      <div className="hc-table-container">
        <table className="hc-practitioners-table">
          <thead>
            <tr>
              <th>Full Name</th>
              <th>Email</th>
              <th>Mobile Number</th>
              <th>Date of Birth</th>
              <th>Education</th>
              <th>Terms Agreed</th>
              <th>Verified</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {practitioners.map((practitioner) => (
              <tr key={practitioner._id}>
                <td>{practitioner.fullName}</td>
                <td>{practitioner.emailAddress}</td>
                <td>{practitioner.mobileNumber}</td>
                <td>
                  {new Date(practitioner.dateOfBirth).toLocaleDateString()}
                </td>
                <td>{practitioner.education}</td>
                <td>{practitioner.agreeTerms ? "Yes" : "No"}</td>
                <td>
                  <button
                    onClick={() =>
                      handleVerifyPractitioner(
                        practitioner._id,
                        practitioner.isVerified
                      )
                    }
                    className={`hc-verify-button ${
                      practitioner.isVerified ? "hc-verified" : "hc-unverified"
                    }`}
                  >
                    {practitioner.isVerified ? "Verified ✓" : "Verify"}
                  </button>
                </td>
                <td className="hc-action-buttons">
                  <button
                    className="hc-edit-btn"
                    onClick={() => {
                      setCurrentPractitioner(practitioner);
                      setShowEdit(true);
                    }}
                  >
                    Edit
                  </button>
                  <button
                    className="hc-delete-btn"
                    onClick={() => handleDeletePractitioner(practitioner._id)}
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

export default ManagePractitioners;
