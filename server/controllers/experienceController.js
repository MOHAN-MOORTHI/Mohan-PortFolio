const Experience = require('../models/Experience');

exports.getExperience = async (req, res) => {
    try {
        const experience = await Experience.find().sort({ startDate: -1 });
        res.json(experience);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.addExperience = async (req, res) => {
    const experience = new Experience({
        company: req.body.company,
        role: req.body.role,
        startDate: req.body.startDate,
        endDate: req.body.endDate,
        description: req.body.description
    });

    try {
        const newExperience = await experience.save();
        res.status(201).json(newExperience);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

exports.updateExperience = async (req, res) => {
    try {
        const experience = await Experience.findById(req.params.id);
        if (!experience) return res.status(404).json({ message: 'Experience not found' });

        if (req.body.company) experience.company = req.body.company;
        if (req.body.role) experience.role = req.body.role;
        if (req.body.startDate) experience.startDate = req.body.startDate;
        if (req.body.endDate !== undefined) experience.endDate = req.body.endDate;
        if (req.body.description) experience.description = req.body.description;

        const updatedExperience = await experience.save();
        res.json(updatedExperience);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.deleteExperience = async (req, res) => {
    try {
        const experience = await Experience.findById(req.params.id);
        if (!experience) return res.status(404).json({ message: 'Experience not found' });

        await experience.deleteOne();
        res.json({ message: 'Experience deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
