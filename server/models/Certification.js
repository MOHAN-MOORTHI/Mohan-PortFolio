const mongoose = require('mongoose');

const certificationSchema = new mongoose.Schema({
    title: { type: String, required: true },
    issuer: { type: String, required: true },
    date: { type: Date },
    link: { type: String },
    image: { type: String } // Optional logo/badge
}, { timestamps: true });

module.exports = mongoose.model('Certification', certificationSchema);
