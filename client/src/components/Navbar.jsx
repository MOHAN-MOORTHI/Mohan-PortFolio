import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FaBars, FaTimes } from 'react-icons/fa';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const location = useLocation();

    // Handle scroll effect for navbar background
    // Changes the background style when user scrolls down
    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 50);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Smooth scroll to section
    // Handles both on-page scrolling and cross-page navigation
    const scrollToSection = (id) => {
        setIsOpen(false);
        if (location.pathname !== '/') {
            // Navigate to home then scroll (since sections are only on Home page)
            window.location.href = `/#${id}`;
        } else {
            const element = document.getElementById(id);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
            }
        }
    };

    return (
        <>
            <style>
                {`
          .nav-container {
            transition: all 0.3s ease;
            background: ${scrolled ? 'rgba(15, 23, 42, 0.9)' : 'rgba(15, 23, 42, 0.3)'};
            backdrop-filter: blur(10px);
            border-bottom: 1px solid ${scrolled ? 'rgba(255,255,255,0.1)' : 'transparent'};
          }
          .desktop-menu { display: flex; gap: 2rem; }
          .mobile-icon { display: none; cursor: pointer; font-size: 1.5rem; color: white; }
          
          @media (max-width: 768px) {
            .desktop-menu { display: none; }
            .mobile-icon { display: block; }
          }
        `}
            </style>
            <nav className="nav-container" style={{ position: 'fixed', width: '100%', top: 0, zIndex: 1000, padding: '1rem 2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Link to="/" onClick={() => window.scrollTo(0, 0)} style={{ textDecoration: 'none', display: 'flex', alignItems: 'center' }}>
                    <span style={{
                        fontSize: '1.8rem',
                        fontWeight: '800',
                        background: 'linear-gradient(to right, #c084fc, #6366f1, #3b82f6)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        backgroundClip: 'text',
                        letterSpacing: '-1px'
                    }}>
                        Portfolio
                    </span>
                    <span style={{ fontSize: '1.8rem', fontWeight: '800', color: '#6366f1' }}>.</span>
                </Link>

                {/* Desktop Menu */}
                <div className="desktop-menu">
                    {['About', 'Skills', 'Experience', 'Certifications', 'Projects', 'Contact'].map((item) => (
                        <button
                            key={item}
                            onClick={() => scrollToSection(item.toLowerCase())}
                            style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.8)', cursor: 'pointer', fontSize: '1rem', fontWeight: 500, transition: 'color 0.3s' }}
                            onMouseOver={(e) => e.target.style.color = '#fff'}
                            onMouseOut={(e) => e.target.style.color = 'rgba(255,255,255,0.8)'}
                        >
                            {item}
                        </button>
                    ))}
                    <Link to="/admin" className="btn btn-primary" style={{ padding: '0.5rem 1rem', textDecoration: 'none' }}>Admin</Link>
                </div>

                {/* Mobile Icon */}
                <div className="mobile-icon" onClick={() => setIsOpen(!isOpen)}>
                    {isOpen ? <FaTimes /> : <FaBars />}
                </div>
            </nav>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        style={{
                            position: 'fixed', top: '70px', left: 0, width: '100%', background: 'rgba(15, 23, 42, 0.95)',
                            backdropFilter: 'blur(15px)', padding: '2rem', display: 'flex', flexDirection: 'column',
                            alignItems: 'center', gap: '2rem', zIndex: 999, borderBottom: '1px solid rgba(255,255,255,0.1)'
                        }}
                    >
                        {['About', 'Skills', 'Experience', 'Certifications', 'Projects', 'Contact'].map((item) => (
                            <button
                                key={item}
                                onClick={() => scrollToSection(item.toLowerCase())}
                                style={{ background: 'none', border: 'none', color: 'white', fontSize: '1.2rem', cursor: 'pointer' }}
                            >
                                {item}
                            </button>
                        ))}
                        <Link to="/admin" onClick={() => setIsOpen(false)} className="btn btn-primary">Admin Login</Link>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default Navbar;
