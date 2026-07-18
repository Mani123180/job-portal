import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, HelpCircle } from 'lucide-react';

export default function Contact({ addToast }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      addToast('Please fill in all required fields.', 'error');
      return;
    }
    
    setSubmitting(true);
    // Simulate sending email
    setTimeout(() => {
      setSubmitting(false);
      addToast('Thank you! Your message has been sent successfully.', 'success');
      setFormData({ name: '', email: '', subject: '', message: '' });
    }, 1500);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8 space-y-16 animate-fade-in">
      {/* Title */}
      <section className="text-center space-y-4 max-w-2xl mx-auto">
        <h1 className="text-3xl sm:text-5xl font-extrabold font-outfit text-slate-100">
          Get in Touch
        </h1>
        <p className="text-sm sm:text-base text-slate-400 leading-relaxed font-medium">
          Have questions about setting up a profile or posting jobs? Our technical support team is here to assist.
        </p>
      </section>

      <section className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Contact info cards */}
        <div className="lg:col-span-1 space-y-4">
          {[
            {
              title: 'Email Us',
              val: 'support@jobportal.com',
              info: 'Response within 24 hours',
              icon: <Mail className="w-5 h-5 text-violet-400" />
            },
            {
              title: 'Call Support',
              val: '+1 (800) 555-0190',
              info: 'Mon-Fri, 9am - 6pm EST',
              icon: <Phone className="w-5 h-5 text-emerald-400" />
            },
            {
              title: 'Visit Headquarters',
              val: '100 Tech Venture Way',
              info: 'Suite 400, San Francisco, CA',
              icon: <MapPin className="w-5 h-5 text-blue-400" />
            }
          ].map((item, idx) => (
            <div key={idx} className="p-6 rounded-2xl border border-slate-900 bg-slate-900/20 glass flex items-start gap-4">
              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                {item.icon}
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-400">{item.title}</h4>
                <div className="text-base font-bold text-slate-200 mt-1 font-outfit">{item.val}</div>
                <span className="text-xs text-slate-500 font-medium">{item.info}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Contact Form */}
        <div className="lg:col-span-2 p-8 rounded-3xl border border-slate-900 bg-slate-900/30 glass">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Your Name <span className="text-rose-500">*</span></label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="John Doe"
                  className="w-full px-4 py-3 rounded-xl border border-slate-800 bg-slate-950/80 text-sm text-slate-200 focus:border-violet-500 outline-none transition-colors"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Email Address <span className="text-rose-500">*</span></label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="john@example.com"
                  className="w-full px-4 py-3 rounded-xl border border-slate-800 bg-slate-950/80 text-sm text-slate-200 focus:border-violet-500 outline-none transition-colors"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Subject</label>
              <input
                type="text"
                value={formData.subject}
                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                placeholder="How can we help you?"
                className="w-full px-4 py-3 rounded-xl border border-slate-800 bg-slate-950/80 text-sm text-slate-200 focus:border-violet-500 outline-none transition-colors"
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Message <span className="text-rose-500">*</span></label>
              <textarea
                required
                rows={5}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                placeholder="Type your message here..."
                className="w-full px-4 py-3 rounded-xl border border-slate-800 bg-slate-950/80 text-sm text-slate-200 focus:border-violet-500 outline-none transition-colors resize-none"
              />
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="w-full py-3.5 rounded-xl bg-violet-600 hover:bg-violet-500 disabled:bg-violet-600/50 text-white text-sm font-semibold shadow-lg shadow-violet-500/25 transition-colors flex items-center justify-center gap-2 border border-violet-500/10 cursor-pointer"
            >
              <Send className="w-4 h-4" />
              <span>{submitting ? 'Sending Message...' : 'Send Message'}</span>
            </button>
          </form>
        </div>
      </section>

      {/* FAQ block */}
      <section className="p-8 rounded-3xl border border-slate-900 bg-slate-950/40 glass text-left space-y-6">
        <div className="flex items-center gap-2">
          <HelpCircle className="w-5 h-5 text-violet-400" />
          <h3 className="text-lg font-bold text-slate-200 font-outfit">Frequently Asked Questions</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
          {[
            { q: 'Is Job Portal completely free for candidates?', a: 'Yes, setting up a profile, uploading a PDF resume, browsing and applying for jobs is free of charge.' },
            { q: 'How do employers contact candidates?', a: 'Recruiters review resumes on the Applicants dashboard and contact candidates through email or phone information provided in the profile.' },
            { q: 'Can I delete my job posting once filled?', a: 'Yes. Recruiting companies can close a job posting (stops applications) or delete it entirely from the dashboard.' },
            { q: 'How can admins moderate listings?', a: 'The System Administrator can log in to view candidate lists, company indices, and remove inappropriate job listings instantly.' }
          ].map((faq, idx) => (
            <div key={idx} className="space-y-1">
              <h4 className="font-bold text-slate-300">{faq.q}</h4>
              <p className="text-slate-500 leading-relaxed">{faq.a}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
