const express = require('express');
const router = express.Router();
const {
  initializeRooms,
  getAllRooms,
  getAvailableRooms,
  getRoomSchedule,
  createSchedule,
  setRoomMaintenance,
  getRoomHistory,
  createRoom
} = require('../controllers/roomcontroller');

// Initialize rooms
router.post('/initialize', async (req, res) => {
  try {
    await initializeRooms();
    res.status(200).json({ message: 'Rooms initialized successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get all rooms
router.get('/', getAllRooms);

// Create a new room
router.post('/', createRoom);

// Get available rooms for a time slot
router.get('/available', getAvailableRooms);

// Get room schedule
router.get('/schedule', getRoomSchedule);

// Get room history with statistics
router.get('/:roomNumber/history', getRoomHistory);

// Create new schedule for a room
router.post('/:roomNumber/schedule', createSchedule);

// Set room maintenance status
router.put('/:roomNumber/maintenance', setRoomMaintenance);

module.exports = router;

