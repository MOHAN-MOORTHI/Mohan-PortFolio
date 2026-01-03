import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [token, setToken] = useState(localStorage.getItem('token'));

    useEffect(() => {
        if (token) {
            axios.defaults.headers.common['x-auth-token'] = token;
            // Ideally fetch user details here if needed, but for now just persisting session
            // For this simplified version, we assume valid if token exists
            setLoading(false);
        } else {
            delete axios.defaults.headers.common['x-auth-token'];
            setLoading(false);
        }
    }, [token]);

    const login = async (username, password) => {
        try {
            const res = await axios.post('/api/auth/login', { username, password });
            localStorage.setItem('token', res.data.token);
            // Immediately set legacy header for subsequent requests in this session
            axios.defaults.headers.common['x-auth-token'] = res.data.token;
            setToken(res.data.token);
            setUser(res.data.user);
            return { success: true };
        } catch (err) {
            return { success: false, error: err.response?.data?.msg || 'Login failed' };
        }
    };

    const logout = () => {
        localStorage.removeItem('token');
        setToken(null);
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, token, login, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
