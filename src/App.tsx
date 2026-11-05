import React, { useState } from 'react';
import { 
  BookOpen, Search, Database, Calculator, Compass, 
  Zap, Award, FileText, Sparkles, GraduationCap
} from 'lucide-react';
import { CurriculumHub } from './components/curriculum/CurriculumHub';
import { LiteratureLab } from './components/research-lab/LiteratureLab';
import { DataScienceLab } from './components/data-science/DataScienceLab';
import { NumericalLab } from './components/numerical-lab/NumericalLab';
import { ThreeResearchLab } from './components/visualizations/ThreeResearchLab';
import { InteractiveDemos } from './components/demonstrations/InteractiveDemos';
import { ProjectDashboard } from './components/dashboard/ProjectDashboard';
import { DeliverablesHub } from './components/deliverables/DeliverablesHub';

export const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<
    'curriculum' | 'literature' | 'datascience' | 'numerical' | '3dlab' | 'demos' | 'dashboard' | 'deliverables'
  >('curriculum');

  return (
    <div className="min-h-screen flex flex-col bg-navy-950 text-slate-100 font-sans selection:bg-burgundy-800 selection:text-gold-200">
      {/* Top Academic Navigation Bar */}
      <header className="sticky top-0 z-50 glass-panel border-b border-navy-800/80 bg-navy-950/85 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 gap-4">
            {/* Logo & Platform Title */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-gold-400 to-gold-600 flex items-center justify-center text-navy-950 shadow-md">
                <GraduationCap className="w-6 h-6" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-heading font-extrabold text-white text-base tracking-tight">
                    KTU PROJECT HUB
                  </span>
                  <span className="bg-navy-800 text-gold-300 font-mono text-[10px] px-2 py-0.5 rounded border border-navy-700 font-bold">
                    CSD415 & CSD416
                  </span>
                </div>
                <div className="text-[11px] text-slate-400 font-medium">
                  APJ Abdul Kalam Technological University • B.Tech CSE
                </div>
              </div>
            </div>

            {/* Faculty Attribution Badge */}
            <div className="hidden lg:flex items-center gap-3 bg-navy-900/90 border border-gold-500/30 px-3.5 py-1.5 rounded-xl text-xs">
              <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-slate-300">
                Mentor: <strong className="text-gold-300">Jane Rose</strong> (Assistant Professor, CSE)
              </span>
            </div>
          </div>

          {/* Primary Navigation Tabs */}
          <nav className="flex space-x-1 overflow-x-auto py-2.5 border-t border-navy-800/60 scrollbar-none text-xs">
            <button
              onClick={() => setActiveTab('curriculum')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl whitespace-nowrap transition-all font-semibold ${
                activeTab === 'curriculum'
                  ? 'bg-gold-500 text-navy-950 shadow-md'
                  : 'text-slate-300 hover:bg-navy-900 hover:text-white'
              }`}
            >
              <BookOpen className="w-4 h-4" />
              <span>Curriculum & Modules</span>
            </button>

            <button
              onClick={() => setActiveTab('literature')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl whitespace-nowrap transition-all font-semibold ${
                activeTab === 'literature'
                  ? 'bg-gold-500 text-navy-950 shadow-md'
                  : 'text-slate-300 hover:bg-navy-900 hover:text-white'
              }`}
            >
              <Search className="w-4 h-4" />
              <span>Literature & Research Lab</span>
            </button>

            <button
              onClick={() => setActiveTab('datascience')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl whitespace-nowrap transition-all font-semibold ${
                activeTab === 'datascience'
                  ? 'bg-gold-500 text-navy-950 shadow-md'
                  : 'text-slate-300 hover:bg-navy-900 hover:text-white'
              }`}
            >
              <Database className="w-4 h-4" />
              <span>Data Science Lab</span>
            </button>

            <button
              onClick={() => setActiveTab('numerical')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl whitespace-nowrap transition-all font-semibold ${
                activeTab === 'numerical'
                  ? 'bg-gold-500 text-navy-950 shadow-md'
                  : 'text-slate-300 hover:bg-navy-900 hover:text-white'
              }`}
            >
              <Calculator className="w-4 h-4" />
              <span>Numerical Solvers Lab</span>
            </button>

            <button
              onClick={() => setActiveTab('3dlab')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl whitespace-nowrap transition-all font-semibold ${
                activeTab === '3dlab'
                  ? 'bg-gold-500 text-navy-950 shadow-md'
                  : 'text-slate-300 hover:bg-navy-900 hover:text-white'
              }`}
            >
              <Compass className="w-4 h-4" />
              <span>3D Research Lab</span>
            </button>

            <button
              onClick={() => setActiveTab('demos')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl whitespace-nowrap transition-all font-semibold ${
                activeTab === 'demos'
                  ? 'bg-gold-500 text-navy-950 shadow-md'
                  : 'text-slate-300 hover:bg-navy-900 hover:text-white'
              }`}
            >
              <Zap className="w-4 h-4" />
              <span>Interactive Demos</span>
            </button>

            <button
              onClick={() => setActiveTab('dashboard')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl whitespace-nowrap transition-all font-semibold ${
                activeTab === 'dashboard'
                  ? 'bg-gold-500 text-navy-950 shadow-md'
                  : 'text-slate-300 hover:bg-navy-900 hover:text-white'
              }`}
            >
              <Award className="w-4 h-4" />
              <span>Evaluation Dashboard</span>
            </button>

            <button
              onClick={() => setActiveTab('deliverables')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl whitespace-nowrap transition-all font-semibold ${
                activeTab === 'deliverables'
                  ? 'bg-gold-500 text-navy-950 shadow-md'
                  : 'text-slate-300 hover:bg-navy-900 hover:text-white'
              }`}
            >
              <FileText className="w-4 h-4" />
              <span>Deliverables & Viva Bank</span>
            </button>
          </nav>
        </div>
      </header>

      {/* Main Content Viewport */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'curriculum' && <CurriculumHub />}
        {activeTab === 'literature' && <LiteratureLab />}
        {activeTab === 'datascience' && <DataScienceLab />}
        {activeTab === 'numerical' && <NumericalLab />}
        {activeTab === '3dlab' && <ThreeResearchLab />}
        {activeTab === 'demos' && <InteractiveDemos />}
        {activeTab === 'dashboard' && <ProjectDashboard />}
        {activeTab === 'deliverables' && <DeliverablesHub />}
      </main>

      {/* Mandatory Official Faculty Footer on Every Page */}
      <footer className="mt-auto border-t border-navy-800 bg-navy-950/95 py-6 text-center text-xs text-slate-400">
        <div className="max-w-7xl mx-auto px-4 space-y-2">
          <p className="font-heading font-medium text-slate-300">
            Designed & Developed for Academic Learning | Jane Rose | Department of Computer Science & Engineering
          </p>
          <p className="text-[11px] text-slate-500 font-mono">
            KTU B.Tech CSD415 Project Phase I & CSD416 Project Phase II Master Academic Environment © 2026. All Rights Reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};
