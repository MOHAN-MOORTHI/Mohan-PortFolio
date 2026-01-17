const About = require('../models/About');

exports.getAbout = async (req, res) => {
    try {
        let about = await About.findOne();
        if (!about) {
            about = new About();
            await about.save();
        }
        res.json(about);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.updateAbout = async (req, res) => {
    try {
        let about = await About.findOne();
        if (!about) {
            about = new About(req.body);
        } else {
            about.image = req.body.image || about.image;
            about.description1 = req.body.description1 || about.description1;
            about.description2 = req.body.description2 || about.description2;
            if (req.body.socialLinks) {
                about.socialLinks = { ...about.socialLinks, ...req.body.socialLinks };
            }
        }
        await about.save();
        res.json(about);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
