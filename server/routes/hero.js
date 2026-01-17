const express = require('express');
const router = express.Router();
const { getHero, updateHero } = require('../controllers/heroController');
const auth = require('../middleware/auth');

// Get Hero Data
router.get('/', getHero);

// Update Hero Data (Protected)
router.put('/', auth, updateHero);

module.exports = router;
