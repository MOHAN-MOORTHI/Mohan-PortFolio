import { useState, useEffect } from 'react';
import adminService from '../../services/adminService';

const FooterEditor = () => {
    const [aboutData, setAboutData] = useState({ socialLinks: {} });

    useEffect(() => {
        adminService.getAboutFn()
            .then(res => {
                const data = res.data;
                if (data) setAboutData({
                    ...data,
                    socialLinks: data.socialLinks || {}
                });
            })
            .catch(err => console.error(err));
    }, []);

    const handleUpdateFooter = async (e) => {
        e.preventDefault();
        try {
            // Only send socialLinks
            const { socialLinks } = aboutData;
            await adminService.updateAboutFn({ socialLinks });
            alert('Footer section updated!');
        } catch (error) {
            console.error(error);
            alert('Failed to update footer section');
        }
    };

    return (
        <div className="bg-white/5 p-8 rounded-2xl border border-white/10 backdrop-blur-xl">
            <h2 className="text-2xl font-bold mb-6 text-white">Edit Footer Section</h2>
            <form onSubmit={handleUpdateFooter} className="space-y-6">

                <div>
                    <h3 className="text-lg font-semibold text-secondary mb-4">Contact & Social Links</h3>
                    <p className="text-gray-400 text-sm mb-4">These links will appear in the footer section of the website.</p>

                    <div className="grid md:grid-cols-2 gap-4">
                        <div className="col-span-2">
                            <label className="block text-gray-400 mb-2 font-medium">Email Address (Footer Contact)</label>
                            <input
                                value={aboutData.socialLinks?.email || ''}
                                onChange={e => setAboutData({ ...aboutData, socialLinks: { ...aboutData.socialLinks, email: e.target.value } })}
                                className="w-full bg-dark-bg border border-white/10 rounded-lg p-3 text-white focus:border-secondary focus:outline-none"
                                placeholder="mailto:you@example.com"
                            />
                            <p className="text-xs text-gray-500 mt-1">Enter 'mailto:your@email.com' to create a clickable email link.</p>
                        </div>

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
                </div>

                <button type="submit" className="w-full bg-secondary text-dark-bg font-bold py-3 rounded-lg hover:bg-cyan-400 transition-colors shadow-lg shadow-cyan-500/20">
                    Update Footer Section
                </button>
            </form>
        </div>
    );
};

export default FooterEditor;
