import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';
import { FaTrash, FaAward } from 'react-icons/fa';
import toast from 'react-hot-toast';

const CertificationManager = () => {
    const { token } = useAuth();
    const [certs, setCerts] = useState([]);
    const [form, setForm] = useState({ name: '', issuer: '', date: '', link: '', description: '' });

    useEffect(() => {
        fetchCerts();
    }, []);

    const fetchCerts = async () => {
        try {
            const res = await axios.get('/api/certifications');
            setCerts(res.data);
        } catch (err) {
            console.error(err);
            toast.error('Failed to fetch certifications');
        }
    };

    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        const loadingToast = toast.loading('Adding Certification...');
        try {
            await axios.post('/api/certifications', form, { headers: { 'x-auth-token': token } });
            setForm({ name: '', issuer: '', date: '', link: '', description: '' });
            toast.success('Certification added!', { id: loadingToast });
            fetchCerts();
        } catch (err) {
            console.error(err);
            toast.error('Failed to add certification', { id: loadingToast });
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Delete this certification?')) return;
        const loadingToast = toast.loading('Deleting...');
        try {
            await axios.delete(`/api/certifications/${id}`, { headers: { 'x-auth-token': token } });
            toast.success('Certification deleted', { id: loadingToast });
            fetchCerts();
        } catch (err) {
            console.error(err);
            toast.error('Failed to delete', { id: loadingToast });
        }
    };

    return (
        <div>
            <h3>Manage Certifications</h3>

            <form onSubmit={handleSubmit} className="glass-card" style={{ marginBottom: '2rem' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                    <input type="text" name="name" placeholder="Certificate Name" value={form.name} onChange={handleChange} required style={inputStyle} />
                    <input type="text" name="issuer" placeholder="Issuing Organization" value={form.issuer} onChange={handleChange} required style={inputStyle} />
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                    <input type="text" name="date" placeholder="Date (e.g. Dec 2023)" value={form.date} onChange={handleChange} required style={inputStyle} />
                    <input type="text" name="link" placeholder="Credential URL (Optional)" value={form.link} onChange={handleChange} style={inputStyle} />
                </div>
                <div style={{ marginBottom: '1rem' }}>
                    <textarea name="description" placeholder="Short description..." value={form.description} onChange={handleChange} rows="2" style={inputStyle} />
                </div>
                <button type="submit" className="btn btn-primary">Add Certification</button>
            </form>

            <div style={{ display: 'grid', gap: '1rem' }}>
                {certs.map((cert) => (
                    <div key={cert._id} className="glass-card flex-between">
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                            <div style={{ padding: '0.8rem', background: 'rgba(99, 102, 241, 0.1)', borderRadius: '12px', color: 'var(--primary)', fontSize: '1.2rem' }}>
                                <FaAward />
                            </div>
                            <div>
                                <h4>{cert.name}</h4>
                                <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>{cert.issuer} • {cert.date}</p>
                            </div>
                        </div>
                        <button onClick={() => handleDelete(cert._id)} className="btn" style={{ color: '#ef4444' }}>
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

export default CertificationManager;
