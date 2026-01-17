import { useState, useEffect, useCallback } from 'react';
import adminService from '../../services/adminService';

const ExperienceEditor = () => {
    const [experiences, setExperiences] = useState([]);
    const [newExperience, setNewExperience] = useState({
        company: '',
        role: '',
        startDate: '',
        endDate: '',
        description: ''
    });

    const fetchExperience = useCallback(() => {
        adminService.getExperienceFn()
            .then(res => {
                if (Array.isArray(res.data)) setExperiences(res.data);
            })
            .catch(err => console.error(err));
    }, []);

    useEffect(() => {
        fetchExperience();
    }, [fetchExperience]);

    const handleAddExperience = async (e) => {
        e.preventDefault();
        try {
            await adminService.addExperienceFn(newExperience);
            fetchExperience();
            setNewExperience({ company: '', role: '', startDate: '', endDate: '', description: '' });
            alert('Experience added!');
        } catch (error) {
            console.error(error);
            alert('Failed to add experience');
        }
    };

    const handleDeleteExperience = async (id) => {
        if (!window.confirm('Are you sure?')) return;
        try {
            await adminService.deleteExperienceFn(id);
            fetchExperience();
        } catch (error) {
            console.error(error);
            alert('Failed to delete experience');
        }
    };

    return (
        <div className="grid gap-8">
            <div className="bg-white/5 p-8 rounded-2xl border border-white/10 backdrop-blur-xl">
                <h2 className="text-2xl font-bold mb-6 text-white">Add Experience</h2>
                <form onSubmit={handleAddExperience} className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-gray-400 mb-2">Company</label>
                            <input
                                value={newExperience.company}
                                onChange={e => setNewExperience({ ...newExperience, company: e.target.value })}
                                className="w-full bg-dark-bg border border-white/10 rounded-lg p-3 text-white focus:border-secondary focus:outline-none"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-gray-400 mb-2">Role</label>
                            <input
                                value={newExperience.role}
                                onChange={e => setNewExperience({ ...newExperience, role: e.target.value })}
                                className="w-full bg-dark-bg border border-white/10 rounded-lg p-3 text-white focus:border-secondary focus:outline-none"
                                required
                            />
                        </div>
                    </div>
                    <div className="grid md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-gray-400 mb-2">Start Date</label>
                            <input
                                type="date"
                                value={newExperience.startDate}
                                onChange={e => setNewExperience({ ...newExperience, startDate: e.target.value })}
                                className="w-full bg-dark-bg border border-white/10 rounded-lg p-3 text-white focus:border-secondary focus:outline-none"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-gray-400 mb-2">End Date (Leave empty if current)</label>
                            <input
                                type="date"
                                value={newExperience.endDate}
                                onChange={e => setNewExperience({ ...newExperience, endDate: e.target.value })}
                                className="w-full bg-dark-bg border border-white/10 rounded-lg p-3 text-white focus:border-secondary focus:outline-none"
                            />
                        </div>
                    </div>
                    <div>
                        <label className="block text-gray-400 mb-2">Description</label>
                        <textarea
                            value={newExperience.description}
                            onChange={e => setNewExperience({ ...newExperience, description: e.target.value })}
                            className="w-full bg-dark-bg border border-white/10 rounded-lg p-3 text-white focus:border-secondary focus:outline-none"
                            rows="3"
                        ></textarea>
                    </div>
                    <button type="submit" className="w-full bg-secondary text-dark-bg font-bold py-3 rounded-lg hover:bg-cyan-400 transition-colors shadow-lg shadow-cyan-500/20">
                        Add Experience
                    </button>
                </form>
            </div>

            <div className="bg-white/5 p-8 rounded-2xl border border-white/10 backdrop-blur-xl">
                <h2 className="text-2xl font-bold mb-6 text-white">Experience History</h2>
                <div className="space-y-4">
                    {experiences.length === 0 ? (
                        <p className="text-gray-400 text-center py-10">No experience added yet.</p>
                    ) : (
                        experiences.map(exp => (
                            <div key={exp._id} className="bg-dark-bg p-6 rounded-lg border border-white/5 flex gap-4 justify-between items-start group">
                                <div className="space-y-2">
                                    <h3 className="text-xl font-bold text-white">{exp.role} <span className="text-secondary">@ {exp.company}</span></h3>
                                    <p className="text-gray-400 text-sm">
                                        {new Date(exp.startDate).toLocaleDateString()} -
                                        {exp.endDate ? new Date(exp.endDate).toLocaleDateString() : ' Present'}
                                    </p>
                                    <p className="text-gray-300">{exp.description}</p>
                                </div>
                                <button
                                    onClick={() => handleDeleteExperience(exp._id)}
                                    className="text-red-500 opacity-0 group-hover:opacity-100 transition-opacity hover:text-red-400"
                                >
                                    Delete
                                </button>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
};

export default ExperienceEditor;
