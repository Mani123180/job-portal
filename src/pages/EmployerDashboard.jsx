import React, { useState, useEffect } from 'react';
import { LayoutDashboard, Building, PlusCircle, Briefcase, Users, Edit, ToggleLeft, Trash2, Calendar, FileText, CheckCircle, MapPin, ExternalLink, X, Download, Menu } from 'lucide-react';
import { getEmployers, saveEmployerProfile, getJobs, saveJob, deleteJob, getApplications, updateApplicationStatus } from '../mockData';
import Modal from '../components/Modal';

export default function EmployerDashboard({ userSession, addToast }) {
  const [activeTab, setActiveTab] = useState('overview'); // 'overview' | 'profile' | 'post-job' | 'my-jobs' | 'applicants'
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [companyProfile, setCompanyProfile] = useState(null);
  const [myJobs, setMyJobs] = useState([]);
  const [applicants, setApplicants] = useState([]);

  // Company Profile Form States
  const [companyName, setCompanyName] = useState('');
  const [logo, setLogo] = useState('');
  const [industry, setIndustry] = useState('');
  const [description, setDescription] = useState('');
  const [website, setWebsite] = useState('');
  const [location, setLocation] = useState('');

  // Post Job Form States
  const [jobTitle, setJobTitle] = useState('');
  const [jobLocation, setJobLocation] = useState('');
  const [employmentType, setEmploymentType] = useState('Full-time');
  const [experienceRequired, setExperienceRequired] = useState('1-3 Years');
  const [salary, setSalary] = useState('');
  const [jobDescription, setJobDescription] = useState('');
  const [skillsRequiredInput, setSkillsRequiredInput] = useState('');
  const [lastDate, setLastDate] = useState('');
  const [editingJobId, setEditingJobId] = useState(null);

  // Load recruiter data
  const loadData = () => {
    if (userSession) {
      const employers = getEmployers();
      const emp = employers.find(e => e.id === userSession.id);
      if (emp) {
        setCompanyProfile(emp);
        setCompanyName(emp.companyName || '');
        setLogo(emp.logo || '');
        setIndustry(emp.industry || '');
        setDescription(emp.description || '');
        setWebsite(emp.website || '');
        setLocation(emp.location || '');
      }

      // Load posted jobs
      const jobs = getJobs().filter(j => j.employerId === userSession.id);
      setMyJobs(jobs);

      // Load applications for posted jobs
      const jobIds = jobs.map(j => j.id);
      const apps = getApplications().filter(a => jobIds.includes(a.jobId));
      setApplicants(apps);
    }
  };

  useEffect(() => {
    loadData();
  }, [userSession]);

  const handleProfileSave = (e) => {
    e.preventDefault();
    if (!companyName) {
      addToast('Company Name is required.', 'error');
      return;
    }
    const updated = saveEmployerProfile(userSession.id, {
      companyName, logo, industry, description, website, location
    });
    if (updated) {
      setCompanyProfile(updated);
      addToast('Company profile details saved.', 'success');
      loadData();
    }
  };

  const handlePostJob = (e) => {
    e.preventDefault();
    if (!jobTitle || !jobLocation || !jobDescription || !lastDate) {
      addToast('Please fill in all required job fields.', 'error');
      return;
    }

    const skillsArray = skillsRequiredInput
      .split(',')
      .map(s => s.trim())
      .filter(Boolean);

    if (skillsArray.length === 0) {
      addToast('Please specify at least one skill requirement.', 'error');
      return;
    }

    const jobPayload = {
      id: editingJobId,
      title: jobTitle,
      companyName: companyProfile.companyName,
      employerId: userSession.id,
      location: jobLocation,
      employmentType,
      experienceRequired,
      salary: salary || '',
      description: jobDescription,
      skillsRequired: skillsArray,
      lastDate
    };

    saveJob(jobPayload);
    addToast(editingJobId ? 'Job posting modified successfully.' : 'New job posting published live!', 'success');
    
    // Clear Form
    setJobTitle('');
    setJobLocation('');
    setEmploymentType('Full-time');
    setExperienceRequired('1-3 Years');
    setSalary('');
    setJobDescription('');
    setSkillsRequiredInput('');
    setLastDate('');
    setEditingJobId(null);
    
    setActiveTab('my-jobs');
    loadData();
  };

  // Populate form for editing job
  const handleEditJobClick = (job) => {
    setEditingJobId(job.id);
    setJobTitle(job.title);
    setJobLocation(job.location);
    setEmploymentType(job.employmentType);
    setExperienceRequired(job.experienceRequired);
    setSalary(job.salary || '');
    setJobDescription(job.description);
    setSkillsRequiredInput(job.skillsRequired.join(', '));
    setLastDate(job.lastDate);
    setActiveTab('post-job');
  };

  const handleToggleJobStatus = (jobId, currentStatus) => {
    const nextStatus = currentStatus === 'open' ? 'closed' : 'open';
    saveJob({ id: jobId, status: nextStatus });
    addToast(nextStatus === 'closed' ? 'Job posting has been closed to applications.' : 'Job posting is now open and visible!', 'info');
    loadData();
  };

  const handleDeleteJobClick = (jobId) => {
    if (window.confirm('Are you sure you want to delete this job posting? This will also remove any candidate applications for it.')) {
      deleteJob(jobId);
      addToast('Job posting has been deleted.', 'info');
      loadData();
    }
  };

  const handleStatusChange = (appId, nextStatus) => {
    const updated = updateApplicationStatus(appId, nextStatus);
    if (updated) {
      addToast(`Updated application status to ${nextStatus}`, 'success');
      loadData();
    }
  };

  // Mock Resume Download Action
  const handleDownloadCandidateResume = (app) => {
    const element = document.createElement("a");
    const file = new Blob([`Simulated Resume content for candidate ${app.candidateName}.\nEmail: ${app.candidateEmail}\nPhone: ${app.candidatePhone}\nSkills: ${app.candidateSkills.join(', ')}`], {type: 'text/plain'});
    element.href = URL.createObjectURL(file);
    element.download = app.resumeName || `${app.candidateName.replace(/\s+/g, '_')}_Resume.pdf`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
    addToast(`Downloading resume for ${app.candidateName}`, 'success');
  };

  if (!companyProfile) return <div className="p-8 text-center text-slate-500">Loading Employer Profile...</div>;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8 flex flex-col md:flex-row gap-8 animate-fade-in text-left">
      
      {/* Sidebar Navigation */}
      <div className="w-full md:w-64 shrink-0 space-y-4">
        {/* Company Header */}
        <div className="p-6 rounded-2xl border border-slate-900 bg-slate-900/30 glass flex items-center justify-between md:justify-start gap-3">
          <div className="flex items-center gap-3">
            <img src={companyProfile.logo} alt="Company Logo" className="w-10 h-10 rounded-xl object-cover border border-slate-800" />
            <div className="max-w-[120px]">
              <h4 className="text-sm font-bold text-slate-200 truncate">{companyProfile.companyName}</h4>
              <span className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold">Employer Account</span>
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

        {/* Navigation Tabs */}
        <div className={`p-2 rounded-2xl border border-slate-900 bg-slate-900/10 glass flex flex-col gap-1 md:flex ${mobileMenuOpen ? 'flex' : 'hidden'}`}>
          {[
            { id: 'overview', label: 'Dashboard', icon: <LayoutDashboard className="w-4 h-4" /> },
            { id: 'profile', label: 'Company Profile', icon: <Building className="w-4 h-4" /> },
            { id: 'post-job', label: editingJobId ? 'Edit Job Post' : 'Post Job opening', icon: <PlusCircle className="w-4 h-4" /> },
            { id: 'my-jobs', label: 'My Posted Jobs', icon: <Briefcase className="w-4 h-4" /> },
            { id: 'applicants', label: 'Applicants Queue', icon: <Users className="w-4 h-4 text-emerald-500" /> }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => {
                setActiveTab(tab.id);
                if (tab.id !== 'post-job') setEditingJobId(null);
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
              {tab.id === 'applicants' && applicants.length > 0 && (
                <span className="ml-auto px-1.5 py-0.5 rounded-full bg-emerald-500/25 border border-emerald-500/20 text-emerald-400 text-[9px] font-bold">
                  {applicants.length}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Main Panel Content */}
      <div className="flex-1">
        
        {/* VIEW: OVERVIEW */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            <h2 className="text-xl font-bold font-outfit text-slate-200">Recruiter Dashboard</h2>
            
            {/* Stats grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {[
                { title: 'Total Jobs Posted', val: myJobs.length, desc: 'Includes closed postings', col: 'text-blue-400' },
                { title: 'Active Postings', val: myJobs.filter(j => j.status === 'open').length, desc: 'Visible on job board', col: 'text-emerald-400' },
                { title: 'Total Applicants', val: applicants.length, desc: 'Applications received', col: 'text-violet-400' }
              ].map((stat, idx) => (
                <div key={idx} className="p-6 rounded-2xl border border-slate-900 bg-slate-900/20 glass space-y-1">
                  <span className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold">{stat.title}</span>
                  <div className={`text-2xl font-black font-outfit ${stat.col}`}>{stat.val}</div>
                  <p className="text-[10px] text-slate-600">{stat.desc}</p>
                </div>
              ))}
            </div>

            {/* Layout grids: Quick post link & list applicants */}
            <div className="p-6 rounded-3xl border border-slate-900 bg-slate-900/20 glass flex flex-col sm:flex-row items-center justify-between gap-6">
              <div className="space-y-1.5 text-center sm:text-left">
                <h3 className="text-base font-bold text-slate-200 font-outfit">Need to fill another role?</h3>
                <p className="text-xs text-slate-500 max-w-md">Publish a new job post specifying job details, required experience levels, and skills checklist tags.</p>
              </div>
              <button
                onClick={() => { setEditingJobId(null); setActiveTab('post-job'); }}
                className="px-5 py-3 rounded-xl bg-violet-600 hover:bg-violet-500 text-white text-xs font-semibold shadow-lg shrink-0 flex items-center gap-1 border border-violet-500/10 cursor-pointer"
              >
                <PlusCircle className="w-4 h-4" />
                <span>Post a Job opening</span>
              </button>
            </div>
          </div>
        )}

        {/* VIEW: COMPANY PROFILE */}
        {activeTab === 'profile' && (
          <div className="space-y-6">
            <h2 className="text-xl font-bold font-outfit text-slate-200 font-outfit">Company Details</h2>
            
            <form onSubmit={handleProfileSave} className="p-6 rounded-2xl border border-slate-900 bg-slate-900/30 glass space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Company Name *</label>
                  <input
                    type="text"
                    required
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-800 bg-slate-950 text-xs text-slate-200 focus:border-violet-500 outline-none"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Industry</label>
                  <input
                    type="text"
                    value={industry}
                    onChange={(e) => setIndustry(e.target.value)}
                    placeholder="SaaS / Information Technology"
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-800 bg-slate-950 text-xs text-slate-200 focus:border-violet-500 outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Company Logo URL</label>
                  <input
                    type="text"
                    value={logo}
                    onChange={(e) => setLogo(e.target.value)}
                    placeholder="https://example.com/logo.png"
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-800 bg-slate-950 text-xs text-slate-200 focus:border-violet-500 outline-none"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Location HQ</label>
                  <input
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="San Francisco, CA"
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-800 bg-slate-950 text-xs text-slate-200 focus:border-violet-500 outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Company Website</label>
                  <input
                    type="text"
                    value={website}
                    onChange={(e) => setWebsite(e.target.value)}
                    placeholder="https://innovate.example.com"
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-800 bg-slate-950 text-xs text-slate-200 focus:border-violet-500 outline-none"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Company Description</label>
                <textarea
                  rows={4}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Detail what your company focuses on, benefits, technologies used..."
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-800 bg-slate-950 text-xs text-slate-200 focus:border-violet-500 outline-none resize-none"
                />
              </div>

              <div className="pt-4 border-t border-slate-900 flex justify-end">
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-violet-600 hover:bg-violet-500 text-white rounded-xl text-xs font-bold shadow-lg cursor-pointer"
                >
                  Save Company Profile
                </button>
              </div>

            </form>
          </div>
        )}

        {/* VIEW: POST A JOB FORM */}
        {activeTab === 'post-job' && (
          <div className="space-y-6">
            <h2 className="text-xl font-bold font-outfit text-slate-200">
              {editingJobId ? 'Edit Job Posting' : 'Post a New Job Opening'}
            </h2>
            
            <form onSubmit={handlePostJob} className="p-6 rounded-2xl border border-slate-900 bg-slate-900/30 glass space-y-6">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Job Title *</label>
                  <input
                    type="text"
                    required
                    value={jobTitle}
                    onChange={(e) => setJobTitle(e.target.value)}
                    placeholder="Senior React Developer"
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-800 bg-slate-950 text-xs text-slate-200 focus:border-violet-500 outline-none"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Company Name</label>
                  <input
                    type="text"
                    disabled
                    value={companyProfile.companyName}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-800 bg-slate-900 text-xs text-slate-500 outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Location *</label>
                  <input
                    type="text"
                    required
                    value={jobLocation}
                    onChange={(e) => setJobLocation(e.target.value)}
                    placeholder="Remote / San Francisco, CA"
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-800 bg-slate-950 text-xs text-slate-200 focus:border-violet-500 outline-none"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Salary (Optional)</label>
                  <input
                    type="text"
                    value={salary}
                    onChange={(e) => setSalary(e.target.value)}
                    placeholder="e.g. $110k - $130k / Year"
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-800 bg-slate-950 text-xs text-slate-200 focus:border-violet-500 outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Employment Type</label>
                  <select
                    value={employmentType}
                    onChange={(e) => setEmploymentType(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-800 bg-slate-950 text-xs text-slate-300 focus:border-violet-500 outline-none"
                  >
                    <option value="Full-time">Full-time</option>
                    <option value="Part-time">Part-time</option>
                    <option value="Internship">Internship</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Experience Required</label>
                  <select
                    value={experienceRequired}
                    onChange={(e) => setExperienceRequired(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-800 bg-slate-950 text-xs text-slate-300 focus:border-violet-500 outline-none"
                  >
                    <option value="No Experience">No Experience</option>
                    <option value="1-3 Years">1-3 Years</option>
                    <option value="3+ Years">3+ Years</option>
                    <option value="5+ Years">5+ Years</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Last Date to Apply *</label>
                  <input
                    type="date"
                    required
                    value={lastDate}
                    onChange={(e) => setLastDate(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-800 bg-slate-950 text-xs text-slate-300 focus:border-violet-500 outline-none"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Skills Required (Comma-separated) *</label>
                <input
                  type="text"
                  required
                  value={skillsRequiredInput}
                  onChange={(e) => setSkillsRequiredInput(e.target.value)}
                  placeholder="React, Tailwind CSS, TypeScript, Git"
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-800 bg-slate-950 text-xs text-slate-200 focus:border-violet-500 outline-none"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Job Description *</label>
                <textarea
                  rows={6}
                  required
                  value={jobDescription}
                  onChange={(e) => setJobDescription(e.target.value)}
                  placeholder="Outline responsibilities, key requirements, tech stack details, team cultures..."
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-800 bg-slate-950 text-xs text-slate-200 focus:border-violet-500 outline-none resize-none"
                />
              </div>

              <div className="pt-4 border-t border-slate-900 flex justify-end gap-3">
                {editingJobId && (
                  <button
                    type="button"
                    onClick={() => { setEditingJobId(null); setActiveTab('my-jobs'); }}
                    className="px-5 py-2.5 rounded-xl border border-slate-800 hover:bg-slate-800 text-slate-400 text-xs font-semibold cursor-pointer"
                  >
                    Cancel
                  </button>
                )}
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-violet-600 hover:bg-violet-500 text-white rounded-xl text-xs font-bold shadow-lg cursor-pointer"
                >
                  {editingJobId ? 'Save Changes' : 'Publish Job Posting'}
                </button>
              </div>

            </form>
          </div>
        )}

        {/* VIEW: MY POSTED JOBS */}
        {activeTab === 'my-jobs' && (
          <div className="space-y-6">
            <h2 className="text-xl font-bold font-outfit text-slate-200">My Posted Jobs ({myJobs.length})</h2>
            
            <div className="space-y-4">
              {myJobs.length > 0 ? (
                myJobs.map((job) => (
                  <div 
                    key={job.id} 
                    className="p-6 rounded-2xl border border-slate-900 bg-slate-900/30 glass flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6"
                  >
                    <div className="space-y-2">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className={`px-2.5 py-0.5 rounded-full border text-[9px] font-semibold uppercase tracking-wider ${
                          job.status === 'open' ? 'border-emerald-500/25 bg-emerald-500/5 text-emerald-400' : 'border-slate-800 bg-slate-950 text-slate-500'
                        }`}>
                          {job.status === 'open' ? 'Open' : 'Closed'}
                        </span>
                        <span className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold">
                          Apply by {job.lastDate}
                        </span>
                      </div>
                      
                      <h3 className="text-base font-bold text-slate-200 font-outfit">{job.title}</h3>
                      <p className="text-xs text-slate-400 font-semibold">{job.location} • {job.employmentType}</p>
                    </div>

                    {/* Actions */}
                    <div className="flex flex-wrap gap-2 pt-2 sm:pt-0">
                      <button
                        onClick={() => handleEditJobClick(job)}
                        className="p-2.5 rounded-xl border border-slate-800 bg-slate-950 text-slate-400 hover:text-violet-400 hover:border-violet-500/20 hover:bg-violet-500/5 transition-all"
                        title="Edit Job details"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleToggleJobStatus(job.id, job.status)}
                        className={`px-3 py-2 rounded-xl border text-[11px] font-semibold flex items-center gap-1 transition-all ${
                          job.status === 'open'
                            ? 'border-slate-800 bg-slate-950 text-amber-500 hover:border-amber-500/20 hover:bg-amber-500/5'
                            : 'border-slate-800 bg-slate-950 text-emerald-500 hover:border-emerald-500/20 hover:bg-emerald-500/5'
                        }`}
                        title={job.status === 'open' ? 'Close job post' : 'Reopen job post'}
                      >
                        <span>{job.status === 'open' ? 'Close Posting' : 'Reopen Post'}</span>
                      </button>
                      <button
                        onClick={() => handleDeleteJobClick(job.id)}
                        className="p-2.5 rounded-xl border border-slate-800 bg-slate-950 text-slate-400 hover:text-rose-400 hover:border-rose-500/20 hover:bg-rose-500/5 transition-all"
                        title="Delete Job post"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="p-12 text-center rounded-2xl border border-dashed border-slate-800 bg-slate-900/10 space-y-4">
                  <Briefcase className="w-10 h-10 text-slate-600 mx-auto" />
                  <div>
                    <h4 className="text-sm font-bold text-slate-400">No Jobs Posted Yet</h4>
                    <p className="text-xs text-slate-600 max-w-xs mt-1">Start accepting candidate files by posting a job opening description.</p>
                  </div>
                  <button
                    onClick={() => setActiveTab('post-job')}
                    className="px-5 py-2.5 bg-violet-600 hover:bg-violet-500 text-white rounded-xl text-xs font-semibold shadow-lg"
                  >
                    Post a Job Opening
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        {/* VIEW: APPLICANTS QUEUE */}
        {activeTab === 'applicants' && (
          <div className="space-y-6">
            <h2 className="text-xl font-bold font-outfit text-slate-200">Applicants Review Queue ({applicants.length})</h2>
            
            <div className="space-y-6">
              {applicants.length > 0 ? (
                applicants.map((app) => (
                  <div 
                    key={app.id} 
                    className="p-6 rounded-2xl border border-slate-900 bg-slate-900/30 glass flex flex-col gap-6"
                  >
                    {/* Header */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div>
                        <h4 className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold">Applied for: <span className="text-violet-400 font-bold">{app.jobTitle}</span></h4>
                        <h3 className="text-lg font-bold text-slate-200 mt-1 font-outfit">{app.candidateName}</h3>
                        <p className="text-xs text-slate-400 font-semibold">{app.candidateEmail} • {app.candidatePhone || 'No phone provided'}</p>
                      </div>

                      {/* Status select dropdown */}
                      <div className="space-y-1.5">
                        <label className="block text-[10px] font-semibold text-slate-500 uppercase tracking-wider">Application Status</label>
                        <select
                          value={app.status}
                          onChange={(e) => handleStatusChange(app.id, e.target.value)}
                          className="px-3 py-2 rounded-xl border border-slate-800 bg-slate-950 text-xs font-semibold text-slate-300 focus:border-violet-500 outline-none"
                        >
                          <option value="Applied">Applied</option>
                          <option value="Under Review">Under Review</option>
                          <option value="Interviewing">Interviewing</option>
                          <option value="Offered">Offered</option>
                          <option value="Rejected">Rejected</option>
                        </select>
                      </div>
                    </div>

                    {/* Candidate Details */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-4 rounded-xl border border-slate-800 bg-slate-950/40 text-xs">
                      <div className="space-y-1 sm:col-span-3">
                        <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Candidate Skills Tags</span>
                        <div className="flex flex-wrap gap-1 pt-1">
                          {app.candidateSkills && app.candidateSkills.length > 0 ? (
                            app.candidateSkills.map((s, i) => (
                              <span key={i} className="px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-[10px] text-slate-400">
                                {s}
                              </span>
                            ))
                          ) : (
                            <span className="text-slate-600">No skills declared in application.</span>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Footer downloads */}
                    <div className="pt-4 border-t border-slate-900/60 flex flex-wrap items-center justify-between gap-4">
                      <div className="flex items-center gap-2 text-xs text-slate-400">
                        <FileText className="w-4 h-4 text-violet-400" />
                        <span>{app.resumeName || 'No resume file attached'}</span>
                      </div>
                      
                      {app.resumeName && (
                        <button
                          onClick={() => handleDownloadCandidateResume(app)}
                          className="px-4 py-2 rounded-xl bg-slate-900 border border-slate-800 hover:bg-slate-800 text-xs font-bold text-slate-300 flex items-center gap-1.5 cursor-pointer"
                        >
                          <Download className="w-4 h-4" />
                          <span>Download Resume</span>
                        </button>
                      )}
                    </div>

                  </div>
                ))
              ) : (
                <div className="p-12 text-center rounded-2xl border border-dashed border-slate-800 bg-slate-900/10 text-xs text-slate-600">
                  No candidate applications found for your listings. When candidates apply, details will show up in this queue.
                </div>
              )}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
