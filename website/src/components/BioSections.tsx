import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GraduationCap, Award, ExternalLink, ChevronDown, BookOpen } from 'lucide-react';

export const EducationSection: React.FC = () => {
    const edu = [
        {
            time: "Jan 2026 -- Present",
            degree: "MS (Research) in Data Science & AI",
            inst: "IIT Madras",
            link: "https://dsai.iitm.ac.in/academics/ms-phd-admissions/",
            details: "Focus: Theoretical ML, Deep Learning, RL.",
            lore: [
                "Researching under the guidance of top professors in India.",
                "Focusing on the intersection of theoretical guarantees and practical deep learning.",
                "Coursework includes Advanced DL, Reinforcement Learning, and Mathematical Foundations of Data Science."
            ]
        },
        {
            time: "2021 -- 2025",
            degree: "BS in Data Science & Applications",
            inst: "IIT Madras",
            link: "https://study.iitm.ac.in/ds/",
            details: "CGPA: 9.52/10 (Distinction). Direct upgrade to MS.",
            lore: [
                "Program Topper (2025).",
                " rigorous curriculum covering Math, Stats, ML, and CS.",
                "Built a strong foundation in linear algebra and probability theory."
            ]
        },
        {
            time: "2021 -- 2025",
            degree: "B.Tech in AI & Data Science",
            inst: "SRM Easwari Engineering College",
            link: "https://srmeaswari.ac.in/artificial-intelligence-and-data-science/",
            details: "CGPA: 8.87/10. First Class with Distinction.",
            lore: [
                
                "Organized multiple workshops and talks.",
                "Completed major projects in Computer Vision and NLP."
            ]
        }
    ];

    return (
        <div className="relative border-l border-gray-800 ml-4 pl-8 py-4 space-y-12">
            {edu.map((e, i) => (
                <EducationCard key={i} {...e} />
            ))}
        </div>
    );
};

const EducationCard = ({ time, degree, inst, link, details, lore }: any) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="relative group">
            <span className="absolute -left-[41px] top-1 bg-math-dark border border-math-accent p-1.5 rounded-full text-math-accent shadow-[0_0_10px_rgba(0,255,204,0.3)]">
                <GraduationCap className="w-4 h-4" />
            </span>
            <div className="bg-white/5 border border-gray-800 rounded-lg p-4 hover:border-math-blue/50 transition-all cursor-pointer" onClick={() => setIsOpen(!isOpen)}>
                <div className="flex justify-between items-start">
                    <div>
                        <h3 className="text-lg font-bold text-gray-200 font-mono group-hover:text-math-accent transition-colors">{degree}</h3>
                        <a
                            href={link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-math-blue font-mono text-sm mb-2 hover:underline flex items-center gap-1 z-10 relative"
                            onClick={(e) => e.stopPropagation()}
                        >
                            {inst} <ExternalLink className="w-3 h-3" />
                        </a>
                        <p className="text-xs text-gray-500 font-mono mb-2">{time}</p>
                    </div>
                    <motion.div animate={{ rotate: isOpen ? 180 : 0 }}>
                        <ChevronDown className="w-4 h-4 text-gray-400" />
                    </motion.div>
                </div>

                <p className="text-gray-400 font-mono text-sm">{details}</p>

                <AnimatePresence>
                    {isOpen && (
                        <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="overflow-hidden"
                        >
                            <div className="pt-4 mt-4 border-t border-gray-800">
                                <ul className="space-y-2 text-sm text-gray-400 font-mono">
                                    {lore.map((item: string, idx: number) => (
                                        <li key={idx} className="flex gap-2">
                                            <span className="text-math-secondary">▹</span>
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}

export const ExperienceSection: React.FC = () => {
    return (
        <div className="bg-white/5 border border-math-blue/20 p-6 rounded-lg backdrop-blur-sm">
            <div className="flex items-start justify-between mb-4">
                <div>
                    <h3 className="text-xl font-bold text-math-light font-mono">Software Engineer - AI</h3>
                    <p className="text-math-secondary font-mono">S2T.ai (Remote)</p>
                </div>
                <div className="text-xs text-gray-500 font-mono border border-gray-700 px-2 py-1 rounded">
                    Jan 2025 -- Present
                </div>
            </div>

            <ul className="space-y-3 text-sm text-gray-300 font-mono">
                <li className="flex gap-3">
                    <span className="text-math-secondary">▹</span>
                    <span>Natural Language ETL: Architected end-to-end AI pipelines accessible via NL interfaces.</span>
                </li>
                <li className="flex gap-3">
                    <span className="text-math-secondary">▹</span>
                    <span>Robust Semantic Search: Engineered high-tolerance query parsing systems.</span>
                </li>
                <li className="flex gap-3">
                    <span className="text-math-secondary">▹</span>
                    <span>MLOps: Managing lifecycle from training to production using Kafka & Celery.</span>
                </li>
            </ul>
        </div>
    );
};

export const TeachingSection: React.FC = () => {
    const teaching = [
        {
            role: "Teaching Assistant",
            course: "Introduction to Machine Learning (Tamil), NPTEL",
            inst: "under Prof. Arun Rajkumar",
            term: "Sep 2023 - Present",
            desc: "Co-developing course content, creating assessment materials (quizzes and exams), and facilitating student learning through active forum discussions and doubt-clearing sessions."
        },
        {
            role: "Teaching Assistant",
            course: "Programming, Data Structures",
            inst: "IIT Madras",
            term: "Sep - Dec 2023",
            desc: "Mentored students, graded assignments, and conducted tutorials for Algorithms using Python."
        },
        {
            role: "Teaching Assistant",
            course: "Getting Started with Competitive Programming",
            inst: "NPTEL",
            term: "Jul - Sep 2023",
            desc: "Assisted learners with complex algorithmic problems and programming paradigms."
        },
        {
            role: "Teaching Assistant",
            course: "Statistics for Data Science 2",
            inst: "IIT Madras",
            term: "Jan - May 2023",
            desc: "Supported students in understanding core statistical concepts and their application."
        }
    ];

    return (
        <div className="grid gap-4 mt-8">
            <h3 className="text-xl font-bold text-gray-400 font-mono border-b border-gray-800 pb-2 mb-4">Teaching Experience</h3>
            {teaching.map((t, i) => (
                <div key={i} className="flex gap-4 p-4 bg-white/5 rounded border border-gray-800">
                    <div className="mt-1">
                        <BookOpen className="w-5 h-5 text-math-accent" />
                    </div>
                    <div>
                        <h4 className="text-lg font-bold text-gray-200 font-mono">{t.role} | {t.course}</h4>
                        <p className="text-sm text-math-blue font-mono">{t.inst} • {t.term}</p>
                        <p className="text-sm text-gray-400 font-mono mt-2">{t.desc}</p>
                    </div>
                </div>
            ))}
        </div>
    );
};

export const HonorsSection: React.FC = () => {
    const awards = [
        "Selected as Senior Field Officer (Class-1 Gazetted) by Govt of India.",
        "GATE DA 2025: AIR 244 (Top 1% nationwide).",
        "Program Topper: BS Data Science, IIT Madras (2023).",
        "Best Project Award: ML Practice Project, IIT Madras."
    ];

    return (
        <div className="grid md:grid-cols-2 gap-4">
            {awards.map((a, i) => (
                <div key={i} className="flex items-center gap-3 bg-white/5 p-4 rounded border border-gray-800 hover:border-yellow-500/50 transition-colors">
                    <Award className="w-5 h-5 text-yellow-500 flex-shrink-0" />
                    <span className="text-sm font-mono text-gray-300">{a}</span>
                </div>
            ))}
        </div>
    );
};
