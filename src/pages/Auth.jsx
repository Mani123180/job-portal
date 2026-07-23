import React, { useState } from 'react';
import { LogIn, UserPlus, Eye, EyeOff, ShieldAlert, User, Building } from 'lucide-react';
import { login, register, getEmployers, getCandidates } from '../mockData';

export default function Auth({ setView, setUserSession, initialMode = 'login', addToast }) {
  const [mode, setMode] = useState(initialMode); // 'login' | 'register'
  const [selectedRole, setSelectedRole] = useState('candidate'); // 'candidate' | 'employer' (only shown during registration)
  const [showPassword, setShowPassword] = useState(false);

  // Form Fields
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleAction = (e) => {
    e.preventDefault();
    if (!email || !password) {
      addToast('Please enter both email and password.', 'error');
      return;
    }

    try {
      if (mode === 'login') {
        // Automatically detect user role based on email lookup
        let detectedRole = 'candidate';
        if (email.toLowerCase() === 'admin@demo.com') {
          detectedRole = 'admin';
        } else {
          const employers = getEmployers();
          const isEmployer = employers.some(emp => emp.email.toLowerCase() === email.toLowerCase());
          if (isEmployer) {
            detectedRole = 'employer';
          }
        }

        const session = login(email, password, detectedRole);
        setUserSession(session);
        addToast(`Welcome back, ${session.name}!`, 'success');
        setView('dashboard');
      } else {
        // Register Mode - create with email and password
        // Set default display name based on email prefix
        const defaultName = email.split('@')[0];
        
        let payload = {};
        if (selectedRole === 'candidate') {
          payload = { name: defaultName, email, password };
        } else {
          payload = { companyName: defaultName, email, password };
        }

        const session = register(payload, selectedRole);
        setUserSession(session);
        addToast('Account created successfully! Update your profile details in the dashboard.', 'success');
        setView('dashboard');
      }
    } catch (err) {
      addToast(err.message, 'error');
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 flex flex-col items-center justify-center min-h-[75vh] animate-fade-in">
      <div className="w-full max-w-md p-8 rounded-3xl border border-slate-900 bg-slate-900/30 glass shadow-2xl space-y-6">
        
        {/* Header Text */}
        <div className="text-center space-y-2">
          <h2 className="text-3xl font-extrabold font-outfit text-slate-100 tracking-tight">
            {mode === 'login' ? 'Welcome back' : 'Create Account'}
          </h2>
          <p className="text-xs text-slate-500 font-semibold leading-relaxed">
            {mode === 'login' 
              ? 'Enter your credentials to access your job portal dashboard.' 
              : 'Register with your email and password to get started.'}
          </p>
        </div>

        {/* Form Container */}
        <form onSubmit={handleAction} className="space-y-4">
          
          {/* Email Input */}
          <div className="space-y-1.5 text-left">
            <label className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">Email Address</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="name@example.com"
              className="w-full px-4 py-3 rounded-xl border border-slate-800 bg-slate-950 text-sm text-slate-200 focus:border-violet-500 outline-none transition-colors"
            />
          </div>

          {/* Password Input */}
          <div className="space-y-1.5 text-left">
            <label className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">Password</label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-4 py-3 pr-10 rounded-xl border border-slate-800 bg-slate-950 text-sm text-slate-200 focus:border-violet-500 outline-none transition-colors"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-500 hover:text-slate-300 transition-colors"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Role selector - ONLY visible during Sign Up */}
          {mode === 'register' && (
            <div className="space-y-2 text-left pt-2">
              <label className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">I want to:</label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setSelectedRole('candidate')}
                  className={`py-2 px-3 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 border transition-all ${
                    selectedRole === 'candidate'
                      ? 'bg-violet-500/10 border-violet-500 text-violet-400 font-bold'
                      : 'bg-slate-950 border-slate-900 text-slate-500 hover:text-slate-300'
                  }`}
                >
                  <User className="w-3.5 h-3.5" />
                  <span>Find Jobs</span>
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedRole('employer')}
                  className={`py-2 px-3 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 border transition-all ${
                    selectedRole === 'employer'
                      ? 'bg-violet-500/10 border-violet-500 text-violet-400 font-bold'
                      : 'bg-slate-950 border-slate-900 text-slate-500 hover:text-slate-300'
                  }`}
                >
                  <Building className="w-3.5 h-3.5" />
                  <span>Post Jobs</span>
                </button>
              </div>
            </div>
          )}

          {/* Action Button */}
          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-violet-600 hover:bg-violet-500 text-white text-xs font-semibold shadow-lg shadow-violet-500/25 transition-all border border-violet-500/10 cursor-pointer flex items-center justify-center gap-1.5 mt-2"
          >
            {mode === 'login' ? <LogIn className="w-4 h-4" /> : <UserPlus className="w-4 h-4" />}
            <span>{mode === 'login' ? 'Sign In' : 'Sign Up'}</span>
          </button>
        </form>

        {/* Toggle Mode Switcher at bottom */}
        <div className="text-center text-xs">
          {mode === 'login' ? (
            <p className="text-slate-500">
              Don't have an account?{' '}
              <button 
                onClick={() => setMode('register')} 
                className="text-violet-400 hover:text-violet-300 font-bold hover:underline transition-all"
              >
                Sign Up
              </button>
            </p>
          ) : (
            <p className="text-slate-500">
              Already have an account?{' '}
              <button 
                onClick={() => setMode('login')} 
                className="text-violet-400 hover:text-violet-300 font-bold hover:underline transition-all"
              >
                Sign In
              </button>
            </p>
          )}
        </div>

        {/* Demo Credentials Box */}
        <div className="pt-5 border-t border-slate-900 text-left space-y-3.5">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
            🔑 Demo Login Credentials
          </span>
          <div className="space-y-2 text-[11px] text-slate-500">
            <div className="flex justify-between items-center p-2 rounded-xl bg-slate-950/60 border border-slate-900">
              <span className="font-bold text-slate-400">Candidate:</span>
              <span className="font-mono">candidate@demo.com / password</span>
            </div>
            <div className="flex justify-between items-center p-2 rounded-xl bg-slate-950/60 border border-slate-900">
              <span className="font-bold text-slate-400">Employer:</span>
              <span className="font-mono">employer@demo.com / password</span>
            </div>
            <div className="flex justify-between items-center p-2 rounded-xl bg-slate-950/60 border border-slate-900">
              <span className="font-bold text-slate-400">Admin:</span>
              <span className="font-mono">admin@demo.com / admin</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
