import { useState, useEffect } from 'react';
import AuthModule from './components/AuthModule.jsx';
import StudentPortal from './components/StudentPortal.jsx';
import FacultyPortal from './components/FacultyPortal.jsx';

export default function App() {
  const [activeView, setActiveView] = useState('student');
  const [activeTab, setActiveTab] = useState('login');

  const scrollToAuth = () => {
    setTimeout(() => {
      document.getElementById('auth')?.scrollIntoView({
        behavior: 'smooth'
      });
    }, 100);
  };

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;

      if (hash === '#login') {
        setActiveView('auth');
        setActiveTab('login');
        scrollToAuth();
      } else if (hash === '#register') {
        setActiveView('auth');
        setActiveTab('register');
        scrollToAuth();
      } else if (hash === '#student') {
        setActiveView('student');
        scrollToAuth();
      } else if (hash === '#faculty') {
        setActiveView('faculty');
        scrollToAuth();
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    handleHashChange();

    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, []);

  return (
    <>
      {activeView === 'auth' && (
        <AuthModule
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />
      )}

      {activeView === 'student' && (
        <StudentPortal
          onBackToHome={() => {
            setActiveView('auth');
            window.location.hash = '#login';
          }}
        />
      )}

      {activeView === 'faculty' && (
        <FacultyPortal
          onBackToHome={() => {
            setActiveView('auth');
            window.location.hash = '#login';
          }}
        />
      )}
    </>
  );
}
