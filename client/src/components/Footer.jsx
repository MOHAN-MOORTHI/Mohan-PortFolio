import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaGithub, FaLinkedin, FaTwitter, FaWhatsapp, FaEnvelope, FaFacebook, FaPhone } from 'react-icons/fa';
import { mockAbout } from '../data/mockData';

const Footer = () => {
    const [socials, setSocials] = useState(mockAbout);

    useEffect(() => {
        const fetchSocials = async () => {
            try {
                const res = await axios.get('/api/about');
                if (res.data) setSocials(res.data);
            } catch (err) {
                console.error("Using mock data due to error:", err);
                // Keep mock data
            }
        };
        fetchSocials();
    }, []);

    const formatUrl = (url) => {
        if (!url) return '';
        if (url.startsWith('http://') || url.startsWith('https://')) return url;
        return `https://${url}`;
    };

    const socialLinks = [
        { icon: <FaGithub />, url: formatUrl(socials.github), show: !!socials.github },
        { icon: <FaLinkedin />, url: formatUrl(socials.linkedin), show: !!socials.linkedin },
        { icon: <FaTwitter />, url: formatUrl(socials.twitter), show: !!socials.twitter },
        { icon: <FaFacebook />, url: formatUrl(socials.facebook), show: !!socials.facebook },
        { icon: <FaWhatsapp />, url: formatUrl(socials.whatsapp), show: !!socials.whatsapp },
        { icon: <FaPhone />, url: socials.mobile ? `tel:${socials.mobile}` : '', show: !!socials.mobile },
        { icon: <FaEnvelope />, url: socials.email ? `mailto:${socials.email}` : '', show: !!socials.email }
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
                {socialLinks.filter(link => link.show).map((link, index) => (
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
                &copy; {new Date().getFullYear()} Mohan. All rights reserved.
            </p>
            <p style={{ fontSize: '0.8rem', color: '#666', marginTop: '0.5rem' }}>
                Built with React, Node.js & Three.js
            </p>
        </footer>
    );
};

export default Footer;
