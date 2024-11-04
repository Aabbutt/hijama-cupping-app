const express = require("express");
const app = express();
const mongoose = require("mongoose");
const { MONGO_URI } = require("./env");

const db = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("MongoDB Connected");
  } catch (err) {
    console.log(err);
  }
};

module.exports = db;
