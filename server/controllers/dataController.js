const Project = require('../models/Project');
const Skill = require('../models/Skill');
const Experience = require('../models/Experience');
const Certification = require('../models/Certification');
const Hero = require('../models/Hero');
const About = require('../models/About');

exports.getAllData = async (req, res) => {
    try {
        const projects = await Project.find();
        const skills = await Skill.find();
        const experience = await Experience.find();
        const certifications = await Certification.find();
        const hero = await Hero.findOne();
        const about = await About.findOne();
        res.json({ projects, skills, experience, certifications, hero, about });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
