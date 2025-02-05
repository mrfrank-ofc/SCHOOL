// models/Student.js
const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  dob: Date,
  sex: String,
  address: String,
  email: String,
  contact: String,
  allergies: String,
  class: String,
  combination: String,
  profilePic: String, // URL or file path to the image
  subjects: [{
    name: String,
    mark: Number,
    grade: String
  }],
  progress: String
});

module.exports = mongoose.model('Student', studentSchema);
