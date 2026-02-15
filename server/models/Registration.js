const mongoose = require('mongoose');

const registrationSchema = new mongoose.Schema({
    eventId: { type: mongoose.Schema.Types.ObjectId, ref: 'Event', required: true },
    studentId: { type: String, required: true }, // Mock student ID for now
    status: { type: String, enum: ['CONFIRMED', 'WAITLISTED'], default: 'CONFIRMED' },
    timestamp: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Registration', registrationSchema);
