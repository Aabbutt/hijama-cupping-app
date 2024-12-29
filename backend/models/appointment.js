const mongoose = require("mongoose");

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
    enum: ["Consultation", "Treatment", "Checkup"], // Enum values for services
    required: true,
  },
  practitioner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Practitioner",
  },
  preferredDate: {
    type: Date,
    required: true,
  },
  preferredTime: {
    type: String,
    enum: ["8:30", "10:00", "11:30", "1:00", "2:30", "4:00", "5:30"], // Enum values for time slots
    required: true,
  },
  message: {
    type: String,
  },
  status: {
    type: String,
    enum: ["pending", "assigned", "completed", "cancelled"],
    default: "pending",
  },
});

const Appointments = mongoose.model("Appointments", appointmentSchema);
module.exports = Appointments;
