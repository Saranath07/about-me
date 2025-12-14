import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { RefreshCw } from 'lucide-react';

const CLTVisualizer: React.FC = () => {
    const [buckets, setBuckets] = useState<number[]>(new Array(21).fill(0));
    const [sampleCount, setSampleCount] = useState(0);
    const [isAnimating, setIsAnimating] = useState(false);

    // Config
    const BUCKET_COUNT = 21; // -10 to +10 roughly centered
    const SAMPLE_SIZE = 5; // Sum of 5 random numbers

    const runSimulation = () => {
        if (isAnimating) return;
        setIsAnimating(true);

        let count = 0;
        const maxSamples = 50;

        const interval = setInterval(() => {
            if (count >= maxSamples) {
                clearInterval(interval);
                setIsAnimating(false);
                return;
            }

            // Generate a sample: sum of N uniform random variables
            let sum = 0;
            for (let i = 0; i < SAMPLE_SIZE; i++) {
                sum += Math.random();
            }
            // sum is between 0 and SAMPLE_SIZE. Mean is SAMPLE_SIZE/2.
            // Normalize to bucket index
            // Range [0, 5], center 2.5
            // Map to [0, 20]

            const normalized = (sum / SAMPLE_SIZE) * (BUCKET_COUNT - 1);
            const bucketIndex = Math.round(normalized);

            setBuckets(prev => {
                const newBuckets = [...prev];
                newBuckets[bucketIndex]++;
                return newBuckets;
            });
            setSampleCount(prev => prev + 1);
            count++;
        }, 50);
    };

    const reset = () => {
        setBuckets(new Array(BUCKET_COUNT).fill(0));
        setSampleCount(0);
        setIsAnimating(false);
    };

    const maxVal = Math.max(...buckets, 1);

    return (
        <div className="w-full max-w-4xl mx-auto bg-black/40 p-6 rounded-xl border border-math-accent/20 backdrop-blur-sm">
            <h3 className="text-2xl font-mono mb-4 text-math-accent">Central Limit Theorem</h3>
            <p className="mb-6 text-gray-300">
                Summing uniform random variables creates a Normal Distribution.
                <br />
                <span className="text-sm text-gray-500">Samples: {sampleCount} | Sum of {SAMPLE_SIZE} Uniform(0,1) vars</span>
            </p>

            <div className="h-64 flex items-end gap-1 mb-8 relative border-b border-gray-700 pb-2">
                {buckets.map((val, idx) => {
                    const heightPercent = (val / maxVal) * 100;
                    return (
                        <div key={idx} className="flex-1 flex items-end justify-center h-full group relative">
                            <motion.div
                                className="w-full bg-math-blue/60 group-hover:bg-math-accent/80 transition-colors rounded-t-sm"
                                initial={{ height: 0 }}
                                animate={{ height: `${heightPercent}%` }}
                                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                            >
                            </motion.div>
                            {/* Distribution Curve overlay hint (Gaussian) could go here */}
                        </div>
                    )
                })}
            </div>

            <div className="flex gap-4">
                <button
                    onClick={runSimulation}
                    disabled={isAnimating}
                    className="px-6 py-2 bg-math-accent text-black font-semibold rounded hover:bg-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-mono"
                >
                    {isAnimating ? 'Simulating...' : 'Add 50 Samples'}
                </button>
                <button
                    onClick={reset}
                    className="p-2 border border-gray-600 rounded hover:bg-gray-800 transition-colors"
                >
                    <RefreshCw className="w-5 h-5" />
                </button>
            </div>
        </div>
    );
};

export default CLTVisualizer;
