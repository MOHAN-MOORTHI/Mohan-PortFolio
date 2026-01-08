const mongoose = require('mongoose');

const aboutSchema = new mongoose.Schema({
    image: { type: String, default: 'https://placehold.co/400x400/1e293b/white?text=Profile' },
    description1: { type: String, default: 'I am a passionate Full Stack Developer specializing in the MERN stack. I love building scalable, responsive, and aesthetically pleasing web applications.' },
    description2: { type: String, default: 'With experience in modern web technologies like React 19, Tailwind v4, and Three.js, I bring ideas to life with code.' },
    socialLinks: {
        github: { type: String, default: '#' },
        linkedin: { type: String, default: '#' },
        twitter: { type: String, default: '#' },
        instagram: { type: String, default: '#' },
        whatsapp: { type: String, default: '#' }
    }
}, { timestamps: true });

module.exports = mongoose.model('About', aboutSchema);
