const express = require('express');
const router = express.Router();
const { getAllData } = require('../controllers/dataController');

// Get all data (Public)
router.get('/data', getAllData);

module.exports = router;
