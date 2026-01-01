import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaBars, FaTimes } from 'react-icons/fa';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggle = () => setIsOpen(!isOpen);

    return (
        <nav className="glass fixed w-full z-50 top-0 left-0 px-8 py-4 flex justify-between items-center" style={{ width: '100%', position: 'fixed', zIndex: 50, padding: '1rem 2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                className="logo"
            >
                <Link to="/" style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--text-main)', textDecoration: 'none' }}>
                    Portfolio.
                </Link>
            </motion.div>

            <div className="desktop-menu" style={{ display: 'flex', gap: '2rem' }}>
                {['About', 'Skills', 'Projects', 'Contact'].map((item) => (
                    <Link
                        key={item}
                        to={`/#${item.toLowerCase()}`}
                        style={{ color: 'var(--text-main)', textDecoration: 'none', fontWeight: 500 }}
                    >
                        {item}
                    </Link>
                ))}
                <Link to="/admin" className="btn btn-primary" style={{ padding: '0.4rem 1rem', fontSize: '0.9rem' }}>Admin</Link>
            </div>

            {/* Mobile Icon */}
            <div className="mobile-icon" onClick={toggle} style={{ display: 'none', cursor: 'pointer', color: 'white', fontSize: '1.5rem' }}>
                {isOpen ? <FaTimes /> : <FaBars />}
            </div>
        </nav>
    );
};

export default Navbar;
