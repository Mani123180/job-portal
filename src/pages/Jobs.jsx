import React, { useState, useEffect } from 'react';
import { Search, MapPin, Briefcase, Calendar, DollarSign, Award, X, FileText, CheckCircle } from 'lucide-react';
import { getJobs, getApplications, applyToJob, getCandidates } from '../mockData';
import Modal from '../components/Modal';

export default function Jobs({ userSession, setView, setAuthMode, filters, setFilters, addToast }) {
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [selectedJob, setSelectedJob] = useState(null);
  const [isApplyModalOpen, setIsApplyModalOpen] = useState(false);

  // Filter States
  const [searchQuery, setSearchQuery] = useState(filters.query || '');
  const [searchLocation, setSearchLocation] = useState(filters.location || '');
  const [employmentType, setEmploymentType] = useState(filters.type || '');
  const [experienceRequired, setExperienceRequired] = useState(filters.experience || '');
  const [selectedSkills, setSelectedSkills] = useState([]);

  // Apply Form States
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [location, setLocation] = useState('');
  const [qualification, setQualification] = useState('');
  const [experience, setExperience] = useState('');
  const [skillsStr, setSkillsStr] = useState('');
  const [resumeFile, setResumeFile] = useState(null);
  const [submittingApp, setSubmittingApp] = useState(false);
  const [profileResumeName, setProfileResumeName] = useState('');
  const [profileResumeSize, setProfileResumeSize] = useState('');
  const [useProfileResume, setUseProfileResume] = useState(false);

  // Load jobs and candidate profile details for apply form
  const loadJobsData = () => {
    setJobs(getJobs());
  };

  useEffect(() => {
    loadJobsData();
  }, []);

  // Pre-fill apply form if candidate is logged in
  useEffect(() => {
    if (userSession && userSession.role === 'candidate') {
      const candidates = getCandidates();
      const cand = candidates.find(c => c.id === userSession.id);
      if (cand) {
        setFullName(cand.name || '');
        setEmail(cand.email || '');
        setPhone(cand.phone || '');
        setLocation(cand.location || '');
        setQualification(cand.qualification || '');
        setExperience(cand.experience || '');
        setSkillsStr(cand.skills ? cand.skills.join(', ') : '');
        if (cand.resumeName) {
          setProfileResumeName(cand.resumeName);
          setProfileResumeSize(cand.resumeSize || 'Uploaded File');
          setUseProfileResume(true);
          setResumeFile({ name: cand.resumeName, size: cand.resumeSize || 'Uploaded File' });
        } else {
          setProfileResumeName('');
          setProfileResumeSize('');
          setUseProfileResume(false);
          setResumeFile(null);
        }
      }
    }
  }, [userSession, isApplyModalOpen]);

  // Sync incoming filter prop changes
  useEffect(() => {
    setSearchQuery(filters.query || '');
    setSearchLocation(filters.location || '');
    setEmploymentType(filters.type || '');
    setExperienceRequired(filters.experience || '');
  }, [filters]);

  // Filtering Logic
  useEffect(() => {
    let result = jobs.filter(job => job.status === 'open');

    // Title / Company / Description Query
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter(job => 
        job.title.toLowerCase().includes(q) ||
        job.companyName.toLowerCase().includes(q) ||
        job.description.toLowerCase().includes(q) ||
        job.skillsRequired.some(s => s.toLowerCase().includes(q))
      );
    }

    // Location Filter
    if (searchLocation) {
      const loc = searchLocation.toLowerCase();
      result = result.filter(job => job.location.toLowerCase().includes(loc));
    }

    // Employment Type Filter
    if (employmentType) {
      result = result.filter(job => job.employmentType === employmentType);
    }

    // Experience Filter
    if (experienceRequired) {
      result = result.filter(job => job.experienceRequired === experienceRequired);
    }

    // Skills Checklist Filter
    if (selectedSkills.length > 0) {
      result = result.filter(job => 
        selectedSkills.every(skill => 
          job.skillsRequired.some(s => s.toLowerCase() === skill.toLowerCase())
        )
      );
    }

    setFilteredJobs(result);
  }, [jobs, searchQuery, searchLocation, employmentType, experienceRequired, selectedSkills]);

  // Extract all unique skills across all jobs for a checklist filter
  const allSkills = Array.from(
    new Set(jobs.flatMap(j => j.skillsRequired))
  ).slice(0, 8);

  const toggleSkillSelection = (skill) => {
    setSelectedSkills(prev => 
      prev.includes(skill) ? prev.filter(s => s !== skill) : [...prev, skill]
    );
  };

  const handleApplyClick = () => {
    if (!userSession) {
      addToast('Please login to apply for this job.', 'warning');
      setAuthMode('login');
      setView('auth');
      return;
    }
    if (userSession.role !== 'candidate') {
      addToast('Only registered Candidates can apply for jobs.', 'error');
      return;
    }
    setIsApplyModalOpen(true);
  };

  const handleApplySubmit = (e) => {
    e.preventDefault();
    if (!fullName || !email || !resumeFile) {
      addToast('Name, Email, and Resume upload are required.', 'error');
      return;
    }

    setSubmittingApp(true);
    try {
      applyToJob({
        jobId: selectedJob.id,
        jobTitle: selectedJob.title,
        companyName: selectedJob.companyName,
        candidateId: userSession.id,
        candidateName: fullName,
        candidateEmail: email,
        candidatePhone: phone,
        candidateSkills: skillsStr.split(',').map(s => s.trim()).filter(Boolean),
        resumeName: resumeFile.name
      });

      addToast(`Application for ${selectedJob.title} submitted successfully!`, 'success');
      setIsApplyModalOpen(false);
      setSelectedJob(null);
    } catch (err) {
      addToast(err.message, 'error');
    } finally {
      setSubmittingApp(false);
    }
  };

  // Mock file selector change
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.type !== 'application/pdf' && !file.name.endsWith('.docx')) {
        addToast('Please upload a PDF or DOCX file.', 'error');
        return;
      }
      setResumeFile({ name: file.name, size: `${Math.round(file.size / 1024)} KB` });
      addToast(`Attached ${file.name}`, 'info');
    }
  };

  const clearFilters = () => {
    setSearchQuery('');
    setSearchLocation('');
    setEmploymentType('');
    setExperienceRequired('');
    setSelectedSkills([]);
    setFilters({ query: '', location: '', type: '', experience: '' });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8 animate-fade-in">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        
        {/* Left Side: Advanced Filters Panel */}
        <div className="lg:col-span-1 p-6 rounded-2xl border border-slate-900 bg-slate-900/30 glass h-fit space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-slate-200 uppercase tracking-wider font-outfit">Filters</h3>
            <button 
              onClick={clearFilters}
              className="text-xs font-semibold text-violet-400 hover:text-violet-300 transition-colors"
            >
              Clear All
            </button>
          </div>

          {/* Search Query */}
          <div className="space-y-2">
            <label className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Search Keywords</label>
            <div className="relative">
              <Search className="absolute left-3 inset-y-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Developer, Writer, etc..."
                className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-slate-800 bg-slate-950 text-xs text-slate-200 focus:border-violet-500 outline-none"
              />
            </div>
          </div>

          {/* Search Location */}
          <div className="space-y-2">
            <label className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Location</label>
            <div className="relative">
              <MapPin className="absolute left-3 inset-y-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
              <input
                type="text"
                value={searchLocation}
                onChange={(e) => setSearchLocation(e.target.value)}
                placeholder="Remote, London, etc..."
                className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-slate-800 bg-slate-950 text-xs text-slate-200 focus:border-violet-500 outline-none"
              />
            </div>
          </div>

          {/* Job Type Dropdown */}
          <div className="space-y-2">
            <label className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Employment Type</label>
            <select
              value={employmentType}
              onChange={(e) => setEmploymentType(e.target.value)}
              className="w-full px-3 py-2.5 rounded-xl border border-slate-800 bg-slate-950 text-xs text-slate-300 focus:border-violet-500 outline-none"
            >
              <option value="">All Types</option>
              <option value="Full-time">Full-time</option>
              <option value="Part-time">Part-time</option>
              <option value="Internship">Internship</option>
            </select>
          </div>

          {/* Experience Select */}
          <div className="space-y-2">
            <label className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Experience Level</label>
            <select
              value={experienceRequired}
              onChange={(e) => setExperienceRequired(e.target.value)}
              className="w-full px-3 py-2.5 rounded-xl border border-slate-800 bg-slate-950 text-xs text-slate-300 focus:border-violet-500 outline-none"
            >
              <option value="">All Levels</option>
              <option value="No Experience">No Experience</option>
              <option value="1-3 Years">1-3 Years</option>
              <option value="3+ Years">3+ Years</option>
              <option value="5+ Years">5+ Years</option>
            </select>
          </div>

          {/* Skills Checklist */}
          {allSkills.length > 0 && (
            <div className="space-y-3 pt-2">
              <label className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Filter by Skills</label>
              <div className="flex flex-col gap-2 max-h-40 overflow-y-auto pr-2">
                {allSkills.map((skill, idx) => (
                  <label key={idx} className="flex items-center gap-2 cursor-pointer text-xs text-slate-400 hover:text-slate-200">
                    <input
                      type="checkbox"
                      checked={selectedSkills.includes(skill)}
                      onChange={() => toggleSkillSelection(skill)}
                      className="rounded border-slate-800 text-violet-600 bg-slate-950 focus:ring-0 w-3.5 h-3.5"
                    />
                    <span>{skill}</span>
                  </label>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right Side: Jobs List */}
        <div className="lg:col-span-3 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold font-outfit text-slate-100">
              Open Positions ({filteredJobs.length})
            </h2>
            <span className="text-xs text-slate-500 font-semibold">
              Showing active postings
            </span>
          </div>

          {filteredJobs.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredJobs.map((job) => (
                <div
                  key={job.id}
                  onClick={() => setSelectedJob(job)}
                  className="p-6 rounded-2xl border border-slate-900 bg-slate-900/30 glass hover:border-slate-800 flex flex-col justify-between gap-6 cursor-pointer hover:-translate-y-0.5 transition-all duration-300 group"
                >
                  <div className="space-y-4">
                    <div className="flex justify-between items-start">
                      <span className="px-2.5 py-0.5 rounded-full border border-violet-500/20 bg-violet-500/5 text-violet-400 text-[10px] font-semibold uppercase tracking-wider">
                        {job.employmentType}
                      </span>
                      <span className="text-[10px] text-slate-500">Apply by {job.lastDate}</span>
                    </div>

                    <div>
                      <h3 className="text-lg font-bold text-slate-200 group-hover:text-violet-400 transition-colors font-outfit">
                        {job.title}
                      </h3>
                      <p className="text-xs font-semibold text-slate-400 mt-0.5">{job.companyName}</p>
                    </div>

                    <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500">
                      <div className="flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5" />
                        <span>{job.location}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Briefcase className="w-3.5 h-3.5" />
                        <span>{job.experienceRequired}</span>
                      </div>
                    </div>

                    {/* Skill Tags */}
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {job.skillsRequired.map((skill, idx) => (
                        <span key={idx} className="px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-[10px] text-slate-400">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="pt-4 border-t border-slate-900/50 flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-300 font-outfit">{job.salary || 'Salary Disclosed'}</span>
                    <span className="text-[11px] font-semibold text-violet-400 group-hover:underline flex items-center gap-0.5">
                      View Details
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-12 text-center rounded-2xl border border-dashed border-slate-800 space-y-3 bg-slate-900/10">
              <div className="w-12 h-12 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-center mx-auto text-slate-600">
                <Briefcase className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-slate-400">No Job Postings Found</h3>
              <p className="text-xs text-slate-600 max-w-sm mx-auto">
                No active listings match your current filters. Try expanding your search queries or clearing criteria.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* 1. Job Details Modal */}
      {selectedJob && (
        <Modal 
          isOpen={true} 
          onClose={() => setSelectedJob(null)} 
          title="Job Description Details"
        >
          <div className="space-y-6 text-left">
            <div className="space-y-3">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <h2 className="text-2xl font-bold font-outfit text-slate-200">{selectedJob.title}</h2>
                <span className="px-2.5 py-0.5 rounded-full border border-violet-500/20 bg-violet-500/5 text-violet-400 text-xs font-semibold uppercase tracking-wider">
                  {selectedJob.employmentType}
                </span>
              </div>
              <p className="text-sm font-semibold text-slate-400">{selectedJob.companyName}</p>
            </div>

            {/* Meta Cards Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 rounded-xl border border-slate-800 bg-slate-950/40">
              <div className="space-y-1">
                <span className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold">Location</span>
                <div className="flex items-center gap-1 text-slate-300 text-xs font-bold font-outfit">
                  <MapPin className="w-3.5 h-3.5 text-violet-400" />
                  <span>{selectedJob.location}</span>
                </div>
              </div>
              <div className="space-y-1">
                <span className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold">Experience</span>
                <div className="flex items-center gap-1 text-slate-300 text-xs font-bold font-outfit">
                  <Award className="w-3.5 h-3.5 text-violet-400" />
                  <span>{selectedJob.experienceRequired}</span>
                </div>
              </div>
              <div className="space-y-1">
                <span className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold">Salary</span>
                <div className="flex items-center gap-1 text-slate-300 text-xs font-bold font-outfit">
                  <DollarSign className="w-3.5 h-3.5 text-violet-400" />
                  <span>{selectedJob.salary || 'Undisclosed'}</span>
                </div>
              </div>
              <div className="space-y-1">
                <span className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold">Apply Before</span>
                <div className="flex items-center gap-1 text-slate-300 text-xs font-bold font-outfit">
                  <Calendar className="w-3.5 h-3.5 text-violet-400" />
                  <span>{selectedJob.lastDate}</span>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Job Description</h4>
              <p className="text-xs text-slate-400 leading-relaxed whitespace-pre-line">
                {selectedJob.description}
              </p>
            </div>

            {/* Skills Required */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Skills & Requirements</h4>
              <div className="flex flex-wrap gap-2">
                {selectedJob.skillsRequired.map((skill, idx) => (
                  <span key={idx} className="px-3 py-1 rounded-lg bg-slate-950 border border-slate-800 text-xs text-slate-400">
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Footer Apply Trigger */}
            <div className="pt-6 border-t border-slate-800 flex justify-end gap-3">
              <button
                onClick={() => setSelectedJob(null)}
                className="px-5 py-2.5 rounded-xl border border-slate-800 hover:bg-slate-800 text-slate-400 hover:text-slate-200 text-xs font-semibold"
              >
                Close
              </button>
              <button
                onClick={handleApplyClick}
                className="px-6 py-2.5 rounded-xl bg-violet-600 hover:bg-violet-500 text-white text-xs font-semibold shadow-lg"
              >
                Apply for Job
              </button>
            </div>
          </div>
        </Modal>
      )}

      {/* 2. Apply for Job Form Modal */}
      {isApplyModalOpen && selectedJob && (
        <Modal
          isOpen={true}
          onClose={() => setIsApplyModalOpen(false)}
          title={`Job Application: ${selectedJob.title}`}
        >
          <form onSubmit={handleApplySubmit} className="space-y-6 text-left">
            <p className="text-xs text-slate-500 leading-relaxed font-semibold">
              Apply to <span className="text-slate-300 font-bold">{selectedJob.companyName}</span>. Your contact details, qualification summaries, and skills will be pre-filled from your profile data if completed.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">Full Name *</label>
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Jane Doe"
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-800 bg-slate-950 text-xs text-slate-200 focus:border-violet-500 outline-none"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">Email Address *</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="candidate@demo.com"
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-800 bg-slate-950 text-xs text-slate-200 focus:border-violet-500 outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">Phone Number</label>
                <input
                  type="text"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+1 (555) 123-4567"
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-800 bg-slate-950 text-xs text-slate-200 focus:border-violet-500 outline-none"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">Location</label>
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="Seattle, WA"
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-800 bg-slate-950 text-xs text-slate-200 focus:border-violet-500 outline-none"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">Qualifications Summary</label>
              <input
                type="text"
                value={qualification}
                onChange={(e) => setQualification(e.target.value)}
                placeholder="Bachelor's in Computer Science"
                className="w-full px-4 py-2.5 rounded-xl border border-slate-800 bg-slate-950 text-xs text-slate-200 focus:border-violet-500 outline-none"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">Experience Summary</label>
              <textarea
                rows={2}
                value={experience}
                onChange={(e) => setExperience(e.target.value)}
                placeholder="3 years as Frontend Developer at WebLabs..."
                className="w-full px-4 py-2.5 rounded-xl border border-slate-800 bg-slate-950 text-xs text-slate-200 focus:border-violet-500 outline-none resize-none"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">Skills (Comma-separated)</label>
              <input
                type="text"
                value={skillsStr}
                onChange={(e) => setSkillsStr(e.target.value)}
                placeholder="React, JavaScript, Tailwind CSS"
                className="w-full px-4 py-2.5 rounded-xl border border-slate-800 bg-slate-950 text-xs text-slate-200 focus:border-violet-500 outline-none"
              />
            </div>

            {/* Resume Selection */}
            <div className="space-y-3">
              <label className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">Select Resume Option *</label>
              
              {profileResumeName ? (
                <div className="flex flex-col gap-2 p-3 rounded-xl border border-slate-800 bg-slate-950/60">
                  <label className="flex items-center gap-2 cursor-pointer text-xs text-slate-300">
                    <input
                      type="radio"
                      name="resumeOption"
                      checked={useProfileResume === true}
                      onChange={() => {
                        setUseProfileResume(true);
                        setResumeFile({ name: profileResumeName, size: profileResumeSize });
                      }}
                      className="text-violet-600 bg-slate-950 border-slate-800 focus:ring-0 w-3.5 h-3.5"
                    />
                    <span>Use default profile resume ({profileResumeName})</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer text-xs text-slate-300">
                    <input
                      type="radio"
                      name="resumeOption"
                      checked={useProfileResume === false}
                      onChange={() => {
                        setUseProfileResume(false);
                        setResumeFile(null);
                      }}
                      className="text-violet-600 bg-slate-950 border-slate-800 focus:ring-0 w-3.5 h-3.5"
                    />
                    <span>Upload a different resume for this job</span>
                  </label>
                </div>
              ) : (
                <span className="text-[10px] text-slate-500 italic block">No default profile resume found. Please upload a resume below.</span>
              )}

              {/* Upload field rendered if not using profile resume */}
              {(!profileResumeName || !useProfileResume) && (
                <div className="space-y-2">
                  {resumeFile && resumeFile.name !== profileResumeName ? (
                    <div className="p-4 rounded-xl border border-emerald-500/20 bg-emerald-500/5 flex items-center justify-between">
                      <div className="flex items-center gap-2 text-xs text-emerald-400">
                        <FileText className="w-5 h-5 shrink-0" />
                        <div className="flex flex-col text-left">
                          <span className="font-bold">{resumeFile.name}</span>
                          <span className="text-[10px] text-slate-500">{resumeFile.size}</span>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => setResumeFile(null)}
                        className="p-1 rounded-lg hover:bg-slate-900 text-slate-400 hover:text-slate-200"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ) : (
                    <div className="border-2 border-dashed border-slate-800 rounded-xl p-6 text-center hover:border-violet-500/50 hover:bg-violet-500/5 transition-all relative">
                      <input
                        type="file"
                        accept=".pdf,.docx,application/pdf"
                        onChange={handleFileChange}
                        className="absolute inset-0 opacity-0 cursor-pointer"
                      />
                      <FileText className="w-8 h-8 text-slate-600 mx-auto mb-2" />
                      <span className="block text-xs font-bold text-slate-400">Drag or Click to upload custom resume file</span>
                      <span className="block text-[10px] text-slate-600 mt-1">Accepts PDF or DOCX formats up to 10MB</span>
                    </div>
                  )}
                </div>
              )}
              
              {profileResumeName && useProfileResume && (
                <div className="p-3.5 rounded-xl border border-emerald-500/20 bg-emerald-500/5 flex items-center gap-2.5 text-xs text-emerald-400 animate-fade-in">
                  <FileText className="w-5 h-5 shrink-0" />
                  <div>
                    <span className="font-bold">{profileResumeName}</span>
                    <span className="block text-[10px] text-slate-500">{profileResumeSize} • Profile Resume Selected</span>
                  </div>
                </div>
              )}
            </div>

            {/* Form Actions */}
            <div className="pt-4 border-t border-slate-800 flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setIsApplyModalOpen(false)}
                className="px-5 py-2.5 rounded-xl border border-slate-800 hover:bg-slate-800 text-slate-400 hover:text-slate-200 text-xs font-semibold cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={submittingApp}
                className="px-6 py-2.5 rounded-xl bg-violet-600 hover:bg-violet-500 disabled:bg-violet-600/50 text-white text-xs font-semibold shadow-lg cursor-pointer"
              >
                {submittingApp ? 'Submitting...' : 'Submit Application'}
              </button>
            </div>

          </form>
        </Modal>
      )}

    </div>
  );
}
