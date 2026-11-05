import React, { useState } from 'react';
import { 
  Award, CheckCircle2, AlertTriangle, Users, BookOpen, 
  FileCheck, Clock, Download, ChevronRight, TrendingUp, Sliders, ShieldAlert
} from 'lucide-react';
import { CSD415_SYLLABUS, CSD416_SYLLABUS } from '../../data/syllabusData';

interface TeamMember {
  id: string;
  token: string;
  role: string;
  workAllocation: string;
  hoursLogged: number;
  contributionPercent: number;
}

interface LogbookEntry {
  week: number;
  date: string;
  memberToken: string;
  activity: string;
  deliverable: string;
  facultyApproved: boolean;
}

export const ProjectDashboard: React.FC = () => {
  const [activePhase, setActivePhase] = useState<'CSD415' | 'CSD416'>('CSD415');

  // --- Phase I Marks State (Total 100) ---
  const [p1GuideMarks, setP1GuideMarks] = useState<number>(27); // max 30
  const [p1Rev1Marks, setP1Rev1Marks] = useState<number>(13); // max 15
  const [p1Rev2Marks, setP1Rev2Marks] = useState<number>(23); // max 25
  const [p1ReportMarks, setP1ReportMarks] = useState<number>(28); // max 30

  // --- Phase II Marks State (Total 150) ---
  const [p2GuideMarks, setP2GuideMarks] = useState<number>(28); // max 30
  const [p2CommitteeMarks, setP2CommitteeMarks] = useState<number>(36); // max 40
  const [p2ExternalViva, setP2ExternalViva] = useState<number>(72); // max 80

  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([
    { id: 'm1', token: 'Student 101', role: 'Team Lead & Core ML Architect', workAllocation: 'Algorithm modeling, loss optimization, SOTA benchmarks', hoursLogged: 120, contributionPercent: 27 },
    { id: 'm2', token: 'Student 102', role: 'Data Pipeline & Preprocessing Lead', workAllocation: 'Dataset curation, KNN imputation, feature selection', hoursLogged: 110, contributionPercent: 25 },
    { id: 'm3', token: 'Student 103', role: 'Full-Stack & Systems Developer', workAllocation: 'FastAPI microservices, Dockerization, UI dashboard', hoursLogged: 115, contributionPercent: 26 },
    { id: 'm4', token: 'Student 104', role: 'Verification & Documentation Lead', workAllocation: 'Unit/stress testing, ablation studies, IEEE thesis drafting', hoursLogged: 100, contributionPercent: 22 }
  ]);

  const [logbook, setLogbook] = useState<LogbookEntry[]>([
    { week: 1, date: 'Aug 04, 2026', memberToken: 'Student 101', activity: 'Conducted PRISMA search on IEEE Xplore; collected 42 candidate papers.', deliverable: 'Initial paper repository', facultyApproved: true },
    { week: 3, date: 'Aug 18, 2026', memberToken: 'Student 102', activity: 'Ingested NIH ChestX-ray14; eliminated corrupted DICOM records.', deliverable: 'Cleaned CSV metadata', facultyApproved: true },
    { week: 6, date: 'Sep 08, 2026', memberToken: 'Student 103', activity: 'Presented at KTU Review 1 Committee; addressed scope questions.', deliverable: 'Review 1 Slide Deck', facultyApproved: true },
    { week: 10, date: 'Oct 06, 2026', memberToken: 'Student 104', activity: 'Completed preliminary baseline model training with 86.4% F1-score.', deliverable: 'Jupyter baseline notebook', facultyApproved: true },
    { week: 13, date: 'Oct 27, 2026', memberToken: 'Student 101', activity: 'Prepared block diagram and WBS for Review 2 Committee.', deliverable: 'Review 2 Milestone Report', facultyApproved: false },
    { week: 15, date: 'Nov 10, 2026', memberToken: 'Student 104', activity: 'Compiled LaTeX Phase I bound report; verified plagiarism < 12%.', deliverable: 'Final Bound Report draft', facultyApproved: false }
  ]);

  const toggleApproval = (idx: number) => {
    setLogbook(prev => prev.map((item, i) => i === idx ? { ...item, facultyApproved: !item.facultyApproved } : item));
  };

  const p1Total = p1GuideMarks + p1Rev1Marks + p1Rev2Marks + p1ReportMarks;
  const p2Total = p2GuideMarks + p2CommitteeMarks + p2ExternalViva;

  const currentTotal = activePhase === 'CSD415' ? p1Total : p2Total;
  const maxPossible = activePhase === 'CSD415' ? 100 : 150;
  const percentage = Math.round((currentTotal / maxPossible) * 1000) / 10;

  const getKtuGrade = (pct: number) => {
    if (pct >= 90) return { grade: 'O (Outstanding)', gpa: 10.0, color: 'text-emerald-400' };
    if (pct >= 85) return { grade: 'A+ (Excellent)', gpa: 9.0, color: 'text-gold-400' };
    if (pct >= 80) return { grade: 'A (Very Good)', gpa: 8.5, color: 'text-blue-400' };
    if (pct >= 70) return { grade: 'B+ (Good)', gpa: 8.0, color: 'text-slate-300' };
    if (pct >= 60) return { grade: 'B (Above Average)', gpa: 7.0, color: 'text-amber-400' };
    if (pct >= 50) return { grade: 'C (Pass)', gpa: 6.0, color: 'text-orange-400' };
    return { grade: 'F (Failed)', gpa: 0.0, color: 'text-rose-500' };
  };

  const gradeInfo = getKtuGrade(percentage);

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header */}
      <div className="border-b border-navy-700/60 pb-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-gold-400 text-sm font-semibold tracking-wide uppercase">
              <Award className="w-4 h-4" />
              <span>KTU Capstone Governance & Grading Engine</span>
            </div>
            <h2 className="text-3xl font-heading font-bold text-white mt-1">
              Project Evaluation Dashboard & Gradebook
            </h2>
            <p className="text-slate-400 text-sm mt-1 max-w-3xl">
              Track student team contributions, manage weekly faculty logbook sign-offs, evaluate risks, and compute official KTU Continuous Internal Evaluation (CIE) and External Viva marks.
            </p>
          </div>

          {/* Phase Switcher Tabs */}
          <div className="flex items-center bg-navy-900 p-1.5 rounded-xl border border-navy-700">
            <button
              onClick={() => setActivePhase('CSD415')}
              className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activePhase === 'CSD415'
                  ? 'bg-gold-500 text-navy-950 shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Phase I (CSD415 • 100M)
            </button>
            <button
              onClick={() => setActivePhase('CSD416')}
              className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activePhase === 'CSD416'
                  ? 'bg-gold-500 text-navy-950 shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Phase II (CSD416 • 150M)
            </button>
          </div>
        </div>
      </div>

      {/* Grade & Total Score Hero Banner */}
      <div className="glass-panel p-6 rounded-2xl border border-gold-500/30 bg-gradient-to-r from-navy-900/90 via-navy-950 to-burgundy-950/40">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 items-center">
          <div>
            <span className="text-xs text-gold-400 font-mono font-semibold block uppercase tracking-wider">
              Evaluated Course
            </span>
            <h3 className="text-2xl font-heading font-bold text-white mt-1">
              {activePhase === 'CSD415' ? 'CSD415: PROJECT PHASE I' : 'CSD416: PROJECT PHASE II'}
            </h3>
            <p className="text-xs text-slate-400 mt-1">
              {activePhase === 'CSD415' ? 'Seventh Semester (S7) • 2 Credits' : 'Eighth Semester (S8) • 4 Credits'}
            </p>
          </div>

          <div className="text-center md:border-x md:border-navy-800 py-2">
            <span className="text-xs text-slate-400 block">Total Calculated Marks</span>
            <span className="text-4xl font-extrabold font-mono text-gold-400 mt-1 block">
              {currentTotal} <span className="text-sm font-normal text-slate-400">/ {maxPossible}</span>
            </span>
            <span className="text-xs text-emerald-400 font-mono font-bold">
              Percentage: {percentage}%
            </span>
          </div>

          <div className="text-center md:border-r md:border-navy-800 py-2">
            <span className="text-xs text-slate-400 block">Projected KTU Grade</span>
            <span className={`text-2xl font-bold font-heading mt-1 block ${gradeInfo.color}`}>
              {gradeInfo.grade}
            </span>
            <span className="text-xs text-slate-400 font-mono">
              Grade Point: {gradeInfo.gpa.toFixed(1)} / 10.0
            </span>
          </div>

          <div className="flex flex-col gap-2">
            <button
              onClick={() => window.print()}
              className="flex items-center justify-center gap-2 px-4 py-2 bg-navy-800 hover:bg-navy-700 text-slate-200 border border-navy-700 rounded-xl text-xs font-semibold transition-colors shadow-sm"
            >
              <Download className="w-3.5 h-3.5 text-gold-400" />
              <span>Print Official Mark Sheet</span>
            </button>
            <span className="text-[10px] text-center text-slate-500 font-mono">
              Generated according to KTU 2019 Scheme Rubrics
            </span>
          </div>
        </div>
      </div>

      {/* Interactive Rubrics Evaluator */}
      <div className="glass-panel p-6 rounded-2xl border border-navy-700/80 space-y-4">
        <div>
          <h3 className="text-xl font-heading font-bold text-white flex items-center gap-2">
            <Sliders className="w-5 h-5 text-gold-400" />
            <span>Official Rubric Breakdown & Interactive Mark Adjuster</span>
          </h3>
          <p className="text-xs text-slate-400 mt-1">
            Faculty guides and committee members can fine-tune scores for each official evaluation sub-component.
          </p>
        </div>

        {activePhase === 'CSD415' ? (
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 pt-2">
            <div className="bg-navy-950 p-4 rounded-xl border border-navy-800 space-y-2">
              <div className="flex justify-between text-xs">
                <span className="text-slate-300 font-semibold">Guide Continuous Assessment</span>
                <span className="text-gold-400 font-bold font-mono">{p1GuideMarks} / 30</span>
              </div>
              <input 
                type="range" min="0" max="30" value={p1GuideMarks}
                onChange={(e) => setP1GuideMarks(parseInt(e.target.value))}
                className="w-full accent-gold-400 cursor-pointer"
              />
              <p className="text-[11px] text-slate-500">Regularity, attendance, reading depth, and initiative in S7.</p>
            </div>

            <div className="bg-navy-950 p-4 rounded-xl border border-navy-800 space-y-2">
              <div className="flex justify-between text-xs">
                <span className="text-slate-300 font-semibold">Committee Review 1 (Week 6-7)</span>
                <span className="text-gold-400 font-bold font-mono">{p1Rev1Marks} / 15</span>
              </div>
              <input 
                type="range" min="0" max="15" value={p1Rev1Marks}
                onChange={(e) => setP1Rev1Marks(parseInt(e.target.value))}
                className="w-full accent-gold-400 cursor-pointer"
              />
              <p className="text-[11px] text-slate-500">Problem formulation, literature depth, and project novelty.</p>
            </div>

            <div className="bg-navy-950 p-4 rounded-xl border border-navy-800 space-y-2">
              <div className="flex justify-between text-xs">
                <span className="text-slate-300 font-semibold">Committee Review 2 (Week 12-13)</span>
                <span className="text-gold-400 font-bold font-mono">{p1Rev2Marks} / 25</span>
              </div>
              <input 
                type="range" min="0" max="25" value={p1Rev2Marks}
                onChange={(e) => setP1Rev2Marks(parseInt(e.target.value))}
                className="w-full accent-gold-400 cursor-pointer"
              />
              <p className="text-[11px] text-slate-500">System architecture, proof of concept simulation, and feasibility.</p>
            </div>

            <div className="bg-navy-950 p-4 rounded-xl border border-navy-800 space-y-2">
              <div className="flex justify-between text-xs">
                <span className="text-slate-300 font-semibold">Phase I Bound Report</span>
                <span className="text-gold-400 font-bold font-mono">{p1ReportMarks} / 30</span>
              </div>
              <input 
                type="range" min="0" max="30" value={p1ReportMarks}
                onChange={(e) => setP1ReportMarks(parseInt(e.target.value))}
                className="w-full accent-gold-400 cursor-pointer"
              />
              <p className="text-[11px] text-slate-500">Technical rigor, IEEE format adherence, and plagiarism &lt; 15%.</p>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
            <div className="bg-navy-950 p-4 rounded-xl border border-navy-800 space-y-2">
              <div className="flex justify-between text-xs">
                <span className="text-slate-300 font-semibold">Guide Continuous Assessment</span>
                <span className="text-gold-400 font-bold font-mono">{p2GuideMarks} / 30</span>
              </div>
              <input 
                type="range" min="0" max="30" value={p2GuideMarks}
                onChange={(e) => setP2GuideMarks(parseInt(e.target.value))}
                className="w-full accent-gold-400 cursor-pointer"
              />
              <p className="text-[11px] text-slate-500">Semester 8 implementation progress and lab diligence.</p>
            </div>

            <div className="bg-navy-950 p-4 rounded-xl border border-navy-800 space-y-2">
              <div className="flex justify-between text-xs">
                <span className="text-slate-300 font-semibold">Internal Committee Reviews 1 & 2</span>
                <span className="text-gold-400 font-bold font-mono">{p2CommitteeMarks} / 40</span>
              </div>
              <input 
                type="range" min="0" max="40" value={p2CommitteeMarks}
                onChange={(e) => setP2CommitteeMarks(parseInt(e.target.value))}
                className="w-full accent-gold-400 cursor-pointer"
              />
              <p className="text-[11px] text-slate-500">Interim Review 1 (20M) + Interim Review 2 (20M).</p>
            </div>

            <div className="bg-navy-950 p-4 rounded-xl border border-gold-500/30 space-y-2 bg-gold-500/5">
              <div className="flex justify-between text-xs">
                <span className="text-gold-300 font-semibold">External Viva-Voce & Demonstration</span>
                <span className="text-gold-400 font-bold font-mono">{p2ExternalViva} / 80</span>
              </div>
              <input 
                type="range" min="0" max="80" value={p2ExternalViva}
                onChange={(e) => setP2ExternalViva(parseInt(e.target.value))}
                className="w-full accent-gold-400 cursor-pointer"
              />
              <p className="text-[11px] text-slate-500">External Examiner (40M) + Internal Examiner (40M).</p>
            </div>
          </div>
        )}
      </div>

      {/* Student Team Work Allocation & Contribution Tracker */}
      <div className="glass-panel p-6 rounded-2xl border border-navy-700/80 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xl font-heading font-bold text-white flex items-center gap-2">
              <Users className="w-5 h-5 text-gold-400" />
              <span>Student Team Work Allocation & Contribution (Zero PII)</span>
            </h3>
            <p className="text-xs text-slate-400 mt-1">
              Individual student contribution tracking ensuring fair evaluation by the KTU Project Committee.
            </p>
          </div>
          <span className="text-xs bg-navy-800 text-slate-300 px-3 py-1 rounded-full border border-navy-700 font-mono">
            Team Alpha (4 Members)
          </span>
        </div>

        <div className="overflow-x-auto border border-navy-800 rounded-xl">
          <table className="w-full text-left text-xs font-mono">
            <thead className="bg-navy-900 text-gold-300 border-b border-navy-800">
              <tr>
                <th className="px-4 py-3">Student Token</th>
                <th className="px-4 py-3">Assigned Engineering Role</th>
                <th className="px-4 py-3">Core Deliverable Responsibilities</th>
                <th className="px-4 py-3">Lab Hours</th>
                <th className="px-4 py-3">Contribution</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-navy-900 bg-navy-950/70 text-slate-300">
              {teamMembers.map(m => (
                <tr key={m.id} className="hover:bg-navy-800/40 transition-colors">
                  <td className="px-4 py-3 font-bold text-white flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-gold-400" />
                    <span>{m.token}</span>
                  </td>
                  <td className="px-4 py-3 text-gold-300">{m.role}</td>
                  <td className="px-4 py-3 text-slate-400 font-sans">{m.workAllocation}</td>
                  <td className="px-4 py-3 font-mono">{m.hoursLogged} hrs</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <div className="w-16 h-1.5 bg-navy-900 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-emerald-400 rounded-full"
                          style={{ width: `${m.contributionPercent * 3.3}%` }}
                        />
                      </div>
                      <span className="font-bold text-white">{m.contributionPercent}%</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Weekly Activity Diary / Lab Logbook */}
      <div className="glass-panel p-6 rounded-2xl border border-navy-700/80 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xl font-heading font-bold text-white flex items-center gap-2">
              <Clock className="w-5 h-5 text-gold-400" />
              <span>Weekly Activity Diary / Laboratory Logbook</span>
            </h3>
            <p className="text-xs text-slate-400 mt-1">
              Mandatory KTU weekly logbook entries with Faculty Guide sign-off status.
            </p>
          </div>
          <span className="text-xs text-slate-400">
            Click status pill to toggle faculty sign-off
          </span>
        </div>

        <div className="space-y-2">
          {logbook.map((entry, idx) => (
            <div 
              key={idx}
              className="bg-navy-950 p-4 rounded-xl border border-navy-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs font-mono"
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="bg-navy-900 text-gold-400 px-2 py-0.5 rounded font-bold">
                    Week {entry.week}
                  </span>
                  <span className="text-slate-500">{entry.date}</span>
                  <span className="text-slate-300 font-semibold">• {entry.memberToken}</span>
                </div>
                <p className="text-slate-200 font-sans text-xs">{entry.activity}</p>
                <div className="text-[11px] text-slate-400">
                  <strong className="text-slate-300">Deliverable:</strong> {entry.deliverable}
                </div>
              </div>

              <button
                onClick={() => toggleApproval(idx)}
                className={`px-3 py-1.5 rounded-lg text-xs font-sans font-semibold flex items-center gap-1.5 transition-all self-end sm:self-auto shrink-0 ${
                  entry.facultyApproved
                    ? 'bg-emerald-950 border border-emerald-500/40 text-emerald-300'
                    : 'bg-amber-950 border border-amber-500/40 text-amber-300 hover:bg-amber-900/60'
                }`}
              >
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>{entry.facultyApproved ? 'Guide Signed & Approved' : 'Pending Guide Sign-off'}</span>
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

