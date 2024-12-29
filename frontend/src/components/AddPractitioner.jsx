import React, { useState } from "react";
import axios from "axios";
import "../pages/Practitioner.css";

const AddPractitioner = ({ onAddPractitioner, onClose }) => {
  const [practitionerData, setPractitionerData] = useState({
    fullName: "",
    mobileNumber: "",
    emailAddress: "",
    dateOfBirth: "",
    education: "",
    agreeTerms: false,
    uploadDocuments: "",
  });

  // Add date error state
  const [dateError, setDateError] = useState("");

  // Add date validation function
  const validateDate = (dateString) => {
    const today = new Date();
    const selectedDate = new Date(dateString);
    const minDate = new Date();
    minDate.setFullYear(today.getFullYear() - 18); // 18 years ago

    if (selectedDate > today) {
      return "Date of birth cannot be in the future";
    }
    if (selectedDate > minDate) {
      return "Practitioner must be at least 18 years old";
    }
    return "";
  };

  // Handle input changes and update state accordingly
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (name === "dateOfBirth") {
      const error = validateDate(value);
      setDateError(error);
    }

    setPractitionerData({
      ...practitionerData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  // Handle file input for document upload
  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setPractitionerData({
      ...practitionerData,
      [name]: files[0],
    });
  };

  // Handle form submission to add a new practitioner
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate date before submission
    const dateError = validateDate(practitionerData.dateOfBirth);
    if (dateError) {
      setDateError(dateError);
      return;
    }

    try {
      // Prepare form data for file upload
      const formData = new FormData();
      formData.append("fullName", practitionerData.fullName);
      formData.append("mobileNumber", practitionerData.mobileNumber);
      formData.append("emailAddress", practitionerData.emailAddress);
      formData.append("dateOfBirth", practitionerData.dateOfBirth);
      formData.append("education", practitionerData.education);
      formData.append("agreeTerms", practitionerData.agreeTerms);
      formData.append("uploadDocuments", practitionerData.uploadDocuments);

      // Send the practitioner data to the backend
      const response = await axios.post(
        "http://localhost:3000/practitioners",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      onAddPractitioner(response.data);
      onClose();
    } catch (error) {
      // Handle errors
      console.error("Error registering practitioner:", error);
      alert("Failed to register practitioner. Please try again.");
    }
  };

  // Calculate max date (today) and min date (118 years ago)
  const today = new Date().toISOString().split("T")[0];
  const minDate = new Date();
  minDate.setFullYear(minDate.getFullYear() - 118); // Maximum age limit
  const minDateString = minDate.toISOString().split("T")[0];

  return (
    <div className="practitioner-registration-page">
      <div className="practitioner-registration-container">
        <h2 className="practitioner-registration-title">Add a Practitioner</h2>
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
              Add Practitioner
            </button>
          </div>
        </form>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default AddPractitioner;
