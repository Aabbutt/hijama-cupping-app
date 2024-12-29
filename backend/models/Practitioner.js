// models/Practitioner.js
const mongoose = require("mongoose");

// Define Practitioner schema
const practitionerSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
      trim: true,
    },
    mobileNumber: {
      type: String,
      required: true,
    },
    emailAddress: {
      type: String,
      required: true,
      unique: true,
      match: [/.+\@.+\..+/, "Please fill a valid email address"],
    },
    dateOfBirth: {
      type: Date,
      required: true,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    education: {
      type: String,
      required: true,
    },
    agreeTerms: {
      type: Boolean,
      required: true,
    },
    uploadDocuments: {
      type: String, // Path to uploaded document
      required: true,
    },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt fields
  }
);

// Create Practitioner model
const Practitioner = mongoose.model("Practitioner", practitionerSchema);

module.exports = Practitioner;
