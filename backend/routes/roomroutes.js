const express = require('express');
const router = express.Router();
const roomcontroller = require('../controllers/roomcontroller');

// Get all room schedules
router.get('/', roomcontroller.getRoomSchedules);

// Create a new room schedule
router.post('/create', roomcontroller.createRoomSchedule);

// Get room schedules by date
router.get('/date/:date', roomcontroller.getRoomSchedulesByDate);

// Update room schedule status
router.put('/:id/status', roomcontroller.updateRoomScheduleStatus);

// Delete a room schedule
router.delete('/:id', roomcontroller.deleteRoomSchedule);

module.exports = router;

