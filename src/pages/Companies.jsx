import React, { useState, useEffect } from 'react';
import { Building, Award, Star, Compass, User, Calendar, MapPin, CheckCircle, ChevronRight, Image, Search, AlertCircle } from 'lucide-react';
import Modal from '../components/Modal';

export default function Companies({ subSection, setSubSection, addToast }) {
  const [activeTab, setActiveTab] = useState('stories');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCompany, setSelectedCompany] = useState(null);
  
  // Visiting registration modal states
  const [registeringVisit, setRegisteringVisit] = useState(null);
  const [visitorName, setVisitorName] = useState('');
  const [visitorEmail, setVisitorEmail] = useState('');
  const [visitorDegree, setVisitorDegree] = useState('');
  const [registeredVisits, setRegisteredVisits] = useState([]);

  useEffect(() => {
    if (subSection) {
      setActiveTab(subSection);
    }
  }, [subSection]);

  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
    if (setSubSection) {
      setSubSection(tabId);
    }
  };

  // Mock Company Data
  const companiesList = [
    {
      id: 'c1',
      name: 'Zoho Corporation',
      logo: 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?auto=format&fit=crop&w=120&h=120&q=80',
      industry: 'Cloud Software & SaaS Suite',
      founded: '1996',
      growth: 'Bootstrapped to over 100M+ users globally',
      employees: '15,000+ in India & globally',
      headline: 'Building world-class SaaS software from Chennai and rural Tamil Nadu.',
      story: 'Zoho Corporation was founded by Sridhar Vembu in Chennai, Tamil Nadu. Beginning as a network management company, it pivoted into building a comprehensive operating system for business. Zoho is famously bootstrapped and focuses heavily on rural talent development in Tenkasi and local Tamil Nadu villages.',
      culture: 'Strictly non-corporate hierarchy, high autonomy, rural office setups, peer mentoring, and a focus on product engineering over marketing.',
      achievements: [
        'Recognized as India\'s leading bootstrapped SaaS pioneer',
        'Over 55+ business applications serving 100 Million users',
        'Built a thriving rural IT ecosystem in Tenkasi, Tamil Nadu'
      ],
      journey: [
        { year: '1996', milestone: 'Founded as AdventNet in Chennai' },
        { year: '2005', milestone: 'Launched Zoho Writer, kicking off the SaaS office suite' },
        { year: '2009', milestone: 'Rebranded as Zoho Corporation' },
        { year: '2020', milestone: 'Expanded rural offices in Tenkasi and surrounding villages' }
      ]
    },
    {
      id: 'c2',
      name: 'Infosys Limited',
      logo: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=120&h=120&q=80',
      industry: 'IT Consulting & Digital Services',
      founded: '1981',
      growth: 'Revenue exceeding $18 Billion annually',
      employees: '300,000+ globally',
      headline: 'Pioneering the global delivery model from Bengaluru, Karnataka.',
      story: 'Infosys was founded by N. R. Narayana Murthy and six other engineers in Pune with a capital of ₹10,000. It relocated its primary base to Bengaluru, Karnataka, building a massive corporate park in Electronic City. It pioneered the software export engine that defined modern Indian IT.',
      culture: 'Structured engineering guidelines, massive training academies (Mysuru), collaborative client consultation, and standard corporate benefits.',
      achievements: [
        'First Indian company to be listed on NASDAQ in 1999',
        'Built the world\'s largest corporate university campus in Mysuru, Karnataka',
        'Pioneered Global Delivery Model (GDM) for global enterprises'
      ],
      journey: [
        { year: '1981', milestone: 'Founded in Pune by Narayana Murthy and team' },
        { year: '1983', milestone: 'Relocated corporate headquarters to Bengaluru' },
        { year: '1999', milestone: 'Listed on NASDAQ, achieving $100M revenue milestone' },
        { year: '2025', milestone: 'Opened artificial intelligence center of excellence in Electronic City' }
      ]
    },
    {
      id: 'c3',
      name: 'Freshworks',
      logo: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=120&h=120&q=80',
      industry: 'Customer Experience Software',
      founded: '2010',
      growth: 'Listed on Nasdaq with over $500M ARR',
      employees: '5,000+ globally',
      headline: 'Designing business software that feels friendly and intuitive.',
      story: 'Freshworks was founded as Freshdesk by Girish Mathrubootham in Chennai, Tamil Nadu. Designed to address poor customer support software interfaces, Freshworks built simple customer service suites that rapidly gained global traction, relocating its legal base to the US while maintaining major engineering centers in Chennai.',
      culture: 'Work hard and stay humble, strong product design community support, and regular sports and hackathon culture.',
      achievements: [
        'First Indian-founded SaaS unicorn to IPO on Nasdaq in 2021',
        'Serves over 60,000 corporate clients globally',
        'Maintains massive product and engineering hub in Chennai'
      ],
      journey: [
        { year: '2010', milestone: 'Established in Chennai as Freshdesk' },
        { year: '2014', milestone: 'Onboarded 10,000 active global clients' },
        { year: '2017', milestone: 'Rebranded as Freshworks' },
        { year: '2021', milestone: 'Officially listed on Nasdaq' }
      ]
    }
  ];

  // Mock CEO Biographies
  const ceosList = [
    {
      name: 'Sridhar Vembu',
      role: 'Founder & CEO, Zoho Corporation',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&h=150&q=80',
      quote: 'True leadership is not about managing numbers in high-rise offices; it is about taking advanced product engineering to our villages, where talent is abundant but opportunities are scarce.',
      bio: 'Sridhar Vembu was born in Tanjore district, Tamil Nadu. He holds a bachelor\'s degree in Electrical Engineering from IIT Madras and a PhD from Princeton. Sridhar is famous for advocating local self-reliance and has personally relocated to a village in Tenkasi, Tamil Nadu, to oversee Zoho\'s rural development programs.',
      advice: 'Do not chase hot trends. Spend time learning core system architecture and database mechanics. We need builders who can write fast, modular code that runs efficiently on local networks.'
    },
    {
      name: 'N. R. Narayana Murthy',
      role: 'Co-Founder, Infosys Limited',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&h=150&q=80',
      quote: 'Performance leads to recognition, recognition leads to respect, and respect leads to power. Build systems with absolute integrity and character.',
      bio: 'Narayana Murthy holds a B.E. in Electrical Engineering from National Institute of Engineering, Mysuru, and a master\'s from IIT Kanpur. Under his leadership, Infosys built global delivery methods and established India as a major software hub.',
      advice: 'Clean code is a reflection of a clean mind. Master variables lifecycle, avoid code bloat, document logic, and build databases with high indexing discipline.'
    }
  ];

  // Mock Upcoming Visits
  const industrialVisits = [
    {
      id: 'v1',
      company: 'Zoho Estancia Campus',
      logo: 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?auto=format&fit=crop&w=120&h=120&q=80',
      location: 'Estancia IT Park, Chennai, Tamil Nadu',
      date: '2026-09-12',
      eligibility: 'Computer Science, IT, and Engineering students (Pre-final & Final year) in Tamil Nadu',
      description: 'An immersive 1-day experience inside Zoho\'s primary Estancia product development campus. Students will tour our engineering pods, attend a seminar on SaaS database scalability, and interact with Zoho Schools of Learning educators.',
      schedule: [
        '09:00 AM - Welcome & Zoho product architecture overview',
        '10:30 AM - Tour of local server infrastructure & networking grids',
        '01:00 PM - Lunch & Q&A with Tamil Nadu product leads',
        '02:30 PM - Interactive Hack-Challenge (Build with Zoho Creator API)',
        '04:30 PM - Networking & Internship placement roundtable'
      ],
      gallery: [
        'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=250&h=150&q=80',
        'https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=250&h=150&q=80',
        'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=250&h=150&q=80'
      ]
    },
    {
      id: 'v2',
      company: 'Infosys Campus, Electronic City',
      logo: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=120&h=120&q=80',
      location: 'Electronic City Phase 1, Bengaluru, Karnataka',
      date: '2026-10-05',
      eligibility: 'Data Science, MCA, Statistics, and Software Engineering graduates',
      description: 'Explore the computing labs at the Infosys Electronic City campus in Bengaluru. Learn about digital cloud modernization, enterprise system security, and AI training algorithms.',
      schedule: [
        '10:00 AM - Welcome and Campus Tour (Electronic City)',
        '11:30 AM - Seminar on cloud computing systems & microservices',
        '01:00 PM - Lunch and round-table discussions with team leads',
        '03:00 PM - Placement drive guidelines & Mock HR rounds'
      ],
      gallery: [
        'https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&w=250&h=150&q=80',
        'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=250&h=150&q=80',
        'https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=250&h=150&q=80'
      ]
    }
  ];

  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    if (!visitorName || !visitorEmail || !visitorDegree) {
      addToast('Please fill in all registration fields.', 'error');
      return;
    }
    
    setRegisteredVisits([...registeredVisits, registeringVisit.id]);
    addToast(`Successfully registered for the ${registeringVisit.company} Industrial Visit!`, 'success');
    setRegisteringVisit(null);
    setVisitorName('');
    setVisitorEmail('');
    setVisitorDegree('');
  };

  const filteredCompanies = companiesList.filter(c => 
    c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.industry.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8 space-y-12 animate-fade-in text-left">
      
      {/* Title */}
      <section className="text-center space-y-4 max-w-2xl mx-auto">
        <h1 className="text-3xl sm:text-5xl font-extrabold font-outfit text-slate-900 tracking-tight">
          Explore Industry Partners
        </h1>
        <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-medium">
          Get inspired by success stories, learn leadership wisdom directly from CEOs, and register for physical industrial office visits.
        </p>
      </section>

      {/* Tabs Switcher */}
      <div className="flex border-b border-slate-200 gap-6 justify-center">
        {[
          { id: 'stories', label: 'Company Stories', icon: <Building className="w-4 h-4" /> },
          { id: 'ceos', label: 'CEO Bios & Advice', icon: <User className="w-4 h-4" /> },
          { id: 'visiting', label: 'Industrial Visits', icon: <Calendar className="w-4 h-4" /> }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => handleTabChange(tab.id)}
            className={`flex items-center gap-2 pb-3 text-sm font-semibold border-b-2 transition-all cursor-pointer ${
              activeTab === tab.id
                ? 'border-violet-600 text-violet-600'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            {tab.icon}
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* VIEW: COMPANY STORIES */}
      {activeTab === 'stories' && (
        <div className="space-y-8">
          <div className="flex justify-between items-center max-w-md">
            <div className="relative w-full">
              <Search className="absolute left-3 inset-y-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search company or industry..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-4 py-2 rounded-xl border border-slate-200 bg-white text-xs outline-none focus:border-violet-500 text-slate-900 placeholder:text-slate-400"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {filteredCompanies.map(comp => (
              <div 
                key={comp.id} 
                className="p-6 rounded-2xl border border-slate-200 bg-white shadow-sm flex flex-col justify-between items-start gap-4 hover:border-violet-500/30 hover:shadow-md transition-all cursor-pointer"
                onClick={() => setSelectedCompany(comp)}
              >
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <img src={comp.logo} alt={comp.name} className="w-12 h-12 rounded-xl object-cover border border-slate-100" />
                    <div>
                      <h3 className="text-lg font-bold text-slate-900 font-outfit">{comp.name}</h3>
                      <span className="text-[10px] text-slate-500 font-semibold">{comp.industry}</span>
                    </div>
                  </div>
                  <p className="text-xs text-slate-500 font-semibold italic">"{comp.headline}"</p>
                  <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">{comp.story}</p>
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedCompany(comp);
                  }}
                  className="mt-2 text-xs font-bold text-violet-600 hover:text-violet-500 flex items-center gap-0.5 cursor-pointer"
                >
                  <span>Read Full Story</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* VIEW: CEO STORIES */}
      {activeTab === 'ceos' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {ceosList.map((ceo, idx) => (
            <div key={idx} className="p-8 rounded-3xl border border-slate-200 bg-white shadow-sm flex flex-col md:flex-row gap-6 items-start hover:border-violet-500/30 transition-all">
              <img src={ceo.avatar} alt={ceo.name} className="w-24 h-24 rounded-2xl border border-slate-100 object-cover shadow-sm shrink-0" />
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-extrabold text-slate-900 font-outfit">{ceo.name}</h3>
                  <span className="text-xs text-violet-600 font-bold">{ceo.role}</span>
                </div>
                
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 italic text-xs text-slate-600 leading-relaxed font-medium relative">
                  "{ceo.quote}"
                </div>

                <div className="space-y-2">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">Leadership Biography</h4>
                  <p className="text-xs text-slate-600 leading-relaxed">{ceo.bio}</p>
                </div>

                <div className="space-y-2">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-500 flex items-center gap-1">
                    <Star className="w-3 h-3 fill-emerald-500 text-emerald-500" />
                    Career Advice for Aspirants
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed font-medium bg-emerald-50/50 p-3 rounded-lg border border-emerald-500/10">{ceo.advice}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* VIEW: INDUSTRIAL VISITS */}
      {activeTab === 'visiting' && (
        <div className="space-y-8">
          {industrialVisits.map(visit => {
            const isRegistered = registeredVisits.includes(visit.id);
            return (
              <div key={visit.id} className="p-8 rounded-3xl border border-slate-200 bg-white shadow-sm grid grid-cols-1 md:grid-cols-3 gap-8 hover:border-violet-500/20 transition-all">
                {/* Visit details */}
                <div className="md:col-span-2 space-y-6">
                  <div className="flex items-center gap-4">
                    <img src={visit.logo} alt={visit.company} className="w-14 h-14 rounded-2xl border border-slate-100 object-cover shadow-sm" />
                    <div>
                      <h3 className="text-xl font-extrabold text-slate-900 font-outfit">{visit.company}</h3>
                      <div className="flex items-center gap-3 text-xs text-slate-500 mt-1 font-semibold">
                        <span className="flex items-center gap-1 text-slate-600">
                          <MapPin className="w-3.5 h-3.5 text-violet-500" />
                          {visit.location}
                        </span>
                        <span>•</span>
                        <span className="text-slate-700">Date: {visit.date}</span>
                      </div>
                    </div>
                  </div>

                  <p className="text-xs text-slate-600 leading-relaxed">{visit.description}</p>

                  <div className="p-4 rounded-xl bg-violet-500/5 border border-violet-500/10 space-y-1.5">
                    <div className="text-[10px] uppercase tracking-wider font-bold text-violet-600">Candidate Eligibility</div>
                    <p className="text-xs font-semibold text-slate-800">{visit.eligibility}</p>
                  </div>

                  {/* Visit Gallery */}
                  <div className="space-y-3">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                      <Image className="w-3.5 h-3.5" />
                      Gallery Preview
                    </h4>
                    <div className="grid grid-cols-3 gap-4">
                      {visit.gallery.map((img, i) => (
                        <img 
                          key={i} 
                          src={img} 
                          alt="Company facility preview" 
                          className="w-full h-24 rounded-xl object-cover border border-slate-100 shadow-sm" 
                        />
                      ))}
                    </div>
                  </div>
                </div>

                {/* Visit Schedule & Register */}
                <div className="p-6 rounded-2xl border border-slate-100 bg-slate-50 flex flex-col justify-between gap-6">
                  <div className="space-y-4">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">Visit Agenda</h4>
                    <div className="space-y-3">
                      {visit.schedule.map((item, idx) => (
                        <div key={idx} className="flex gap-2 items-start text-xs">
                          <div className="w-1.5 h-1.5 rounded-full bg-violet-600 shrink-0 mt-1.5" />
                          <span className="text-slate-600 font-medium leading-tight">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    {isRegistered ? (
                      <div className="py-3 px-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 text-xs font-bold flex items-center justify-center gap-1.5">
                        <CheckCircle className="w-4 h-4" />
                        <span>Registered Successfully</span>
                      </div>
                    ) : (
                      <button
                        onClick={() => setRegisteringVisit(visit)}
                        className="w-full py-3 rounded-xl bg-violet-600 hover:bg-violet-500 text-white text-xs font-bold shadow-md cursor-pointer transition-colors"
                      >
                        Register for Visit
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* 1. Modal for Company Detail Story */}
      {selectedCompany && (
        <Modal
          isOpen={!!selectedCompany}
          onClose={() => setSelectedCompany(null)}
          title={`${selectedCompany.name} - Complete Journey`}
        >
          <div className="space-y-6 text-left">
            <div className="flex items-center gap-3">
              <img src={selectedCompany.logo} alt={selectedCompany.name} className="w-12 h-12 rounded-xl object-cover border border-slate-100" />
              <div>
                <h3 className="text-lg font-bold text-slate-900 font-outfit">{selectedCompany.name}</h3>
                <span className="text-xs text-slate-500 font-semibold">{selectedCompany.industry}</span>
              </div>
            </div>

            <div className="space-y-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">The Story</h4>
              <p className="text-xs text-slate-600 leading-relaxed">{selectedCompany.story}</p>
            </div>

            <div className="space-y-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">Work Culture</h4>
              <p className="text-xs text-slate-600 leading-relaxed font-semibold">{selectedCompany.culture}</p>
            </div>

            <div className="space-y-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">Major Achievements</h4>
              <div className="space-y-2">
                {selectedCompany.achievements.map((item, idx) => (
                  <div key={idx} className="flex gap-2 items-center text-xs">
                    <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0" />
                    <span className="text-slate-600 font-medium">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">Milestones timeline</h4>
              <div className="relative pl-6 border-l border-slate-200 ml-2 space-y-4">
                {selectedCompany.journey.map((item, idx) => (
                  <div key={idx} className="relative">
                    <div className="absolute -left-[30px] top-1.5 w-2 h-2 rounded-full bg-violet-600" />
                    <span className="text-xs font-bold text-violet-600">{item.year}</span>
                    <p className="text-xs text-slate-600 font-semibold">{item.milestone}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 flex justify-end">
              <button
                onClick={() => setSelectedCompany(null)}
                className="px-6 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-semibold cursor-pointer"
              >
                Close Story
              </button>
            </div>
          </div>
        </Modal>
      )}

      {/* 2. Modal for Visit Registration */}
      {registeringVisit && (
        <Modal
          isOpen={!!registeringVisit}
          onClose={() => setRegisteringVisit(null)}
          title={`Register: ${registeringVisit.company} Visit`}
        >
          <form onSubmit={handleRegisterSubmit} className="space-y-4 text-left">
            <div className="p-3 rounded-xl bg-violet-50 border border-violet-100 flex gap-2.5 items-start">
              <AlertCircle className="w-5 h-5 text-violet-500 shrink-0 mt-0.5" />
              <div className="text-xs text-slate-600 font-medium">
                Please register using your academic enrollment credentials. Visiting passes will be sent to the contact email provided.
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">Candidate Full Name *</label>
              <input
                type="text"
                required
                value={visitorName}
                onChange={(e) => setVisitorName(e.target.value)}
                placeholder="Jane Doe"
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-white text-xs outline-none focus:border-violet-500 text-slate-900"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">Contact Email Address *</label>
              <input
                type="email"
                required
                value={visitorEmail}
                onChange={(e) => setVisitorEmail(e.target.value)}
                placeholder="jane@college.edu"
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-white text-xs outline-none focus:border-violet-500 text-slate-900"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">Degree / Department *</label>
              <input
                type="text"
                required
                value={visitorDegree}
                onChange={(e) => setVisitorDegree(e.target.value)}
                placeholder="B.E. Computer Science Engineering"
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-white text-xs outline-none focus:border-violet-500 text-slate-900"
              />
            </div>

            <div className="pt-4 border-t border-slate-100 flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setRegisteringVisit(null)}
                className="px-5 py-2.5 rounded-xl border border-slate-200 hover:bg-slate-100 text-slate-500 text-xs font-semibold cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2.5 bg-violet-600 hover:bg-violet-500 text-white text-xs font-bold shadow-lg cursor-pointer"
              >
                Confirm Registration
              </button>
            </div>
          </form>
        </Modal>
      )}

    </div>
  );
}
