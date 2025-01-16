const Appointment = require("../models/appointment");

// Get user's appointments
const getUserAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find({ user: req.user._id })
      .populate("practitioner", "name")
      .sort({ createdAt: -1, preferredDate: -1 })
      .limit(5); // Get the 5 most recent appointments
    
    console.log('Found appointments:', appointments);
    res.status(200).json({ appointments });
  } catch (error) {
    console.error('Error fetching appointments:', error);
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
    console.log("Creating appointment with data:", req.body);
    console.log("User from token:", req.user);

    const { 
      name, 
      email, 
      phone, 
      services, 
      preferredDate, 
      startTime, 
      endTime, 
      message,
      practitionerId,
      roomId 
    } = req.body;

    // Validate required fields
    if (!name || !email || !phone || !services || !preferredDate || !startTime || !endTime || !practitionerId || !roomId) {
      return res.status(400).json({ error: "All required fields must be provided" });
    }

    // Check if room is available
    const roomAvailable = await checkRoomAvailability(roomId, preferredDate, startTime, endTime);
    if (!roomAvailable) {
      return res.status(400).json({ error: "Selected room is not available for the chosen time slot" });
    }

    // Check if practitioner is available
    const practitionerAvailable = await checkPractitionerAvailability(practitionerId, preferredDate, startTime, endTime);
    if (!practitionerAvailable) {
      return res.status(400).json({ error: "Selected practitioner is not available for the chosen time slot" });
    }

    const appointment = new Appointment({
      user: req.user._id,
      name,
      email,
      phone,
      services,
      preferredDate,
      startTime,
      endTime,
      message,
      practitioner: practitionerId,
      room: roomId,
      status: "pending"
    });

    console.log("Saving appointment:", appointment);

    await appointment.save();
    
    // Schedule the room
    await scheduleRoom(roomId, appointment._id, practitionerId, preferredDate, startTime, endTime);
    
    res.status(201).json({ 
      message: "Appointment created successfully",
      appointment 
    });
  } catch (error) {
    console.error("Error creating appointment:", error);
    res.status(500).json({ error: error.message || "Failed to create appointment" });
  }
};

// Helper functions
const checkRoomAvailability = async (roomId, date, startTime, endTime) => {
  const existingBooking = await Appointment.findOne({
    room: roomId,
    preferredDate: date,
    $or: [
      {
        startTime: { $lt: endTime },
        endTime: { $gt: startTime }
      }
    ],
    status: { $nin: ['cancelled'] }
  });
  
  return !existingBooking;
};

const checkPractitionerAvailability = async (practitionerId, date, startTime, endTime) => {
  const existingBooking = await Appointment.findOne({
    practitioner: practitionerId,
    preferredDate: date,
    $or: [
      {
        startTime: { $lt: endTime },
        endTime: { $gt: startTime }
      }
    ],
    status: { $nin: ['cancelled'] }
  });
  
  return !existingBooking;
};

const scheduleRoom = async (roomId, appointmentId, practitionerId, date, startTime, endTime) => {
  // Add room scheduling logic here if needed
  // This could involve updating a separate RoomSchedule collection
  // or updating the room's availability status
};

// Update appointment
const updateAppointment = async (req, res) => {
  try {
    const { services, preferredDate, preferredTime, message } = req.body;

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

    appointment.services = services || appointment.services;
    appointment.preferredDate = preferredDate || appointment.preferredDate;
    appointment.preferredTime = preferredTime || appointment.preferredTime;
    appointment.message = message || appointment.message;
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

