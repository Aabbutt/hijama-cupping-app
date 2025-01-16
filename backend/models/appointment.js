const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  practitioner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "practitioner",
  },
  room: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "room",
    required: true
  },
  services: {
    type: String,
    required: true,
    enum: ["wet cupping", "dry cupping"],
  },
  preferredDate: {
    type: Date,
    required: true,
  },
  startTime: {
    type: String,
    required: true,
  },
  endTime: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ["pending", "confirmed", "cancelled", "completed"],
    default: "pending",
  },
  message: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  }
});

module.exports = mongoose.model("appointment", appointmentSchema);
