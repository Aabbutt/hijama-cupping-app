import React, { useState } from 'react';
import './JoinAsPractitioner.css'; // Import your CSS file for styling

const JoinAsPractitioner = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    mobileNumber: '',
    emailAddress: '',
    dateOfBirth: '',
    specialization: '',
    clinicName: '',
    medicalLicense: '',
    agreeTerms: false,
  });

  const handleChange = (e) => {
    const { id, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log('Form data submitted:', formData);
  };

  return (
    <div className="join-page">
      {/* Left side with additional information */}
      <div className="join-left">
        <h1>Become a Practitioner</h1>
        <p>Join our community of healthcare professionals</p>
        <ul>
          <li>Expand your reach to new patients</li>
          <li>Access professional resources and tools</li>
          <li>Grow your practice with our support</li>
        </ul>
      </div>

      {/* Right side with the form */}
      <div className="join-right">
        <div className="join-container">
          <h2>Register Your Profile</h2>
          <p>Please fill in the details to create your profile</p>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="fullName">Full Name*</label>
              <input
                type="text"
                id="fullName"
                placeholder="Enter your full name"
                value={formData.fullName}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="mobileNumber">Mobile Number*</label>
              <input
                type="text"
                id="mobileNumber"
                placeholder="e.g., +1234567890"
                value={formData.mobileNumber}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="emailAddress">Email Address*</label>
              <input
                type="email"
                id="emailAddress"
                placeholder="yourname@example.com"
                value={formData.emailAddress}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="dateOfBirth">Date of Birth*</label>
              <input
                type="date"
                id="dateOfBirth"
                value={formData.dateOfBirth}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="specialization">Specialization*</label>
              <input
                type="text"
                id="specialization"
                placeholder="e.g., Cardiologist, Dermatologist"
                value={formData.specialization}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="clinicName">Clinic/Hospital Name*</label>
              <input
                type="text"
                id="clinicName"
                placeholder="Enter your clinic or hospital name"
                value={formData.clinicName}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="medicalLicense">Upload Medical License (JPG/PNG/PDF Only, Max 2MB)*</label>
              <input
                type="file"
                id="medicalLicense"
                accept=".jpg, .jpeg, .png, .pdf"
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <input
                type="checkbox"
                id="agreeTerms"
                checked={formData.agreeTerms}
                onChange={handleChange}
                required
              />
              <label htmlFor="agreeTerms">I agree to the terms of use and privacy policy.</label>
            </div>

            <button type="submit">Submit Profile</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default JoinAsPractitioner;
