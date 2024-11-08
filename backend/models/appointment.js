const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  services: {
    type: String,
    enum: ['Consultation', 'Treatment', 'Checkup'], // Enum values for services
    required: true,
  },
  preferredDate: {
    type: Date,
    required: true,
  },
  preferredTime: {
    type: String,
    enum: ['Morning', 'Afternoon', 'Evening'], // Enum values for time slots
    required: true,
  },
  message: {
    type: String,
  },
});

const Appointment = mongoose.model('Appointment', appointmentSchema);
