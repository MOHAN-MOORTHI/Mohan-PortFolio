const express = require('express');
const router = express.Router();
const { submitContact, getMessages, deleteMessage } = require('../controllers/contactController');
const auth = require('../middleware/auth');

// Submit a contact form (Public)
router.post('/', submitContact);

// Get all messages (Protected)
router.get('/', auth, getMessages);

// Delete a message (Protected)
router.delete('/:id', auth, deleteMessage);

module.exports = router;
