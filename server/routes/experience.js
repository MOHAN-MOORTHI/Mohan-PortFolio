const express = require('express');
const router = express.Router();
const { getExperience, addExperience, updateExperience, deleteExperience } = require('../controllers/experienceController');
const auth = require('../middleware/auth');

// Get all experience (Public)
router.get('/', getExperience);

// Add experience (Protected)
router.post('/', auth, addExperience);

// Update experience (Protected)
router.put('/:id', auth, updateExperience);

// Delete experience (Protected)
router.delete('/:id', auth, deleteExperience);

module.exports = router;
