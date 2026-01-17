const express = require('express');
const router = express.Router();
const { getSkills, addSkill, deleteSkill } = require('../controllers/skillController');
const auth = require('../middleware/auth');

// Get all skills (Public)
router.get('/', getSkills);

// Add a skill (Protected)
router.post('/', auth, addSkill);

// Delete a skill (Protected)
router.delete('/:id', auth, deleteSkill);

module.exports = router;
