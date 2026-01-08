import { useState, useEffect, useCallback } from 'react';

const ContactViewer = ({ token }) => {
    const [messages, setMessages] = useState([]);

    const fetchMessages = useCallback(() => {
        fetch('/api/contact', {
            headers: { 'Authorization': `Bearer ${token}` }
        })
            .then(res => res.json())
            .then(data => {
                if (Array.isArray(data)) setMessages(data);
            })
            .catch(err => console.error(err));
    }, [token]);

    useEffect(() => {
        fetchMessages();
    }, [fetchMessages]);

    const handleDeleteMessage = async (id) => {
        if (!window.confirm('Are you sure you want to delete this message?')) return;
        try {
            const res = await fetch(`/api/contact/${id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            if (res.ok) {
                fetchMessages();
            } else {
                alert('Failed to delete message');
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="bg-white/5 p-8 rounded-2xl border border-white/10 backdrop-blur-xl">
            <h2 className="text-2xl font-bold mb-6 text-white">Inbox ({messages.length})</h2>
            <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2 custom-scrollbar">
                {messages.length === 0 ? (
                    <p className="text-gray-400 text-center py-10">No messages yet.</p>
                ) : (
                    messages.map(msg => (
                        <div key={msg._id} className="bg-dark-bg p-6 rounded-lg border border-white/5 space-y-2">
                            <div className="flex justify-between items-start">
                                <div>
                                    <h3 className="font-bold text-white text-lg">{msg.subject || 'No Subject'}</h3>
                                    <p className="text-secondary text-sm">{msg.name} ({msg.email})</p>
                                    <p className="text-gray-500 text-xs">{new Date(msg.createdAt).toLocaleString()}</p>
                                </div>
                                <button
                                    onClick={() => handleDeleteMessage(msg._id)}
                                    className="text-red-400 hover:text-red-300 text-sm border border-red-500/30 px-3 py-1 rounded"
                                >
                                    Delete
                                </button>
                            </div>
                            <div className="bg-black/20 p-4 rounded mt-4 text-gray-300 whitespace-pre-wrap">
                                {msg.message}
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default ContactViewer;
