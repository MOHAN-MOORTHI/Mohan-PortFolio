import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';

import { mockExperience } from '../data/mockData';

const Experience = () => {
    const [experiences, setExperiences] = useState([]);

    // Fetch experience data with fallback
    useEffect(() => {
        const fetchExperience = async () => {
            try {
                const res = await axios.get('/api/experience');
                setExperiences(res.data);
            } catch (err) {
                console.error("Failed to fetch experience, using mock data", err);
                setExperiences(mockExperience);
            }
        };
        fetchExperience();
    }, []);

    return (
        <section id="experience" className="section">
            <h2 style={{ textAlign: 'center', marginBottom: '3rem' }}>Experience</h2>
            <div style={{ position: 'relative', maxWidth: '800px', margin: '0 auto' }}>
                {/* Vertical Timeline Line */}
                <div style={{ position: 'absolute', left: '50%', top: 0, bottom: 0, width: '2px', background: 'var(--glass-border)', transform: 'translateX(-50%)' }} />

                {experiences.map((exp, index) => (
                    <motion.div
                        key={exp._id}
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.2 }}
                        style={{
                            display: 'flex',
                            // Alternate Sides for timeline effect
                            justifyContent: index % 2 === 0 ? 'flex-start' : 'flex-end',
                            marginBottom: '2rem',
                            position: 'relative'
                        }}
                    >
                        {/* Dot on timeline */}
                        <div style={{
                            position: 'absolute',
                            left: '50%',
                            top: '20px',
                            width: '16px',
                            height: '16px',
                            background: 'var(--accent)',
                            borderRadius: '50%',
                            transform: 'translateX(-50%)',
                            zIndex: 2,
                            boxShadow: '0 0 10px var(--accent)'
                        }} />

                        <div className="glass-card" style={{ width: '45%', position: 'relative' }}>
                            <h3 style={{ fontSize: '1.2rem', color: 'var(--primary)' }}>{exp.role}</h3>
                            <h4 style={{ fontSize: '1rem', marginBottom: '0.5rem' }}>{exp.company}</h4>
                            <p style={{ fontSize: '0.9rem', marginBottom: '0.5rem', color: 'var(--text-muted)' }}>{exp.duration}</p>
                            <p>{exp.description}</p>
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
};

export default Experience;

