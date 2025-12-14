import React from 'react';
import Navbar from './Navbar';

interface LayoutProps {
    children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
    return (
        <div className="min-h-screen bg-math-dark text-math-light">
            <Navbar />
            <main className="pt-16">
                {children}
            </main>
            <footer className="bg-black py-8 border-t border-math-accent/20 mt-20">
                <div className="max-w-7xl mx-auto px-4 text-center text-gray-500 font-mono text-sm">
                    <p>&copy; {new Date().getFullYear()} Saranath. built with react + math.</p>
                </div>
            </footer>
        </div>
    );
};

export default Layout;
