import React from 'react';
import { Gamepad2 } from 'lucide-react';

const RLPlayground: React.FC = () => {
    return (
        <div className="py-12 border-t border-gray-800">
            <div className="text-center p-12 bg-white/5 border border-math-accent/20 rounded-xl max-w-2xl mx-auto backdrop-blur-sm relative overflow-hidden group">
                <div className="absolute inset-0 bg-math-accent/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <Gamepad2 className="w-12 h-12 text-math-accent mx-auto mb-4" />
                <h3 className="text-2xl font-bold font-mono text-gray-200 mb-2">Reinforcement Learning Playground</h3>
                <p className="text-gray-400 font-mono mb-6">
                    I am currently building interactive RL agents that learn to play games right in your browser.
                    Coming soon: <span className="text-math-secondary">GridWorld</span> and <span className="text-math-secondary">Snake AI</span>.
                </p>
                <div className="inline-block px-4 py-2 border border-math-accent/50 text-math-accent text-sm font-mono rounded animate-pulse">
                    Development in Progress...
                </div>
            </div>
        </div>
    );
};

export default RLPlayground;
