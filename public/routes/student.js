// routes/student.js
const express = require('express');
const router = express.Router();
const Student = require('../models/Student');
const multer = require('multer');

// Configure multer for profile picture upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  }
});
const upload = multer({ storage: storage });

// GET student dashboard
router.get('/', async (req, res) => {
  // In a real app, use authentication to get the student's id
  const student = await Student.findOne(); // example: fetch one student
  res.render('student', { student });
});

// POST route to update student profile (e.g., fullName, dob, etc.)
router.post('/update', upload.single('profilePic'), async (req, res) => {
  try {
    // Build update object from req.body and file upload (if exists)
    const updateData = { ...req.body };
    if (req.file) {
      updateData.profilePic = '/uploads/' + req.file.filename;
    }
    // Replace with actual student id after authentication
    await Student.findByIdAndUpdate(req.body.id, updateData);
    res.redirect('/student');
  } catch (error) {
    console.error(error);
    res.status(500).send('Update failed.');
  }
});

// POST route to add a subject
router.post('/subjects/add', async (req, res) => {
  try {
    const { id, subjectName, mark } = req.body;
    // Simple grading logic: grade A if mark between 90-100, adjust accordingly
    const grade = (mark >= 90 && mark <= 100) ? 'A' : 'B';
    await Student.findByIdAndUpdate(id, {
      $push: { subjects: { name: subjectName, mark, grade } }
    });
    res.redirect('/student');
  } catch (error) {
    console.error(error);
    res.status(500).send('Failed to add subject.');
  }
});

// POST route to delete a subject
router.post('/subjects/delete', async (req, res) => {
  try {
    const { id, subjectName } = req.body;
    await Student.findByIdAndUpdate(id, {
      $pull: { subjects: { name: subjectName } }
    });
    res.redirect('/student');
  } catch (error) {
    console.error(error);
    res.status(500).send('Failed to delete subject.');
  }
});

module.exports = router;
