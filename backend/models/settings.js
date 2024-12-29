const mongoose = require("mongoose");

const settingsSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
    unique: true,
  },
  notifications: {
    email: {
      type: Boolean,
      default: true,
    },
    sms: {
      type: Boolean,
      default: false,
    },
    appointmentReminders: {
      type: Boolean,
      default: true,
    },
  },
  preferences: {
    language: {
      type: String,
      enum: ["en", "ur"],
      default: "en",
    },
    theme: {
      type: String,
      enum: ["light", "dark"],
      default: "light",
    },
  },
  privacy: {
    showProfile: {
      type: Boolean,
      default: true,
    },
    showContactInfo: {
      type: Boolean,
      default: false,
    },
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("settings", settingsSchema); 