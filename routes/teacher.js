// routes/teacher.js
const express = require('express');
const router = express.Router();
const Student = require('../models/Student');

// GET teacher dashboard with list of students
router.get('/', async (req, res) => {
  const students = await Student.find();
  res.render('teacher', { students });
});

// POST route to update marks for a student subject
router.post('/update-marks', async (req, res) => {
  try {
    const { studentId, subjectName, mark } = req.body;
    // Simple grading: A if mark between 90-100; you can expand this logic.
    const grade = (mark >= 90 && mark <= 100) ? 'A' : 'B';
    await Student.updateOne(
      { _id: studentId, "subjects.name": subjectName },
      { $set: { "subjects.$.mark": mark, "subjects.$.grade": grade } }
    );
    res.redirect('/teacher');
  } catch (error) {
    console.error(error);
    res.status(500).send('Failed to update marks.');
  }
});

// POST route to delete a student
router.post('/delete-student', async (req, res) => {
  try {
    const { studentId } = req.body;
    await Student.findByIdAndDelete(studentId);
    res.redirect('/teacher');
  } catch (error) {
    console.error(error);
    res.status(500).send('Failed to delete student.');
  }
});

// POST route to mark attendance (for simplicity, attendance can be stored in the student document)
router.post('/attendance', async (req, res) => {
  try {
    const { studentId, day } = req.body; // day should be one of Monday, Tuesday, etc.
    // You can extend the Student model with an attendance field (e.g., an object with day flags)
    // Example: { attendance: { Monday: true, Tuesday: false, ... } }
    await Student.findByIdAndUpdate(studentId, {
      $set: { [`attendance.${day}`]: true }
    });
    res.redirect('/teacher');
  } catch (error) {
    console.error(error);
    res.status(500).send('Failed to update attendance.');
  }
});

module.exports = router;
