import React from 'react';
import { motion } from 'framer-motion';

const Skills: React.FC = () => {
    const skillSets = [
        {
            domain: "L = { Languages }",
            items: ["TypeScript", "Python", "Rust", "SQL", "LaTeX"]
        },
        {
            domain: "F = { Frameworks }",
            items: ["React", "Next.js", "Tailwind", "Framer Motion", "PyTorch"]
        },
        {
            domain: "T = { Tools }",
            items: ["Git", "Docker", "Linux", "Vite", "VS Code"]
        }
    ];

    return (
        <div className="grid md:grid-cols-3 gap-6">
            {skillSets.map((set, idx) => (
                <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.1, duration: 0.5 }}
                    className="bg-black/40 border border-math-blue/30 p-6 rounded-lg backdrop-blur-sm hover:border-math-accent/50 transition-colors"
                >
                    <h4 className="text-xl font-mono text-math-blue mb-4 border-b border-gray-800 pb-2">
                        {set.domain}
                    </h4>
                    <div className="font-mono text-gray-300">
                        <span className="text-gray-500">{'{'}</span>
                        <div className="pl-4 py-2 space-y-1">
                            {set.items.map((item, i) => (
                                <div key={item} className="flex items-center">
                                    <span className="w-2 h-2 bg-math-accent rounded-full mr-3 opacity-70"></span>
                                    {item}
                                    {i < set.items.length - 1 && <span className="text-gray-600">,</span>}
                                </div>
                            ))}
                        </div>
                        <span className="text-gray-500">{'}'}</span>
                    </div>
                </motion.div>
            ))}
        </div>
    );
};

export default Skills;
