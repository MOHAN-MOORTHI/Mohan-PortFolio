import { useState, useEffect, useCallback, useRef } from 'react';

const SkillsEditor = ({ token }) => {
    const [skills, setSkills] = useState([]);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const [newSkill, setNewSkill] = useState({ name: '', category: 'Frontend', level: 80, icon: '' });
    const fileInputRef = useRef(null);

    const fetchSkills = useCallback(() => {
        fetch('/api/skills')
            .then(res => res.json())
            .then(data => {
                if (Array.isArray(data)) setSkills(data);
            })
            .catch(err => console.error(err));
    }, []);

    useEffect(() => {
        fetchSkills();
    }, [fetchSkills]);

    const handleFileUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const formData = new FormData();
        formData.append('image', file);

        try {
            const res = await fetch('/api/upload', {
                method: 'POST',
                body: formData
            });
            const data = await res.json();
            if (data.imagePath) {
                setNewSkill({ ...newSkill, icon: data.imagePath });
            }
        } catch (error) {
            console.error('Upload failed', error);
        }
    };

    const handleAddSkill = async (e) => {
        e.preventDefault();
        if (isSubmitting) return;
        setIsSubmitting(true);
        try {
            const res = await fetch('/api/skills', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(newSkill)
            });
            if (res.ok) {
                fetchSkills();
                setNewSkill({ name: '', category: 'Frontend', level: 80, icon: '' });
                alert('Skill added!');
            } else {
                alert('Failed to add skill');
            }
        } catch (error) {
            console.error(error);
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleDeleteSkill = async (id) => {
        if (!window.confirm('Are you sure?')) return;
        try {
            const res = await fetch(`/api/skills/${id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            if (res.ok) {
                fetchSkills();
            } else {
                alert('Failed to delete skill');
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="grid gap-8">
            {/* Add Skill */}
            <div className="bg-white/5 p-8 rounded-2xl border border-white/10 backdrop-blur-xl">
                <h2 className="text-2xl font-bold mb-6 text-white">Add New Skill</h2>
                <form onSubmit={handleAddSkill} className="flex flex-wrap gap-4 items-end">
                    {/* ... inputs ... */}
                    <div className="flex-1 min-w-[200px]">
                        <label className="block text-gray-400 mb-2">Skill Name</label>
                        <input
                            value={newSkill.name}
                            onChange={e => setNewSkill({ ...newSkill, name: e.target.value })}
                            className="w-full bg-dark-bg border border-white/10 rounded-lg p-3 text-white focus:border-secondary focus:outline-none"
                            placeholder="e.g. React"
                            required
                        />
                    </div>
                    <div className="flex-1 min-w-[200px]">
                        <label className="block text-gray-400 mb-2">Category</label>
                        <select
                            value={newSkill.category}
                            onChange={e => setNewSkill({ ...newSkill, category: e.target.value })}
                            className="w-full bg-dark-bg border border-white/10 rounded-lg p-3 text-white focus:border-secondary focus:outline-none"
                        >
                            <option value="Frontend">Frontend</option>
                            <option value="Backend">Backend</option>
                            <option value="Tools">Tools</option>
                            <option value="Other">Other</option>
                        </select>
                    </div>
                    <div className="flex-1 min-w-[200px]">
                        <label className="block text-gray-400 mb-2">Icon (Image URL/Upload)</label>
                        <div className="flex gap-2">
                            <input
                                value={newSkill.icon}
                                onChange={e => setNewSkill({ ...newSkill, icon: e.target.value })}
                                className="w-full bg-dark-bg border border-white/10 rounded-lg p-3 text-white focus:border-secondary focus:outline-none"
                                placeholder="http://..."
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
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className={`bg-secondary text-dark-bg font-bold px-6 py-3 rounded-lg hover:bg-cyan-400 transition-colors shadow-lg shadow-cyan-500/20 ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
                    >
                        {isSubmitting ? 'Adding...' : 'Add'}
                    </button>
                </form>
            </div>

            {/* List Skills */}
            <div className="bg-white/5 p-8 rounded-2xl border border-white/10 backdrop-blur-xl">
                <h2 className="text-2xl font-bold mb-6 text-white">Existing Skills</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {skills.length === 0 ? (
                        <p className="text-gray-400 col-span-full">No skills added yet.</p>
                    ) : (
                        skills.map(skill => (
                            <div key={skill._id} className="bg-dark-bg p-4 rounded-lg border border-white/5 flex justify-between items-center group">
                                <div>
                                    <h3 className="font-bold text-white">{skill.name}</h3>
                                    <span className="text-xs text-gray-400">{skill.category}</span>
                                </div>
                                <button
                                    onClick={() => handleDeleteSkill(skill._id)}
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

export default SkillsEditor;
