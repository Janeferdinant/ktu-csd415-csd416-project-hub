import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { Layers, RotateCcw, Sparkles, Box, Compass, Info, CheckCircle2 } from 'lucide-react';

interface LifecycleNode {
  id: string;
  name: string;
  phase: 'Phase I (CSD415)' | 'Phase II (CSD416)';
  color: number;
  position: [number, number, number];
  description: string;
  deliverable: string;
  ktuWeightage: string;
}

const LIFECYCLE_NODES: LifecycleNode[] = [
  {
    id: 'node-lit',
    name: '1. Literature Survey & PRISMA',
    phase: 'Phase I (CSD415)',
    color: 0xD4AF37, // Champagne Gold
    position: [-3.2, 1.2, 0],
    description: 'Deconstruct 25+ peer-reviewed IEEE/ACM papers, identify baseline models, and extract falsifiable research gaps.',
    deliverable: 'Annotated Literature Comparison Table & PRISMA screening matrix',
    ktuWeightage: '15% of Review 1 Marks'
  },
  {
    id: 'node-problem',
    name: '2. Problem Formulation & Scope',
    phase: 'Phase I (CSD415)',
    color: 0x8A1D2E, // Burgundy
    position: [-1.8, 2.4, 1.2],
    description: 'Draft mathematical objective functions, formal input/output spaces, and strict in-scope/out-of-scope boundaries.',
    deliverable: '1-page Formal Problem Statement with Mathematical Specifications',
    ktuWeightage: '10% of Review 1 Marks'
  },
  {
    id: 'node-arch',
    name: '3. Architecture & WBS Design',
    phase: 'Phase I (CSD415)',
    color: 0x10B981, // Emerald
    position: [0.5, 2.6, 0.8],
    description: 'Design modular DFD Levels 0-2, UML component diagrams, Critical Path schedules, and TELOS feasibility.',
    deliverable: 'Software Design Description (SDD) & CPM Schedule Chart',
    ktuWeightage: '25% of Review 2 Marks'
  },
  {
    id: 'node-data',
    name: '4. Dataset Pipeline & Ingestion',
    phase: 'Phase II (CSD416)',
    color: 0x3B82F6, // Blue
    position: [2.6, 1.4, -0.6],
    description: 'Curate benchmark Kaggle/UCI datasets, implement KNN missing-value imputation, EDA, and feature engineering.',
    deliverable: 'Reproducible Data Preprocessing Notebook & Validated Train/Val/Test Splits',
    ktuWeightage: '20% of Interim Review 1'
  },
  {
    id: 'node-train',
    name: '5. SOTA Algorithmic Training',
    phase: 'Phase II (CSD416)',
    color: 0xA855F7, // Purple
    position: [2.8, -1.2, 0.5],
    description: 'Train deep learning / ML models, conduct Bayesian hyperparameter sweeps, and execute ablation studies.',
    deliverable: 'Trained Model Checkpoints (.pth / .onnx) with Convergence Curves',
    ktuWeightage: '20% of Interim Review 2'
  },
  {
    id: 'node-eval',
    name: '6. Testing & Metric Evaluation',
    phase: 'Phase II (CSD416)',
    color: 0x06B6D4, // Cyan
    position: [0.8, -2.4, -1.0],
    description: 'Quantify Precision, Recall, F1, MCC, and inference latency; perform statistical significance t-testing (p < 0.05).',
    deliverable: 'Comprehensive Performance Benchmark Dossier & Ablation Tables',
    ktuWeightage: '25% of Final Viva Examination'
  },
  {
    id: 'node-defense',
    name: '7. Thesis, Paper & Viva Defense',
    phase: 'Phase II (CSD416)',
    color: 0xF59E0B, // Amber Gold Core
    position: [-1.6, -1.8, 0.6],
    description: 'Publish IEEE/Springer manuscript, author complete bound thesis, and defend live demo before external examiners.',
    deliverable: 'Final Bound Thesis, Camera-Ready Research Paper & Live Demo',
    ktuWeightage: '80 Marks External Viva Voce'
  }
];

export const ThreeResearchLab: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [selectedNode, setSelectedNode] = useState<LifecycleNode>(LIFECYCLE_NODES[0]);
  const [viewMode, setViewMode] = useState<'lifecycle' | 'architecture'>('lifecycle');

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth;
    const height = 480;

    // Scene Setup
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x050814, 0.08);

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 0, 8.5);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.innerHTML = '';
    container.appendChild(renderer.domElement);

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.9);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0xD4AF37, 2.5, 20);
    pointLight.position.set(2, 4, 5);
    scene.add(pointLight);

    const secondaryLight = new THREE.PointLight(0x8A1D2E, 2, 20);
    secondaryLight.position.set(-4, -3, 3);
    scene.add(secondaryLight);

    // Starfield Particle Geometry
    const starsGeo = new THREE.BufferGeometry();
    const starCount = 350;
    const starCoords = new Float32Array(starCount * 3);
    for (let i = 0; i < starCount * 3; i++) {
      starCoords[i] = (Math.random() - 0.5) * 25;
    }
    starsGeo.setAttribute('position', new THREE.BufferAttribute(starCoords, 3));
    const starsMat = new THREE.PointsMaterial({
      color: 0xD4AF37,
      size: 0.04,
      transparent: true,
      opacity: 0.6
    });
    const starField = new THREE.Points(starsGeo, starsMat);
    scene.add(starField);

    // Main Group for Rotation
    const group = new THREE.Group();
    scene.add(group);

    // Sphere Nodes
    const nodeMeshes: THREE.Mesh[] = [];
    const sphereGeo = new THREE.SphereGeometry(0.32, 32, 32);

    LIFECYCLE_NODES.forEach(node => {
      const mat = new THREE.MeshStandardMaterial({
        color: node.color,
        roughness: 0.2,
        metalness: 0.7,
        emissive: node.color,
        emissiveIntensity: 0.2
      });
      const mesh = new THREE.Mesh(sphereGeo, mat);
      mesh.position.set(...node.position);
      mesh.userData = { id: node.id };
      group.add(mesh);
      nodeMeshes.push(mesh);

      // Connecting Orbital Rings
      const ringGeo = new THREE.RingGeometry(0.42, 0.44, 32);
      const ringMat = new THREE.MeshBasicMaterial({
        color: node.color,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.35
      });
      const ringMesh = new THREE.Mesh(ringGeo, ringMat);
      ringMesh.position.set(...node.position);
      group.add(ringMesh);
    });

    // Connecting Tube / Path Line
    const curvePoints = LIFECYCLE_NODES.map(n => new THREE.Vector3(...n.position));
    curvePoints.push(curvePoints[0]); // loop back
    const curve = new THREE.CatmullRomCurve3(curvePoints);
    const tubeGeo = new THREE.TubeGeometry(curve, 64, 0.025, 8, false);
    const tubeMat = new THREE.MeshStandardMaterial({
      color: 0xD4AF37,
      transparent: true,
      opacity: 0.4,
      roughness: 0.5
    });
    const tubeMesh = new THREE.Mesh(tubeGeo, tubeMat);
    group.add(tubeMesh);

    // Mouse Interaction
    let isDragging = false;
    let prevMousePos = { x: 0, y: 0 };

    const handleMouseDown = (e: MouseEvent) => {
      isDragging = true;
      prevMousePos = { x: e.clientX, y: e.clientY };
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      const deltaX = e.clientX - prevMousePos.x;
      const deltaY = e.clientY - prevMousePos.y;
      group.rotation.y += deltaX * 0.006;
      group.rotation.x += deltaY * 0.006;
      prevMousePos = { x: e.clientX, y: e.clientY };
    };

    const handleMouseUp = () => {
      isDragging = false;
    };

    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    const handleClick = (e: MouseEvent) => {
      const rect = renderer.domElement.getBoundingClientRect();
      mouse.x = ((e.clientX - rect.left) / width) * 2 - 1;
      mouse.y = -((e.clientY - rect.top) / height) * 2 + 1;

      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(nodeMeshes);
      if (intersects.length > 0) {
        const clickedMesh = intersects[0].object as THREE.Mesh;
        const found = LIFECYCLE_NODES.find(n => n.id === clickedMesh.userData.id);
        if (found) setSelectedNode(found);
      }
    };

    const domElement = renderer.domElement;
    domElement.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    domElement.addEventListener('click', handleClick);

    // Animation Loop
    let animationFrameId: number;
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      if (!isDragging) {
        group.rotation.y += 0.0025;
        starField.rotation.y += 0.0008;
      }

      renderer.render(scene, camera);
    };
    animate();

    const handleResize = () => {
      if (!mountRef.current) return;
      const newWidth = mountRef.current.clientWidth;
      camera.aspect = newWidth / height;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, height);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      domElement.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      domElement.removeEventListener('click', handleClick);
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
    };
  }, [viewMode]);

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header */}
      <div className="border-b border-navy-700/60 pb-5">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-gold-400 text-sm font-semibold tracking-wide uppercase">
              <Compass className="w-4 h-4" />
              <span>KTU Capstone Engineering Visualization</span>
            </div>
            <h2 className="text-3xl font-heading font-bold text-white mt-1">
              3D Interactive Research Lab & Lifecycle Navigator
            </h2>
            <p className="text-slate-400 text-sm mt-1 max-w-3xl">
              Rotate, inspect, and interact with the 7 key phases of the KTU Project Phase I & II engineering lifecycle. Click any 3D node to inspect academic deliverables and rubrics.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setViewMode(viewMode === 'lifecycle' ? 'architecture' : 'lifecycle')}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-navy-800 hover:bg-navy-700 text-xs text-slate-200 border border-navy-700 transition-colors"
            >
              <Layers className="w-4 h-4 text-gold-400" />
              <span>{viewMode === 'lifecycle' ? 'Switch to 3D Architecture Stack' : 'Switch to 3D Orbital Lifecycle'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* 3D WebGL Canvas Container */}
      <div className="relative glass-panel rounded-2xl border border-navy-700/80 overflow-hidden bg-gradient-to-b from-navy-950/90 via-navy-900 to-navy-950">
        <div ref={mountRef} className="w-full h-[480px] cursor-grab active:cursor-grabbing" />

        {/* Floating Controls Overlay */}
        <div className="absolute top-4 left-4 pointer-events-none">
          <span className="text-[11px] bg-navy-900/90 text-gold-300 font-mono px-3 py-1 rounded-full border border-navy-700 backdrop-blur-md">
            Interactive WebGL 3D Canvas • Drag to Rotate • Click Node to Inspect
          </span>
        </div>

        {/* Quick Node Selector Pills */}
        <div className="absolute bottom-4 left-4 right-4 flex gap-2 overflow-x-auto pb-1 scrollbar-none">
          {LIFECYCLE_NODES.map(node => (
            <button
              key={node.id}
              onClick={() => setSelectedNode(node)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all ${
                selectedNode.id === node.id
                  ? 'bg-gold-500 text-navy-950 font-bold shadow-sm'
                  : 'bg-navy-900/90 text-slate-300 hover:bg-navy-800 border border-navy-800 backdrop-blur-md'
              }`}
            >
              {node.name.split('.')[1]?.trim() || node.name}
            </button>
          ))}
        </div>
      </div>

      {/* Selected Node Details Card */}
      <div className="glass-card p-6 rounded-2xl border border-gold-500/30 bg-gradient-to-br from-navy-900/90 to-navy-950 space-y-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-navy-800 pb-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs bg-burgundy-900/80 text-burgundy-200 px-2.5 py-0.5 rounded font-mono border border-burgundy-700/60">
                {selectedNode.phase}
              </span>
              <span className="text-xs text-gold-400 font-mono font-semibold">
                Weightage: {selectedNode.ktuWeightage}
              </span>
            </div>
            <h3 className="text-xl font-heading font-bold text-white mt-1">
              {selectedNode.name}
            </h3>
          </div>

          <div className="flex items-center gap-2 text-xs text-slate-400 bg-navy-950 px-3 py-1.5 rounded-lg border border-navy-800">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>Official KTU Curriculum Milestone</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div className="bg-navy-950/70 p-4 rounded-xl border border-navy-800 space-y-1">
            <span className="text-slate-400 font-semibold block uppercase tracking-wider text-[10px]">
              Phase Engineering Objective:
            </span>
            <p className="text-slate-200 leading-relaxed">{selectedNode.description}</p>
          </div>

          <div className="bg-navy-950/70 p-4 rounded-xl border border-gold-500/20 space-y-1">
            <span className="text-gold-400 font-semibold block uppercase tracking-wider text-[10px]">
              Mandatory Deliverable Submitted to Committee:
            </span>
            <p className="text-slate-200 leading-relaxed font-mono">{selectedNode.deliverable}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

