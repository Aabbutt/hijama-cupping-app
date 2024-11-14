const Rooms = require('../models/roomschema');
const createRoomSchedule = async (req, res) => {

    const { roomNumber, appointmentId, patientId, practitionerId, startTime, endTime } = req.body;

    try {
        // Check if the room is available at the given time
        const room = await Rooms.findById(roomNumber);
        if (!room) {
            return res.status(404).json({ message: 'Room not found' });
        }

        const existingSchedule = await Rooms.findOne({
            roomNumber,
            $or: [
                { startTime: { $lt: endTime, $gte: startTime } },
                { endTime: { $gt: startTime, $lte: endTime } }
            ]
        });

        if (existingSchedule) {
            return res.status(400).json({ message: 'Room is already booked during this time slot.' });
        }

        const roomSchedule = new room({
            roomNumber,
            appointmentId,
            patientId,
            practitionerId,
            startTime,
            endTime,
        });

        await Rooms.save();
        room.status = 'occupied'; // Change room status to 'occupied'
        await Rooms.save();

        res.status(201).json(roomSchedule);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get all room schedules
const getRoomSchedules = async (req, res) => {
    try {
        const schedules = await Rooms.find()
            
        res.status(200).json(schedules);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get room schedules by date
const getRoomSchedulesByDate = async (req, res) => {
    const { date } = req.params;

    try {
        const schedules = await Rooms.find({
            startTime: { $gte: new Date(date), $lt: new Date(new Date(date).setDate(new Date(date).getDate() + 1)) }
        })
            .populate('roomId')
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

        if (status === 'completed') {
            const room = await Rooms.findById(schedule.roomId);
            room.status = 'available'; // Change room status back to 'available'
            await Rooms.save();
        }

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

        const room = await Rooms.findById(schedule.roomId);
        room.status = 'available'; // Change room status back to 'available'
        await Rooms.save();

        res.json({ message: 'Room schedule deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = { createRoomSchedule, getRoomSchedules, getRoomSchedulesByDate, updateRoomScheduleStatus, deleteRoomSchedule }