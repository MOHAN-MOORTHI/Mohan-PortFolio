import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';

import { mockAbout } from '../data/mockData';

const About = () => {
    // Initialize state with mock data for immediate rendering (better UX)
    const [about, setAbout] = useState(mockAbout);

    // Fetch dynamic data from backend
    useEffect(() => {
        const fetchAbout = async () => {
            try {
                const res = await axios.get('/api/about');
                if (res.data) setAbout(res.data);
            } catch (err) {
                // Fallback to mock data is handled by initial state, just log error
                console.error("Failed to fetch about data, using mock", err);
            }
        };
        fetchAbout();
    }, []);

    return (
        <section id="about" className="section">
            <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
                {/* Visual Header with Animation */}
                <motion.h2
                    initial={{ opacity: 0, y: -20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    style={{ marginBottom: '2rem' }}
                >
                    About Me
                </motion.h2>

                <div className="flex-center" style={{ gap: '2rem', flexWrap: 'wrap' }}>
                    {/* Profile Image with performance optimization */}
                    {/* Profile Image with 3D Float & Hover Effect */}
                    <div style={{ perspective: '1000px' }}>
                        <motion.div
                            initial={{ opacity: 0, scale: 0.5, rotateX: 20 }}
                            whileInView={{ opacity: 1, scale: 1, rotateX: 0 }}
                            viewport={{ once: true }}
                            animate={{
                                y: [0, -15, 0],
                            }}
                            transition={{
                                duration: 6,
                                repeat: Infinity,
                                ease: "easeInOut"
                            }}
                            whileHover={{
                                scale: 1.1,
                                rotateY: 10,
                                rotateX: -10,
                                boxShadow: "0px 0px 40px rgba(99, 102, 241, 0.6)"
                            }}
                            style={{
                                width: '250px',
                                height: '250px',
                                borderRadius: '50%',
                                background: 'linear-gradient(135deg, var(--primary), #a855f7)',
                                padding: '5px',
                                boxShadow: '0 20px 40px rgba(0,0,0,0.4)',
                                cursor: 'grab',
                                transformStyle: 'preserve-3d'
                            }}
                        >
                            <div style={{
                                width: '100%',
                                height: '100%',
                                borderRadius: '50%',
                                overflow: 'hidden',
                                position: 'relative',
                                background: '#1e293b'
                            }}>
                                <img
                                    src={about.imageUrl || "https://via.placeholder.com/200"}
                                    alt="Profile"
                                    loading="lazy"
                                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                />
                                {/* Shine Effect Overlay */}
                                <div style={{
                                    position: 'absolute',
                                    top: 0,
                                    left: 0,
                                    right: 0,
                                    bottom: 0,
                                    background: 'linear-gradient(120deg, rgba(255,255,255,0) 30%, rgba(255,255,255,0.1) 50%, rgba(255,255,255,0) 70%)',
                                    pointerEvents: 'none'
                                }} />
                            </div>
                        </motion.div>
                    </div>

                    {/* Bio Content */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        style={{ maxWidth: '600px', textAlign: 'left' }}
                    >
                        {about.bio ? (
                            <p style={{ fontSize: '1.1rem', color: 'var(--text-main)', whiteSpace: 'pre-line' }}>
                                {about.bio}
                            </p>
                        ) : (
                            <p>Loading bio...</p>
                        )}

                        <div style={{ marginTop: '1.5rem' }}>
                            {about.resumeUrl && (
                                <a href={about.resumeUrl} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
                                    Download Resume
                                </a>
                            )}
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default About;
