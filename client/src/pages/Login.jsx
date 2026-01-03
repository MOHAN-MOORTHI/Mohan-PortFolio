import React, { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [formData, setFormData] = useState({ username: '', password: '' });
    const { login } = useAuth();
    const navigate = useNavigate();
    const [error, setError] = useState('');
    const [isSetup, setIsSetup] = useState(false); // Default, will update on load
    const [loading, setLoading] = useState(true);
    const [success, setSuccess] = useState('');

    // Check if admin exists on load
    React.useEffect(() => {
        const checkSetup = async () => {
            try {
                const res = await axios.get('/api/auth/init');
                // If admin exists (true), we are NOT in setup mode. 
                // If admin does NOT exist (false), we ARE in setup mode.
                setIsSetup(!res.data.adminExists);
            } catch (err) {
                console.error("Failed to check admin status", err);
            } finally {
                setLoading(false);
            }
        };
        checkSetup();
    }, []);

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = async e => {
        e.preventDefault();
        setError('');
        setSuccess('');

        if (isSetup) {
            try {
                const res = await axios.post('/api/auth/register', formData);
                setSuccess('Admin created successfully! Logging you in...');
                // Auto login
                const loginRes = await login(formData.username, formData.password);
                if (loginRes.success) {
                    setTimeout(() => navigate('/admin/dashboard'), 1500);
                }
            } catch (err) {
                setError(err.response?.data?.msg || 'Registration failed');
            }
        } else {
            const res = await login(formData.username, formData.password);
            if (res.success) {
                navigate('/admin/dashboard');
            } else {
                setError(res.error);
            }
        }
    };

    if (loading) return <div className="flex-center" style={{ height: '100vh' }}>Loading...</div>;

    return (
        <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <form onSubmit={onSubmit} className="glass-card" style={{ width: '100%', maxWidth: '400px' }}>
                <h2 style={{ textAlign: 'center', marginBottom: '1rem' }}>{isSetup ? 'Setup Admin Account' : 'Admin Login'}</h2>
                {error && <p style={{ color: 'red', textAlign: 'center', marginBottom: '1rem' }}>{error}</p>}
                {success && <p style={{ color: 'green', textAlign: 'center', marginBottom: '1rem' }}>{success}</p>}

                <div style={{ marginBottom: '1rem' }}>
                    <label style={{ display: 'block', marginBottom: '0.5rem' }}>Username</label>
                    <input
                        type="text"
                        name="username"
                        value={formData.username}
                        onChange={onChange}
                        required
                        style={{ width: '100%', padding: '0.8rem', borderRadius: '4px', border: '1px solid #444', background: '#0f172a', color: 'white' }}
                    />
                </div>
                <div style={{ marginBottom: '2rem' }}>
                    <label style={{ display: 'block', marginBottom: '0.5rem' }}>Password</label>
                    <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={onChange}
                        required
                        style={{ width: '100%', padding: '0.8rem', borderRadius: '4px', border: '1px solid #444', background: '#0f172a', color: 'white' }}
                    />
                </div>
                <button type="submit" className="btn btn-primary" style={{ width: '100%', marginBottom: '1rem' }}>
                    {isSetup ? 'Create Admin' : 'Login'}
                </button>

                {!isSetup && (
                    <p style={{ textAlign: 'center', fontSize: '0.8rem', color: '#666' }}>
                        Default: admin / password123
                    </p>
                )}
            </form>
        </div>
    );
};

export default Login;
