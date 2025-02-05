// routes/admin.js
const express = require('express');
const router = express.Router();

// Basic admin route to render the admin view
router.get('/', (req, res) => {
  res.render('admin');
});

module.exports = router;
