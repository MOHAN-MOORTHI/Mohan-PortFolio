import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { FaSignOutAlt, FaHome, FaUser, FaCode, FaCertificate, FaBriefcase, FaEnvelope, FaLayerGroup, FaLink } from 'react-icons/fa';
import HeroEditor from '../components/admin/HeroEditor';
import AboutEditor from '../components/admin/AboutEditor';
import SkillsEditor from '../components/admin/SkillsEditor';
import CertificationsEditor from '../components/admin/CertificationsEditor';
import ContactViewer from '../components/admin/ContactViewer';
import ExperienceEditor from '../components/admin/ExperienceEditor';
import ProjectsEditor from '../components/admin/ProjectsEditor';
import FooterEditor from '../components/admin/FooterEditor';

const AdminDashboard = () => {
    const navigate = useNavigate();
    const { logout, currentUser } = useAuth();
    const [activeTab, setActiveTab] = useState('projects');

    useEffect(() => {
        if (!currentUser) {
            navigate('/login');
        }
    }, [currentUser, navigate]);

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    const sidebarItems = [
        { id: 'hero', label: 'Hero Section', icon: <FaHome /> },
        { id: 'about', label: 'About Me', icon: <FaUser /> },
        { id: 'skills', label: 'Skills', icon: <FaCode /> },
        { id: 'experience', label: 'Experience', icon: <FaBriefcase /> },
        { id: 'certifications', label: 'Certifications', icon: <FaCertificate /> },
        { id: 'projects', label: 'Projects', icon: <FaLayerGroup /> },
        { id: 'footer', label: 'Footer Section', icon: <FaLink /> },
        { id: 'contact', label: 'Contact Msgs', icon: <FaEnvelope /> },
    ];

    const renderContent = () => {
        switch (activeTab) {
            case 'hero': return <HeroEditor />;
            case 'about': return <AboutEditor />;
            case 'skills': return <SkillsEditor />;
            case 'experience': return <ExperienceEditor />;
            case 'certifications': return <CertificationsEditor />;
            case 'projects': return <ProjectsEditor />;
            case 'footer': return <FooterEditor />;
            case 'contact': return <ContactViewer />;
            default: return <div className="text-white">Select a tab</div>;
        }
    };

    return (
        <div className="pt-24 px-4 max-w-7xl mx-auto pb-10 min-h-screen">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-4xl font-bold bg-gradient-to-r from-secondary to-accent bg-clip-text text-transparent">
                    Admin Dashboard
                </h1>
                <button
                    onClick={handleLogout}
                    className="group flex items-center gap-2 px-5 py-2.5 rounded-full font-semibold text-white bg-gradient-to-r from-red-500/80 to-rose-600/80 hover:from-red-600 hover:to-rose-700 backdrop-blur-sm border border-white/10 shadow-lg shadow-red-500/20 hover:shadow-red-500/40 transform hover:-translate-y-0.5 transition-all duration-300"
                >
                    <FaSignOutAlt className="group-hover:translate-x-1 transition-transform" />
                    <span>Logout</span>
                </button>
            </div>

            <div className="flex flex-col lg:flex-row gap-8">
                {/* Sidebar */}
                <div className="lg:w-1/4">
                    <div className="bg-white/5 p-4 rounded-xl border border-white/10 backdrop-blur-xl sticky top-24">
                        <nav className="space-y-2">
                            {sidebarItems.map((item) => (
                                <button
                                    key={item.id}
                                    onClick={() => setActiveTab(item.id)}
                                    className={`w-full text-left px-4 py-3 rounded-lg transition-all duration-200 flex items-center gap-3 ${activeTab === item.id
                                        ? 'bg-gradient-to-r from-secondary to-blue-600 text-white font-bold shadow-lg shadow-blue-500/20 transform scale-[1.02]'
                                        : 'text-gray-400 hover:bg-white/5 hover:text-white'
                                        }`}
                                >
                                    <span className="text-lg">{item.icon}</span>
                                    <span>{item.label}</span>
                                </button>
                            ))}
                        </nav>
                    </div>
                </div>

                {/* Main Content */}
                <div className="lg:w-3/4">
                    {renderContent()}
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;



