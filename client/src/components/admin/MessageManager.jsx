import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaTrash } from 'react-icons/fa';

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
                            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                <small style={{ color: 'var(--text-muted)' }}>{new Date(msg.date).toLocaleDateString()}</small>
                                <button onClick={() => handleDelete(msg._id)} className="btn" style={{ color: '#ef4444', padding: '0.4rem', borderRadius: '50%', background: 'rgba(239, 68, 68, 0.1)' }}>
                                    <FaTrash />
                                </button>
                            </div>
                        </div>
                        <p style={{ fontSize: '0.9rem', color: 'var(--accent)', marginBottom: '0.5rem' }}>{msg.email}</p>
                        <p style={{ background: 'rgba(0,0,0,0.2)', padding: '0.5rem', borderRadius: '4px' }}>{msg.message}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MessageManager;
