const mongoose = require('mongoose');

const patientSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  age: {
    type: Number,
    required: true
  },
  gender: {
    type: String,
    required: true
  },
  contactInfo: {
    phone: String,
    email: String
  },
  medicalHistory: String
});

module.exports = mongoose.model('Patient', patientSchema);
