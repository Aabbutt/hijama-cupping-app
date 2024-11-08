// src/components/EditPractitioner.js

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useHistory } from 'react-router-dom';

const EditPractitioner = () => {
  const { id } = useParams();
  const history = useHistory();
  
  const [formData, setFormData] = useState({
    fullName: '',
    mobileNumber: '',
    emailAddress: '',
    dateOfBirth: '',
    education: '',
    uploadDocuments: null,
    agreeTerms: false,
  });

  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    const fetchPractitioner = async () => {
      try {
        const { data } = await axios.get(`http://localhost:5000/practitioners/${id}`);
        setFormData(data);
      } catch (error) {
        setError('Error: Practitioner not found');
      }
    };

    fetchPractitioner();
  }, [id]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, uploadDocuments: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = new FormData();
    Object.keys(formData).forEach((key) => {
      if (key !== 'uploadDocuments') form.append(key, formData[key]);
    });
    if (formData.uploadDocuments) {
      form.append('uploadDocuments', formData.uploadDocuments);
    }

    try {
      await axios.put(`http://localhost:5000/practitioners/${id}`, form, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setSuccessMessage('Practitioner updated successfully');
      history.push('/manage-practitioners');
    } catch (error) {
      setError('Error: ' + error.response?.data?.message || error.message);
    }
  };

  return (
    <div>
      <h2>Edit Practitioner</h2>
      {error && <p className="error">{error}</p>}
      {successMessage && <p className="success">{successMessage}</p>}
      <form onSubmit={handleSubmit}>
        <label>Full Name:</label>
        <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} required />
        <label>Mobile Number:</label>
        <input type="text" name="mobileNumber" value={formData.mobileNumber} onChange={handleChange} required />
        <label>Email Address:</label>
        <input type="email" name="emailAddress" value={formData.emailAddress} onChange={handleChange} required />
        <label>Date of Birth:</label>
        <input type="date" name="dateOfBirth" value={formData.dateOfBirth} onChange={handleChange} required />
        <label>Education:</label>
        <input type="text" name="education" value={formData.education} onChange={handleChange} required />
        <label>Upload Documents (JPG, PNG, PDF, max 2MB):</label>
        <input type="file" name="uploadDocuments" onChange={handleFileChange} />
        <label>
          <input type="checkbox" name="agreeTerms" checked={formData.agreeTerms} onChange={handleChange} />
          I agree to the terms and conditions
        </label>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default EditPractitioner;
