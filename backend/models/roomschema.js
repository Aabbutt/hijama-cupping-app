// Room.js
const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema({
  roomNumber: { 
    type: Number, 
    required: true, 
    unique: true,
    min: 1,
    max: 10
  },
  isAvailable: {
    type: Boolean,
    default: true
  },
  status: { 
    type: String, 
    enum: ['available', 'occupied', 'maintenance'], 
    default: 'available' 
  },
  equipment: [{
    name: String,
    quantity: Number,
    status: {
      type: String,
      enum: ['available', 'in-use', 'maintenance'],
      default: 'available'
    }
  }],
  capacity: {
    type: Number,
    default: 1
  },
  description: {
    type: String,
    default: ''
  }
});

const Room = mongoose.model('Room', roomSchema);

module.exports = Room;
