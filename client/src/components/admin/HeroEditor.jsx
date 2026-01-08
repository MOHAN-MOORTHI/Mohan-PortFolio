import { useState, useEffect } from 'react';

const HeroEditor = ({ token }) => {
    const [heroData, setHeroData] = useState({ title: '', subtitle: '', ctaText: '' });

    useEffect(() => {
        fetch('/api/hero', {
            headers: { 'Authorization': `Bearer ${token}` }
        })
            .then(res => res.json())
            .then(data => {
                if (data) setHeroData({
                    title: data.title || '',
                    subtitle: data.subtitle || '',
                    ctaText: data.ctaText || ''
                });
            })
            .catch(err => console.error(err));
    }, [token]);

    const handleUpdateHero = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch('/api/hero', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(heroData)
            });
            if (res.ok) {
                alert('Hero section updated!');
            } else {
                alert('Failed to update hero section');
            }
        } catch (error) {
            console.error(error);
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
