import React, { Suspense, useState, useEffect } from 'react';
import axios from 'axios';
import { Canvas } from '@react-three/fiber';
import { motion } from 'framer-motion';
import Stars from '../components/Stars';
import { mockAbout } from '../data/mockData';

const Hero = () => {
    // State to hold hero section data, defaulting to mock data for resilience
    const [heroData, setHeroData] = useState(mockAbout);

    // Fetch dynamic hero data from API
    useEffect(() => {
        const fetchHeroData = async () => {
            try {
                const res = await axios.get('/api/about');
                if (res.data) {
                    setHeroData(prev => ({ ...prev, ...res.data }));
                }
            } catch (err) {
                console.error('Error fetching hero data, using mock', err);
            }
        };
        fetchHeroData();
    }, []);

    return (
        <section style={{ height: '100vh', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
            {/* Background 3D Canvas */}
            <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: -1 }}>
                {/* Optimized Canvas settings for performance */}
                <Canvas camera={{ position: [0, 0, 1] }} dpr={[1, 2]} gl={{ antialias: false }}>
                    <Suspense fallback={null}>
                        <Stars />
                    </Suspense>
                </Canvas>
            </div>

            {/* Content Overlay */}
            <div className="content" style={{ textAlign: 'center', zIndex: 1, padding: '0 1rem' }}>
                <motion.h1
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    style={{ marginBottom: '1rem', background: 'linear-gradient(to right, #6366f1, #a855f7, #22d3ee)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}
                >
                    {heroData.heroHeadline} <br />
                    <span style={{ fontSize: '2.5rem', color: 'white', WebkitTextFillColor: 'white' }}>{heroData.heroSubHeadline}</span>
                </motion.h1>
                <motion.p
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.8 }}
                    style={{ fontSize: '1.2rem', maxWidth: '600px', margin: '0 auto 2rem' }}
                >
                    {heroData.heroDescription}
                </motion.p>
                <motion.div
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.6, duration: 0.5 }}
                >
                    <a href="#projects" className="btn btn-primary" style={{ marginRight: '1rem' }}>{heroData.viewProjectsBtnText}</a>
                    <a href="#contact" className="btn" style={{ border: '1px solid var(--primary)', color: 'white' }}>{heroData.contactBtnText}</a>
                </motion.div>
            </div>
        </section>
    );
};

export default Hero;
