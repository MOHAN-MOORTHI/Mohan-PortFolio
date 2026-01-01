import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { motion } from 'framer-motion';
import Stars from '../components/Stars';

const Hero = () => {
    return (
        <section style={{ height: '100vh', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: -1 }}>
                <Canvas camera={{ position: [0, 0, 1] }}>
                    <Suspense fallback={null}>
                        <Stars />
                    </Suspense>
                </Canvas>
            </div>

            <div className="content" style={{ textAlign: 'center', zIndex: 1, padding: '0 1rem' }}>
                <motion.h1
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    style={{ marginBottom: '1rem', background: 'linear-gradient(to right, #6366f1, #a855f7, #22d3ee)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}
                >
                    Hi, I'm Mohan <br />
                    <span style={{ fontSize: '2.5rem', color: 'white', WebkitTextFillColor: 'white' }}>Full Stack Developer</span>
                </motion.h1>
                <motion.p
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.8 }}
                    style={{ fontSize: '1.2rem', maxWidth: '600px', margin: '0 auto 2rem' }}
                >
                    Building futuristic, scalable, and responsive web applications with the MERN stack.
                </motion.p>
                <motion.div
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.6, duration: 0.5 }}
                >
                    <a href="#projects" className="btn btn-primary" style={{ marginRight: '1rem' }}>View Projects</a>
                    <a href="#contact" className="btn" style={{ border: '1px solid var(--primary)', color: 'white' }}>Contact Me</a>
                </motion.div>
            </div>
        </section>
    );
};

export default Hero;
