import React, { useState } from 'react';
import { Briefcase, Menu, X, LogOut, LayoutDashboard, ChevronDown, ChevronUp, ArrowLeft } from 'lucide-react';

export default function Navbar({ currentView, setView, userSession, onLogout, setAuthMode, setSubSection, setJobFilters }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  // Mobile accordion states
  const [mobileCompaniesOpen, setMobileCompaniesOpen] = useState(false);
  const [mobileCoachingOpen, setMobileCoachingOpen] = useState(false);
  const [mobileMentorshipOpen, setMobileMentorshipOpen] = useState(false);

  const handleLinkClick = (viewId, sectionId = '') => {
    setView(viewId);
    if (setSubSection) {
      setSubSection(sectionId);
    }
    setMobileMenuOpen(false);
  };

  const handleJobsClick = () => {
    if (setJobFilters) {
      setJobFilters({ query: '', location: '', type: '', experience: '' });
    }
    handleLinkClick('jobs');
  };

  const handleInternshipsClick = () => {
    if (setJobFilters) {
      setJobFilters({ query: '', location: '', type: 'Internship', experience: '' });
    }
    handleLinkClick('jobs');
  };

  const handleAuthClick = (mode) => {
    setAuthMode(mode);
    setView('auth');
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-30 w-full border-b border-slate-200 bg-white/95 backdrop-blur-md shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center cursor-pointer select-none" onClick={() => handleLinkClick('home')}>
            <div className="flex items-center gap-2.5">
              <div className="p-2 bg-gradient-to-tr from-violet-600 to-indigo-600 rounded-xl shadow-lg">
                <Briefcase className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent font-outfit">
                Job Portal
              </span>
            </div>
          </div>

          {/* Desktop Nav Links (Ordered: Home, About Us, Jobs, Internships, Companies, Coaching, Mentorship) */}
          {!userSession && (
            <nav className="hidden md:flex items-center space-x-1">
              {/* Home */}
              <button
                onClick={() => handleLinkClick('home')}
                className={`px-3 py-2 rounded-lg text-sm font-semibold transition-all cursor-pointer bg-transparent border-transparent ${
                  currentView === 'home'
                    ? 'text-violet-600'
                    : 'text-slate-900 hover:text-violet-600'
                }`}
              >
                Home
              </button>

              {/* About Us */}
              <button
                onClick={() => handleLinkClick('about')}
                className={`px-3 py-2 rounded-lg text-sm font-semibold transition-all cursor-pointer bg-transparent border-transparent ${
                  currentView === 'about'
                    ? 'text-violet-600'
                    : 'text-slate-900 hover:text-violet-600'
                }`}
              >
                About Us
              </button>

              {/* Jobs */}
              <button
                onClick={handleJobsClick}
                className={`px-3 py-2 rounded-lg text-sm font-semibold transition-all cursor-pointer bg-transparent border-transparent ${
                  currentView === 'jobs'
                    ? 'text-violet-600'
                    : 'text-slate-900 hover:text-violet-600'
                }`}
              >
                Jobs
              </button>

              {/* Internships */}
              <button
                onClick={handleInternshipsClick}
                className="px-3 py-2 rounded-lg text-sm font-semibold transition-all cursor-pointer bg-transparent border-transparent text-slate-900 hover:text-violet-600"
              >
                Internships
              </button>

              {/* Companies Dropdown */}
              <div className="relative group inline-block">
                <button
                  onClick={() => handleLinkClick('companies', 'stories')}
                  className={`flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-semibold transition-all cursor-pointer bg-transparent border-transparent ${
                    currentView === 'companies'
                      ? 'text-violet-600'
                      : 'text-slate-900 hover:text-violet-600'
                  }`}
                >
                  <span>Companies</span>
                  <ChevronDown className="w-3.5 h-3.5 opacity-60" />
                </button>
                <div className="absolute left-0 mt-1 w-52 rounded-xl bg-white border border-slate-200 p-2 shadow-xl invisible group-hover:visible opacity-0 group-hover:opacity-100 transition-all duration-200 z-50 flex flex-col gap-0.5">
                  <button
                    onClick={() => handleLinkClick('companies', 'stories')}
                    className="w-full text-left px-4 py-2.5 text-xs font-semibold rounded-lg text-slate-900 hover:text-violet-600 hover:bg-slate-50 transition-all bg-transparent border-transparent"
                  >
                    Company Stories
                  </button>
                  <button
                    onClick={() => handleLinkClick('companies', 'ceos')}
                    className="w-full text-left px-4 py-2.5 text-xs font-semibold rounded-lg text-slate-900 hover:text-violet-600 hover:bg-slate-50 transition-all bg-transparent border-transparent"
                  >
                    CEO Bios
                  </button>
                  <button
                    onClick={() => handleLinkClick('companies', 'visiting')}
                    className="w-full text-left px-4 py-2.5 text-xs font-semibold rounded-lg text-slate-900 hover:text-violet-600 hover:bg-slate-50 transition-all bg-transparent border-transparent"
                  >
                    Company Visiting
                  </button>
                </div>
              </div>

              {/* Coaching Center Dropdown */}
              <div className="relative group inline-block">
                <button
                  onClick={() => handleLinkClick('coaching', 'courses')}
                  className={`flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-semibold transition-all cursor-pointer bg-transparent border-transparent ${
                    currentView === 'coaching'
                      ? 'text-violet-600'
                      : 'text-slate-900 hover:text-violet-600'
                  }`}
                >
                  <span>Coaching Centers</span>
                  <ChevronDown className="w-3.5 h-3.5 opacity-60" />
                </button>
                <div className="absolute left-0 mt-1 w-52 rounded-xl bg-white border border-slate-200 p-2 shadow-xl invisible group-hover:visible opacity-0 group-hover:opacity-100 transition-all duration-200 z-50 flex flex-col gap-0.5">
                  <button
                    onClick={() => handleLinkClick('coaching', 'courses')}
                    className="w-full text-left px-4 py-2.5 text-xs font-semibold rounded-lg text-slate-900 hover:text-violet-600 hover:bg-slate-50 transition-all bg-transparent border-transparent"
                  >
                    Training Courses
                  </button>
                  <button
                    onClick={() => handleLinkClick('coaching', 'locations')}
                    className="w-full text-left px-4 py-2.5 text-xs font-semibold rounded-lg text-slate-900 hover:text-violet-600 hover:bg-slate-50 transition-all bg-transparent border-transparent"
                  >
                    Branch Locations
                  </button>
                  <button
                    onClick={() => handleLinkClick('coaching', 'exams')}
                    className="w-full text-left px-4 py-2.5 text-xs font-semibold rounded-lg text-slate-900 hover:text-violet-600 hover:bg-slate-50 transition-all bg-transparent border-transparent"
                  >
                    Mock Exams
                  </button>
                </div>
              </div>

              {/* Mentorship Dropdown */}
              <div className="relative group inline-block">
                <button
                  onClick={() => handleLinkClick('mentorship', 'resume')}
                  className={`flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-semibold transition-all cursor-pointer bg-transparent border-transparent ${
                    currentView === 'mentorship'
                      ? 'text-violet-600'
                      : 'text-slate-900 hover:text-violet-600'
                  }`}
                >
                  <span>Mentorship</span>
                  <ChevronDown className="w-3.5 h-3.5 opacity-60" />
                </button>
                <div className="absolute left-0 mt-1 w-52 rounded-xl bg-white border border-slate-200 p-2 shadow-xl invisible group-hover:visible opacity-0 group-hover:opacity-100 transition-all duration-200 z-50 flex flex-col gap-0.5">
                  <button
                    onClick={() => handleLinkClick('mentorship', 'resume')}
                    className="w-full text-left px-4 py-2.5 text-xs font-semibold rounded-lg text-slate-900 hover:text-violet-600 hover:bg-slate-50 transition-all bg-transparent border-transparent"
                  >
                    Resume Builder
                  </button>
                  <button
                    onClick={() => handleLinkClick('mentorship', 'interview')}
                    className="w-full text-left px-4 py-2.5 text-xs font-semibold rounded-lg text-slate-900 hover:text-violet-600 hover:bg-slate-50 transition-all bg-transparent border-transparent"
                  >
                    Interview Prep
                  </button>
                  <button
                    onClick={() => handleLinkClick('mentorship', 'resources')}
                    className="w-full text-left px-4 py-2.5 text-xs font-semibold rounded-lg text-slate-900 hover:text-violet-600 hover:bg-slate-50 transition-all bg-transparent border-transparent"
                  >
                    Career Resources
                  </button>
                </div>
              </div>
            </nav>
          )}

          {/* Desktop Auth/Session Controls */}
          <div className="hidden md:flex items-center gap-3">
            {userSession ? (
              <div className="flex items-center gap-3">
                {currentView !== 'dashboard' && (
                  <button
                    onClick={() => handleLinkClick('dashboard')}
                    className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-semibold border border-slate-200 bg-white text-slate-900 hover:bg-slate-50 transition-all cursor-pointer"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    <span>Back</span>
                  </button>
                )}
                <button
                  onClick={onLogout}
                  className="flex items-center gap-2 p-2.5 rounded-xl border border-slate-250 bg-white text-slate-500 hover:text-rose-600 hover:border-rose-500/20 hover:bg-rose-500/5 transition-all cursor-pointer"
                  title="Logout"
                >
                  <LogOut className="w-4 h-4" />
                </button>
                <div className="flex items-center gap-2 pl-2 border-l border-slate-200">
                  <div className="w-8 h-8 rounded-full bg-violet-600/20 border border-violet-500/30 flex items-center justify-center text-violet-600 text-sm font-semibold uppercase">
                    {userSession.name ? userSession.name.charAt(0) : 'U'}
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs font-semibold text-slate-900 max-w-[100px] truncate">{userSession.name}</span>
                    <span className="text-[10px] text-slate-500 capitalize">{userSession.role}</span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleAuthClick('login')}
                  className="px-4 py-2 rounded-xl text-sm font-semibold text-slate-900 hover:text-violet-600 transition-colors cursor-pointer"
                >
                  Login
                </button>
                <button
                  onClick={() => handleAuthClick('register')}
                  className="px-4 py-2 rounded-xl text-sm font-semibold bg-violet-600 text-white shadow-lg cursor-pointer"
                >
                  Register
                </button>
              </div>
            )}
          </div>

          {/* Mobile hamburger button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-xl text-slate-900 hover:text-violet-600 hover:bg-slate-50 border border-slate-200 transition-colors cursor-pointer"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-slate-200 bg-white shadow-lg max-h-[85vh] overflow-y-auto animate-fade-in z-50">
          <div className="px-3 pt-2 pb-5 space-y-1">
            
            {/* Standard guest links (Ordered: Home, About Us, Jobs, Internships, Companies, Coaching, Mentorship) */}
            {!userSession ? (
              <>
                {/* Home */}
                <button
                  onClick={() => handleLinkClick('home')}
                  className={`block w-full text-left px-4 py-3 rounded-xl text-base font-semibold transition-all bg-transparent border-transparent ${
                    currentView === 'home' ? 'text-violet-600' : 'text-slate-900 hover:text-violet-600'
                  }`}
                >
                  Home
                </button>

                {/* About Us */}
                <button
                  onClick={() => handleLinkClick('about')}
                  className={`block w-full text-left px-4 py-3 rounded-xl text-base font-semibold transition-all bg-transparent border-transparent ${
                    currentView === 'about' ? 'text-violet-600' : 'text-slate-900 hover:text-violet-600'
                  }`}
                >
                  About Us
                </button>

                {/* Jobs */}
                <button
                  onClick={handleJobsClick}
                  className={`block w-full text-left px-4 py-3 rounded-xl text-base font-semibold transition-all bg-transparent border-transparent ${
                    currentView === 'jobs' ? 'text-violet-600' : 'text-slate-900 hover:text-violet-600'
                  }`}
                >
                  Jobs
                </button>

                {/* Internships */}
                <button
                  onClick={handleInternshipsClick}
                  className="block w-full text-left px-4 py-3 rounded-xl text-base font-semibold text-slate-900 hover:text-violet-600 bg-transparent border-transparent"
                >
                  Internships
                </button>

                {/* Companies Accordion */}
                <div className="space-y-1">
                  <button
                    onClick={() => setMobileCompaniesOpen(!mobileCompaniesOpen)}
                    className="flex items-center justify-between w-full text-left px-4 py-3 rounded-xl text-base font-semibold text-slate-900 hover:text-violet-600 bg-transparent border-transparent"
                  >
                    <span>Companies</span>
                    {mobileCompaniesOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </button>
                  {mobileCompaniesOpen && (
                    <div className="pl-6 pr-2 py-1 flex flex-col gap-1.5 border-l border-slate-200 ml-4 animate-fade-in">
                      <button
                        onClick={() => handleLinkClick('companies', 'stories')}
                        className="w-full text-left py-2 px-3 text-sm font-semibold rounded-lg text-slate-900 hover:text-violet-600 hover:bg-slate-50 transition-all bg-transparent border-transparent"
                      >
                        Company Stories
                      </button>
                      <button
                        onClick={() => handleLinkClick('companies', 'ceos')}
                        className="w-full text-left py-2 px-3 text-sm font-semibold rounded-lg text-slate-900 hover:text-violet-600 hover:bg-slate-50 transition-all bg-transparent border-transparent"
                      >
                        CEO Bios
                      </button>
                      <button
                        onClick={() => handleLinkClick('companies', 'visiting')}
                        className="w-full text-left py-2 px-3 text-sm font-semibold rounded-lg text-slate-900 hover:text-violet-600 hover:bg-slate-50 transition-all bg-transparent border-transparent"
                      >
                        Company Visiting
                      </button>
                    </div>
                  )}
                </div>

                {/* Coaching Accordion */}
                <div className="space-y-1">
                  <button
                    onClick={() => setMobileCoachingOpen(!mobileCoachingOpen)}
                    className="flex items-center justify-between w-full text-left px-4 py-3 rounded-xl text-base font-semibold text-slate-900 hover:text-violet-600 bg-transparent border-transparent"
                  >
                    <span>Coaching Centers</span>
                    {mobileCoachingOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </button>
                  {mobileCoachingOpen && (
                    <div className="pl-6 pr-2 py-1 flex flex-col gap-1.5 border-l border-slate-200 ml-4 animate-fade-in">
                      <button
                        onClick={() => handleLinkClick('coaching', 'courses')}
                        className="w-full text-left py-2 px-3 text-sm font-semibold rounded-lg text-slate-900 hover:text-violet-600 hover:bg-slate-50 transition-all bg-transparent border-transparent"
                      >
                        Training Courses
                      </button>
                      <button
                        onClick={() => handleLinkClick('coaching', 'locations')}
                        className="w-full text-left py-2 px-3 text-sm font-semibold rounded-lg text-slate-900 hover:text-violet-600 hover:bg-slate-50 transition-all bg-transparent border-transparent"
                      >
                        Branch Locations
                      </button>
                      <button
                        onClick={() => handleLinkClick('coaching', 'exams')}
                        className="w-full text-left py-2 px-3 text-sm font-semibold rounded-lg text-slate-900 hover:text-violet-600 hover:bg-slate-50 transition-all bg-transparent border-transparent"
                      >
                        Mock Exams
                      </button>
                    </div>
                  )}
                </div>

                {/* Mentorship Accordion */}
                <div className="space-y-1">
                  <button
                    onClick={() => setMobileMentorshipOpen(!mobileMentorshipOpen)}
                    className="flex items-center justify-between w-full text-left px-4 py-3 rounded-xl text-base font-semibold text-slate-900 hover:text-violet-600 bg-transparent border-transparent"
                  >
                    <span>Mentorship</span>
                    {mobileMentorshipOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </button>
                  {mobileMentorshipOpen && (
                    <div className="pl-6 pr-2 py-1 flex flex-col gap-1.5 border-l border-slate-200 ml-4 animate-fade-in">
                      <button
                        onClick={() => handleLinkClick('mentorship', 'resume')}
                        className="w-full text-left py-2 px-3 text-sm font-semibold rounded-lg text-slate-900 hover:text-violet-600 hover:bg-slate-50 transition-all bg-transparent border-transparent"
                      >
                        Resume Builder
                      </button>
                      <button
                        onClick={() => handleLinkClick('mentorship', 'interview')}
                        className="w-full text-left py-2 px-3 text-sm font-semibold rounded-lg text-slate-900 hover:text-violet-600 hover:bg-slate-50 transition-all bg-transparent border-transparent"
                      >
                        Interview Prep
                      </button>
                      <button
                        onClick={() => handleLinkClick('mentorship', 'resources')}
                        className="w-full text-left py-2 px-3 text-sm font-semibold rounded-lg text-slate-900 hover:text-violet-600 hover:bg-slate-50 transition-all bg-transparent border-transparent"
                      >
                        Career Resources
                      </button>
                    </div>
                  )}
                </div>

                {/* Session Buttons */}
                <div className="pt-4 border-t border-slate-200 px-4 flex flex-col gap-2">
                  <button
                    onClick={() => handleAuthClick('login')}
                    className="w-full py-2.5 rounded-xl text-center text-sm font-medium text-slate-900 hover:bg-slate-50 border border-slate-250 cursor-pointer"
                  >
                    Login
                  </button>
                  <button
                    onClick={() => handleAuthClick('register')}
                    className="w-full py-2.5 rounded-xl text-center text-sm font-medium bg-violet-600 text-white shadow-lg cursor-pointer"
                  >
                    Register
                  </button>
                </div>
              </>
            ) : (
              <div className="pt-2 pb-2 px-4 space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-violet-600/20 border border-violet-500/30 flex items-center justify-center text-violet-600 text-sm font-semibold uppercase">
                    {userSession.name ? userSession.name.charAt(0) : 'U'}
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-slate-900">{userSession.name}</div>
                    <div className="text-xs text-slate-500 capitalize">{userSession.role} Dashboard</div>
                  </div>
                </div>
                {currentView !== 'dashboard' && (
                  <button
                    onClick={() => handleLinkClick('dashboard')}
                    className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl text-sm font-semibold border border-slate-200 bg-white text-slate-900 cursor-pointer"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    <span>Back to Dashboard</span>
                  </button>
                )}
                <button
                  onClick={onLogout}
                  className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl text-sm font-semibold border border-slate-200 text-slate-500 hover:text-rose-600 cursor-pointer"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Logout</span>
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
