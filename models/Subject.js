// models/Subject.js
const mongoose = require('mongoose');

const subjectSchema = new mongoose.Schema({
  name: { type: String, required: true },
  mark: { type: Number, required: true },
  grade: { type: String, required: true }
});

module.exports = mongoose.model('Subject', subjectSchema);
