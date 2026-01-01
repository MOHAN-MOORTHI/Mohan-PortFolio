import React from 'react';
import { motion } from 'framer-motion';

const experiences = [
    {
        id: 1,
        role: "Senior Full Stack Dev",
        company: "Tech Corp",
        date: "2023 - Present",
        desc: "Leading web development projects using MERN stack."
    },
    {
        id: 2,
        role: "Frontend Developer",
        company: "Creative Agency",
        date: "2021 - 2023",
        desc: "Built responsive UIs with React and GSAP."
    },
    {
        id: 3,
        role: "Intern",
        company: "Startup Inc",
        date: "2020 - 2021",
        desc: "Assisted in backend API development."
    }
];

const Experience = () => {
    return (
        <section id="experience" className="section">
            <h2 style={{ textAlign: 'center', marginBottom: '3rem' }}>Experience</h2>
            <div style={{ position: 'relative', maxWidth: '800px', margin: '0 auto' }}>
                {/* Vertical Line */}
                <div style={{ position: 'absolute', left: '50%', top: 0, bottom: 0, width: '2px', background: 'var(--glass-border)', transform: 'translateX(-50%)' }} />

                {experiences.map((exp, index) => (
                    <motion.div
                        key={exp.id}
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.2 }}
                        style={{
                            display: 'flex',
                            justifyContent: index % 2 === 0 ? 'flex-start' : 'flex-end',
                            marginBottom: '2rem',
                            position: 'relative'
                        }}
                    >
                        {/* Dot on line */}
                        <div style={{
                            position: 'absolute',
                            left: '50%',
                            top: '20px',
                            width: '16px',
                            height: '16px',
                            background: 'var(--accent)',
                            borderRadius: '50%',
                            transform: 'translateX(-50%)',
                            zIndex: 2,
                            boxShadow: '0 0 10px var(--accent)'
                        }} />

                        <div className="glass-card" style={{ width: '45%', position: 'relative' }}>
                            <h3 style={{ fontSize: '1.2rem', color: 'var(--primary)' }}>{exp.role}</h3>
                            <h4 style={{ fontSize: '1rem', marginBottom: '0.5rem' }}>{exp.company}</h4>
                            <p style={{ fontSize: '0.9rem', marginBottom: '0.5rem', color: 'var(--text-muted)' }}>{exp.date}</p>
                            <p>{exp.desc}</p>
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
};

export default Experience;
