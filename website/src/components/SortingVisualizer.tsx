import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { RefreshCw, Play } from 'lucide-react';

const SortingVisualizer: React.FC = () => {
    const [array, setArray] = useState<number[]>(generateArray());
    const [sorting, setSorting] = useState(false);

    function generateArray() {
        return Array.from({ length: 15 }, () => Math.floor(Math.random() * 50) + 10);
    }

    const bubbleSort = async () => {
        if (sorting) return;
        setSorting(true);
        const arr = [...array];

        const n = arr.length;
        for (let i = 0; i < n - 1; i++) {
            for (let j = 0; j < n - i - 1; j++) {
                if (arr[j] > arr[j + 1]) {
                    // Swap
                    [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
                    setArray([...arr]);
                    await new Promise(resolve => setTimeout(resolve, 150));
                }
            }
        }
        setSorting(false);
    };

    return (
        <div className="w-full max-w-4xl mx-auto bg-black/40 p-6 rounded-xl border border-math-accent/20 backdrop-blur-sm mt-8">
            <h3 className="text-2xl font-mono mb-4 text-math-secondary">Sorting Algorithms</h3>
            <p className="mb-6 text-gray-300">
                Visualizing how order emerges from chaos. <br />
                <span className="text-sm text-gray-500">Algorithm: Bubble Sort | Complexity: O(N²)</span>
            </p>

            <div className="h-48 flex items-end justify-center gap-1 mb-6">
                {array.map((value, idx) => (
                    <motion.div
                        layout
                        key={idx} // Using index as key is usually bad for reordering animations, but here we want to show position changes. Actually, for layout animation of VALUES moving, we should use a unique ID if we tracked objects. But for value-based bars, if we swap values in array, React re-renders.
                        // Better approach for framer-motion swap:
                        // The array needs to be objects with unique IDs to animate position changes properly.
                        // Let's stick to simple height animation for now or basic spring.
                        // Actually, layout prop handles position changes if keys are stable.
                        // But wait, if we swap values at indices, the key (idx) stays same, only height changes.
                        // To animate SWAPPING, we need the KEY to follow the VALUE.
                        // But we have duplicates maybe? Let's assume values are just heights.
                        // If we want them to slide past each other, we need unique IDs.
                        // For simplicity in this lightweight demo, we'll just animate height changes.
                        // OR, let's make it better: map to objects.
                        className="w-4 bg-math-secondary/70 rounded-t-sm"
                        animate={{ height: `${value}%` }}
                        transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    />
                ))}
            </div>

            <div className="flex gap-4">
                <button
                    onClick={bubbleSort}
                    disabled={sorting}
                    className="flex items-center gap-2 px-6 py-2 bg-math-secondary text-black font-semibold rounded hover:bg-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-mono"
                >
                    <Play className="w-4 h-4" /> {sorting ? 'Sorting...' : 'Start Sort'}
                </button>
                <button
                    onClick={() => setArray(generateArray())}
                    disabled={sorting}
                    className="p-2 border border-gray-600 rounded hover:bg-gray-800 transition-colors disabled:opacity-50"
                >
                    <RefreshCw className="w-5 h-5" />
                </button>
            </div>
        </div>
    );
};

export default SortingVisualizer;
