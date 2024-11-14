const mongoose = require("mongoose");
const { ADMIN } = require("../constants/roles");

const userschema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    required: true,
    unique: true,
  },

  password: {
    type: String,
    required: true,
  },

  role: {
    type: String,
    enum: [ADMIN, "practitioner", "patient"],
    default: "patient",
  },

  phone: {
    type: Number,
  },
  address: {
    type: String,
  },
  dateofbirth: {
    type: Date,
  },
  gender: {
    type: String,
    enum: ["male", "female", "other"],
  },
});

module.exports = mongoose.model("user", userschema);
