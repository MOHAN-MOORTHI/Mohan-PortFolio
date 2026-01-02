import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaGithub, FaLinkedin, FaTwitter, FaWhatsapp, FaEnvelope, FaFacebook, FaPhone } from 'react-icons/fa';

const Footer = () => {
    const [socials, setSocials] = useState({ github: '', linkedin: '', twitter: '', whatsapp: '', facebook: '', mobile: '', email: '' });

    useEffect(() => {
        const fetchSocials = async () => {
            try {
                const res = await axios.get('/api/about');
                if (res.data) setSocials({
                    github: res.data.github || '',
                    linkedin: res.data.linkedin || '',
                    twitter: res.data.twitter || '',
                    whatsapp: res.data.whatsapp || '',
                    facebook: res.data.facebook || '',
                    mobile: res.data.mobile || '',
                    email: res.data.email || ''
                });
            } catch (err) {
                console.error(err);
            }
        };
        fetchSocials();
    }, []);

    const socialLinks = [
        { icon: <FaGithub />, url: socials.github, show: !!socials.github },
        { icon: <FaLinkedin />, url: socials.linkedin, show: !!socials.linkedin },
        { icon: <FaTwitter />, url: socials.twitter, show: !!socials.twitter },
        { icon: <FaFacebook />, url: socials.facebook, show: !!socials.facebook },
        { icon: <FaWhatsapp />, url: socials.whatsapp, show: !!socials.whatsapp },
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
                &copy; {new Date().getFullYear()} Mohan Moorthi. All rights reserved.
            </p>
            <p style={{ fontSize: '0.8rem', color: '#666', marginTop: '0.5rem' }}>
                Built with React, Node.js & Three.js
            </p>
        </footer>
    );
};

export default Footer;
