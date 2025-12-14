import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

interface SectionProps {
    id: string;
    title?: string;
    children: React.ReactNode;
    className?: string;
}

const Section: React.FC<SectionProps> = ({ id, title, children, className = "" }) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    return (
        <section id={id} className={`min-h-screen py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden ${className}`}>
            <motion.div
                ref={ref}
                initial={{ opacity: 0, y: 50 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="max-w-7xl mx-auto relative z-10"
            >
                {title && (
                    <h2 className="text-3xl md:text-5xl font-bold mb-12 text-transparent bg-clip-text bg-gradient-to-r from-math-accent to-math-blue font-mono">
                        {title}
                    </h2>
                )}
                {children}
            </motion.div>
        </section>
    );
};

export default Section;
