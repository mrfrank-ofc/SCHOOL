// models/Teacher.js
const mongoose = require('mongoose');

const teacherSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  email: String,
  subject: String,
  // additional teacher fields as required
});

module.exports = mongoose.model('Teacher', teacherSchema);
