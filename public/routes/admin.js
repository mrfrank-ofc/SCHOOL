// routes/admin.js
const express = require('express');
const router = express.Router();

// This page can be expanded to include any administrative controls.
// For example: adding new teachers, managing subjects, or global school settings.
router.get('/', (req, res) => {
  res.render('admin');
});

module.exports = router;
