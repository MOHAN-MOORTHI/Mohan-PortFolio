import React from 'react';
import { motion } from 'framer-motion';

const About = () => {
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
                        {/* Placeholder for Profile Image */}
                        <img src="https://via.placeholder.com/200" alt="Profile" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        style={{ maxWidth: '600px', textAlign: 'left' }}
                    >
                        <p style={{ fontSize: '1.1rem', color: 'var(--text-main)' }}>
                            I am a passionate Full Stack Developer with experience in building web applications using the MERN stack.
                            I love creating beautiful, accessible, and performant user interfaces that delight users.
                        </p>
                        <p>
                            My journey started with a curiosity for how things work on the internet, which led me to dive deep into JavaScript, React, and Node.js.
                            When I'm not coding, you can find me exploring new technologies, contributing to open source, or gaming.
                        </p>
                        <div style={{ marginTop: '1.5rem' }}>
                            <a href="/resume.pdf" download className="btn btn-primary">Download Resume</a>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default About;
