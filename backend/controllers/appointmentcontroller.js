const Appointment = require("../models/appointment");

// Get user's appointments
const getUserAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find({ user: req.user._id })
      .populate("practitioner", "name")
      .sort({ appointmentDate: -1 });
    res.status(200).json({ appointments });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch appointments" });
  }
};

// Get single appointment
const getAppointment = async (req, res) => {
  try {
    const appointment = await Appointment.findOne({
      _id: req.params.id,
      user: req.user._id,
    }).populate("practitioner", "name");

    if (!appointment) {
      return res.status(404).json({ error: "Appointment not found" });
    }

    res.status(200).json({ appointment });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch appointment" });
  }
};

// Create appointment
const createAppointment = async (req, res) => {
  try {
    const { service, appointmentDate, timeSlot, notes, practitioner } = req.body;

    const appointment = new Appointment({
      user: req.user._id,
      service,
      appointmentDate,
      timeSlot,
      notes,
      practitioner,
    });

    await appointment.save();
    res.status(201).json({ 
      message: "Appointment created successfully",
      appointment 
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to create appointment" });
  }
};

// Update appointment
const updateAppointment = async (req, res) => {
  try {
    const { service, appointmentDate, timeSlot, notes } = req.body;

    const appointment = await Appointment.findOne({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!appointment) {
      return res.status(404).json({ error: "Appointment not found" });
    }

    if (appointment.status === "completed") {
      return res.status(400).json({ error: "Cannot update completed appointment" });
    }

    appointment.service = service || appointment.service;
    appointment.appointmentDate = appointmentDate || appointment.appointmentDate;
    appointment.timeSlot = timeSlot || appointment.timeSlot;
    appointment.notes = notes || appointment.notes;
    appointment.updatedAt = Date.now();

    await appointment.save();
    res.status(200).json({ 
      message: "Appointment updated successfully",
      appointment 
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to update appointment" });
  }
};

// Cancel appointment
const cancelAppointment = async (req, res) => {
  try {
    const appointment = await Appointment.findOne({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!appointment) {
      return res.status(404).json({ error: "Appointment not found" });
    }

    if (appointment.status === "completed") {
      return res.status(400).json({ error: "Cannot cancel completed appointment" });
    }

    appointment.status = "cancelled";
    appointment.updatedAt = Date.now();

    await appointment.save();
    res.status(200).json({ 
      message: "Appointment cancelled successfully",
      appointment 
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to cancel appointment" });
  }
};

module.exports = {
  getUserAppointments,
  getAppointment,
  createAppointment,
  updateAppointment,
  cancelAppointment,
};

