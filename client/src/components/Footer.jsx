import { useState, useEffect } from 'react';
import { FaGithub, FaLinkedin, FaTwitter, FaInstagram, FaWhatsapp, FaEnvelope } from 'react-icons/fa';

const Footer = () => {
    const [socials, setSocials] = useState({});

    useEffect(() => {
        fetch('/api/about')
            .then(res => res.json())
            .then(data => {
                if (data && data.socialLinks) setSocials(data.socialLinks);
            })
            .catch(err => console.error(err));
    }, []);

    return (
        <footer className="bg-dark-bg border-t border-white/10 py-8 mt-auto">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row justify-between items-center">
                    <div className="mb-4 md:mb-0">
                        <p className="text-gray-400 text-sm">© 2026 Portfolio. All rights reserved.</p>
                    </div>
                    <div className="flex space-x-6">
                        {socials.github && socials.github !== '#' && <a href={socials.github} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors text-xl"><FaGithub /></a>}
                        {socials.linkedin && socials.linkedin !== '#' && <a href={socials.linkedin} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors text-xl"><FaLinkedin /></a>}
                        {socials.twitter && socials.twitter !== '#' && <a href={socials.twitter} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors text-xl"><FaTwitter /></a>}
                        {socials.instagram && socials.instagram !== '#' && <a href={socials.instagram} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors text-xl"><FaInstagram /></a>}
                        {socials.whatsapp && socials.whatsapp !== '#' && <a href={socials.whatsapp} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors text-xl"><FaWhatsapp /></a>}
                        {socials.email && socials.email !== '#' && <a href={socials.email} className="text-gray-400 hover:text-white transition-colors text-xl"><FaEnvelope /></a>}
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
