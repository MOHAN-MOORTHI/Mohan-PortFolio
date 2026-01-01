import React from 'react';
import { FaGithub, FaLinkedin, FaTwitter, FaWhatsapp, FaEnvelope } from 'react-icons/fa';

const Footer = () => {
    const socialLinks = [
        { icon: <FaGithub />, url: 'https://github.com/MOHAN-MOORTHI' },
        { icon: <FaLinkedin />, url: 'https://linkedin.com/in/mohan-moorthi' }, // Guessing or placeholder
        { icon: <FaTwitter />, url: 'https://twitter.com' },
        { icon: <FaWhatsapp />, url: 'https://wa.me/919876543210' }, // Placeholder
        { icon: <FaEnvelope />, url: 'mailto:contact@example.com' }
    ];

    return (
        <footer style={{
            textAlign: 'center',
            padding: '3rem 2rem',
            borderTop: '1px solid var(--glass-border)',
            background: 'var(--bg-card)',
            marginTop: 'auto'
        }}>
            <div className="flex-center" style={{ gap: '2rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
                {socialLinks.map((link, index) => (
                    <a
                        key={index}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                            color: 'var(--text-muted)',
                            fontSize: '1.8rem',
                            transition: 'var(--transition)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            width: '50px',
                            height: '50px',
                            borderRadius: '50%',
                            background: 'rgba(255, 255, 255, 0.05)',
                            border: '1px solid var(--glass-border)'
                        }}
                        onMouseOver={(e) => {
                            e.currentTarget.style.color = 'var(--primary)';
                            e.currentTarget.style.transform = 'translateY(-5px)';
                            e.currentTarget.style.borderColor = 'var(--primary)';
                        }}
                        onMouseOut={(e) => {
                            e.currentTarget.style.color = 'var(--text-muted)';
                            e.currentTarget.style.transform = 'translateY(0)';
                            e.currentTarget.style.borderColor = 'var(--glass-border)';
                        }}
                    >
                        {link.icon}
                    </a>
                ))}
            </div>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                &copy; {new Date().getFullYear()} Mohan Moorthi. All rights reserved.
            </p>
            <p style={{ fontSize: '0.8rem', color: '#666', marginTop: '0.5rem' }}>
                Built with React, Node.js & Three.js
            </p>
        </footer>
    );
};

export default Footer;
