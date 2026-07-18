// Simulated LocalStorage Database Manager for Job Portal App

const KEYS = {
  JOBS: 'tb_jobs',
  CANDIDATES: 'tb_candidates',
  EMPLOYERS: 'tb_employers',
  APPLICATIONS: 'tb_applications',
  SESSION: 'tb_session'
};

const DEFAULT_JOBS = [
  {
    id: 'job-1',
    title: 'Senior React Developer',
    companyName: 'TechCorp',
    employerId: 'emp-1',
    location: 'Remote (US)',
    employmentType: 'Full-time',
    experienceRequired: '5+ Years',
    salary: '$120,000 - $140,000',
    description: 'We are looking for a Senior React Developer who is passionate about creating clean, scalable user interfaces. You will collaborate with product designers and engineers to build a premium cloud experience. Responsibilities include mentoring junior developers and optimizing app load times.',
    skillsRequired: ['React', 'JavaScript', 'Tailwind CSS', 'TypeScript', 'Redux Toolkit'],
    lastDate: '2026-09-15',
    status: 'open'
  },
  {
    id: 'job-2',
    title: 'Junior UI/UX Designer',
    companyName: 'CreativeStream',
    employerId: 'emp-2',
    location: 'New York, NY',
    employmentType: 'Full-time',
    experienceRequired: '1-3 Years',
    salary: '$70,000 - $85,000',
    description: 'CreativeStream is seeking an enthusiastic Junior UI/UX Designer to design modern digital products. You will work on layout design, typography, wireframing, and interactive prototypes. Knowledge of Figma is required.',
    skillsRequired: ['Figma', 'UI Design', 'Wireframing', 'Prototyping', 'Adobe Illustrator'],
    lastDate: '2026-08-30',
    status: 'open'
  },
  {
    id: 'job-3',
    title: 'Frontend Engineering Intern',
    companyName: 'TechCorp',
    employerId: 'emp-1',
    location: 'San Francisco, CA',
    employmentType: 'Internship',
    experienceRequired: 'No Experience',
    salary: '$35 - $45 / hour',
    description: 'Join the TechCorp team as a Frontend Engineering Intern. You will get hands-on experience working on production features using React and Tailwind CSS. Mentorship will be provided by senior engineers.',
    skillsRequired: ['HTML', 'CSS', 'JavaScript', 'React', 'Git'],
    lastDate: '2026-08-10',
    status: 'open'
  },
  {
    id: 'job-4',
    title: 'Product Marketing Manager',
    companyName: 'GrowthScale',
    employerId: 'emp-3',
    location: 'Chicago, IL',
    employmentType: 'Full-time',
    experienceRequired: '3+ Years',
    salary: '$95,000 - $110,000',
    description: 'We are seeking a Product Marketing Manager to scale our digital campaigns. You will coordinate product launches, direct content strategy, optimize SEO, and lead user acquisition strategies.',
    skillsRequired: ['SEO', 'Content Strategy', 'Copywriting', 'Product Marketing', 'Google Analytics'],
    lastDate: '2026-10-01',
    status: 'open'
  },
  {
    id: 'job-5',
    title: 'Full Stack Engineer (Node/React)',
    companyName: 'Innovate Solutions',
    employerId: 'emp-2',
    location: 'Remote (Global)',
    employmentType: 'Full-time',
    experienceRequired: '3+ Years',
    salary: '$100,000 - $125,000',
    description: 'Looking for a developer comfortable with both React and Node.js. You will design, build, and support database schemas and frontend layouts. Excellent system architecture understanding is a plus.',
    skillsRequired: ['Node.js', 'Express.js', 'React', 'MongoDB', 'PostgreSQL', 'REST APIs'],
    lastDate: '2026-06-30', // Passed date to simulate closed/expiring check
    status: 'open'
  }
];

const DEFAULT_CANDIDATES = [
  {
    id: 'cand-1',
    name: 'Jane Doe',
    email: 'candidate@demo.com',
    password: 'password',
    phone: '+1 (555) 123-4567',
    location: 'Seattle, WA',
    qualification: 'Bachelor\'s in Computer Science',
    experience: '3 years as Frontend Developer at WebLabs, building interactive React interfaces.',
    skills: ['React', 'JavaScript', 'Tailwind CSS', 'TypeScript', 'Git'],
    resumeName: 'Jane_Doe_Resume.pdf',
    resumeSize: '154 KB'
  },
  {
    id: 'cand-2',
    name: 'Alex Rivera',
    email: 'alex@demo.com',
    password: 'password',
    phone: '+1 (555) 987-6543',
    location: 'Los Angeles, CA',
    qualification: 'Diploma in UI/UX Design',
    experience: '2 years of freelance design work for SaaS products.',
    skills: ['Figma', 'UI Design', 'Wireframing', 'Prototyping'],
    resumeName: 'Alex_Rivera_Portfolio.pdf',
    resumeSize: '320 KB'
  }
];

const DEFAULT_EMPLOYERS = [
  {
    id: 'emp-1',
    companyName: 'TechCorp',
    email: 'employer@demo.com',
    password: 'password',
    logo: 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?auto=format&fit=crop&w=120&h=120&q=80',
    industry: 'Information Technology',
    description: 'TechCorp is an international software company building next-generation productivity suites and enterprise infrastructure tools.',
    website: 'https://techcorp.example.com',
    location: 'San Francisco, CA'
  },
  {
    id: 'emp-2',
    companyName: 'Innovate Solutions',
    email: 'innovate@demo.com',
    password: 'password',
    logo: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=120&h=120&q=80',
    industry: 'Software Consulting',
    description: 'Innovate Solutions designs, consults, and integrates custom digital web products for growing startups.',
    website: 'https://innovate.example.com',
    location: 'New York, NY'
  }
];

const DEFAULT_APPLICATIONS = [
  {
    id: 'app-1',
    jobId: 'job-1',
    jobTitle: 'Senior React Developer',
    companyName: 'TechCorp',
    candidateId: 'cand-1',
    candidateName: 'Jane Doe',
    candidateEmail: 'candidate@demo.com',
    candidatePhone: '+1 (555) 123-4567',
    candidateSkills: ['React', 'JavaScript', 'Tailwind CSS', 'TypeScript', 'Git'],
    resumeName: 'Jane_Doe_Resume.pdf',
    status: 'Under Review',
    appliedDate: '2026-07-15'
  },
  {
    id: 'app-2',
    jobId: 'job-2',
    jobTitle: 'Junior UI/UX Designer',
    companyName: 'CreativeStream',
    candidateId: 'cand-2',
    candidateName: 'Alex Rivera',
    candidateEmail: 'alex@demo.com',
    candidatePhone: '+1 (555) 987-6543',
    candidateSkills: ['Figma', 'UI Design', 'Wireframing', 'Prototyping'],
    resumeName: 'Alex_Rivera_Portfolio.pdf',
    status: 'Interviewing',
    appliedDate: '2026-07-16'
  }
];

// Helper database initialization
export const initializeDB = () => {
  if (!localStorage.getItem(KEYS.JOBS)) {
    localStorage.setItem(KEYS.JOBS, JSON.stringify(DEFAULT_JOBS));
  }
  if (!localStorage.getItem(KEYS.CANDIDATES)) {
    localStorage.setItem(KEYS.CANDIDATES, JSON.stringify(DEFAULT_CANDIDATES));
  }
  if (!localStorage.getItem(KEYS.EMPLOYERS)) {
    localStorage.setItem(KEYS.EMPLOYERS, JSON.stringify(DEFAULT_EMPLOYERS));
  }
  if (!localStorage.getItem(KEYS.APPLICATIONS)) {
    localStorage.setItem(KEYS.APPLICATIONS, JSON.stringify(DEFAULT_APPLICATIONS));
  }
};

// Jobs Operations
export const getJobs = () => {
  initializeDB();
  return JSON.parse(localStorage.getItem(KEYS.JOBS)) || [];
};

export const saveJob = (job) => {
  const jobs = getJobs();
  if (job.id) {
    // Edit existing
    const idx = jobs.findIndex(j => j.id === job.id);
    if (idx !== -1) {
      jobs[idx] = { ...jobs[idx], ...job };
    }
  } else {
    // Create new
    job.id = 'job-' + Date.now();
    job.status = 'open';
    jobs.push(job);
  }
  localStorage.setItem(KEYS.JOBS, JSON.stringify(jobs));
  return job;
};

export const deleteJob = (jobId) => {
  const jobs = getJobs();
  const filtered = jobs.filter(j => j.id !== jobId);
  localStorage.setItem(KEYS.JOBS, JSON.stringify(filtered));

  // Also remove applications for this job
  const apps = getApplications();
  const filteredApps = apps.filter(a => a.jobId !== jobId);
  localStorage.setItem(KEYS.APPLICATIONS, JSON.stringify(filteredApps));
};

// Candidates Operations
export const getCandidates = () => {
  initializeDB();
  return JSON.parse(localStorage.getItem(KEYS.CANDIDATES)) || [];
};

export const saveCandidateProfile = (candidateId, updatedProfile) => {
  const candidates = getCandidates();
  const idx = candidates.findIndex(c => c.id === candidateId);
  if (idx !== -1) {
    candidates[idx] = { ...candidates[idx], ...updatedProfile };
    localStorage.setItem(KEYS.CANDIDATES, JSON.stringify(candidates));
    
    // Also update profile information on existing applications
    const apps = getApplications();
    const updatedApps = apps.map(app => {
      if (app.candidateId === candidateId) {
        return {
          ...app,
          candidateName: updatedProfile.name,
          candidateEmail: updatedProfile.email,
          candidatePhone: updatedProfile.phone,
          candidateSkills: updatedProfile.skills || app.candidateSkills,
          resumeName: updatedProfile.resumeName || app.resumeName
        };
      }
      return app;
    });
    localStorage.setItem(KEYS.APPLICATIONS, JSON.stringify(updatedApps));
    return candidates[idx];
  }
  return null;
};

export const deleteCandidate = (candidateId) => {
  const candidates = getCandidates();
  const filtered = candidates.filter(c => c.id !== candidateId);
  localStorage.setItem(KEYS.CANDIDATES, JSON.stringify(filtered));

  // Remove candidate applications
  const apps = getApplications();
  const filteredApps = apps.filter(a => a.candidateId !== candidateId);
  localStorage.setItem(KEYS.APPLICATIONS, JSON.stringify(filteredApps));
};

// Employers Operations
export const getEmployers = () => {
  initializeDB();
  return JSON.parse(localStorage.getItem(KEYS.EMPLOYERS)) || [];
};

export const saveEmployerProfile = (employerId, updatedProfile) => {
  const employers = getEmployers();
  const idx = employers.findIndex(e => e.id === employerId);
  if (idx !== -1) {
    employers[idx] = { ...employers[idx], ...updatedProfile };
    localStorage.setItem(KEYS.EMPLOYERS, JSON.stringify(employers));
    
    // Also update company name in posted jobs
    const jobs = getJobs();
    const updatedJobs = jobs.map(job => {
      if (job.employerId === employerId) {
        return { ...job, companyName: updatedProfile.companyName };
      }
      return job;
    });
    localStorage.setItem(KEYS.JOBS, JSON.stringify(updatedJobs));

    // Also update company name in applications
    const apps = getApplications();
    const updatedApps = apps.map(app => {
      const job = updatedJobs.find(j => j.id === app.jobId);
      if (job) {
        return { ...app, companyName: job.companyName };
      }
      return app;
    });
    localStorage.setItem(KEYS.APPLICATIONS, JSON.stringify(updatedApps));

    return employers[idx];
  }
  return null;
};

export const deleteEmployer = (employerId) => {
  const employers = getEmployers();
  const filtered = employers.filter(e => e.id !== employerId);
  localStorage.setItem(KEYS.EMPLOYERS, JSON.stringify(filtered));

  // Delete jobs posted by this employer
  const jobs = getJobs();
  const remainingJobs = jobs.filter(j => j.employerId !== employerId);
  localStorage.setItem(KEYS.JOBS, JSON.stringify(remainingJobs));

  // Delete applications for those jobs
  const apps = getApplications();
  const remainingApps = apps.filter(app => {
    const isJobDeleted = !remainingJobs.some(j => j.id === app.jobId);
    return !isJobDeleted;
  });
  localStorage.setItem(KEYS.APPLICATIONS, JSON.stringify(remainingApps));
};

// Applications Operations
export const getApplications = () => {
  initializeDB();
  return JSON.parse(localStorage.getItem(KEYS.APPLICATIONS)) || [];
};

export const applyToJob = (application) => {
  const apps = getApplications();
  
  // Prevent duplicate application
  const exists = apps.some(a => a.jobId === application.jobId && a.candidateId === application.candidateId);
  if (exists) {
    throw new Error('You have already applied for this job.');
  }

  application.id = 'app-' + Date.now();
  application.status = 'Applied';
  application.appliedDate = new Date().toISOString().split('T')[0];
  apps.push(application);
  localStorage.setItem(KEYS.APPLICATIONS, JSON.stringify(apps));
  return application;
};

export const updateApplicationStatus = (appId, status) => {
  const apps = getApplications();
  const idx = apps.findIndex(a => a.id === appId);
  if (idx !== -1) {
    apps[idx].status = status;
    localStorage.setItem(KEYS.APPLICATIONS, JSON.stringify(apps));
    return apps[idx];
  }
  return null;
};

// Auth operations
export const login = (email, password, role) => {
  initializeDB();
  
  // Admin Login
  if (role === 'admin') {
    if (email === 'admin@demo.com' && password === 'admin') {
      const session = { id: 'admin', role: 'admin', name: 'System Administrator', email: 'admin@demo.com' };
      localStorage.setItem(KEYS.SESSION, JSON.stringify(session));
      return session;
    }
    throw new Error('Invalid Admin credentials.');
  }

  // Candidate Login
  if (role === 'candidate') {
    const candidates = getCandidates();
    const user = candidates.find(c => c.email.toLowerCase() === email.toLowerCase());
    if (user && user.password === password) {
      const session = { id: user.id, role: 'candidate', name: user.name, email: user.email };
      localStorage.setItem(KEYS.SESSION, JSON.stringify(session));
      return session;
    }
    throw new Error('Invalid Candidate credentials.');
  }

  // Employer Login
  if (role === 'employer') {
    const employers = getEmployers();
    const user = employers.find(e => e.email.toLowerCase() === email.toLowerCase());
    if (user && user.password === password) {
      const session = { id: user.id, role: 'employer', name: user.companyName, email: user.email };
      localStorage.setItem(KEYS.SESSION, JSON.stringify(session));
      return session;
    }
    throw new Error('Invalid Employer credentials.');
  }

  throw new Error('Unknown Role specified.');
};

export const register = (userData, role) => {
  initializeDB();
  
  if (role === 'candidate') {
    const candidates = getCandidates();
    if (candidates.some(c => c.email.toLowerCase() === userData.email.toLowerCase())) {
      throw new Error('An account with this email already exists.');
    }
    const newCandidate = {
      id: 'cand-' + Date.now(),
      name: userData.name,
      email: userData.email,
      password: userData.password,
      phone: userData.phone || '',
      location: userData.location || '',
      qualification: userData.qualification || '',
      experience: userData.experience || '',
      skills: userData.skills || [],
      resumeName: '',
      resumeSize: ''
    };
    candidates.push(newCandidate);
    localStorage.setItem(KEYS.CANDIDATES, JSON.stringify(candidates));
    
    // Auto-login
    const session = { id: newCandidate.id, role: 'candidate', name: newCandidate.name, email: newCandidate.email };
    localStorage.setItem(KEYS.SESSION, JSON.stringify(session));
    return session;
  }

  if (role === 'employer') {
    const employers = getEmployers();
    if (employers.some(e => e.email.toLowerCase() === userData.email.toLowerCase())) {
      throw new Error('An account with this email already exists.');
    }
    const newEmployer = {
      id: 'emp-' + Date.now(),
      companyName: userData.companyName,
      email: userData.email,
      password: userData.password,
      logo: userData.logo || 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=120&h=120&q=80',
      industry: userData.industry || '',
      description: userData.description || '',
      website: userData.website || '',
      location: userData.location || ''
    };
    employers.push(newEmployer);
    localStorage.setItem(KEYS.EMPLOYERS, JSON.stringify(employers));
    
    // Auto-login
    const session = { id: newEmployer.id, role: 'employer', name: newEmployer.companyName, email: newEmployer.email };
    localStorage.setItem(KEYS.SESSION, JSON.stringify(session));
    return session;
  }

  throw new Error('Unknown Role specified.');
};

export const getSession = () => {
  return JSON.parse(localStorage.getItem(KEYS.SESSION)) || null;
};

export const logout = () => {
  localStorage.removeItem(KEYS.SESSION);
};
