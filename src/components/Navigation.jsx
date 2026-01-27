import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { useTheme } from '../contexts/ThemeContext';

const Navigation = () => {
  const { theme, toggleTheme, isDark } = useTheme();
  const navRef = useRef(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const [activeSection, setActiveSection] = useState('#welcome');

  useEffect(() => {
    // Check screen size on mount and resize
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  useEffect(() => {
    // GSAP Navigation Animation
    gsap.fromTo(navRef.current,
      { opacity: 0, y: -20 },
      { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }
    );

    // Scroll-based active section detection
    const handleScroll = () => {
      const sections = ['welcome', 'about', 'projects', 'skills', 'contact'];
      const scrollPosition = window.scrollY + 100; // Offset for navigation height

      for (const section of sections) {
        const element = document.querySelector(`#${section}`);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(`#${section}`);
            break;
          }
        }
      }
    };

    // Initial check
    handleScroll();

    // Add scroll listener
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isActive = (href) => {
    return activeSection === href;
  };

  const handleNavClick = (e, href) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
    // Close mobile menu after navigation
    if (isMobile) {
      setIsMobileMenuOpen(false);
    }
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  useEffect(() => {
    // Prevent body scroll when mobile menu is open
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  const navItems = [
    { name: 'HOME', href: '#welcome' },
    { name: 'ABOUT', href: '#about' },
    { name: 'PROJECTS', href: '#projects' },
    { name: 'SKILLS', href: '#skills' },
    { name: 'CONTACT', href: '#contact' }
  ];

  return (
    <>
      {/* Mobile Navigation Bar */}
      {isMobile && (
        <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-sm border-b border-white/10">
          <div className="flex items-center justify-between px-4 py-2">
            {/* Logo/Brand */}
            <div className="flex items-center space-x-2">
              <span className="text-xl font-bold text-white">
                &lt;/&gt;
              </span>
              <span className="text-sm font-mono text-gray-300">
                SD
              </span>
            </div>
            
            {/* Hamburger Menu Button */}
            <button
              onClick={toggleMobileMenu}
              className={`p-2 rounded-lg text-white transition-all duration-300 ease-in-out ${
                isMobileMenuOpen ? 'hover:bg-white/20' : 'hover:bg-white/10'
              }`}
              aria-label="Toggle menu"
            >
              <svg 
                className={`w-6 h-6 transition-all duration-300 ease-in-out ${
                  isMobileMenuOpen ? 'rotate-90' : 'rotate-0'
                }`} 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                {isMobileMenuOpen ? (
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M6 18L18 6M6 6l12 12" 
                  />
                ) : (
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M4 6h16M4 12h16M4 18h16" 
                  />
                )}
              </svg>
            </button>
          </div>
        </nav>
      )}

      {/* Mobile Menu Overlay */}
      {isMobile && (
        <div 
          className={`fixed inset-0 z-40 transition-all duration-300 ease-in-out ${
            isMobileMenuOpen 
              ? 'bg-black/80 backdrop-blur-sm opacity-100 visible' 
              : 'bg-black/0 backdrop-blur-none opacity-0 invisible'
          }`}
          onClick={toggleMobileMenu}
        >
          <div 
            className={`flex flex-col items-center justify-center h-full space-y-4 transition-all duration-300 ease-in-out transform ${
              isMobileMenuOpen 
                ? 'translate-y-0 opacity-100 scale-100' 
                : 'translate-y-8 opacity-0 scale-95'
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            {navItems.map((item, index) => (
              <a
                key={item.name}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                className={`text-xl font-medium px-6 py-3 rounded-lg transition-all duration-300 transform hover:scale-105 ${
                  activeSection === item.href 
                    ? 'bg-white/20 text-white' 
                    : 'text-white hover:text-gray-200'
                }`}
                style={{
                  transitionDelay: isMobileMenuOpen ? `${index * 100}ms` : '0ms'
                }}
              >
                {item.name}
              </a>
            ))}
          </div>
        </div>
      )}

      {/* Desktop Sidebar Navigation */}
      {!isMobile && (
        <nav 
          ref={navRef}
          className="fixed left-0 top-0 bottom-0 w-56 z-50 backdrop-blur-sm border-r border-white/10"
        >
          <div className="flex flex-col h-full p-6">
            

            {/* Navigation Items - Vertically Centered */}
            <div className="flex-1 flex flex-col space-y-2 ml-6 justify-center">
                {/* Logo/Brand */}
              <div className="flex items-center space-x-2 mb-8">
                <span className="text-xl font-bold text-white">
                  &lt;/&gt;
                </span>
                <span className="text-sm font-mono text-gray-300">
                  SD
                </span>
              </div>
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  className={`flex items-center space-x-3 px-4 py-2 rounded-lg transition-all duration-300 ${
                    activeSection === item.href 
                      ? 'bg-white/20 text-white' 
                      : 'text-white hover:text-gray-200'
                  }`}
                >
                  <span className="">{item.name}</span>
                </a>
              ))}
            </div>

            {/* Empty div for balance */}
            <div className="mb-32"></div>
          </div>
        </nav>
      )}

      {/* Theme Toggle Button - Fixed at Bottom Right */}
      <div className="fixed bottom-8 right-8 z-50">
        <button
          onClick={toggleTheme}
          className="p-3 rounded-full shadow-lg transition-all duration-300 bg-white/10 text-yellow-400 hover:bg-white/20"
          aria-label="Toggle theme"
        >
          {isDark ? (
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
          </svg>
          ) : (
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
              <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
            </svg>
          )}
        </button>
      </div>
    </>
  );
};

export default Navigation;
