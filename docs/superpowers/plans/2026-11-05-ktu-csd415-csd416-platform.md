# KTU CSD415 & CSD416 Interactive Course Platform Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a complete, interactive, industry-oriented teaching and project-development platform for KTU B.Tech CSE Project Phase I (CSD415) and Project Phase II (CSD416) with 3D laboratory visualizations, interactive numerical laboratories, data science pipelines, research gap analyzers, and official KTU evaluation rubrics.

**Architecture:** A modern single-page and multi-view React 19 + TypeScript + Vite application styled with Tailwind CSS, Lucide icons, Three.js / WebGL 3D visualizations, Recharts data graphics, and interactive numerical solvers, supported by a Python FastAPI backend for data processing, real datasets, and algorithmic computation.

**Tech Stack:**
- Frontend: React 19, TypeScript, Vite, Tailwind CSS, Lucide React, Three.js, Recharts, Canvas-confetti, html2canvas, jspdf
- Backend: Python 3.14, FastAPI, Uvicorn, Pandas, NumPy, Scikit-learn, Pydantic
- Styling: Deep Navy (`#070B19`), Luxury Burgundy (`#6B1724`), Champagne Gold (`#D4AF37`), Emerald Green accents, Multi-glassmorphism (Liquid glass, Frosted glass, Neon Cyber glass, Deep Obsidian glass)
- Testing: Vitest / Node test runner, pytest for Python backend calculations

## Global Constraints
- Target Courses: KTU APJ Abdul Kalam Technological University B.Tech Computer Science & Engineering
  - CSD415: Project Phase I (Semester 7, 2 Credits, 100 Internal Marks)
  - CSD416: Project Phase II (Semester 8, 4 Credits, 150 Marks: 70 CIE + 80 ESE/Viva)
- Course Outcomes CO1 through CO6 preserved for both phases with Bloom's Taxonomy levels (K2 to K6).
- Official KTU Evaluation Rubrics strictly separated between Phase I and Phase II.
- Mandatory Footer on every page/view:
  "Designed & Developed for Academic Learning | Jane Rose | Department of Computer Science & Engineering"
- Zero student PII policy (use tokens like "Student 101", "Team Alpha").
- Genuine, verified academic citations (IEEE, ACM, Springer, Elsevier) — zero hallucinated references.

## Review Focus
1. Numerical solvers (Confusion Matrix, CPM/PERT, EVM, Regression metrics) must give exact mathematical results matching hand calculations.
2. Literature Survey table must feature real, verifiable peer-reviewed papers with real research gaps and methodologies.
3. 3D WebGL scenes must render smoothly on standard hardware without GPU memory leaks or crashing.
4. Evaluation mark sheets must accurately calculate weighted percentages according to KTU 2019 scheme formulas.
5. Exportable templates (Report, Slides, Proposals, Viva bank) must be fully populated with realistic engineering content and downloadable.

---

### Task 1: Scaffolding Vite React TypeScript Project with Tailwind CSS & Three.js
- [ ] Initialize package.json, vite.config.ts, tsconfig.json, tailwind.config.js, postcss.config.js
- [ ] Install dependencies: react, react-dom, lucide-react, three, recharts, @types/three, @types/react, @types/react-dom, tailwindcss, vite
- [ ] Configure index.html with Google Fonts (Outfit, Plus Jakarta Sans, JetBrains Mono) and luxury dark academic theme
- [ ] Verify build and dev server startup

### Task 2: Core Academic Data Models & Official KTU Syllabus Definitions
- [ ] Create `src/data/syllabusData.ts`:
  - Complete CSD415 (Phase I) syllabus: 9 core topics, CO1-CO6, CIE rubric (Guide 30, Internal Review 1 [15], Internal Review 2 [25], Report [30])
  - Complete CSD416 (Phase II) syllabus: 9 core topics, CO1-CO6, CIE rubric (Guide 30, Internal Reviews [40], External Viva & Demo [80])
  - Bloom's taxonomy mapping, PO/PSO mapping
- [ ] Create `src/data/teachingMaterials.ts`:
  - 18 comprehensive topic units (9 for Phase I, 9 for Phase II)
  - Each with: Learning objectives, concept explanations (beginner to advanced), lecture notes with architectural diagrams, presentation slides data, industry case studies, real IEEE/Springer citations, numerical examples, assignments, KTU exam Q&A, viva questions, and revision notes.

### Task 3: Research & Literature Survey Laboratory
- [ ] Create `src/components/research-lab/LiteratureLab.tsx`:
  - Google Scholar Boolean query generator (Title/Abstract/Year operators)
  - IEEE Xplore & Springer discovery engine
  - Live interactive comparison table with 12 verified high-impact papers (Title, Authors, Year, Venue, Method, Dataset, Algorithms, Results, Limitations, Identified Gaps)
  - Filterable by domain: Healthcare AI, Autonomous Vision, Cyber-Physical Security, NLP & LLMs, Cloud/Edge IoT
  - Citation generator (BibTeX, IEEE, APA, Harvard) with copy & export
  - Interactive Research Gap Matrix and Novelty Assessment Calculator

### Task 4: Dataset Acquisition & 14-Step Data Science Laboratory
- [ ] Create `src/components/data-science/DataScienceLab.tsx`:
  - Real dataset repository index (Kaggle, UCI, Govt Data with verified download links & schemas)
  - 14-Step Interactive Data Science Pipeline:
    1. Discovery & Download
    2. Dataset Schema & Descriptors
    3. Cleaning
    4. Missing Value Imputation
    5. Exploratory Data Analysis (EDA)
    6. Statistical Testing
    7. Visualizations
    8. Feature Engineering
    9. Feature Selection
    10. Model Training (Logistic, RF, XGBoost, CNN)
    11. Model Comparison (ROC-AUC, PR Curves)
    12. Hyperparameter Tuning
    13. Evaluation Metrics
    14. SHAP/Explainability
  - Interactive dataset switcher with live mock tabular data preview, summary statistics, and executable Python snippets.

### Task 5: Numerical Problem Laboratory & Interactive Solvers
- [ ] Create `src/components/numerical-lab/NumericalLab.tsx`:
  - 10 interactive engineering calculators with step-by-step mathematical proofs:
    1. Classification Metrics (Accuracy, Precision, Recall, Specificity, F1, MCC)
    2. Confusion Matrix Multi-class Calculator
    3. Regression Error Calculator (MAE, MSE, RMSE, R², Adjusted R², MAPE)
    4. Statistical Hypothesis Testing (Student's t-test, p-value, critical region)
    5. Correlation & Covariance Matrix Calculator
    6. Cost-Benefit & ROI Analysis (NPV, IRR, Payback)
    7. Technical & Operational Feasibility Score (TELOS)
    8. CPM/PERT Project Scheduling (Early Start, Early Finish, Late Start, Late Finish, Slack, Critical Path)
    9. Earned Value Management (PV, EV, AC, CV, SV, CPI, SPI, EAC)
    10. Hardware Resource & Cloud Budget Calculator (GPU hours, memory footprint, inference latency)
  - Real-time parameter tweaking with instantaneous formula derivation display.

### Task 6: 3D Interactive WebGL Research Lab & System Architecture
- [ ] Create `src/components/visualizations/ThreeResearchLab.tsx`:
  - Interactive Three.js canvas showcasing 3D orbital research lifecycle (Concept -> Literature -> Formulation -> Architecture -> Training -> Evaluation -> Defense)
  - Interactive node clicking to reveal phase details
  - 3D Modular Full-Stack Architecture visualizer
  - Particle starfield background with GPU optimization and resize observer

### Task 7: Interactive Project Demonstrations & Gantt Scheduler
- [ ] Create `src/components/demonstrations/InteractiveDemos.tsx`:
  - Real-time ML training loss/accuracy curve simulator with pause/resume/step
  - Interactive Gantt chart with drag/adjust timeline for S7 & S8 semesters
  - Live Algorithm Benchmark matrix comparing inference latency, RAM footprint, and F1-score
  - Interactive System Flow diagram with clickable modules

### Task 8: Comprehensive Project Evaluation Dashboard (Phase I & Phase II)
- [ ] Create `src/components/dashboard/ProjectDashboard.tsx`:
  - Dual-mode switch: Project Phase I (CSD415 - 100 Marks) vs Project Phase II (CSD416 - 150 Marks)
  - Team & Guide overview
  - Milestone & Research Gap tracker
  - Weekly Activity Diary / Lab Notebook with faculty approval toggles
  - Interactive Rubric Score Calculator for Guide, Internal Committee Reviews, and External Viva
  - Risk Assessment Heatmap (Technical, Resource, Schedule risks)
  - Deliverable export (PDF / Markdown / Print ready)

### Task 9: Final Deliverables, Templates & Viva Question Bank
- [ ] Create `src/components/deliverables/DeliverablesHub.tsx`:
  - Interactive Slide Deck Presenter (with fullscreen, slide navigation, notes, timer)
  - Downloadable Project Proposal Template (KTU format)
  - Downloadable Phase I Interim Report Template (IEEE format)
  - Downloadable Phase II Final Thesis Report Template (Complete 7-chapter structure)
  - Curated 100+ Question External Viva Voce Bank with detailed model answers categorized by domain (ML, Systems, Software Engineering, Architecture, Testing)
  - Interactive Jupyter-style Python code runner simulation

### Task 10: Python FastAPI Backend Service & Data Science Endpoints
- [ ] Create `backend/main.py`:
  - FastAPI server with endpoints for `/api/metrics/calculate`, `/api/cpm/solve`, `/api/datasets/summary`, `/api/literature/search`
  - Real calculation validation scripts
  - Setup requirements.txt and run scripts

### Task 11: Testing, Verification & Production Polish
- [ ] Unit tests for numerical calculators and rubric scoring logic
- [ ] Comprehensive verification of all tabs, interactive elements, 3D canvases, and exports
- [ ] Verification of mandatory footer on all views
- [ ] Build verification (`npm run build`)

