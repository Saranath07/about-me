import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, ChevronDown, Terminal } from 'lucide-react';

const ProjectCard = ({ title, link, date, desc, stack, details, type }: any) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <motion.div
            className="bg-white/5 border border-gray-800 rounded-lg overflow-hidden hover:border-math-accent transition-all relative group"
            layout
        >
            <div className="p-6 cursor-pointer" onClick={() => setIsOpen(!isOpen)}>
                <div className="flex justify-between items-start mb-2">
                    <h3 className="text-lg font-bold font-mono text-gray-200 group-hover:text-math-accent transition-colors pr-8">
                        {title}
                    </h3>
                    <div className="flex gap-2">
                        <a
                            href={link}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="p-1 hover:bg-white/10 rounded transition-colors"
                        >
                            <ExternalLink className="w-5 h-5 text-math-accent" />
                        </a>
                    </div>
                </div>

                <div className="flex items-center gap-2 mb-4">
                    <span className="text-xs font-mono text-math-secondary px-2 py-0.5 border border-math-secondary/30 rounded bg-math-secondary/5">
                        {type}
                    </span>
                    <span className="text-xs text-gray-500 font-mono">{date}</span>
                </div>

                <ul className="text-sm text-gray-400 space-y-2 mb-6 font-mono">
                    {desc.map((d: string, i: number) => (
                        <li key={i} className="flex gap-2">
                            <span>-</span>
                            <span>{d}</span>
                        </li>
                    ))}
                </ul>

                <div className="flex items-center justify-between mt-auto">
                    <div className="flex flex-wrap gap-2">
                        {stack.split(', ').map((tech: string) => (
                            <span key={tech} className="px-2 py-1 text-[10px] font-mono rounded bg-math-blue/10 text-math-blue border border-math-blue/20">
                                {tech}
                            </span>
                        ))}
                    </div>
                    <motion.div animate={{ rotate: isOpen ? 180 : 0 }}>
                        <ChevronDown className="w-4 h-4 text-gray-500" />
                    </motion.div>
                </div>
            </div>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="bg-black/20 border-t border-gray-800"
                    >
                        <div className="p-6 text-sm text-gray-300 font-mono leading-relaxed">
                            <p className="mb-4 text-math-secondary font-bold flex items-center gap-2">
                                <Terminal className="w-4 h-4" />
                                Project Deep Dive
                            </p>
                            {details}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
};

const ProjectSection: React.FC = () => {
    const projects = [
        {
            title: "ProposaGen",
            link: "https://github.com/Saranath07/oversight-ai",
            date: "Aug 2024 -- Jan 2025",
            type: "Generative AI",
            desc: [
                "Top 30/3000 projects nationwide (Tata Innovent).",
                "AI-driven proposal generation from technical documents."
            ],
            stack: "DSPy, Langchain, Llama 3.1, Vector DB",
            details: (
                <div className="space-y-4">
                    <p>
                        <strong>ProposaGen</strong> is a generative AI system that studies multiple technical documents and engineering designs to generate personalized product proposals for clients.
                    </p>
                    <p>
                        The system intelligently analyzes vast amounts of data, extracting relevant information and understanding complex requirements. By doing so, it crafts proposals that incorporate specific technical details and design elements that each client requires.
                    </p>
                    <p>
                        We used <strong>DSPy</strong> to programmatically optimize prompts for the Llama-3.1 70B model, significantly improving proposal relevance. The system reduced draft time from 3 days to ~45 minutes, providing a <strong>92% cost reduction</strong> over traditional workflows.
                    </p>
                </div>
            )
        },
        {
            title: "Image Deblurring & Anomaly Detection",
            link: "https://github.com/Saranath07/deblurring-with-anomoly-detection",
            date: "Sep -- Nov 2024",
            type: "Computer Vision",
            desc: [
                "KLA R&D Challenge: Deblurring semiconductor wafer images.",
                "Achieved PSNR: 31.72 | SSIM: 0.9956."
            ],
            stack: "PyTorch, CNNs, Image Restoration",
            details: (
                <div className="space-y-4">
                    <p>
                        In high-speed wafer inspection, motion blur often obscures critical micro-defects. Standard deblurring GANs tend to hallucinate logic gates or smooth out actual defects.
                    </p>
                    <p>
                        I implemented a custom <strong>Structure-Aware Loss</strong> that prioritizes high-frequency components (edges/defects) over flat regions.
                        This ensured that the restored images maintained the topological integrity required for the downstream anomaly detection algorithms to function correctly.
                    </p>
                </div>
            )
        }
    ];

    return (
        <div className="grid md:grid-cols-2 gap-6 py-8">
            {projects.map((p, i) => (
                <ProjectCard key={i} {...p} />
            ))}
        </div>
    );
};

export default ProjectSection;
