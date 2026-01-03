import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import { FaAward, FaExternalLinkAlt } from 'react-icons/fa';

import { mockCertifications } from '../data/mockData';

const Certifications = () => {
    // State to hold certifications data
    const [certifications, setCertifications] = useState([]);

    // Fetch certifications from API with mock data fallback
    useEffect(() => {
        const fetchCerts = async () => {
            try {
                const res = await axios.get('/api/certifications');
                setCertifications(res.data);
            } catch (err) {
                console.error("Failed to fetch certifications, using mock data", err);
                setCertifications(mockCertifications);
            }
        };
        fetchCerts();
    }, []);



    // Helper to help ensure all links are absolute URLs
    const formatUrl = (url) => {
        if (!url) return '';
        if (url.startsWith('http://') || url.startsWith('https://')) return url;
        return `https://${url}`;
    };

    return (
        <section id="certifications" className="section">
            <motion.h2
                initial={{ opacity: 0, y: -20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                style={{ textAlign: 'center', marginBottom: '3rem' }}
            >
                Certifications
            </motion.h2>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
                {certifications.map((cert, index) => (
                    <motion.div
                        key={cert._id}
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.1 }}
                        className="glass-card"
                        style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}
                    >
                        <div style={{ padding: '0.8rem', background: 'rgba(99, 102, 241, 0.1)', borderRadius: '12px', color: 'var(--primary)', fontSize: '1.5rem' }}>
                            <FaAward />
                        </div>
                        <div>
                            <h3 style={{ fontSize: '1.2rem', marginBottom: '0.2rem' }}>{cert.name}</h3>
                            <p style={{ color: 'var(--primary)', fontSize: '0.9rem', marginBottom: '0.5rem' }}>{cert.issuer}</p>
                            <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>{cert.date}</p>
                            {cert.description && <p style={{ fontSize: '0.9rem', marginBottom: '1rem' }}>{cert.description}</p>}
                            {cert.link && (
                                <a href={formatUrl(cert.link)} target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', color: 'var(--accent)', fontSize: '0.9rem', textDecoration: 'none' }}>
                                    View Certificate <FaExternalLinkAlt style={{ fontSize: '0.8rem' }} />
                                </a>
                            )}
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
};

export default Certifications;
