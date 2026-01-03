import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { Toaster } from 'react-hot-toast';

// Lazy Load Pages for performance optimization
// These components are loaded only when needed to reduce initial bundle size
const Home = lazy(() => import('./pages/Home'));
const Login = lazy(() => import('./pages/Login'));
const Dashboard = lazy(() => import('./pages/Dashboard'));

// Protected Route Component
// Checks if user is authenticated before rendering the Dashboard
const AdminRoute = ({ children }) => {
    const { token, loading } = useAuth();
    if (loading) return <div>Loading...</div>;
    return token ? children : <Navigate to="/admin" />;
};

function App() {
    return (
        // AuthProvider wraps the app to provide authentication state globally
        <AuthProvider>
            <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
                <div className="App">
                    {/* Toast notifications configuration */}
                    <Toaster position="top-right" toastOptions={{
                        style: {
                            background: '#1e293b',
                            color: '#fff',
                            border: '1px solid rgba(255,255,255,0.1)',
                        },
                    }} />

                    {/* Suspense handles the loading state for lazy-loaded components */}
                    <Suspense fallback={
                        <div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#0f172a', color: 'white' }}>
                            Loading...
                        </div>
                    }>
                        <Routes>
                            {/* Public Routes */}
                            <Route path="/" element={<Home />} />
                            <Route path="/admin" element={<Login />} />

                            {/* Protected Admin Routes */}
                            <Route path="/admin/dashboard" element={<AdminRoute><Dashboard /></AdminRoute>} />
                        </Routes>
                    </Suspense>
                </div>
            </Router>
        </AuthProvider>
    );
}

export default App;
