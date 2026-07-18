import React, { useState } from 'react';
import { Briefcase, Menu, X, User, LogOut, LayoutDashboard } from 'lucide-react';

export default function Navbar({ currentView, setView, userSession, onLogout, setAuthMode }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = userSession ? [] : [
    { id: 'home', label: 'Home' },
    { id: 'jobs', label: 'Jobs' },
    { id: 'about', label: 'About Us' },
    { id: 'contact', label: 'Contact Us' }
  ];

  const handleLinkClick = (viewId) => {
    setView(viewId);
    setMobileMenuOpen(false);
  };

  const handleAuthClick = (mode) => {
    setAuthMode(mode);
    setView('auth');
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-30 w-full border-b border-slate-900 glass bg-slate-950/70 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center cursor-pointer" onClick={() => handleLinkClick('home')}>
            <div className="flex items-center gap-2.5">
              <div className="p-2 bg-gradient-to-tr from-violet-600 to-indigo-600 rounded-xl shadow-lg shadow-violet-500/20">
                <Briefcase className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-violet-400 to-indigo-200 bg-clip-text text-transparent font-outfit">
                Job Portal
              </span>
            </div>
          </div>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex space-x-1">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleLinkClick(link.id)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  currentView === link.id
                    ? 'bg-slate-900 text-violet-400 shadow-sm border border-slate-800'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/50'
                }`}
              >
                {link.label}
              </button>
            ))}
          </nav>

          {/* Desktop Auth/Session Controls */}
          <div className="hidden md:flex items-center gap-3">
            {userSession ? (
              <div className="flex items-center gap-3">
                <button
                  onClick={() => handleLinkClick('dashboard')}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium border transition-all ${
                    currentView === 'dashboard'
                      ? 'bg-violet-600 border-violet-500 text-white shadow-lg shadow-violet-500/20'
                      : 'bg-slate-900 border-slate-800 text-slate-300 hover:bg-slate-800 hover:text-slate-100'
                  }`}
                >
                  <LayoutDashboard className="w-4 h-4" />
                  <span>Dashboard</span>
                </button>
                <button
                  onClick={onLogout}
                  className="flex items-center gap-2 p-2.5 rounded-xl border border-slate-800 bg-slate-950 text-slate-400 hover:text-rose-400 hover:border-rose-500/20 hover:bg-rose-500/5 transition-all"
                  title="Logout"
                >
                  <LogOut className="w-4 h-4" />
                </button>
                <div className="flex items-center gap-2 pl-2 border-l border-slate-800">
                  <div className="w-8 h-8 rounded-full bg-violet-600/20 border border-violet-500/30 flex items-center justify-center text-violet-400 text-sm font-semibold uppercase">
                    {userSession.name ? userSession.name.charAt(0) : 'U'}
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs font-semibold text-slate-200 max-w-[100px] truncate">{userSession.name}</span>
                    <span className="text-[10px] text-slate-500 capitalize">{userSession.role}</span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleAuthClick('login')}
                  className="px-4 py-2 rounded-xl text-sm font-medium text-slate-400 hover:text-slate-200 transition-colors"
                >
                  Login
                </button>
                <button
                  onClick={() => handleAuthClick('register')}
                  className="px-4 py-2 rounded-xl text-sm font-medium bg-violet-600 text-white shadow-lg shadow-violet-500/25 hover:bg-violet-500 transition-colors border border-violet-500/10"
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
              className="inline-flex items-center justify-center p-2 rounded-xl text-slate-400 hover:text-slate-200 hover:bg-slate-900 border border-slate-800/80 transition-colors"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-slate-900 bg-slate-950/95 backdrop-blur-xl animate-fade-in">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleLinkClick(link.id)}
                className={`block w-full text-left px-4 py-3 rounded-xl text-base font-medium transition-all ${
                  currentView === link.id
                    ? 'bg-slate-900 text-violet-400 border border-slate-800'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/50'
                }`}
              >
                {link.label}
              </button>
            ))}
            
            {userSession ? (
              <div className="pt-4 pb-2 border-t border-slate-900 px-4 space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-violet-600/20 border border-violet-500/30 flex items-center justify-center text-violet-400 text-sm font-semibold uppercase">
                    {userSession.name ? userSession.name.charAt(0) : 'U'}
                  </div>
                  <div>
                    <div className="text-sm font-medium text-slate-200">{userSession.name}</div>
                    <div className="text-xs text-slate-500 capitalize">{userSession.role} Dashboard</div>
                  </div>
                </div>
                <button
                  onClick={() => handleLinkClick('dashboard')}
                  className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl text-sm font-medium bg-violet-600 text-white shadow-lg"
                >
                  <LayoutDashboard className="w-4 h-4" />
                  <span>Go to Dashboard</span>
                </button>
                <button
                  onClick={onLogout}
                  className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl text-sm font-medium border border-slate-800 text-slate-400 hover:text-rose-400"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Logout</span>
                </button>
              </div>
            ) : (
              <div className="pt-4 border-t border-slate-900 px-4 flex flex-col gap-2">
                <button
                  onClick={() => handleAuthClick('login')}
                  className="w-full py-2.5 rounded-xl text-center text-sm font-medium text-slate-400 hover:text-slate-200 border border-slate-800"
                >
                  Login
                </button>
                <button
                  onClick={() => handleAuthClick('register')}
                  className="w-full py-2.5 rounded-xl text-center text-sm font-medium bg-violet-600 text-white shadow-lg"
                >
                  Register
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
