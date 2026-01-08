import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa';
import ThemeToggle from './ThemeToggle';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <nav className="fixed w-full z-50 bg-white/10 backdrop-blur-md border-b border-white/10 shadow-lg light:bg-white/90 light:border-gray-200 light:text-gray-800 transition-colors duration-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <div className="flex items-center">
                        <Link to="/" className="text-2xl font-bold bg-gradient-to-r from-secondary to-accent bg-clip-text text-transparent">
                            Portfolio
                        </Link>
                    </div>
                    <div className="hidden md:block">
                        <div className="ml-10 flex items-baseline space-x-4">
                            <Link to="/" className="hover:text-secondary px-3 py-2 rounded-md text-sm font-medium transition-colors light:text-gray-700 light:hover:text-secondary">Home</Link>
                            <a href="#about" className="hover:text-secondary px-3 py-2 rounded-md text-sm font-medium transition-colors light:text-gray-700 light:hover:text-secondary">About</a>
                            <a href="#skills" className="hover:text-secondary px-3 py-2 rounded-md text-sm font-medium transition-colors light:text-gray-700 light:hover:text-secondary">Skills</a>
                            <a href="#experience" className="hover:text-secondary px-3 py-2 rounded-md text-sm font-medium transition-colors light:text-gray-700 light:hover:text-secondary">Experience</a>
                            <a href="#certifications" className="hover:text-secondary px-3 py-2 rounded-md text-sm font-medium transition-colors light:text-gray-700 light:hover:text-secondary">Certifications</a>
                            <a href="#projects" className="hover:text-secondary px-3 py-2 rounded-md text-sm font-medium transition-colors light:text-gray-700 light:hover:text-secondary">Projects</a>
                            <a href="#contact" className="hover:text-secondary px-3 py-2 rounded-md text-sm font-medium transition-colors light:text-gray-700 light:hover:text-secondary">Contact</a>
                            <div className="mx-2 inline-block">
                                <ThemeToggle />
                            </div>
                            <Link to="/login" className="ml-2 relative inline-flex items-center justify-center p-0.5 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800">
                                <span className="relative px-5 py-2 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0 text-white">
                                    Admin
                                </span>
                            </Link>
                        </div>
                    </div>
                    <div className="-mr-2 flex md:hidden">
                        <button onClick={() => setIsOpen(!isOpen)} className="text-gray-300 hover:text-white p-2 light:text-gray-600 light:hover:text-black transition-colors">
                            {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
                        </button>
                    </div>
                </div>
            </div>
            {isOpen && (
                <div className="md:hidden bg-dark-bg/95 backdrop-blur-xl light:bg-white/95 light:text-gray-900 shadow-xl transition-colors duration-300">
                    <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                        <Link to="/" className="block hover:text-secondary px-3 py-2 rounded-md text-base font-medium light:hover:text-secondary light:text-gray-700">Home</Link>
                        <a href="#about" className="block hover:text-secondary px-3 py-2 rounded-md text-base font-medium light:hover:text-secondary light:text-gray-700">About</a>
                        <a href="#skills" className="block hover:text-secondary px-3 py-2 rounded-md text-base font-medium light:hover:text-secondary light:text-gray-700">Skills</a>
                        <a href="#experience" className="block hover:text-secondary px-3 py-2 rounded-md text-base font-medium light:hover:text-secondary light:text-gray-700">Experience</a>
                        <a href="#certifications" className="block hover:text-secondary px-3 py-2 rounded-md text-base font-medium light:hover:text-secondary light:text-gray-700">Certifications</a>
                        <a href="#projects" className="block hover:text-secondary px-3 py-2 rounded-md text-base font-medium light:hover:text-secondary light:text-gray-700">Projects</a>
                        <a href="#contact" className="block hover:text-secondary px-3 py-2 rounded-md text-base font-medium light:hover:text-secondary light:text-gray-700">Contact</a>
                        <div className="px-3 py-2">
                            <ThemeToggle />
                        </div>
                        <Link to="/login" className="block text-accent hover:text-white px-3 py-2 rounded-md text-base font-medium font-bold">Admin</Link>
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
