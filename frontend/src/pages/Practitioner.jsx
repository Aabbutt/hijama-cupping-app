import React, { useState } from 'react';
import axios from 'axios';
import './Practitioner.css';

const Practitioner = () => {
  const [practitionerData, setPractitionerData] = useState({
    fullName: '',
    mobileNumber: '',
    emailAddress: '',
    dateOfBirth: '',
    education: '',
    agreeTerms: false,
    uploadDocuments: ''
  });

  // Handle input changes and update state accordingly
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setPractitionerData({
      ...practitionerData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  // Handle file input for document upload
  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setPractitionerData({
      ...practitionerData,
      [name]: files[0]
    });
  };

  // Handle form submission to add a new practitioner
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Prepare form data for file upload
      const formData = new FormData();
      formData.append('fullName', practitionerData.fullName);
      formData.append('mobileNumber', practitionerData.mobileNumber);
      formData.append('emailAddress', practitionerData.emailAddress);
      formData.append('dateOfBirth', practitionerData.dateOfBirth);
      formData.append('education', practitionerData.education);
      formData.append('agreeTerms', practitionerData.agreeTerms);
      formData.append('uploadDocuments', practitionerData.uploadDocuments);

      // Send the practitioner data to the backend
      const response = await axios.post('http://localhost:5000/practitioners', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      // After successful submission, alert the user or take another action
      alert('Practitioner registered successfully!');
      setPractitionerData({  // Reset form
        fullName: '',
        mobileNumber: '',
        emailAddress: '',
        dateOfBirth: '',
        education: '',
        agreeTerms: false,
        uploadDocuments: ''
      });
    } catch (error) {
      // Handle errors
      console.error('Error registering practitioner:', error);
      alert('Failed to register practitioner. Please try again.');
    }
  };

  return (
    <div className="practitioner-form-container">
      <h2>Register as Practitioner</h2>
      <form onSubmit={handleSubmit}>
        {/* Full Name Field */}
        <div className="form-field">
          <label htmlFor="fullName">Full Name:</label>
          <input
            type="text"
            id="fullName"
            name="fullName"
            value={practitionerData.fullName}
            onChange={handleInputChange}
            required
          />
        </div>

        {/* Mobile Number Field */}
        <div className="form-field">
          <label htmlFor="mobileNumber">Mobile Number:</label>
          <input
            type="text"
            id="mobileNumber"
            name="mobileNumber"
            value={practitionerData.mobileNumber}
            onChange={handleInputChange}
            required
          />
        </div>

        {/* Email Address Field */}
        <div className="form-field">
          <label htmlFor="emailAddress">Email Address:</label>
          <input
            type="email"
            id="emailAddress"
            name="emailAddress"
            value={practitionerData.emailAddress}
            onChange={handleInputChange}
            required
          />
        </div>

        {/* Date of Birth Field */}
        <div className="form-field">
          <label htmlFor="dateOfBirth">Date of Birth:</label>
          <input
            type="date"
            id="dateOfBirth"
            name="dateOfBirth"
            value={practitionerData.dateOfBirth}
            onChange={handleInputChange}
            required
          />
        </div>

        {/* Education Field */}
        <div className="form-field">
          <label htmlFor="education">Education:</label>
          <input
            type="text"
            id="education"
            name="education"
            value={practitionerData.education}
            onChange={handleInputChange}
            required
          />
        </div>

        {/* Agree Terms Field */}
        <div className="form-field">
          <label htmlFor="agreeTerms">
            <input
              type="checkbox"
              id="agreeTerms"
              name="agreeTerms"
              checked={practitionerData.agreeTerms}
              onChange={handleInputChange}
              required
            />
            I agree to the terms and conditions
          </label>
        </div>

        {/* Upload Documents Field */}
        <div className="form-field">
          <label htmlFor="uploadDocuments">Upload Documents:</label>
          <input
            type="file"
            id="uploadDocuments"
            name="uploadDocuments"
            onChange={handleFileChange}
            required
          />
        </div>

        {/* Submit Button */}
        <div className="form-field">
          <button type="submit">Register Practitioner</button>
        </div>
      </form>
    </div>
  );
};

export default Practitioner;
