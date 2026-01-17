const Certification = require('../models/Certification');

exports.getCertifications = async (req, res) => {
    try {
        const certifications = await Certification.find().sort({ date: -1 });
        res.json(certifications);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.addCertification = async (req, res) => {
    const certification = new Certification({
        title: req.body.title,
        issuer: req.body.issuer,
        date: req.body.date,
        link: req.body.link,
        image: req.body.image
    });

    try {
        const newCertification = await certification.save();
        res.status(201).json(newCertification);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

exports.deleteCertification = async (req, res) => {
    try {
        const cert = await Certification.findById(req.params.id);
        if (!cert) return res.status(404).json({ message: 'Certification not found' });

        await cert.deleteOne();
        res.json({ message: 'Certification deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
