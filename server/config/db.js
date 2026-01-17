const mongoose = require('mongoose');

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

const getDbStatus = () => {
    return {
        connected: isDbConnected,
        readyState: mongoose.connection.readyState // 0: disconnected, 1: connected, 2: connecting, 3: disconnecting
    }
}

module.exports = { connectDB, getDbStatus };
