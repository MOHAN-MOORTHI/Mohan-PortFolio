const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

const fileUpload = require('express-fileupload');
const path = require('path');

const helmet = require('helmet');
const compression = require('compression');

// --- Middleware Configuration ---

// Security headers
app.use(helmet());

// Gzip compression for performance
app.use(compression());

// Cross-Origin Resource Sharing
app.use(cors());

// Parse JSON bodies
app.use(express.json());

// Handle file uploads
app.use(fileUpload());

// Serve uploaded files statically
app.use('/api/uploads', express.static(path.join(__dirname, 'uploads')));

// --- Database Connection ---
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/portfolio')
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

// --- Routes ---
const apiRoutes = require('./routes/api');
app.use('/api', apiRoutes);

// Health check endpoint
app.get('/', (req, res) => {
  res.send('Portfolio API is running');
});

// Export app for Vercel (serverless environment)
module.exports = app;

// Only listen if not imported (running locally)
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}
