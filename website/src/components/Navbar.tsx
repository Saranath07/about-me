import React from 'react';
import { motion } from 'framer-motion';
import { Menu, X, Sigma } from 'lucide-react';
import { useState } from 'react';

const Navbar: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);

    const links = [
        { name: 'About', href: '#about' },
        { name: 'Research', href: '#research' },
        { name: 'Experience', href: '#experience' },
        { name: 'Projects', href: '#projects' },
        { name: 'Education', href: '#education' },
    ];

    return (
        <nav className="fixed top-0 left-0 w-full z-50 bg-math-dark/80 backdrop-blur-md border-b border-math-accent/20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <div className="flex items-center">
                        <a href="#" className="flex-shrink-0 text-math-accent font-mono font-bold text-xl flex items-center gap-2">
                            <Sigma className="w-6 h-6" />
                            <span>SARANATH</span>
                        </a>
                    </div>
                    <div className="hidden md:block">
                        <div className="ml-10 flex items-baseline space-x-4">
                            {links.map((link) => (
                                <a
                                    key={link.name}
                                    href={link.href}
                                    className="text-gray-300 hover:text-math-accent hover:bg-white/5 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 font-mono"
                                >
                                    {link.name}
                                </a>
                            ))}
                        </div>
                    </div>
                    <div className="-mr-2 flex md:hidden">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none"
                        >
                            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                        </button>
                    </div>
                </div>
            </div>

            {isOpen && (
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="md:hidden"
                >
                    <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-math-dark border-b border-math-accent/20">
                        {links.map((link) => (
                            <a
                                key={link.name}
                                href={link.href}
                                className="text-gray-300 hover:text-math-accent block px-3 py-2 rounded-md text-base font-medium font-mono"
                                onClick={() => setIsOpen(false)}
                            >
                                {link.name}
                            </a>
                        ))}
                    </div>
                </motion.div>
            )}
        </nav>
    );
};

export default Navbar;
