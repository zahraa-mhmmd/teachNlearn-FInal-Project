const mongoose = require('mongoose');

const sessionSchema = new mongoose.Schema({
  startTime: { type: Date, required: false },
  endTime: { type: Date, required: false },
  teacher: { type: mongoose.Schema.Types.ObjectId, required: true },
  student: { type: mongoose.Schema.Types.ObjectId, required: true },
  status: {
    type: String,
    lowercase: true,
    enum: ['accepted', 'pending', 'declined'],
    required: true,
    default: 'pending',
  },
  createDate: {
    type: Date,
    default: Date.now,
  },
});

const Session = mongoose.model('Session', sessionSchema);
module.exports = Session;
