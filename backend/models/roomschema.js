// Room.js
const mongoose = require('mongoose');
const Practitioner = require('./Practitioner');

const roomSchema = new mongoose.Schema({
  roomNumber: { type: Number, required: true, unique: true },
  status: { type: String, enum : [ocuppied , available] , default: 'available' },  
  appointmentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Appointment' } ,
  Practitionerid: { type : mongoose.Schema.Types.ObjectId , ref : 'Practitioner'},
  patientid : { type : mongoose.Schema.Types.ObjectId , ref : 'patient'},
  startTime: { type: Date, required: true },
  endTime: { type: Date, required: true },
});

module.exports = mongoose.model('room', roomSchema);
