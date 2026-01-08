const express = require('express');
const router = express.Router();
const { getProjects, createProject, updateProject, deleteProject } = require('../controllers/projectController');
const auth = require('../middleware/auth');

// Public
router.get('/', getProjects);

// Protected (Admin only)
router.post('/', auth, createProject);
router.put('/:id', auth, updateProject);
router.delete('/:id', auth, deleteProject);

module.exports = router;
