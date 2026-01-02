import React, { useState, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { FaCloudUploadAlt } from 'react-icons/fa';

const AboutManager = () => {
    const [form, setForm] = useState({
        bio: '', imageUrl: '', resumeUrl: '',
        github: '', linkedin: '', twitter: '', whatsapp: '', facebook: '', mobile: '', email: '',
        contactBtnText: 'Contact Me', viewProjectsBtnText: 'View Projects',
        heroHeadline: '', heroSubHeadline: '', heroDescription: ''
    });

    useEffect(() => {
        const fetchAbout = async () => {
            try {
                const res = await axios.get('/api/about');
                if (res.data) setForm({
                    bio: res.data.bio || '',
                    imageUrl: res.data.imageUrl || '',
                    resumeUrl: res.data.resumeUrl || '',
                    github: res.data.github || '',
                    linkedin: res.data.linkedin || '',
                    twitter: res.data.twitter || '',
                    whatsapp: res.data.whatsapp || '',
                    facebook: res.data.facebook || '',
                    mobile: res.data.mobile || '',
                    email: res.data.email || '',
                    contactBtnText: res.data.contactBtnText || 'Contact Me',
                    viewProjectsBtnText: res.data.viewProjectsBtnText || 'View Projects',
                    heroHeadline: res.data.heroHeadline || "Hi, I'm Mohan",
                    heroSubHeadline: res.data.heroSubHeadline || "Full Stack Developer",
                    heroDescription: res.data.heroDescription || "Building futuristic, scalable, and responsive web applications with the MERN stack."
                });
            } catch (err) {
                console.error(err);
                toast.error('Failed to fetch About data');
            }
        };
        fetchAbout();
    }, []);

    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        const loadingToast = toast.loading('Saving...');
        try {
            await axios.post('/api/about', form);
            toast.success('About section updated!', { id: loadingToast });
        } catch (err) {
            toast.error('Failed to update.', { id: loadingToast });
            console.error(err);
        }
    };

    // functions
    const uploadFile = async (e, field) => {
        const file = e.target.files[0];
        if (!file) return;

        const formData = new FormData();
        formData.append('file', file);

        const loadingToast = toast.loading('Uploading...');
        try {
            const res = await axios.post('/api/upload', formData, {
                headers: { 'Content-Type': 'multipart/form-data', 'x-auth-token': localStorage.getItem('token') }
            });
            setForm(prev => ({ ...prev, [field]: res.data.filePath }));
            toast.success('Upload successful!', { id: loadingToast });
        } catch (err) {
            console.error(err);
            toast.error('Upload failed.', { id: loadingToast });
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

                {/* Profile Image Upload */}
                <div style={{ marginBottom: '1rem' }}>
                    <label style={{ display: 'block', marginBottom: '0.5rem' }}>Profile Image</label>
                    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', marginBottom: '0.5rem' }}>
                        <label className="btn" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)', padding: '0.5rem 1rem', borderRadius: '4px', color: 'white' }}>
                            <FaCloudUploadAlt /> Upload Image
                            <input type="file" onChange={(e) => uploadFile(e, 'imageUrl')} style={{ display: 'none' }} />
                        </label>
                        <span style={{ fontSize: '0.8rem', color: 'gray' }}>{form.imageUrl ? 'Image Selected' : 'No file chosen'}</span>
                    </div>
                    <input
                        type="text"
                        name="imageUrl"
                        value={form.imageUrl}
                        onChange={handleChange}
                        placeholder="Or Image URL"
                        style={{ width: '100%', padding: '0.8rem', borderRadius: '4px', border: '1px solid #444', background: '#0f172a', color: 'white' }}
                    />
                </div>

                {/* Resume Upload */}
                <div style={{ marginBottom: '1rem' }}>
                    <label style={{ display: 'block', marginBottom: '0.5rem' }}>Resume (PDF)</label>
                    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', marginBottom: '0.5rem' }}>
                        <label className="btn" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)', padding: '0.5rem 1rem', borderRadius: '4px', color: 'white' }}>
                            <FaCloudUploadAlt /> Upload Resume
                            <input type="file" onChange={(e) => uploadFile(e, 'resumeUrl')} style={{ display: 'none' }} />
                        </label>
                        <span style={{ fontSize: '0.8rem', color: 'gray' }}>{form.resumeUrl ? 'Resume Selected' : 'No file chosen'}</span>
                    </div>
                    <input
                        type="text"
                        name="resumeUrl"
                        value={form.resumeUrl}
                        onChange={handleChange}
                        placeholder="Or Resume URL"
                        style={{ width: '100%', padding: '0.8rem', borderRadius: '4px', border: '1px solid #444', background: '#0f172a', color: 'white' }}
                    />
                </div>

                <h4 style={{ marginBottom: '1rem', borderBottom: '1px solid #444', paddingBottom: '0.5rem' }}>Social Links</h4>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                    <input name="github" value={form.github} onChange={handleChange} placeholder="GitHub URL" style={inputStyle} />
                    <input name="linkedin" value={form.linkedin} onChange={handleChange} placeholder="LinkedIn URL" style={inputStyle} />
                    <input name="twitter" value={form.twitter} onChange={handleChange} placeholder="Twitter (X) URL" style={inputStyle} />
                    <input name="whatsapp" value={form.whatsapp} onChange={handleChange} placeholder="WhatsApp URL" style={inputStyle} />
                    <input name="email" value={form.email} onChange={handleChange} placeholder="Email Address (mailto: will be added automatically)" style={inputStyle} />
                    <input name="facebook" value={form.facebook} onChange={handleChange} placeholder="Facebook URL" style={inputStyle} />
                    <input name="mobile" value={form.mobile} onChange={handleChange} placeholder="Mobile Number (tel:)" style={inputStyle} />
                </div>

                <h4 style={{ marginBottom: '1rem', borderBottom: '1px solid #444', paddingBottom: '0.5rem', marginTop: '1rem' }}>Hero Section Customization</h4>
                <div style={{ marginBottom: '1rem' }}>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem' }}>Main Headline (e.g., Hi, I'm Mohan)</label>
                    <input name="heroHeadline" value={form.heroHeadline} onChange={handleChange} style={inputStyle} />
                </div>
                <div style={{ marginBottom: '1rem' }}>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem' }}>Sub Headline (e.g., Full Stack Developer)</label>
                    <input name="heroSubHeadline" value={form.heroSubHeadline} onChange={handleChange} style={inputStyle} />
                </div>
                <div style={{ marginBottom: '1rem' }}>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem' }}>Description</label>
                    <textarea name="heroDescription" value={form.heroDescription} onChange={handleChange} rows="3" style={inputStyle} />
                </div>

                <h4 style={{ marginBottom: '1rem', borderBottom: '1px solid #444', paddingBottom: '0.5rem', marginTop: '1rem' }}>Button Customization</h4>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                    <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem' }}>"View Projects" Button Text</label>
                        <input name="viewProjectsBtnText" value={form.viewProjectsBtnText} onChange={handleChange} placeholder="View Projects" style={inputStyle} />
                    </div>
                    <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.9rem' }}>"Contact Me" Button Text</label>
                        <input name="contactBtnText" value={form.contactBtnText} onChange={handleChange} placeholder="Contact Me" style={inputStyle} />
                    </div>
                </div>
                <div style={{ marginBottom: '1rem' }}></div>
                <button type="submit" className="btn btn-primary">Save Changes</button>
            </form>
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

export default AboutManager;
