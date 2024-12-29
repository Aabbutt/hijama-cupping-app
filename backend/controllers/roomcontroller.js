const Rooms = require('../models/roomschema');

const createRoomSchedule = async (req, res) => {
    const { roomNumber, appointmentId, patientId, practitionerId, startTime, endTime } = req.body;

    try {
        // Check if the room exists
        const existingRoom = await Rooms.findOne({ roomNumber });
        if (!existingRoom) {
            // Create new room if it doesn't exist
            const newRoom = new Rooms({
                roomNumber,
                status: 'available'
            });
            await newRoom.save();
        }

        // Check if the room is available at the given time
        const existingSchedule = await Rooms.findOne({
            roomNumber,
            status: 'occupied',
            $or: [
                { startTime: { $lt: endTime, $gte: startTime } },
                { endTime: { $gt: startTime, $lte: endTime } }
            ]
        });

        if (existingSchedule) {
            return res.status(400).json({ message: 'Room is already booked during this time slot.' });
        }

        // Create new room schedule
        const roomSchedule = new Rooms({
            roomNumber,
            appointmentId,
            patientId,
            practitionerId,
            startTime,
            endTime,
            status: 'occupied'
        });

        await roomSchedule.save();
        res.status(201).json(roomSchedule);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get all room schedules
const getRoomSchedules = async (req, res) => {
    try {
        const schedules = await Rooms.find()
            .populate('appointmentId')
            .populate('patientId')
            .populate('practitionerId');
        res.status(200).json(schedules);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get room schedules by date
const getRoomSchedulesByDate = async (req, res) => {
    const { date } = req.params;

    try {
        const startOfDay = new Date(date);
        startOfDay.setHours(0, 0, 0, 0);
        
        const endOfDay = new Date(date);
        endOfDay.setHours(23, 59, 59, 999);

        const schedules = await Rooms.find({
            startTime: { $gte: startOfDay, $lt: endOfDay }
        })
            .populate('appointmentId')
            .populate('patientId')
            .populate('practitionerId');

        res.json(schedules);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update room schedule status
const updateRoomScheduleStatus = async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;

    try {
        const schedule = await Rooms.findById(id);
        if (!schedule) {
            return res.status(404).json({ message: 'Room schedule not found' });
        }

        schedule.status = status;
        await schedule.save();
        res.json(schedule);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Delete a room schedule
const deleteRoomSchedule = async (req, res) => {
    const { id } = req.params;

    try {
        const schedule = await Rooms.findByIdAndDelete(id);
        if (!schedule) {
            return res.status(404).json({ message: 'Room schedule not found' });
        }

        res.json({ message: 'Room schedule deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = { 
    createRoomSchedule, 
    getRoomSchedules, 
    getRoomSchedulesByDate, 
    updateRoomScheduleStatus, 
    deleteRoomSchedule 
};