import React, { useEffect, useState } from 'react';
import axios from 'axios';

const MessageManager = () => {
    const [messages, setMessages] = useState([]);

    const fetchMessages = async () => {
        try {
            const res = await axios.get('/api/contact');
            setMessages(res.data);
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        fetchMessages();
    }, []);

    const handleDelete = async (id) => {
        if (window.confirm('Delete this message?')) {
            try {
                await axios.delete(`/api/contact/${id}`);
                fetchMessages();
            } catch (err) {
                console.error(err);
            }
        }
    };

    return (
        <div>
            <h3>Messages</h3>
            <div style={{ display: 'grid', gap: '1rem' }}>
                {messages.length === 0 ? <p>No messages yet.</p> : messages.map(msg => (
                    <div key={msg._id} className="glass" style={{ padding: '1rem', borderRadius: '8px' }}>
                        <div className="flex-between">
                            <h4 style={{ color: 'var(--primary)' }}>{msg.name}</h4>
                            <small style={{ color: 'var(--text-muted)' }}>{new Date(msg.date).toLocaleDateString()}</small>
                        </div>
                        <p style={{ fontSize: '0.9rem', color: 'var(--accent)', marginBottom: '0.5rem' }}>{msg.email}</p>
                        <p style={{ background: 'rgba(0,0,0,0.2)', padding: '0.5rem', borderRadius: '4px' }}>{msg.message}</p>
                        <button onClick={() => handleDelete(msg._id)} className="btn" style={{ fontSize: '0.8rem', marginTop: '0.5rem', background: '#ef4444', color: 'white', padding: '0.3rem 0.8rem' }}>Delete</button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MessageManager;
