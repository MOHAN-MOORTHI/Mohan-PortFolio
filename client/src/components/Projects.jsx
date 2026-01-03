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
