const Room = require('../models/roomschema');
const Schedule = require('../models/scheduleschema');
const Appointment = require('../models/appointment');
const Practitioner = require('../models/Practitioner');

// Initialize rooms if they don't exist
const initializeRooms = async () => {
  try {
    const count = await Room.countDocuments();
    if (count === 0) {
      const rooms = Array.from({ length: 10 }, (_, i) => ({
        roomNumber: i + 1,
        status: 'available',
        isAvailable: true,
        equipment: [
          { name: 'Cupping Set', quantity: 2, status: 'available' },
          { name: 'Massage Table', quantity: 1, status: 'available' },
          { name: 'Sterilization Kit', quantity: 1, status: 'available' }
        ],
        capacity: 1,
        description: `Treatment Room ${i + 1}`
      }));
      await Room.insertMany(rooms);
    }
  } catch (error) {
    console.error('Error initializing rooms:', error);
  }
};

// Get all rooms with their current status
const getAllRooms = async (req, res) => {
  try {
    const rooms = await Room.find();
    
    // Get current schedules for each room
    const currentDate = new Date();
    const schedules = await Schedule.find({
      date: {
        $eq: new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate())
      },
      status: { $in: ['scheduled', 'in-progress'] }
    })
    .populate('appointment')
    .populate('practitioner')
    .populate('patient');

    // Combine room info with current schedule
    const roomsWithSchedule = rooms.map(room => {
      const currentSchedule = schedules.find(s => 
        s.room.toString() === room._id.toString() &&
        isTimeInRange(currentDate, s.startTime, s.endTime)
      );

      return {
        ...room.toObject(),
        currentAppointment: currentSchedule?.appointment || null,
        currentPractitioner: currentSchedule?.practitioner || null,
        currentPatient: currentSchedule?.patient || null
      };
    });

    res.status(200).json(roomsWithSchedule);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get available rooms for a specific time slot
const getAvailableRooms = async (req, res) => {
  try {
    const { date, startTime, endTime } = req.query;
    const rooms = await Room.find({ status: { $ne: 'maintenance' } });
    
    // Check each room's availability
    const availableRooms = [];
    for (const room of rooms) {
      const isAvailable = await Schedule.isRoomAvailable(
        room._id,
        date,
        startTime,
        endTime
      );
      if (isAvailable) {
        availableRooms.push(room);
      }
    }

    res.status(200).json(availableRooms);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get room schedule for a specific date range
const getRoomSchedule = async (req, res) => {
  try {
    const { roomNumber, startDate, endDate } = req.query;
    
    const room = await Room.findOne({ roomNumber });
    if (!room) {
      return res.status(404).json({ error: 'Room not found' });
    }

    const schedule = await Schedule.getRoomSchedule(room._id, startDate, endDate);
    res.status(200).json(schedule);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Create a new schedule for a room
const createSchedule = async (req, res) => {
  try {
    const { roomNumber } = req.params;
    const { appointmentId, practitionerId, patientId, date, startTime, endTime, equipmentUsed } = req.body;

    const room = await Room.findOne({ roomNumber });
    if (!room) {
      return res.status(404).json({ error: 'Room not found' });
    }

    // Check room availability
    const isAvailable = await Schedule.isRoomAvailable(room._id, date, startTime, endTime);
    if (!isAvailable) {
      return res.status(400).json({ error: 'Room is not available for this time slot' });
    }

    // Create new schedule
    const schedule = new Schedule({
      room: room._id,
      appointment: appointmentId,
      practitioner: practitionerId,
      patient: patientId,
      date,
      startTime,
      endTime,
      equipmentUsed
    });

    await schedule.save();

    // Update room status if it's a current booking
    const currentDate = new Date();
    if (isTimeInRange(currentDate, startTime, endTime)) {
      room.status = 'occupied';
      room.isAvailable = false;
      await room.save();
    }

    res.status(201).json(schedule);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Mark room for maintenance
const setRoomMaintenance = async (req, res) => {
  try {
    const { roomNumber } = req.params;
    const { maintenanceStatus } = req.body;

    const room = await Room.findOne({ roomNumber });
    if (!room) {
      return res.status(404).json({ error: 'Room not found' });
    }

    room.status = maintenanceStatus ? 'maintenance' : 'available';
    room.isAvailable = !maintenanceStatus;
    await room.save();

    res.status(200).json({
      message: `Room ${maintenanceStatus ? 'marked for maintenance' : 'marked as available'}`,
      room
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Helper function to check if current time is within a time range
const isTimeInRange = (currentDate, startTime, endTime) => {
  const [startHour, startMinute] = startTime.split(':').map(Number);
  const [endHour, endMinute] = endTime.split(':').map(Number);
  const currentHour = currentDate.getHours();
  const currentMinute = currentDate.getMinutes();

  const start = startHour * 60 + startMinute;
  const end = endHour * 60 + endMinute;
  const current = currentHour * 60 + currentMinute;

  return current >= start && current < end;
};

// Get room appointment history
const getRoomHistory = async (req, res) => {
  try {
    const { roomNumber } = req.params;
    const { startDate, endDate } = req.query;
    
    const room = await Room.findOne({ roomNumber });
    if (!room) {
      return res.status(404).json({ error: 'Room not found' });
    }

    // Find all completed schedules for this room
    const history = await Schedule.find({
      room: room._id,
      status: 'completed',
      date: {
        $gte: startDate ? new Date(startDate) : new Date(new Date().setMonth(new Date().getMonth() - 6)), // Default to last 6 months
        $lte: endDate ? new Date(endDate) : new Date()
      }
    })
    .populate({
      path: 'appointment',
      select: 'services notes'
    })
    .populate({
      path: 'practitioner',
      select: 'name specialization'
    })
    .populate({
      path: 'patient',
      select: 'name email phoneNumber'
    })
    .sort({ date: -1, startTime: -1 }); // Most recent first

    // Format the history data
    const formattedHistory = history.map(record => ({
      date: record.date,
      time: `${record.startTime} - ${record.endTime}`,
      patient: {
        name: record.patient?.name || 'N/A',
        email: record.patient?.email,
        phone: record.patient?.phoneNumber
      },
      practitioner: {
        name: record.practitioner?.name || 'N/A',
        specialization: record.practitioner?.specialization
      },
      appointment: {
        services: record.appointment?.services || [],
        notes: record.appointment?.notes || ''
      },
      equipmentUsed: record.equipmentUsed || [],
      notes: record.notes,
      status: record.status
    }));

    // Get summary statistics
    const stats = {
      totalAppointments: history.length,
      uniquePatients: new Set(history.map(h => h.patient?._id.toString())).size,
      uniquePractitioners: new Set(history.map(h => h.practitioner?._id.toString())).size,
      commonServices: getCommonServices(history),
      equipmentUsage: getEquipmentUsageStats(history)
    };

    res.status(200).json({
      roomInfo: {
        roomNumber: room.roomNumber,
        description: room.description,
        equipment: room.equipment
      },
      history: formattedHistory,
      statistics: stats
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Helper function to get most common services
const getCommonServices = (history) => {
  const serviceCount = {};
  history.forEach(record => {
    record.appointment?.services?.forEach(service => {
      serviceCount[service] = (serviceCount[service] || 0) + 1;
    });
  });
  
  return Object.entries(serviceCount)
    .sort(([,a], [,b]) => b - a)
    .reduce((acc, [service, count]) => {
      acc[service] = count;
      return acc;
    }, {});
};

// Helper function to get equipment usage statistics
const getEquipmentUsageStats = (history) => {
  const equipmentUsage = {};
  history.forEach(record => {
    record.equipmentUsed?.forEach(equipment => {
      if (!equipmentUsage[equipment.name]) {
        equipmentUsage[equipment.name] = {
          timesUsed: 0,
          totalQuantityUsed: 0
        };
      }
      equipmentUsage[equipment.name].timesUsed++;
      equipmentUsage[equipment.name].totalQuantityUsed += equipment.quantity || 0;
    });
  });
  return equipmentUsage;
};

module.exports = {
  initializeRooms,
  getAllRooms,
  getAvailableRooms,
  getRoomSchedule,
  createSchedule,
  setRoomMaintenance,
  getRoomHistory
};