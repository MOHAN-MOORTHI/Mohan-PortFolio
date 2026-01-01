import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';

const Skills = () => {
    const [skills, setSkills] = useState([]);

    useEffect(() => {
        const fetchSkills = async () => {
            try {
                const res = await axios.get('/api/skills');
                setSkills(res.data);
            } catch (err) {
                console.error("Failed to fetch skills", err);
            }
        };
        fetchSkills();
    }, []);

    return (
        <section id="skills" className="section">
            <motion.h2
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                style={{ textAlign: 'center', marginBottom: '3rem' }}
            >
                Technical Skills
            </motion.h2>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem' }}>
                {skills.map((skill, index) => (
                    <motion.div
                        key={skill._id}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="glass-card"
                        style={{ padding: '1.5rem' }}
                    >
                        <div className="flex-between" style={{ marginBottom: '0.5rem' }}>
                            <span style={{ fontWeight: 'bold', fontSize: '1.1rem' }}>{skill.name}</span>
                            <span style={{ color: 'var(--accent)' }}>{skill.level}%</span>
                        </div>
                        <div style={{ width: '100%', height: '10px', background: 'rgba(255,255,255,0.1)', borderRadius: '5px', overflow: 'hidden' }}>
                            <motion.div
                                initial={{ width: 0 }}
                                whileInView={{ width: `${skill.level}%` }}
                                transition={{ duration: 1, ease: 'easeOut' }}
                                style={{ height: '100%', background: 'linear-gradient(90deg, var(--primary), var(--accent))' }}
                            />
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
};

export default Skills;
