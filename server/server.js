require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const compression = require('compression'); // Performance: Gzip compression
const path = require('path');
const { connectDB, getDbStatus } = require('./config/db');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(compression()); // Compress all responses
app.use(helmet({ contentSecurityPolicy: false })); // Allow external images (Cloudinary)
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files (uploaded images)
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// DB Connection
connectDB();

// Health/Status Check Route (For debugging Vercel deployment)
app.get('/api/status', (req, res) => {
    const dbStatus = getDbStatus();
    res.json({
        server: 'running',
        message: 'Backend is active',
        database: dbStatus,
        environment: {
            nodeEnv: process.env.NODE_ENV || 'development',
            hasMongoUri: !!process.env.MONGO_URI,
            hasJwtSecret: !!process.env.JWT_SECRET,
            hasCloudinary: !!process.env.CLOUDINARY_CLOUD_NAME
        },
        timestamp: new Date().toISOString()
    });
});

// Routes
const apiRoutes = require('./routes/api');
const authRoutes = require('./routes/auth');
const projectRoutes = require('./routes/projects');
const heroRoutes = require('./routes/hero');
const aboutRoutes = require('./routes/about');
const skillRoutes = require('./routes/skills');
const certificationRoutes = require('./routes/certifications');
const experienceRoutes = require('./routes/experience');
const contactRoutes = require('./routes/contact');
const uploadRoutes = require('./routes/upload');

// Serve static files from the React client build
app.use(express.static(path.join(__dirname, '../client/dist')));

// API Routes
app.use('/api', apiRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/hero', heroRoutes);
app.use('/api/about', aboutRoutes);
app.use('/api/skills', skillRoutes);
app.use('/api/certifications', certificationRoutes);
app.use('/api/experience', experienceRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/upload', uploadRoutes);

// Handle React routing, return all other requests to React app
app.get(/(.*)/, (req, res) => {
    res.sendFile(path.join(__dirname, '../client/dist/index.html'));
});

if (require.main === module) {
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
}

module.exports = app;
