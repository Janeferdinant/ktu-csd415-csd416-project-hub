import React, { useState } from 'react';
import { 
  Search, BookOpen, ExternalLink, Copy, Check, Filter, 
  Sparkles, Award, FileText, ChevronDown, ChevronUp, Layers, HelpCircle
} from 'lucide-react';
import { VERIFIED_PAPERS, LiteraturePaper } from '../../data/literatureData';

export const LiteratureLab: React.FC = () => {
  const [selectedDomain, setSelectedDomain] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [expandedPaperId, setExpandedPaperId] = useState<string | null>('paper-01');
  const [copiedFormat, setCopiedFormat] = useState<{ id: string; format: string } | null>(null);

  // Boolean Query Builder State
  const [builderDomain, setBuilderDomain] = useState('edge diagnostic vision');
  const [builderMethod, setBuilderMethod] = useState('quantized convolution OR transformer');
  const [builderConstraint, setBuilderConstraint] = useState('low latency OR raspberry pi');
  const [builderYear, setBuilderYear] = useState('2022..2026');

  // Novelty Calculator State
  const [noveltyScores, setNoveltyScores] = useState({
    algorithmic: 8,
    dataset: 9,
    feasibility: 8,
    impact: 9,
    gapClarity: 8
  });

  const domains = ['All', 'Healthcare AI', 'Cyber-Physical Security', 'Autonomous Driving', 'NLP & Speech', 'Renewable Energy & IoT'];

  const filteredPapers = VERIFIED_PAPERS.filter(p => {
    const matchesDomain = selectedDomain === 'All' || p.domain === selectedDomain;
    const matchesSearch = p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          p.authors.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          p.algorithms.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          p.researchGap.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesDomain && matchesSearch;
  });

  const generatedBooleanQuery = `("${builderDomain}") AND (${builderMethod}) AND (${builderConstraint}) AND year:${builderYear}`;
  const encodedScholarUrl = `https://scholar.google.com/scholar?q=${encodeURIComponent(generatedBooleanQuery)}`;

  const handleCopyCitation = (paper: LiteraturePaper, format: 'bibtex' | 'ieee' | 'apa') => {
    let textToCopy = paper.bibtex;
    if (format === 'ieee') textToCopy = paper.ieeeCitation;
    if (format === 'apa') textToCopy = paper.apaCitation;

    navigator.clipboard.writeText(textToCopy);
    setCopiedFormat({ id: paper.id, format });
    setTimeout(() => setCopiedFormat(null), 2500);
  };

  const calculateCompositeNovelty = () => {
    const total = (
      noveltyScores.algorithmic * 0.25 +
      noveltyScores.dataset * 0.20 +
      noveltyScores.feasibility * 0.20 +
      noveltyScores.impact * 0.20 +
      noveltyScores.gapClarity * 0.15
    ) * 10;
    return Math.round(total * 10) / 10;
  };

  const compositeScore = calculateCompositeNovelty();

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Section Header */}
      <div className="border-b border-navy-700/60 pb-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-gold-400 text-sm font-semibold tracking-wide uppercase">
              <BookOpen className="w-4 h-4" />
              <span>KTU CSD415 Module 1 Laboratory</span>
            </div>
            <h2 className="text-3xl font-heading font-bold text-white mt-1">
              Research & Literature Survey Laboratory
            </h2>
            <p className="text-slate-400 text-sm mt-1 max-w-3xl">
              Conduct systematic literature surveys, deconstruct peer-reviewed publications from IEEE, ACM, and Springer, identify falsifiable research gaps, and generate verified citations.
            </p>
          </div>

          <div className="flex items-center gap-2 bg-navy-900/80 border border-gold-500/30 px-4 py-2 rounded-xl">
            <Sparkles className="w-4 h-4 text-gold-400" />
            <span className="text-xs text-slate-300 font-medium">
              Verified Citations: <strong className="text-gold-300">{VERIFIED_PAPERS.length} Peer-Reviewed Articles</strong>
            </span>
          </div>
        </div>
      </div>

      {/* Part 1: Interactive Boolean Search Engine */}
      <div className="glass-panel p-6 rounded-2xl border border-navy-700/80 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-72 h-72 bg-gold-500/5 rounded-full blur-3xl -z-10" />
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-navy-800 border border-gold-500/30 flex items-center justify-center text-gold-400">
              <Search className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-heading font-semibold text-white">Google Scholar & IEEE Boolean Query Builder</h3>
              <p className="text-xs text-slate-400">Construct high-precision Boolean strings using field operators for PRISMA discovery.</p>
            </div>
          </div>
          <span className="text-xs bg-navy-800 text-gold-300 px-3 py-1 rounded-full border border-navy-700">
            PRISMA Phase: Identification
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-4">
          <div>
            <label className="text-xs text-slate-400 font-medium block mb-1">Domain Focus ("...")</label>
            <input 
              type="text" 
              value={builderDomain}
              onChange={(e) => setBuilderDomain(e.target.value)}
              className="w-full bg-navy-950/80 border border-navy-700 rounded-lg px-3 py-2 text-sm text-slate-200 focus:outline-none focus:border-gold-400"
            />
          </div>
          <div>
            <label className="text-xs text-slate-400 font-medium block mb-1">Methodology / Algorithm</label>
            <input 
              type="text" 
              value={builderMethod}
              onChange={(e) => setBuilderMethod(e.target.value)}
              className="w-full bg-navy-950/80 border border-navy-700 rounded-lg px-3 py-2 text-sm text-slate-200 focus:outline-none focus:border-gold-400"
            />
          </div>
          <div>
            <label className="text-xs text-slate-400 font-medium block mb-1">Hardware / Constraint</label>
            <input 
              type="text" 
              value={builderConstraint}
              onChange={(e) => setBuilderConstraint(e.target.value)}
              className="w-full bg-navy-950/80 border border-navy-700 rounded-lg px-3 py-2 text-sm text-slate-200 focus:outline-none focus:border-gold-400"
            />
          </div>
          <div>
            <label className="text-xs text-slate-400 font-medium block mb-1">Publication Window</label>
            <input 
              type="text" 
              value={builderYear}
              onChange={(e) => setBuilderYear(e.target.value)}
              className="w-full bg-navy-950/80 border border-navy-700 rounded-lg px-3 py-2 text-sm text-slate-200 focus:outline-none focus:border-gold-400"
            />
          </div>
        </div>

        {/* Live Generated Query Box */}
        <div className="mt-4 bg-navy-950/90 border border-navy-800 p-4 rounded-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
          <div className="font-mono text-xs text-emerald-400 overflow-x-auto max-w-full">
            <span className="text-slate-500 mr-2">QUERY:</span>
            {generatedBooleanQuery}
          </div>
          <div className="flex items-center gap-2 self-end md:self-auto shrink-0">
            <button
              onClick={() => {
                navigator.clipboard.writeText(generatedBooleanQuery);
                alert("Boolean query copied to clipboard!");
              }}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-navy-800 hover:bg-navy-700 text-xs text-slate-300 transition-colors"
            >
              <Copy className="w-3.5 h-3.5" />
              <span>Copy Query</span>
            </button>
            <a
              href={encodedScholarUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-gradient-to-r from-gold-500 to-gold-600 hover:from-gold-400 hover:to-gold-500 text-navy-950 font-semibold text-xs shadow-md transition-all"
            >
              <span>Launch Scholar</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </div>

      {/* Part 2: Live Literature Comparison Table */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h3 className="text-xl font-heading font-bold text-white flex items-center gap-2">
              <span>Literature Comparison & Research Gap Matrix</span>
              <span className="text-xs bg-navy-800 text-gold-300 font-mono px-2.5 py-0.5 rounded-full border border-navy-700">
                {filteredPapers.length} Papers
              </span>
            </h3>
            <p className="text-xs text-slate-400">
              Mandatory table format for Section 2 of KTU Phase I Project Report.
            </p>
          </div>

          {/* Search Input */}
          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input 
              type="text"
              placeholder="Search author, algorithm, gap..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-navy-900 border border-navy-700 pl-9 pr-4 py-2 rounded-xl text-xs text-slate-200 focus:outline-none focus:border-gold-400"
            />
          </div>
        </div>

        {/* Domain Filter Badges */}
        <div className="flex flex-wrap gap-2">
          {domains.map(d => (
            <button
              key={d}
              onClick={() => setSelectedDomain(d)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                selectedDomain === d
                  ? 'bg-gold-500 text-navy-950 font-semibold shadow-sm'
                  : 'bg-navy-900/90 text-slate-300 hover:bg-navy-800 border border-navy-800'
              }`}
            >
              {d}
            </button>
          ))}
        </div>

        {/* The Literature Table Cards */}
        <div className="space-y-3">
          {filteredPapers.map(paper => {
            const isExpanded = expandedPaperId === paper.id;
            return (
              <div 
                key={paper.id}
                className="glass-card rounded-xl border border-navy-700/60 overflow-hidden transition-all duration-200"
              >
                {/* Header Row */}
                <div 
                  onClick={() => setExpandedPaperId(isExpanded ? null : paper.id)}
                  className="p-4 cursor-pointer hover:bg-navy-800/40 flex items-start justify-between gap-4 select-none"
                >
                  <div className="space-y-1.5 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-xs bg-burgundy-900/60 text-burgundy-200 px-2 py-0.5 rounded border border-burgundy-700/50 font-mono">
                        {paper.year}
                      </span>
                      <span className="text-xs bg-navy-800 text-gold-300 px-2 py-0.5 rounded border border-navy-700">
                        {paper.domain}
                      </span>
                      <span className="text-xs text-slate-400 font-medium">
                        {paper.venue}
                      </span>
                    </div>

                    <h4 className="text-base font-heading font-semibold text-white group-hover:text-gold-300 transition-colors">
                      {paper.title}
                    </h4>

                    <p className="text-xs text-slate-400">
                      <strong>Authors:</strong> {paper.authors} | <span className="text-gold-400 font-mono">Citations: {paper.citationsCount}</span> | DOI: {paper.doi}
                    </p>
                  </div>

                  <div className="flex items-center gap-3 shrink-0">
                    <span className="text-xs text-slate-400 hidden sm:inline">
                      {isExpanded ? 'Hide Details' : 'View Gap & Citations'}
                    </span>
                    <button className="p-1 rounded-lg bg-navy-800 text-slate-400">
                      {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                {/* Expanded Detailed Matrix Drawer */}
                {isExpanded && (
                  <div className="border-t border-navy-800 bg-navy-950/70 p-5 space-y-4 text-xs animate-fadeIn">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                      <div className="bg-navy-900/80 p-3 rounded-lg border border-navy-800">
                        <strong className="text-gold-400 block mb-1">Methodology</strong>
                        <p className="text-slate-300">{paper.methodology}</p>
                      </div>
                      <div className="bg-navy-900/80 p-3 rounded-lg border border-navy-800">
                        <strong className="text-gold-400 block mb-1">Benchmark Dataset</strong>
                        <p className="text-slate-300">{paper.dataset}</p>
                      </div>
                      <div className="bg-navy-900/80 p-3 rounded-lg border border-navy-800">
                        <strong className="text-gold-400 block mb-1">Algorithms</strong>
                        <p className="text-slate-300">{paper.algorithms}</p>
                      </div>
                      <div className="bg-navy-900/80 p-3 rounded-lg border border-navy-800">
                        <strong className="text-emerald-400 block mb-1">Quantitative Results</strong>
                        <p className="text-slate-300">{paper.results}</p>
                      </div>
                    </div>

                    {/* Critical Limitations and Research Gap */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="bg-rose-950/20 border border-rose-900/50 p-3 rounded-lg">
                        <span className="text-rose-400 font-semibold block mb-1">Reported Research Limitations:</span>
                        <p className="text-slate-300">{paper.limitations}</p>
                      </div>
                      <div className="bg-amber-950/20 border border-amber-900/50 p-3 rounded-lg">
                        <span className="text-amber-300 font-semibold block mb-1">Identified Research Gap (Our Opportunity):</span>
                        <p className="text-slate-300">{paper.researchGap}</p>
                      </div>
                    </div>

                    {/* Citation Exporter */}
                    <div className="pt-2 border-t border-navy-800 flex flex-wrap items-center justify-between gap-3">
                      <span className="text-slate-400 font-medium">Export Verified Citation:</span>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleCopyCitation(paper, 'bibtex')}
                          className="flex items-center gap-1 px-3 py-1 bg-navy-800 hover:bg-navy-700 text-slate-200 rounded text-xs transition-colors"
                        >
                          {copiedFormat?.id === paper.id && copiedFormat.format === 'bibtex' ? (
                            <Check className="w-3.5 h-3.5 text-emerald-400" />
                          ) : (
                            <Copy className="w-3.5 h-3.5" />
                          )}
                          <span>Copy BibTeX</span>
                        </button>
                        <button
                          onClick={() => handleCopyCitation(paper, 'ieee')}
                          className="flex items-center gap-1 px-3 py-1 bg-navy-800 hover:bg-navy-700 text-slate-200 rounded text-xs transition-colors"
                        >
                          {copiedFormat?.id === paper.id && copiedFormat.format === 'ieee' ? (
                            <Check className="w-3.5 h-3.5 text-emerald-400" />
                          ) : (
                            <Copy className="w-3.5 h-3.5" />
                          )}
                          <span>Copy IEEE</span>
                        </button>
                        <button
                          onClick={() => handleCopyCitation(paper, 'apa')}
                          className="flex items-center gap-1 px-3 py-1 bg-navy-800 hover:bg-navy-700 text-slate-200 rounded text-xs transition-colors"
                        >
                          {copiedFormat?.id === paper.id && copiedFormat.format === 'apa' ? (
                            <Check className="w-3.5 h-3.5 text-emerald-400" />
                          ) : (
                            <Copy className="w-3.5 h-3.5" />
                          )}
                          <span>Copy APA</span>
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Part 3: Interactive Research Novelty Assessment Calculator */}
      <div className="glass-panel p-6 rounded-2xl border border-gold-500/20 bg-gradient-to-br from-navy-900/90 via-navy-950 to-burgundy-950/30">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-9 h-9 rounded-lg bg-gold-500/20 border border-gold-500/40 flex items-center justify-center text-gold-400">
            <Award className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg font-heading font-semibold text-white">Project Research Novelty Assessment Calculator</h3>
            <p className="text-xs text-slate-400">Simulate how the KTU Project Evaluation Committee scores the originality of your proposed capstone topic.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 mt-6">
          {/* Slider 1: Algorithmic Novelty */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs">
              <span className="text-slate-300 font-medium">Algorithmic Innovation</span>
              <span className="text-gold-400 font-bold">{noveltyScores.algorithmic}/10</span>
            </div>
            <input 
              type="range" min="1" max="10"
              value={noveltyScores.algorithmic}
              onChange={(e) => setNoveltyScores({...noveltyScores, algorithmic: Number(e.target.value)})}
              className="w-full accent-gold-400 cursor-pointer"
            />
            <p className="text-[11px] text-slate-500">Novel mathematical formulation or architecture beyond tutorial code.</p>
          </div>

          {/* Slider 2: Dataset Authenticity */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs">
              <span className="text-slate-300 font-medium">Dataset Authenticity</span>
              <span className="text-gold-400 font-bold">{noveltyScores.dataset}/10</span>
            </div>
            <input 
              type="range" min="1" max="10"
              value={noveltyScores.dataset}
              onChange={(e) => setNoveltyScores({...noveltyScores, dataset: Number(e.target.value)})}
              className="w-full accent-gold-400 cursor-pointer"
            />
            <p className="text-[11px] text-slate-500">Standard benchmark (Kaggle/UCI) or collected real-world sensor telemetry.</p>
          </div>

          {/* Slider 3: Technical Feasibility */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs">
              <span className="text-slate-300 font-medium">Technical Feasibility</span>
              <span className="text-gold-400 font-bold">{noveltyScores.feasibility}/10</span>
            </div>
            <input 
              type="range" min="1" max="10"
              value={noveltyScores.feasibility}
              onChange={(e) => setNoveltyScores({...noveltyScores, feasibility: Number(e.target.value)})}
              className="w-full accent-gold-400 cursor-pointer"
            />
            <p className="text-[11px] text-slate-500">Executable within 6 months using college labs and free cloud tiers.</p>
          </div>

          {/* Slider 4: Societal / Industrial Impact */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs">
              <span className="text-slate-300 font-medium">Industrial Impact</span>
              <span className="text-gold-400 font-bold">{noveltyScores.impact}/10</span>
            </div>
            <input 
              type="range" min="1" max="10"
              value={noveltyScores.impact}
              onChange={(e) => setNoveltyScores({...noveltyScores, impact: Number(e.target.value)})}
              className="w-full accent-gold-400 cursor-pointer"
            />
            <p className="text-[11px] text-slate-500">Measurable efficiency, safety, healthcare, or financial benefit.</p>
          </div>

          {/* Slider 5: Gap Precision */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs">
              <span className="text-slate-300 font-medium">Research Gap Clarity</span>
              <span className="text-gold-400 font-bold">{noveltyScores.gapClarity}/10</span>
            </div>
            <input 
              type="range" min="1" max="10"
              value={noveltyScores.gapClarity}
              onChange={(e) => setNoveltyScores({...noveltyScores, gapClarity: Number(e.target.value)})}
              className="w-full accent-gold-400 cursor-pointer"
            />
            <p className="text-[11px] text-slate-500">Explicit bottleneck identified from post-2022 IEEE/ACM literature.</p>
          </div>
        </div>

        {/* Novelty Score Summary Output */}
        <div className="mt-6 pt-5 border-t border-navy-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="text-3xl font-heading font-extrabold text-gold-400">
              {compositeScore} <span className="text-sm font-normal text-slate-400">/ 100</span>
            </div>
            <div>
              <div className="text-sm font-semibold text-white">
                {compositeScore >= 85 ? 'High Publication Potential (IEEE/Springer Ready)' :
                 compositeScore >= 70 ? 'Meets KTU Capstone Standards (Solid B.Tech Project)' :
                 'Needs Scope Revision (Too Common / Generic)'}
              </div>
              <p className="text-xs text-slate-400">
                Weighted rubric: 25% Algorithm, 20% Dataset, 20% Feasibility, 20% Impact, 15% Gap.
              </p>
            </div>
          </div>

          <div className="text-xs bg-navy-950 px-4 py-2 rounded-xl border border-navy-800 text-slate-300">
            Guidance: <strong>Aim for &gt; 75 points</strong> before presenting to the Phase I Review 1 Committee.
          </div>
        </div>
      </div>
    </div>
  );
};

