import React, { useState, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { FaTrash } from 'react-icons/fa';

const SkillManager = () => {
    const [skills, setSkills] = useState([]);
    const [form, setForm] = useState({ name: '', level: 50, category: 'Other', icon: '' });

    const fetchSkills = async () => {
        try {
            const res = await axios.get('/api/skills');
            setSkills(res.data);
        } catch (err) {
            console.error(err);
            toast.error('Failed to fetch skills');
        }
    };

    useEffect(() => {
        fetchSkills();
    }, []);

    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        const loadingToast = toast.loading('Adding Skill...');
        try {
            await axios.post('/api/skills', form);
            setForm({ name: '', level: 50, category: 'Other', icon: '' });
            toast.success('Skill added!', { id: loadingToast });
            fetchSkills();
        } catch (err) {
            console.error(err);
            toast.error('Failed to add skill', { id: loadingToast });
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Delete skill?')) return;

        try {
            await axios.delete(`/api/skills/${id}`);
            toast.success('Skill deleted');
            fetchSkills();
        } catch (err) {
            console.error(err);
            toast.error('Failed to delete skill');
        }
    };

    return (
        <div>
            <h3>Manage Skills</h3>
            <form onSubmit={handleSubmit} className="glass-card" style={{ marginBottom: '2rem', display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'end' }}>
                <div style={{ flex: 1 }}>
                    <label style={{ display: 'block', fontSize: '0.8rem' }}>Name</label>
                    <input name="name" value={form.name} onChange={handleChange} required style={inputStyle} />
                </div>
                <div style={{ width: '100px' }}>
                    <label style={{ display: 'block', fontSize: '0.8rem' }}>Level (%)</label>
                    <input type="number" name="level" value={form.level} onChange={handleChange} min="1" max="100" style={inputStyle} />
                </div>
                <div style={{ flex: 1 }}>
                    <label style={{ display: 'block', fontSize: '0.8rem' }}>Category</label>
                    <select name="category" value={form.category} onChange={handleChange} style={inputStyle}>
                        {['Frontend', 'Backend', 'Tools', 'Other'].map(c => <option key={c} value={c}>{c}</option>)}
                    </select>
                </div>
                <button type="submit" className="btn btn-primary" style={{ height: '42px' }}>Add</button>
            </form>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                {skills.map(s => (
                    <div key={s._id} style={{ background: '#334155', padding: '0.5rem 1rem', borderRadius: '20px', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <span>{s.name} ({s.level}%)</span>
                        <button onClick={() => handleDelete(s._id)} style={{ background: 'none', border: 'none', color: '#f87171', cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
                            <FaTrash />
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

const inputStyle = {
    padding: '0.6rem',
    borderRadius: '4px',
    border: '1px solid #444',
    background: '#1e293b',
    color: 'white',
    width: '100%'
};

export default SkillManager;
