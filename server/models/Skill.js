const mongoose = require('mongoose');

const SkillSchema = new mongoose.Schema({
    name: { type: String, required: true },
    level: { type: Number, min: 1, max: 100 }, // Percentage
    icon: { type: String }, // URL or icon class name
    category: { type: String, enum: ['Frontend', 'Backend', 'Tools', 'Other'], default: 'Other' },
});

module.exports = mongoose.model('Skill', SkillSchema);
