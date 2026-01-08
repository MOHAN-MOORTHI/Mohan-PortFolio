const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String, required: true }, // Path to image
    technologies: [{ type: String }],
    liveLink: { type: String },
    repoLink: { type: String },
    category: { type: String, default: 'Web' },
    featured: { type: Boolean, default: false },
}, { timestamps: true });

module.exports = mongoose.model('Project', projectSchema);
