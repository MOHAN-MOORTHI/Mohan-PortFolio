import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Hero3D from '../components/Hero3D';
import { FaJava, FaReact, FaNodeJs, FaDatabase, FaHtml5, FaCss3, FaJs, FaCertificate } from 'react-icons/fa';
import { SiMongodb, SiTailwindcss, SiExpress } from 'react-icons/si';
import dataService from '../services/dataService';

// Mock Data
const projectsData = [
    { id: 1, title: 'E-Commerce App', category: 'Full Stack', image: 'https://placehold.co/600x400/1e293b/white?text=E-Commerce', tools: ['React', 'Node', 'MongoDB'], liveLink: '#', repoLink: '#' },
    { id: 2, title: 'Portfolio Website', category: 'Frontend', image: 'https://placehold.co/600x400/1e293b/white?text=Portfolio', tools: ['React', 'Three.js'], liveLink: '#', repoLink: '#' },
    { id: 3, title: 'Chat Application', category: 'Real-time', image: 'https://placehold.co/600x400/1e293b/white?text=Chat+App', tools: ['Socket.io', 'Express'], liveLink: '#', repoLink: '#' },
    { id: 4, title: 'Task Manager', category: 'Productivity', image: 'https://placehold.co/600x400/1e293b/white?text=Task+Manager', tools: ['Vue.js', 'Firebase'], liveLink: '#', repoLink: '#' },
    { id: 5, title: 'Weather Dashboard', category: 'API Integration', image: 'https://placehold.co/600x400/1e293b/white?text=Weather+App', tools: ['React', 'OpenWeatherMap'], liveLink: '#', repoLink: '#' },
];

const skillsData = [
    { name: 'React', icon: <FaReact className="text-secondary" />, category: 'Frontend' },
    { name: 'Node.js', icon: <FaNodeJs className="text-green-500" />, category: 'Backend' },
    { name: 'MongoDB', icon: <SiMongodb className="text-green-600" />, category: 'Backend' },
    { name: 'Express', icon: <SiExpress className="text-gray-300" />, category: 'Backend' },
    { name: 'Tailwind', icon: <SiTailwindcss className="text-cyan-400" />, category: 'Frontend' },
    { name: 'JavaScript', icon: <FaJs className="text-yellow-400" />, category: 'Frontend' },
    { name: 'Java', icon: <FaJava className="text-red-500" />, category: 'Backend' },
];

const certificationsData = [
    { id: 1, title: 'MERN Stack Developer', issuer: 'Udemy', date: '2024', image: 'https://placehold.co/100x100/1e293b/white?text=C' },
    { id: 2, title: 'AWS Cloud Practitioner', issuer: 'Amazon Web Services', date: '2025', image: 'https://placehold.co/100x100/1e293b/white?text=AWS' },
];

const Section = ({ title, children, id }) => (
    <section id={id} className="py-20 px-4 max-w-7xl mx-auto">
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
        >
            <h2 className="text-4xl font-bold mb-12 text-center bg-gradient-to-r from-secondary to-accent bg-clip-text text-transparent">
                {title}
            </h2>
            {children}
        </motion.div>
    </section>
)

const Home = () => {
    const [data, setData] = useState({ projects: projectsData, skills: skillsData, certifications: certificationsData, experience: [], hero: {}, about: {} });

    const [contactForm, setContactForm] = useState({ name: '', email: '', subject: '', message: '' });
    const [filter, setFilter] = useState('All');

    const handleContactSubmit = async (e) => {
        e.preventDefault();
        try {
            await dataService.sendContactMessage(contactForm);
            alert('Message sent successfully!');
            setContactForm({ name: '', email: '', subject: '', message: '' });
        } catch (error) {
            console.error(error);
            alert('Failed to send message.');
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await dataService.getPublicData();

                // Helper to handle potentially missing arrays
                const newProjects = result.projects && result.projects.length > 0 ? result.projects.map(p => ({
                    id: p._id,
                    title: p.title,
                    category: p.category || 'Web',
                    image: p.image || 'https://placehold.co/600x400/1e293b/white?text=Project',
                    tools: p.technologies,
                    liveLink: p.liveLink,
                    repoLink: p.repoLink
                })) : projectsData;

                const newSkills = result.skills && result.skills.length > 0 ? result.skills.map(s => ({
                    name: s.name,
                    icon: s.icon || null,
                    category: s.category || 'Other'
                })) : skillsData;

                const newCerts = result.certifications && result.certifications.length > 0 ? result.certifications : certificationsData;
                const newExperience = result.experience || [];

                const newHero = result.hero || {};
                const newAbout = result.about || {};

                setData({
                    projects: newProjects,
                    skills: newSkills,
                    certifications: newCerts,
                    experience: newExperience,
                    hero: newHero,
                    about: newAbout
                });
            } catch {
                console.log('Using mock data, API not reachable');
            }
        };
        fetchData();
    }, []);

    return (
        <>
            <Hero3D title={data.hero.title} subtitle={data.hero.subtitle} ctaText={data.hero.ctaText} />

            <Section id="about" title="About Me">
                <div className="flex flex-col md:flex-row items-center gap-10">
                    <div className="md:w-1/2 flex justify-center py-10">
                        <motion.div
                            initial={{ rotateY: 15, rotateZ: -5 }}
                            whileHover={{ rotateY: 0, rotateZ: 0, scale: 1.05 }}
                            transition={{ duration: 0.5, type: "spring", stiffness: 100 }}
                            className="relative w-full max-w-xs"
                            style={{ perspective: 1000 }}
                        >
                            <div className="absolute inset-0 bg-gradient-to-tr from-secondary to-accent blur-xl opacity-30 light:opacity-50 -z-10 rounded-3xl transform translate-x-4 translate-y-4" />
                            <img
                                src={data.about?.image || "https://placehold.co/400x400/1e293b/white?text=Profile"}
                                alt="About Me"
                                className="rounded-3xl shadow-2xl border border-white/20 light:border-white/50 w-full object-cover aspect-square bg-dark-bg/50 backdrop-blur-sm"
                            />
                        </motion.div>
                    </div>
                    <div className="md:w-1/2 text-lg text-gray-300 light:text-gray-700 leading-relaxed">
                        <p className="mb-4">
                            {data.about?.description1 || "I am a passionate Full Stack Developer specializing in the MERN stack. I love building scalable, responsive, and aesthetically pleasing web applications."}
                        </p>
                        <p>
                            {data.about?.description2 || "With experience in modern web technologies like React 19, Tailwind v4, and Three.js, I bring ideas to life with code."}
                        </p>
                    </div>
                </div>
            </Section>

            <Section id="skills" title="Technical Skills">
                {['Frontend', 'Backend', 'Tools'].map(category => {
                    const categorySkills = data.skills.filter(s => (s.category) === category);
                    if (categorySkills.length === 0) return null;
                    return (
                        <div key={category} className="mb-8 last:mb-0">
                            <h3 className="text-xl font-bold mb-4 text-secondary/80 border-b border-white/5 pb-2 inline-block">{category}</h3>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                                {categorySkills.map((skill) => (
                                    <motion.div
                                        key={skill.id || skill._id || skill.name}
                                        whileHover={{ scale: 1.1 }}
                                        className="bg-white/5 backdrop-blur-sm p-6 rounded-2xl border border-white/10 
                                        light:bg-white light:border-gray-100 light:shadow-[0_3px_10px_rgb(0,0,0,0.05)] 
                                        light:hover:shadow-xl light:hover:border-blue-100 light:hover:-translate-y-1
                                        flex flex-col items-center gap-4 hover:bg-white/10 transition-all duration-300"
                                    >
                                        <div className="text-5xl flex items-center justify-center w-16 h-16">
                                            {skill.icon && typeof skill.icon === 'string' && (skill.icon.startsWith('http') || skill.icon.startsWith('/')) ? (
                                                <img src={skill.icon} alt={skill.name} className="w-full h-full object-contain" />
                                            ) : (
                                                skill.icon ? (
                                                    typeof skill.icon === 'string' ? <div className="text-2xl font-bold">{skill.name[0]}</div> : skill.icon
                                                ) : (
                                                    <div className="text-2xl font-bold">{skill.name[0]}</div>
                                                )
                                            )}
                                        </div>
                                        <span className="font-semibold text-gray-200 light:text-gray-800">{skill.name}</span>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    );
                })}
            </Section>

            {data.experience.length > 0 && (
                <Section id="experience" title="Work Experience">
                    <div className="max-w-4xl mx-auto space-y-8">
                        {data.experience.map((exp, index) => (
                            <motion.div
                                key={exp._id || index}
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ delay: index * 0.1 }}
                                className="relative pl-8 border-l-2 border-secondary/50"
                            >
                                <div className="absolute -left-2.5 top-0 w-5 h-5 rounded-full bg-secondary border-4 border-dark-bg light:border-white"></div>
                                <h3 className="text-2xl font-bold text-white light:text-gray-900">{exp.role}</h3>
                                <p className="text-lg text-secondary light:text-blue-600 font-semibold mb-2">
                                    {exp.company} | <span className="text-sm text-gray-400 light:text-gray-600">
                                        {new Date(exp.startDate).getFullYear()} -
                                        {exp.endDate ? new Date(exp.endDate).getFullYear() : 'Present'}
                                    </span>
                                </p>
                                <p className="text-gray-300 light:text-gray-700 leading-relaxed whitespace-pre-line">
                                    {exp.description}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </Section>
            )}

            <Section id="certifications" title="Certifications">
                <div className="grid md:grid-cols-2 gap-8">
                    {data.certifications.map((cert) => {
                        const Component = cert.link ? motion.a : motion.div;
                        const props = cert.link ? { href: cert.link, target: "_blank", rel: "noopener noreferrer" } : {};

                        return (
                            <Component
                                key={cert.id || cert._id}
                                {...props}
                                whileHover={{ scale: 1.02 }}
                                className="bg-white/5 backdrop-blur-sm p-6 rounded-2xl border border-white/10 
                            light:bg-white light:border-gray-100 light:shadow-[0_3px_10px_rgb(0,0,0,0.05)]
                            light:hover:shadow-xl light:hover:border-purple-100 
                            flex items-center gap-6 hover:bg-white/10 transition-all duration-300 cursor-pointer"
                            >
                                <div className="w-20 h-20 bg-dark-bg light:bg-gray-100 rounded-lg overflow-hidden flex-shrink-0 border border-white/10 light:border-gray-200">
                                    {cert.image ? (
                                        <img src={cert.image} alt={cert.title} className="w-full h-full object-cover" />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center text-secondary text-2xl">
                                            <FaCertificate />
                                        </div>
                                    )}
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-white light:text-gray-900 mb-1">{cert.title}</h3>
                                    <p className="text-secondary light:text-blue-600">{cert.issuer}</p>
                                    <p className="text-sm text-gray-400 light:text-gray-600 mt-2">{new Date(cert.date).getFullYear() || cert.date}</p>
                                </div>
                                {cert.link && (
                                    <div className="ml-auto text-gray-500 light:text-gray-400">
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
                                    </div>
                                )}
                            </Component>
                        )
                    })}
                </div>
            </Section>

            <Section id="projects" title="Featured Projects">
                <div className="flex justify-center gap-4 mb-12 flex-wrap">
                    {['All', ...new Set(data.projects.map(p => p.category))].map(cat => (
                        <button
                            key={cat}
                            onClick={() => setFilter(cat)}
                            className={`px-6 py-2 rounded-full font-bold transition-all duration-300 ${filter === cat
                                ? 'bg-secondary text-dark-bg shadow-[0_0_15px_rgba(56,189,248,0.5)] scale-105'
                                : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white border border-white/10'
                                }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                <motion.div
                    layout
                    className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
                >
                    <AnimatePresence>
                        {data.projects
                            .filter(p => filter === 'All' || p.category === filter)
                            .map((project) => (
                                <motion.div
                                    layout
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.8 }}
                                    transition={{ duration: 0.3 }}
                                    key={project.id}
                                    whileHover={{ y: -10 }}
                                    className="bg-dark-bg light:bg-white rounded-2xl overflow-hidden border border-white/10 light:border-gray-100 shadow-lg light:shadow-xl hover:shadow-2xl light:hover:shadow-2xl group transition-all duration-300"
                                >
                                    <div className="relative overflow-hidden h-48">
                                        <img
                                            src={project.image}
                                            alt={project.title}
                                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                        />
                                        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4 backdrop-blur-sm">
                                            {project.liveLink && (
                                                <a href={project.liveLink} target="_blank" rel="noopener noreferrer" className="bg-secondary text-dark-bg px-5 py-2 rounded-full font-bold hover:bg-white hover:text-black transition-all text-sm shadow-[0_0_15px_rgba(56,189,248,0.5)] transform hover:scale-105">
                                                    Live Demo
                                                </a>
                                            )}
                                            {project.repoLink && (
                                                <a href={project.repoLink} target="_blank" rel="noopener noreferrer" className="bg-white text-dark-bg px-5 py-2 rounded-full font-bold hover:bg-gray-200 transition-all text-sm transform hover:scale-105">
                                                    GitHub
                                                </a>
                                            )}
                                        </div>
                                    </div>
                                    <div className="p-6">
                                        <div className="flex justify-between items-start mb-2">
                                            <h3 className="text-xl font-bold text-white light:text-gray-900 group-hover:text-secondary light:group-hover:text-blue-600 transition-colors">{project.title}</h3>
                                            <span className="text-xs text-secondary border border-secondary/30 px-2 py-1 rounded">{project.category}</span>
                                        </div>
                                        <div className="flex flex-wrap gap-2 mt-4">
                                            {project.tools.map((tool, i) => (
                                                <span key={i} className="text-xs bg-white/5 light:bg-blue-50 px-3 py-1 rounded-full text-gray-300 light:text-blue-600 border border-white/10 light:border-blue-100 font-medium">{tool}</span>
                                            ))}
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                    </AnimatePresence>
                </motion.div>
            </Section>

            <Section id="contact" title="Get In Touch">
                <form onSubmit={handleContactSubmit} className="max-w-2xl mx-auto space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                        <input
                            type="text"
                            placeholder="Name"
                            value={contactForm.name}
                            onChange={e => setContactForm({ ...contactForm, name: e.target.value })}
                            className="bg-white/5 border border-white/10 light:bg-white light:border-gray-300 light:text-gray-900 p-4 rounded-lg focus:outline-none focus:border-secondary light:focus:border-blue-500 w-full"
                            required
                        />
                        <input
                            type="email"
                            placeholder="Email"
                            value={contactForm.email}
                            onChange={e => setContactForm({ ...contactForm, email: e.target.value })}
                            className="bg-white/5 border border-white/10 light:bg-white light:border-gray-300 light:text-gray-900 p-4 rounded-lg focus:outline-none focus:border-secondary light:focus:border-blue-500 w-full"
                            required
                        />
                    </div>
                    <input
                        type="text"
                        placeholder="Subject"
                        value={contactForm.subject}
                        onChange={e => setContactForm({ ...contactForm, subject: e.target.value })}
                        className="bg-white/5 border border-white/10 light:bg-white light:border-gray-300 light:text-gray-900 p-4 rounded-lg focus:outline-none focus:border-secondary light:focus:border-blue-500 w-full"
                    />
                    <textarea
                        rows="5"
                        placeholder="Message"
                        value={contactForm.message}
                        onChange={e => setContactForm({ ...contactForm, message: e.target.value })}
                        className="bg-white/5 border border-white/10 light:bg-white light:border-gray-300 light:text-gray-900 p-4 rounded-lg focus:outline-none focus:border-secondary light:focus:border-blue-500 w-full"
                        required
                    ></textarea>
                    <button className="w-full bg-gradient-to-r from-secondary to-accent p-4 rounded-lg font-bold text-white text-lg hover:shadow-lg shadow-cyan-500/20 transition-all">
                        Send Message
                    </button>
                </form>
            </Section>
        </>
    );
};

export default Home;
