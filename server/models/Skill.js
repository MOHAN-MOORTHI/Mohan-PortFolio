const mongoose = require('mongoose');

const skillSchema = new mongoose.Schema({
    name: { type: String, required: true },
    icon: { type: String }, // Icon class or URL
    level: { type: Number, default: 0 }, // 0-100
    category: { type: String }, // Frontend, Backend, Tools
}, { timestamps: true });

module.exports = mongoose.model('Skill', skillSchema);
