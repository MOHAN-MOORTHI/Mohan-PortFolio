const multer = require('multer');
const path = require('path');
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
require('dotenv').config();

let upload;

// Check if Cloudinary credentials are provided
if (process.env.CLOUDINARY_CLOUD_NAME && process.env.CLOUDINARY_API_KEY && process.env.CLOUDINARY_API_SECRET) {
    cloudinary.config({
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_API_SECRET
    });

    const storage = new CloudinaryStorage({
        cloudinary: cloudinary,
        params: {
            folder: 'portfolio_uploads',
            allowed_formats: ['jpg', 'png', 'jpeg', 'webp', 'gif'],
        },
    });

    upload = multer({ storage: storage });
    console.log('Using Cloudinary Storage for uploads');
} else {
    // Fallback to Disk Storage (Local)
    // Note: Local storage will not persist on serverless platforms like Vercel
    const storage = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, path.join(__dirname, '../uploads/'));
        },
        filename: function (req, file, cb) {
            cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`);
        }
    });

    const fileFilter = (req, file, cb) => {
        const filetypes = /jpeg|jpg|png|webp|gif/;
        const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
        const mimetype = filetypes.test(file.mimetype);

        if (extname && mimetype) {
            cb(null, true);
        } else {
            cb(new Error('Images only (jpeg, jpg, png, webp, gif)!'), false);
        }
    };

    upload = multer({
        storage: storage,
        fileFilter: fileFilter,
        limits: { fileSize: 5 * 1024 * 1024 }
    });
    console.log('Using Local Disk Storage for uploads');
}

module.exports = upload;
