import { memo } from 'react';
import { FaTwitter, FaFacebook, FaInstagram, FaLinkedin } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import LazyImage from '../../Component/LazyImage';
import { HiOutlineMail, HiOutlinePhone, HiOutlineLocationMarker } from 'react-icons/hi';

const Footer = memo(() => {
    const footerNavs = [
        { title: 'Company', links: [
            { name: 'About Us', href: '/about' },
            { name: 'Our Team', href: '/team' },
            { name: 'Careers', href: '/careers' },
            { name: 'Contact', href: '/contact' }
        ]},
        { title: 'Services', links: [
            { name: 'Private Dining', href: '/services' },
            { name: 'Wedding Events', href: '/services' },
            { name: 'Corporate Catering', href: '/services' },
            { name: 'Gift Cards', href: '/shop' }
        ]},
        { title: 'Legal', links: [
            { name: 'Privacy Policy', href: '/privacy' },
            { name: 'Terms of Service', href: '/terms' },
            { name: 'Cookie Policy', href: '/cookies' }
        ]}
    ];

    return (
        <footer className="relative bg-[#0a0a0a] text-white pt-24 pb-12 overflow-hidden">
            {/* Background Texture/Pattern */}
            <div className="absolute inset-0 opacity-5 pointer-events-none" style={{ backgroundImage: 'url(https://i.ibb.co/27tp6gk/wepik-export-20240125182837v-R6t.jpg)', backgroundSize: 'cover' }} />
            
            <div className="container mx-auto px-4 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 mb-20">
                    {/* Brand Section */}
                    <div className="lg:col-span-4 space-y-8">
                        <Link to="/" className="flex items-center gap-2">
                             <div className="w-12 h-12 bg-white rounded-full p-2">
                                <LazyImage 
                                    src="https://i.ibb.co/VNs4X6g/1705932001959oh7xa24u-removebg-preview.png" 
                                    alt="MadeBest Logo"
                                    className="w-full h-full object-contain"
                                />
                             </div>
                             <span className="text-3xl font-black tracking-tighter">Made<span className="text-primary">Best</span></span>
                        </Link>
                        <p className="text-white/60 leading-relaxed max-w-sm">
                            Crafting unforgettable culinary experiences since 2022. We combine traditional flavors with modern innovation to bring the best to your table.
                        </p>
                        <div className="flex gap-4">
                            {[FaFacebook, FaInstagram, FaTwitter, FaLinkedin].map((Icon, i) => (
                                <a key={i} href="#" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center transition-all hover:bg-primary hover:border-primary hover:-translate-y-1">
                                    <Icon size={18} />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Links Sections */}
                    <div className="lg:col-span-5 grid grid-cols-2 md:grid-cols-3 gap-8">
                        {footerNavs.map((section, idx) => (
                            <div key={idx} className="space-y-6">
                                <h4 className="text-sm font-bold uppercase tracking-[0.2em] text-primary">{section.title}</h4>
                                <ul className="space-y-4">
                                    {section.links.map((link, lIdx) => (
                                        <li key={lIdx}>
                                            <Link to={link.href} className="text-white/50 hover:text-white transition-colors text-sm font-medium">
                                                {link.name}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>

                    {/* Contact/Newsletter */}
                    <div className="lg:col-span-3 space-y-8">
                        <div className="space-y-6">
                            <h4 className="text-sm font-bold uppercase tracking-[0.2em] text-primary">Get in Touch</h4>
                            <ul className="space-y-4">
                                <li className="flex items-start gap-3 text-white/60 text-sm">
                                    <HiOutlineLocationMarker className="text-primary mt-1" size={20} />
                                    <span>768 Gulsan Market, Mirpur,<br/>Dhaka 1280</span>
                                </li>
                                <li className="flex items-center gap-3 text-white/60 text-sm">
                                    <HiOutlinePhone className="text-primary" size={20} />
                                    <span>(+880) 1822 334 99</span>
                                </li>
                                <li className="flex items-center gap-3 text-white/60 text-sm">
                                    <HiOutlineMail className="text-primary" size={20} />
                                    <span>hello@madebest.com</span>
                                </li>
                            </ul>
                        </div>
                        
                        <div className="space-y-4">
                            <h4 className="text-xs font-bold uppercase tracking-widest">Newsletter</h4>
                            <form className="relative" onSubmit={e => e.preventDefault()}>
                                <input 
                                    type="email" 
                                    placeholder="Your email address" 
                                    className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-6 pr-12 text-sm focus:outline-none focus:border-primary/50 transition-colors"
                                />
                                <button className="absolute right-2 top-2 bottom-2 px-4 bg-primary text-white rounded-xl hover:bg-primary/80 transition-colors">
                                    Go
                                </button>
                            </form>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="pt-12 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-6">
                    <p className="text-white/40 text-xs font-medium">
                        &copy; 2024 MadeBest Restaurant. Handcrafted with passion.
                    </p>
                    <div className="flex items-center gap-8 text-[10px] font-bold uppercase tracking-widest text-white/20">
                         <span>Modern Nomad System</span>
                         <span>Privacy first</span>
                    </div>
                </div>
            </div>
        </footer>
    );
});

Footer.displayName = 'Footer';

export default Footer;