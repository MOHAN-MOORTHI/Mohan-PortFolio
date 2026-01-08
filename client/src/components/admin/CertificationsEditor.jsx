import { useState, useEffect, useCallback, useRef } from 'react';

const CertificationsEditor = ({ token }) => {
    const [certifications, setCertifications] = useState([]);
    const [newCert, setNewCert] = useState({ title: '', issuer: '', date: '', image: '', link: '' });
    const fileInputRef = useRef(null);

    const fetchCertifications = useCallback(() => {
        fetch('/api/certifications')
            .then(res => res.json())
            .then(data => {
                if (Array.isArray(data)) setCertifications(data);
            })
            .catch(err => console.error(err));
    }, []);

    useEffect(() => {
        fetchCertifications();
    }, [fetchCertifications]);

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
                setNewCert({ ...newCert, image: data.imagePath });
            }
        } catch (error) {
            console.error('Upload failed', error);
        }
    };

    const handleAddCert = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch('/api/certifications', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(newCert)
            });
            if (res.ok) {
                fetchCertifications();
                setNewCert({ title: '', issuer: '', date: '', image: '', link: '' });
                alert('Certification added!');
            } else {
                alert('Failed to add certification');
            }
        } catch (error) {
            console.error(error);
        }
    };

    const handleDeleteCert = async (id) => {
        if (!window.confirm('Are you sure?')) return;
        try {
            const res = await fetch(`/api/certifications/${id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            if (res.ok) {
                fetchCertifications();
            } else {
                alert('Failed to delete certification');
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="grid gap-8">
            {/* Add Certification */}
            <div className="bg-white/5 p-8 rounded-2xl border border-white/10 backdrop-blur-xl">
                <h2 className="text-2xl font-bold mb-6 text-white">Add New Certification</h2>
                <form onSubmit={handleAddCert} className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-gray-400 mb-2">Title</label>
                            <input
                                value={newCert.title}
                                onChange={e => setNewCert({ ...newCert, title: e.target.value })}
                                className="w-full bg-dark-bg border border-white/10 rounded-lg p-3 text-white focus:border-secondary focus:outline-none"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-gray-400 mb-2">Issuer</label>
                            <input
                                value={newCert.issuer}
                                onChange={e => setNewCert({ ...newCert, issuer: e.target.value })}
                                className="w-full bg-dark-bg border border-white/10 rounded-lg p-3 text-white focus:border-secondary focus:outline-none"
                                required
                            />
                        </div>
                    </div>
                    <div className="grid md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-gray-400 mb-2">Date</label>
                            <input
                                type="date"
                                value={newCert.date}
                                onChange={e => setNewCert({ ...newCert, date: e.target.value })}
                                className="w-full bg-dark-bg border border-white/10 rounded-lg p-3 text-white focus:border-secondary focus:outline-none"
                            />
                        </div>
                        <div>
                            <label className="block text-gray-400 mb-2">Image</label>
                            <div className="flex gap-2">
                                <input
                                    value={newCert.image}
                                    onChange={e => setNewCert({ ...newCert, image: e.target.value })}
                                    className="w-full bg-dark-bg border border-white/10 rounded-lg p-3 text-white focus:border-secondary focus:outline-none"
                                    placeholder="Image URL or Upload"
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
                    <div>
                        <label className="block text-gray-400 mb-2">Link</label>
                        <input
                            value={newCert.link}
                            onChange={e => setNewCert({ ...newCert, link: e.target.value })}
                            className="w-full bg-dark-bg border border-white/10 rounded-lg p-3 text-white focus:border-secondary focus:outline-none"
                        />
                    </div>
                    <button type="submit" className="w-full bg-secondary text-dark-bg font-bold py-3 rounded-lg hover:bg-cyan-400 transition-colors shadow-lg shadow-cyan-500/20">
                        Add Certification
                    </button>
                </form>
            </div>

            {/* List Certifications */}
            <div className="bg-white/5 p-8 rounded-2xl border border-white/10 backdrop-blur-xl">
                <h2 className="text-2xl font-bold mb-6 text-white">Existing Certifications</h2>
                <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2 custom-scrollbar">
                    {certifications.length === 0 ? (
                        <p className="text-gray-400 text-center py-10">No certifications added yet.</p>
                    ) : (
                        certifications.map(cert => (
                            <div key={cert._id} className="bg-dark-bg p-4 rounded-lg border border-white/5 flex gap-4 items-center justify-between">
                                <div className="flex gap-4 items-center">
                                    <div className="w-12 h-12 bg-white/5 rounded overflow-hidden flex-shrink-0">
                                        {cert.image && <img src={cert.image} alt={cert.title} className="w-full h-full object-cover" />}
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-white">{cert.title}</h3>
                                        <p className="text-sm text-gray-400">{cert.issuer}</p>
                                    </div>
                                </div>
                                <button
                                    onClick={() => handleDeleteCert(cert._id)}
                                    className="text-red-400 hover:text-red-300 text-sm"
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

export default CertificationsEditor;
