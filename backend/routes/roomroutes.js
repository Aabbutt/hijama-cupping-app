const express = require('express');
const router = express.Router();
const roomcontroller = require('../controllers/roomcontroller');
// Route to create a new room schedule
router.get('/',roomcontroller.getRoomSchedules);
router.post('/create',roomcontroller.createRoomSchedule);

module.exports = router;

