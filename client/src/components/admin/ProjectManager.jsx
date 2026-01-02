import React, { useState, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { FaCloudUploadAlt } from 'react-icons/fa';

const ProjectManager = () => {
    const [projects, setProjects] = useState([]);
    const [form, setForm] = useState({ title: '', description: '', tags: '', liveUrl: '', githubUrl: '', imageUrl: '' });
    const [editingId, setEditingId] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const fetchProjects = async () => {
        try {
            const res = await axios.get('/api/projects');
            setProjects(res.data);
        } catch (err) {
            console.error(err);
            toast.error('Failed to fetch projects');
        }
    };

    useEffect(() => {
        fetchProjects();
    }, []);

    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (isSubmitting) return;

        setIsSubmitting(true);
        const loadingToast = toast.loading(editingId ? 'Updating Project...' : 'Adding Project...');
        const projectData = { ...form, tags: form.tags.split(',').map(tag => tag.trim()) };

        try {
            if (editingId) {
                await axios.put(`/api/projects/${editingId}`, projectData);
                toast.success('Project updated successfully!', { id: loadingToast });
            } else {
                await axios.post('/api/projects', projectData);
                toast.success('Project added successfully!', { id: loadingToast });
            }
            setForm({ title: '', description: '', tags: '', liveUrl: '', githubUrl: '', imageUrl: '' });
            setEditingId(null);
            fetchProjects();
        } catch (err) {
            console.error(err);
            toast.error('Error saving project', { id: loadingToast });
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleEdit = (project) => {
        setForm({
            ...project,
            tags: project.tags.join(', ')
        });
        setEditingId(project._id);
        toast('Edit mode enabled', { icon: '✏️' });
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this project?')) {
            const loadingToast = toast.loading('Deleting...');
            try {
                await axios.delete(`/api/projects/${id}`);
                toast.success('Project deleted', { id: loadingToast });
                fetchProjects();
            } catch (err) {
                console.error(err);
                toast.error('Failed to delete project', { id: loadingToast });
            }
        }
    };

    const handleFileChange = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const formData = new FormData();
        formData.append('file', file);

        const loadingToast = toast.loading('Uploading image...');
        try {
            const res = await axios.post('/api/upload', formData, {
                headers: { 'Content-Type': 'multipart/form-data', 'x-auth-token': localStorage.getItem('token') }
            });
            setForm({ ...form, imageUrl: res.data.filePath });
            toast.success('Image uploaded!', { id: loadingToast });
        } catch (err) {
            console.error(err);
            toast.error('File upload failed', { id: loadingToast });
        }
    };

    return (
        <div>
            <h3>Manage Projects</h3>
            <form onSubmit={handleSubmit} className="glass-card" style={{ marginBottom: '2rem' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                    <input name="title" value={form.title} onChange={handleChange} placeholder="Title" required style={inputStyle} />

                    {/* Image Upload */}
                    <div>
                        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', marginBottom: '0.5rem' }}>
                            <label className="btn" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)', padding: '0.5rem 1rem', borderRadius: '4px', color: 'white' }}>
                                <FaCloudUploadAlt /> Choose Image
                                <input type="file" onChange={handleFileChange} style={{ display: 'none' }} />
                            </label>
                            <span style={{ fontSize: '0.8rem', color: 'gray' }}>{form.imageUrl ? 'Image Selected' : 'No file chosen'}</span>
                        </div>
                        <input name="imageUrl" value={form.imageUrl} onChange={handleChange} placeholder="Or Image URL" style={inputStyle} />
                    </div>

                    <input name="liveUrl" value={form.liveUrl} onChange={handleChange} placeholder="Live URL" style={inputStyle} />
                    <input name="githubUrl" value={form.githubUrl} onChange={handleChange} placeholder="GitHub URL" style={inputStyle} />
                    <input name="tags" value={form.tags} onChange={handleChange} placeholder="Tags (comma separated)" style={inputStyle} />
                </div>
                <textarea name="description" value={form.description} onChange={handleChange} placeholder="Description" required rows="3" style={{ ...inputStyle, width: '100%', marginTop: '1rem' }} />
                <button type="submit" className="btn btn-primary" style={{ marginTop: '1rem' }} disabled={isSubmitting}>
                    {isSubmitting ? 'Saving...' : (editingId ? 'Update' : 'Add')} Project
                </button>
                {editingId && <button type="button" onClick={() => { setEditingId(null); setForm({ title: '', description: '', tags: '', liveUrl: '', githubUrl: '', imageUrl: '' }); }} className="btn" style={{ marginLeft: '1rem', border: '1px solid #666' }}>Cancel</button>}
            </form>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1rem' }}>
                {projects.map(p => (
                    <div key={p._id} className="glass" style={{ padding: '1rem', borderRadius: '8px' }}>
                        <h4>{p.title}</h4>
                        <p style={{ fontSize: '0.8rem' }}>{p.description.substring(0, 50)}...</p>
                        <div style={{ marginTop: '1rem' }}>
                            <button onClick={() => handleEdit(p)} className="btn" style={{ fontSize: '0.8rem', marginRight: '0.5rem', background: '#3b82f6', color: 'white' }}>Edit</button>
                            <button onClick={() => handleDelete(p._id)} className="btn" style={{ fontSize: '0.8rem', background: '#ef4444', color: 'white' }}>Delete</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

const inputStyle = {
    padding: '0.8rem',
    borderRadius: '4px',
    border: '1px solid #444',
    background: '#1e293b',
    color: 'white',
    width: '100%'
};

export default ProjectManager;
