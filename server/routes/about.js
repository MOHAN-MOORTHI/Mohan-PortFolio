const express = require('express');
const router = express.Router();
const { getAbout, updateAbout } = require('../controllers/aboutController');
const auth = require('../middleware/auth');

// Get About Data (Public/Protected)
router.get('/', getAbout);

// Update About Data (Protected)
router.put('/', auth, updateAbout);

module.exports = router;
