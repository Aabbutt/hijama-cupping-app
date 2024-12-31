const mongoose = require('mongoose');

const scheduleSchema = new mongoose.Schema({
  room: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Room',
    required: true
  },
  appointment: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'appointment',
    required: true
  },
  practitioner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'practitioner',
    required: true
  },
  patient: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  startTime: {
    type: String,
    required: true
  },
  endTime: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ['scheduled', 'in-progress', 'completed', 'cancelled'],
    default: 'scheduled'
  },
  equipmentUsed: [{
    name: String,
    quantity: Number
  }],
  notes: {
    type: String,
    default: ''
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Add method to check room availability
scheduleSchema.statics.isRoomAvailable = async function(roomId, date, startTime, endTime) {
  const existingSchedule = await this.findOne({
    room: roomId,
    date: new Date(date),
    status: { $ne: 'cancelled' },
    $or: [
      {
        startTime: { $lt: endTime },
        endTime: { $gt: startTime }
      }
    ]
  });
  
  return !existingSchedule;
};

// Add method to get room schedule for a date range
scheduleSchema.statics.getRoomSchedule = async function(roomId, startDate, endDate) {
  return this.find({
    room: roomId,
    date: {
      $gte: new Date(startDate),
      $lte: new Date(endDate)
    }
  })
  .populate('appointment')
  .populate('practitioner')
  .populate('patient')
  .sort('date startTime');
};

// Update timestamps on save
scheduleSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

const Schedule = mongoose.model('Schedule', scheduleSchema);

module.exports = Schedule; 