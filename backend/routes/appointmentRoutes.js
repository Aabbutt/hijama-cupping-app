const express = require("express");
const router = express.Router();
const appointmentController = require("../controllers/appointmentcontroller");
const { jwtParse } = require("../middleware/auth");

// All routes are protected with JWT authentication
router.use(jwtParse);

// Get user's appointments
router.get("/", appointmentController.getUserAppointments);

// Get single appointment
router.get("/:id", appointmentController.getAppointment);

// Create new appointment
router.post("/", appointmentController.createAppointment);

// Update appointment
router.put("/:id", appointmentController.updateAppointment);

// Cancel appointment
router.put("/:id/cancel", appointmentController.cancelAppointment);

module.exports = router; 