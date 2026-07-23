import React, { useState, useEffect } from 'react';
import { FileText, Cpu, Compass, User, GraduationCap, Briefcase, Plus, Play, CheckCircle, HelpCircle, Star, Terminal, AlertCircle, Award } from 'lucide-react';

export default function Mentorship({ subSection, setSubSection, addToast }) {
  const [activeTab, setActiveTab] = useState('resume');

  // Resume builder states
  const [resName, setResName] = useState('Karthik Raja');
  const [resTitle, setResTitle] = useState('Frontend Engineer');
  const [resEmail, setResEmail] = useState('karthik.raja@example.com');
  const [resPhone, setResPhone] = useState('+91 98401 23456');
  const [resLocation, setResLocation] = useState('Adyar, Chennai');
  const [resEducation, setResEducation] = useState('B.E. in Computer Science - Anna University, Chennai (2024)');
  const [resSkills, setResSkills] = useState('React, JavaScript, Tailwind CSS, TypeScript, Node.js, Git');
  const [resExperience, setResExperience] = useState('Frontend Intern at Zoho Corporation (2025): Developed modular dashboard grids, optimized canvas load times, and collaborated on Git branches.');
  const [resProjects, setResProjects] = useState('Portfolio Site: Built with React and tailwind. Job Portal Extension: Added live interactive testing sandboxes.');

  // Code editor challenge states
  const [activeChallenge, setActiveChallenge] = useState('reverse'); // 'reverse' | 'sum'
  const [userCode, setUserCode] = useState(`function reverseString(str) {\n  // Write your code here\n  return str.split('').reverse().join('');\n}`);

  useEffect(() => {
    if (activeChallenge === 'reverse') {
      setUserCode(`function reverseString(str) {\n  // Write your code here\n  return str.split('').reverse().join('');\n}`);
    } else {
      setUserCode(`function sumOfTwo(a, b) {\n  // Write your code here\n  return a + b;\n}`);
    }
  }, [activeChallenge]);

  useEffect(() => {
    if (subSection) {
      if (subSection === 'interview') {
        setActiveTab('interview');
      } else if (subSection === 'resources') {
        setActiveTab('resources');
      } else {
        setActiveTab('resume');
      }
    }
  }, [subSection]);

  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
    if (setSubSection) {
      setSubSection(tabId);
    }
  };

  // Calculate ATS Score dynamically
  const calculateAtsScore = () => {
    let score = 10;
    if (resName.length > 5) score += 15;
    if (resTitle.length > 5) score += 15;
    if (resSkills.split(',').length >= 3) score += 20;
    if (resEducation.length > 15) score += 15;
    if (resExperience.length > 25) score += 15;
    if (resProjects.length > 20) score += 10;
    return Math.min(score, 100);
  };

  const handleDownloadPdf = () => {
    // Inject custom print styles or open a print-friendly page layout
    const printWindow = window.open('', '_blank');
    printWindow.document.write(`
      <html>
        <head>
          <title>${resName} - Resume</title>
          <style>
            body { font-family: 'Helvetica Neue', Arial, sans-serif; padding: 40px; color: #1e293b; line-height: 1.5; font-size: 14px; }
            h1 { font-size: 28px; margin-bottom: 5px; color: #0f172a; text-transform: uppercase; letter-spacing: 0.5px; }
            .subtitle { font-size: 16px; font-weight: bold; color: #4f46e5; margin-bottom: 20px; }
            .contact { font-size: 12px; color: #64748b; margin-bottom: 30px; border-bottom: 1px solid #cbd5e1; padding-bottom: 10px; }
            .section-title { font-size: 14px; font-weight: bold; text-transform: uppercase; color: #0f172a; border-bottom: 2px solid #0f172a; margin-top: 25px; padding-bottom: 3px; letter-spacing: 1px; }
            .content { margin-top: 10px; font-size: 13px; color: #334155; }
            .skills { font-weight: bold; color: #1e293b; }
          </style>
        </head>
        <body>
          <h1>${resName}</h1>
          <div class="subtitle">${resTitle}</div>
          <div class="contact">
            Email: ${resEmail} | Phone: ${resPhone} | Location: ${resLocation}
          </div>
          
          <div class="section-title">Education</div>
          <div class="content">${resEducation}</div>

          <div class="section-title">Core Skills</div>
          <div class="content skills">${resSkills}</div>

          <div class="section-title">Professional Experience</div>
          <div class="content" style="white-space: pre-wrap;">${resExperience}</div>

          <div class="section-title">Academic & Personal Projects</div>
          <div class="content" style="white-space: pre-wrap;">${resProjects}</div>

          <script>
            window.onload = function() {
              window.print();
              window.close();
            }
          </script>
        </body>
      </html>
    `);
    printWindow.document.close();
    addToast('Opening print preview dialog...', 'success');
  };

  // Run Code Sandbox tests
  const handleRunCodeTests = () => {
    try {
      // Evaluate Javascript function code safely
      const cleanCode = userCode.trim();
      const fn = new Function('return ' + cleanCode)();
      
      if (activeChallenge === 'reverse') {
        const test1 = fn('hello');
        const test2 = fn('JobPortal');
        if (test1 === 'olleh' && test2 === 'latroPboJ') {
          addToast('All test cases passed! Great job string reversing.', 'success');
        } else {
          addToast(`Test failed. Expected 'olleh', received '${test1}'.`, 'error');
        }
      } else {
        const test1 = fn(5, 10);
        const test2 = fn(-3, 8);
        if (test1 === 15 && test2 === 5) {
          addToast('All test cases passed! Math logic verified.', 'success');
        } else {
          addToast(`Test failed. Expected 15, received ${test1}.`, 'error');
        }
      }
    } catch (err) {
      addToast(`Evaluation Error: ${err.message}`, 'error');
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8 space-y-12 animate-fade-in text-left">
      
      {/* Title */}
      <section className="text-center space-y-4 max-w-2xl mx-auto">
        <h1 className="text-3xl sm:text-5xl font-extrabold font-outfit text-slate-900 tracking-tight">
          Mentorship & Prep Workspace
        </h1>
        <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-medium">
          Build professional ATS-optimized resumes in real-time, solve algorithmic challenges in our playground, and review career roadmaps.
        </p>
      </section>

      {/* Tabs Switcher */}
      <div className="flex border-b border-slate-200 gap-6 justify-center">
        {[
          { id: 'resume', label: 'ATS Resume Builder', icon: <FileText className="w-4 h-4" /> },
          { id: 'interview', label: 'Interview Playground', icon: <Cpu className="w-4 h-4" /> },
          { id: 'resources', label: 'Career Roadmaps & Resources', icon: <Compass className="w-4 h-4" /> }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => handleTabChange(tab.id)}
            className={`flex items-center gap-2 pb-3 text-sm font-semibold border-b-2 transition-all cursor-pointer ${
              activeTab === tab.id
                ? 'border-violet-600 text-violet-600'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            {tab.icon}
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* VIEW: RESUME BUILDER */}
      {activeTab === 'resume' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          
          {/* Builder Form Inputs */}
          <div className="p-6 rounded-3xl border border-slate-200 bg-white shadow-sm space-y-6">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <h3 className="text-base font-bold text-slate-900">Document Editor</h3>
              {/* Score visualizer */}
              <div className="flex items-center gap-2">
                <span className="text-[10px] text-slate-450 uppercase font-bold tracking-wider">ATS Score</span>
                <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${
                  calculateAtsScore() >= 80 ? 'bg-emerald-500/10 text-emerald-600' : 'bg-amber-500/10 text-amber-600'
                }`}>
                  {calculateAtsScore()}%
                </span>
              </div>
            </div>

            <div className="space-y-4">
              {/* Personal info */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[9px] font-bold uppercase tracking-wider text-slate-400">Full Name</label>
                  <input
                    type="text"
                    value={resName}
                    onChange={(e) => setResName(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs bg-slate-50 text-slate-900"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[9px] font-bold uppercase tracking-wider text-slate-400">Professional Title</label>
                  <input
                    type="text"
                    value={resTitle}
                    onChange={(e) => setResTitle(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs bg-slate-50 text-slate-900"
                  />
                </div>
              </div>

              {/* Contact info */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="space-y-1">
                  <label className="text-[9px] font-bold uppercase tracking-wider text-slate-400">Email</label>
                  <input
                    type="email"
                    value={resEmail}
                    onChange={(e) => setResEmail(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs bg-slate-50 text-slate-900"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[9px] font-bold uppercase tracking-wider text-slate-400">Phone</label>
                  <input
                    type="text"
                    value={resPhone}
                    onChange={(e) => setResPhone(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs bg-slate-50 text-slate-900"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[9px] font-bold uppercase tracking-wider text-slate-400">Location</label>
                  <input
                    type="text"
                    value={resLocation}
                    onChange={(e) => setResLocation(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs bg-slate-50 text-slate-900"
                  />
                </div>
              </div>

              {/* Education */}
              <div className="space-y-1">
                <label className="text-[9px] font-bold uppercase tracking-wider text-slate-400">Education Details</label>
                <input
                  type="text"
                  value={resEducation}
                  onChange={(e) => setResEducation(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs bg-slate-50 text-slate-900"
                />
              </div>

              {/* Skills */}
              <div className="space-y-1">
                <label className="text-[9px] font-bold uppercase tracking-wider text-slate-400">Skills (Comma-separated)</label>
                <input
                  type="text"
                  value={resSkills}
                  onChange={(e) => setResSkills(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs bg-slate-50 text-slate-900"
                />
              </div>

              {/* Experience */}
              <div className="space-y-1">
                <label className="text-[9px] font-bold uppercase tracking-wider text-slate-400">Professional Experience</label>
                <textarea
                  rows={4}
                  value={resExperience}
                  onChange={(e) => setResExperience(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs bg-slate-50 text-slate-900 resize-none"
                />
              </div>

              {/* Projects */}
              <div className="space-y-1">
                <label className="text-[9px] font-bold uppercase tracking-wider text-slate-400">Projects Details</label>
                <textarea
                  rows={3}
                  value={resProjects}
                  onChange={(e) => setResProjects(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs bg-slate-50 text-slate-900 resize-none"
                />
              </div>
            </div>
          </div>

          {/* Builder Live Preview */}
          <div className="space-y-6">
            <div className="p-8 rounded-3xl border border-slate-200 bg-white shadow-md space-y-6 relative overflow-hidden min-h-[500px]">
              {/* Preview header */}
              <div className="border-b-2 border-slate-900 pb-3">
                <h2 className="text-2xl font-bold uppercase tracking-tight text-slate-900">{resName || 'Your Name'}</h2>
                <div className="text-xs font-bold text-violet-600 uppercase tracking-wider mt-1">{resTitle || 'Your Title'}</div>
                <div className="text-[10px] text-slate-500 font-semibold mt-1 flex flex-wrap gap-2">
                  <span>{resEmail}</span>
                  <span>|</span>
                  <span>{resPhone}</span>
                  <span>|</span>
                  <span>{resLocation}</span>
                </div>
              </div>

              {/* Education section */}
              <div className="space-y-2">
                <h4 className="text-[10px] font-bold uppercase tracking-wider text-slate-900 border-b border-slate-200 pb-0.5">Education</h4>
                <p className="text-xs text-slate-700 leading-relaxed font-semibold">{resEducation}</p>
              </div>

              {/* Skills section */}
              <div className="space-y-2">
                <h4 className="text-[10px] font-bold uppercase tracking-wider text-slate-900 border-b border-slate-200 pb-0.5">Core Skills</h4>
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {resSkills.split(',').map((skill, idx) => (
                    <span key={idx} className="text-[10px] font-bold text-slate-800 bg-slate-100 border border-slate-200 px-2 py-0.5 rounded-md">
                      {skill.trim()}
                    </span>
                  ))}
                </div>
              </div>

              {/* Experience section */}
              <div className="space-y-2">
                <h4 className="text-[10px] font-bold uppercase tracking-wider text-slate-900 border-b border-slate-200 pb-0.5">Experience</h4>
                <p className="text-xs text-slate-650 leading-relaxed whitespace-pre-wrap">{resExperience}</p>
              </div>

              {/* Projects section */}
              <div className="space-y-2">
                <h4 className="text-[10px] font-bold uppercase tracking-wider text-slate-900 border-b border-slate-200 pb-0.5">Academic & Personal Projects</h4>
                <p className="text-xs text-slate-650 leading-relaxed whitespace-pre-wrap">{resProjects}</p>
              </div>
            </div>

            <button
              onClick={handleDownloadPdf}
              className="w-full py-3.5 bg-violet-600 hover:bg-violet-500 text-white rounded-2xl text-xs font-bold shadow-md cursor-pointer transition-colors flex items-center justify-center gap-2"
            >
              <FileText className="w-4 h-4" />
              <span>Download & Print ATS Resume</span>
            </button>
          </div>

        </div>
      )}

      {/* VIEW: INTERVIEW PLAYGROUND */}
      {activeTab === 'interview' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          
          {/* Interview Questions Cards */}
          <div className="lg:col-span-1 space-y-6">
            <div className="p-6 rounded-2xl border border-slate-200 bg-white shadow-sm space-y-4">
              <h3 className="text-sm font-bold text-slate-950 uppercase tracking-wider font-outfit flex items-center gap-1.5">
                <HelpCircle className="w-4 h-4 text-violet-500" />
                HR Interview Preparation
              </h3>
              
              <div className="space-y-4 text-xs">
                {[
                  { q: 'Tell me about yourself?', a: 'Structure your answer using Present-Past-Future format. Talk about your current role/studies, key achievements, and why this role is your next milestone.' },
                  { q: 'What is your greatest strength?', a: 'Highlight a technical skill or collaborative quality (e.g. documentation, peer-programming) and support it with a real project case study.' }
                ].map((item, idx) => (
                  <div key={idx} className="p-3 rounded-xl border border-slate-100 bg-slate-50 space-y-1.5">
                    <span className="font-bold text-slate-900 block leading-tight">{item.q}</span>
                    <p className="text-slate-500 leading-relaxed font-medium">{item.a}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-6 rounded-2xl border border-slate-200 bg-white shadow-sm space-y-4">
              <h3 className="text-sm font-bold text-slate-950 uppercase tracking-wider font-outfit flex items-center gap-1.5">
                <Terminal className="w-4 h-4 text-emerald-500" />
                Technical Questions (JS/OOP)
              </h3>
              
              <div className="space-y-4 text-xs">
                {[
                  { q: 'What is a Closure in JavaScript?', a: 'A closure is the combination of a function bundled together with references to its surrounding state (lexical environment).' },
                  { q: 'Difference between == and ===?', a: '== checks values with coercion (type conversion) whereas === checks value and exact type without coercion.' }
                ].map((item, idx) => (
                  <div key={idx} className="p-3 rounded-xl border border-slate-100 bg-slate-50 space-y-1.5">
                    <span className="font-bold text-slate-900 block leading-tight">{item.q}</span>
                    <p className="text-slate-500 leading-relaxed font-medium">{item.a}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Interactive Code Testing Sandbox */}
          <div className="lg:col-span-2 p-8 rounded-3xl border border-slate-200 bg-white shadow-sm space-y-6">
            <div className="flex justify-between items-center border-b border-slate-100 pb-4">
              <div>
                <h3 className="text-lg font-extrabold text-slate-900 font-outfit">Coding Playground</h3>
                <span className="text-[10px] text-slate-500 font-semibold uppercase tracking-wider">Execute solutions in browser</span>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => setActiveChallenge('reverse')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all cursor-pointer ${
                    activeChallenge === 'reverse'
                      ? 'border-violet-500 bg-violet-500/5 text-violet-600'
                      : 'border-slate-200 bg-white text-slate-400 hover:text-slate-200'
                  }`}
                >
                  Reverse String
                </button>
                <button
                  onClick={() => setActiveChallenge('sum')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all cursor-pointer ${
                    activeChallenge === 'sum'
                      ? 'border-violet-500 bg-violet-500/5 text-violet-600'
                      : 'border-slate-200 bg-white text-slate-400 hover:text-slate-200'
                  }`}
                >
                  Sum of Two
                </button>
              </div>
            </div>

            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-150 text-xs text-slate-650 font-medium space-y-2">
                <span className="font-bold uppercase tracking-wider text-slate-450 block text-[9px]">Coding Challenge</span>
                <p>
                  {activeChallenge === 'reverse' 
                    ? 'Write a function "reverseString(str)" that takes a string input and returns its reverse character string.' 
                    : 'Write a function "sumOfTwo(a, b)" that returns the summation calculation of variable a and b.'}
                </p>
              </div>

              {/* Editor Console */}
              <div className="rounded-xl border border-slate-200 bg-slate-950 overflow-hidden shadow-inner">
                <div className="bg-slate-900 px-4 py-2 text-[10px] font-bold text-slate-500 flex justify-between items-center border-b border-slate-950 select-none">
                  <span>code_editor.js</span>
                  <span className="text-emerald-500 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
                    Interactive Sandbox
                  </span>
                </div>
                <textarea
                  value={userCode}
                  onChange={(e) => setUserCode(e.target.value)}
                  rows={8}
                  className="w-full px-4 py-3 bg-slate-950 font-mono text-xs text-slate-100 outline-none resize-none leading-relaxed"
                />
              </div>

              <button
                onClick={handleRunCodeTests}
                className="w-full py-3 bg-violet-600 hover:bg-violet-500 text-white rounded-xl text-xs font-bold shadow-md cursor-pointer transition-all flex items-center justify-center gap-1.5"
              >
                <Play className="w-3.5 h-3.5 fill-white" />
                <span>Run Sandbox Tests</span>
              </button>
            </div>
          </div>

        </div>
      )}

      {/* VIEW: ROADMAPS & RESOURCES */}
      {activeTab === 'resources' && (
        <div className="space-y-12">
          
          {/* Visual Step-by-Step Roadmaps */}
          <section className="p-8 rounded-3xl border border-slate-200 bg-white shadow-sm space-y-8">
            <div className="space-y-1">
              <h3 className="text-xl font-extrabold text-slate-900 font-outfit">Visual Placement Career Roadmaps</h3>
              <p className="text-xs text-slate-500 font-semibold">Structured milestone trees to master tech skill levels.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  role: 'MERN Stack Developer',
                  steps: ['HTML, CSS & CSS Frameworks', 'JavaScript Essentials & DOM API', 'React Ecosystem (Redux, Router)', 'REST APIs with Node/Express', 'MongoDB Database Indexes', 'Docker & Cloud Deployments']
                },
                {
                  role: 'Data Scientist / ML Engineer',
                  steps: ['Python Fundamentals & OOP', 'Mathematics (Linear Algebra, Calculus)', 'Pandas & Numpy Analytics', 'Scikit-Learn Regression Models', 'Neural Networks with TensorFlow', 'MLOps deployment models']
                },
                {
                  role: 'UI/UX Product Designer',
                  steps: ['Design Fundamentals & Colors', 'Figma Grid layouts & Wireframing', 'User Interview & Persona testing', 'High Fidelity Interactive Mockups', 'Component design system structures', 'Frontend developers handoffs']
                }
              ].map((road, idx) => (
                <div key={idx} className="p-6 rounded-2xl border border-slate-100 bg-slate-50 space-y-4">
                  <h4 className="font-extrabold text-sm text-slate-900 font-outfit border-b border-slate-200 pb-2">{road.role}</h4>
                  <div className="relative pl-6 border-l border-slate-200 ml-2 space-y-4 text-xs font-semibold">
                    {road.steps.map((step, sIdx) => (
                      <div key={sIdx} className="relative">
                        <div className="absolute -left-[30px] top-1.5 w-2 h-2 rounded-full bg-violet-600" />
                        <span className="text-[10px] text-slate-400 block tracking-wider">MILESTONE 0{sIdx + 1}</span>
                        <span className="text-slate-700 block leading-tight">{step}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Certification and guidance links */}
          <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="p-6 rounded-2xl border border-slate-200 bg-white shadow-sm space-y-4">
              <h3 className="text-sm font-bold text-slate-950 uppercase tracking-wider font-outfit">Official Certifications Guide</h3>
              <div className="space-y-3.5 text-xs font-medium text-slate-650">
                <div className="flex gap-2.5 items-start">
                  <Award className="w-4 h-4 text-violet-500 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-slate-900">AWS Certified Cloud Practitioner</span>
                    <p className="text-[10px] text-slate-500 mt-0.5">Highly valued by enterprise recruiters. Focuses on AWS services core schemas and billing indexes.</p>
                  </div>
                </div>
                <div className="flex gap-2.5 items-start">
                  <Award className="w-4 h-4 text-violet-500 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-slate-900">Google Cloud Associate Engineer</span>
                    <p className="text-[10px] text-slate-500 mt-0.5">Validates computing capabilities. Focuses on Kubernetes, server container architectures, and API integrations.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-6 rounded-2xl border border-slate-200 bg-white shadow-sm space-y-4">
              <h3 className="text-sm font-bold text-slate-950 uppercase tracking-wider font-outfit">Resume Writing Essentials</h3>
              <div className="space-y-3.5 text-xs text-slate-650 font-medium">
                <div className="flex gap-2.5 items-start">
                  <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                  <div>
                    <span className="text-slate-800 font-bold">Use the STAR Method for projects</span>
                    <p className="text-[10px] text-slate-500 mt-0.5">Describe the Situation, Task, Action, and quantitative Result (e.g. improved dashboard load speed by 25%).</p>
                  </div>
                </div>
                <div className="flex gap-2.5 items-start">
                  <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                  <div>
                    <span className="text-slate-800 font-bold">Remove visual complexity (Keep it ATS friendly)</span>
                    <p className="text-[10px] text-slate-500 mt-0.5">Ensure screen readers can cleanly parse tables and text without graphic interference.</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

        </div>
      )}

    </div>
  );
}
