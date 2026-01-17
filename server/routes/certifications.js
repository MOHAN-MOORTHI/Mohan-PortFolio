const express = require('express');
const router = express.Router();
const { getCertifications, addCertification, deleteCertification } = require('../controllers/certificationController');
const auth = require('../middleware/auth');

// Get all certifications (Public)
router.get('/', getCertifications);

// Add a certification (Protected)
router.post('/', auth, addCertification);

// Delete a certification (Protected)
router.delete('/:id', auth, deleteCertification);

module.exports = router;
