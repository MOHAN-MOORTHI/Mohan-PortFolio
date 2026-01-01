const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Project = require('../models/Project');
const Skill = require('../models/Skill');

// Middleware to verify token
const auth = (req, res, next) => {
    const token = req.header('x-auth-token');
    if (!token) return res.status(401).json({ msg: 'No token, authorization denied' });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (e) {
        res.status(400).json({ msg: 'Token is not valid' });
    }
};

// --- AUTH ROUTES ---

// Login
router.post('/auth/login', async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await User.findOne({ username });
        if (!user) return res.status(400).json({ msg: 'User does not exist' });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ msg: 'Invalid credentials' });

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({ token, user: { id: user._id, username: user.username } });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Register (One-time setup or protected)
router.post('/auth/register', async (req, res) => {
    const { username, password } = req.body;
    try {
        // Check if any user exists to prevent public registration of multiple admins
        const existingUser = await User.findOne();
        if (existingUser) return res.status(403).json({ msg: 'Admin already exists' });

        const newUser = new User({ username, password });
        await newUser.save();

        const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({ token, user: { id: newUser._id, username: newUser.username } });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// --- PROJECT ROUTES ---

router.get('/projects', async (req, res) => {
    try {
        const projects = await Project.find().sort({ createdAt: -1 });
        res.json(projects);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.post('/projects', auth, async (req, res) => {
    try {
        const newProject = new Project(req.body);
        const savedProject = await newProject.save();
        res.json(savedProject);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.put('/projects/:id', auth, async (req, res) => {
    try {
        const updatedProject = await Project.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updatedProject);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.delete('/projects/:id', auth, async (req, res) => {
    try {
        await Project.findByIdAndDelete(req.params.id);
        res.json({ msg: 'Project deleted' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// --- SKILL ROUTES ---

router.get('/skills', async (req, res) => {
    try {
        const skills = await Skill.find();
        res.json(skills);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.post('/skills', auth, async (req, res) => {
    try {
        const newSkill = new Skill(req.body);
        const savedSkill = await newSkill.save();
        res.json(savedSkill);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.delete('/skills/:id', auth, async (req, res) => {
    try {
        await Skill.findByIdAndDelete(req.params.id);
        res.json({ msg: 'Skill deleted' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// --- CONTACT / EMAIL ROUTE ---
// Using Nodemailer or just saving to DB (Implementation choice: Save to DB + send response)
// Ideally integrate SendGrid/Nodemailer here
const Contact = require('../models/Contact');

router.post('/contact', async (req, res) => {
    try {
        const newContact = new Contact(req.body);
        await newContact.save();
        res.json({ msg: 'Message sent successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.get('/contact', auth, async (req, res) => {
    try {
        const messages = await Contact.find().sort({ date: -1 });
        res.json(messages);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.delete('/contact/:id', auth, async (req, res) => {
    try {
        await Contact.findByIdAndDelete(req.params.id);
        res.json({ msg: 'Message deleted' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// --- ABOUT ROUTE ---
const About = require('../models/About');
const Experience = require('../models/Experience');

router.get('/about', async (req, res) => {
    try {
        const about = await About.findOne();
        res.json(about || { bio: '', imageUrl: '', resumeUrl: '' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.post('/about', auth, async (req, res) => {
    try {
        // Upsert: update if exists, otherwise create
        let about = await About.findOne();
        if (about) {
            about.bio = req.body.bio;
            about.imageUrl = req.body.imageUrl;
            about.resumeUrl = req.body.resumeUrl;
            await about.save();
        } else {
            about = new About(req.body);
            await about.save();
        }
        res.json(about);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// --- EXPERIENCE ROUTES ---
router.get('/experience', async (req, res) => {
    try {
        const experiences = await Experience.find().sort({ createdAt: -1 });
        res.json(experiences);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.post('/experience', auth, async (req, res) => {
    try {
        const newExp = new Experience(req.body);
        const savedExp = await newExp.save();
        res.json(savedExp);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.delete('/experience/:id', auth, async (req, res) => {
    try {
        await Experience.findByIdAndDelete(req.params.id);
        res.json({ msg: 'Experience deleted' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
