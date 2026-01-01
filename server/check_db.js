const mongoose = require('mongoose');
const Project = require('./models/Project');
const Skill = require('./models/Skill');
require('dotenv').config();

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/portfolio')
    .then(async () => {
        console.log('Connected to DB');
        const projects = await Project.find();
        console.log('Projects count:', projects.length);
        console.log('Projects:', projects);

        const skills = await Skill.find();
        console.log('Skills count:', skills.length);
        console.log('Skills:', skills);

        process.exit();
    })
    .catch(err => {
        console.error(err);
        process.exit(1);
    });
