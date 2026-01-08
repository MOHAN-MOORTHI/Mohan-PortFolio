const express = require('express');
const router = express.Router();
const Hero = require('../models/Hero');
const auth = require('../middleware/auth');

// Get Hero Data (Protected or Public depending on need, but mostly public via /api/data)
router.get('/', async (req, res) => {
    try {
        let hero = await Hero.findOne();
        if (!hero) {
            hero = new Hero();
            await hero.save();
        }
        res.json(hero);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Update Hero Data (Protected)
router.put('/', auth, async (req, res) => {
    try {
        let hero = await Hero.findOne();
        if (!hero) {
            hero = new Hero(req.body);
        } else {
            hero.title = req.body.title || hero.title;
            hero.subtitle = req.body.subtitle || hero.subtitle;
            hero.ctaText = req.body.ctaText || hero.ctaText;
        }
        await hero.save();
        res.json(hero);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
