import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';
import { FaTrash } from 'react-icons/fa';

const ExperienceManager = () => {
    const { token } = useAuth();
    const [experiences, setExperiences] = useState([]);
    const [form, setForm] = useState({ role: '', company: '', duration: '', description: '' });

    useEffect(() => {
        fetchExperiences();
    }, []);

    const fetchExperiences = async () => {
        try {
            const res = await axios.get('/api/experience');
            setExperiences(res.data);
        } catch (err) {
            console.error(err);
        }
    };

    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('/api/experience', form, { headers: { 'x-auth-token': token } });
            setForm({ role: '', company: '', duration: '', description: '' });
            fetchExperiences();
        } catch (err) {
            console.error(err);
        }
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`/api/experience/${id}`, { headers: { 'x-auth-token': token } });
            fetchExperiences();
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div>
            <h3>Manage Experience</h3>

            {/* Add Experience Form */}
            <form onSubmit={handleSubmit} className="glass-card" style={{ marginBottom: '2rem' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                    <input type="text" name="role" placeholder="Role (e.g. Frontend Dev)" value={form.role} onChange={handleChange} required style={inputStyle} />
                    <input type="text" name="company" placeholder="Company Name" value={form.company} onChange={handleChange} required style={inputStyle} />
                </div>
                <div style={{ marginBottom: '1rem' }}>
                    <input type="text" name="duration" placeholder="Duration (e.g. Jan 2023 - Present)" value={form.duration} onChange={handleChange} required style={inputStyle} />
                </div>
                <div style={{ marginBottom: '1rem' }}>
                    <textarea name="description" placeholder="Description of responsibilities..." value={form.description} onChange={handleChange} required rows="3" style={inputStyle} />
                </div>
                <button type="submit" className="btn btn-primary">Add Experience</button>
            </form>

            {/* List of Experiences */}
            <div style={{ display: 'grid', gap: '1rem' }}>
                {experiences.map((exp) => (
                    <div key={exp._id} className="glass-card flex-between">
                        <div>
                            <h4>{exp.role} @ {exp.company}</h4>
                            <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>{exp.duration}</p>
                            <p style={{ fontSize: '0.9rem', marginTop: '0.5rem' }}>{exp.description}</p>
                        </div>
                        <button onClick={() => handleDelete(exp._id)} className="btn" style={{ color: '#ef4444' }}>
                            <FaTrash />
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

const inputStyle = {
    width: '100%',
    padding: '0.8rem',
    borderRadius: '4px',
    border: '1px solid #444',
    background: '#0f172a',
    color: 'white'
};

export default ExperienceManager;
