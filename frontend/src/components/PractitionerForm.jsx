// src/components/PractitionerForm.js
import React, { useState } from "react";
import axios from "axios";

const PractitionerForm = ({ onAddPractitioner }) => {
  const [practitionerData, setPractitionerData] = useState({
    fullName: "",
    mobileNumber: "",
    emailAddress: "",
    dateOfBirth: "",
    education: "",
    agreeTerms: false,
    uploadDocuments: null,
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setPractitionerData({
      ...practitionerData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleFileChange = (e) => {
    setPractitionerData({
      ...practitionerData,
      uploadDocuments: e.target.files[0],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("fullName", practitionerData.fullName);
    formData.append("mobileNumber", practitionerData.mobileNumber);
    formData.append("emailAddress", practitionerData.emailAddress);
    formData.append("dateOfBirth", practitionerData.dateOfBirth);
    formData.append("education", practitionerData.education);
    formData.append("agreeTerms", practitionerData.agreeTerms);
    formData.append("uploadDocuments", practitionerData.uploadDocuments);

    try {
      const response = await axios.post(
        "http://localhost:3000/practitioners",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      onAddPractitioner(response.data); // Callback to parent after successful submission
      alert("Practitioner added successfully!");
    } catch (error) {
      console.error("Error adding practitioner:", error);
      alert("Failed to add practitioner. Please try again.");
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
          />{" "}
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
    </div>
  );
};

export default PractitionerForm;
