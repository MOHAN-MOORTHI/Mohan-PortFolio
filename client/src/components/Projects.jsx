import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';

const Projects = () => {
    const [projects, setProjects] = useState([]);

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const res = await axios.get('/api/projects');
                setProjects(res.data);
            } catch (err) {
                console.error("Failed to fetch projects", err);
            }
        };
        fetchProjects();
    }, []);

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

            <div className="grid-cols-3">
                {projects.map((project, index) => (
                    <motion.div
                        key={project._id}
                        className="glass-card"
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 }}
                        style={{ display: 'flex', flexDirection: 'column' }}
                    >
                        <div style={{ height: '200px', background: 'var(--bg-dark)', borderRadius: '8px', marginBottom: '1rem', overflow: 'hidden', border: '1px solid var(--glass-border)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            {project.imageUrl ? (
                                <img src={project.imageUrl} alt={project.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                            ) : (
                                <span style={{ color: 'var(--text-muted)' }}>Project Preview</span>
                            )}
                        </div>
                        <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>{project.title}</h3>
                        <p style={{ flex: 1 }}>{project.description}</p>
                        <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
                            {project.tags.map(tag => (
                                <span key={tag} style={{ background: 'rgba(99, 102, 241, 0.2)', color: 'var(--primary)', padding: '0.2rem 0.6rem', borderRadius: '4px', fontSize: '0.8rem' }}>{tag}</span>
                            ))}
                        </div>
                        <div style={{ display: 'flex', gap: '1rem', marginTop: 'auto' }}>
                            {project.liveUrl && <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="btn btn-primary" style={{ flex: 1, textAlign: 'center', padding: '0.5rem' }}>Live</a>}
                            {project.githubUrl && <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="btn" style={{ flex: 1, textAlign: 'center', border: '1px solid var(--primary)', padding: '0.5rem' }}>Code</a>}
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
};

export default Projects;
