const express = require('express');
const router = express.Router();
const Contact = require('../models/Contact');
const auth = require('../middleware/auth');
const nodemailer = require('nodemailer');

// Submit a contact form (Public)
router.post('/', async (req, res) => {
    const { name, email, subject, message } = req.body;

    // Validate
    if (!name || !email || !message) {
        return res.status(400).json({ message: 'Please fill in all fields' });
    }

    try {
        // Save to DB
        const newContact = new Contact({ name, email, subject, message });
        await newContact.save();

        // Send email notification
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        });

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: process.env.EMAIL_USER, // Send to yourself
            subject: `Portfolio Contact: ${subject}`,
            text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
            html: `<h3>New Message from Portfolio</h3>
                   <p><strong>Name:</strong> ${name}</p>
                   <p><strong>Email:</strong> ${email}</p>
                   <p><strong>Subject:</strong> ${subject}</p>
                   <br/>
                   <p><strong>Message:</strong></p>
                   <p>${message.replace(/\n/g, '<br>')}</p>`
        };

        try {
            await transporter.sendMail(mailOptions);
        } catch (emailErr) {
            console.error('Email sending failed:', emailErr);
            // Continue execution, don't fail the request just because email failed
        }

        res.status(201).json({ message: 'Message sent successfully' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Get all messages (Protected)
router.get('/', auth, async (req, res) => {
    try {
        const messages = await Contact.find().sort({ createdAt: -1 });
        res.json(messages);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Delete a message (Protected)
router.delete('/:id', auth, async (req, res) => {
    try {
        const msg = await Contact.findById(req.params.id);
        if (!msg) return res.status(404).json({ message: 'Message not found' });

        await msg.deleteOne();
        res.json({ message: 'Message deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
