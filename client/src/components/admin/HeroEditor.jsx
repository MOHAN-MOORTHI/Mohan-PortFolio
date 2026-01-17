import { useState, useEffect } from 'react';
import adminService from '../../services/adminService';

const HeroEditor = () => {
    const [heroData, setHeroData] = useState({ title: '', subtitle: '', ctaText: '' });

    useEffect(() => {
        adminService.getHeroFn()
            .then(res => {
                const data = res.data;
                if (data) setHeroData({
                    title: data.title || '',
                    subtitle: data.subtitle || '',
                    ctaText: data.ctaText || ''
                });
            })
            .catch(err => console.error(err));
    }, []);

    const handleUpdateHero = async (e) => {
        e.preventDefault();
        try {
            await adminService.updateHeroFn(heroData);
            alert('Hero section updated!');
        } catch (error) {
            console.error(error);
            alert('Failed to update hero section');
        }
    };

    return (
        <div className="bg-white/5 p-8 rounded-2xl border border-white/10 backdrop-blur-xl">
            <h2 className="text-2xl font-bold mb-6 text-white">Edit Hero Section</h2>
            <form onSubmit={handleUpdateHero} className="space-y-6">
                <div>
                    <label className="block text-gray-400 mb-2">Main Title</label>
                    <input
                        value={heroData.title}
                        onChange={e => setHeroData({ ...heroData, title: e.target.value })}
                        className="w-full bg-dark-bg border border-white/10 rounded-lg p-3 text-white focus:border-secondary focus:outline-none"
                    />
                </div>
                <div>
                    <label className="block text-gray-400 mb-2">Subtitle</label>
                    <input
                        value={heroData.subtitle}
                        onChange={e => setHeroData({ ...heroData, subtitle: e.target.value })}
                        className="w-full bg-dark-bg border border-white/10 rounded-lg p-3 text-white focus:border-secondary focus:outline-none"
                    />
                </div>
                <div>
                    <label className="block text-gray-400 mb-2">Button Text</label>
                    <input
                        value={heroData.ctaText}
                        onChange={e => setHeroData({ ...heroData, ctaText: e.target.value })}
                        className="w-full bg-dark-bg border border-white/10 rounded-lg p-3 text-white focus:border-secondary focus:outline-none"
                    />
                </div>
                <button type="submit" className="w-full bg-secondary text-dark-bg font-bold py-3 rounded-lg hover:bg-cyan-400 transition-colors shadow-lg shadow-cyan-500/20">
                    Update Hero Section
                </button>
            </form>
        </div>
    );
};

export default HeroEditor;
