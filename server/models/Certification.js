const mongoose = require('mongoose');

const CertificationSchema = new mongoose.Schema({
    name: { type: String, required: true },
    issuer: { type: String, required: true },
    date: { type: String, required: true }, // e.g., "Dec 2023"
    link: { type: String, default: '' },
    description: { type: String, default: '' },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Certification', CertificationSchema);
