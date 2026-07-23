import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Toast from './components/Toast';
import Home from './pages/Home';
import Jobs from './pages/Jobs';
import About from './pages/About';
import Contact from './pages/Contact';
import Auth from './pages/Auth';
import CandidateDashboard from './pages/CandidateDashboard';
import EmployerDashboard from './pages/EmployerDashboard';
import AdminDashboard from './pages/AdminDashboard';
import Companies from './pages/Companies';
import Coaching from './pages/Coaching';
import Mentorship from './pages/Mentorship';
import { getSession, logout, initializeDB } from './mockData';

export default function App() {
  const [currentView, setView] = useState('home'); // 'home' | 'jobs' | 'about' | 'contact' | 'auth' | 'dashboard' | 'companies' | 'coaching' | 'mentorship'
  const [authMode, setAuthMode] = useState('login'); // 'login' | 'register'
  const [userSession, setUserSession] = useState(null);
  const [toast, setToast] = useState(null);
  const [subSection, setSubSection] = useState('');
  
  // Job filters passed from Home search to Jobs panel
  const [jobFilters, setJobFilters] = useState({
    query: '',
    location: '',
    type: '',
    experience: ''
  });

  // Global details viewer
  const [selectedJob, setSelectedJob] = useState(null);

  // Initialize DB on first render
  useEffect(() => {
    initializeDB();
    setUserSession(getSession());
  }, []);

  const addToast = (message, type = 'success') => {
    setToast({ message, type });
  };

  const handleLogout = () => {
    logout();
    setUserSession(null);
    setView('home');
    addToast('Logged out successfully.', 'info');
  };

  // Scroll to top on page transition
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentView]);

  // Route wrapper
  const renderView = () => {
    switch (currentView) {
      case 'home':
        return (
          <Home 
            setView={setView} 
            setJobFilters={setJobFilters} 
            setSelectedJob={setSelectedJob} 
          />
        );
      case 'jobs':
        return (
          <Jobs 
            userSession={userSession} 
            setView={setView} 
            setAuthMode={setAuthMode} 
            filters={jobFilters} 
            setFilters={setJobFilters}
            addToast={addToast}
          />
        );
      case 'about':
        return <About />;
      case 'companies':
        return <Companies subSection={subSection} setSubSection={setSubSection} addToast={addToast} />;
      case 'coaching':
        return <Coaching subSection={subSection} setSubSection={setSubSection} addToast={addToast} />;
      case 'mentorship':
        return <Mentorship subSection={subSection} setSubSection={setSubSection} addToast={addToast} />;
      case 'contact':
        return <Contact addToast={addToast} />;
      case 'auth':
        return (
          <Auth 
            setView={setView} 
            setUserSession={setUserSession} 
            initialMode={authMode} 
            addToast={addToast} 
          />
        );
      case 'dashboard':
        if (!userSession) {
          setView('auth');
          return null;
        }
        if (userSession.role === 'candidate') {
          return (
            <CandidateDashboard 
              userSession={userSession} 
              addToast={addToast} 
              setView={setView} 
              setSelectedJob={setSelectedJob} 
            />
          );
        }
        if (userSession.role === 'employer') {
          return (
            <EmployerDashboard 
              userSession={userSession} 
              addToast={addToast} 
            />
          );
        }
        if (userSession.role === 'admin') {
          return (
            <AdminDashboard 
              userSession={userSession} 
              addToast={addToast} 
            />
          );
        }
        return null;
      default:
        return <Home setView={setView} setJobFilters={setJobFilters} setSelectedJob={setSelectedJob} />;
    }
  };

  return (
    <div className="light-theme bg-white text-slate-900 selection:bg-violet-600 selection:text-white flex flex-col min-h-screen">
      {/* Sticky Top Header */}
      <Navbar 
        currentView={currentView} 
        setView={setView} 
        userSession={userSession} 
        onLogout={handleLogout} 
        setAuthMode={setAuthMode} 
        setSubSection={setSubSection}
        setJobFilters={setJobFilters}
      />

      {/* Main Container */}
      <main className="flex-1 w-full max-w-7xl mx-auto py-4">
        {renderView()}
      </main>

      {/* Multi-column Footer */}
      {!userSession && currentView === 'home' && <Footer setView={setView} />}

      {/* Notifications */}
      {toast && (
        <Toast 
          message={toast.message} 
          type={toast.type} 
          onClose={() => setToast(null)} 
        />
      )}
    </div>
  );
}
