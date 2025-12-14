import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Activity, Database, Cpu, Network } from 'lucide-react';
import RankingGame from './RankingGame';
import 'katex/dist/katex.min.css';
import Latex from 'react-latex-next';

const ResearchItem = ({ title, lab, date, points, Visual, tags, details }: any) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <motion.div
            layout
            className="bg-black/30 border border-math-blue/20 rounded-lg overflow-hidden backdrop-blur-sm hover:border-math-accent/40 transition-colors mb-6"
        >
            <motion.div
                layout="position"
                onClick={() => setIsOpen(!isOpen)}
                className="p-6 cursor-pointer"
            >
                <div className="flex justify-between items-start">
                    <div>
                        <h3 className="text-xl font-bold text-math-light font-mono flex items-center gap-2">
                            {title}
                            {Visual && <Activity className="w-4 h-4 text-math-accent" />}
                        </h3>
                        <p className="text-math-blue font-mono text-sm mt-1">{lab} | {date}</p>
                    </div>
                    <motion.div
                        animate={{ rotate: isOpen ? 180 : 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        <ChevronDown className="w-5 h-5 text-gray-400" />
                    </motion.div>
                </div>

                {tags && (
                    <div className="flex flex-wrap gap-2 mt-4">
                        {tags.map((tag: string) => (
                            <span key={tag} className="text-xs font-mono text-gray-500 border border-gray-800 px-2 py-1 rounded">
                                {tag}
                            </span>
                        ))}
                    </div>
                )}
            </motion.div>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="px-6 pb-6 border-t border-math-blue/10 bg-black/20"
                    >
                        <ul className="list-none space-y-3 text-gray-300 font-mono text-sm mt-4">
                            {points.map((point: string, i: number) => (
                                <li key={i} className="flex gap-3">
                                    <span className="text-math-accent mt-1">▹</span>
                                    <span>{point}</span>
                                </li>
                            ))}
                        </ul>

                        {details && (
                            <div className="mt-6 pt-6 border-t border-gray-800">
                                <p className="text-math-secondary font-bold font-mono text-sm mb-4">// Technical Deep Dive</p>
                                {details}
                            </div>
                        )}

                        {Visual && (
                            <div className="mt-8 p-4 border border-math-accent/10 rounded bg-black/40">
                                <div className="text-xs text-math-secondary mb-2 font-mono uppercase tracking-widest">Interactive Model</div>
                                <Visual />
                            </div>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
};

const ResearchSection: React.FC = () => {
    const research = [
        {
            title: "Research Assistant | Theoretical ML",
            lab: "IIT Madras (Advised by Prof. Arun Rajkumar)",
            date: "May 2025 -- Present",
            tags: ["Active Learning", "Spectral Graph Theory", "Budgeted Optimization"],
            points: [
                "Novel Framework: Pioneered a three-phase paradigm for winner identification under extreme budget constraints (Shoestring Budget).",
                "Theoretical Guarantee: Proved that Tournament initialization ensures an O(n) factor improvement in spectral gap (λ₂) over King-of-the-Hill methods.",
                "Sample Complexity: Designed a 'Gatekeeper' mechanism using Hoeffding bounds to statistically validate top-k candidates before exploitation."
            ],
            details: (
                <div className="space-y-4 font-mono text-sm text-gray-400">
                    <div className="bg-white/5 p-4 rounded border border-gray-800 mb-4">
                        <h4 className="text-math-accent font-bold mb-2 flex items-center gap-2">
                            <Database className="w-4 h-4" />
                            The "Shoestring" Challenge
                        </h4>
                        <div className="tex-xs mb-2">
                            <Latex>
                                {`How do you find the single best item among 1000 options if you can only afford 3000 comparisons? 
                                Standard algorithms like QuickSort ($O(n \\log n)$) or UCB fail here.`}
                            </Latex>
                        </div>
                        <div className="text-xs">
                            <Latex>
                                {`My work focuses on the $\\textbf{$m \\approx cn$}$ regime. I proved that maximizing the 
                                $\\textbf{Spectral Gap ($\\lambda_2$)}$ of the comparison graph is the only way to minimize error variance under equal budget.`}
                            </Latex>
                        </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                        <div>
                            <h5 className="text-gray-200 font-bold mb-1">Spectral Geometry</h5>
                            <div className="text-xs">
                                <Latex>
                                    {`Proved that sequential "King-of-the-Hill" graphs degenerate into paths ($\\lambda_2 \\approx n^{-2}$), causing information bottlenecks. 
                                    Our $\\textbf{Tournament}\$ structure guarantees tree-like connectivity ($\\lambda_2 \\approx n^{-1}$), enabling $O(n)$ faster convergence.`}
                                </Latex>
                            </div>
                        </div>
                        <div>
                            <h5 className="text-gray-200 font-bold mb-1">Gatekeeper Phase</h5>
                            <p className="text-xs">
                                Most active learning algorithms waste budget distinguishing top contenders vs weak outliers.
                                My framework introduces a statistical hypothesis test (<strong>Gatekeeper</strong>) that rigorously filters imposters before the expensive "Exploit" phase.
                            </p>
                        </div>
                    </div>

                    <div className="mt-4 pt-4 border-t border-gray-800">
                        <p>
                            <strong>Result:</strong> This approach outperforms state-of-the-art baselines (PARWiS, RUCB) by <strong>15-20%</strong> in winner recovery rates on the Netflix and Jester datasets.
                        </p>
                    </div>
                </div>
            ),
            Visual: RankingGame
        },
        {
            title: "Research Assistant | LLM Alignment",
            lab: "AI4Bharat Lab, IIT Madras (Advised by Prof. Mitesh Khapra)",
            date: "Sep 2024 -- July 2025",
            tags: ["Synthetic Data Generation", "LLM Agents", "Multi-Provider Orchestration"],
            points: [
                "LLM-SDG Framework: Architected a comprehensive Python framework for efficient synthetic data generation.",
                "Taxonomy & SFT: Developed a granular taxonomy to capture cultural nuances in Indic languages.",
                "Engineered autonomous agents to generate high-quality Supervised Fine-Tuning (SFT) datasets."
            ],
            details: (
                <div className="space-y-4 font-mono text-sm text-gray-400">
                    <div className="bg-white/5 p-4 rounded border border-gray-800 mb-4">
                        <h4 className="text-math-accent font-bold mb-2 flex items-center gap-2">
                            <Network className="w-4 h-4" />
                            LLM-SDG Architecture
                        </h4>
                        <p className="text-xs mb-3">
                            Designed a modular, agentic framework to solve the scarcity of high-quality Indic language instruction data.
                            The system moves beyond simple prompting by implementing a <strong>Draft-Critique-Refine</strong> loop.
                        </p>
                        <div className="flex flex-col items-center gap-2 text-[10px] text-center">
                            {/* Generator */}
                            <div className="w-full max-w-xs bg-gradient-to-br from-math-blue/20 to-transparent p-3 rounded-lg border border-math-blue/40">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-math-blue/20 flex items-center justify-center shrink-0">
                                        <span className="text-lg">📝</span>
                                    </div>
                                    <div className="text-left">
                                        <span className="text-math-blue block font-bold">Generator</span>
                                        <span className="text-gray-500">Drafts content via persona prompts</span>
                                    </div>
                                </div>
                            </div>

                            {/* Arrow 1 */}
                            <div className="text-gray-600 text-xl">↓</div>

                            {/* Critique */}
                            <div className="w-full max-w-xs bg-gradient-to-br from-math-secondary/20 to-transparent p-3 rounded-lg border border-math-secondary/40">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-math-secondary/20 flex items-center justify-center shrink-0">
                                        <span className="text-lg">🔍</span>
                                    </div>
                                    <div className="text-left">
                                        <span className="text-math-secondary block font-bold">Critique Agent</span>
                                        <span className="text-gray-500">Evaluates reasoning & safety</span>
                                    </div>
                                </div>
                            </div>

                            {/* Arrow 2 */}
                            <div className="text-gray-600 text-xl">↓</div>

                            {/* Refiner */}
                            <div className="w-full max-w-xs bg-gradient-to-br from-math-accent/20 to-transparent p-3 rounded-lg border border-math-accent/40">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-math-accent/20 flex items-center justify-center shrink-0">
                                        <span className="text-lg">✨</span>
                                    </div>
                                    <div className="text-left">
                                        <span className="text-math-accent block font-bold">Refiner</span>
                                        <span className="text-gray-500">Polishes via structured feedback</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                        <div>
                            <h5 className="text-gray-200 font-bold mb-1 flex items-center gap-2">
                                <Database className="w-3 h-3" /> native-struct
                            </h5>
                            <p className="text-xs">
                                Developed a custom schema validation system to ensure synthetic data adheres to complex JSON structures required for tool-use fine-tuning.
                                Handled <strong>22 Indic languages</strong> with specific focus on maintaining grammatical correctness during cross-lingual transfer.
                            </p>
                        </div>
                        <div>
                            <h5 className="text-gray-200 font-bold mb-1 flex items-center gap-2">
                                <Cpu className="w-3 h-3" /> Multi-Provider Swarm
                            </h5>
                            <p className="text-xs">
                                Orchestrated parallel requests across <strong>OpenAI, Gemini, Azure, and vLLM</strong> endpoints.
                                Implemented smart routing to send simple tasks to cheaper models (Llama-3-8B) and complex reasoning to SOTA models (GPT-4o), reducing costs by <strong>92%</strong>.
                            </p>
                        </div>
                    </div>

                    <div className="mt-4 pt-4 border-t border-gray-800 text-xs">
                        <div className="flex justify-between items-center bg-math-blue/10 p-2 rounded border border-math-blue/20">
                            <span><strong>Scale:</strong> Generated 100K+ high-quality instruction pairs.</span>
                            <span className="text-math-accent">Open Sourced per AI4Bharat policy</span>
                        </div>
                    </div>
                </div>
            )
        },
        {
            title: "Research Assistant | Sequence Modeling",
            lab: "IIT Madras (Advised by Prof. Chandrasekhar L.)",
            date: "June 2025 -- Present",
            tags: ["State Space Models", "Mamba", "Transformers"],
            points: [
                "State Space Models (SSM): Investigating Mamba architectures against Transformers for discrete sequences.",
                "Next-Event Prediction: Modeling chess/cricket moves to analyze long-horizon dependency retention.",
                "Complexity Analysis: Demonstrating Mamba's O(N) advantage over Transformers O(N²) for long contexts."
            ],
            details: (
                <div className="space-y-4 font-mono text-sm text-gray-400">
                    <div className="bg-white/5 p-4 rounded border border-gray-800 mb-4">
                        <h4 className="text-math-accent font-bold mb-2 flex items-center gap-2">
                            <Activity className="w-4 h-4" />
                            The Long-Context Problem
                        </h4>
                        <div className="text-xs">
                            <Latex>
                                {`Transformers suffer from quadratic complexity $O(L^2)$ with sequence length $L$, making them inefficient for long-horizon discrete games. 
                                 State Space Models (SSMs) like $\\textbf{Mamba}$ offer linear scaling $O(L)$ but historically struggled with discrete modalities.`}
                            </Latex>
                        </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                        <div>
                            <h5 className="text-gray-200 font-bold mb-1">Architecture Analysis</h5>
                            <div className="text-xs">
                                <Latex>
                                    {`Evaluating Mamba's $\\textbf{Selection Mechanism}$ which allows the model to compress context into a fixed-size state $h_t$. 
                                    Hypothesis: Mamba allows "information-dense" updates, retaining critical game states (e.g., Chess board configuration) better than attention sinks.`}
                                </Latex>
                            </div>
                        </div>
                        <div>
                            <h5 className="text-gray-200 font-bold mb-1">Discrete Domains</h5>
                            <p className="text-xs">
                                Applying the architecture to <strong>Stochastic Games</strong> (Chess & Cricket).
                                Unlike natural language, these domains require exact state tracking (e.g., remaining wickets, valid moves) over thousands of steps.
                            </p>
                        </div>
                    </div>

                    <div className="mt-4 pt-4 border-t border-gray-800">
                        <p>
                            <strong>Goal:</strong> Establishing Mamba as a viable, compute-efficient alternative to Transformers for real-time sports analytics and game engines.
                        </p>
                    </div>
                </div>
            )
        }
    ];

    return (
        <div className="py-8">
            {research.map((item, idx) => (
                <ResearchItem key={idx} {...item} />
            ))}
        </div>
    );
};

export default ResearchSection;
