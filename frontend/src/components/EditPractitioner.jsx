// src/components/EditPractitioner.js
import React, { useState, useEffect } from "react";
import axios from "axios";

const EditPractitioner = ({ practitioner, onUpdate, onClose }) => {
  const [practitionerData, setPractitionerData] = useState(practitioner);
  const [dateError, setDateError] = useState("");
  const minDate = new Date();
  minDate.setFullYear(minDate.getFullYear() - 118); // Maximum age limit
  const minDateString = minDate.toISOString().split("T")[0];
  const today = new Date().toISOString().split("T")[0];

  useEffect(() => {
    setPractitionerData(practitioner);
  }, [practitioner]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setPractitionerData({
      ...practitionerData,
      [name]: type === "checkbox" ? checked : value,
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

      const response = await axios.put(
        `http://localhost:3000/practitioners/${practitionerData._id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      onUpdate(response.data);
      onClose(); // Close the form
    } catch (error) {
      console.error("Error updating practitioner:", error);
    }
  };

  return (
    <div className="practitioner-registration-page">
      <div className="practitioner-registration-container">
        <h2 className="practitioner-registration-title">Edit Practitioner</h2>
        <form
          onSubmit={handleSubmit}
          className="practitioner-registration-form"
        >
          {/* Full Name Field */}
          <div className="practitioner-form-group">
            <label htmlFor="fullName" className="practitioner-label">
              Full Name:
            </label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              value={practitionerData.fullName}
              onChange={handleInputChange}
              className="practitioner-input"
              required
            />
          </div>

          {/* Mobile Number Field */}
          <div className="practitioner-form-group">
            <label htmlFor="mobileNumber" className="practitioner-label">
              Mobile Number:
            </label>
            <input
              type="text"
              id="mobileNumber"
              name="mobileNumber"
              value={practitionerData.mobileNumber}
              onChange={handleInputChange}
              className="practitioner-input"
              required
            />
          </div>

          {/* Email Address Field */}
          <div className="practitioner-form-group">
            <label htmlFor="emailAddress" className="practitioner-label">
              Email Address:
            </label>
            <input
              type="email"
              id="emailAddress"
              name="emailAddress"
              value={practitionerData.emailAddress}
              onChange={handleInputChange}
              className="practitioner-input"
              required
            />
          </div>

          {/* Date of Birth Field */}
          <div className="practitioner-form-group">
            <label htmlFor="dateOfBirth" className="practitioner-label">
              Date of Birth:
            </label>
            <input
              type="date"
              id="dateOfBirth"
              name="dateOfBirth"
              value={practitionerData.dateOfBirth}
              onChange={handleInputChange}
              max={today}
              min={minDateString}
              className="practitioner-input"
              required
            />
            {dateError && (
              <span className="practitioner-error-message">{dateError}</span>
            )}
          </div>

          {/* Education Field */}
          <div className="practitioner-form-group">
            <label htmlFor="education" className="practitioner-label">
              Education:
            </label>
            <input
              type="text"
              id="education"
              name="education"
              value={practitionerData.education}
              onChange={handleInputChange}
              className="practitioner-input"
              required
            />
          </div>

          {/* Agree Terms Field */}
          <div className="practitioner-form-group terms-group">
            <label htmlFor="agreeTerms" className="practitioner-checkbox-label">
              <input
                type="checkbox"
                id="agreeTerms"
                name="agreeTerms"
                checked={practitionerData.agreeTerms}
                onChange={handleInputChange}
                className="practitioner-checkbox"
                required
              />
              <span>I agree to the terms and conditions</span>
            </label>
          </div>

          {/* Upload Documents Field */}
          <div className="practitioner-form-group">
            <label htmlFor="uploadDocuments" className="practitioner-label">
              Upload Documents:
            </label>
            <input
              type="file"
              id="uploadDocuments"
              name="uploadDocuments"
              onChange={handleFileChange}
              className="practitioner-file-input"
              required
            />
          </div>

          {/* Submit Button */}
          <div className="practitioner-form-group">
            <button type="submit" className="practitioner-submit-btn">
              Update Practitioner
            </button>
          </div>
        </form>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default EditPractitioner;
