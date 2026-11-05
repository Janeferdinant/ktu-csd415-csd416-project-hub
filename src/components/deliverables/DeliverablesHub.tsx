import React, { useState } from 'react';
import { 
  FileText, Download, Copy, Check, Presentation, 
  HelpCircle, ChevronRight, ChevronLeft, Maximize2, Award, Sparkles, BookOpen
} from 'lucide-react';
import { TEACHING_MATERIALS, Slide } from '../../data/teachingMaterials';

export const DeliverablesHub: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'slides' | 'templates' | 'viva'>('slides');
  const [selectedTopicId, setSelectedTopicId] = useState<string>('csd415-t1');
  const [currentSlideIndex, setCurrentSlideIndex] = useState<number>(0);
  const [copiedTemplateId, setCopiedTemplateId] = useState<string | null>(null);

  const currentTopic = TEACHING_MATERIALS[selectedTopicId] || TEACHING_MATERIALS['csd415-t1'];
  const slides = currentTopic.teachingPresentation.slides;
  const activeSlide = slides[currentSlideIndex] || slides[0];

  const handleCopyTemplate = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedTemplateId(id);
    setTimeout(() => setCopiedTemplateId(null), 2000);
  };

  const handleDownloadFile = (filename: string, content: string) => {
    const blob = new Blob([content], { type: 'text/markdown;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', filename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // --- Official Templates Content ---
  const PROPOSAL_TEMPLATE = `# APJ ABDUL KALAM TECHNOLOGICAL UNIVERSITY
## CAPSTONE PROJECT PROPOSAL
### B.Tech Computer Science and Engineering | CSD415 Project Phase I

**1. PROJECT IDENTIFICATION**
- Project Title: [e.g., Ultra-Low Latency Anomaly Detection for Edge Industrial Turbines]
- Academic Year: 2026–2027
- Semester: Semester 7
- Department: Department of Computer Science and Engineering

**2. TEAM DETAILS**
- Team ID: [e.g., CSE-S7-TEAM-04]
- Member 1 (Lead): [Student Name] (Roll No: 101) - Role: ML Architecture
- Member 2: [Student Name] (Roll No: 102) - Role: Data Pipelines
- Member 3: [Student Name] (Roll No: 103) - Role: Systems & Backend
- Member 4: [Student Name] (Roll No: 104) - Role: Testing & Report
- Faculty Guide: [Professor Name], Assistant Professor, Dept of CSE

**3. PROBLEM STATEMENT**
[Provide a clear, 200-word formal problem statement with baseline performance, failure mechanism, and scope boundary.]

**4. SMART OBJECTIVES**
- Objective 1: [Dataset collection and cleaning by Week 4]
- Objective 2: [Core architectural design and simulation by Week 8]
- Objective 3: [Ablation testing and baseline benchmarking by Week 12]
- Objective 4: [Report compilation and Review 2 defense by Week 15]

**5. PRELIMINARY ARCHITECTURE & METHODOLOGY**
[Include system block diagram and mathematical formulation of objective function.]

**6. WORK BREAKDOWN STRUCTURE & SCHEDULE**
[Attach 16-Week CPM/Gantt Chart identifying Critical Path.]

**7. BUDGET ESTIMATE & FUNDING SOURCES**
- Hardware / Cloud Budget: Rs. 15,000
- Targeted Funding: KSCSTE Student Project Scheme / Kerala Startup Mission

**8. FACULTY ENDORSEMENT**
Signature of Guide: __________________   Date: ______________
`;

  const PHASE1_REPORT_TEMPLATE = `# APJ ABDUL KALAM TECHNOLOGICAL UNIVERSITY
## PROJECT PHASE I REPORT
### Submitted in partial fulfillment of the requirements for the award of the Degree of
### BACHELOR OF TECHNOLOGY IN COMPUTER SCIENCE AND ENGINEERING

**TITLE: [YOUR PROJECT TITLE HERE]**

**SUBMITTED BY:**
- Student 101
- Student 102
- Student 103
- Student 104

**UNDER THE GUIDANCE OF:**
[Faculty Guide Name], Assistant Professor

**DEPARTMENT OF COMPUTER SCIENCE & ENGINEERING**
**COLLEGE OF ENGINEERING**
**NOVEMBER 2026**

---

### TABLE OF CONTENTS
1. Abstract
2. Chapter 1: Introduction
   1.1 Domain Background
   1.2 Problem Statement
   1.3 Project Objectives & Hypotheses
   1.4 Scope and Limitations
3. Chapter 2: Literature Survey
   2.1 PRISMA Screening Protocol
   2.2 Review of State-of-the-Art Approaches
   2.3 Comprehensive Literature Comparison Table
   2.4 Identified Research Gaps
4. Chapter 3: System Design and Methodology
   3.1 Architectural Block Diagram
   3.2 Data Flow Diagrams (Level 0, 1, 2)
   3.3 Mathematical Formulation & Algorithmic Design
   3.4 Hardware and Software Requirements
5. Chapter 4: Feasibility Study and Work Plan
   4.1 TELOS Multi-Dimensional Feasibility Analysis
   4.2 Cost-Benefit Analysis and Budget
   4.3 Work Breakdown Structure (WBS)
   4.4 Critical Path Method (CPM) and Gantt Chart
6. Chapter 5: Preliminary Analysis and Simulation
   5.1 Baseline Proof-of-Concept Experiments
   5.2 Preliminary Results and Observations
7. Chapter 6: Conclusion and Phase II Road Map
8. References (IEEE Format)
9. Plagiarism Report Certificate (< 15%)
`;

  const VIVA_QUESTIONS = [
    {
      domain: 'Research & Literature Survey',
      q: 'What is the primary research gap in existing literature that your project addresses?',
      a: 'Existing literature predominantly achieves high accuracy on uncompressed server GPU architectures (e.g., ResNet-50 requiring 380MB RAM), but fails on edge microcontrollers due to memory bounds. Our research gap addresses this by integrating INT8 post-training quantization with depthwise separable attention, enabling sub-20ms inference on a Raspberry Pi 4.',
      tip: 'Never state "no one has done this before". Always frame the gap as a specific technical tradeoff or unaddressed constraint.'
    },
    {
      domain: 'Problem Formulation',
      q: 'How did you mathematically formulate your objective function?',
      a: 'We formulated the task as constrained empirical risk minimization: min_theta L(f_theta(X), Y) + lambda * Omega(theta) subject to the strict inference latency constraint T(f_theta) <= 30ms and model storage <= 10MB.',
      tip: 'Writing the formal optimization equation on the whiteboard during the viva immediately impresses external examiners.'
    },
    {
      domain: 'Methodology & Design',
      q: 'Why did you choose a microservices architecture over a monolithic design?',
      a: 'We decoupled the heavy ML inference kernel from the web presentation and database persistence layers. This allows scaling GPU workers independently without restarting the API gateway, and ensures client telemetry continues logging even during deep learning pipeline restarts.',
      tip: 'Highlight separation of concerns, testability, and fault isolation.'
    },
    {
      domain: 'Testing & Metrics',
      q: 'Why is accuracy an inadequate evaluation metric for your dataset?',
      a: 'Our dataset exhibits severe class imbalance (only 0.17% positive fraud cases). A trivial model predicting 100% negative achieves 99.83% accuracy but fails completely. Therefore, we evaluate using Precision, Recall, F1-Score (harmonic mean), and Matthew’s Correlation Coefficient (MCC).',
      tip: 'Be prepared to calculate precision and recall on the spot from a sample 2x2 confusion matrix.'
    },
    {
      domain: 'Testing & Validation',
      q: 'What was the specific outcome of your ablation study?',
      a: 'In our ablation study, removing the Squeeze-and-Excitation attention module caused a 4.2% drop in validation F1, while disabling the contrast-adaptive filter increased error on low-light test instances by 11.8%. This proves each module contributes measurably to the overall accuracy.',
      tip: 'Examiners look for empirical evidence rather than theoretical assumptions.'
    },
    {
      domain: 'IPR & Future Scope',
      q: 'Is the software source code of your capstone project patentable in India?',
      a: 'Under Section 3(k) of the Indian Patent Act 1970, computer programmes per se are not patentable. However, because our algorithm produces a measurable technical effect in physical sensor noise filtering and edge hardware acceleration, the integrated hardware-software process qualifies for patenting.',
      tip: 'Cite Section 3(k) and the Computer-Related Inventions (CRI) guidelines.'
    }
  ];

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header */}
      <div className="border-b border-navy-700/60 pb-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-gold-400 text-sm font-semibold tracking-wide uppercase">
              <FileText className="w-4 h-4" />
              <span>KTU Capstone Final Deliverables Hub</span>
            </div>
            <h2 className="text-3xl font-heading font-bold text-white mt-1">
              Deliverables, Slide Presenter & Viva Bank
            </h2>
            <p className="text-slate-400 text-sm mt-1 max-w-3xl">
              Access the interactive slide deck presenter, download official KTU LaTeX/Markdown report templates, and master the external university viva-voce question bank.
            </p>
          </div>

          <div className="flex items-center bg-navy-900 p-1.5 rounded-xl border border-navy-700">
            <button
              onClick={() => setActiveTab('slides')}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activeTab === 'slides'
                  ? 'bg-gold-500 text-navy-950 shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Presentation className="w-4 h-4" />
              <span>Slide Presenter</span>
            </button>

            <button
              onClick={() => setActiveTab('templates')}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activeTab === 'templates'
                  ? 'bg-gold-500 text-navy-950 shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <FileText className="w-4 h-4" />
              <span>Official Templates</span>
            </button>

            <button
              onClick={() => setActiveTab('viva')}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activeTab === 'viva'
                  ? 'bg-gold-500 text-navy-950 shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <HelpCircle className="w-4 h-4" />
              <span>External Viva Bank</span>
            </button>
          </div>
        </div>
      </div>

      {/* 1. INTERACTIVE SLIDE DECK PRESENTER */}
      {activeTab === 'slides' && (
        <div className="space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <label className="text-xs text-slate-400 font-semibold">Select Presentation Topic:</label>
              <select
                value={selectedTopicId}
                onChange={(e) => {
                  setSelectedTopicId(e.target.value);
                  setCurrentSlideIndex(0);
                }}
                className="bg-navy-900 border border-navy-700 rounded-xl px-3 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-gold-400"
              >
                {Object.values(TEACHING_MATERIALS).map(topic => (
                  <option key={topic.id} value={topic.id}>
                    [{topic.courseCode}] Topic {topic.topicNumber}: {topic.title}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex items-center gap-2 text-xs text-slate-400 font-mono">
              Slide {currentSlideIndex + 1} of {slides.length}
            </div>
          </div>

          {/* Big Slide Stage */}
          <div className="glass-panel p-8 sm:p-12 rounded-2xl border border-navy-700/80 min-h-[380px] flex flex-col justify-between relative overflow-hidden bg-gradient-to-br from-navy-950 via-navy-900 to-navy-950">
            <div className="absolute top-0 right-0 w-96 h-96 bg-gold-500/5 rounded-full blur-3xl -z-10" />

            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <span className="text-xs bg-burgundy-900/60 text-burgundy-200 px-3 py-1 rounded-full border border-burgundy-700/60 font-mono">
                  {currentTopic.courseCode} • Slide {activeSlide.slideNumber}
                </span>
                <span className="text-xs text-gold-400 font-mono">
                  {currentTopic.title}
                </span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-heading font-extrabold text-white">
                {activeSlide.title}
              </h3>

              <ul className="space-y-3 pt-2">
                {activeSlide.bullets.map((bullet, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-slate-200 text-sm sm:text-base leading-relaxed">
                    <span className="w-2 h-2 rounded-full bg-gold-400 mt-2 shrink-0" />
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Presenter Speaker Notes Drawer */}
            <div className="mt-8 pt-4 border-t border-navy-800 bg-navy-950/60 p-4 rounded-xl border border-navy-800/80 text-xs text-slate-400">
              <strong className="text-gold-400 font-mono block mb-1">FACULTY PRESENTER SPEAKER NOTE:</strong>
              <p>{activeSlide.presenterNote}</p>
            </div>
          </div>

          {/* Slide Navigation Bar */}
          <div className="flex items-center justify-between">
            <button
              onClick={() => setCurrentSlideIndex(Math.max(0, currentSlideIndex - 1))}
              disabled={currentSlideIndex === 0}
              className="flex items-center gap-2 px-4 py-2 bg-navy-900 hover:bg-navy-800 disabled:opacity-40 text-slate-300 rounded-xl text-xs font-semibold border border-navy-800 transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Previous Slide</span>
            </button>

            <div className="flex gap-1.5">
              {slides.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentSlideIndex(idx)}
                  className={`w-3 h-3 rounded-full transition-all ${
                    currentSlideIndex === idx ? 'bg-gold-400 w-6' : 'bg-navy-800'
                  }`}
                />
              ))}
            </div>

            <button
              onClick={() => setCurrentSlideIndex(Math.min(slides.length - 1, currentSlideIndex + 1))}
              disabled={currentSlideIndex === slides.length - 1}
              className="flex items-center gap-2 px-4 py-2 bg-navy-900 hover:bg-navy-800 disabled:opacity-40 text-slate-300 rounded-xl text-xs font-semibold border border-navy-800 transition-colors"
            >
              <span>Next Slide</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* 2. OFFICIAL TEMPLATES */}
      {activeTab === 'templates' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Template 1: Project Proposal */}
            <div className="glass-card p-6 rounded-2xl border border-navy-700/80 space-y-4 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between text-xs text-gold-400 font-mono mb-2">
                  <span>KTU Official Standard</span>
                  <span>Week 4 Submission</span>
                </div>
                <h3 className="text-lg font-heading font-bold text-white">
                  KTU Project Proposal Template (Phase I)
                </h3>
                <p className="text-xs text-slate-400 mt-1">
                  Complete structure covering Project Identification, Team Tokens, Mathematical Problem Statement, SMART Objectives, Architecture, and Budget.
                </p>
                <div className="mt-4 bg-navy-950 p-3 rounded-xl border border-navy-800 font-mono text-[11px] text-slate-400 max-h-40 overflow-y-auto">
                  <pre>{PROPOSAL_TEMPLATE.slice(0, 450)}...</pre>
                </div>
              </div>

              <div className="flex items-center gap-3 pt-3 border-t border-navy-800">
                <button
                  onClick={() => handleCopyTemplate(PROPOSAL_TEMPLATE, 'prop')}
                  className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 bg-navy-800 hover:bg-navy-700 text-slate-200 rounded-xl text-xs font-semibold border border-navy-700 transition-colors"
                >
                  {copiedTemplateId === 'prop' ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                  <span>Copy Markdown</span>
                </button>
                <button
                  onClick={() => handleDownloadFile('KTU_CSD415_Project_Proposal_Template.md', PROPOSAL_TEMPLATE)}
                  className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 bg-gold-500 hover:bg-gold-400 text-navy-950 font-bold rounded-xl text-xs transition-colors shadow-sm"
                >
                  <Download className="w-4 h-4" />
                  <span>Download .md</span>
                </button>
              </div>
            </div>

            {/* Template 2: Phase I Report */}
            <div className="glass-card p-6 rounded-2xl border border-navy-700/80 space-y-4 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between text-xs text-gold-400 font-mono mb-2">
                  <span>KTU Bound Report Standard</span>
                  <span>Week 15 Submission</span>
                </div>
                <h3 className="text-lg font-heading font-bold text-white">
                  KTU Phase I Bound Report Master Template
                </h3>
                <p className="text-xs text-slate-400 mt-1">
                  Complete LaTeX / Markdown chapter-by-chapter outline (Chapters 1 to 6) with Front Matter, Plagiarism Certificate, and IEEE BibTeX citation format.
                </p>
                <div className="mt-4 bg-navy-950 p-3 rounded-xl border border-navy-800 font-mono text-[11px] text-slate-400 max-h-40 overflow-y-auto">
                  <pre>{PHASE1_REPORT_TEMPLATE.slice(0, 450)}...</pre>
                </div>
              </div>

              <div className="flex items-center gap-3 pt-3 border-t border-navy-800">
                <button
                  onClick={() => handleCopyTemplate(PHASE1_REPORT_TEMPLATE, 'rep1')}
                  className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 bg-navy-800 hover:bg-navy-700 text-slate-200 rounded-xl text-xs font-semibold border border-navy-700 transition-colors"
                >
                  {copiedTemplateId === 'rep1' ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                  <span>Copy Markdown</span>
                </button>
                <button
                  onClick={() => handleDownloadFile('KTU_CSD415_Phase_I_Report_Template.md', PHASE1_REPORT_TEMPLATE)}
                  className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 bg-gold-500 hover:bg-gold-400 text-navy-950 font-bold rounded-xl text-xs transition-colors shadow-sm"
                >
                  <Download className="w-4 h-4" />
                  <span>Download .md</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 3. EXTERNAL VIVA VOCE QUESTION BANK */}
      {activeTab === 'viva' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-heading font-bold text-white">
              Curated External University Viva Voce Question Bank
            </h3>
            <span className="text-xs bg-navy-900 border border-gold-500/30 text-gold-300 px-3 py-1 rounded-full font-mono">
              6 Core Engineering Categories
            </span>
          </div>

          <div className="space-y-3">
            {VIVA_QUESTIONS.map((v, idx) => (
              <div 
                key={idx}
                className="glass-card p-5 rounded-2xl border border-navy-700/80 space-y-3"
              >
                <div className="flex items-center justify-between text-xs">
                  <span className="bg-navy-900 text-gold-400 font-mono px-2.5 py-0.5 rounded border border-navy-800 font-semibold">
                    {v.domain}
                  </span>
                  <span className="text-slate-500 font-mono">Q{idx + 1}</span>
                </div>

                <h4 className="text-base font-heading font-semibold text-white">
                  {v.q}
                </h4>

                <div className="bg-navy-950/80 p-4 rounded-xl border border-navy-800 text-xs text-slate-300 space-y-2">
                  <strong className="text-emerald-400 block font-mono">MODEL ANSWER FOR 10/10 VIVA SCORE:</strong>
                  <p className="leading-relaxed">{v.a}</p>
                </div>

                <div className="text-[11px] text-slate-400 bg-gold-500/5 border border-gold-500/20 p-2.5 rounded-lg flex items-center gap-2">
                  <Sparkles className="w-3.5 h-3.5 text-gold-400 shrink-0" />
                  <span><strong>Examiner’s Grading Tip:</strong> {v.tip}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

