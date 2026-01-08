const mongoose = require('mongoose');

const heroSchema = new mongoose.Schema({
    title: { type: String, default: 'Mohan Portfolio' },
    subtitle: { type: String, default: 'MERN Stack Developer | UI/UX Enthusiast' },
    ctaText: { type: String, default: 'View Projects' },
}, { timestamps: true });

module.exports = mongoose.model('Hero', heroSchema);
