// src/components/AddPractitioner.js
import React, { useState } from 'react';
import axios from 'axios';

const AddPractitioner = ({ onAddPractitioner, onClose }) => {
  const [practitionerData, setPractitionerData] = useState({
    fullName: '',
    mobileNumber: '',
    emailAddress: '',
    dateOfBirth: '',
    education: '',
    agreeTerms: false,
    uploadDocuments: ''
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setPractitionerData({
      ...practitionerData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setPractitionerData({ ...practitionerData, uploadDocuments: file });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      for (const key in practitionerData) {
        formData.append(key, practitionerData[key]);
      }

      const response = await axios.post('http://localhost:5000/practitioners', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      onAddPractitioner(response.data);
      onClose(); // Close the form
    } catch (error) {
      console.error('Error adding practitioner:', error);
    }
  };

  return (
    <div className="practitioner-form">
      <h2>Add New Practitioner</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="fullName"
          value={practitionerData.fullName}
          onChange={handleInputChange}
          placeholder="Full Name"
          required
        />
        <input
          type="text"
          name="mobileNumber"
          value={practitionerData.mobileNumber}
          onChange={handleInputChange}
          placeholder="Mobile Number"
          required
        />
        <input
          type="email"
          name="emailAddress"
          value={practitionerData.emailAddress}
          onChange={handleInputChange}
          placeholder="Email Address"
          required
        />
        <input
          type="date"
          name="dateOfBirth"
          value={practitionerData.dateOfBirth}
          onChange={handleInputChange}
          required
        />
        <input
          type="text"
          name="education"
          value={practitionerData.education}
          onChange={handleInputChange}
          placeholder="Education"
          required
        />
        <label>
          <input
            type="checkbox"
            name="agreeTerms"
            checked={practitionerData.agreeTerms}
            onChange={handleInputChange}
            required
          />
          I agree to the terms and conditions
        </label>
        <input
          type="file"
          name="uploadDocuments"
          onChange={handleFileChange}
          required
        />
        <button type="submit">Add Practitioner</button>
      </form>
      <button onClick={onClose}>Close</button>
    </div>
  );
};

export default AddPractitioner;
