const mongoose = require('mongoose');

const AboutSchema = new mongoose.Schema({
    imageUrl: { type: String, default: '' },
    resumeUrl: { type: String, default: '' },
    bio: { type: String, required: true },
    github: { type: String, default: '' },
    linkedin: { type: String, default: '' },
    twitter: { type: String, default: '' },
    whatsapp: { type: String, default: '' },
    facebook: { type: String, default: '' },
    mobile: { type: String, default: '' },
    email: { type: String, default: '' },
    contactBtnText: { type: String, default: 'Contact Me' },
    viewProjectsBtnText: { type: String, default: 'View Projects' },
    heroHeadline: { type: String, default: "Hi, I'm Mohan" },
    heroSubHeadline: { type: String, default: "Full Stack Developer" },
    heroDescription: { type: String, default: "Building futuristic, scalable, and responsive web applications with the MERN stack." }
});

module.exports = mongoose.model('About', AboutSchema);
