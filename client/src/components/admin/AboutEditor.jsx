import { useState, useEffect, useRef } from 'react';

const AboutEditor = ({ token }) => {
    const [aboutData, setAboutData] = useState({ image: '', description1: '', description2: '', socialLinks: {} });
    const fileInputRef = useRef(null);

    useEffect(() => {
        fetch('/api/about', {
            headers: { 'Authorization': `Bearer ${token}` }
        })
            .then(res => res.json())
            .then(data => {
                if (data) setAboutData({
                    image: data.image || '',
                    description1: data.description1 || '',
                    description2: data.description2 || '',
                    socialLinks: data.socialLinks || {}
                });
            })
            .catch(err => console.error(err));
    }, [token]);

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
                setAboutData({ ...aboutData, image: data.imagePath });
            }
        } catch (error) {
            console.error('Upload failed', error);
        }
    };

    const handleUpdateAbout = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch('/api/about', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(aboutData)
            });
            if (res.ok) {
                alert('About section updated!');
            } else {
                alert('Failed to update about section');
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="bg-white/5 p-8 rounded-2xl border border-white/10 backdrop-blur-xl">
            <h2 className="text-2xl font-bold mb-6 text-white">Edit About Section</h2>
            <form onSubmit={handleUpdateAbout} className="space-y-6">
                <div>
                    <label className="block text-gray-400 mb-2">Profile Image</label>
                    <div className="flex gap-2">
                        <input
                            value={aboutData.image}
                            onChange={e => setAboutData({ ...aboutData, image: e.target.value })}
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
                <div>
                    <label className="block text-gray-400 mb-2">Paragraph 1</label>
                    <textarea
                        value={aboutData.description1}
                        onChange={e => setAboutData({ ...aboutData, description1: e.target.value })}
                        className="w-full bg-dark-bg border border-white/10 rounded-lg p-3 text-white focus:border-secondary focus:outline-none"
                        rows="4"
                    ></textarea>
                </div>
                <div>
                    <label className="block text-gray-400 mb-2">Paragraph 2</label>
                    <textarea
                        value={aboutData.description2}
                        onChange={e => setAboutData({ ...aboutData, description2: e.target.value })}
                        className="w-full bg-dark-bg border border-white/10 rounded-lg p-3 text-white focus:border-secondary focus:outline-none"
                        rows="4"
                    ></textarea>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-gray-400 mb-2">GitHub URL</label>
                        <input
                            value={aboutData.socialLinks?.github || ''}
                            onChange={e => setAboutData({ ...aboutData, socialLinks: { ...aboutData.socialLinks, github: e.target.value } })}
                            className="w-full bg-dark-bg border border-white/10 rounded-lg p-3 text-white focus:border-secondary focus:outline-none"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-400 mb-2">LinkedIn URL</label>
                        <input
                            value={aboutData.socialLinks?.linkedin || ''}
                            onChange={e => setAboutData({ ...aboutData, socialLinks: { ...aboutData.socialLinks, linkedin: e.target.value } })}
                            className="w-full bg-dark-bg border border-white/10 rounded-lg p-3 text-white focus:border-secondary focus:outline-none"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-400 mb-2">Twitter URL</label>
                        <input
                            value={aboutData.socialLinks?.twitter || ''}
                            onChange={e => setAboutData({ ...aboutData, socialLinks: { ...aboutData.socialLinks, twitter: e.target.value } })}
                            className="w-full bg-dark-bg border border-white/10 rounded-lg p-3 text-white focus:border-secondary focus:outline-none"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-400 mb-2">Instagram URL</label>
                        <input
                            value={aboutData.socialLinks?.instagram || ''}
                            onChange={e => setAboutData({ ...aboutData, socialLinks: { ...aboutData.socialLinks, instagram: e.target.value } })}
                            className="w-full bg-dark-bg border border-white/10 rounded-lg p-3 text-white focus:border-secondary focus:outline-none"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-400 mb-2">WhatsApp URL</label>
                        <input
                            value={aboutData.socialLinks?.whatsapp || ''}
                            onChange={e => setAboutData({ ...aboutData, socialLinks: { ...aboutData.socialLinks, whatsapp: e.target.value } })}
                            className="w-full bg-dark-bg border border-white/10 rounded-lg p-3 text-white focus:border-secondary focus:outline-none"
                        />
                    </div>
                </div>
                <button type="submit" className="w-full bg-secondary text-dark-bg font-bold py-3 rounded-lg hover:bg-cyan-400 transition-colors shadow-lg shadow-cyan-500/20">
                    Update About Section
                </button>
            </form>
        </div>
    );
};

export default AboutEditor;
