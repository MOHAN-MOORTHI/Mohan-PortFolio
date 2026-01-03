import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';

import { mockProjects } from '../data/mockData';

const Projects = () => {
    // State to hold projects data
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isTransitioning, setIsTransitioning] = useState(true);

    // Fetch projects from API, fall back to mock data on error for resilience
    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const res = await axios.get('/api/projects');
                setProjects(res.data);
                setLoading(false);
            } catch (err) {
                console.error("Failed to fetch projects, using mock data", err);
                setProjects(mockProjects);
                setLoading(false);
            }
        };
        fetchProjects();
    }, []);

    // Create an extended array for infinite looping (append first 3 items to the end)
    const extendedProjects = [...projects, ...projects.slice(0, 3)];

    // Auto-play functionality - Slides one by one
    useEffect(() => {
        if (projects.length <= 3) return;

        const interval = setInterval(() => {
            handleNext();
        }, 3000); // Faster check for smoother continuous feel

        return () => clearInterval(interval);
    }, [projects.length, currentIndex]);

    const handleNext = () => {
        if (currentIndex >= projects.length) {
            // Reset happens instantly via usage of 'isTransitioning' in useEffect below, 
            // but we trigger the move to the 'clone' first.
            return;
        }
        setIsTransitioning(true);
        setCurrentIndex(prev => prev + 1);
    };

    // Handle Infinite Loop Reset
    useEffect(() => {
        if (currentIndex === projects.length) {
            // We have scrolled past the real items into the clones.
            // Wait for the animation to finish (500ms), then instantly snap back to index 0.
            const timeout = setTimeout(() => {
                setIsTransitioning(false);
                setCurrentIndex(0);
            }, 500); // Must match CSS transition duration
            return () => clearTimeout(timeout);
        }
    }, [currentIndex, projects.length]);


    // Helper to format URLs
    const formatUrl = (url) => {
        if (!url) return '';
        if (url.startsWith('http://') || url.startsWith('https://')) return url;
        return `https://${url}`;
    };

    if (loading) return <div className="text-center p-10">Loading Projects...</div>;
    if (error) return <div className="text-center p-10 text-red-500">{error}</div>;

    return (
        <section id="projects" className="section">
            <motion.h2
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                style={{ textAlign: 'center', marginBottom: '3rem' }}
            >
                Featured Projects
            </motion.h2>

            {/* Carousel Container */}
            <div className="carousel-container" style={{ position: 'relative', overflow: 'hidden', padding: '1rem 0 3rem 0' }}>
                <div
                    style={{
                        display: 'flex',
                        width: `${(extendedProjects.length / 3) * 100}%`, // Calculate exact width based on item count
                        transform: `translateX(-${currentIndex * (100 / extendedProjects.length)}%)`, // Move based on percentage of TOTAL track
                        transition: isTransitioning ? 'transform 0.5s ease-in-out' : 'none'
                    }}
                >
                    {extendedProjects.map((project, index) => (
                        <div key={`${project._id}-${index}`} style={{ width: `${100 / extendedProjects.length}%`, padding: '0 1rem' }}>
                            <motion.div
                                className="glass-card"
                                whileHover={{ y: -10 }}
                                style={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    padding: 0,
                                    overflow: 'hidden',
                                    height: '100%',
                                    border: '1px solid rgba(255, 255, 255, 0.1)',
                                    background: 'linear-gradient(145deg, rgba(30, 41, 59, 0.9), rgba(15, 23, 42, 0.8))',
                                    backdropFilter: 'blur(10px)',
                                    borderRadius: '16px',
                                    boxShadow: '0 10px 30px -10px rgba(0,0,0,0.5)'
                                }}
                            >
                                {/* Image Section with Zoom */}
                                <div style={{ height: '220px', overflow: 'hidden', position: 'relative' }}>
                                    <motion.img
                                        src={project.imageUrl || "https://via.placeholder.com/600x400"}
                                        alt={project.title}
                                        whileHover={{ scale: 1.1 }}
                                        transition={{ duration: 0.5 }}
                                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                    />
                                    <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: 'linear-gradient(to bottom, transparent, rgba(15, 23, 42, 0.6))' }} />

                                    {/* Floating Category Badge on Image */}
                                    <span style={{
                                        position: 'absolute',
                                        bottom: '1rem',
                                        left: '1rem',
                                        background: 'rgba(99, 102, 241, 0.9)',
                                        color: 'white',
                                        padding: '0.4rem 1rem',
                                        borderRadius: '20px',
                                        fontSize: '0.85rem',
                                        fontWeight: '600',
                                        backdropFilter: 'blur(4px)',
                                        boxShadow: '0 4px 6px rgba(0,0,0,0.2)'
                                    }}>
                                        {project.tags[0] || 'Project'}
                                    </span>
                                </div>

                                {/* Content Section */}
                                <div style={{ padding: '1.5rem', flex: 1, display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                                    <h3 style={{ fontSize: '1.4rem', fontWeight: 'bold', color: 'white', margin: 0, letterSpacing: '0.5px' }}>
                                        {project.title}
                                    </h3>

                                    <p style={{ color: '#cbd5e1', fontSize: '0.95rem', lineHeight: '1.6', flex: 1 }}>
                                        {project.description.length > 80 ? project.description.substring(0, 80) + '...' : project.description}
                                    </p>

                                    <div style={{ paddingTop: '1rem', display: 'flex', gap: '1rem', marginTop: 'auto' }}>
                                        {project.liveUrl && (
                                            <a
                                                href={formatUrl(project.liveUrl)}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="btn btn-primary"
                                                style={{
                                                    flex: 1,
                                                    textAlign: 'center',
                                                    padding: '0.6rem',
                                                    fontSize: '0.9rem',
                                                    textDecoration: 'none'
                                                }}
                                            >
                                                Live Demo
                                            </a>
                                        )}
                                        {project.githubUrl && (
                                            <a
                                                href={formatUrl(project.githubUrl)}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="btn"
                                                style={{
                                                    flex: 1,
                                                    textAlign: 'center',
                                                    padding: '0.6rem',
                                                    border: '1px solid rgba(255,255,255,0.2)',
                                                    background: 'rgba(255,255,255,0.05)',
                                                    color: 'white',
                                                    textDecoration: 'none',
                                                    fontSize: '0.9rem'
                                                }}
                                            >
                                                Code
                                            </a>
                                        )}
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    ))}
                </div>

                {/* Pagination Dots */}
                <div style={{ display: 'flex', justifyContent: 'center', gap: '0.8rem', marginTop: '2rem' }}>
                    {projects.map((_, idx) => (
                        <button
                            key={idx}
                            onClick={() => {
                                setIsTransitioning(true);
                                setCurrentIndex(idx);
                            }}
                            style={{
                                width: '10px',
                                height: '10px',
                                borderRadius: '50%',
                                border: 'none',
                                background: (currentIndex % projects.length) === idx ? 'var(--primary)' : 'rgba(255, 255, 255, 0.2)',
                                cursor: 'pointer',
                                transition: 'background 0.3s ease'
                            }}
                            aria-label={`Go to slide ${idx + 1}`}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Projects;
