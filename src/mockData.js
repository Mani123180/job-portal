// Simulated LocalStorage Database Manager for Job Portal App

const KEYS = {
  JOBS: 'tb_jobs_in',
  CANDIDATES: 'tb_candidates_in',
  EMPLOYERS: 'tb_employers_in',
  APPLICATIONS: 'tb_applications_in',
  SESSION: 'tb_session'
};

const DEFAULT_JOBS = [
  {
    id: 'job-1',
    title: 'Senior React Developer',
    companyName: 'Zoho Corporation',
    employerId: 'emp-1',
    location: 'Chennai, Tamil Nadu',
    employmentType: 'Full-time',
    experienceRequired: '5+ Years',
    salary: '₹12,00,000 - ₹16,00,000 / year',
    description: 'We are seeking a Senior React Developer to join Zoho Corporation. You will design, build, and optimize SaaS dashboard modules. You will collaborate with design teams in Estancia IT Park, Chennai, and help mentor junior web engineers.',
    skillsRequired: ['React', 'JavaScript', 'Tailwind CSS', 'TypeScript', 'Redux Toolkit'],
    lastDate: '2026-09-15',
    status: 'open'
  },
  {
    id: 'job-2',
    title: 'Junior UI/UX Designer',
    companyName: 'Freshworks',
    employerId: 'emp-3',
    location: 'Chennai, Tamil Nadu',
    employmentType: 'Full-time',
    experienceRequired: '1-3 Years',
    salary: '₹6,00,000 - ₹8,00,000 / year',
    description: 'Freshworks is seek a creative Junior UI/UX Designer in Chennai. You will build user journey diagrams, wireframe responsive screens, and design mock components in Figma.',
    skillsRequired: ['Figma', 'UI Design', 'Wireframing', 'Prototyping', 'Adobe Illustrator'],
    lastDate: '2026-08-30',
    status: 'open'
  },
  {
    id: 'job-3',
    title: 'Frontend Engineering Intern',
    companyName: 'Zoho Corporation',
    employerId: 'emp-1',
    location: 'Guindy, Chennai',
    employmentType: 'Internship',
    experienceRequired: 'No Experience',
    salary: '₹25,000 - ₹35,000 / month',
    description: 'Kickstart your web developer journey with Zoho. You will receive direct guidance from tech leads, write React features, and work in our Chennai collaborative workspaces.',
    skillsRequired: ['HTML', 'CSS', 'JavaScript', 'React', 'Git'],
    lastDate: '2026-08-10',
    status: 'open'
  },
  {
    id: 'job-4',
    title: 'Product Marketing Manager',
    companyName: 'Razorpay',
    employerId: 'emp-4',
    location: 'Whitefield, Bengaluru',
    employmentType: 'Full-time',
    experienceRequired: '3+ Years',
    salary: '₹10,00,000 - ₹14,00,000 / year',
    description: 'Razorpay is scaling its digital payment gateways. We seek a Product Marketing lead to build acquisition funnels, run SEO campaigns, and coordinate with our Bengaluru team.',
    skillsRequired: ['SEO', 'Content Strategy', 'Copywriting', 'Product Marketing', 'Google Analytics'],
    lastDate: '2026-10-01',
    status: 'open'
  },
  {
    id: 'job-5',
    title: 'Full Stack Engineer (Node/React)',
    companyName: 'Infosys Limited',
    employerId: 'emp-2',
    location: 'Electronic City, Bengaluru',
    employmentType: 'Full-time',
    experienceRequired: '3+ Years',
    salary: '₹8,50,000 - ₹11,00,000 / year',
    description: 'Looking for a developer comfortable with both React and Node.js. You will design, build, and support database schemas and frontend layouts at our Infosys Electronic City campus.',
    skillsRequired: ['Node.js', 'Express.js', 'React', 'MongoDB', 'PostgreSQL', 'REST APIs'],
    lastDate: '2026-06-30',
    status: 'open'
  }
];

const DEFAULT_CANDIDATES = [
  {
    id: 'cand-1',
    name: 'Karthik Raja',
    email: 'candidate@demo.com',
    password: 'password',
    phone: '+91 98401 23456',
    location: 'Adyar, Chennai',
    qualification: 'B.E. in Computer Science - Anna University',
    experience: '3 years as Frontend Developer at WebLabs, building interactive React interfaces.',
    skills: ['React', 'JavaScript', 'Tailwind CSS', 'TypeScript', 'Git'],
    resumeName: 'Karthik_Raja_Resume.pdf',
    resumeSize: '154 KB'
  },
  {
    id: 'cand-2',
    name: 'Priyanka Sen',
    email: 'alex@demo.com',
    password: 'password',
    phone: '+91 80560 98765',
    location: 'Hebbal, Bengaluru',
    qualification: 'B.Tech in Information Technology - PES University',
    experience: '2 years of freelance design work for SaaS products.',
    skills: ['Figma', 'UI Design', 'Wireframing', 'Prototyping'],
    resumeName: 'Priyanka_Sen_Portfolio.pdf',
    resumeSize: '320 KB'
  }
];

const DEFAULT_EMPLOYERS = [
  {
    id: 'emp-1',
    companyName: 'Zoho Corporation',
    email: 'employer@demo.com',
    password: 'password',
    logo: 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?auto=format&fit=crop&w=120&h=120&q=80',
    industry: 'Cloud Software & SaaS',
    description: 'Zoho Corporation is a leading technology company building comprehensive operating suites for businesses, operated from Chennai and rural Tenkasi.',
    website: 'https://zoho.com',
    location: 'Chennai, Tamil Nadu'
  },
  {
    id: 'emp-2',
    companyName: 'Infosys Limited',
    email: 'innovate@demo.com',
    password: 'password',
    logo: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=120&h=120&q=80',
    industry: 'IT Services & Consulting',
    description: 'Infosys is a global leader in next-generation digital services and consulting, headquartered in Bengaluru.',
    website: 'https://infosys.com',
    location: 'Bengaluru, Karnataka'
  }
];

const DEFAULT_APPLICATIONS = [
  {
    id: 'app-1',
    jobId: 'job-1',
    jobTitle: 'Senior React Developer',
    companyName: 'Zoho Corporation',
    candidateId: 'cand-1',
    candidateName: 'Karthik Raja',
    candidateEmail: 'candidate@demo.com',
    candidatePhone: '+91 98401 23456',
    candidateSkills: ['React', 'JavaScript', 'Tailwind CSS', 'TypeScript', 'Git'],
    resumeName: 'Karthik_Raja_Resume.pdf',
    status: 'Under Review',
    appliedDate: '2026-07-15'
  },
  {
    id: 'app-2',
    jobId: 'job-2',
    jobTitle: 'Junior UI/UX Designer',
    companyName: 'Freshworks',
    candidateId: 'cand-2',
    candidateName: 'Priyanka Sen',
    candidateEmail: 'alex@demo.com',
    candidatePhone: '+91 80560 98765',
    candidateSkills: ['Figma', 'UI Design', 'Wireframing', 'Prototyping'],
    resumeName: 'Priyanka_Sen_Portfolio.pdf',
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
