const mongoose = require('mongoose');

const AboutSchema = new mongoose.Schema({
    imageUrl: { type: String, default: '' },
    resumeUrl: { type: String, default: '' },
    bio: { type: String, required: true },
});

module.exports = mongoose.model('About', AboutSchema);
