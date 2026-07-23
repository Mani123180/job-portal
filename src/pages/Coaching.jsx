import React, { useState, useEffect } from 'react';
import { BookOpen, MapPin, Award, CheckCircle, Clock, Phone, Mail, FileText, ChevronRight, HelpCircle, RefreshCw } from 'lucide-react';
import Modal from '../components/Modal';

export default function Coaching({ subSection, setSubSection, addToast }) {
  const [activeTab, setActiveTab] = useState('courses');
  const [selectedCourse, setSelectedCourse] = useState(null);
  
  // Course enrollment state
  const [enrollName, setEnrollName] = useState('');
  const [enrollEmail, setEnrollEmail] = useState('');
  const [enrolledCourses, setEnrolledCourses] = useState([]);

  // Mock Test State
  const [testStarted, setTestStarted] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [testResult, setTestResult] = useState(null);

  // Map Branch state
  const [activeMap, setActiveMap] = useState('chennai');

  useEffect(() => {
    if (subSection) {
      // Map submenu IDs to tabs
      if (subSection === 'locations') {
        setActiveTab('locations');
      } else if (subSection === 'exams') {
        setActiveTab('exams');
      } else {
        setActiveTab('courses');
      }
    }
  }, [subSection]);

  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
    if (setSubSection) {
      setSubSection(tabId);
    }
  };

  // Mock Courses Data
  const coursesList = [
    {
      id: 'course-1',
      title: 'MERN Stack Developer Pro',
      duration: '16 Weeks',
      type: 'Hybrid (Online + Classroom)',
      hours: '120+ Hours coding',
      rating: '4.9/5 (1,200+ ratings)',
      syllabus: ['HTML5 & CSS3 Advanced Layouts', 'JavaScript ES6+ Essentials', 'React.js Component Architecture', 'Node.js & Express.js server logic', 'MongoDB Database indexes & schemas', 'REST API deployments & Git versioning'],
      price: '$599 (EMI options available)',
      description: 'Master frontend and backend JavaScript technologies. Build 4 full-stack projects, set up automated tests, and receive direct recruiter placement guidance.'
    },
    {
      id: 'course-2',
      title: 'Java Full Stack Academy',
      duration: '24 Weeks',
      type: 'Classroom Intensive',
      hours: '180+ Hours coding',
      rating: '4.8/5 (950+ ratings)',
      syllabus: ['Core Java Fundamentals & OOPs', 'Advanced Java (Servlets, JSP)', 'Spring Boot Framework & Spring Data JPA', 'Microservices Architecture & RESTful APIs', 'Hibernate ORM tools', 'SQL & Database schema normalization'],
      price: '$799 (100% placement guarantee)',
      description: 'The ultimate enterprise engineering program. Highly structured training covering MVC architectures, Spring dependencies, multithreading, and server containers.'
    },
    {
      id: 'course-3',
      title: 'Data Science & Machine Learning',
      duration: '20 Weeks',
      type: 'Live Interactive Online',
      hours: '150+ Hours coding',
      rating: '4.9/5 (840+ ratings)',
      syllabus: ['Python Programming & Libraries', 'Data Wrangling with Pandas & NumPy', 'Visualizations with Matplotlib & Seaborn', 'Statistical Models & Probabilities', 'Supervised vs. Unsupervised ML Algorithms', 'Jupyter Notebook deployments'],
      price: '$699',
      description: 'Master analytical computing. Learn how to clean complex datasets, run regressions, deploy predictive models, and optimize neural networks.'
    },
    {
      id: 'course-4',
      title: 'UI/UX & Product Design Bootcamp',
      duration: '12 Weeks',
      type: 'Hybrid Classrooms',
      hours: '80+ Hours design sprints',
      rating: '4.7/5 (500+ ratings)',
      syllabus: ['Design Thinking & User Research', 'Wireframing & Visual Hierarchy', 'Interactive Prototyping in Figma', 'Component libraries & Typography grids', 'Usability Testing & analytics', 'Design Portfolio building'],
      price: '$450',
      description: 'Create user interfaces that look alive and premium. Master advanced Figma component styling, micro-interactions, layout grids, and user journey flows.'
    },
    {
      id: 'course-5',
      title: 'Aptitude & Placement Accelerator',
      duration: '6 Weeks',
      type: 'Classroom & Online Practice',
      hours: '40+ Hours practice labs',
      rating: '4.9/5 (2,400+ reviews)',
      syllabus: ['Quantitative Aptitude & math drills', 'Logical Reasoning & patterns analysis', 'Verbal Ability & reading comprehensions', 'Resume Optimization workshops', 'Corporate HR Mock Interviews', 'Coding tests preparation basics'],
      price: '$199',
      description: 'Crack placement rounds of top product and service firms. Accelerate problem solving speed, learn shortcut math methods, and build mock confidence.'
    }
  ];

  // Coaching Branches
  const branchesList = [
    {
      city: 'Chennai Branch (Tamil Nadu)',
      address: '100 Anna Salai, Guindy, Chennai, Tamil Nadu - 600032',
      phone: '+91 44 2235 1234',
      email: 'chennai.training@jobportal.com',
      hours: 'Mon - Sat: 09:00 AM - 08:00 PM',
      coordinates: { x: 45, y: 35 } // visual placement marker
    },
    {
      city: 'Bengaluru Branch (Karnataka)',
      address: '45 Outer Ring Road, Hebbal, Bengaluru, Karnataka - 560045',
      phone: '+91 80 4153 9876',
      email: 'blr.training@jobportal.com',
      hours: 'Mon - Sat: 09:00 AM - 08:30 PM',
      coordinates: { x: 75, y: 65 }
    }
  ];

  // Mock Placement Test Questions
  const mockTestQuestions = [
    {
      q: 'Which of the following is correct about JavaScript variables declared with "const"?',
      options: [
        'They are block-scoped and cannot be reassigned.',
        'They are hoisted to the top and automatically set to undefined.',
        'They can be reassigned anywhere in the script.',
        'They are globally scoped by default.'
      ],
      correct: 0,
      explain: '"const" declares a block-scoped variable whose value cannot be reassigned once initialized.'
    },
    {
      q: 'In Java, which of these is used to prevent method overriding?',
      options: [
        'static keyword',
        'final keyword',
        'abstract keyword',
        'synchronized keyword'
      ],
      correct: 1,
      explain: 'A "final" method in Java cannot be overridden by subclasses.'
    },
    {
      q: 'Which MongoDB command is used to display all indexes created on a collection?',
      options: [
        'db.collection.showIndexes()',
        'db.collection.listIndexes()',
        'db.collection.getIndexes()',
        'db.collection.findIndexes()'
      ],
      correct: 2,
      explain: '"db.collection.getIndexes()" returns an array of documents that describe the indexes on the collection.'
    },
    {
      q: 'What is the correct value for the CSS "position" property to make an element sit relative to the viewport?',
      options: [
        'position: absolute',
        'position: fixed',
        'position: sticky',
        'position: static'
      ],
      correct: 1,
      explain: '"position: fixed" positions the element relative to the browser viewport, meaning it stays in the exact same place even when scrolled.'
    },
    {
      q: 'Find the missing number in the series: 3, 9, 27, 81, ?',
      options: [
        '162',
        '243',
        '324',
        '108'
      ],
      correct: 1,
      explain: 'Each successive term in the series is multiplied by 3. 81 * 3 = 243.'
    }
  ];

  const handleEnrollSubmit = (e) => {
    e.preventDefault();
    if (!enrollName || !enrollEmail) {
      addToast('Please enter enrollment credentials.', 'error');
      return;
    }
    setEnrolledCourses([...enrolledCourses, selectedCourse.id]);
    addToast(`Successfully enrolled in "${selectedCourse.title}"! Our branch counselor will contact you.`, 'success');
    setSelectedCourse(null);
    setEnrollName('');
    setEnrollEmail('');
  };

  const handleAnswerSelect = (qIdx, optIdx) => {
    setSelectedAnswers({
      ...selectedAnswers,
      [qIdx]: optIdx
    });
  };

  const submitMockTest = () => {
    // Grade test
    let score = 0;
    mockTestQuestions.forEach((q, idx) => {
      if (selectedAnswers[idx] === q.correct) {
        score += 1;
      }
    });

    setTestResult({
      score,
      total: mockTestQuestions.length,
      percentage: (score / mockTestQuestions.length) * 100
    });
  };

  const resetMockTest = () => {
    setTestStarted(false);
    setCurrentQuestionIndex(0);
    setSelectedAnswers({});
    setTestResult(null);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8 space-y-12 animate-fade-in text-left">
      
      {/* Title */}
      <section className="text-center space-y-4 max-w-2xl mx-auto">
        <h1 className="text-3xl sm:text-5xl font-extrabold font-outfit text-slate-900 tracking-tight">
          Training & Placement Academies
        </h1>
        <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-medium">
          Boost your technical stack with professional classroom bootcamps, locate a branch, and test your readiness with our interactive placement simulator.
        </p>
      </section>

      {/* Tabs Switcher */}
      <div className="flex border-b border-slate-200 gap-6 justify-center">
        {[
          { id: 'courses', label: 'Bootcamp Courses', icon: <BookOpen className="w-4 h-4" /> },
          { id: 'locations', label: 'Branch Locations', icon: <MapPin className="w-4 h-4" /> },
          { id: 'exams', label: 'Mock Exams & Tests', icon: <Award className="w-4 h-4" /> }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => handleTabChange(tab.id)}
            className={`flex items-center gap-2 pb-3 text-sm font-semibold border-b-2 transition-all cursor-pointer ${
              activeTab === tab.id
                ? 'border-violet-600 text-violet-600'
                : 'border-transparent text-slate-400 hover:text-slate-250'
            }`}
          >
            {tab.icon}
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* VIEW: BOOTCAMP COURSES */}
      {activeTab === 'courses' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {coursesList.map(course => {
            const isEnrolled = enrolledCourses.includes(course.id);
            return (
              <div 
                key={course.id}
                className="p-6 rounded-3xl border border-slate-200 bg-white shadow-sm flex flex-col justify-between gap-6 hover:border-violet-500/30 hover:shadow-md transition-all"
              >
                <div className="space-y-4">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="px-2.5 py-0.5 rounded-full border border-violet-500/25 bg-violet-500/5 text-violet-600 text-[9px] font-bold uppercase tracking-wider">
                      {course.duration}
                    </span>
                    <span className="text-[10px] text-slate-400 font-semibold">{course.rating}</span>
                  </div>

                  <h3 className="text-xl font-extrabold text-slate-900 font-outfit leading-tight">{course.title}</h3>
                  <p className="text-xs text-slate-500 font-semibold">{course.type} • {course.hours}</p>
                  <p className="text-xs text-slate-600 leading-relaxed">{course.description}</p>

                  <div className="space-y-2 pt-2 border-t border-slate-100">
                    <h4 className="text-[10px] uppercase font-bold tracking-wider text-slate-400">Syllabus Highlights</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                      {course.syllabus.map((syl, i) => (
                        <div key={i} className="flex gap-1.5 items-center text-xs">
                          <CheckCircle className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                          <span className="text-slate-650 font-medium truncate">{syl}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-4">
                  <div>
                    <span className="text-[9px] uppercase font-bold text-slate-400 block tracking-wider">Course Fees</span>
                    <span className="text-sm font-extrabold text-slate-900">{course.price}</span>
                  </div>

                  {isEnrolled ? (
                    <div className="py-2.5 px-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 text-xs font-bold flex items-center gap-1">
                      <CheckCircle className="w-3.5 h-3.5" />
                      <span>Enrolled</span>
                    </div>
                  ) : (
                    <button
                      onClick={() => setSelectedCourse(course)}
                      className="px-5 py-2.5 bg-violet-600 hover:bg-violet-500 text-white rounded-xl text-xs font-bold cursor-pointer transition-colors"
                    >
                      Enroll Now
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* VIEW: BRANCH LOCATIONS */}
      {activeTab === 'locations' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          
          {/* Branch Cards */}
          <div className="lg:col-span-1 space-y-6">
            {branchesList.map((branch, idx) => (
              <div key={idx} className="p-6 rounded-2xl border border-slate-200 bg-white shadow-sm hover:border-violet-500/20 transition-all space-y-4">
                <div className="space-y-1">
                  <h3 className="text-lg font-bold text-slate-900 font-outfit">{branch.city}</h3>
                  <p className="text-xs text-slate-500 flex items-start gap-1.5 leading-relaxed font-semibold">
                    <MapPin className="w-4 h-4 text-violet-500 shrink-0 mt-0.5" />
                    <span>{branch.address}</span>
                  </p>
                </div>

                <div className="space-y-2 pt-3 border-t border-slate-100 text-xs text-slate-650">
                  <div className="flex items-center gap-2">
                    <Phone className="w-3.5 h-3.5 text-slate-400" />
                    <span>{branch.phone}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail className="w-3.5 h-3.5 text-slate-400" />
                    <span>{branch.email}</span>
                  </div>
                  <div className="flex items-center gap-2 font-medium">
                    <Clock className="w-3.5 h-3.5 text-violet-500" />
                    <span>{branch.hours}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Mock Google Map Canvas */}
          <div className="lg:col-span-2 p-6 rounded-3xl border border-slate-200 bg-white shadow-sm space-y-4">
            <h3 className="text-sm font-bold text-slate-950 uppercase tracking-wider font-outfit">Visual Center Maps</h3>
            
            {/* Map Switcher Buttons */}
            <div className="flex gap-2 mb-2">
              <button 
                onClick={() => setActiveMap('chennai')}
                className={`px-3.5 py-2 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
                  activeMap === 'chennai' 
                    ? 'bg-violet-600 text-white shadow-md' 
                    : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                }`}
              >
                Chennai Branch Map
              </button>
              <button 
                onClick={() => setActiveMap('bengaluru')}
                className={`px-3.5 py-2 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
                  activeMap === 'bengaluru' 
                    ? 'bg-violet-600 text-white shadow-md' 
                    : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                }`}
              >
                Bengaluru Branch Map
              </button>
            </div>

            <div className="relative h-96 rounded-2xl border border-slate-200 overflow-hidden">
              <iframe
                src={activeMap === 'chennai'
                  ? "https://maps.google.com/maps?q=Guindy,%20Chennai,%20Tamil%20Nadu&t=&z=14&ie=UTF8&iwloc=&output=embed"
                  : "https://maps.google.com/maps?q=Hebbal,%20Bengaluru,%20Karnataka&t=&z=14&ie=UTF8&iwloc=&output=embed"
                }
                className="w-full h-full border-0"
                allowFullScreen=""
                loading="lazy"
                title="Google Maps Location"
              ></iframe>
            </div>
          </div>
        </div>
      )}

      {/* VIEW: EXAMS & MOCK TESTS */}
      {activeTab === 'exams' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          
          {/* Syllabus & Exam schedules */}
          <div className="lg:col-span-1 space-y-6">
            <div className="p-6 rounded-2xl border border-slate-200 bg-white shadow-sm space-y-4">
              <h3 className="text-sm font-bold text-slate-950 uppercase tracking-wider font-outfit">Syllabus Resources</h3>
              
              <div className="space-y-3.5">
                {[
                  { name: 'Full Stack Java syllabus.pdf', size: '1.2 MB' },
                  { name: 'MERN Stack course path.pdf', size: '940 KB' },
                  { name: 'Placement Aptitude questions.pdf', size: '2.1 MB' }
                ].map((doc, idx) => (
                  <div key={idx} className="flex items-center justify-between p-3 rounded-xl border border-slate-100 bg-slate-50 hover:bg-slate-100/50 transition-colors">
                    <div className="flex items-center gap-2">
                      <FileText className="w-4 h-4 text-violet-500 shrink-0" />
                      <div className="text-xs truncate max-w-[130px]">
                        <span className="font-semibold text-slate-900 block truncate">{doc.name}</span>
                        <span className="text-[9px] text-slate-400">{doc.size}</span>
                      </div>
                    </div>
                    <button
                      onClick={() => addToast(`Downloading ${doc.name} prep syllabus...`, 'success')}
                      className="px-2.5 py-1 text-[9px] font-bold text-violet-600 bg-white border border-slate-200 hover:border-violet-500/30 rounded-md cursor-pointer"
                    >
                      Download
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-6 rounded-2xl border border-slate-200 bg-white shadow-sm space-y-4">
              <h3 className="text-sm font-bold text-slate-950 uppercase tracking-wider font-outfit">Upcoming Test Schedules</h3>
              <div className="space-y-3.5 text-xs text-slate-650">
                <div className="flex justify-between border-b border-slate-100 pb-2">
                  <span className="font-semibold text-slate-800">MERN Placement Exam</span>
                  <span className="text-violet-600 font-bold">Aug 15, 2026</span>
                </div>
                <div className="flex justify-between border-b border-slate-100 pb-2">
                  <span className="font-semibold text-slate-800">Java Spring Assessment</span>
                  <span className="text-violet-600 font-bold">Aug 22, 2026</span>
                </div>
                <div className="flex justify-between pb-1">
                  <span className="font-semibold text-slate-800">Cognitive Aptitude Challenge</span>
                  <span className="text-violet-600 font-bold">Sep 05, 2026</span>
                </div>
              </div>
            </div>
          </div>

          {/* Interactive Mock Test System */}
          <div className="lg:col-span-2 p-8 rounded-3xl border border-slate-200 bg-white shadow-sm space-y-6">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div>
                <h3 className="text-lg font-extrabold text-slate-900 font-outfit">Aptitude & Technical Mock Test</h3>
                <span className="text-[10px] text-slate-500 font-semibold uppercase tracking-wider">Placement Simulation</span>
              </div>
              <button
                onClick={resetMockTest}
                className="p-2 rounded-lg bg-slate-550 border border-slate-200 hover:border-slate-350 text-slate-500 hover:text-slate-850 cursor-pointer"
                title="Restart Quiz"
              >
                <RefreshCw className="w-4 h-4" />
              </button>
            </div>

            {!testStarted ? (
              <div className="py-8 text-center space-y-6 max-w-md mx-auto flex flex-col items-center">
                <div className="p-4 rounded-full bg-violet-500/5 border border-violet-500/10 text-violet-500 animate-pulse">
                  <HelpCircle className="w-12 h-12" />
                </div>
                <div className="space-y-2">
                  <h4 className="text-base font-bold text-slate-900">Placement Assessment Simulator</h4>
                  <p className="text-xs text-slate-650 leading-relaxed font-medium">
                    This interactive mock exam features 5 multiple-choice questions covering JavaScript scope, Java OOP rules, MongoDB APIs, CSS viewport styling, and logical math.
                  </p>
                </div>
                <button
                  onClick={() => setTestStarted(true)}
                  className="px-8 py-3 rounded-xl bg-violet-600 hover:bg-violet-500 text-white text-xs font-bold shadow-md cursor-pointer"
                >
                  Start Assessment
                </button>
              </div>
            ) : testResult ? (
              <div className="py-6 text-center space-y-6 max-w-md mx-auto flex flex-col items-center">
                <div className="p-4 rounded-full bg-emerald-500/5 border border-emerald-500/10 text-emerald-500">
                  <CheckCircle className="w-12 h-12" />
                </div>
                <div className="space-y-1">
                  <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">Assessment Result</span>
                  <h4 className="text-3xl font-black font-outfit text-slate-900">{testResult.score} / {testResult.total}</h4>
                  <p className="text-xs font-bold text-slate-600">Your score: {testResult.percentage}%</p>
                </div>
                <div className="text-xs text-slate-650 font-medium leading-relaxed bg-slate-50 p-4 rounded-xl border border-slate-100">
                  {testResult.percentage >= 60 
                    ? 'Excellent job! You possess strong fundamentals. Keep writing code and preparing for placements.' 
                    : 'A bit more practice is required. We recommend enrolling in our Aptitude Accelerator bootcamp to clear threshold metrics.'}
                </div>
                <button
                  onClick={resetMockTest}
                  className="px-6 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold cursor-pointer"
                >
                  Retake Test
                </button>
              </div>
            ) : (
              <div className="space-y-6">
                {/* Question tracker */}
                <div className="flex justify-between items-center text-xs">
                  <span className="text-slate-400 font-bold uppercase tracking-wider">Question {currentQuestionIndex + 1} of {mockTestQuestions.length}</span>
                  <span className="text-violet-600 font-semibold">Active Assessment</span>
                </div>

                {/* Active Question */}
                <div className="space-y-4">
                  <div className="text-sm font-bold text-slate-900 leading-snug">
                    {mockTestQuestions[currentQuestionIndex].q}
                  </div>

                  <div className="space-y-3">
                    {mockTestQuestions[currentQuestionIndex].options.map((opt, oIdx) => {
                      const isSelected = selectedAnswers[currentQuestionIndex] === oIdx;
                      return (
                        <button
                          key={oIdx}
                          onClick={() => handleAnswerSelect(currentQuestionIndex, oIdx)}
                          className={`w-full text-left p-3.5 rounded-xl border text-xs font-semibold transition-all cursor-pointer flex gap-3 items-center ${
                            isSelected
                              ? 'border-violet-500 bg-violet-500/5 text-violet-600'
                              : 'border-slate-200 bg-white hover:bg-slate-50 text-slate-700'
                          }`}
                        >
                          <div className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 ${
                            isSelected ? 'border-violet-600 bg-violet-600' : 'border-slate-300 bg-white'
                          }`}>
                            {isSelected && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                          </div>
                          <span>{opt}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Nav buttons */}
                <div className="flex justify-between items-center pt-6 border-t border-slate-100">
                  <button
                    disabled={currentQuestionIndex === 0}
                    onClick={() => setCurrentQuestionIndex(currentQuestionIndex - 1)}
                    className="px-4 py-2 border border-slate-250 hover:bg-slate-50 text-slate-500 rounded-lg text-xs font-bold disabled:opacity-40 disabled:hover:bg-transparent cursor-pointer"
                  >
                    Previous
                  </button>

                  {currentQuestionIndex === mockTestQuestions.length - 1 ? (
                    <button
                      onClick={submitMockTest}
                      className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-bold shadow cursor-pointer"
                    >
                      Submit Exam
                    </button>
                  ) : (
                    <button
                      onClick={() => setCurrentQuestionIndex(currentQuestionIndex + 1)}
                      className="px-6 py-2.5 bg-violet-600 hover:bg-violet-500 text-white rounded-lg text-xs font-bold shadow cursor-pointer"
                    >
                      Next Question
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Course Enrollment Modal */}
      {selectedCourse && (
        <Modal
          isOpen={!!selectedCourse}
          onClose={() => setSelectedCourse(null)}
          title={`Enroll: ${selectedCourse.title}`}
        >
          <form onSubmit={handleEnrollSubmit} className="space-y-4 text-left">
            <div className="space-y-1 text-slate-650">
              <span className="text-[9px] uppercase tracking-wider font-bold text-slate-400">Bootcamp details</span>
              <p className="text-xs font-semibold text-slate-800">Syllabus is tailored for placements. Course fees: {selectedCourse.price}</p>
            </div>

            <div className="space-y-1.5">
              <label className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">Student Full Name *</label>
              <input
                type="text"
                required
                value={enrollName}
                onChange={(e) => setEnrollName(e.target.value)}
                placeholder="Alex Rivera"
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-white text-xs outline-none focus:border-violet-500 text-slate-900"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">Contact Email *</label>
              <input
                type="email"
                required
                value={enrollEmail}
                onChange={(e) => setEnrollEmail(e.target.value)}
                placeholder="alex@example.com"
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-white text-xs outline-none focus:border-violet-500 text-slate-900"
              />
            </div>

            <div className="pt-4 border-t border-slate-100 flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setSelectedCourse(null)}
                className="px-5 py-2.5 rounded-xl border border-slate-200 hover:bg-slate-100 text-slate-500 text-xs font-semibold cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2.5 bg-violet-600 hover:bg-violet-500 text-white text-xs font-bold shadow-lg cursor-pointer"
              >
                Confirm Enrollment
              </button>
            </div>
          </form>
        </Modal>
      )}

    </div>
  );
}
