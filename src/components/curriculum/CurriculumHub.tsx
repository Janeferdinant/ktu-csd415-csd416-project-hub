import React, { useState } from 'react';
import { 
  BookOpen, Layers, CheckCircle2, Award, ChevronRight, 
  FileText, Code, HelpCircle, ExternalLink, Sparkles
} from 'lucide-react';
import { CSD415_SYLLABUS, CSD416_SYLLABUS, SyllabusDefinition } from '../../data/syllabusData';
import { TEACHING_MATERIALS, TopicTeachingMaterial } from '../../data/teachingMaterials';

export const CurriculumHub: React.FC = () => {
  const [selectedPhase, setSelectedPhase] = useState<'CSD415' | 'CSD416'>('CSD415');
  const [selectedModuleId, setSelectedModuleId] = useState<string>('csd415-m1');
  const [activeMaterialTab, setActiveMaterialTab] = useState<'concepts' | 'notes' | 'casestudy' | 'numerical' | 'exam'>('concepts');

  const syllabus: SyllabusDefinition = selectedPhase === 'CSD415' ? CSD415_SYLLABUS : CSD416_SYLLABUS;
  const currentModule = syllabus.modules.find(m => m.id === selectedModuleId) || syllabus.modules[0];

  // Map to matching detailed teaching material if available
  const materialKeyMap: Record<string, string> = {
    'csd415-m1': 'csd415-t1',
    'csd415-m2': 'csd415-t2',
    'csd415-m3': 'csd415-t3',
    'csd415-m5': 'csd415-t5',
    'csd415-m9': 'csd415-t9',
    'csd416-m4': 'csd416-t4',
    'csd416-m5': 'csd416-t5',
    'csd416-m8': 'csd416-t8'
  };

  const materialId = materialKeyMap[currentModule.id] || 'csd415-t1';
  const material: TopicTeachingMaterial = TEACHING_MATERIALS[materialId] || TEACHING_MATERIALS['csd415-t1'];

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header */}
      <div className="border-b border-navy-700/60 pb-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-gold-400 text-sm font-semibold tracking-wide uppercase">
              <BookOpen className="w-4 h-4" />
              <span>Official KTU Curriculum Hub</span>
            </div>
            <h2 className="text-3xl font-heading font-bold text-white mt-1">
              Course Structure & Detailed Teaching Materials
            </h2>
            <p className="text-slate-400 text-sm mt-1 max-w-3xl">
              Official syllabus specifications, Course Outcomes (CO1–CO6), evaluation schemes, and comprehensive 14-point pedagogical teaching notes for Project Phase I & II.
            </p>
          </div>

          {/* Phase Selector */}
          <div className="flex items-center bg-navy-900 p-1.5 rounded-xl border border-navy-700">
            <button
              onClick={() => {
                setSelectedPhase('CSD415');
                setSelectedModuleId('csd415-m1');
              }}
              className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${
                selectedPhase === 'CSD415'
                  ? 'bg-gold-500 text-navy-950 shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              CSD415 (Phase I • S7)
            </button>
            <button
              onClick={() => {
                setSelectedPhase('CSD416');
                setSelectedModuleId('csd416-m1');
              }}
              className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${
                selectedPhase === 'CSD416'
                  ? 'bg-gold-500 text-navy-950 shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              CSD416 (Phase II • S8)
            </button>
          </div>
        </div>
      </div>

      {/* Syllabus Meta Info Banner */}
      <div className="glass-panel p-6 rounded-2xl border border-navy-700/80 grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs font-mono">
        <div>
          <span className="text-slate-400 block font-sans">Course Code:</span>
          <span className="text-base text-gold-400 font-bold mt-0.5 block">{syllabus.courseCode}</span>
        </div>
        <div>
          <span className="text-slate-400 block font-sans">Semester & Credits:</span>
          <span className="text-base text-white font-bold mt-0.5 block">{syllabus.semester} ({syllabus.credits} Credits)</span>
        </div>
        <div>
          <span className="text-slate-400 block font-sans">Hours Per Week:</span>
          <span className="text-base text-white font-bold mt-0.5 block">{syllabus.hoursPerWeek}</span>
        </div>
        <div>
          <span className="text-slate-400 block font-sans">Total Evaluation Marks:</span>
          <span className="text-base text-emerald-400 font-bold mt-0.5 block">{syllabus.totalMarks} Marks ({selectedPhase === 'CSD415' ? '100% CIE' : '70 CIE + 80 ESE'})</span>
        </div>
      </div>

      {/* Course Outcomes (CO1 to CO6) Drawer */}
      <div className="glass-card p-6 rounded-2xl border border-navy-700/80 space-y-4">
        <h3 className="text-lg font-heading font-bold text-white flex items-center gap-2">
          <Award className="w-5 h-5 text-gold-400" />
          <span>Official Course Outcomes (CO1 – CO6) & Bloom’s Taxonomy</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {syllabus.courseOutcomes.map(co => (
            <div key={co.code} className="bg-navy-950 p-4 rounded-xl border border-navy-800 space-y-2 text-xs">
              <div className="flex items-center justify-between">
                <span className="font-bold text-gold-400 font-mono text-sm">{co.code}</span>
                <span className="bg-navy-900 text-slate-300 px-2 py-0.5 rounded font-mono text-[10px] border border-navy-700">
                  {co.bloomLevel}
                </span>
              </div>
              <p className="text-slate-300 leading-relaxed font-sans">{co.statement}</p>
              <div className="text-[10px] text-slate-500 font-mono pt-1">
                Mapped POs: {co.poMapping.join(', ')}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Two Column Layout: Module Selector on Left, Detailed Teaching Materials on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left: Syllabus Modules List */}
        <div className="lg:col-span-4 space-y-2">
          <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
            Select Course Topic ({syllabus.modules.length} Modules):
          </h4>

          {syllabus.modules.map(mod => {
            const isSelected = selectedModuleId === mod.id;
            return (
              <div
                key={mod.id}
                onClick={() => setSelectedModuleId(mod.id)}
                className={`p-3.5 rounded-xl cursor-pointer border transition-all text-xs ${
                  isSelected
                    ? 'bg-navy-900 border-gold-400 text-white shadow-glass-gold'
                    : 'bg-navy-950/70 border-navy-800 text-slate-300 hover:bg-navy-900/50 hover:border-navy-700'
                }`}
              >
                <div className="flex items-center justify-between text-[11px] text-slate-400 mb-1 font-mono">
                  <span className="text-gold-400 font-semibold">{mod.hours} Lab Hours</span>
                  <span className="bg-navy-800 px-2 py-0.5 rounded text-slate-300">{mod.courseOutcomeTargets.join(', ')}</span>
                </div>
                <div className="font-heading font-semibold text-sm">{mod.title}</div>
                <p className="text-[11px] text-slate-400 mt-1 line-clamp-2">{mod.description}</p>
              </div>
            );
          })}
        </div>

        {/* Right: Rich Pedagogical Teaching Content */}
        <div className="lg:col-span-8 glass-panel p-6 rounded-2xl border border-navy-700/80 space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-navy-800 pb-4">
            <div>
              <span className="text-xs bg-navy-800 text-gold-300 font-mono px-2.5 py-0.5 rounded border border-navy-700">
                {currentModule.phase} • Topic {currentModule.id.slice(-2)}
              </span>
              <h3 className="text-2xl font-heading font-bold text-white mt-1.5">
                {currentModule.title}
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                Targeted COs: <strong className="text-slate-200">{currentModule.courseOutcomeTargets.join(', ')}</strong> | Duration: {currentModule.hours} Hours
              </p>
            </div>

            <span className="text-xs text-slate-400 bg-navy-950 px-3 py-1.5 rounded-lg border border-navy-800 font-mono">
              Deliverable: {currentModule.practicalDeliverable}
            </span>
          </div>

          {/* Material Sub-Tabs */}
          <div className="flex flex-wrap gap-2 border-b border-navy-800 pb-3">
            <button
              onClick={() => setActiveMaterialTab('concepts')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                activeMaterialTab === 'concepts'
                  ? 'bg-gold-500 text-navy-950 font-bold'
                  : 'bg-navy-900 text-slate-300 hover:bg-navy-800'
              }`}
            >
              Beginner to Advanced
            </button>
            <button
              onClick={() => setActiveMaterialTab('notes')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                activeMaterialTab === 'notes'
                  ? 'bg-gold-500 text-navy-950 font-bold'
                  : 'bg-navy-900 text-slate-300 hover:bg-navy-800'
              }`}
            >
              Lecture Notes & Diagram
            </button>
            <button
              onClick={() => setActiveMaterialTab('casestudy')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                activeMaterialTab === 'casestudy'
                  ? 'bg-gold-500 text-navy-950 font-bold'
                  : 'bg-navy-900 text-slate-300 hover:bg-navy-800'
              }`}
            >
              Industry Case Study
            </button>
            {material.numericalProblem && (
              <button
                onClick={() => setActiveMaterialTab('numerical')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  activeMaterialTab === 'numerical'
                    ? 'bg-gold-500 text-navy-950 font-bold'
                    : 'bg-navy-900 text-slate-300 hover:bg-navy-800'
                }`}
              >
                Solved Numerical Problem
              </button>
            )}
            <button
              onClick={() => setActiveMaterialTab('exam')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                activeMaterialTab === 'exam'
                  ? 'bg-gold-500 text-navy-950 font-bold'
                  : 'bg-navy-900 text-slate-300 hover:bg-navy-800'
              }`}
            >
              KTU Exam Q&A & Viva
            </button>
          </div>

          {/* Tab 1: Concepts */}
          {activeMaterialTab === 'concepts' && (
            <div className="space-y-4 text-xs">
              <div className="bg-navy-950 p-4 rounded-xl border border-navy-800 space-y-1">
                <span className="text-gold-400 font-bold font-mono uppercase text-[11px]">Level 1: Beginner Intuition</span>
                <p className="text-slate-300 leading-relaxed">{material.beginnerToAdvanced.beginner}</p>
              </div>

              <div className="bg-navy-950 p-4 rounded-xl border border-navy-800 space-y-1">
                <span className="text-blue-400 font-bold font-mono uppercase text-[11px]">Level 2: Intermediate Engineering</span>
                <p className="text-slate-300 leading-relaxed">{material.beginnerToAdvanced.intermediate}</p>
              </div>

              <div className="bg-navy-950 p-4 rounded-xl border border-navy-800 space-y-1">
                <span className="text-purple-400 font-bold font-mono uppercase text-[11px]">Level 3: Advanced Academic Rigor</span>
                <p className="text-slate-300 leading-relaxed">{material.beginnerToAdvanced.advanced}</p>
              </div>
            </div>
          )}

          {/* Tab 2: Notes & Diagrams */}
          {activeMaterialTab === 'notes' && (
            <div className="space-y-4 text-xs">
              <div className="prose prose-invert max-w-none text-slate-300 text-xs leading-relaxed space-y-3">
                <pre className="bg-navy-950 p-4 rounded-xl border border-navy-800 text-slate-200 whitespace-pre-wrap font-sans">
                  {material.lectureNotes.content}
                </pre>
              </div>

              <div className="bg-navy-950 p-4 rounded-xl border border-gold-500/20 space-y-2">
                <span className="text-gold-400 font-bold font-mono text-[11px]">
                  {material.lectureNotes.diagramTitle}
                </span>
                <pre className="font-mono text-emerald-400 text-xs bg-navy-900/90 p-4 rounded-lg overflow-x-auto border border-navy-800">
                  {material.lectureNotes.diagramContent}
                </pre>
              </div>
            </div>
          )}

          {/* Tab 3: Case Study */}
          {activeMaterialTab === 'casestudy' && (
            <div className="space-y-4 text-xs">
              <div className="glass-card p-5 rounded-xl border border-navy-700 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-gold-400 font-mono font-bold">Industrial System: {material.industryCaseStudy.companyOrSystem}</span>
                  <span className="text-emerald-400 font-mono font-bold bg-navy-900 px-2 py-0.5 rounded border border-navy-800">
                    Impact: {material.industryCaseStudy.keyMetric}
                  </span>
                </div>
                <div className="space-y-1">
                  <strong className="text-rose-400 block">Engineering Problem:</strong>
                  <p className="text-slate-300">{material.industryCaseStudy.problem}</p>
                </div>
                <div className="space-y-1">
                  <strong className="text-blue-400 block">Architectural Solution:</strong>
                  <p className="text-slate-300">{material.industryCaseStudy.solutionArchitecture}</p>
                </div>
              </div>

              <div className="bg-navy-950 p-4 rounded-xl border border-navy-800 space-y-2">
                <span className="text-gold-400 font-bold font-mono text-[11px]">Real-World Engineering Application:</span>
                <div className="font-semibold text-white">{material.realWorldExample.title}</div>
                <p className="text-slate-300">{material.realWorldExample.description}</p>
                <div className="text-emerald-400 pt-1"><strong>Outcome:</strong> {material.realWorldExample.impact}</div>
              </div>
            </div>
          )}

          {/* Tab 4: Numerical Problem */}
          {activeMaterialTab === 'numerical' && material.numericalProblem && (
            <div className="space-y-4 text-xs">
              <div className="bg-navy-950 p-4 rounded-xl border border-navy-800 space-y-2">
                <span className="text-gold-400 font-bold font-mono text-[11px]">PRACTICAL NUMERICAL PROBLEM</span>
                <p className="text-slate-200 leading-relaxed font-sans">{material.numericalProblem.question}</p>
              </div>

              <div className="bg-navy-950 p-4 rounded-xl border border-navy-800 space-y-2 font-mono">
                <span className="text-emerald-400 font-bold text-[11px] font-sans">Formula:</span>
                <div className="text-slate-300 bg-navy-900 p-2.5 rounded border border-navy-800">{material.numericalProblem.formula}</div>

                <span className="text-gold-400 font-bold text-[11px] font-sans block pt-2">Step-by-Step Derivation:</span>
                <ul className="space-y-1.5 text-slate-300">
                  {material.numericalProblem.stepByStepCalculation.map((step, idx) => (
                    <li key={idx} className="bg-navy-900/50 p-2 rounded">{step}</li>
                  ))}
                </ul>

                <div className="pt-2 text-white font-bold text-sm">
                  Final Result: <span className="text-emerald-400">{material.numericalProblem.finalAnswer}</span>
                </div>

                <div className="text-slate-400 font-sans pt-1">
                  <strong>Interpretation:</strong> {material.numericalProblem.engineeringInterpretation}
                </div>
              </div>
            </div>
          )}

          {/* Tab 5: Exam Q&A */}
          {activeMaterialTab === 'exam' && (
            <div className="space-y-4 text-xs">
              {material.ktuExamQuestions.map((q, idx) => (
                <div key={idx} className="bg-navy-950 p-4 rounded-xl border border-navy-800 space-y-2">
                  <div className="flex items-center justify-between font-mono text-[11px]">
                    <span className="text-gold-400 font-bold">KTU Question ({q.marks} Marks)</span>
                    <span className="bg-navy-900 px-2 py-0.5 rounded text-slate-400 border border-navy-800">Bloom: {q.bloomLevel}</span>
                  </div>
                  <h5 className="text-white font-semibold">{q.question}</h5>
                  <div className="bg-navy-900/90 p-3 rounded-lg border border-navy-800 text-slate-300 space-y-1">
                    <strong className="text-emerald-400 block font-mono text-[10px]">MODEL ANSWER:</strong>
                    <p className="leading-relaxed">{q.modelAnswer}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

