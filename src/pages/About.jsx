import React from 'react';
import { Target, Users, Shield, Award, Compass } from 'lucide-react';

export default function About() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8 space-y-20 animate-fade-in">
      {/* Title */}
      <section className="text-center space-y-4 max-w-2xl mx-auto">
        <h1 className="text-3xl sm:text-5xl font-extrabold font-outfit text-slate-100">
          Our Mission & Vision
        </h1>
        <p className="text-sm sm:text-base text-slate-400 leading-relaxed font-medium">
          Job Portal was founded on a simple premise: make tech recruitment transparent, responsive, and aesthetically outstanding.
        </p>
      </section>

      {/* Corporate Values */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {[
          {
            title: 'Unparalleled Transparency',
            desc: 'Every job posting specifies required experience, salary guides, and explicit skill sets. No black holes.',
            icon: <Shield className="w-6 h-6 text-violet-400" />
          },
          {
            title: 'Candidate-First UI',
            desc: 'A gorgeous profile presentation tool that highlights qualifications and simplifies PDF resume management.',
            icon: <Users className="w-6 h-6 text-emerald-400" />
          },
          {
            title: 'Recruitment Flow',
            desc: 'Interactive workflows connecting candidate, recruiter, and administrator in a unified lifecycle.',
            icon: <Compass className="w-6 h-6 text-blue-400" />
          }
        ].map((val, idx) => (
          <div key={idx} className="p-6 rounded-2xl border border-slate-900 bg-slate-900/20 glass flex flex-col items-start gap-4">
            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
              {val.icon}
            </div>
            <h3 className="text-lg font-bold text-slate-200 font-outfit">{val.title}</h3>
            <p className="text-sm text-slate-500 leading-relaxed">{val.desc}</p>
          </div>
        ))}
      </section>

      {/* Corporate History */}
      <section className="p-8 rounded-3xl border border-slate-900 bg-slate-900/30 glass grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        <div className="space-y-6">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-emerald-500/20 bg-emerald-500/5 text-emerald-400 text-xs font-semibold">
            <Target className="w-3.5 h-3.5" />
            Our Impact Today
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-100 font-outfit leading-tight">
            Connecting People to Opportunities Worldwide
          </h2>
          <p className="text-sm text-slate-400 leading-relaxed">
            We believe that finding a career shouldn't be a tedious process. By organizing recruiter job postings, candidate resume files, and dashboard notifications, we make hiring intuitive.
          </p>
          <p className="text-sm text-slate-400 leading-relaxed">
            Whether you are an intern looking for your first step, or an employer looking to manage applicant queues, Job Portal provides a robust playground workspace.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {[
            { val: '98%', label: 'Satisfied Candidates' },
            { val: '24 hrs', label: 'Average Response' },
            { val: '10k+', label: 'Successful Hires' },
            { val: '150+', label: 'Enterprise Employers' }
          ].map((item, idx) => (
            <div key={idx} className="p-5 rounded-2xl border border-slate-900 bg-slate-950/50 flex flex-col justify-center text-center">
              <span className="text-2xl sm:text-3xl font-black bg-gradient-to-r from-violet-400 to-indigo-200 bg-clip-text text-transparent font-outfit">{item.val}</span>
              <span className="text-xs text-slate-500 mt-1 font-semibold">{item.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Team */}
      <section className="space-y-8 text-center">
        <div className="space-y-2">
          <h2 className="text-2xl sm:text-3xl font-bold font-outfit text-slate-100">Meet Our Founders</h2>
          <p className="text-sm text-slate-500 max-w-md mx-auto">The engineering and product design leaders behind the platform.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
          {[
            { name: 'Sridhar Vembu', role: 'Chief Executive Officer', img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&h=150&q=80' },
            { name: 'N. R. Narayana Murthy', role: 'Chief Technology Officer', img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&h=150&q=80' },
            { name: 'Girish Mathrubootham', role: 'VP of Product Experience', img: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&h=150&q=80' }
          ].map((member, idx) => (
            <div key={idx} className="p-6 rounded-2xl border border-slate-900 bg-slate-950/40 glass flex flex-col items-center text-center gap-4">
              <img src={member.img} alt={member.name} className="w-20 h-20 rounded-full border border-violet-500/20 object-cover" />
              <div>
                <h4 className="text-base font-bold text-slate-200 font-outfit">{member.name}</h4>
                <span className="text-xs text-slate-500 font-medium">{member.role}</span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
