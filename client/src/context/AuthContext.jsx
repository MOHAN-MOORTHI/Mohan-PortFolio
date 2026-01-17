import { createContext, useState, useContext } from 'react';
import authService from '../services/authService';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(() => authService.getCurrentUser());
    const loading = false;

    const login = async (username, password) => {
        const data = await authService.login(username, password);
        setCurrentUser(data.user);
        return data;
    };

    const logout = () => {
        authService.logout();
        setCurrentUser(null);
    };

    return (
        <AuthContext.Provider value={{ currentUser, login, logout, loading }}>
            {!loading && children}
        </AuthContext.Provider>
    );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => useContext(AuthContext);
