export interface CourseOutcome {
  code: string;
  statement: string;
  bloomLevel: string;
  poMapping: string[];
}

export interface EvaluationComponent {
  component: string;
  evaluator: string;
  marks: number;
  weightagePercent: number;
  description: string;
  criteria: string[];
}

export interface SyllabusModule {
  id: string;
  title: string;
  hours: number;
  phase: 'Phase I (CSD415)' | 'Phase II (CSD416)';
  courseOutcomeTargets: string[];
  description: string;
  keyTopics: string[];
  practicalDeliverable: string;
}

export interface SyllabusDefinition {
  courseCode: string;
  courseTitle: string;
  semester: string;
  credits: number;
  hoursPerWeek: string;
  totalMarks: number;
  cieMarks: number;
  eseMarks: number;
  description: string;
  courseOutcomes: CourseOutcome[];
  evaluationScheme: EvaluationComponent[];
  modules: SyllabusModule[];
}

export const CSD415_SYLLABUS: SyllabusDefinition = {
  courseCode: 'CSD415',
  courseTitle: 'PROJECT PHASE I',
  semester: 'Semester 7 (S7)',
  credits: 2,
  hoursPerWeek: '0-0-6 (6 Lab Hours/Week)',
  totalMarks: 100,
  cieMarks: 100,
  eseMarks: 0,
  description: 'Project Phase I initiates the capstone engineering design journey. Students identify real-world technical problems through comprehensive literature surveys, establish formal objectives and testable hypotheses, design modular system architectures, assess project feasibility, formulate schedules and budgets, and present preliminary simulation findings.',
  courseOutcomes: [
    {
      code: 'CO1',
      statement: 'Identify contemporary societal, industrial, and scientific problems in Computer Science & Engineering through systematic literature survey.',
      bloomLevel: 'K3 (Apply)',
      poMapping: ['PO1', 'PO2', 'PO4', 'PO6', 'PO7', 'PSO1']
    },
    {
      code: 'CO2',
      statement: 'Formulate precise problem definitions, actionable project objectives, and testable scientific hypotheses with well-defined scopes.',
      bloomLevel: 'K4 (Analyze)',
      poMapping: ['PO2', 'PO3', 'PO4', 'PSO1']
    },
    {
      code: 'CO3',
      statement: 'Analyze technical, operational, and economic feasibility (TELOS framework) and construct detailed Work Breakdown Structures (WBS).',
      bloomLevel: 'K4 (Analyze)',
      poMapping: ['PO2', 'PO3', 'PO11', 'PSO2']
    },
    {
      code: 'CO4',
      statement: 'Design block-level system architectures, interface specifications, and conduct preliminary simulation, mathematical modeling, and baseline benchmarking.',
      bloomLevel: 'K5 (Evaluate)',
      poMapping: ['PO3', 'PO4', 'PO5', 'PSO1', 'PSO2']
    },
    {
      code: 'CO5',
      statement: 'Develop project execution timelines using CPM/Gantt charts, formulate resource budgets, and identify national/international funding avenues.',
      bloomLevel: 'K3 (Apply)',
      poMapping: ['PO11', 'PO9', 'PO10']
    },
    {
      code: 'CO6',
      statement: 'Prepare professional interim engineering reports, technical documentation, and deliver oral defense before the departmental evaluation committee.',
      bloomLevel: 'K3 (Apply)',
      poMapping: ['PO10', 'PO8', 'PO12']
    }
  ],
  evaluationScheme: [
    {
      component: 'Guide / Supervisor Evaluation',
      evaluator: 'Project Guide',
      marks: 30,
      weightagePercent: 30,
      description: 'Continuous assessment throughout Semester 7 by the faculty guide based on regular attendance, commitment, literature survey depth, and initiative.',
      criteria: [
        'Regularity and interaction with guide (10 Marks)',
        'Effort in literature collection, reading and comprehension (10 Marks)',
        'Understanding of problem and preliminary design formulation (10 Marks)'
      ]
    },
    {
      component: 'Internal Project Committee - Review 1',
      evaluator: 'Project Evaluation Committee',
      marks: 15,
      weightagePercent: 15,
      description: 'Conducted at Week 6–7. Focuses on topic relevance, novelty, literature depth, problem formulation, and primary objectives.',
      criteria: [
        'Novelty and engineering relevance of proposed project (5 Marks)',
        'Literature survey and research gap clarity (5 Marks)',
        'Formulation of problem statement and objectives (5 Marks)'
      ]
    },
    {
      component: 'Internal Project Committee - Review 2',
      evaluator: 'Project Evaluation Committee',
      marks: 25,
      weightagePercent: 25,
      description: 'Conducted at Week 12–13. Evaluates proposed methodology, block diagram, preliminary simulation results, work plan, and feasibility.',
      criteria: [
        'System architecture, block diagram, and data flow modeling (8 Marks)',
        'Preliminary simulation / mathematical formulation / proof-of-concept (10 Marks)',
        'Work plan, schedule, feasibility, and response to review questions (7 Marks)'
      ]
    },
    {
      component: 'Phase I Report & Documentation',
      evaluator: 'Guide & Evaluation Committee',
      marks: 30,
      weightagePercent: 30,
      description: 'Evaluation of the final bound Project Phase I Report submitted at the conclusion of Semester 7 adhering to KTU guidelines.',
      criteria: [
        'Report structure, technical rigor, and IEEE citation style (15 Marks)',
        'Completeness of literature analysis and methodology design (10 Marks)',
        'Plagiarism clearance (<15% similarity excluding bibliography) (5 Marks)'
      ]
    }
  ],
  modules: [
    {
      id: 'csd415-m1',
      title: 'Literature Study and Research Survey',
      hours: 12,
      phase: 'Phase I (CSD415)',
      courseOutcomeTargets: ['CO1'],
      description: 'Systematic survey of recent publications from IEEE, ACM, Springer, and Elsevier. Keyword discovery, Boolean search formulas, PRISMA protocol, citation indexing, and reference managers (Mendeley, Zotero).',
      keyTopics: ['Google Scholar & IEEE search operators', 'Survey taxonomy and PRISMA framework', 'Citation metrics (h-index, impact factor, SJR)', 'Automated reference management via BibTeX'],
      practicalDeliverable: 'Annotated bibliography matrix containing minimum 25 peer-reviewed papers (post-2020).'
    },
    {
      id: 'csd415-m2',
      title: 'Problem Identification and Formulation',
      hours: 10,
      phase: 'Phase I (CSD415)',
      courseOutcomeTargets: ['CO1', 'CO2'],
      description: 'Deconstructing real-world engineering bottlenecks into solvable research questions. Scope boundary delineation, stakeholder identification, and formal mathematical problem statement drafting.',
      keyTopics: ['Identifying pain points and industrial relevance', 'Formal mathematical problem definition', 'Scope vs Out-of-Scope boundaries', 'Input/Output formal contracts'],
      practicalDeliverable: '1-page formal Problem Formulation Document with mathematical input/output specifications.'
    },
    {
      id: 'csd415-m3',
      title: 'Objectives and Hypothesis Formulation',
      hours: 8,
      phase: 'Phase I (CSD415)',
      courseOutcomeTargets: ['CO2'],
      description: 'Translating problem statements into SMART (Specific, Measurable, Achievable, Relevant, Time-bound) objectives. Crafting Null (H0) and Alternative (H1) scientific hypotheses with statistical test frameworks.',
      keyTopics: ['SMART engineering objectives', 'Null (H0) vs Alternative (H1) hypothesis construction', 'Independent, dependent, and confounding variables', 'Success criteria metrics'],
      practicalDeliverable: 'Hypothesis matrix paired with target quantitative benchmark KPIs.'
    },
    {
      id: 'csd415-m4',
      title: 'Research Methodology and System Design',
      hours: 14,
      phase: 'Phase I (CSD415)',
      courseOutcomeTargets: ['CO2', 'CO4'],
      description: 'Selecting research paradigms (empirical, theoretical, simulation-based, algorithmic). Defining the end-to-end data processing pipelines, mathematical algorithms, and architectural tradeoffs.',
      keyTopics: ['Methodology selection matrix', 'Pipeline workflows and algorithmic pseudo-code', 'Hardware and software stack selection', 'Security and privacy considerations'],
      practicalDeliverable: 'Comprehensive Methodology Blueprint with pipeline flowcharts and algorithmic design.'
    },
    {
      id: 'csd415-m5',
      title: 'Work Plan, Task Allocation & WBS',
      hours: 8,
      phase: 'Phase I (CSD415)',
      courseOutcomeTargets: ['CO3', 'CO5'],
      description: 'Decomposition of the project lifecycle using Work Breakdown Structures (WBS). Task ownership matrices (RACI), sprint timelines, CPM scheduling, and Gantt chart generation.',
      keyTopics: ['Work Breakdown Structure (WBS) decomposition', 'RACI responsibility assignment matrix', 'Critical Path Method (CPM) calculation', 'Interactive Gantt chart creation'],
      practicalDeliverable: 'Two-semester CPM/Gantt schedule with milestone review checkpoints.'
    },
    {
      id: 'csd415-m6',
      title: 'Block-Level Design Documentation',
      hours: 12,
      phase: 'Phase I (CSD415)',
      courseOutcomeTargets: ['CO4'],
      description: 'High-level and low-level architectural design. Modular block diagrams, data flow diagrams (DFD Levels 0, 1, 2), UML component/sequence models, and API interface contracts.',
      keyTopics: ['System context diagrams', 'DFD Level 0, 1, and 2 specifications', 'UML structural and behavioral models', 'RESTful API & schema contract definitions'],
      practicalDeliverable: 'Complete IEEE Std 1016 Software/System Design Description (SDD) document.'
    },
    {
      id: 'csd415-m7',
      title: 'Project Funding Opportunities',
      hours: 6,
      phase: 'Phase I (CSD415)',
      courseOutcomeTargets: ['CO5'],
      description: 'Surveying student innovation grant schemes: KSCSTE (Kerala State Council for Science, Technology and Environment), Kerala Startup Mission (KSUM), DST-NIDHI, AICTE IDEA Lab, SERB, BIRAC, and IEEE Foundation grants.',
      keyTopics: ['KSCSTE Student Project Scheme guidelines', 'Kerala Startup Mission (KSUM) Idea Grant', 'DST & BIRAC healthcare/biotech funding schemes', 'Drafting an engineering grant proposal budget'],
      practicalDeliverable: 'Ready-to-submit KSCSTE / KSUM Student Innovation Grant Application Proposal.'
    },
    {
      id: 'csd415-m8',
      title: 'Preliminary Analysis, Modelling & Simulation',
      hours: 14,
      phase: 'Phase I (CSD415)',
      courseOutcomeTargets: ['CO4'],
      description: 'Developing proof-of-concept prototypes, baseline mathematical simulations, and preliminary computational experiments using Python, Scikit-learn, PyTorch, or simulation tools.',
      keyTopics: ['Baseline model selection and initial dataset ingestion', 'Synthetic data generation and sanity checks', 'Preliminary performance metrics', 'Risk-mitigation simulation experiments'],
      practicalDeliverable: 'Executable Python Proof-of-Concept notebook demonstrating preliminary validation.'
    },
    {
      id: 'csd415-m9',
      title: 'Feasibility Study and Phase I Report',
      hours: 10,
      phase: 'Phase I (CSD415)',
      courseOutcomeTargets: ['CO3', 'CO6'],
      description: 'Conducting comprehensive TELOS feasibility analysis (Technical, Economic, Legal, Operational, Schedule). Authoring, compiling, and binding the KTU Project Phase I Technical Report.',
      keyTopics: ['TELOS feasibility calculation', 'Cost-benefit analysis (ROI, NPV, Payback period)', 'Plagiarism audit and ethical declaration', 'KTU Project Phase I Report format & LaTeX preparation'],
      practicalDeliverable: 'Final Bound Project Phase I Report with certificate, declaration, and Plagiarism report.'
    }
  ]
};

export const CSD416_SYLLABUS: SyllabusDefinition = {
  courseCode: 'CSD416',
  courseTitle: 'PROJECT PHASE II',
  semester: 'Semester 8 (S8)',
  credits: 4,
  hoursPerWeek: '0-0-12 (12 Lab Hours/Week)',
  totalMarks: 150,
  cieMarks: 70,
  eseMarks: 80,
  description: 'Project Phase II represents the pinnacle of undergraduate engineering education. Building upon Phase I design, students finalize advanced methodologies, build and deploy production-grade software/hardware prototypes, execute extensive empirical evaluations, author scholarly research papers, explore IPR/patenting, and defend their work before external university examiners.',
  courseOutcomes: [
    {
      code: 'CO1',
      statement: 'Finalize in-depth research methodologies, advanced mathematical modeling, and empirical simulations addressing Phase I limitations.',
      bloomLevel: 'K5 (Evaluate)',
      poMapping: ['PO1', 'PO2', 'PO3', 'PO4', 'PSO1']
    },
    {
      code: 'CO2',
      statement: 'Implement fully functional, scalable, modular, and secure software/hardware systems adhering to professional engineering best practices.',
      bloomLevel: 'K6 (Create)',
      poMapping: ['PO3', 'PO4', 'PO5', 'PO6', 'PSO1', 'PSO2']
    },
    {
      code: 'CO3',
      statement: 'Formulate comprehensive verification and validation suites, conducting performance evaluation, ablation studies, and comparative benchmarking.',
      bloomLevel: 'K5 (Evaluate)',
      poMapping: ['PO2', 'PO4', 'PO5', 'PSO1']
    },
    {
      code: 'CO4',
      statement: 'Critically analyze experimental findings, draw scientific conclusions, delineate technical limitations, and chart actionable future research directions.',
      bloomLevel: 'K5 (Evaluate)',
      poMapping: ['PO2', 'PO4', 'PO7', 'PSO1']
    },
    {
      code: 'CO5',
      statement: 'Author peer-reviewed scholarly manuscripts adhering to IEEE/Springer standards and evaluate Intellectual Property Rights (IPR) and patents.',
      bloomLevel: 'K6 (Create)',
      poMapping: ['PO8', 'PO10', 'PO12']
    },
    {
      code: 'CO6',
      statement: 'Demonstrate live production-grade systems, compile archival engineering dissertations, and defend project contributions in university viva-voce examinations.',
      bloomLevel: 'K6 (Create)',
      poMapping: ['PO8', 'PO9', 'PO10', 'PO12']
    }
  ],
  evaluationScheme: [
    {
      component: 'Guide / Supervisor Continuous Assessment',
      evaluator: 'Project Guide',
      marks: 30,
      weightagePercent: 20,
      description: 'Continuous assessment throughout Semester 8 based on progress against work plan, technical competence, laboratory presence, and thesis drafting.',
      criteria: [
        'Regularity, progress in weekly diaries, and diligence (10 Marks)',
        'Implementation rigor, problem-solving, and code quality (10 Marks)',
        'Participation in research paper writing and thesis drafting (10 Marks)'
      ]
    },
    {
      component: 'Internal Project Committee - Interim Reviews (Reviews 1 & 2)',
      evaluator: 'Project Evaluation Committee',
      marks: 40,
      weightagePercent: 26.67,
      description: 'Interim Review 1 (20 Marks at Week 6: System Implementation & 50% feature completion) and Interim Review 2 (20 Marks at Week 12: Full integration, testing, results & paper draft).',
      criteria: [
        'Interim Review 1: Architecture implementation, backend/frontend progress (20 Marks)',
        'Interim Review 2: Full functional integration, testing, results, and research paper draft (20 Marks)'
      ]
    },
    {
      component: 'End Semester Examination: External Viva-Voce & Demonstration',
      evaluator: 'External Examiner (40 Marks) + Internal Examiner (40 Marks)',
      marks: 80,
      weightagePercent: 53.33,
      description: 'University final viva-voce examination and live project demonstration conducted jointly by appointed External and Internal Examiners.',
      criteria: [
        'Live system demonstration and functional completeness (25 Marks)',
        'Project Final Report / Thesis quality, rigor, and depth (20 Marks)',
        'Viva-voce defense, domain knowledge, and questions response (25 Marks)',
        'Research publication / IPR submission evidence (10 Marks)'
      ]
    }
  ],
  modules: [
    {
      id: 'csd416-m1',
      title: 'In-Depth Literature and Research Study',
      hours: 16,
      phase: 'Phase II (CSD416)',
      courseOutcomeTargets: ['CO1'],
      description: 'Deep-dive review of cutting-edge research published within the last 12-18 months. Analysis of benchmark competition datasets, SOTA baselines, and architectural paradigms.',
      keyTopics: ['SOTA survey and benchmark paper analysis', 'Deconstructing baseline codebases from PapersWithCode / GitHub', 'Comparative feature matrix with competitive solutions', 'Refining research questions based on Phase I pilot findings'],
      practicalDeliverable: 'State-of-the-Art Benchmark Comparison Dossier with baseline reproducing notes.'
    },
    {
      id: 'csd416-m2',
      title: 'Finalization of Methodology & Algorithmic Design',
      hours: 18,
      phase: 'Phase II (CSD416)',
      courseOutcomeTargets: ['CO1'],
      description: 'Formal mathematical formulation of novel algorithms, loss functions, optimization objectives, and system pipelines. Hyperparameter definitions and convergence proofs.',
      keyTopics: ['Rigorous mathematical formulation and notation', 'Custom objective functions, loss formulation, and heuristics', 'Algorithmic time and space complexity derivation (Big-O)', 'Failure mode analysis and boundary condition handling'],
      practicalDeliverable: 'Formal Algorithmic Specification Document with pseudocode and complexity analysis.'
    },
    {
      id: 'csd416-m3',
      title: 'Detailed Analysis, Modelling and Simulation',
      hours: 24,
      phase: 'Phase II (CSD416)',
      courseOutcomeTargets: ['CO1', 'CO3'],
      description: 'Executing exhaustive simulation experiments. Baseline model training, hyperparameter sweep (Optuna/GridSearch), cross-validation, and preliminary ablation runs.',
      keyTopics: ['Simulation environment setup (GPU clusters, Cloud VMs, Docker)', 'Hyperparameter optimization via Bayesian / Optuna sweeps', 'Stratified K-fold cross-validation pipelines', 'Preliminary ablation study designing'],
      practicalDeliverable: 'Comprehensive Simulation Logbook with convergence curves and parameter validation.'
    },
    {
      id: 'csd416-m4',
      title: 'System Implementation & Product Development',
      hours: 36,
      phase: 'Phase II (CSD416)',
      courseOutcomeTargets: ['CO2'],
      description: 'End-to-end full-stack engineering. Building robust microservices, database schemas, API gateways, ML inference engines, responsive frontends, and CI/CD pipelines.',
      keyTopics: ['Microservices and modular component engineering', 'Containerization with Docker and environment reproducibility', 'Database schema design and indexing (PostgreSQL / SQLite)', 'Secure API gateways, JWT authentication, and input sanitization'],
      practicalDeliverable: 'Production-ready GitHub repository with clean commits, unit tests, and Dockerfile.'
    },
    {
      id: 'csd416-m5',
      title: 'Testing, Results & Performance Evaluation',
      hours: 28,
      phase: 'Phase II (CSD416)',
      courseOutcomeTargets: ['CO3'],
      description: 'Rigorous empirical evaluation. Confusion matrices, ROC-AUC, precision-recall, F1, RMSE, inference latency, memory throughput, load testing, and ablation experiments.',
      keyTopics: ['Unit testing (pytest/Vitest), Integration tests, and End-to-End testing', 'Classification and regression error metrics quantification', 'Ablation study isolating individual module contributions', 'Benchmarking against top published literature baselines'],
      practicalDeliverable: 'Detailed Performance Evaluation Report with high-resolution comparison charts.'
    },
    {
      id: 'csd416-m6',
      title: 'Conclusions & Future Directions',
      hours: 12,
      phase: 'Phase II (CSD416)',
      courseOutcomeTargets: ['CO4'],
      description: 'Synthesizing empirical findings into actionable engineering insights. Identifying core technical limitations, edge cases, scalability bottlenecks, and defining future roadmap trajectories.',
      keyTopics: ['Synthesizing major research breakthroughs and contributions', 'Critical self-assessment of technical constraints and bottlenecks', 'Edge computing / mobile deployment roadmaps', 'Formulating next-generation research hypotheses'],
      practicalDeliverable: 'Executive Summary of Contributions & 3-Year Future Research Roadmap.'
    },
    {
      id: 'csd416-m7',
      title: 'Research Paper Preparation and Publication',
      hours: 20,
      phase: 'Phase II (CSD416)',
      courseOutcomeTargets: ['CO5'],
      description: 'Translating project work into an IEEE / Springer conference or journal publication. Drafting Abstract, Introduction, Related Work, Methodology, Experiments, Results, and References.',
      keyTopics: ['IEEE Conference LaTeX template workflow (Overleaf)', 'Drafting compelling Abstracts and Introduction hooks', 'Scientific figure generation (vector graphics, 300+ DPI)', 'Responding to peer review comments and rebuttal writing'],
      practicalDeliverable: 'Camera-ready 6-to-8 page IEEE double-column manuscript ready for submission.'
    },
    {
      id: 'csd416-m8',
      title: 'Intellectual Property Rights (IPR) & Patents',
      hours: 10,
      phase: 'Phase II (CSD416)',
      courseOutcomeTargets: ['CO5'],
      description: 'Comprehensive understanding of IPR: Patents, Copyrights, Trademarks, and Trade Secrets. Indian Patent Office filing process (Form 1, Form 2, Provisional vs Complete Specification), novelty search, and software patentability.',
      keyTopics: ['Indian Patent Act 1970 & Section 3(k) software patent guidelines', 'Provisional vs Complete patent specifications', 'Prior-art search on Google Patents & InPASS', 'Open-source software licenses (MIT, Apache 2.0, GPLv3)'],
      practicalDeliverable: 'Complete Draft Patent Specification (Form 2) or Software Copyright Application.'
    },
    {
      id: 'csd416-m9',
      title: 'Project Demonstration, Final Report & Viva Voce',
      hours: 16,
      phase: 'Phase II (CSD416)',
      courseOutcomeTargets: ['CO6'],
      description: 'Preparation for the final university viva-voce examination. Final bound engineering thesis formatting, slide deck creation, live demo rehearsals, and answering tough external examiner questions.',
      keyTopics: ['KTU B.Tech Project Thesis formatting and binding guidelines', 'Live demo staging, seed data preparation, and fallback screencasts', 'Viva-voce presentation dynamics and 20-minute defense timing', 'Handling challenging theoretical and practical examiner queries'],
      practicalDeliverable: 'Final Bound Thesis, Presentation Slide Deck, and Live Running Demo.'
    }
  ]
};

