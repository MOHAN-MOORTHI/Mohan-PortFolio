import React from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import About from '../components/About';
import Skills from '../components/Skills';
import Projects from '../components/Projects';
import Experience from '../components/Experience';
import Contact from '../components/Contact';

const Home = () => {
    return (
        <>
            <Navbar />
            <Hero />
            <About />
            <Skills />
            <Experience />
            <Projects />
            <Contact />
            <footer style={{ textAlign: 'center', padding: '2rem', borderTop: '1px solid var(--glass-border)' }}>
                <p>&copy; 2024 Portfolio. All rights reserved.</p>
            </footer>
        </>
    );
};

export default Home;
