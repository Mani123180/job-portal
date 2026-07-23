import React, { useState, useEffect } from 'react';
import { LayoutDashboard, Users, Building, Briefcase, Trash2, ShieldAlert, CheckCircle, Search, Star, MapPin, Plus, Edit, Menu, X } from 'lucide-react';
import { getCandidates, deleteCandidate, getEmployers, deleteEmployer, getJobs, deleteJob, getApplications, register, saveJob, saveEmployerProfile } from '../mockData';
import Modal from '../components/Modal';

export default function AdminDashboard({ userSession, addToast }) {
  const [activeTab, setActiveTab] = useState('overview'); // 'overview' | 'candidates' | 'employers' | 'jobs'
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [candidates, setCandidates] = useState([]);
  const [employers, setEmployers] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [applications, setApplications] = useState([]);

  // Search queries for lists
  const [candidateSearch, setCandidateSearch] = useState('');
  const [employerSearch, setEmployerSearch] = useState('');
  const [jobSearch, setJobSearch] = useState('');

  // Modals Visibility
  const [isAddEmployerOpen, setIsAddEmployerOpen] = useState(false);
  const [isEditEmployerOpen, setIsEditEmployerOpen] = useState(false);
  const [isAddJobOpen, setIsAddJobOpen] = useState(false);

  // Employer Form States (Shared for Add & Edit)
  const [editingEmployerId, setEditingEmployerId] = useState(null);
  const [empCompanyName, setEmpCompanyName] = useState('');
  const [empEmail, setEmpEmail] = useState('');
  const [empPassword, setEmpPassword] = useState('password');
  const [empLocation, setEmpLocation] = useState('');
  const [empIndustry, setEmpIndustry] = useState('');
  const [empWebsite, setEmpWebsite] = useState('');
  const [empDescription, setEmpDescription] = useState('');

  // Add Job Form State
  const [jobTitle, setJobTitle] = useState('');
  const [jobEmployerId, setJobEmployerId] = useState('');
  const [jobLocation, setJobLocation] = useState('');
  const [jobType, setJobType] = useState('Full-time');
  const [jobExperience, setJobExperience] = useState('1-3 Years');
  const [jobSalary, setJobSalary] = useState('');
  const [jobDescription, setJobDescription] = useState('');
  const [jobSkills, setJobSkills] = useState('');
  const [jobLastDate, setJobLastDate] = useState('');

  const loadData = () => {
    setCandidates(getCandidates());
    const emps = getEmployers();
    setEmployers(emps);
    setJobs(getJobs());
    setApplications(getApplications());

    // Prefill employer ID for job form
    if (emps.length > 0) {
      setJobEmployerId(emps[0].id);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleDeleteCandidate = (id, name) => {
    if (window.confirm(`Are you sure you want to delete Candidate "${name}"? This removes their account profile and applications.`)) {
      deleteCandidate(id);
      addToast(`Candidate "${name}" deleted successfully.`, 'info');
      loadData();
    }
  };

  const handleDeleteEmployer = (id, name) => {
    if (window.confirm(`Are you sure you want to delete Employer "${name}"? This will delete all jobs posted by them and applicant logs.`)) {
      deleteEmployer(id);
      addToast(`Employer "${name}" deleted successfully.`, 'info');
      loadData();
    }
  };

  const handleDeleteJob = (id, title) => {
    if (window.confirm(`Are you sure you want to delete Job Post "${title}"? This will purge it from listing records.`)) {
      deleteJob(id);
      addToast(`Job Post "${title}" has been deleted.`, 'info');
      loadData();
    }
  };

  const handleAddEmployerSubmit = (e) => {
    e.preventDefault();
    if (!empCompanyName || !empEmail || !empPassword) {
      addToast('Company Name, Email, and Password are required.', 'error');
      return;
    }

    try {
      register({
        companyName: empCompanyName,
        email: empEmail,
        password: empPassword,
        location: empLocation,
        industry: empIndustry,
        website: empWebsite,
        description: empDescription,
        logo: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=120&h=120&q=80'
      }, 'employer');

      addToast(`Employer account for "${empCompanyName}" created!`, 'success');
      setIsAddEmployerOpen(false);
      
      // Clear fields
      setEmpCompanyName('');
      setEmpEmail('');
      setEmpPassword('password');
      setEmpLocation('');
      setEmpIndustry('');
      setEmpWebsite('');
      setEmpDescription('');
      
      loadData();
    } catch (err) {
      addToast(err.message, 'error');
    }
  };

  const handleEditEmployerClick = (emp) => {
    setEditingEmployerId(emp.id);
    setEmpCompanyName(emp.companyName || '');
    setEmpEmail(emp.email || '');
    setEmpPassword(emp.password || 'password');
    setEmpLocation(emp.location || '');
    setEmpIndustry(emp.industry || '');
    setEmpWebsite(emp.website || '');
    setEmpDescription(emp.description || '');
    setIsEditEmployerOpen(true);
  };

  const handleEditEmployerSubmit = (e) => {
    e.preventDefault();
    if (!empCompanyName || !empEmail || !empPassword) {
      addToast('Company Name, Email, and Password are required.', 'error');
      return;
    }

    try {
      const employersList = getEmployers();
      const existing = employersList.find(emp => emp.id === editingEmployerId);
      const updated = saveEmployerProfile(editingEmployerId, {
        ...existing,
        companyName: empCompanyName,
        email: empEmail,
        password: empPassword,
        location: empLocation,
        industry: empIndustry,
        website: empWebsite,
        description: empDescription
      });

      if (updated) {
        addToast(`Employer "${empCompanyName}" updated successfully!`, 'success');
        setIsEditEmployerOpen(false);

        // Clear fields
        setEmpCompanyName('');
        setEmpEmail('');
        setEmpPassword('password');
        setEmpLocation('');
        setEmpIndustry('');
        setEmpWebsite('');
        setEmpDescription('');
        setEditingEmployerId(null);

        loadData();
      }
    } catch (err) {
      addToast(err.message, 'error');
    }
  };

  const handleAddJobSubmit = (e) => {
    e.preventDefault();
    if (!jobTitle || !jobEmployerId || !jobLocation || !jobDescription || !jobLastDate || !jobSkills) {
      addToast('Please fill in all required job fields.', 'error');
      return;
    }

    const selectedEmp = employers.find(e => e.id === jobEmployerId);
    if (!selectedEmp) {
      addToast('Selected employer company account does not exist.', 'error');
      return;
    }

    try {
      saveJob({
        title: jobTitle,
        companyName: selectedEmp.companyName,
        employerId: jobEmployerId,
        location: jobLocation,
        employmentType: jobType,
        experienceRequired: jobExperience,
        salary: jobSalary || '',
        description: jobDescription,
        skillsRequired: jobSkills.split(',').map(s => s.trim()).filter(Boolean),
        lastDate: jobLastDate
      });

      addToast(`Job opening "${jobTitle}" published successfully!`, 'success');
      setIsAddJobOpen(false);

      // Clear fields
      setJobTitle('');
      setJobLocation('');
      setJobType('Full-time');
      setJobExperience('1-3 Years');
      setJobSalary('');
      setJobDescription('');
      setJobSkills('');
      setJobLastDate('');

      loadData();
    } catch (err) {
      addToast(err.message, 'error');
    }
  };

  // Filtered lists
  const filteredCandidates = candidates.filter(c => 
    c.name.toLowerCase().includes(candidateSearch.toLowerCase()) ||
    c.email.toLowerCase().includes(candidateSearch.toLowerCase()) ||
    (c.qualification && c.qualification.toLowerCase().includes(candidateSearch.toLowerCase()))
  );

  const filteredEmployers = employers.filter(e => 
    e.companyName.toLowerCase().includes(employerSearch.toLowerCase()) ||
    e.email.toLowerCase().includes(employerSearch.toLowerCase()) ||
    (e.industry && e.industry.toLowerCase().includes(employerSearch.toLowerCase()))
  );

  const filteredJobs = jobs.filter(j => 
    j.title.toLowerCase().includes(jobSearch.toLowerCase()) ||
    j.companyName.toLowerCase().includes(jobSearch.toLowerCase()) ||
    j.location.toLowerCase().includes(jobSearch.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8 flex flex-col md:flex-row gap-8 animate-fade-in text-left">
      
      {/* Sidebar Navigation */}
      <div className="w-full md:w-64 shrink-0 space-y-4">
        {/* Admin Header */}
        <div className="p-6 rounded-2xl border border-slate-900 bg-slate-900/30 glass flex items-center justify-between md:justify-start gap-3">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gradient-to-tr from-violet-600 to-indigo-600 rounded-xl shadow-lg">
              <ShieldAlert className="w-5 h-5 text-white" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-slate-200">System Admin</h4>
              <span className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold">Security Access</span>
            </div>
          </div>
          {/* Mobile menu toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-xl bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800 cursor-pointer"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>

        {/* Tab Links */}
        <div className={`p-2 rounded-2xl border border-slate-900 bg-slate-900/10 glass flex flex-col gap-1 md:flex ${mobileMenuOpen ? 'flex' : 'hidden'}`}>
          {[
            { id: 'overview', label: 'Overview Metrics', icon: <LayoutDashboard className="w-4 h-4" /> },
            { id: 'candidates', label: 'Manage Candidates', icon: <Users className="w-4 h-4" /> },
            { id: 'employers', label: 'Manage Employers', icon: <Building className="w-4 h-4" /> },
            { id: 'jobs', label: 'Manage Job Posts', icon: <Briefcase className="w-4 h-4 text-emerald-500" /> }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => {
                setActiveTab(tab.id);
                setMobileMenuOpen(false);
              }}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-semibold transition-all text-left cursor-pointer ${
                activeTab === tab.id
                  ? 'bg-slate-900 text-violet-400 border border-slate-800 shadow-sm'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/40'
              }`}
            >
              {tab.icon}
              <span>{tab.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Main Panel Content */}
      <div className="flex-1">
        
        {/* VIEW: OVERVIEW METRICS */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            <h2 className="text-xl font-bold font-outfit text-slate-200">System Administration Dashboard</h2>
            
            {/* KPI Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {[
                { title: 'Total Candidates', val: candidates.length, desc: 'Registered seekers', icon: <Users className="w-5 h-5 text-blue-400" /> },
                { title: 'Registered Employers', val: employers.length, desc: 'Active company offices', icon: <Building className="w-5 h-5 text-emerald-400" /> },
                { title: 'Active Job Posts', val: jobs.length, desc: 'Public postings index', icon: <Briefcase className="w-5 h-5 text-violet-400" /> }
              ].map((stat, idx) => (
                <div key={idx} className="p-6 rounded-2xl border border-slate-900 bg-slate-900/20 glass flex justify-between items-start gap-4">
                  <div className="space-y-1">
                    <span className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold">{stat.title}</span>
                    <div className="text-3xl font-black font-outfit text-slate-200">{stat.val}</div>
                    <p className="text-[10px] text-slate-600">{stat.desc}</p>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                    {stat.icon}
                  </div>
                </div>
              ))}
            </div>

            {/* Custom SVG Overview Chart to represent data distribution */}
            <div className="p-6 rounded-3xl border border-slate-900 bg-slate-900/20 glass space-y-4">
              <h3 className="text-sm font-bold text-slate-300 uppercase tracking-wider font-outfit">Portal Data Proportions</h3>
              <div className="flex items-center justify-center p-6 bg-slate-950/40 rounded-2xl border border-slate-900">
                <svg className="w-full max-w-md h-40" viewBox="0 0 300 100">
                  {/* Candidates bar */}
                  <rect x="20" y="25" width="200" height="12" rx="6" fill="#1e293b" />
                  <rect x="20" y="25" width={Math.max(20, Math.min(200, (candidates.length * 40)))} height="12" rx="6" fill="#60a5fa" />
                  <text x="20" y="18" fill="#94a3b8" fontSize="9" fontWeight="bold">CANDIDATES ({candidates.length})</text>

                  {/* Employers bar */}
                  <rect x="20" y="55" width="200" height="12" rx="6" fill="#1e293b" />
                  <rect x="20" y="55" width={Math.max(20, Math.min(200, (employers.length * 40)))} height="12" rx="6" fill="#34d399" />
                  <text x="20" y="48" fill="#94a3b8" fontSize="9" fontWeight="bold">EMPLOYERS ({employers.length})</text>

                  {/* Jobs bar */}
                  <rect x="20" y="85" width="200" height="12" rx="6" fill="#1e293b" />
                  <rect x="20" y="85" width={Math.max(20, Math.min(200, (jobs.length * 40)))} height="12" rx="6" fill="#a78bfa" />
                  <text x="20" y="78" fill="#94a3b8" fontSize="9" fontWeight="bold">JOBS ({jobs.length})</text>
                </svg>
              </div>
            </div>
          </div>
        )}

        {/* VIEW: MANAGE CANDIDATES */}
        {activeTab === 'candidates' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <h2 className="text-xl font-bold font-outfit text-slate-200">Registered Candidates ({candidates.length})</h2>
              
              <div className="relative w-full sm:w-60">
                <Search className="absolute left-3 inset-y-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                <input
                  type="text"
                  value={candidateSearch}
                  onChange={(e) => setCandidateSearch(e.target.value)}
                  placeholder="Search name/email/skills..."
                  className="w-full pl-9 pr-4 py-2 rounded-xl border border-slate-800 bg-slate-950 text-xs text-slate-200 focus:border-violet-500 outline-none"
                />
              </div>
            </div>

            <div className="overflow-x-auto rounded-2xl border border-slate-900 bg-slate-900/30 glass">
              <table className="w-full border-collapse text-left text-xs">
                <thead>
                  <tr className="border-b border-slate-800 text-slate-400 font-semibold uppercase tracking-wider bg-slate-950/50">
                    <th className="px-6 py-4">Full Name</th>
                    <th className="px-6 py-4">Email Address</th>
                    <th className="px-6 py-4">Location</th>
                    <th className="px-6 py-4">Qualification</th>
                    <th className="px-6 py-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800 text-slate-300">
                  {filteredCandidates.map((cand) => (
                    <tr key={cand.id} className="hover:bg-slate-900/40 transition-colors">
                      <td className="px-6 py-4 font-bold text-slate-200">{cand.name}</td>
                      <td className="px-6 py-4 text-slate-400">{cand.email}</td>
                      <td className="px-6 py-4">{cand.location || '-'}</td>
                      <td className="px-6 py-4 truncate max-w-[150px]">{cand.qualification || '-'}</td>
                      <td className="px-6 py-4 text-right">
                        <button
                          onClick={() => handleDeleteCandidate(cand.id, cand.name)}
                          className="p-2 rounded-lg hover:bg-rose-500/10 text-slate-500 hover:text-rose-400 border border-transparent hover:border-rose-500/20 transition-all cursor-pointer"
                          title="Delete Candidate profile"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                  {filteredCandidates.length === 0 && (
                    <tr>
                      <td colSpan="5" className="px-6 py-8 text-center text-slate-500">No candidates match criteria.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* VIEW: MANAGE EMPLOYERS */}
        {activeTab === 'employers' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <h2 className="text-xl font-bold font-outfit text-slate-200">Registered Employers ({employers.length})</h2>
                <button
                  onClick={() => {
                    setEditingEmployerId(null);
                    setEmpCompanyName('');
                    setEmpEmail('');
                    setEmpPassword('password');
                    setEmpLocation('');
                    setEmpIndustry('');
                    setEmpWebsite('');
                    setEmpDescription('');
                    setIsAddEmployerOpen(true);
                  }}
                  className="px-3 py-1.5 rounded-lg bg-violet-600 hover:bg-violet-500 text-white text-[10px] font-bold shadow flex items-center gap-1 cursor-pointer transition-colors"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Employer</span>
                </button>
              </div>
              
              <div className="relative w-full sm:w-60">
                <Search className="absolute left-3 inset-y-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                <input
                  type="text"
                  value={employerSearch}
                  onChange={(e) => setEmployerSearch(e.target.value)}
                  placeholder="Search company/email..."
                  className="w-full pl-9 pr-4 py-2 rounded-xl border border-slate-800 bg-slate-950 text-xs text-slate-200 focus:border-violet-500 outline-none"
                />
              </div>
            </div>

            <div className="overflow-x-auto rounded-2xl border border-slate-900 bg-slate-900/30 glass">
              <table className="w-full border-collapse text-left text-xs">
                <thead>
                  <tr className="border-b border-slate-800 text-slate-400 font-semibold uppercase tracking-wider bg-slate-950/50">
                    <th className="px-6 py-4">Company Name</th>
                    <th className="px-6 py-4">Contact Email</th>
                    <th className="px-6 py-4">Location</th>
                    <th className="px-6 py-4">Industry</th>
                    <th className="px-6 py-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800 text-slate-300">
                  {filteredEmployers.map((emp) => (
                    <tr key={emp.id} className="hover:bg-slate-900/40 transition-colors">
                      <td className="px-6 py-4 font-bold text-slate-200 flex items-center gap-2">
                        <img src={emp.logo} alt="Company logo" className="w-6 h-6 rounded-md object-cover border border-slate-800" />
                        <span>{emp.companyName}</span>
                      </td>
                      <td className="px-6 py-4 text-slate-400">{emp.email}</td>
                      <td className="px-6 py-4">{emp.location || '-'}</td>
                      <td className="px-6 py-4">{emp.industry || '-'}</td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => handleEditEmployerClick(emp)}
                            className="p-2 rounded-lg hover:bg-violet-500/10 text-slate-500 hover:text-violet-400 border border-transparent hover:border-violet-500/20 transition-all cursor-pointer"
                            title="Edit Employer details"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDeleteEmployer(emp.id, emp.companyName)}
                            className="p-2 rounded-lg hover:bg-rose-500/10 text-slate-500 hover:text-rose-400 border border-transparent hover:border-rose-500/20 transition-all cursor-pointer"
                            title="Delete Company account"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                  {filteredEmployers.length === 0 && (
                    <tr>
                      <td colSpan="5" className="px-6 py-8 text-center text-slate-500">No employers match criteria.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* VIEW: MANAGE JOB POSTS */}
        {activeTab === 'jobs' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <h2 className="text-xl font-bold font-outfit text-slate-200">Active Job Postings ({jobs.length})</h2>
                {employers.length > 0 ? (
                  <button
                    onClick={() => setIsAddJobOpen(true)}
                    className="px-3 py-1.5 rounded-lg bg-violet-600 hover:bg-violet-500 text-white text-[10px] font-bold shadow flex items-center gap-1 cursor-pointer transition-colors"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add Job</span>
                  </button>
                ) : (
                  <span className="text-[10px] text-slate-500 bg-slate-900 border border-slate-800 px-2.5 py-1 rounded-lg">
                    Add an employer account first to enable job creation
                  </span>
                )}
              </div>
              
              <div className="relative w-full sm:w-60">
                <Search className="absolute left-3 inset-y-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                <input
                  type="text"
                  value={jobSearch}
                  onChange={(e) => setJobSearch(e.target.value)}
                  placeholder="Search title/company/location..."
                  className="w-full pl-9 pr-4 py-2 rounded-xl border border-slate-800 bg-slate-950 text-xs text-slate-200 focus:border-violet-500 outline-none"
                />
              </div>
            </div>

            <div className="space-y-4">
              {filteredJobs.map((job) => (
                <div 
                  key={job.id} 
                  className="p-6 rounded-2xl border border-slate-900 bg-slate-900/30 glass flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6"
                >
                  <div className="space-y-2">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className={`px-2.5 py-0.5 rounded-full border text-[9px] font-semibold uppercase tracking-wider ${
                        job.status === 'open' ? 'border-emerald-500/25 bg-emerald-500/5 text-emerald-400' : 'border-slate-800 bg-slate-950 text-slate-500'
                      }`}>
                        {job.status === 'open' ? 'Active Visibility' : 'Closed'}
                      </span>
                      <span className="text-[10px] text-slate-500 font-semibold flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-slate-500" />
                        {job.location}
                      </span>
                    </div>
                    
                    <h3 className="text-base font-bold text-slate-200 font-outfit">{job.title}</h3>
                    <p className="text-xs text-slate-400 font-semibold">Posted by: <span className="text-violet-400">{job.companyName}</span></p>
                  </div>

                  <button
                    onClick={() => handleDeleteJob(job.id, job.title)}
                    className="px-4 py-2 rounded-xl border border-rose-500/20 bg-rose-500/5 hover:bg-rose-500/10 text-xs font-semibold text-rose-400 flex items-center gap-1.5 transition-all shrink-0 cursor-pointer"
                  >
                    <Trash2 className="w-4 h-4" />
                    <span>Delete Job</span>
                  </button>
                </div>
              ))}
              {filteredJobs.length === 0 && (
                <div className="p-12 text-center rounded-2xl border border-dashed border-slate-800 text-xs text-slate-500 bg-slate-900/10">
                  No active job posts found matching criteria.
                </div>
              )}
            </div>
          </div>
        )}

      </div>

      {/* 1. Modal for Adding Employer */}
      <Modal
        isOpen={isAddEmployerOpen}
        onClose={() => setIsAddEmployerOpen(false)}
        title="Register New Employer Company"
      >
        <form onSubmit={handleAddEmployerSubmit} className="space-y-4 text-left">
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">Company Name *</label>
              <input
                type="text"
                required
                value={empCompanyName}
                onChange={(e) => setEmpCompanyName(e.target.value)}
                placeholder="TechCorp LLC"
                className="w-full px-4 py-2.5 rounded-xl border border-slate-800 bg-slate-950 text-xs text-slate-200 focus:border-violet-500 outline-none"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">Contact Email *</label>
              <input
                type="email"
                required
                value={empEmail}
                onChange={(e) => setEmpEmail(e.target.value)}
                placeholder="employer@techcorp.com"
                className="w-full px-4 py-2.5 rounded-xl border border-slate-800 bg-slate-950 text-xs text-slate-200 focus:border-violet-500 outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">Password *</label>
              <input
                type="password"
                required
                value={empPassword}
                onChange={(e) => setEmpPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-4 py-2.5 rounded-xl border border-slate-800 bg-slate-950 text-xs text-slate-200 focus:border-violet-500 outline-none"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">Location Headquarters</label>
              <input
                type="text"
                value={empLocation}
                onChange={(e) => setEmpLocation(e.target.value)}
                placeholder="San Francisco, CA"
                className="w-full px-4 py-2.5 rounded-xl border border-slate-800 bg-slate-950 text-xs text-slate-200 focus:border-violet-500 outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">Industry</label>
              <input
                type="text"
                value={empIndustry}
                onChange={(e) => setEmpIndustry(e.target.value)}
                placeholder="SaaS / Software Services"
                className="w-full px-4 py-2.5 rounded-xl border border-slate-800 bg-slate-950 text-xs text-slate-200 focus:border-violet-500 outline-none"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">Website URL</label>
              <input
                type="text"
                value={empWebsite}
                onChange={(e) => setEmpWebsite(e.target.value)}
                placeholder="https://techcorp.com"
                className="w-full px-4 py-2.5 rounded-xl border border-slate-800 bg-slate-950 text-xs text-slate-200 focus:border-violet-500 outline-none"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">Description</label>
            <textarea
              rows={3}
              value={empDescription}
              onChange={(e) => setEmpDescription(e.target.value)}
              placeholder="Provide a brief background statement of the company..."
              className="w-full px-4 py-2.5 rounded-xl border border-slate-800 bg-slate-950 text-xs text-slate-200 focus:border-violet-500 outline-none resize-none"
            />
          </div>

          <div className="pt-4 border-t border-slate-800 flex justify-end gap-3">
            <button
              type="button"
              onClick={() => setIsAddEmployerOpen(false)}
              className="px-5 py-2.5 rounded-xl border border-slate-800 hover:bg-slate-800 text-slate-400 text-xs font-semibold cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 bg-violet-600 hover:bg-violet-500 text-white text-xs font-bold shadow-lg cursor-pointer"
            >
              Register Employer
            </button>
          </div>

        </form>
      </Modal>

      {/* 2. Modal for Editing Employer */}
      <Modal
        isOpen={isEditEmployerOpen}
        onClose={() => setIsEditEmployerOpen(false)}
        title="Modify Employer Company Profile"
      >
        <form onSubmit={handleEditEmployerSubmit} className="space-y-4 text-left">
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">Company Name *</label>
              <input
                type="text"
                required
                value={empCompanyName}
                onChange={(e) => setEmpCompanyName(e.target.value)}
                placeholder="TechCorp LLC"
                className="w-full px-4 py-2.5 rounded-xl border border-slate-800 bg-slate-950 text-xs text-slate-200 focus:border-violet-500 outline-none"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">Contact Email *</label>
              <input
                type="email"
                required
                value={empEmail}
                onChange={(e) => setEmpEmail(e.target.value)}
                placeholder="employer@techcorp.com"
                className="w-full px-4 py-2.5 rounded-xl border border-slate-800 bg-slate-950 text-xs text-slate-200 focus:border-violet-500 outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">Password *</label>
              <input
                type="password"
                required
                value={empPassword}
                onChange={(e) => setEmpPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-4 py-2.5 rounded-xl border border-slate-800 bg-slate-950 text-xs text-slate-200 focus:border-violet-500 outline-none"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">Location Headquarters</label>
              <input
                type="text"
                value={empLocation}
                onChange={(e) => setEmpLocation(e.target.value)}
                placeholder="San Francisco, CA"
                className="w-full px-4 py-2.5 rounded-xl border border-slate-800 bg-slate-950 text-xs text-slate-200 focus:border-violet-500 outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">Industry</label>
              <input
                type="text"
                value={empIndustry}
                onChange={(e) => setEmpIndustry(e.target.value)}
                placeholder="SaaS / Software Services"
                className="w-full px-4 py-2.5 rounded-xl border border-slate-800 bg-slate-950 text-xs text-slate-200 focus:border-violet-500 outline-none"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">Website URL</label>
              <input
                type="text"
                value={empWebsite}
                onChange={(e) => setEmpWebsite(e.target.value)}
                placeholder="https://techcorp.com"
                className="w-full px-4 py-2.5 rounded-xl border border-slate-800 bg-slate-950 text-xs text-slate-200 focus:border-violet-500 outline-none"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">Description</label>
            <textarea
              rows={3}
              value={empDescription}
              onChange={(e) => setEmpDescription(e.target.value)}
              placeholder="Provide a brief background statement of the company..."
              className="w-full px-4 py-2.5 rounded-xl border border-slate-800 bg-slate-950 text-xs text-slate-200 focus:border-violet-500 outline-none resize-none"
            />
          </div>

          <div className="pt-4 border-t border-slate-800 flex justify-end gap-3">
            <button
              type="button"
              onClick={() => setIsEditEmployerOpen(false)}
              className="px-5 py-2.5 rounded-xl border border-slate-800 hover:bg-slate-800 text-slate-400 text-xs font-semibold cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 bg-violet-600 hover:bg-violet-500 text-white text-xs font-bold shadow-lg cursor-pointer"
            >
              Save Modifications
            </button>
          </div>

        </form>
      </Modal>

      {/* 3. Modal for Adding Job */}
      <Modal
        isOpen={isAddJobOpen}
        onClose={() => setIsAddJobOpen(false)}
        title="Publish New Job Listing"
      >
        <form onSubmit={handleAddJobSubmit} className="space-y-4 text-left">
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">Job Title *</label>
              <input
                type="text"
                required
                value={jobTitle}
                onChange={(e) => setJobTitle(e.target.value)}
                placeholder="Senior Engineering Writer"
                className="w-full px-4 py-2.5 rounded-xl border border-slate-800 bg-slate-950 text-xs text-slate-200 focus:border-violet-500 outline-none"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">Employer Company *</label>
              <select
                value={jobEmployerId}
                onChange={(e) => setJobEmployerId(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl border border-slate-800 bg-slate-950 text-xs text-slate-300 focus:border-violet-500 outline-none"
              >
                {employers.map(emp => (
                  <option key={emp.id} value={emp.id}>{emp.companyName}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">Location *</label>
              <input
                type="text"
                required
                value={jobLocation}
                onChange={(e) => setJobLocation(e.target.value)}
                placeholder="Remote / San Francisco, CA"
                className="w-full px-4 py-2.5 rounded-xl border border-slate-800 bg-slate-950 text-xs text-slate-200 focus:border-violet-500 outline-none"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">Salary Range</label>
              <input
                type="text"
                value={jobSalary}
                onChange={(e) => setJobSalary(e.target.value)}
                placeholder="e.g. $110,000 - $130,000"
                className="w-full px-4 py-2.5 rounded-xl border border-slate-800 bg-slate-950 text-xs text-slate-200 focus:border-violet-500 outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">Employment Type</label>
              <select
                value={jobType}
                onChange={(e) => setJobType(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl border border-slate-800 bg-slate-950 text-xs text-slate-300 focus:border-violet-500 outline-none"
              >
                <option value="Full-time">Full-time</option>
                <option value="Part-time">Part-time</option>
                <option value="Internship">Internship</option>
              </select>
            </div>
            <div className="space-y-1.5">
              <label className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">Experience Level</label>
              <select
                value={jobExperience}
                onChange={(e) => setJobExperience(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl border border-slate-800 bg-slate-950 text-xs text-slate-300 focus:border-violet-500 outline-none"
              >
                <option value="No Experience">No Experience</option>
                <option value="1-3 Years">1-3 Years</option>
                <option value="3+ Years">3+ Years</option>
                <option value="5+ Years">5+ Years</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">Last Date to Apply *</label>
              <input
                type="date"
                required
                value={jobLastDate}
                onChange={(e) => setJobLastDate(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-800 bg-slate-950 text-xs text-slate-300 focus:border-violet-500 outline-none"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">Skills Required (Comma-separated) *</label>
            <input
              type="text"
              required
              value={jobSkills}
              onChange={(e) => setJobSkills(e.target.value)}
              placeholder="e.g. Markdown, Technical Writing, Git"
              className="w-full px-4 py-2.5 rounded-xl border border-slate-800 bg-slate-950 text-xs text-slate-200 focus:border-violet-500 outline-none"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">Job Description *</label>
            <textarea
              rows={4}
              required
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
              placeholder="Detail job functions, requirements, benefits, and core duties..."
              className="w-full px-4 py-2.5 rounded-xl border border-slate-800 bg-slate-950 text-xs text-slate-200 focus:border-violet-500 outline-none resize-none"
            />
          </div>

          <div className="pt-4 border-t border-slate-800 flex justify-end gap-3">
            <button
              type="button"
              onClick={() => setIsAddJobOpen(false)}
              className="px-5 py-2.5 rounded-xl border border-slate-800 hover:bg-slate-800 text-slate-400 text-xs font-semibold cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 bg-violet-600 hover:bg-violet-500 text-white text-xs font-bold shadow-lg cursor-pointer"
            >
              Publish Job opening
            </button>
          </div>

        </form>
      </Modal>

    </div>
  );
}
