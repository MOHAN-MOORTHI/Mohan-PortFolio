import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import ProjectManager from '../components/admin/ProjectManager';
import SkillManager from '../components/admin/SkillManager';
import MessageManager from '../components/admin/MessageManager';

const Dashboard = () => {
    const { logout, user } = useAuth();
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('projects');

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    return (
        <div style={{ minHeight: '100vh', padding: '2rem' }}>
            <div className="flex-between" style={{ marginBottom: '2rem', borderBottom: '1px solid var(--glass-border)', paddingBottom: '1rem' }}>
                <h2>Welcome, {user?.username}</h2>
                <button onClick={handleLogout} className="btn" style={{ border: '1px solid #ef4444', color: '#ef4444' }}>Logout</button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '200px 1fr', gap: '2rem' }}>
                <aside className="glass-card" style={{ height: 'fit-content', padding: '1rem' }}>
                    <ul style={{ listStyle: 'none' }}>
                        <li style={{ marginBottom: '1rem' }}>
                            <button
                                onClick={() => setActiveTab('projects')}
                                style={{ ...tabBtnStyle, color: activeTab === 'projects' ? 'var(--primary)' : 'white' }}
                            >
                                Projects
                            </button>
                        </li>
                        <li style={{ marginBottom: '1rem' }}>
                            <button
                                onClick={() => setActiveTab('skills')}
                                style={{ ...tabBtnStyle, color: activeTab === 'skills' ? 'var(--primary)' : 'white' }}
                            >
                                Skills
                            </button>
                        </li>
                        <li>
                            <button
                                onClick={() => setActiveTab('messages')}
                                style={{ ...tabBtnStyle, color: activeTab === 'messages' ? 'var(--primary)' : 'white' }}
                            >
                                Messages
                            </button>
                        </li>
                    </ul>
                </aside>

                <main>
                    {activeTab === 'projects' && <ProjectManager />}
                    {activeTab === 'skills' && <SkillManager />}
                    {activeTab === 'messages' && <MessageManager />}
                </main>
            </div>
        </div>
    );
};

const tabBtnStyle = {
    background: 'none',
    border: 'none',
    fontSize: '1.2rem',
    cursor: 'pointer',
    textAlign: 'left',
    width: '100%'
};

export default Dashboard;
