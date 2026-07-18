import React, { useState, useEffect } from 'react';
import { LayoutDashboard, User, FileText, CheckSquare, Plus, Trash2, Download, Briefcase, MapPin, ExternalLink, Calendar } from 'lucide-react';
import { getCandidates, saveCandidateProfile, getApplications, getJobs, applyToJob } from '../mockData';

export default function CandidateDashboard({ userSession, addToast, setView, setSelectedJob }) {
  const [activeTab, setActiveTab] = useState('overview'); // 'overview' | 'profile' | 'resume' | 'applications'
  const [profile, setProfile] = useState(null);
  const [applications, setApplications] = useState([]);
  const [availableJobs, setAvailableJobs] = useState([]);

  // Profile Form States
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [location, setLocation] = useState('');
  const [qualification, setQualification] = useState('');
  const [experience, setExperience] = useState('');
  const [skillInput, setSkillInput] = useState('');
  const [skills, setSkills] = useState([]);

  // Resume State
  const [resumeFile, setResumeFile] = useState(null);

  const loadData = () => {
    if (userSession) {
      const candidates = getCandidates();
      const cand = candidates.find(c => c.id === userSession.id);
      if (cand) {
        setProfile(cand);
        setName(cand.name || '');
        setEmail(cand.email || '');
        setPhone(cand.phone || '');
        setLocation(cand.location || '');
        setQualification(cand.qualification || '');
        setExperience(cand.experience || '');
        setSkills(cand.skills || []);
        if (cand.resumeName) {
          setResumeFile({ name: cand.resumeName, size: cand.resumeSize || '150 KB' });
        } else {
          setResumeFile(null);
        }
      }

      // Load Candidate applications
      const apps = getApplications().filter(a => a.candidateId === userSession.id);
      setApplications(apps);

      // Load all jobs
      setAvailableJobs(getJobs().filter(j => j.status === 'open'));
    }
  };

  useEffect(() => {
    loadData();
  }, [userSession]);

  const handleProfileSave = (e) => {
    e.preventDefault();
    if (!name || !email) {
      addToast('Full Name and Email are required.', 'error');
      return;
    }
    const updated = saveCandidateProfile(userSession.id, {
      name, email, phone, location, qualification, experience, skills
    });
    if (updated) {
      setProfile(updated);
      addToast('Personal information updated successfully!', 'success');
      loadData();
    }
  };

  const handleAddSkill = (e) => {
    e.preventDefault();
    const clean = skillInput.trim();
    if (clean && !skills.includes(clean)) {
      setSkills([...skills, clean]);
      setSkillInput('');
    }
  };

  const handleRemoveSkill = (skillToRemove) => {
    setSkills(skills.filter(s => s !== skillToRemove));
  };

  const handleResumeUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.type !== 'application/pdf' && !file.name.endsWith('.docx')) {
        addToast('Please upload a PDF or DOCX file.', 'error');
        return;
      }
      const sizeStr = `${Math.round(file.size / 1024)} KB`;
      const updated = saveCandidateProfile(userSession.id, {
        ...profile,
        resumeName: file.name,
        resumeSize: sizeStr
      });
      if (updated) {
        setResumeFile({ name: file.name, size: sizeStr });
        addToast(`Uploaded ${file.name} successfully!`, 'success');
        loadData();
      }
    }
  };

  const handleRemoveResume = () => {
    const updated = saveCandidateProfile(userSession.id, {
      ...profile,
      resumeName: '',
      resumeSize: ''
    });
    if (updated) {
      setResumeFile(null);
      addToast('Resume removed from profile.', 'info');
      loadData();
    }
  };

  // Mock Resume Download
  const handleDownloadResume = () => {
    if (resumeFile) {
      // Trigger a simulated text file download to mimic download
      const element = document.createElement("a");
      const file = new Blob([`Simulated Resume content for ${profile.name}.\nSkills: ${skills.join(', ')}`], {type: 'text/plain'});
      element.href = URL.createObjectURL(file);
      element.download = resumeFile.name;
      document.body.appendChild(element);
      element.click();
      document.body.removeChild(element);
      addToast('Downloading resume file...', 'success');
    }
  };

  // Mock Offer Letter Download
  const handleDownloadOfferLetter = (app) => {
    const element = document.createElement("a");
    const file = new Blob([
      `==================================================\n` +
      `                 OFFER OF EMPLOYMENT              \n` +
      `==================================================\n\n` +
      `Date: ${new Date().toISOString().split('T')[0]}\n\n` +
      `Dear ${app.candidateName},\n\n` +
      `On behalf of ${app.companyName}, we are absolutely thrilled to offer you the position of:\n` +
      `👉 ${app.jobTitle}\n\n` +
      `We were incredibly impressed by your qualifications and skill set. We believe your background will be key to our continued growth.\n\n` +
      `Terms of Offer:\n` +
      `- Position Type: Full-Time / Internship\n` +
      `- Location: Remote / Office HQ\n` +
      `- Status: Offered\n\n` +
      `Please accept this letter as our official notification of offer. We look forward to welcoming you to the team!\n\n` +
      `Warm regards,\n` +
      `${app.companyName} Recruiting Team\n` +
      `Job Portal Network`
    ], {type: 'text/plain'});
    element.href = URL.createObjectURL(file);
    element.download = `${app.companyName.replace(/\s+/g, '_')}_Offer_Letter.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
    addToast(`Downloading offer letter from ${app.companyName}!`, 'success');
  };

  // Skill-based Recommended Jobs
  const recommendedJobs = availableJobs.filter(job => {
    // Check if the candidate shares at least one skill with the job
    const match = job.skillsRequired.some(js => 
      skills.some(cs => cs.toLowerCase() === js.toLowerCase())
    );
    // Don't recommend jobs already applied to
    const alreadyApplied = applications.some(a => a.jobId === job.id);
    return match && !alreadyApplied;
  }).slice(0, 3);

  const getStatusBadge = (status) => {
    const colors = {
      'Applied': 'border-blue-500/20 bg-blue-500/5 text-blue-400',
      'Under Review': 'border-amber-500/20 bg-amber-500/5 text-amber-400',
      'Interviewing': 'border-purple-500/20 bg-purple-500/5 text-purple-400',
      'Offered': 'border-emerald-500/20 bg-emerald-500/5 text-emerald-400',
      'Rejected': 'border-rose-500/20 bg-rose-500/5 text-rose-400'
    };
    return colors[status] || 'border-slate-800 bg-slate-900 text-slate-400';
  };

  if (!profile) return <div className="p-8 text-center text-slate-500">Loading Candidate Profile...</div>;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8 flex flex-col md:flex-row gap-8 animate-fade-in text-left">
      
      {/* Sidebar Navigation */}
      <div className="w-full md:w-64 shrink-0 space-y-4">
        {/* Profile Card Header */}
        <div className="p-6 rounded-2xl border border-slate-900 bg-slate-900/30 glass flex items-center gap-3">
          <div className="w-11 h-11 rounded-xl bg-violet-600/20 border border-violet-500/30 flex items-center justify-center text-violet-400 font-bold uppercase text-lg">
            {profile.name ? profile.name.charAt(0) : 'U'}
          </div>
          <div>
            <h4 className="text-sm font-bold text-slate-200 truncate max-w-[150px]">{profile.name}</h4>
            <span className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold">Candidate Account</span>
          </div>
        </div>

        {/* Tab buttons */}
        <div className="p-2 rounded-2xl border border-slate-900 bg-slate-900/10 glass flex flex-col gap-1">
          {[
            { id: 'overview', label: 'Dashboard', icon: <LayoutDashboard className="w-4 h-4" /> },
            { id: 'profile', label: 'My Profile', icon: <User className="w-4 h-4" /> },
            { id: 'resume', label: 'Upload Resume', icon: <FileText className="w-4 h-4" /> },
            { id: 'applications', label: 'Applied Jobs', icon: <CheckSquare className="w-4 h-4 text-emerald-500" /> }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-semibold transition-all text-left cursor-pointer ${
                activeTab === tab.id
                  ? 'bg-slate-900 text-violet-400 border border-slate-800 shadow-sm'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/40'
              }`}
            >
              {tab.icon}
              <span>{tab.label}</span>
              {tab.id === 'applications' && applications.length > 0 && (
                <span className="ml-auto px-1.5 py-0.5 rounded-full bg-emerald-500/25 border border-emerald-500/20 text-emerald-400 text-[9px] font-bold">
                  {applications.length}
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
            <h2 className="text-xl font-bold font-outfit text-slate-200">Dashboard Overview</h2>
            
            {/* Stats grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {[
                { title: 'Jobs Applied', val: applications.length, desc: 'Total applications sent', col: 'text-blue-400' },
                { title: 'Resume Attached', val: resumeFile ? '1 Active' : '0 None', desc: 'Active document matching', col: 'text-emerald-400' },
                { title: 'Offers Received', val: applications.filter(a => a.status === 'Offered').length, desc: 'Congratulations status', col: 'text-violet-400' }
              ].map((stat, idx) => (
                <div key={idx} className="p-6 rounded-2xl border border-slate-900 bg-slate-900/20 glass space-y-1">
                  <span className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold">{stat.title}</span>
                  <div className={`text-2xl font-black font-outfit ${stat.col}`}>{stat.val}</div>
                  <p className="text-[10px] text-slate-600">{stat.desc}</p>
                </div>
              ))}
            </div>

            {/* Layout Grid: Recommended Jobs & Recent Applications */}
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
              {/* Left col: Recommended Jobs */}
              <div className="lg:col-span-3 space-y-4">
                <h3 className="text-sm font-bold text-slate-300 uppercase tracking-wider font-outfit">Skills Match Recommendations</h3>
                {recommendedJobs.length > 0 ? (
                  <div className="flex flex-col gap-4">
                    {recommendedJobs.map((job) => (
                      <div 
                        key={job.id} 
                        className="p-5 rounded-2xl border border-slate-900 bg-slate-900/20 glass flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                      >
                        <div className="space-y-1">
                          <h4 className="text-sm font-bold text-slate-200 hover:text-violet-400 cursor-pointer" onClick={() => { setSelectedJob(job); setView('jobs'); }}>
                            {job.title}
                          </h4>
                          <p className="text-xs text-slate-400 font-semibold">{job.companyName} • {job.location}</p>
                          <div className="flex flex-wrap gap-1 mt-2">
                            {job.skillsRequired.slice(0, 3).map((s, i) => (
                              <span key={i} className="px-1.5 py-0.5 rounded bg-slate-950 text-[9px] text-slate-500 border border-slate-800">
                                {s}
                              </span>
                            ))}
                          </div>
                        </div>
                        <button
                          onClick={() => { setSelectedJob(job); setView('jobs'); }}
                          className="px-4 py-2 rounded-xl bg-violet-600 hover:bg-violet-500 text-[10px] font-semibold text-white transition-colors"
                        >
                          View & Apply
                        </button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="p-8 text-center rounded-2xl border border-dashed border-slate-800 text-xs text-slate-600 bg-slate-900/10">
                    No recommended jobs. Add matching tags to your skills profile tab to view listings.
                  </div>
                )}
              </div>

              {/* Right col: Recent Applications */}
              <div className="lg:col-span-2 space-y-4">
                <h3 className="text-sm font-bold text-slate-300 uppercase tracking-wider font-outfit">Recent Applications</h3>
                {applications.length > 0 ? (
                  <div className="flex flex-col gap-3">
                    {applications.slice(0, 3).map((app) => (
                      <div key={app.id} className="p-4 rounded-xl border border-slate-900 bg-slate-950/40 flex items-center justify-between">
                        <div className="space-y-1 max-w-[150px]">
                          <h4 className="text-xs font-bold text-slate-300 truncate">{app.jobTitle}</h4>
                          <p className="text-[10px] text-slate-500 truncate">{app.companyName}</p>
                        </div>
                        <span className={`px-2 py-0.5 rounded-full border text-[9px] font-semibold ${getStatusBadge(app.status)}`}>
                          {app.status}
                        </span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="p-8 text-center rounded-2xl border border-dashed border-slate-800 text-xs text-slate-600 bg-slate-900/10">
                    No recent applications found.
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* VIEW: MY PROFILE */}
        {activeTab === 'profile' && (
          <div className="space-y-6">
            <h2 className="text-xl font-bold font-outfit text-slate-200 font-outfit">Personal Information</h2>
            
            <form onSubmit={handleProfileSave} className="p-6 rounded-2xl border border-slate-900 bg-slate-900/30 glass space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Full Name *</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-800 bg-slate-950 text-xs text-slate-200 focus:border-violet-500 outline-none"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Email Address *</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-800 bg-slate-950 text-xs text-slate-200 focus:border-violet-500 outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Phone Number</label>
                  <input
                    type="text"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-800 bg-slate-950 text-xs text-slate-200 focus:border-violet-500 outline-none"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Location</label>
                  <input
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-800 bg-slate-950 text-xs text-slate-200 focus:border-violet-500 outline-none"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Qualification</label>
                <input
                  type="text"
                  value={qualification}
                  onChange={(e) => setQualification(e.target.value)}
                  placeholder="Master's in Computer Science, etc."
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-800 bg-slate-950 text-xs text-slate-200 focus:border-violet-500 outline-none"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Professional Experience Summary</label>
                <textarea
                  rows={4}
                  value={experience}
                  onChange={(e) => setExperience(e.target.value)}
                  placeholder="Summarize your years of work experience, past positions, projects..."
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-800 bg-slate-950 text-xs text-slate-200 focus:border-violet-500 outline-none resize-none"
                />
              </div>

              {/* Skills Tags Config */}
              <div className="space-y-3">
                <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Skills & Technologies</label>
                
                {/* Inputs */}
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={skillInput}
                    onChange={(e) => setSkillInput(e.target.value)}
                    placeholder="e.g. React, Tailwind CSS, Figma"
                    className="flex-1 px-4 py-2 rounded-xl border border-slate-800 bg-slate-950 text-xs text-slate-200 outline-none focus:border-violet-500"
                  />
                  <button
                    onClick={handleAddSkill}
                    className="px-4 py-2 bg-violet-600 hover:bg-violet-500 text-white rounded-xl text-xs font-bold"
                  >
                    Add
                  </button>
                </div>

                {/* Display list */}
                <div className="flex flex-wrap gap-2 pt-2">
                  {skills.map((skill, idx) => (
                    <span 
                      key={idx} 
                      className="px-3 py-1 rounded-full bg-slate-950 border border-slate-800 text-xs text-slate-300 flex items-center gap-1.5"
                    >
                      <span>{skill}</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveSkill(skill)}
                        className="text-slate-500 hover:text-rose-400 transition-colors"
                      >
                        &times;
                      </button>
                    </span>
                  ))}
                  {skills.length === 0 && (
                    <span className="text-xs text-slate-600 font-medium">No skills added yet. Type a skill and click Add.</span>
                  )}
                </div>
              </div>

              <div className="pt-4 border-t border-slate-900 flex justify-end">
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-violet-600 hover:bg-violet-500 text-white rounded-xl text-xs font-bold shadow-lg"
                >
                  Save Profile Changes
                </button>
              </div>

            </form>
          </div>
        )}

        {/* VIEW: UPLOAD RESUME */}
        {activeTab === 'resume' && (
          <div className="space-y-6">
            <h2 className="text-xl font-bold font-outfit text-slate-200 font-outfit">Resume Document</h2>
            
            <div className="p-6 rounded-2xl border border-slate-900 bg-slate-900/30 glass space-y-6">
              <p className="text-xs text-slate-400 leading-relaxed font-medium">
                Upload your latest resume document. This document will be attached to all future applications automatically. 
                Employers will also be able to download this file when reviewing candidates.
              </p>

              {resumeFile ? (
                <div className="p-6 rounded-xl border border-emerald-500/20 bg-emerald-500/5 space-y-6">
                  <div className="flex items-center gap-3 text-emerald-400">
                    <FileText className="w-10 h-10 shrink-0" />
                    <div>
                      <h4 className="text-sm font-bold">{resumeFile.name}</h4>
                      <span className="text-[10px] text-slate-500 font-semibold">{resumeFile.size} • Pre-attached to profile</span>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-3 pt-4 border-t border-slate-800/80">
                    <button
                      onClick={handleDownloadResume}
                      className="px-4 py-2 rounded-xl bg-slate-900 border border-slate-800 hover:bg-slate-800 text-xs font-semibold text-slate-300 flex items-center gap-1.5"
                    >
                      <Download className="w-4 h-4" />
                      <span>Download Resume</span>
                    </button>
                    <button
                      onClick={handleRemoveResume}
                      className="px-4 py-2 rounded-xl border border-rose-500/20 bg-rose-500/5 hover:bg-rose-500/10 text-xs font-semibold text-rose-400 flex items-center gap-1.5"
                    >
                      <Trash2 className="w-4 h-4" />
                      <span>Remove Document</span>
                    </button>
                  </div>
                </div>
              ) : (
                <div className="border-2 border-dashed border-slate-800 rounded-2xl p-10 text-center flex flex-col items-center justify-center gap-3">
                  <FileText className="w-10 h-10 text-slate-600" />
                  <div>
                    <span className="block text-sm font-bold text-slate-300">No Resume Document Attached</span>
                    <span className="block text-[10px] text-slate-500 mt-1">Supported formats: PDF, DOCX up to 10MB</span>
                  </div>
                  <div className="relative mt-2">
                    <input
                      type="file"
                      accept=".pdf,.docx,application/pdf"
                      onChange={handleResumeUpload}
                      className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                    />
                    <button type="button" className="px-5 py-2.5 bg-violet-600 hover:bg-violet-500 text-white rounded-xl text-xs font-bold shadow-lg flex items-center gap-1.5 cursor-pointer">
                      <Plus className="w-3.5 h-3.5" />
                      <span>Add Resume</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* VIEW: APPLIED JOBS */}
        {activeTab === 'applications' && (
          <div className="space-y-6">
            <h2 className="text-xl font-bold font-outfit text-slate-200">Applied Jobs & Tracker</h2>
            
            <div className="space-y-4">
              {applications.length > 0 ? (
                applications.map((app) => (
                  <div 
                    key={app.id} 
                    className="p-6 rounded-2xl border border-slate-900 bg-slate-900/30 glass flex flex-col md:flex-row justify-between items-start md:items-center gap-6"
                  >
                    <div className="space-y-2">
                      <div className="flex flex-wrap items-center gap-3">
                        <span className={`px-2 py-0.5 rounded-full border text-[9px] font-semibold ${getStatusBadge(app.status)}`}>
                          {app.status}
                        </span>
                        <span className="text-[10px] text-slate-500 flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          Applied on {app.appliedDate}
                        </span>
                      </div>
                      
                      <h3 className="text-base font-bold text-slate-200 font-outfit">{app.jobTitle}</h3>
                      <p className="text-xs text-slate-400 font-semibold">{app.companyName}</p>
                      
                      {app.status === 'Offered' && (
                        <button
                          onClick={() => handleDownloadOfferLetter(app)}
                          className="mt-2 px-3 py-1.5 rounded-xl border border-emerald-500/25 bg-emerald-500/5 hover:bg-emerald-500/10 text-[10px] font-bold text-emerald-400 flex items-center gap-1.5 transition-all cursor-pointer"
                        >
                          <Download className="w-3.5 h-3.5" />
                          <span>Download Offer Letter</span>
                        </button>
                      )}
                    </div>

                    {/* Progress visualizer steps */}
                    <div className="flex items-center gap-2 max-w-full overflow-x-auto text-[9px] font-bold text-slate-500 pr-2">
                      {['Applied', 'Under Review', 'Interviewing', 'Offered'].map((step, idx) => {
                        // Determine step color
                        const isActive = app.status === step || 
                          (step === 'Applied' && app.status !== 'Rejected') ||
                          (step === 'Under Review' && ['Under Review', 'Interviewing', 'Offered'].includes(app.status)) ||
                          (step === 'Interviewing' && ['Interviewing', 'Offered'].includes(app.status)) ||
                          (step === 'Offered' && app.status === 'Offered');
                        
                        return (
                          <React.Fragment key={idx}>
                            {idx > 0 && <div className={`w-6 h-0.5 ${isActive ? 'bg-violet-500/50' : 'bg-slate-800'}`} />}
                            <span className={`px-2 py-1 rounded border capitalize ${
                              app.status === 'Rejected' && step !== 'Applied'
                                ? 'border-slate-800 text-slate-600'
                                : isActive 
                                  ? 'border-violet-500/25 bg-violet-500/5 text-violet-400' 
                                  : 'border-slate-800 text-slate-600'
                            }`}>
                              {step}
                            </span>
                          </React.Fragment>
                        );
                      })}
                      {app.status === 'Rejected' && (
                        <>
                          <div className="w-6 h-0.5 bg-rose-500/20" />
                          <span className="px-2 py-1 rounded border border-rose-500/25 bg-rose-500/5 text-rose-400 uppercase">
                            Rejected
                          </span>
                        </>
                      )}
                    </div>
                  </div>
                ))
              ) : (
                <div className="p-12 text-center rounded-2xl border border-dashed border-slate-800 bg-slate-900/10 space-y-4">
                  <Briefcase className="w-10 h-10 text-slate-600 mx-auto" />
                  <div>
                    <h4 className="text-sm font-bold text-slate-400">No Job Applications Yet</h4>
                    <p className="text-xs text-slate-600 max-w-xs mx-auto mt-1">
                      You haven't applied to any jobs yet. Visit the Jobs search portal page to get started.
                    </p>
                  </div>
                  <button
                    onClick={() => setView('jobs')}
                    className="px-5 py-2.5 bg-violet-600 hover:bg-violet-500 text-white rounded-xl text-xs font-semibold shadow-lg"
                  >
                    Search Open Jobs
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
