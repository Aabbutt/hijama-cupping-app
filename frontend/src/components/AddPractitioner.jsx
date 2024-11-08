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
    uploadDocuments: null, // For handling file upload
  });
  const [errors, setErrors] = useState({}); // To store field-specific errors
  const [submitError, setSubmitError] = useState(''); // For backend submission errors

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPractitionerData({ ...practitionerData, [name]: value });
  };

  // Handle file upload
  const handleFileChange = (e) => {
    setPractitionerData({ ...practitionerData, uploadDocuments: e.target.files[0] });
  };

  // Validate form fields before submitting
  const validateForm = () => {
    let formErrors = {};

    if (!practitionerData.fullName.trim()) {
      formErrors.fullName = 'Full Name is required';
    }
    if (!practitionerData.mobileNumber.trim()) {
      formErrors.mobileNumber = 'Mobile Number is required';
    }
    if (!practitionerData.emailAddress.trim()) {
      formErrors.emailAddress = 'Email Address is required';
    }
    if (!practitionerData.dateOfBirth) {
      formErrors.dateOfBirth = 'Date of Birth is required';
    }
    if (!practitionerData.education.trim()) {
      formErrors.education = 'Education is required';
    }
    if (!practitionerData.agreeTerms) {
      formErrors.agreeTerms = 'You must agree to the terms';
    }
    if (!practitionerData.uploadDocuments) {
      formErrors.uploadDocuments = 'You must upload a document';
    }

    setErrors(formErrors);
    return Object.keys(formErrors).length === 0; // Return true if no errors
  };

  // Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate before submitting
    if (!validateForm()) {
      return; // If validation fails, do not proceed with submission
    }

    // Create a FormData object to send data, including files
    const formData = new FormData();
    formData.append('fullName', practitionerData.fullName);
    formData.append('mobileNumber', practitionerData.mobileNumber);
    formData.append('emailAddress', practitionerData.emailAddress);
    formData.append('dateOfBirth', practitionerData.dateOfBirth);
    formData.append('education', practitionerData.education);
    formData.append('agreeTerms', practitionerData.agreeTerms);
    if (practitionerData.uploadDocuments) {
      formData.append('uploadDocuments', practitionerData.uploadDocuments); // File
    }

    try {
      const response = await axios.post('http://localhost:5000/practitioners', formData, {
        headers: {
          'Content-Type': 'multipart/form-data', // Important for file upload
        },
      });

      onAddPractitioner(response.data); // Call parent component's handler to update the list
      onClose(); // Close the add practitioner form
    } catch (error) {
      console.error('Error adding practitioner:', error);

      // Update the error message based on the server response or generic message
      setSubmitError(error.response?.data?.message || 'Error adding practitioner. Please check your input and try again.');
    }
  };

  return (
    <div className="practitioner-form">
      <h2>Add New Practitioner</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="text"
            name="fullName"
            value={practitionerData.fullName}
            onChange={handleInputChange}
            placeholder="Full Name"
            required
          />
          {errors.fullName && <p style={{ color: 'red' }}>{errors.fullName}</p>}
        </div>
        <div>
          <input
            type="text"
            name="mobileNumber"
            value={practitionerData.mobileNumber}
            onChange={handleInputChange}
            placeholder="Mobile Number"
            required
          />
          {errors.mobileNumber && <p style={{ color: 'red' }}>{errors.mobileNumber}</p>}
        </div>
        <div>
          <input
            type="email"
            name="emailAddress"
            value={practitionerData.emailAddress}
            onChange={handleInputChange}
            placeholder="Email Address"
            required
          />
          {errors.emailAddress && <p style={{ color: 'red' }}>{errors.emailAddress}</p>}
        </div>
        <div>
          <input
            type="date"
            name="dateOfBirth"
            value={practitionerData.dateOfBirth}
            onChange={handleInputChange}
            required
          />
          {errors.dateOfBirth && <p style={{ color: 'red' }}>{errors.dateOfBirth}</p>}
        </div>
        <div>
          <input
            type="text"
            name="education"
            value={practitionerData.education}
            onChange={handleInputChange}
            placeholder="Education"
            required
          />
          {errors.education && <p style={{ color: 'red' }}>{errors.education}</p>}
        </div>
        <div>
          <input
            type="file"
            name="uploadDocuments"
            onChange={handleFileChange}
            required
          />
          {errors.uploadDocuments && <p style={{ color: 'red' }}>{errors.uploadDocuments}</p>}
        </div>
        <div>
          <label>
            <input
              type="checkbox"
              name="agreeTerms"
              checked={practitionerData.agreeTerms}
              onChange={(e) => setPractitionerData({ ...practitionerData, agreeTerms: e.target.checked })}
              required
            />
            I agree to the terms and conditions
          </label>
          {errors.agreeTerms && <p style={{ color: 'red' }}>{errors.agreeTerms}</p>}
        </div>
        <button type="submit">Add Practitioner</button>
      </form>

      {submitError && <p style={{ color: 'red' }}>{submitError}</p>} {/* Display backend submission error */}
      
      <button onClick={onClose}>Close</button>
    </div>
  );
};

export default AddPractitioner;
