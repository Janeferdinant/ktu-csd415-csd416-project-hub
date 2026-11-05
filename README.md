# KTU Project Hub: CSD415 (Phase I) & CSD416 (Phase II)
## Complete Interactive Course & Industry-Oriented Project Environment
### APJ Abdul Kalam Technological University | B.Tech Computer Science & Engineering

Designed & Developed for Academic Learning | **Jane Rose** | Department of Computer Science & Engineering

---

## 1. Executive Summary

**KTU Project Hub** is an ultra-premium, interactive teaching and project engineering platform specifically tailored for:
- **CSD415: PROJECT PHASE I** (Semester 7 | 2 Credits | 100 Continuous Internal Evaluation Marks)
- **CSD416: PROJECT PHASE II** (Semester 8 | 4 Credits | 150 Marks: 70 CIE + 80 ESE/Viva-Voce)

Rather than static notes, the platform provides a complete 3D-visualized, interactive development, simulation, and governance environment for undergraduate engineering students and faculty mentors.

---

## 2. Platform Architecture & Core Laboratories

```
phase2/
├── index.html                   # Retina-optimized entry point with Google Fonts
├── package.json                 # React 18, Three.js, Lucide-React, Vite, Vitest
├── tailwind.config.js           # Luxury academic palette (Navy #070B19, Gold #D4AF37, Burgundy #6B1724)
├── vite.config.ts               # Vite bundler configuration
├── vercel.json                  # One-click deployment configuration for Vercel
├── backend/
│   ├── main.py                  # FastAPI microservice for numerical solvers & datasets
│   └── requirements.txt         # FastAPI, Uvicorn, Pandas, Scikit-learn
├── src/
│   ├── main.tsx                 # React DOM client entrypoint
│   ├── App.tsx                  # Master responsive viewport & primary navigation
│   ├── index.css                # Glassmorphism utilities & animation tokens
│   ├── data/
│   │   ├── syllabusData.ts      # Official KTU CSD415/CSD416 syllabi, CO1-CO6 & rubrics
│   │   ├── teachingMaterials.ts # 14-point pedagogical materials for all 18 modules
│   │   ├── literatureData.ts    # 12 verified peer-reviewed IEEE/Springer/ACM papers
│   │   └── datasetData.ts       # Real benchmark datasets (UCI, Kaggle, data.gov.in)
│   └── components/
│       ├── curriculum/          # Official Syllabus, Bloom's COs & Teaching Notes
│       ├── research-lab/        # Google Scholar Boolean builder & Literature Matrix
│       ├── data-science/        # 14-step interactive end-to-end ML engineering lab
│       ├── numerical-lab/       # 10 Interactive mathematical solvers (CPM, EVM, F1, MAE)
│       ├── visualizations/      # Three.js 3D Orbital Research Lifecycle & Architecture
│       ├── demonstrations/      # Real-time epoch training loop & benchmark matrix
│       ├── dashboard/           # Dual-phase evaluation marksheets, logbook & RACI
│       └── deliverables/        # Slide deck presenter, LaTeX templates & viva bank
└── tests/
    ├── numerical.test.ts        # Vitest suite for mathematical derivations
    ├── syllabus.test.ts         # Vitest suite for KTU credit/mark integrity
    └── test_backend.py          # Python unit tests for FastAPI calculation endpoints
```

---

## 3. Key Laboratory Highlights

### I. Research & Literature Survey Laboratory
- **Boolean Query Formulator:** Generates search strings using `AND`, `OR`, `NOT`, and year bounds (`2022..2026`) with one-click launch to Google Scholar and IEEE Xplore.
- **Verified Literature Comparison Table:** 12 recent peer-reviewed publications from IEEE TMI, IEEE IoT Journal, Springer ECCV, ACM TASLP, Elsevier Applied Energy, and IEEE J-BHI with exact DOI links, benchmark datasets, quantitative results, reported limitations, and identified research gaps.
- **Automated Citation Exporter:** Instant copy-to-clipboard for BibTeX, IEEE, and APA formats.
- **Novelty Assessment Calculator:** Interactive 5-slider rubric scoring proposed topics out of 100.

### II. Dataset Acquisition & 14-Step Data Science Laboratory
- **Real Benchmark Datasets:** UCI Heart Disease, Kaggle Credit Card Fraud (imbalanced 0.17%), and India CPCB Ambient Air Quality.
- **Interactive Ingestion Head:** Displays real tabular records, missing values summaries, and statistical standard deviations.
- **14-Step Standard Pipeline:** 1. Discovery, 2. Schema Inspection, 3. Cleaning, 4. Imputation, 5. EDA, 6. Statistical Hypothesis Testing, 7. Visualizations, 8. Feature Engineering, 9. Feature Selection, 10. Model Training, 11. Model Benchmarking, 12. Hyperparameter Grid Search, 13. Holdout Evaluation, 14. TreeSHAP Explainability.

### III. Numerical Problem Laboratory
Interactive real-time solvers with step-by-step formula derivations and engineering interpretations:
1. **Classification Metrics:** Accuracy, Precision, Recall, Specificity, F1-Score, and Matthew's Correlation Coefficient (MCC).
2. **Regression Errors:** MAE, MSE, RMSE, and Coefficient of Determination ($R^2$).
3. **CPM / PERT Project Scheduling:** Computes Early Start, Early Finish, Late Start, Late Finish, Total Slack, and the Critical Path.
4. **Earned Value Management (EVM):** Planned Value (PV), Earned Value (EV), Actual Cost (AC), Cost Variance (CV), Schedule Variance (SV), CPI, SPI, and Estimate at Completion (EAC).
5. **Cost-Benefit & NPV Feasibility:** Discounted Cash Flows (DCF), 3-Year Net Present Value (NPV), Simple ROI, and Payback Period.

### IV. 3D WebGL Research Lab & System Architecture
- Interactive WebGL 3D scene built with Three.js.
- Rotating orbital particle constellation showing the 7 phases of the KTU project lifecycle.
- Clickable 3D nodes that highlight phase descriptions, mandatory deliverables, and KTU marks weightages.

### V. Project Evaluation Dashboard
- **Separate Phase Tracking:** CSD415 (100 Marks CIE) vs CSD416 (150 Marks: 70 CIE + 80 ESE/Viva).
- **Interactive Rubric Sliders:** Guide Continuous Assessment, Committee Review 1 & 2, Bound Report, and External Viva Voce.
- **Grade Projection:** Real-time percentage conversion to KTU Grade (O, A+, A, B+, B, C, F) and Grade Point.
- **Weekly Activity Diary / Logbook:** 16-week student logbook with faculty guide sign-off toggles.
- **Printable Marksheet:** One-click print-ready official report generation.

### VI. Final Deliverables & Viva Defense Hub
- **Slide Deck Presenter:** Interactive presentation deck with keyboard navigation and presenter notes.
- **Downloadable Official Templates:** KTU Project Proposal, Phase I Bound Report, and Phase II Final Thesis in Markdown/LaTeX.
- **University Viva Voce Bank:** Curated external examiner questions across ML, Architecture, Testing, and IPR with model answers and grading tips.

---

## 4. Local Execution & Development Setup

### Prerequisites
- Node.js (v18+ or v24+)
- Python (v3.10+ or v3.14+)

### 1. Run the Frontend (Vite + React)
```bash
# Navigate to the phase2 directory
cd phase2

# Install dependencies (already completed)
npm install

# Start Vite local development server
npm run dev
# -> Opens http://localhost:3000
```

### 2. Run the Backend API (FastAPI)
```bash
# Navigate to the backend directory
cd backend

# Launch FastAPI server with Uvicorn
python -m uvicorn main:app --reload --port 8000
# -> Interactive Swagger documentation at http://localhost:8000/docs
```

### 3. Run Automated Unit Tests
```bash
# Run Vitest test suite for numerical and syllabus assertions
npm test

# Run Python backend calculations validation test
python tests/test_backend.py
```

### 4. Build for Production
```bash
npm run build
# -> Compiles static bundle to dist/
```

---

## 5. Deployment Guide

### Deploy to Vercel
1. Push this repository to GitHub.
2. Import the project into the [Vercel Dashboard](https://vercel.com).
3. The included `vercel.json` will automatically detect the Vite framework and output directory (`dist`).
4. Click **Deploy**.

---

## 6. Official Faculty Branding Footer
Every page and module strictly displays:

> **Designed & Developed for Academic Learning | Jane Rose | Department of Computer Science & Engineering**

