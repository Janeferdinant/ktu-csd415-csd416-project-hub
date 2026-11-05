import React, { useState } from 'react';
import { 
  Calculator, CheckCircle2, TrendingUp, DollarSign, Clock, 
  HelpCircle, RefreshCw, Sparkles, ArrowRight, Activity
} from 'lucide-react';

export const NumericalLab: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'classification' | 'regression' | 'cpm' | 'evm' | 'npv' | 'hypothesis'>('classification');

  // --- 1. Classification Metrics State ---
  const [tp, setTp] = useState<number>(45);
  const [fp, setFp] = useState<number>(15);
  const [fn, setFn] = useState<number>(5);
  const [tn, setTn] = useState<number>(435);

  const totalN = tp + fp + fn + tn;
  const accuracy = totalN > 0 ? (tp + tn) / totalN : 0;
  const precision = (tp + fp) > 0 ? tp / (tp + fp) : 0;
  const recall = (tp + fn) > 0 ? tp / (tp + fn) : 0;
  const specificity = (tn + fp) > 0 ? tn / (tn + fp) : 0;
  const f1Score = (precision + recall) > 0 ? (2 * precision * recall) / (precision + recall) : 0;
  const mccDenominator = Math.sqrt((tp + fp) * (tp + fn) * (tn + fp) * (tn + fn));
  const mcc = mccDenominator > 0 ? ((tp * tn) - (fp * fn)) / mccDenominator : 0;

  // --- 2. Regression Errors State ---
  const [yActual, setYActual] = useState<string>('24.5, 31.0, 42.8, 18.2, 55.4');
  const [yPredicted, setYPredicted] = useState<string>('22.1, 33.5, 40.2, 19.8, 51.0');

  const parseNums = (str: string) => str.split(',').map(s => parseFloat(s.trim())).filter(n => !isNaN(n));
  const actuals = parseNums(yActual);
  const preds = parseNums(yPredicted);
  const nPoints = Math.min(actuals.length, preds.length);

  let mae = 0, mse = 0, rmse = 0, r2 = 0;
  if (nPoints > 0) {
    let sumAbs = 0, sumSq = 0;
    const meanActual = actuals.slice(0, nPoints).reduce((a, b) => a + b, 0) / nPoints;
    let ssTot = 0, ssRes = 0;

    for (let i = 0; i < nPoints; i++) {
      const err = actuals[i] - preds[i];
      sumAbs += Math.abs(err);
      sumSq += err * err;
      ssTot += Math.pow(actuals[i] - meanActual, 2);
      ssRes += Math.pow(err, 2);
    }
    mae = sumAbs / nPoints;
    mse = sumSq / nPoints;
    rmse = Math.sqrt(mse);
    r2 = ssTot > 0 ? 1 - (ssRes / ssTot) : 0;
  }

  // --- 3. Earned Value Management (EVM) State ---
  const [pv, setPv] = useState<number>(85000); // Planned Value (INR)
  const [ev, setEv] = useState<number>(78000); // Earned Value (INR)
  const [ac, setAc] = useState<number>(82000); // Actual Cost (INR)
  const [bac, setBac] = useState<number>(150000); // Budget at Completion (INR)

  const cv = ev - ac; // Cost Variance
  const sv = ev - pv; // Schedule Variance
  const cpi = ac > 0 ? ev / ac : 0; // Cost Performance Index
  const spi = pv > 0 ? ev / pv : 0; // Schedule Performance Index
  const eac = cpi > 0 ? bac / cpi : 0; // Estimate at Completion

  // --- 4. Cost-Benefit & NPV State ---
  const [initialCost, setInitialCost] = useState<number>(150000);
  const [annualBenefit, setAnnualBenefit] = useState<number>(80000);
  const [annualOpex, setAnnualOpex] = useState<number>(20000);
  const [discountRate, setDiscountRate] = useState<number>(10); // %

  const netAnnual = annualBenefit - annualOpex;
  const r = discountRate / 100;
  const pvYear1 = netAnnual / Math.pow(1 + r, 1);
  const pvYear2 = netAnnual / Math.pow(1 + r, 2);
  const pvYear3 = netAnnual / Math.pow(1 + r, 3);
  const totalPVInflows = pvYear1 + pvYear2 + pvYear3;
  const npv = totalPVInflows - initialCost;
  const simpleRoi = initialCost > 0 ? (((netAnnual * 3) - initialCost) / initialCost) * 100 : 0;
  const paybackYears = netAnnual > 0 ? initialCost / netAnnual : 0;

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header */}
      <div className="border-b border-navy-700/60 pb-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-gold-400 text-sm font-semibold tracking-wide uppercase">
              <Calculator className="w-4 h-4" />
              <span>KTU CSD415 / CSD416 Quantitative Laboratory</span>
            </div>
            <h2 className="text-3xl font-heading font-bold text-white mt-1">
              Numerical Problem Laboratory & Solvers
            </h2>
            <p className="text-slate-400 text-sm mt-1 max-w-3xl">
              Interactive mathematical solvers providing step-by-step formula derivations, calculations, and engineering interpretations for evaluation metrics, project scheduling, and budgeting.
            </p>
          </div>

          <div className="flex items-center gap-2 bg-navy-900 border border-gold-500/30 px-4 py-2 rounded-xl text-xs text-slate-300">
            <Sparkles className="w-4 h-4 text-gold-400" />
            <span>Interactive Real-Time Parameter Solvers</span>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex flex-wrap gap-2 border-b border-navy-800 pb-3">
        <button
          onClick={() => setActiveTab('classification')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
            activeTab === 'classification'
              ? 'bg-gold-500 text-navy-950 shadow-sm'
              : 'bg-navy-900 text-slate-300 hover:bg-navy-800 border border-navy-800'
          }`}
        >
          <Activity className="w-4 h-4" />
          <span>Classification & Confusion Matrix</span>
        </button>

        <button
          onClick={() => setActiveTab('regression')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
            activeTab === 'regression'
              ? 'bg-gold-500 text-navy-950 shadow-sm'
              : 'bg-navy-900 text-slate-300 hover:bg-navy-800 border border-navy-800'
          }`}
        >
          <TrendingUp className="w-4 h-4" />
          <span>Regression Errors (MAE, RMSE, R²)</span>
        </button>

        <button
          onClick={() => setActiveTab('cpm')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
            activeTab === 'cpm'
              ? 'bg-gold-500 text-navy-950 shadow-sm'
              : 'bg-navy-900 text-slate-300 hover:bg-navy-800 border border-navy-800'
          }`}
        >
          <Clock className="w-4 h-4" />
          <span>CPM / PERT Project Scheduling</span>
        </button>

        <button
          onClick={() => setActiveTab('evm')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
            activeTab === 'evm'
              ? 'bg-gold-500 text-navy-950 shadow-sm'
              : 'bg-navy-900 text-slate-300 hover:bg-navy-800 border border-navy-800'
          }`}
        >
          <DollarSign className="w-4 h-4" />
          <span>Earned Value Management (EVM)</span>
        </button>

        <button
          onClick={() => setActiveTab('npv')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
            activeTab === 'npv'
              ? 'bg-gold-500 text-navy-950 shadow-sm'
              : 'bg-navy-900 text-slate-300 hover:bg-navy-800 border border-navy-800'
          }`}
        >
          <DollarSign className="w-4 h-4" />
          <span>Cost-Benefit & NPV Feasibility</span>
        </button>
      </div>

      {/* ======================================================== */}
      {/* 1. CLASSIFICATION & CONFUSION MATRIX SOLVER */}
      {/* ======================================================== */}
      {activeTab === 'classification' && (
        <div className="space-y-6">
          <div className="glass-panel p-6 rounded-2xl border border-navy-700/80 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-heading font-bold text-white">
                  Classification Metrics & Confusion Matrix Laboratory
                </h3>
                <p className="text-xs text-slate-400 mt-1">
                  Adjust True Positives, False Positives, False Negatives, and True Negatives to observe real-time derivations.
                </p>
              </div>
              <span className="text-xs bg-navy-800 text-gold-300 font-mono px-3 py-1 rounded-full border border-navy-700">
                Total Evaluated Cases: N = {totalN}
              </span>
            </div>

            {/* Matrix Input Controls */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-4">
              <div className="bg-navy-950 p-4 rounded-xl border border-emerald-500/30">
                <label className="text-xs text-emerald-400 font-semibold block mb-1">True Positives (TP)</label>
                <input 
                  type="number" min="0" value={tp}
                  onChange={(e) => setTp(Math.max(0, parseInt(e.target.value) || 0))}
                  className="w-full bg-navy-900 border border-navy-700 rounded-lg px-3 py-1.5 text-white font-mono font-bold focus:outline-none focus:border-emerald-400"
                />
                <span className="text-[10px] text-slate-500 mt-1 block">Disease correctly identified</span>
              </div>

              <div className="bg-navy-950 p-4 rounded-xl border border-rose-500/30">
                <label className="text-xs text-rose-400 font-semibold block mb-1">False Positives (FP)</label>
                <input 
                  type="number" min="0" value={fp}
                  onChange={(e) => setFp(Math.max(0, parseInt(e.target.value) || 0))}
                  className="w-full bg-navy-900 border border-navy-700 rounded-lg px-3 py-1.5 text-white font-mono font-bold focus:outline-none focus:border-rose-400"
                />
                <span className="text-[10px] text-slate-500 mt-1 block">Healthy flagged as disease</span>
              </div>

              <div className="bg-navy-950 p-4 rounded-xl border border-amber-500/30">
                <label className="text-xs text-amber-400 font-semibold block mb-1">False Negatives (FN)</label>
                <input 
                  type="number" min="0" value={fn}
                  onChange={(e) => setFn(Math.max(0, parseInt(e.target.value) || 0))}
                  className="w-full bg-navy-900 border border-navy-700 rounded-lg px-3 py-1.5 text-white font-mono font-bold focus:outline-none focus:border-amber-400"
                />
                <span className="text-[10px] text-slate-500 mt-1 block">Disease missed by model</span>
              </div>

              <div className="bg-navy-950 p-4 rounded-xl border border-blue-500/30">
                <label className="text-xs text-blue-400 font-semibold block mb-1">True Negatives (TN)</label>
                <input 
                  type="number" min="0" value={tn}
                  onChange={(e) => setTn(Math.max(0, parseInt(e.target.value) || 0))}
                  className="w-full bg-navy-900 border border-navy-700 rounded-lg px-3 py-1.5 text-white font-mono font-bold focus:outline-none focus:border-blue-400"
                />
                <span className="text-[10px] text-slate-500 mt-1 block">Healthy correctly identified</span>
              </div>
            </div>

            {/* Results Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 pt-4">
              <div className="bg-navy-900/80 p-3 rounded-xl border border-navy-800 text-center">
                <span className="text-[11px] text-slate-400 font-medium block">Accuracy</span>
                <span className="text-xl font-bold font-mono text-white mt-1 block">{(accuracy * 100).toFixed(2)}%</span>
                <span className="text-[10px] text-slate-500 font-mono">(TP+TN)/N</span>
              </div>

              <div className="bg-navy-900/80 p-3 rounded-xl border border-navy-800 text-center">
                <span className="text-[11px] text-slate-400 font-medium block">Precision</span>
                <span className="text-xl font-bold font-mono text-emerald-400 mt-1 block">{(precision * 100).toFixed(2)}%</span>
                <span className="text-[10px] text-slate-500 font-mono">TP/(TP+FP)</span>
              </div>

              <div className="bg-navy-900/80 p-3 rounded-xl border border-navy-800 text-center">
                <span className="text-[11px] text-slate-400 font-medium block">Recall / Sensitivity</span>
                <span className="text-xl font-bold font-mono text-gold-400 mt-1 block">{(recall * 100).toFixed(2)}%</span>
                <span className="text-[10px] text-slate-500 font-mono">TP/(TP+FN)</span>
              </div>

              <div className="bg-navy-900/80 p-3 rounded-xl border border-navy-800 text-center">
                <span className="text-[11px] text-slate-400 font-medium block">Specificity</span>
                <span className="text-xl font-bold font-mono text-blue-400 mt-1 block">{(specificity * 100).toFixed(2)}%</span>
                <span className="text-[10px] text-slate-500 font-mono">TN/(TN+FP)</span>
              </div>

              <div className="bg-navy-900/80 p-3 rounded-xl border border-gold-500/30 text-center bg-gold-500/5">
                <span className="text-[11px] text-gold-300 font-semibold block">F1-Score</span>
                <span className="text-xl font-bold font-mono text-gold-400 mt-1 block">{(f1Score * 100).toFixed(2)}%</span>
                <span className="text-[10px] text-slate-500 font-mono">Harmonic Mean</span>
              </div>

              <div className="bg-navy-900/80 p-3 rounded-xl border border-navy-800 text-center">
                <span className="text-[11px] text-slate-400 font-medium block">MCC Score</span>
                <span className="text-xl font-bold font-mono text-purple-300 mt-1 block">{mcc.toFixed(4)}</span>
                <span className="text-[10px] text-slate-500 font-mono">[-1.0 to +1.0]</span>
              </div>
            </div>

            {/* Step-by-Step Derivation Walkthrough */}
            <div className="bg-navy-950 p-5 rounded-xl border border-navy-800 space-y-3 font-mono text-xs text-slate-300">
              <div className="text-gold-400 font-bold uppercase tracking-wider text-[11px] font-sans">
                Formal Step-by-Step Mathematical Derivation:
              </div>
              <div>
                <strong>1. Precision Calculation:</strong> P = {tp} / ({tp} + {fp}) = {tp} / {tp + fp} = <strong>{precision.toFixed(4)} ({ (precision*100).toFixed(2) }%)</strong>
              </div>
              <div>
                <strong>2. Recall Calculation:</strong> R = {tp} / ({tp} + {fn}) = {tp} / {tp + fn} = <strong>{recall.toFixed(4)} ({ (recall*100).toFixed(2) }%)</strong>
              </div>
              <div>
                <strong>3. F1-Score (Harmonic Mean):</strong> F1 = 2 * ({precision.toFixed(4)} * {recall.toFixed(4)}) / ({precision.toFixed(4)} + {recall.toFixed(4)}) = <strong>{f1Score.toFixed(4)} ({ (f1Score*100).toFixed(2) }%)</strong>
              </div>
              <div className="pt-2 border-t border-navy-800 text-slate-400 font-sans">
                <strong className="text-slate-200">Engineering Interpretation:</strong> With Recall at {(recall*100).toFixed(1)}%, the system successfully detects {tp} out of {tp+fn} critical cases. Precision at {(precision*100).toFixed(1)}% means that when an alert is fired, there is a {(precision*100).toFixed(1)}% probability the patient is truly unwell.
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* 2. REGRESSION ERRORS SOLVER (MAE, MSE, RMSE, R²) */}
      {/* ======================================================== */}
      {activeTab === 'regression' && (
        <div className="space-y-6">
          <div className="glass-panel p-6 rounded-2xl border border-navy-700/80 space-y-4">
            <div>
              <h3 className="text-xl font-heading font-bold text-white">
                Regression Error & Goodness-of-Fit Laboratory
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                Calculate Mean Absolute Error (MAE), Mean Squared Error (MSE), Root Mean Squared Error (RMSE), and Coefficient of Determination (R²).
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-xs text-slate-300 font-semibold block mb-1">
                  Ground Truth Array y (Comma-separated values)
                </label>
                <input 
                  type="text" 
                  value={yActual}
                  onChange={(e) => setYActual(e.target.value)}
                  className="w-full bg-navy-950 border border-navy-700 rounded-lg px-3 py-2 text-sm text-slate-200 font-mono focus:outline-none focus:border-gold-400"
                />
              </div>

              <div>
                <label className="text-xs text-slate-300 font-semibold block mb-1">
                  Predicted Values ŷ (Comma-separated values)
                </label>
                <input 
                  type="text" 
                  value={yPredicted}
                  onChange={(e) => setYPredicted(e.target.value)}
                  className="w-full bg-navy-950 border border-navy-700 rounded-lg px-3 py-2 text-sm text-slate-200 font-mono focus:outline-none focus:border-gold-400"
                />
              </div>
            </div>

            {/* Regression Results Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-2">
              <div className="bg-navy-900/80 p-4 rounded-xl border border-navy-800 text-center">
                <span className="text-xs text-slate-400 block">MAE (Mean Absolute Error)</span>
                <span className="text-2xl font-bold font-mono text-emerald-400 mt-1 block">{mae.toFixed(4)}</span>
                <span className="text-[10px] text-slate-500 font-mono">(1/n) Σ |y - ŷ|</span>
              </div>

              <div className="bg-navy-900/80 p-4 rounded-xl border border-navy-800 text-center">
                <span className="text-xs text-slate-400 block">MSE (Mean Squared Error)</span>
                <span className="text-2xl font-bold font-mono text-amber-400 mt-1 block">{mse.toFixed(4)}</span>
                <span className="text-[10px] text-slate-500 font-mono">(1/n) Σ (y - ŷ)²</span>
              </div>

              <div className="bg-navy-900/80 p-4 rounded-xl border border-navy-800 text-center">
                <span className="text-xs text-slate-400 block">RMSE</span>
                <span className="text-2xl font-bold font-mono text-gold-400 mt-1 block">{rmse.toFixed(4)}</span>
                <span className="text-[10px] text-slate-500 font-mono">√MSE (Same units as y)</span>
              </div>

              <div className="bg-navy-900/80 p-4 rounded-xl border border-navy-800 text-center">
                <span className="text-xs text-slate-400 block">R² Score (Goodness of Fit)</span>
                <span className="text-2xl font-bold font-mono text-blue-400 mt-1 block">{r2.toFixed(4)}</span>
                <span className="text-[10px] text-slate-500 font-mono">1 - (SS_res / SS_tot)</span>
              </div>
            </div>

            {/* Explanation */}
            <div className="bg-navy-950 p-4 rounded-xl border border-navy-800 text-xs text-slate-300 font-mono space-y-2">
              <div>Points Evaluated: <strong>N = {nPoints}</strong></div>
              <div>RMSE / MAE Ratio: <strong>{(rmse / (mae || 1)).toFixed(3)}</strong> (A ratio &gt; 1.25 indicates presence of significant outlier errors)</div>
              <div className="text-slate-400 font-sans pt-1">
                <strong>Engineering Insight:</strong> An R² of {r2.toFixed(4)} indicates that {(r2 * 100).toFixed(2)}% of the variance in the target variable is successfully explained by the regression model.
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* 3. CPM / PERT PROJECT SCHEDULING SOLVER */}
      {/* ======================================================== */}
      {activeTab === 'cpm' && (
        <div className="space-y-6">
          <div className="glass-panel p-6 rounded-2xl border border-navy-700/80 space-y-4">
            <div>
              <h3 className="text-xl font-heading font-bold text-white">
                Critical Path Method (CPM) Network Solver
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                Standard KTU 16-Week Phase I / Phase II Milestone Schedule with automated forward/backward pass and slack calculation.
              </p>
            </div>

            <div className="overflow-x-auto border border-navy-800 rounded-xl">
              <table className="w-full text-left text-xs font-mono">
                <thead className="bg-navy-900 text-gold-300 border-b border-navy-800">
                  <tr>
                    <th className="px-3 py-2">ID</th>
                    <th className="px-3 py-2">Activity Description</th>
                    <th className="px-3 py-2">Duration (Weeks)</th>
                    <th className="px-3 py-2">Predecessor</th>
                    <th className="px-3 py-2">Early Start (ES)</th>
                    <th className="px-3 py-2">Early Finish (EF)</th>
                    <th className="px-3 py-2">Late Start (LS)</th>
                    <th className="px-3 py-2">Late Finish (LF)</th>
                    <th className="px-3 py-2">Total Slack</th>
                    <th className="px-3 py-2">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-navy-900 bg-navy-950/70 text-slate-300">
                  <tr className="bg-rose-950/20 text-rose-200">
                    <td className="px-3 py-2 font-bold">A</td>
                    <td className="px-3 py-2">Systematic Literature Survey & PRISMA</td>
                    <td className="px-3 py-2">4</td>
                    <td className="px-3 py-2">-</td>
                    <td className="px-3 py-2">0</td>
                    <td className="px-3 py-2">4</td>
                    <td className="px-3 py-2">0</td>
                    <td className="px-3 py-2">4</td>
                    <td className="px-3 py-2 font-bold">0</td>
                    <td className="px-3 py-2 text-rose-400 font-bold">CRITICAL</td>
                  </tr>
                  <tr>
                    <td className="px-3 py-2 font-bold">B</td>
                    <td className="px-3 py-2">Problem Formulation & Scope Definition</td>
                    <td className="px-3 py-2">3</td>
                    <td className="px-3 py-2">A</td>
                    <td className="px-3 py-2">4</td>
                    <td className="px-3 py-2">7</td>
                    <td className="px-3 py-2">7</td>
                    <td className="px-3 py-2">10</td>
                    <td className="px-3 py-2 text-slate-400">3</td>
                    <td className="px-3 py-2 text-slate-400">Has Float</td>
                  </tr>
                  <tr className="bg-rose-950/20 text-rose-200">
                    <td className="px-3 py-2 font-bold">C</td>
                    <td className="px-3 py-2">Dataset Curation, Cleaning & Ingestion</td>
                    <td className="px-3 py-2">6</td>
                    <td className="px-3 py-2">A</td>
                    <td className="px-3 py-2">4</td>
                    <td className="px-3 py-2">10</td>
                    <td className="px-3 py-2">4</td>
                    <td className="px-3 py-2">10</td>
                    <td className="px-3 py-2 font-bold">0</td>
                    <td className="px-3 py-2 text-rose-400 font-bold">CRITICAL</td>
                  </tr>
                  <tr className="bg-rose-950/20 text-rose-200">
                    <td className="px-3 py-2 font-bold">D</td>
                    <td className="px-3 py-2">Core System Architecture & Modeling</td>
                    <td className="px-3 py-2">4</td>
                    <td className="px-3 py-2">B, C</td>
                    <td className="px-3 py-2">10</td>
                    <td className="px-3 py-2">14</td>
                    <td className="px-3 py-2">10</td>
                    <td className="px-3 py-2">14</td>
                    <td className="px-3 py-2 font-bold">0</td>
                    <td className="px-3 py-2 text-rose-400 font-bold">CRITICAL</td>
                  </tr>
                  <tr className="bg-rose-950/20 text-rose-200">
                    <td className="px-3 py-2 font-bold">E</td>
                    <td className="px-3 py-2">Preliminary Report Binding & Review 2</td>
                    <td className="px-3 py-2">2</td>
                    <td className="px-3 py-2">D</td>
                    <td className="px-3 py-2">14</td>
                    <td className="px-3 py-2">16</td>
                    <td className="px-3 py-2">14</td>
                    <td className="px-3 py-2">16</td>
                    <td className="px-3 py-2 font-bold">0</td>
                    <td className="px-3 py-2 text-rose-400 font-bold">CRITICAL</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="bg-navy-950 p-4 rounded-xl border border-navy-800 text-xs text-slate-300 space-y-2">
              <div className="flex items-center gap-2">
                <span className="text-gold-400 font-bold">CRITICAL PATH:</span>
                <span className="text-rose-400 font-mono font-bold">A → C → D → E</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-slate-400">Total Project Minimum Duration:</span>
                <span className="text-white font-mono font-bold">16 Weeks (1 KTU Semester)</span>
              </div>
              <p className="text-slate-400 text-[11px] pt-1">
                Activity B (Problem Formulation) has <strong>3 weeks of float</strong>. Even if Activity B is delayed by 3 weeks, it will not jeopardize the KTU Review 2 deadline. However, any slippage in Activity C (Dataset Curation) directly delays the graduation defense.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* 4. EARNED VALUE MANAGEMENT (EVM) SOLVER */}
      {/* ======================================================== */}
      {activeTab === 'evm' && (
        <div className="space-y-6">
          <div className="glass-panel p-6 rounded-2xl border border-navy-700/80 space-y-4">
            <div>
              <h3 className="text-xl font-heading font-bold text-white">
                Earned Value Management (EVM) Project Budgeting
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                Track schedule and cost health using standard industrial indices (CV, SV, CPI, SPI, EAC).
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
              <div>
                <label className="text-xs text-slate-400 font-semibold block mb-1">Planned Value PV (INR)</label>
                <input 
                  type="number" value={pv}
                  onChange={(e) => setPv(parseInt(e.target.value) || 0)}
                  className="w-full bg-navy-950 border border-navy-700 rounded-lg px-3 py-1.5 text-white font-mono"
                />
              </div>
              <div>
                <label className="text-xs text-slate-400 font-semibold block mb-1">Earned Value EV (INR)</label>
                <input 
                  type="number" value={ev}
                  onChange={(e) => setEv(parseInt(e.target.value) || 0)}
                  className="w-full bg-navy-950 border border-navy-700 rounded-lg px-3 py-1.5 text-white font-mono"
                />
              </div>
              <div>
                <label className="text-xs text-slate-400 font-semibold block mb-1">Actual Cost AC (INR)</label>
                <input 
                  type="number" value={ac}
                  onChange={(e) => setAc(parseInt(e.target.value) || 0)}
                  className="w-full bg-navy-950 border border-navy-700 rounded-lg px-3 py-1.5 text-white font-mono"
                />
              </div>
              <div>
                <label className="text-xs text-slate-400 font-semibold block mb-1">Budget at Completion BAC</label>
                <input 
                  type="number" value={bac}
                  onChange={(e) => setBac(parseInt(e.target.value) || 0)}
                  className="w-full bg-navy-950 border border-navy-700 rounded-lg px-3 py-1.5 text-white font-mono"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 pt-3">
              <div className="bg-navy-900/80 p-3 rounded-xl border border-navy-800 text-center">
                <span className="text-[11px] text-slate-400 block">Cost Variance (CV)</span>
                <span className={`text-lg font-bold font-mono mt-1 block ${cv >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                  {cv >= 0 ? `+Rs. ${cv}` : `-Rs. ${Math.abs(cv)}`}
                </span>
                <span className="text-[10px] text-slate-500 font-mono">EV - AC</span>
              </div>

              <div className="bg-navy-900/80 p-3 rounded-xl border border-navy-800 text-center">
                <span className="text-[11px] text-slate-400 block">Schedule Variance (SV)</span>
                <span className={`text-lg font-bold font-mono mt-1 block ${sv >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                  {sv >= 0 ? `+Rs. ${sv}` : `-Rs. ${Math.abs(sv)}`}
                </span>
                <span className="text-[10px] text-slate-500 font-mono">EV - PV</span>
              </div>

              <div className="bg-navy-900/80 p-3 rounded-xl border border-navy-800 text-center">
                <span className="text-[11px] text-slate-400 block">Cost Index (CPI)</span>
                <span className={`text-lg font-bold font-mono mt-1 block ${cpi >= 1 ? 'text-emerald-400' : 'text-rose-400'}`}>
                  {cpi.toFixed(3)}
                </span>
                <span className="text-[10px] text-slate-500 font-mono">EV / AC (&gt;1 is good)</span>
              </div>

              <div className="bg-navy-900/80 p-3 rounded-xl border border-navy-800 text-center">
                <span className="text-[11px] text-slate-400 block">Schedule Index (SPI)</span>
                <span className={`text-lg font-bold font-mono mt-1 block ${spi >= 1 ? 'text-emerald-400' : 'text-amber-400'}`}>
                  {spi.toFixed(3)}
                </span>
                <span className="text-[10px] text-slate-500 font-mono">EV / PV (&gt;1 is good)</span>
              </div>

              <div className="bg-navy-900/80 p-3 rounded-xl border border-navy-800 text-center">
                <span className="text-[11px] text-slate-400 block">Estimated Final Cost (EAC)</span>
                <span className="text-lg font-bold font-mono text-gold-400 mt-1 block">
                  Rs. {Math.round(eac).toLocaleString()}
                </span>
                <span className="text-[10px] text-slate-500 font-mono">BAC / CPI</span>
              </div>
            </div>

            <div className="bg-navy-950 p-4 rounded-xl border border-navy-800 text-xs text-slate-300">
              <strong className="text-gold-400">Project Status Diagnostic:</strong>{' '}
              {cpi < 1 && spi < 1
                ? 'Warning: The project is currently over budget and behind schedule. Mitigate by trimming non-critical scope.'
                : cpi >= 1 && spi >= 1
                ? 'Excellent: The project is under budget and ahead of schedule!'
                : 'Mixed: Monitor resource expenditures against weekly sprint deliverables.'}
            </div>
          </div>
        </div>
      )}

      {/* ======================================================== */}
      {/* 5. COST-BENEFIT & NPV SOLVER */}
      {/* ======================================================== */}
      {activeTab === 'npv' && (
        <div className="space-y-6">
          <div className="glass-panel p-6 rounded-2xl border border-navy-700/80 space-y-4">
            <div>
              <h3 className="text-xl font-heading font-bold text-white">
                Cost-Benefit, NPV & Payback Period Laboratory
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                Discounted Cash Flow (DCF) model over a 3-year operational horizon.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
              <div>
                <label className="text-xs text-slate-400 font-semibold block mb-1">Initial CapEx (C0 in INR)</label>
                <input 
                  type="number" value={initialCost}
                  onChange={(e) => setInitialCost(parseInt(e.target.value) || 0)}
                  className="w-full bg-navy-950 border border-navy-700 rounded-lg px-3 py-1.5 text-white font-mono"
                />
              </div>
              <div>
                <label className="text-xs text-slate-400 font-semibold block mb-1">Annual Benefit (INR)</label>
                <input 
                  type="number" value={annualBenefit}
                  onChange={(e) => setAnnualBenefit(parseInt(e.target.value) || 0)}
                  className="w-full bg-navy-950 border border-navy-700 rounded-lg px-3 py-1.5 text-white font-mono"
                />
              </div>
              <div>
                <label className="text-xs text-slate-400 font-semibold block mb-1">Annual OpEx (INR)</label>
                <input 
                  type="number" value={annualOpex}
                  onChange={(e) => setAnnualOpex(parseInt(e.target.value) || 0)}
                  className="w-full bg-navy-950 border border-navy-700 rounded-lg px-3 py-1.5 text-white font-mono"
                />
              </div>
              <div>
                <label className="text-xs text-slate-400 font-semibold block mb-1">Discount Rate (%)</label>
                <input 
                  type="number" value={discountRate}
                  onChange={(e) => setDiscountRate(parseFloat(e.target.value) || 0)}
                  className="w-full bg-navy-950 border border-navy-700 rounded-lg px-3 py-1.5 text-white font-mono"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
              <div className="bg-navy-900/80 p-4 rounded-xl border border-navy-800 text-center">
                <span className="text-xs text-slate-400 block">Net Present Value (NPV)</span>
                <span className={`text-2xl font-bold font-mono mt-1 block ${npv >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                  {npv >= 0 ? `+Rs. ${Math.round(npv).toLocaleString()}` : `-Rs. ${Math.round(Math.abs(npv)).toLocaleString()}`}
                </span>
                <span className="text-[10px] text-slate-500 font-mono">Discounted at {discountRate}%</span>
              </div>

              <div className="bg-navy-900/80 p-4 rounded-xl border border-navy-800 text-center">
                <span className="text-xs text-slate-400 block">Simple 3-Year ROI</span>
                <span className="text-2xl font-bold font-mono text-gold-400 mt-1 block">
                  {simpleRoi.toFixed(2)}%
                </span>
                <span className="text-[10px] text-slate-500 font-mono">(Total Net Inflows - C0) / C0</span>
              </div>

              <div className="bg-navy-900/80 p-4 rounded-xl border border-navy-800 text-center">
                <span className="text-xs text-slate-400 block">Simple Payback Period</span>
                <span className="text-2xl font-bold font-mono text-blue-400 mt-1 block">
                  {paybackYears.toFixed(2)} Years
                </span>
                <span className="text-[10px] text-slate-500 font-mono">({(paybackYears * 12).toFixed(1)} Months)</span>
              </div>
            </div>

            <div className="bg-navy-950 p-4 rounded-xl border border-navy-800 text-xs text-slate-300">
              <strong className="text-gold-400">Feasibility Verdict:</strong>{' '}
              {npv >= 0
                ? `The project is economically viable with a positive NPV of +Rs. ${Math.round(npv).toLocaleString()} and amortizes capital within ${paybackYears.toFixed(2)} years.`
                : `The project generates a negative NPV under the ${discountRate}% discount rate. Seek additional student grant funding (e.g. KSCSTE) to offset the initial capital equipment purchase.`}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

