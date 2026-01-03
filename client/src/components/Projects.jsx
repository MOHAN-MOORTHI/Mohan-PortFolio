import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';

import { mockProjects } from '../data/mockData';

const Projects = () => {
    // State to hold projects data
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

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

            <div className="grid-cols-3" style={{ gap: '2.5rem' }}>
                {projects.length === 0 ? <p className="text-center col-span-3">No projects found.</p> : projects.map((project, index) => (
                    <motion.div
                        key={project._id}
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ delay: index * 0.15, duration: 0.5 }}
                        whileHover={{ y: -10 }}
                        className="glass-card"
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            padding: 0,
                            overflow: 'hidden',
                            border: '1px solid rgba(255, 255, 255, 0.1)',
                            background: 'rgba(30, 41, 59, 0.7)',
                            backdropFilter: 'blur(10px)',
                            position: 'relative'
                        }}
                    >
                        {/* Image Container with Zoom Effect */}
                        <div style={{ position: 'relative', height: '220px', overflow: 'hidden' }}>
                            <motion.img
                                src={project.imageUrl || "https://via.placeholder.com/600x400"}
                                alt={project.title}
                                loading="lazy"
                                whileHover={{ scale: 1.1 }}
                                transition={{ duration: 0.5 }}
                                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                            />
                            {/* Overlay Gradient */}
                            <div style={{
                                position: 'absolute',
                                top: 0, left: 0, right: 0, bottom: 0,
                                background: 'linear-gradient(to bottom, transparent 0%, rgba(15, 23, 42, 0.8) 100%)'
                            }} />

                            {/* Tags Floating on Image */}
                            <div style={{ position: 'absolute', top: '1rem', right: '1rem', display: 'flex', gap: '0.4rem', flexWrap: 'wrap', justifyContent: 'flex-end' }}>
                                {project.tags.slice(0, 3).map(tag => (
                                    <span key={tag} style={{
                                        background: 'rgba(0, 0, 0, 0.6)',
                                        backdropFilter: 'blur(4px)',
                                        color: '#fff',
                                        padding: '0.2rem 0.6rem',
                                        borderRadius: '20px',
                                        fontSize: '0.7rem',
                                        border: '1px solid rgba(255,255,255,0.2)'
                                    }}>
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </div>

                        {/* Content */}
                        <div style={{ padding: '1.5rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
                            <h3 style={{ fontSize: '1.4rem', fontWeight: 'bold', marginBottom: '0.8rem', color: '#fff' }}>
                                {project.title}
                            </h3>
                            <p style={{ color: '#cbd5e1', fontSize: '0.95rem', lineHeight: '1.6', marginBottom: '1.5rem', flex: 1 }}>
                                {project.description.length > 100 ? project.description.substring(0, 100) + '...' : project.description}
                            </p>

                            <div style={{ display: 'flex', gap: '1rem', marginTop: 'auto' }}>
                                {project.liveUrl && (
                                    <a
                                        href={formatUrl(project.liveUrl)}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        style={{
                                            flex: 1,
                                            textAlign: 'center',
                                            padding: '0.6rem',
                                            borderRadius: '8px',
                                            background: 'linear-gradient(135deg, var(--primary), #a855f7)',
                                            color: 'white',
                                            fontWeight: '600',
                                            textDecoration: 'none',
                                            transition: 'transform 0.2s',
                                            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
                                        }}
                                        onMouseOver={e => e.currentTarget.style.transform = 'translateY(-2px)'}
                                        onMouseOut={e => e.currentTarget.style.transform = 'translateY(0)'}
                                    >
                                        Live Demo
                                    </a>
                                )}
                                {project.githubUrl && (
                                    <a
                                        href={formatUrl(project.githubUrl)}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        style={{
                                            flex: 1,
                                            textAlign: 'center',
                                            padding: '0.6rem',
                                            borderRadius: '8px',
                                            border: '1px solid rgba(255,255,255,0.2)',
                                            color: 'white',
                                            textDecoration: 'none',
                                            background: 'rgba(255,255,255,0.05)',
                                            transition: 'all 0.2s'
                                        }}
                                        onMouseOver={e => {
                                            e.currentTarget.style.background = 'rgba(255,255,255,0.1)';
                                            e.currentTarget.style.transform = 'translateY(-2px)';
                                        }}
                                        onMouseOut={e => {
                                            e.currentTarget.style.background = 'rgba(255,255,255,0.05)';
                                            e.currentTarget.style.transform = 'translateY(0)';
                                        }}
                                    >
                                        GitHub
                                    </a>
                                )}
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
};

export default Projects;
