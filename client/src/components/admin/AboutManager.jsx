import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AboutManager = () => {
    const [form, setForm] = useState({ bio: '', imageUrl: '', resumeUrl: '' });
    const [status, setStatus] = useState('');

    useEffect(() => {
        const fetchAbout = async () => {
            try {
                const res = await axios.get('/api/about');
                if (res.data) setForm({
                    bio: res.data.bio || '',
                    imageUrl: res.data.imageUrl || '',
                    resumeUrl: res.data.resumeUrl || ''
                });
            } catch (err) {
                console.error(err);
            }
        };
        fetchAbout();
    }, []);

    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('Saving...');
        try {
            await axios.post('/api/about', form);
            setStatus('About section updated!');
        } catch (err) {
            setStatus('Failed to update.');
            console.error(err);
        }
    };

    // functions
    const uploadFile = async (e, field) => {
        const file = e.target.files[0];
        if (!file) return;

        const formData = new FormData();
        formData.append('file', file);

        try {
            setStatus('Uploading...');
            const res = await axios.post('/api/upload', formData, {
                headers: { 'Content-Type': 'multipart/form-data', 'x-auth-token': localStorage.getItem('token') }
            });
            setForm(prev => ({ ...prev, [field]: res.data.filePath }));
            setStatus('Upload successful!');
        } catch (err) {
            console.error(err);
            setStatus('Upload failed.');
        }
    };

    return (
        <div>
            <h3>Manage About Section</h3>
            <form onSubmit={handleSubmit} className="glass-card">
                <div style={{ marginBottom: '1rem' }}>
                    <label style={{ display: 'block', marginBottom: '0.5rem' }}>Bio</label>
                    <textarea
                        name="bio"
                        value={form.bio}
                        onChange={handleChange}
                        rows="5"
                        style={{ width: '100%', padding: '0.8rem', borderRadius: '4px', border: '1px solid #444', background: '#0f172a', color: 'white' }}
                    />
                </div>
                <div style={{ marginBottom: '1rem' }}>
                    <label style={{ display: 'block', marginBottom: '0.5rem' }}>Profile Image</label>
                    <input type="file" onChange={(e) => uploadFile(e, 'imageUrl')} style={{ marginBottom: '0.5rem', color: 'white' }} />
                    <input
                        type="text"
                        name="imageUrl"
                        value={form.imageUrl}
                        onChange={handleChange}
                        placeholder="Or Image URL"
                        style={{ width: '100%', padding: '0.8rem', borderRadius: '4px', border: '1px solid #444', background: '#0f172a', color: 'white' }}
                    />
                </div>
                <div style={{ marginBottom: '1rem' }}>
                    <label style={{ display: 'block', marginBottom: '0.5rem' }}>Resume (PDF)</label>
                    <input type="file" onChange={(e) => uploadFile(e, 'resumeUrl')} style={{ marginBottom: '0.5rem', color: 'white' }} />
                    <input
                        type="text"
                        name="resumeUrl"
                        value={form.resumeUrl}
                        onChange={handleChange}
                        placeholder="Or Resume URL"
                        style={{ width: '100%', padding: '0.8rem', borderRadius: '4px', border: '1px solid #444', background: '#0f172a', color: 'white' }}
                    />
                </div>
                <button type="submit" className="btn btn-primary">Save Changes</button>
                {status && <p style={{ marginTop: '1rem', color: status.includes('Failed') ? 'red' : 'green' }}>{status}</p>}
            </form>
        </div>
    );
};

export default AboutManager;
