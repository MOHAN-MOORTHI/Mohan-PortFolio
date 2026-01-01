import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';

const About = () => {
    const [about, setAbout] = useState({ bio: '', imageUrl: '', resumeUrl: '' });

    useEffect(() => {
        const fetchAbout = async () => {
            try {
                const res = await axios.get('/api/about');
                if (res.data) setAbout(res.data);
            } catch (err) {
                console.error(err);
            }
        };
        fetchAbout();
    }, []);

    return (
        <section id="about" className="section">
            <div className="glass-card" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
                <motion.h2
                    initial={{ opacity: 0, y: -20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    style={{ marginBottom: '2rem' }}
                >
                    About Me
                </motion.h2>

                <div className="flex-center" style={{ gap: '2rem', flexWrap: 'wrap' }}>
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        style={{ width: '200px', height: '200px', borderRadius: '50%', overflow: 'hidden', border: '4px solid var(--primary)' }}
                    >
                        <img
                            src={about.imageUrl || "https://via.placeholder.com/200"}
                            alt="Profile"
                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        />
                    </motion.div>

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
