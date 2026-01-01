import React, { useState } from 'react';
import axios from 'axios';

const Contact = () => {
    const [form, setForm] = useState({ name: '', email: '', message: '' });
    const [status, setStatus] = useState('');

    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('Sending...');
        try {
            await axios.post('/api/contact', form);
            setStatus('Message Sent! I will get back to you soon.');
            setForm({ name: '', email: '', message: '' });
        } catch (err) {
            setStatus('Failed to send message.');
        }
    };

    return (
        <section id="contact" className="section">
            <h2 style={{ textAlign: 'center', marginBottom: '2rem' }}>Contact Me</h2>
            <div className="glass-card" style={{ maxWidth: '600px', margin: '0 auto' }}>
                <form onSubmit={handleSubmit}>
                    <div style={{ marginBottom: '1rem' }}>
                        <label style={{ display: 'block', marginBottom: '0.5rem' }}>Name</label>
                        <input
                            type="text"
                            name="name"
                            value={form.name}
                            onChange={handleChange}
                            required
                            style={{ width: '100%', padding: '0.8rem', borderRadius: '4px', border: '1px solid #444', background: '#0f172a', color: 'white' }}
                        />
                    </div>
                    <div style={{ marginBottom: '1rem' }}>
                        <label style={{ display: 'block', marginBottom: '0.5rem' }}>Email</label>
                        <input
                            type="email"
                            name="email"
                            value={form.email}
                            onChange={handleChange}
                            required
                            style={{ width: '100%', padding: '0.8rem', borderRadius: '4px', border: '1px solid #444', background: '#0f172a', color: 'white' }}
                        />
                    </div>
                    <div style={{ marginBottom: '1rem' }}>
                        <label style={{ display: 'block', marginBottom: '0.5rem' }}>Message</label>
                        <textarea
                            name="message"
                            value={form.message}
                            onChange={handleChange}
                            required
                            rows="5"
                            style={{ width: '100%', padding: '0.8rem', borderRadius: '4px', border: '1px solid #444', background: '#0f172a', color: 'white' }}
                        ></textarea>
                    </div>
                    <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>Send Message</button>
                    {status && <p style={{ marginTop: '1rem', textAlign: 'center', color: status.includes('Sent') ? 'green' : 'red' }}>{status}</p>}
                </form>
            </div>
        </section>
    );
};

export default Contact;
