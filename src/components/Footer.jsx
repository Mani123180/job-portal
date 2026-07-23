import React from 'react';
import { Briefcase, Mail, Phone, MapPin, Code, Globe } from 'lucide-react';

export default function Footer({ setView }) {
  return (
    <footer className="border-t border-slate-900 bg-slate-950 text-slate-400">
      <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo & Pitch */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 cursor-pointer" onClick={() => setView('home')}>
              <div className="p-2 bg-gradient-to-tr from-violet-600 to-indigo-600 rounded-xl shadow-lg">
                <Briefcase className="w-5 h-5 text-white" />
              </div>
              <span className="text-lg font-bold bg-gradient-to-r from-violet-400 to-indigo-200 bg-clip-text text-transparent font-outfit">
                Job Portal
              </span>
            </div>
            <p className="text-sm text-slate-500 leading-relaxed">
              Connecting exceptional candidates with industry-leading companies globally. Your gateway to career growth and team building.
            </p>
            <div className="flex space-x-3">
              <a href="#" className="p-2 rounded-lg bg-slate-900 border border-slate-800 hover:text-violet-400 transition-colors">
                <Globe className="w-4 h-4" />
              </a>
              <a href="#" className="p-2 rounded-lg bg-slate-900 border border-slate-800 hover:text-violet-400 transition-colors">
                <Briefcase className="w-4 h-4" />
              </a>
              <a href="#" className="p-2 rounded-lg bg-slate-900 border border-slate-800 hover:text-violet-400 transition-colors">
                <Code className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold text-slate-200 tracking-wider uppercase font-outfit mb-4">Quick Links</h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <button onClick={() => setView('home')} className="hover:text-slate-200 transition-colors text-left">Home</button>
              </li>
              <li>
                <button onClick={() => setView('jobs')} className="hover:text-slate-200 transition-colors text-left">Browse Jobs</button>
              </li>
              <li>
                <button onClick={() => setView('about')} className="hover:text-slate-200 transition-colors text-left">About Us</button>
              </li>
              <li>
                <button onClick={() => setView('contact')} className="hover:text-slate-200 transition-colors text-left">Contact Us</button>
              </li>
            </ul>
          </div>

          {/* User Areas */}
          <div>
            <h3 className="text-sm font-semibold text-slate-200 tracking-wider uppercase font-outfit mb-4">Job Seekers & Employers</h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <button onClick={() => { setView('auth'); }} className="hover:text-slate-200 transition-colors text-left">Candidate Log In</button>
              </li>
              <li>
                <button onClick={() => { setView('auth'); }} className="hover:text-slate-200 transition-colors text-left">Post a Job opening</button>
              </li>
              <li>
                <button onClick={() => setView('jobs')} className="hover:text-slate-200 transition-colors text-left">Apply for Internships</button>
              </li>
              <li>
                <button onClick={() => { setView('auth'); }} className="hover:text-slate-200 transition-colors text-left">Create Profile</button>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div>
            <h3 className="text-sm font-semibold text-slate-200 tracking-wider uppercase font-outfit mb-4">Contact Info</h3>
            <ul className="space-y-3.5 text-sm">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-violet-500 shrink-0 mt-0.5" />
                <span className="text-slate-500 leading-snug">
                  100 Estancia IT Park, GST Road<br />Vallancherry, Chennai, TN - 603202
                </span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-violet-500 shrink-0" />
                <span className="text-slate-500">+91 44 6740 4000</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-violet-500 shrink-0" />
                <span className="text-slate-500">support@jobportal.in</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-600 gap-4">
          <p>designed & powered by Zen4Tech Solutions</p>
          <div className="flex space-x-6">
            <a href="#" className="hover:text-slate-500 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-slate-500 transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-slate-500 transition-colors">Cookie Settings</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
