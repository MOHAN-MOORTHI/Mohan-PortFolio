const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bcrypt = require('bcryptjs');
const User = require('./models/User');
const Project = require('./models/Project');
const Skill = require('./models/Skill');

dotenv.config();

const seedData = async () => {
    try {
        const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/portfolio';
        console.log('Attempting to connect to:', uri);
        await mongoose.connect(uri);
        console.log('MongoDB Connected for Seeding');

        // Clear existing data
        await User.deleteMany({});
        await Project.deleteMany({});
        await Skill.deleteMany({});

        // Create Admin User
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash('admin123', salt);

        const admin = new User({
            username: 'admin',
            password: hashedPassword // Manually hashing since we might bypass pre-save hook if using insertMany, but here we use simple object. 
            // Actually, if I create a new instance and save, the pre-save hook works. 
            // If I use 'new User', the pre-save hook in User.js will hash it again if I'm not careful.
            // The User.js pre-save hook checks if('password') is modified. 
            // Let's rely on the model for creation to be safe and simple.
        });

        // Actually, to avoid double hashing issues if I pass a raw password to a model with a pre-save hash hook:
        // The model expects a plain password and hashes it.
        await User.create({
            username: 'admin',
            password: 'admin123'
        });
        console.log('Admin User Created: admin / admin123');

        // Create Skills
        const skills = [
            { name: 'React', level: 90, category: 'Frontend', icon: 'FaReact' },
            { name: 'Node.js', level: 85, category: 'Backend', icon: 'FaNodeJs' },
            { name: 'MongoDB', level: 80, category: 'Backend', icon: 'SiMongodb' },
            { name: 'Three.js', level: 70, category: 'Frontend', icon: 'SiThree' },
            { name: 'Figma', level: 75, category: 'Tools', icon: 'FaFigma' },
        ];
        await Skill.insertMany(skills);
        console.log('Skills Seeded');

        // Create Projects
        const projects = [
            {
                title: 'Neon E-Commerce',
                description: 'A futuristic shopping experience with 3D product previews.',
                tags: ['React', 'Three.js', 'Stripe'],
                liveUrl: '#',
                githubUrl: '#',
                imageUrl: 'https://via.placeholder.com/400x300'
            },
            {
                title: 'AI Chat Dashboard',
                description: 'Real-time analytics and chat interface using WebSockets.',
                tags: ['MERN', 'Socket.io', 'Chart.js'],
                liveUrl: '#',
                githubUrl: '#',
                imageUrl: 'https://via.placeholder.com/400x300'
            }
        ];
        await Project.insertMany(projects);
        console.log('Projects Seeded');

        // Create Experience
        const Experience = require('./models/Experience');
        await Experience.deleteMany({});
        const experiences = [
            {
                role: "Senior Full Stack Developer",
                company: "TechNova Systems",
                duration: "2022 - Present",
                description: "Leading a team of 5 developers to build scalable MERN stack solutions. Implemented microservices architecture reducing server costs by 30%."
            },
            {
                role: "Frontend Developer",
                company: "Creative Pixels",
                duration: "2020 - 2022",
                description: "Developed interactive 3D web experiences using Three.js and React. Collaborated with designers to deliver award-winning websites."
            }
        ];
        await Experience.insertMany(experiences);
        console.log('Experience Seeded');

        // Create Certifications
        const Certification = require('./models/Certification');
        await Certification.deleteMany({});
        const certifications = [
            {
                name: "Meta Frontend Developer Professional Certificate",
                issuer: "Meta (Coursera)",
                date: "Nov 2023",
                description: "Advanced proficiency in React, JavaScript, and UI/UX design principles.",
                link: "https://www.coursera.org/professional-certificates/meta-front-end-developer"
            },
            {
                name: "AWS Certified Cloud Practitioner",
                issuer: "Amazon Web Services",
                date: "Aug 2023",
                description: "Foundational knowledge of AWS Cloud concepts, security, and billing.",
                link: "https://aws.amazon.com/certification/certified-cloud-practitioner/"
            }
        ];
        await Certification.insertMany(certifications);
        console.log('Certifications Seeded');

        process.exit();
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

seedData();
