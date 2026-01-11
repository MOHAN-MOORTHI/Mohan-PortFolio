require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const compression = require('compression'); // Performance: Gzip compression
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(compression()); // Compress all responses
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files (uploaded images)
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// DB Connection
// DB Connection State
let isDbConnected = false;

const connectDB = async () => {
  try {
    const isProduction = process.env.NODE_ENV === 'production';
    const hasMongoUri = !!process.env.MONGO_URI;

    if (isProduction && !hasMongoUri) {
      console.warn('⚠️ SKIPPING DB CONNECTION: MONGO_URI is missing in Vercel/Production.');
      console.warn('Please add MONGO_URI to Vercel Environment Variables.');
      return; // Stop here. Do not try localhost.
    }

    const uri = process.env.MONGO_URI || 'mongodb://localhost:27017/portfolio_db';

    await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 5000 // Fail fast if connection hangs
    });

    isDbConnected = true;
    console.log('MongoDB Connected');
  } catch (err) {
    console.error('MongoDB Connection Error:', err);
    isDbConnected = false;
    // Do NOT process.exit(1) in serverless environments
  }
};
connectDB();

// Health/Status Check Route (For debugging Vercel deployment)
app.get('/api/status', (req, res) => {
  res.json({
    server: 'running',
    message: 'Backend is active',
    database: {
      connected: isDbConnected,
      readyState: mongoose.connection.readyState // 0: disconnected, 1: connected, 2: connecting, 3: disconnecting
    },
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
