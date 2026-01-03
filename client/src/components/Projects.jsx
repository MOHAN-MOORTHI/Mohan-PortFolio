import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';

import { mockProjects } from '../data/mockData';

const Projects = () => {
    // State to hold projects data
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [activeIndex, setActiveIndex] = useState(0);

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

    // Auto-play functionality
    useEffect(() => {
        if (projects.length <= 3) return; // No auto-play if no slides needed

        const interval = setInterval(() => {
            setActiveIndex((current) => {
                const maxIndex = Math.ceil(projects.length / 3) - 1;
                return current === maxIndex ? 0 : current + 1;
            });
        }, 5000); // Change slide every 5 seconds

        return () => clearInterval(interval);
    }, [projects.length]);

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
                <motion.div
                    animate={{ x: `-${activeIndex * 100}%` }}
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                    style={{ display: 'flex', width: `${Math.ceil(projects.length / 3) * 100}%` }}
                >
                    {/* Group projects into chunks of 3 for the carousel slides */}
                    {Array.from({ length: Math.ceil(projects.length / 3) }).map((_, slideIndex) => (
                        <div key={slideIndex} style={{ display: 'flex', width: '100%', justifyContent: 'space-around', padding: '0 1rem' }}>
                            {projects.slice(slideIndex * 3, (slideIndex * 3) + 3).map((project) => (
                                <div key={project._id} style={{ width: '30%', minWidth: '300px' }}>
                                    <div
                                        className="glass-card"
                                        style={{
                                            display: 'flex',
                                            flexDirection: 'column',
                                            padding: 0,
                                            overflow: 'hidden',
                                            height: '100%',
                                            border: '1px solid rgba(255, 255, 255, 0.1)',
                                            background: 'rgba(30, 41, 59, 0.7)',
                                            backdropFilter: 'blur(10px)',
                                            borderRadius: '8px'
                                        }}
                                    >
                                        {/* Image Section - Top Half */}
                                        <div style={{ height: '220px', overflow: 'hidden', position: 'relative' }}>
                                            <img
                                                src={project.imageUrl || "https://via.placeholder.com/600x400"}
                                                alt={project.title}
                                                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                            />
                                        </div>

                                        {/* Content Section - Bottom Half */}
                                        <div style={{ padding: '1.5rem', flex: 1, display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                                            {/* Badge/Category mimicking the reference */}
                                            <div>
                                                <span style={{
                                                    background: '#3b82f6',
                                                    color: 'white',
                                                    padding: '0.3rem 0.8rem',
                                                    borderRadius: '4px',
                                                    fontSize: '0.85rem',
                                                    fontWeight: '600',
                                                    display: 'inline-flex',
                                                    alignItems: 'center',
                                                    gap: '0.3rem'
                                                }}>
                                                    {/* Using first tag as category or default to Project */}
                                                    🏷️  {project.tags[0] || 'Project'}
                                                </span>
                                            </div>

                                            <h3 style={{ fontSize: '1.3rem', fontWeight: 'bold', color: 'white', margin: 0 }}>
                                                {project.title}
                                            </h3>

                                            <p style={{ color: '#94a3b8', fontSize: '0.95rem', lineHeight: '1.5', flex: 1 }}>
                                                {project.description.length > 80 ? project.description.substring(0, 80) + '...' : project.description}
                                            </p>

                                            <div style={{ paddingTop: '1rem', display: 'flex', gap: '1rem' }}>
                                                {project.liveUrl && (
                                                    <a href={formatUrl(project.liveUrl)} target="_blank" rel="noopener noreferrer" style={{ color: '#60a5fa', textDecoration: 'none', fontWeight: '500' }}>
                                                        Live Demo →
                                                    </a>
                                                )}
                                                {project.githubUrl && (
                                                    <a href={formatUrl(project.githubUrl)} target="_blank" rel="noopener noreferrer" style={{ color: '#94a3b8', textDecoration: 'none', transition: 'color 0.2s' }} onMouseOver={e => e.target.style.color = 'white'} onMouseOut={e => e.target.style.color = '#94a3b8'}>
                                                        View Code
                                                    </a>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                            {/* Filler for last slide if incomplete */}
                            {projects.slice(slideIndex * 3, (slideIndex * 3) + 3).length < 3 && (
                                Array.from({ length: 3 - projects.slice(slideIndex * 3, (slideIndex * 3) + 3).length }).map((_, i) => (
                                    <div key={`filler-${i}`} style={{ width: '30%', minWidth: '300px', opacity: 0 }}></div>
                                ))
                            )}
                        </div>
                    ))}
                </motion.div>

                {/* Pagination Dots */}
                <div style={{ display: 'flex', justifyContent: 'center', gap: '0.8rem', marginTop: '2rem' }}>
                    {Array.from({ length: Math.ceil(projects.length / 3) }).map((_, idx) => (
                        <button
                            key={idx}
                            onClick={() => setActiveIndex(idx)}
                            style={{
                                width: '12px',
                                height: '12px',
                                borderRadius: '50%',
                                border: 'none',
                                background: activeIndex === idx ? 'var(--primary)' : 'rgba(255, 255, 255, 0.2)',
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
