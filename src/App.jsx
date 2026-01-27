import React, { useEffect } from 'react';
import { ThemeProvider } from './contexts/ThemeContext';
import { useTheme } from './contexts/ThemeContext';
import Navigation from './components/Navigation';
import Welcome from './components/welcome';
import About from './components/About';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Contact from './components/Contact';
import mountains from './assets/mountains.jpg';
import './App.css';

function AppContent() {
  const { isDark } = useTheme();

  useEffect(() => {
    // Smooth scrolling for anchor links
    const handleAnchorClick = (e) => {
      const href = e.getAttribute('href');
      if (href && href.startsWith('#')) {
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
          target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      }
    };

    // Add click event listeners to all anchor links
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    anchorLinks.forEach(link => {
      link.addEventListener('click', (e) => handleAnchorClick(link));
    });

    return () => {
      // Clean up event listeners
      anchorLinks.forEach(link => {
        link.removeEventListener('click', (e) => handleAnchorClick(link));
      });
    };
  }, []);

  return (
    <div 
      className="min-h-screen transition-all duration-300 bg-slate-900 text-white"
      style={{
        backgroundImage: isDark ? 'none' : `url(${mountains})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
        backgroundRepeat: 'no-repeat'
      }}
    >
      <Navigation />
      <div className="">
        <section id="welcome">
          <Welcome />
        </section>
        <section id="about">
          <About />
        </section>
        <section id="projects">
          <Projects />
        </section>
        <section id="skills">
          <Skills />
        </section>
        <section id="contact">
          <Contact />
        </section>
      </div>
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}

export default App;
