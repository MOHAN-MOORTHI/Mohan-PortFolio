import { useState, useEffect, useCallback, useRef } from 'react';
import { FaTrash } from 'react-icons/fa';
import adminService from '../../services/adminService';

const ProjectsEditor = () => {
    const [projects, setProjects] = useState([]);
    const [newProject, setNewProject] = useState({
        title: '',
        description: '',
        image: '',
        technologies: '',
        liveLink: '',
        repoLink: '',
        category: 'Web'
    });
    const fileInputRef = useRef(null);

    const fetchProjects = useCallback(() => {
        adminService.getProjectsFn()
            .then(res => {
                if (Array.isArray(res.data)) setProjects(res.data);
            })
            .catch(err => console.error(err));
    }, []);

    useEffect(() => {
        fetchProjects();
    }, [fetchProjects]);

    const handleFileUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const formData = new FormData();
        formData.append('image', file);

        try {
            const res = await adminService.uploadImageFn(formData);
            if (res.data.imagePath) {
                setNewProject({ ...newProject, image: res.data.imagePath });
            }
        } catch (error) {
            console.error('Upload failed', error);
        }
    };

    const handleAddProject = async (e) => {
        e.preventDefault();
        const formattedProject = {
            ...newProject,
            technologies: newProject.technologies.split(',').map(t => t.trim())
        };

        try {
            await adminService.addProjectFn(formattedProject);
            fetchProjects();
            setNewProject({ title: '', description: '', image: '', technologies: '', liveLink: '', repoLink: '', category: 'Web' });
            alert('Project added!');
        } catch (error) {
            console.error(error);
            alert('Failed to add project');
        }
    };

    const handleDeleteProject = async (id) => {
        if (!window.confirm('Are you sure you want to delete this project?')) return;
        try {
            await adminService.deleteProjectFn(id);
            fetchProjects();
        } catch (error) {
            console.error(error);
            alert('Failed to delete project');
        }
    };

    return (
        <div className="grid gap-8">
            <div className="bg-white/5 p-8 rounded-2xl border border-white/10 backdrop-blur-xl">
                <h2 className="text-2xl font-bold mb-6 text-white">Add New Project</h2>
                <form onSubmit={handleAddProject} className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-gray-400 mb-2">Title</label>
                            <input
                                value={newProject.title}
                                onChange={e => setNewProject({ ...newProject, title: e.target.value })}
                                className="w-full bg-dark-bg border border-white/10 rounded-lg p-3 text-white focus:border-secondary focus:outline-none"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-gray-400 mb-2">Image</label>
                            <div className="flex gap-2">
                                <input
                                    type="text"
                                    value={newProject.image}
                                    onChange={e => setNewProject({ ...newProject, image: e.target.value })}
                                    className="w-full bg-dark-bg border border-white/10 rounded-lg p-3 text-white focus:border-secondary focus:outline-none"
                                    placeholder="Image URL or Upload"
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => fileInputRef.current.click()}
                                    className="cursor-pointer bg-white/10 hover:bg-white/20 p-3 rounded-lg border border-white/10 transition-colors"
                                >
                                    <span className="text-xl">📁</span>
                                </button>
                                <input
                                    type="file"
                                    ref={fileInputRef}
                                    className="hidden"
                                    onChange={handleFileUpload}
                                    accept="image/*"
                                />
                            </div>
                        </div>
                    </div>
                    <div className="grid md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-gray-400 mb-2">Category</label>
                            <input
                                value={newProject.category}
                                onChange={e => setNewProject({ ...newProject, category: e.target.value })}
                                className="w-full bg-dark-bg border border-white/10 rounded-lg p-3 text-white focus:border-secondary focus:outline-none"
                                placeholder="Web, App, etc"
                            />
                        </div>
                        <div>
                            <label className="block text-gray-400 mb-2">Technologies (comma separated)</label>
                            <input
                                value={newProject.technologies}
                                onChange={e => setNewProject({ ...newProject, technologies: e.target.value })}
                                className="w-full bg-dark-bg border border-white/10 rounded-lg p-3 text-white focus:border-secondary focus:outline-none"
                                placeholder="React, Node, MongoDB"
                            />
                        </div>
                    </div>
                    <div>
                        <label className="block text-gray-400 mb-2">Description</label>
                        <textarea
                            value={newProject.description}
                            onChange={e => setNewProject({ ...newProject, description: e.target.value })}
                            className="w-full bg-dark-bg border border-white/10 rounded-lg p-3 text-white focus:border-secondary focus:outline-none"
                            rows="3"
                            required
                        ></textarea>
                    </div>
                    <div className="grid md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-gray-400 mb-2">Live Demo Link</label>
                            <input
                                value={newProject.liveLink}
                                onChange={e => setNewProject({ ...newProject, liveLink: e.target.value })}
                                className="w-full bg-dark-bg border border-white/10 rounded-lg p-3 text-white focus:border-secondary focus:outline-none"
                            />
                        </div>
                        <div>
                            <label className="block text-gray-400 mb-2">GitHub Link</label>
                            <input
                                value={newProject.repoLink}
                                onChange={e => setNewProject({ ...newProject, repoLink: e.target.value })}
                                className="w-full bg-dark-bg border border-white/10 rounded-lg p-3 text-white focus:border-secondary focus:outline-none"
                            />
                        </div>
                    </div>
                    <button type="submit" className="w-full bg-secondary text-dark-bg font-bold py-3 rounded-lg hover:bg-cyan-400 transition-colors shadow-lg shadow-cyan-500/20">
                        Add Project
                    </button>
                </form>
            </div>

            <div className="bg-white/5 p-8 rounded-2xl border border-white/10 backdrop-blur-xl">
                <h2 className="text-2xl font-bold mb-6 text-white">Existing Projects</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-h-[800px] overflow-y-auto pr-2 custom-scrollbar">
                    {projects.length === 0 ? (
                        <p className="text-gray-400 text-center py-10 col-span-full">No projects found. Add one!</p>
                    ) : (
                        projects.map(p => (
                            <div key={p._id} className="bg-dark-bg rounded-2xl overflow-hidden border border-white/10 group hover:border-secondary/50 transition-all duration-300">
                                <div className="relative h-48 overflow-hidden">
                                    <img
                                        src={p.image.startsWith('http') || p.image.startsWith('/') ? p.image : `/${p.image}`}
                                        alt={p.title}
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                    />
                                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                        <button
                                            onClick={() => handleDeleteProject(p._id)}
                                            className="bg-red-500 text-white p-3 rounded-full hover:bg-red-600 transition-colors shadow-lg shadow-red-500/30 transform hover:scale-110"
                                        >
                                            <FaTrash />
                                        </button>
                                    </div>
                                </div>
                                <div className="p-5">
                                    <div className="flex justify-between items-start mb-2">
                                        <h3 className="text-xl font-bold text-white">{p.title}</h3>
                                        {p.category && <span className="text-xs text-gray-400 border border-white/10 px-2 py-1 rounded">{p.category}</span>}
                                    </div>
                                    <p className="text-gray-400 text-sm mb-4 line-clamp-2">{p.description}</p>
                                    <div className="flex flex-wrap gap-2">
                                        {p.technologies && p.technologies.map((tech, i) => (
                                            <span key={i} className="text-xs bg-white/5 text-secondary px-2 py-1 rounded-full border border-white/10">
                                                {tech}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
}

export default ProjectsEditor;
