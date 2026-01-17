exports.uploadImage = (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: 'No file uploaded' });
        }

        let imagePath;
        // Check if file path is a remote URL (Cloudinary) or local path
        if (req.file.path && (req.file.path.startsWith('http') || req.file.path.startsWith('https'))) {
            imagePath = req.file.path;
        } else {
            // Local path - relative to server
            imagePath = `/uploads/${req.file.filename}`;
        }

        res.json({ imagePath });
    } catch (err) {
        console.error('Upload Error:', err);
        res.status(500).json({ message: err.message });
    }
};
