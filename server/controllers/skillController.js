const Skill = require('../models/Skill');

exports.getSkills = async (req, res) => {
    try {
        const skills = await Skill.find();
        res.json(skills);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.addSkill = async (req, res) => {
    const skill = new Skill({
        name: req.body.name,
        icon: req.body.icon,
        category: req.body.category,
        level: req.body.level
    });

    try {
        const newSkill = await skill.save();
        res.status(201).json(newSkill);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

exports.deleteSkill = async (req, res) => {
    try {
        const skill = await Skill.findById(req.params.id);
        if (!skill) return res.status(404).json({ message: 'Skill not found' });

        await skill.deleteOne();
        res.json({ message: 'Skill deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
