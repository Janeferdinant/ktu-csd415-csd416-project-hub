import React, { useState, useEffect } from 'react';
import { 
  Play, Pause, RotateCcw, Cpu, Zap, Activity, 
  Calendar, CheckCircle, BarChart2, Check, ArrowRight, ShieldAlert
} from 'lucide-react';

interface EpochRecord {
  epoch: number;
  trainLoss: number;
  valLoss: number;
  trainAcc: number;
  valAcc: number;
}

export const InteractiveDemos: React.FC = () => {
  const [activeDemoTab, setActiveDemoTab] = useState<'training' | 'benchmark' | 'gantt'>('training');

  // --- Training Simulator State ---
  const [learningRate, setLearningRate] = useState<number>(0.001);
  const [optimizer, setOptimizer] = useState<'Adam' | 'SGD' | 'RMSprop'>('Adam');
  const [batchSize, setBatchSize] = useState<number>(32);
  const [isTraining, setIsTraining] = useState<boolean>(false);
  const [currentEpoch, setCurrentEpoch] = useState<number>(0);
  const [epochHistory, setEpochHistory] = useState<EpochRecord[]>([]);

  // Simulation timer
  useEffect(() => {
    let interval: any = null;
    if (isTraining && currentEpoch < 20) {
      interval = setInterval(() => {
        setCurrentEpoch(prev => {
          const nextEpoch = prev + 1;
          const factor = optimizer === 'Adam' ? 1.0 : optimizer === 'RMSprop' ? 0.9 : 0.7;
          const baseDecay = Math.exp(-nextEpoch * 0.18 * factor * (learningRate / 0.001));

          const trainLoss = Math.max(0.12, 0.85 * baseDecay + (Math.random() * 0.03));
          const valLoss = Math.max(0.18, 0.92 * baseDecay + (Math.random() * 0.05));
          const trainAcc = Math.min(0.985, 0.55 + (1 - baseDecay) * 0.43);
          const valAcc = Math.min(0.965, 0.52 + (1 - baseDecay) * 0.42);

          const newRecord: EpochRecord = {
            epoch: nextEpoch,
            trainLoss: parseFloat(trainLoss.toFixed(4)),
            valLoss: parseFloat(valLoss.toFixed(4)),
            trainAcc: parseFloat(trainAcc.toFixed(4)),
            valAcc: parseFloat(valAcc.toFixed(4))
          };

          setEpochHistory(curr => [...curr, newRecord]);

          if (nextEpoch >= 20) {
            setIsTraining(false);
          }
          return nextEpoch;
        });
      }, 400);
    }
    return () => clearInterval(interval);
  }, [isTraining, currentEpoch, optimizer, learningRate]);

  const handleResetTraining = () => {
    setIsTraining(false);
    setCurrentEpoch(0);
    setEpochHistory([]);
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header */}
      <div className="border-b border-navy-700/60 pb-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-gold-400 text-sm font-semibold tracking-wide uppercase">
              <Zap className="w-4 h-4" />
              <span>Interactive Capstone Simulation Lab</span>
            </div>
            <h2 className="text-3xl font-heading font-bold text-white mt-1">
              Interactive Project Demonstrations
            </h2>
            <p className="text-slate-400 text-sm mt-1 max-w-3xl">
              Live interactive simulators for real-time model convergence curves, multi-model algorithm benchmarking, and the full S7/S8 Gantt milestone schedule.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs bg-navy-900 border border-gold-500/30 px-3.5 py-1.5 rounded-xl text-slate-300 font-mono">
              Simulator Status: <strong className="text-emerald-400">READY</strong>
            </span>
          </div>
        </div>
      </div>

      {/* Demo Tabs */}
      <div className="flex flex-wrap gap-2 border-b border-navy-800 pb-3">
        <button
          onClick={() => setActiveDemoTab('training')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
            activeDemoTab === 'training'
              ? 'bg-gold-500 text-navy-950 shadow-sm'
              : 'bg-navy-900 text-slate-300 hover:bg-navy-800 border border-navy-800'
          }`}
        >
          <Activity className="w-4 h-4" />
          <span>Real-Time ML Epoch Training Simulator</span>
        </button>

        <button
          onClick={() => setActiveDemoTab('benchmark')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
            activeDemoTab === 'benchmark'
              ? 'bg-gold-500 text-navy-950 shadow-sm'
              : 'bg-navy-900 text-slate-300 hover:bg-navy-800 border border-navy-800'
          }`}
        >
          <BarChart2 className="w-4 h-4" />
          <span>Algorithm Comparison Benchmark Matrix</span>
        </button>

        <button
          onClick={() => setActiveDemoTab('gantt')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
            activeDemoTab === 'gantt'
              ? 'bg-gold-500 text-navy-950 shadow-sm'
              : 'bg-navy-900 text-slate-300 hover:bg-navy-800 border border-navy-800'
          }`}
        >
          <Calendar className="w-4 h-4" />
          <span>S7 & S8 Interactive Gantt Schedule</span>
        </button>
      </div>

      {/* 1. REAL-TIME ML EPOCH TRAINING SIMULATOR */}
      {activeDemoTab === 'training' && (
        <div className="space-y-6">
          <div className="glass-panel p-6 rounded-2xl border border-navy-700/80 space-y-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <h3 className="text-xl font-heading font-bold text-white flex items-center gap-2">
                  <span>Deep Neural Network Training Simulator</span>
                  <span className="text-xs bg-navy-800 text-gold-300 font-mono px-2.5 py-0.5 rounded-full border border-navy-700">
                    PyTorch / Scikit-learn
                  </span>
                </h3>
                <p className="text-xs text-slate-400 mt-1">
                  Adjust hyperparameters, start the training loop, and inspect live epoch-by-epoch loss reduction and accuracy convergence.
                </p>
              </div>

              {/* Controls */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsTraining(!isTraining)}
                  disabled={currentEpoch >= 20}
                  className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold transition-all shadow-md ${
                    isTraining
                      ? 'bg-amber-600 hover:bg-amber-500 text-white'
                      : 'bg-emerald-600 hover:bg-emerald-500 text-white disabled:opacity-50'
                  }`}
                >
                  {isTraining ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-current" />}
                  <span>{isTraining ? 'Pause Training' : currentEpoch >= 20 ? 'Completed' : 'Start Training'}</span>
                </button>

                <button
                  onClick={handleResetTraining}
                  className="p-2 rounded-xl bg-navy-800 hover:bg-navy-700 text-slate-300 border border-navy-700 transition-colors"
                  title="Reset Simulator"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Hyperparameter Inputs */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="text-xs text-slate-400 font-semibold block mb-1">Optimizer</label>
                <select
                  value={optimizer}
                  onChange={(e) => setOptimizer(e.target.value as any)}
                  disabled={isTraining}
                  className="w-full bg-navy-950 border border-navy-700 rounded-lg px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-gold-400 font-mono"
                >
                  <option value="Adam">Adam (Adaptive Moment Estimation)</option>
                  <option value="SGD">SGD + Momentum (0.9)</option>
                  <option value="RMSprop">RMSprop</option>
                </select>
              </div>

              <div>
                <label className="text-xs text-slate-400 font-semibold block mb-1">Learning Rate</label>
                <select
                  value={learningRate}
                  onChange={(e) => setLearningRate(parseFloat(e.target.value))}
                  disabled={isTraining}
                  className="w-full bg-navy-950 border border-navy-700 rounded-lg px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-gold-400 font-mono"
                >
                  <option value={0.01}>0.01 (Aggressive)</option>
                  <option value={0.001}>0.001 (Recommended / Standard)</option>
                  <option value={0.0001}>0.0001 (Conservative / Fine-tuning)</option>
                </select>
              </div>

              <div>
                <label className="text-xs text-slate-400 font-semibold block mb-1">Batch Size</label>
                <select
                  value={batchSize}
                  onChange={(e) => setBatchSize(parseInt(e.target.value))}
                  disabled={isTraining}
                  className="w-full bg-navy-950 border border-navy-700 rounded-lg px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-gold-400 font-mono"
                >
                  <option value={16}>16 (High stochastic noise)</option>
                  <option value={32}>32 (Balanced GPU memory)</option>
                  <option value={64}>64 (Stable mini-batch)</option>
                </select>
              </div>
            </div>

            {/* Live Progress Bar */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-mono">
                <span className="text-slate-400">Epoch Progress: {currentEpoch} / 20</span>
                <span className="text-gold-400 font-bold">{Math.round((currentEpoch / 20) * 100)}%</span>
              </div>
              <div className="w-full h-2 bg-navy-950 rounded-full overflow-hidden border border-navy-800">
                <div 
                  className="h-full bg-gradient-to-r from-gold-500 to-emerald-400 transition-all duration-300"
                  style={{ width: `${(currentEpoch / 20) * 100}%` }}
                />
              </div>
            </div>

            {/* Current Epoch Readouts */}
            {epochHistory.length > 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="bg-navy-950 p-4 rounded-xl border border-navy-800 text-center">
                  <span className="text-xs text-slate-400 block">Training Loss</span>
                  <span className="text-2xl font-bold font-mono text-rose-400 mt-1 block">
                    {epochHistory[epochHistory.length - 1].trainLoss}
                  </span>
                  <span className="text-[10px] text-slate-500 font-mono">Cross-Entropy Loss</span>
                </div>

                <div className="bg-navy-950 p-4 rounded-xl border border-navy-800 text-center">
                  <span className="text-xs text-slate-400 block">Validation Loss</span>
                  <span className="text-2xl font-bold font-mono text-amber-400 mt-1 block">
                    {epochHistory[epochHistory.length - 1].valLoss}
                  </span>
                  <span className="text-[10px] text-slate-500 font-mono">Holdout Set</span>
                </div>

                <div className="bg-navy-950 p-4 rounded-xl border border-navy-800 text-center">
                  <span className="text-xs text-slate-400 block">Training Accuracy</span>
                  <span className="text-2xl font-bold font-mono text-emerald-400 mt-1 block">
                    {(epochHistory[epochHistory.length - 1].trainAcc * 100).toFixed(2)}%
                  </span>
                  <span className="text-[10px] text-slate-500 font-mono">Batch Accuracy</span>
                </div>

                <div className="bg-navy-950 p-4 rounded-xl border border-gold-500/30 text-center bg-gold-500/5">
                  <span className="text-xs text-gold-300 font-semibold block">Validation Accuracy</span>
                  <span className="text-2xl font-bold font-mono text-gold-400 mt-1 block">
                    {(epochHistory[epochHistory.length - 1].valAcc * 100).toFixed(2)}%
                  </span>
                  <span className="text-[10px] text-slate-500 font-mono">Generalization Metric</span>
                </div>
              </div>
            ) : (
              <div className="bg-navy-950/60 border border-dashed border-navy-800 rounded-xl p-8 text-center text-xs text-slate-400">
                Click <strong>"Start Training"</strong> above to launch the real-time simulation loop.
              </div>
            )}
          </div>
        </div>
      )}

      {/* 2. ALGORITHM COMPARISON BENCHMARK MATRIX */}
      {activeDemoTab === 'benchmark' && (
        <div className="space-y-6">
          <div className="glass-panel p-6 rounded-2xl border border-navy-700/80 space-y-4">
            <div>
              <h3 className="text-xl font-heading font-bold text-white">
                Multi-Model Algorithmic Benchmark Suite
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                Comparative analysis on standard NIH ChestX-ray14 and UCI clinical datasets evaluating accuracy, inference speed, RAM usage, and edge deployment suitability.
              </p>
            </div>

            <div className="overflow-x-auto border border-navy-800 rounded-xl">
              <table className="w-full text-left text-xs font-mono">
                <thead className="bg-navy-900 text-gold-300 border-b border-navy-800">
                  <tr>
                    <th className="px-4 py-3">Algorithm Architecture</th>
                    <th className="px-4 py-3">Accuracy</th>
                    <th className="px-4 py-3">F1-Score</th>
                    <th className="px-4 py-3">Inference Latency</th>
                    <th className="px-4 py-3">RAM Footprint</th>
                    <th className="px-4 py-3">Training Time</th>
                    <th className="px-4 py-3">Edge Suitability</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-navy-900 bg-navy-950/70 text-slate-300">
                  <tr>
                    <td className="px-4 py-3 font-bold text-white">Logistic Regression (L2)</td>
                    <td className="px-4 py-3">82.4%</td>
                    <td className="px-4 py-3">0.812</td>
                    <td className="px-4 py-3 text-emerald-400 font-bold">1.2 ms</td>
                    <td className="px-4 py-3">12 MB</td>
                    <td className="px-4 py-3">0.8 s</td>
                    <td className="px-4 py-3 text-emerald-400">Ultra-Light (Cortex-M4)</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 font-bold text-white">Random Forest (100 Trees)</td>
                    <td className="px-4 py-3">88.5%</td>
                    <td className="px-4 py-3">0.878</td>
                    <td className="px-4 py-3">4.8 ms</td>
                    <td className="px-4 py-3">84 MB</td>
                    <td className="px-4 py-3">4.2 s</td>
                    <td className="px-4 py-3 text-emerald-400">High (Raspberry Pi 4)</td>
                  </tr>
                  <tr className="bg-gold-500/5">
                    <td className="px-4 py-3 font-bold text-gold-400">XGBoost (Proposed Tabular)</td>
                    <td className="px-4 py-3 font-bold text-emerald-400">92.1%</td>
                    <td className="px-4 py-3 font-bold text-gold-400">0.914</td>
                    <td className="px-4 py-3">6.1 ms</td>
                    <td className="px-4 py-3">92 MB</td>
                    <td className="px-4 py-3">8.5 s</td>
                    <td className="px-4 py-3 text-emerald-400">High (Edge Jetson Nano)</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 font-bold text-white">ResNet-50 Deep CNN</td>
                    <td className="px-4 py-3 font-bold text-emerald-400">94.2%</td>
                    <td className="px-4 py-3">0.938</td>
                    <td className="px-4 py-3 text-rose-400 font-bold">48.0 ms</td>
                    <td className="px-4 py-3 text-rose-400">380 MB</td>
                    <td className="px-4 py-3">45.0 min</td>
                    <td className="px-4 py-3 text-amber-400">Requires Dedicated Edge GPU</td>
                  </tr>
                  <tr className="bg-emerald-950/20">
                    <td className="px-4 py-3 font-bold text-emerald-300">MobileNetV3-Quantized (INT8)</td>
                    <td className="px-4 py-3">91.8%</td>
                    <td className="px-4 py-3">0.910</td>
                    <td className="px-4 py-3 text-emerald-400 font-bold">14.5 ms</td>
                    <td className="px-4 py-3 font-bold text-emerald-400">18 MB</td>
                    <td className="px-4 py-3">18.0 min</td>
                    <td className="px-4 py-3 text-emerald-400 font-bold">Optimal Capstone Choice</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="bg-navy-950 p-4 rounded-xl border border-navy-800 text-xs text-slate-300 space-y-1">
              <strong className="text-gold-400">Engineering Tradeoff Takeaway:</strong> MobileNetV3-Quantized offers the highest Pareto efficiency: capturing 97.4% of ResNet-50 accuracy while executing 3.3x faster and requiring 95% less RAM, making it perfectly suited for low-cost rural clinical deployment.
            </div>
          </div>
        </div>
      )}

      {/* 3. INTERACTIVE GANTT SCHEDULE */}
      {activeDemoTab === 'gantt' && (
        <div className="space-y-6">
          <div className="glass-panel p-6 rounded-2xl border border-navy-700/80 space-y-5">
            <div>
              <h3 className="text-xl font-heading font-bold text-white">
                KTU Capstone S7 & S8 32-Week Master Gantt Schedule
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                Visual timeline indicating critical milestone gates for Project Phase I (CSD415) and Project Phase II (CSD416).
              </p>
            </div>

            <div className="space-y-3 font-mono text-xs">
              {/* Timeline Header Weeks */}
              <div className="grid grid-cols-12 gap-1 text-[10px] text-slate-400 text-center pb-2 border-b border-navy-800">
                <span className="col-span-3 text-left pl-2">Task Activity</span>
                <span className="col-span-1">Wk 1-2</span>
                <span className="col-span-1">Wk 3-4</span>
                <span className="col-span-1">Wk 5-6</span>
                <span className="col-span-1">Wk 7-8</span>
                <span className="col-span-1">Wk 9-10</span>
                <span className="col-span-1">Wk 11-12</span>
                <span className="col-span-1">Wk 13-14</span>
                <span className="col-span-2">Wk 15-16 (Gate)</span>
              </div>

              {/* S7 Tasks */}
              <div className="grid grid-cols-12 gap-1 items-center bg-navy-950 p-2 rounded-lg border border-navy-800">
                <span className="col-span-3 text-slate-300 font-sans font-semibold truncate pl-2">
                  1. Lit Survey & Problem Form.
                </span>
                <div className="col-span-3 bg-gold-500/80 h-5 rounded text-navy-950 font-bold text-[10px] flex items-center justify-center">
                  Phase I Start
                </div>
                <div className="col-span-6 bg-transparent h-5" />
              </div>

              <div className="grid grid-cols-12 gap-1 items-center bg-navy-950 p-2 rounded-lg border border-navy-800">
                <span className="col-span-3 text-slate-300 font-sans font-semibold truncate pl-2">
                  2. Review 1 Evaluation Gate
                </span>
                <div className="col-span-2 bg-transparent h-5" />
                <div className="col-span-2 bg-rose-600 h-5 rounded text-white font-bold text-[10px] flex items-center justify-center">
                  Review 1 (15M)
                </div>
                <div className="col-span-5 bg-transparent h-5" />
              </div>

              <div className="grid grid-cols-12 gap-1 items-center bg-navy-950 p-2 rounded-lg border border-navy-800">
                <span className="col-span-3 text-slate-300 font-sans font-semibold truncate pl-2">
                  3. System Design & Simulation
                </span>
                <div className="col-span-4 bg-transparent h-5" />
                <div className="col-span-3 bg-blue-600/80 h-5 rounded text-white font-bold text-[10px] flex items-center justify-center">
                  Architecture & PoC
                </div>
                <div className="col-span-2 bg-rose-600 h-5 rounded text-white font-bold text-[10px] flex items-center justify-center">
                  Review 2 (25M)
                </div>
              </div>

              <div className="grid grid-cols-12 gap-1 items-center bg-navy-950 p-2 rounded-lg border border-navy-800">
                <span className="col-span-3 text-slate-300 font-sans font-semibold truncate pl-2">
                  4. Phase I Report Binding
                </span>
                <div className="col-span-7 bg-transparent h-5" />
                <div className="col-span-2 bg-emerald-600 h-5 rounded text-white font-bold text-[10px] flex items-center justify-center">
                  Report (30M)
                </div>
              </div>

              {/* S8 Tasks Banner */}
              <div className="pt-2 text-xs text-gold-400 font-bold font-sans">
                Semester 8 (CSD416) Implementation & Defense:
              </div>

              <div className="grid grid-cols-12 gap-1 items-center bg-navy-950 p-2 rounded-lg border border-navy-800">
                <span className="col-span-3 text-slate-300 font-sans font-semibold truncate pl-2">
                  5. Full Implementation & Testing
                </span>
                <div className="col-span-5 bg-purple-600/80 h-5 rounded text-white font-bold text-[10px] flex items-center justify-center">
                  Core Coding & Verification
                </div>
                <div className="col-span-4 bg-transparent h-5" />
              </div>

              <div className="grid grid-cols-12 gap-1 items-center bg-navy-950 p-2 rounded-lg border border-navy-800">
                <span className="col-span-3 text-slate-300 font-sans font-semibold truncate pl-2">
                  6. Paper Publication & Final Viva
                </span>
                <div className="col-span-5 bg-transparent h-5" />
                <div className="col-span-4 bg-gradient-to-r from-gold-500 to-amber-500 h-5 rounded text-navy-950 font-bold text-[10px] flex items-center justify-center shadow-md">
                  External Defense (80 Marks)
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

