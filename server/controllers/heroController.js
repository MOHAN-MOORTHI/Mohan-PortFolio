const Hero = require('../models/Hero');

exports.getHero = async (req, res) => {
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
};

exports.updateHero = async (req, res) => {
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
};
