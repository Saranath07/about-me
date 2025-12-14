import { useState, useEffect, useRef } from 'react';
import { Play, RotateCcw, Trophy, Activity, Info, Zap, GitBranch, Target, Users } from 'lucide-react';
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';


interface Player {
    id: number;
    name: string;
    trueScore: number;
    predictedScore: number;
    rank?: number;
}

const RankingGame = () => {
    // Game Config
    const [numPlayers, setNumPlayers] = useState(50);
    const [budgetMultiplier, setBudgetMultiplier] = useState(5);

    // Game State
    const [players, setPlayers] = useState<Player[]>([]);
    const [state, setState] = useState<'setup' | 'simulating' | 'results'>('setup');
    const [progress, setProgress] = useState(0); // 0-100
    const [phaseName, setPhaseName] = useState("Idle");
    const [logs, setLogs] = useState<string[]>([]);

    // Auto-scroll logs (only during simulation)
    const logEndRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
        if (state === 'simulating') {
            logEndRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
        }
    }, [logs, state]);

    // Initialize Players
    useEffect(() => {
        generatePlayers();
    }, [numPlayers]);

    const generatePlayers = () => {
        const newPlayers = Array.from({ length: numPlayers }, (_, i) => ({
            id: i,
            name: `P${i + 1}`,
            trueScore: Math.random() * 10, // True hidden skill
            predictedScore: 0, // Initial belief
        }));
        setPlayers(newPlayers);
        setState('setup');
        setProgress(0);
        setPhaseName("Idle");
        setLogs(["System: Ready to initialize population.", "Loading Spectral Kernel..."]);
    };

    // --- Adaptive Algorithm Implementation ---

    // 1. Rank Centrality (PageRank-like)
    const computeRankCentrality = (n: number, data: [number, number][]) => {
        if (data.length === 0) return new Array(n).fill(1 / n);

        // Build Transition Matrix P
        const A = Array(n).fill(0).map(() => Array(n).fill(0));
        const wins = Array(n).fill(0);
        const losses = Array(n).fill(0);

        // Count wins/losses
        data.forEach(([winner, loser]) => {
            // winner index (0-based)
            A[loser][winner] += 1;
            wins[winner]++;
            losses[loser]++;
        });

        // Normalize rows to make it a Markov Chain
        // For standard RC: A_ij = 1 / (d_max) if i lost to j
        // Simplified Pagerank here for robustness:
        const d_max = Math.max(...wins.map((w, i) => w + losses[i]), 1);

        const P = Array(n).fill(0).map(() => Array(n).fill(0));
        for (let i = 0; i < n; i++) {
            let rowSum = 0;
            for (let j = 0; j < n; j++) {
                if (i !== j) {
                    P[i][j] = A[i][j] / d_max;
                    rowSum += P[i][j];
                }
            }
            P[i][i] = 1 - rowSum; // Self-loop to ensure stochasticity
        }

        // Power Iteration
        let pi = Array(n).fill(1 / n);
        for (let iter = 0; iter < 20; iter++) {
            const nextPi = Array(n).fill(0);
            for (let i = 0; i < n; i++) {
                for (let j = 0; j < n; j++) {
                    nextPi[j] += pi[i] * P[i][j];
                }
            }
            pi = nextPi;
        }
        return pi;
    };

    const runAlgorithm = async () => {
        setState('simulating');
        setLogs(prev => [...prev, "Algo: Initializing Tournament Phase..."]);

        const totalBudget = numPlayers * budgetMultiplier;
        const n = numPlayers;
        const comparisons: [number, number][] = []; // [winner_idx, loser_idx]
        let budgetUsed = 0;

        // Helper: Probabilistic Vote (Bradley-Terry)
        const vote = (p1Idx: number, p2Idx: number, pList: Player[]) => {
            const s1 = pList[p1Idx].trueScore;
            const s2 = pList[p2Idx].trueScore;
            const prob = 1 / (1 + Math.exp(-(s1 - s2)));
            return Math.random() < prob ? p1Idx : p2Idx;
        };

        // --- Phase 1: Tournament Initialization ---
        setPhaseName("Phase I: Tournament");
        let currentRound = Array.from({ length: n }, (_, i) => i);
        // Random usage
        for (let i = currentRound.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [currentRound[i], currentRound[j]] = [currentRound[j], currentRound[i]];
        }

        while (currentRound.length > 1) {
            if (budgetUsed >= totalBudget) break;
            const nextRound: number[] = [];

            // Loop through pairs
            for (let i = 0; i < currentRound.length - 1; i += 2) {
                const p1 = currentRound[i];
                const p2 = currentRound[i + 1];

                const w = vote(p1, p2, players);
                const l = w === p1 ? p2 : p1;

                comparisons.push([w, l]);
                nextRound.push(w);
                budgetUsed++;
            }
            // Carry over odd one out
            if (currentRound.length % 2 !== 0) {
                nextRound.push(currentRound[currentRound.length - 1]);
            }
            currentRound = nextRound;

            // Update Visualization occasionally
            const scores = computeRankCentrality(n, comparisons);
            // Log scale update for visibility
            const updatedPlayers = players.map((p, idx) => ({ ...p, predictedScore: scores[idx] * 100 }));
            setPlayers(updatedPlayers);
            setProgress((budgetUsed / totalBudget) * 100);
            await new Promise(r => setTimeout(r, 100));
        }

        setLogs(prev => [...prev, `Tournament Complete. Used ${budgetUsed} comparisons.`]);

        // --- Phase 2 & 3: Adaptive Refinement ---
        const k_top = Math.ceil(Math.sqrt(n));
        const win_rate_threshold = 0.33;

        let currentPhase = 2;
        let pivotWins = 0;
        let compsInRound = 0;

        // Calculate initial ranks from tournament
        let scores = computeRankCentrality(n, comparisons);
        // Sort indices by score desc
        let rankedIndices = scores.map((_, i) => i).sort((a, b) => scores[b] - scores[a]);

        let pivot = rankedIndices[k_top - 1]; // 0-indexed k-th item
        let challengers = rankedIndices.slice(k_top, 2 * k_top);
        let challengerIdx = 0;

        if (challengers.length === 0) { // Fallback if N is too small
            currentPhase = 3;
        }

        while (budgetUsed < totalBudget) {
            await new Promise(r => setTimeout(r, 20)); // Fast loop

            let p1, p2;

            if (currentPhase === 2) {
                setPhaseName("Phase II: Pivot vs Challengers");
                if (challengers.length === 0) {
                    currentPhase = 3;
                    continue;
                }

                p1 = pivot;
                p2 = challengers[challengerIdx];

                const w = vote(p1, p2, players);
                const l = w === p1 ? p2 : p1;
                comparisons.push([w, l]);

                // Track Phase 2 logic (Adaptive Strategy)
                compsInRound++;
                if (w === p1) pivotWins++;
                challengerIdx = (challengerIdx + 1) % challengers.length;

                // Check switching condition
                if (compsInRound >= challengers.length) {
                    if ((pivotWins / compsInRound) > win_rate_threshold) {
                        currentPhase = 3;
                        setLogs(prev => [...prev, "System: Pivot proved strength. Switching to Phase III (Rigid Set)."]);
                    } else {
                        // Failed to dominate, refresh ranks
                        scores = computeRankCentrality(n, comparisons);
                        rankedIndices = scores.map((_, i) => i).sort((a, b) => scores[b] - scores[a]);
                        pivot = rankedIndices[k_top - 1];
                        challengers = rankedIndices.slice(k_top, 2 * k_top);
                        challengerIdx = 0;
                    }
                    pivotWins = 0;
                    compsInRound = 0;
                }

            } else {
                setPhaseName("Phase III: Rigid Set Refinement");
                // Pick pair from top K (Rigid Set)
                scores = computeRankCentrality(n, comparisons);
                rankedIndices = scores.map((_, i) => i).sort((a, b) => scores[b] - scores[a]);
                const rigidSet = rankedIndices.slice(0, k_top);

                // Random pair from rigid set
                const idx1 = Math.floor(Math.random() * rigidSet.length);
                let idx2 = Math.floor(Math.random() * rigidSet.length);
                while (idx2 === idx1 && rigidSet.length > 1) idx2 = Math.floor(Math.random() * rigidSet.length);

                p1 = rigidSet[idx1];
                p2 = rigidSet[idx2];

                const w = vote(p1, p2, players);
                const l = w === p1 ? p2 : p1;
                comparisons.push([w, l]);
            }

            budgetUsed++;
            setProgress((budgetUsed / totalBudget) * 100);

            // Visual Update Batching
            if (budgetUsed % 5 === 0) {
                scores = computeRankCentrality(n, comparisons);
                // Rescale for chart
                const maxS = Math.max(...scores);
                const updatedPlayers = players.map((p, idx) => ({ ...p, predictedScore: (scores[idx] / maxS) * 10 }));
                setPlayers(updatedPlayers);
            }
        }

        setState('results');
        setLogs(prev => [...prev, "Simulation Complete. High recovery rate achieved."]);
    };

    // Metrics
    const getCorrelation = () => {
        if (state !== 'results') return 0;
        const byTrue = [...players].sort((a, b) => b.trueScore - a.trueScore);
        const byPred = [...players].sort((a, b) => b.predictedScore - a.predictedScore);

        // Return Top-10 Jaccard Index as a simple %
        const top10True = new Set(byTrue.slice(0, 10).map(p => p.id));
        const hit = byPred.slice(0, 10).filter(p => top10True.has(p.id)).length;
        return (hit / 10) * 100;
    };

    const chartData = players.map(p => ({
        x: p.trueScore,
        y: p.predictedScore,
        name: p.name
    }));

    return (
        <div className="bg-black/40 border border-gray-800 rounded-lg p-6 font-mono w-full max-w-4xl mx-auto">
            <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold text-math-light flex items-center gap-2">
                    <Trophy className="w-5 h-5 text-math-accent" />
                    Shoestring Ranking Simulator
                </h3>
                <div className="flex items-center gap-2">
                    <div className="text-xs text-gray-500 border border-gray-700 px-2 py-1 rounded flex items-center gap-2">
                        <Activity className="w-3 h-3" />
                        <span>Status: {state === 'simulating' ? phaseName : state.toUpperCase()}</span>
                    </div>
                </div>
            </div>

            {/* Controls */}
            <div className="grid md:grid-cols-2 gap-8 mb-8">
                <div className="space-y-6">
                    <div>
                        <label className="block text-xs text-gray-400 mb-2 flex justify-between">
                            <span>Population Size (N)</span>
                            <span className="text-math-blue">{numPlayers}</span>
                        </label>
                        <input
                            type="range" min="50" max="200" step="1"
                            value={numPlayers} onChange={(e) => setNumPlayers(parseInt(e.target.value))}
                            disabled={state === 'simulating'}
                            className="w-full accent-math-accent h-1 bg-gray-700 rounded-lg appearance-none cursor-pointer"
                        />
                    </div>
                    <div>
                        <label className="block text-xs text-gray-400 mb-2 flex justify-between">
                            <span>Budget Multiplier (C) [Total = {Math.round(numPlayers * budgetMultiplier)}]</span>
                            <span className="text-math-blue">{budgetMultiplier.toFixed(1)}x</span>
                        </label>
                        <input
                            type="range" min="2" max="10" step="0.1"
                            value={budgetMultiplier} onChange={(e) => setBudgetMultiplier(parseFloat(e.target.value))}
                            disabled={state === 'simulating'}
                            className="w-full accent-math-accent h-1 bg-gray-700 rounded-lg appearance-none cursor-pointer"
                        />
                    </div>

                    <div className="flex gap-4">
                        <button
                            onClick={runAlgorithm}
                            disabled={state === 'simulating' || state === 'results'}
                            className={`flex-1 py-2 rounded text-sm font-bold flex items-center justify-center gap-2 transition-all
                                ${state === 'setup' ? 'bg-math-accent text-black hover:bg-math-light' : 'bg-gray-800 text-gray-500 cursor-not-allowed'}`}
                        >
                            <Play className="w-4 h-4" /> Run Algo
                        </button>
                        <button
                            onClick={generatePlayers}
                            className="px-4 py-2 rounded bg-gray-800 text-gray-300 hover:text-white hover:bg-gray-700 transition"
                        >
                            <RotateCcw className="w-4 h-4" />
                        </button>
                    </div>

                    {/* Log Terminal */}
                    <div className="bg-black/60 border border-gray-800 rounded p-3 h-40 overflow-y-auto text-[10px] font-mono">
                        {logs.map((log, i) => (
                            <div key={i} className="mb-1 text-math-blue/80">
                                <span className="text-gray-600 mr-2">[{new Date().toLocaleTimeString()}]</span>
                                {log}
                            </div>
                        ))}
                        <div ref={logEndRef} />
                    </div>
                </div>

                {/* Visualization */}
                <div className="bg-gray-900/50 rounded border border-gray-800 p-2 relative min-h-[300px] flex flex-col items-center justify-center">
                    {state === 'setup' && (
                        <div className="text-center text-gray-500">
                            <Users className="w-12 h-12 mx-auto mb-2 opacity-50" />
                            <p className="text-sm">Ready to Simulate</p>
                        </div>
                    )}

                    {state === 'simulating' && (
                        <div className="text-center w-full px-8">
                            <div className="flex justify-center gap-8 mb-8">
                                <div className={`flex flex-col items-center ${phaseName.includes("Tournament") ? "text-math-accent" : "text-gray-600"}`}>
                                    <GitBranch className="w-8 h-8 mb-2" />
                                    <span className="text-[10px]">Tournament</span>
                                </div>
                                <div className={`flex flex-col items-center ${phaseName.includes("Phase II") ? "text-math-accent" : "text-gray-600"}`}>
                                    <Zap className="w-8 h-8 mb-2" />
                                    <span className="text-[10px]">Pivot</span>
                                </div>
                                <div className={`flex flex-col items-center ${phaseName.includes("Refinement") ? "text-math-accent" : "text-gray-600"}`}>
                                    <Target className="w-8 h-8 mb-2" />
                                    <span className="text-[10px]">Refine</span>
                                </div>
                            </div>

                            <div className="w-full bg-gray-700 h-2 rounded-full overflow-hidden">
                                <div
                                    className="bg-math-accent h-full rounded-full"
                                    style={{ width: `${progress}%`, minWidth: progress > 0 ? '2px' : '0' }}
                                >&nbsp;</div>
                            </div>
                            <p className="text-xs text-gray-500 mt-2">{progress.toFixed(1)}% Budget Used</p>
                        </div>
                    )}

                    {state === 'results' && (
                        <div className="w-full h-full">
                            <div className="flex justify-end mb-1">
                                <div className="bg-black/80 px-3 py-1 rounded border border-math-accent/30 flex items-center gap-2">
                                    <span className="text-[10px] text-gray-400 uppercase tracking-widest">Top-10 Recovery</span>
                                    <span className="text-lg font-bold text-math-accent">{getCorrelation().toFixed(0)}%</span>
                                </div>
                            </div>
                            <ResponsiveContainer width="100%" height={300}>
                                <ScatterChart margin={{ top: 20, right: 20, bottom: 30, left: 40 }}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                                    <XAxis
                                        type="number" dataKey="x" name="True Skill" stroke="#666"
                                        label={{ value: 'True Skill (Hidden)', position: 'bottom', offset: 10, fill: '#888', fontSize: 11 }}
                                    />
                                    <YAxis
                                        type="number" dataKey="y" name="Predicted Score" stroke="#666"
                                        label={{ value: 'Predicted Score', angle: -90, position: 'insideLeft', fill: '#888', fontSize: 11 }}
                                    />
                                    <Tooltip
                                        cursor={{ strokeDasharray: '3 3', stroke: '#00ffcc' }}
                                        contentStyle={{
                                            backgroundColor: '#111',
                                            borderColor: '#00ffcc',
                                            borderRadius: '4px',
                                            fontSize: '11px',
                                            padding: '8px',
                                            color: '#fff'
                                        }}
                                        labelStyle={{ color: '#888', display: 'none' }}
                                        itemStyle={{ color: '#00ffcc' }}
                                        formatter={(value: number, name: string) => [value.toFixed(2), name]}
                                    />
                                    <Scatter name="Players" data={chartData} fill="#00ffcc" />
                                </ScatterChart>
                            </ResponsiveContainer>
                        </div>
                    )}
                </div>
            </div>

            <div className="text-[10px] text-gray-500 border-t border-gray-800 pt-2 flex gap-4">
                <div className="flex items-center gap-1">
                    <Info className="w-3 h-3" />
                    <span>Algorithm: Adaptive Spectral Rank</span>
                </div>
                <div>Noise Model: Bradley-Terry</div>
                <div>Solver: Rank Centrality</div>
            </div>
        </div>
    );
};

export default RankingGame;
