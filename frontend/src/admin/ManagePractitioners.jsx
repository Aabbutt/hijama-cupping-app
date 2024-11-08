// src/components/ManagePractitioners.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AddPractitioner from '../components/AddPractitioner';
import EditPractitioner from '../components/EditPractitioner';

const ManagePractitioners = () => {
  const [practitioners, setPractitioners] = useState([]);
  const [showAdd, setShowAdd] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [currentPractitioner, setCurrentPractitioner] = useState(null);

  // Fetching all practitioners
  const fetchPractitioners = async () => {
    try {
      const response = await axios.get('http://localhost:5000/practitioners');
      setPractitioners(response.data);
    } catch (error) {
      console.error('Error fetching practitioners:', error);
    }
  };

  useEffect(() => {
    fetchPractitioners();
  }, []);

  // Handle the addition of a new practitioner
  const handleAddPractitioner = (practitioner) => {
    setPractitioners((prevPractitioners) => [...prevPractitioners, practitioner]);
  };

  // Handle updating a practitioner
  const handleUpdatePractitioner = (updatedPractitioner) => {
    setPractitioners((prevPractitioners) =>
      prevPractitioners.map((practitioner) =>
        practitioner._id === updatedPractitioner._id ? updatedPractitioner : practitioner
      )
    );
  };

  // Handle the deletion of a practitioner
  const handleDeletePractitioner = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/practitioners/${id}`);
      setPractitioners((prevPractitioners) =>
        prevPractitioners.filter((practitioner) => practitioner._id !== id)
      );
    } catch (error) {
      console.error('Error deleting practitioner:', error);
    }
  };

  return (
    <div className="practitioner-management">
      <h2>Manage Practitioners</h2>
      <button onClick={() => setShowAdd(true)}>Add Practitioner</button>

      {showAdd && <AddPractitioner onAddPractitioner={handleAddPractitioner} onClose={() => setShowAdd(false)} />}
      {showEdit && <EditPractitioner practitioner={currentPractitioner} onUpdate={handleUpdatePractitioner} onClose={() => setShowEdit(false)} />}

      <table>
        <thead>
          <tr>
            <th>Full Name</th>
            <th>Email</th>
            <th>Mobile Number</th>
            <th>Date of Birth</th>
            <th>Education</th>
            <th>Terms Agreed</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {practitioners.map((practitioner) => (
            <tr key={practitioner._id}>
              <td>{practitioner.fullName}</td>
              <td>{practitioner.emailAddress}</td>
              <td>{practitioner.mobileNumber}</td>
              <td>{new Date(practitioner.dateOfBirth).toLocaleDateString()}</td>
              <td>{practitioner.education}</td>
              <td>{practitioner.agreeTerms ? 'Yes' : 'No'}</td>
              <td>
                <button onClick={() => { setCurrentPractitioner(practitioner); setShowEdit(true); }}>Edit</button>
                <button onClick={() => handleDeletePractitioner(practitioner._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManagePractitioners;
