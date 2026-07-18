import React, { useState } from 'react';
import { Search, MapPin, Briefcase, Award, TrendingUp, Users, ArrowRight, Star } from 'lucide-react';
import { getJobs } from '../mockData';
import TextType from '../components/TextType';
import Orb from '../components/Orb';

export default function Home({ setView, setJobFilters, setSelectedJob }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchLocation, setSearchLocation] = useState('');
  
  const jobs = getJobs().filter(j => j.status === 'open').slice(0, 3);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setJobFilters({
      query: searchQuery,
      location: searchLocation,
      type: '',
      experience: ''
    });
    setView('jobs');
  };

  return (
    <div className="space-y-20 pb-20 animate-fade-in">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-12 md:pt-20">
        {/* Animated OGL Orb background */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] pointer-events-none opacity-80 z-0 select-none">
          <Orb
            hoverIntensity={2}
            rotateOnHover
            hue={0}
            forceHoverState={false}
            backgroundColor="#ffffff"
          />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8 relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-violet-500/30 bg-violet-500/5 text-violet-400 text-xs font-semibold uppercase tracking-wider">
            <Star className="w-3.5 h-3.5 fill-violet-400" />
            Empowering Careers Globally
          </div>

          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight font-outfit min-h-[120px] sm:min-h-[160px]">
            Bridge the Gap Between <br />
            <TextType 
              text={["Talent & Opportunity", "Candidates & Companies", "Careers & Futures"]}
              typingSpeed={75}
              pauseDuration={2000}
              showCursor
              cursorCharacter="|"
              deletingSpeed={50}
              className="bg-gradient-to-r from-violet-400 via-indigo-300 to-blue-400 bg-clip-text text-transparent inline-block"
            />
          </h1>

          <p className="max-w-2xl mx-auto text-base sm:text-lg text-slate-400 font-medium leading-relaxed">
            Job Portal is a premium recruitment portal where top candidates display their skills and leading companies recruit pre-vetted specialists.
          </p>

          {/* Search Form */}
          <form 
            onSubmit={handleSearchSubmit}
            className="max-w-4xl mx-auto p-2 bg-slate-900/90 border border-slate-800 rounded-2xl md:rounded-full glass shadow-2xl flex flex-col md:flex-row items-center gap-2 md:gap-0"
          >
            <div className="w-full flex items-center gap-2 px-4 py-2 border-b md:border-b-0 md:border-r border-slate-800">
              <Search className="w-5 h-5 text-slate-500 shrink-0" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Job Title, Skills, or Keywords..."
                className="w-full bg-transparent text-sm text-slate-200 outline-none placeholder:text-slate-500"
              />
            </div>
            <div className="w-full flex items-center gap-2 px-4 py-2">
              <MapPin className="w-5 h-5 text-slate-500 shrink-0" />
              <input
                type="text"
                value={searchLocation}
                onChange={(e) => setSearchLocation(e.target.value)}
                placeholder="Location (e.g. Remote, NY)..."
                className="w-full bg-transparent text-sm text-slate-200 outline-none placeholder:text-slate-500"
              />
            </div>
            <button
              type="submit"
              className="w-full md:w-auto px-7 py-3 rounded-xl md:rounded-full bg-violet-600 hover:bg-violet-500 text-white text-sm font-semibold shadow-lg shadow-violet-500/25 transition-colors shrink-0 flex items-center justify-center gap-1.5"
            >
              <span>Search Jobs</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* Quick Stats */}
          <div className="max-w-5xl mx-auto pt-10 grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { label: 'Active Jobs', val: '1,250+', icon: <Briefcase className="w-4 h-4 text-violet-400" /> },
              { label: 'Registered Companies', val: '450+', icon: <Users className="w-4 h-4 text-blue-400" /> },
              { label: 'Talented Candidates', val: '12,000+', icon: <Award className="w-4 h-4 text-emerald-400" /> },
              { label: 'Monthly Hires', val: '320+', icon: <TrendingUp className="w-4 h-4 text-pink-400" /> }
            ].map((stat, idx) => (
              <div key={idx} className="p-4 rounded-2xl border border-slate-900 bg-slate-950/40 glass flex items-center gap-3">
                <div className="p-2 rounded-xl bg-slate-900 border border-slate-800">
                  {stat.icon}
                </div>
                <div className="text-left">
                  <div className="text-lg font-bold text-slate-100 font-outfit">{stat.val}</div>
                  <div className="text-xs text-slate-500">{stat.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Jobs */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center md:text-left md:flex md:items-end md:justify-between">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold font-outfit text-slate-100">Featured Job Openings</h2>
            <p className="text-sm text-slate-500 mt-1">Discover recently posted job listings and internships.</p>
          </div>
          <button 
            onClick={() => { setJobFilters({ query: '', location: '', type: '', experience: '' }); setView('jobs'); }}
            className="text-sm font-semibold text-violet-400 hover:text-violet-300 transition-colors flex items-center justify-center gap-1.5 mt-2 md:mt-0 mx-auto md:mx-0"
          >
            <span>View All Jobs</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {jobs.map((job) => (
            <div
              key={job.id}
              className="p-6 rounded-2xl border border-slate-900 bg-slate-900/30 glass flex flex-col justify-between gap-6 hover:-translate-y-1 transition-all duration-300 hover:shadow-xl hover:shadow-violet-500/5 group"
            >
              <div>
                <div className="flex justify-between items-start">
                  <div className="px-2.5 py-0.5 rounded-full border border-violet-500/20 bg-violet-500/5 text-violet-400 text-[10px] font-semibold uppercase tracking-wider">
                    {job.employmentType}
                  </div>
                  <span className="text-xs text-slate-500">Apply by {job.lastDate}</span>
                </div>
                
                <h3 className="text-lg font-bold text-slate-200 mt-4 group-hover:text-violet-400 transition-colors font-outfit">
                  {job.title}
                </h3>
                <p className="text-sm text-slate-400 font-medium mt-1">{job.companyName}</p>

                <div className="flex flex-wrap items-center gap-3 mt-4 text-xs text-slate-500 font-medium">
                  <div className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5" />
                    <span>{job.location}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Briefcase className="w-3.5 h-3.5" />
                    <span>{job.experienceRequired}</span>
                  </div>
                </div>

                <p className="text-xs text-slate-500 mt-4 line-clamp-2 leading-relaxed">
                  {job.description}
                </p>
              </div>

              <div className="pt-4 border-t border-slate-900 flex items-center justify-between">
                <span className="text-sm font-bold text-slate-300 font-outfit">{job.salary || 'Salary Disclosed'}</span>
                <button
                  onClick={() => {
                    setSelectedJob(job);
                    setView('jobs');
                  }}
                  className="px-4 py-2 rounded-xl text-xs font-semibold bg-slate-900 hover:bg-slate-800 text-violet-400 border border-slate-800 hover:border-violet-500/20 transition-all flex items-center gap-1"
                >
                  <span>Quick View</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* How it Works */}
      <section className="bg-slate-900/30 border-y border-slate-900/60 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center space-y-2">
            <h2 className="text-2xl sm:text-3xl font-bold font-outfit text-slate-100">Simple Step-by-Step Flow</h2>
            <p className="text-sm text-slate-400 max-w-lg mx-auto">Get connected in three easy steps, whether you are a job seeker or a recruiter.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { step: '01', title: 'Create Profile', text: 'Register as Candidate or Employer, edit professional specs, and upload certifications or portfolios.' },
              { step: '02', title: 'Match Openings', text: 'Recruiters post positions detailing qualifications and salary. Job seekers browse with customized filters.' },
              { step: '03', title: 'Apply & Manage', text: 'Apply with one click. Employers review applications, inspect profiles, download resumes, and set statuses.' }
            ].map((item, idx) => (
              <div key={idx} className="p-6 rounded-2xl border border-slate-900 bg-slate-950/40 glass relative text-left">
                <span className="text-5xl font-black bg-gradient-to-tr from-violet-600/40 to-indigo-600/40 bg-clip-text text-transparent font-outfit absolute top-4 right-6 select-none">
                  {item.step}
                </span>
                <h3 className="text-lg font-bold text-slate-200 mb-2 font-outfit">{item.title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
