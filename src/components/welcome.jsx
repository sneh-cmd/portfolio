import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useTheme } from '../contexts/ThemeContext';
import cvPDF from '../assets/sneha.pdf';

gsap.registerPlugin(ScrollTrigger);

const Welcome = () => {
  const { isDark } = useTheme();
  const heroRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const buttonRef = useRef(null);

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true
    });

    // GSAP Hero Animation
    const tl = gsap.timeline();
    tl.fromTo(titleRef.current,
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 1, ease: "power3.out" }
    )
      .fromTo(subtitleRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" },
        "-=0.5"
      )
      .fromTo(buttonRef.current,
        { opacity: 0, scale: 0.8 },
        { opacity: 1, scale: 1, duration: 0.6, ease: "back.out(1.7)" },
        "-=0.3"
      );

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <div className="min-h-screen pt-8 md:pt-8 pl-0 md:pl-64 transition-colors duration-300 overflow-hidden text-white">
      {/* Hero Section */}
      <div ref={heroRef} className="relative z-10 min-h-screen flex items-center justify-center px-4 md:px-4">
        {/* Decorative Stars - Hidden on Mobile */}
        <div className="hidden md:block absolute top-20 left-10 text-white text-2xl animate-pulse">✦</div>
        <div className="hidden md:block absolute top-12 right-48 text-white text-8xl animate-pulse animation-delay-1000">✧</div>
        <div className="hidden md:block absolute bottom-48 left-40 text-white text-8xl animate-pulse animation-delay-2000">✦</div>
        <div className="hidden md:block absolute bottom-20 right-10 text-white text-2xl animate-pulse animation-delay-3000">✧</div>
        <div className="hidden md:block absolute top-1/3 left-1/4 text-white/50 text-lg animate-pulse animation-delay-1500">✦</div>
        <div className="hidden md:block absolute top-2/3 right-1/4 text-white/50 text-xl animate-pulse animation-delay-2500">✧</div>
        
        <div className="text-center max-w-4xl md:max-w-4xl">


          {/* Main Title */}
          <h1
            ref={titleRef}
            className="text-4xl md:text-6xl lg:text-8xl font-bold mb-4 md:mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white via-gray-200 to-gray-300"
            style={{ fontFamily: 'Acorn, sans-serif' }}
          >
            Portfolio
          </h1>

          {/* Subtitle */}
          <div
            ref={subtitleRef}
            className="space-y-2 mb-6 md:mb-8"
          >
            <p className="text-lg md:text-2xl lg:text-3xl font-light text-gray-200">&gt; Front End Developer</p>
            {/* <p className="text-lg text-gray-300 font-mono">2025</p> */}
          </div>

          {/* Name and Intro */}
          <div
            data-aos="fade-up"
            className="mb-8 md:mb-12 space-y-3 md:space-y-4"
          >
            <div className="flex items-center justify-center space-x-2 md:space-x-4 text-sm md:text-xl font-mono">
              <span className="text-gray-300">_Hello I'M</span>
              <span className="text-white/80">&lt;/&gt;</span>
            </div>
            <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold text-white"
             style={{ fontFamily: 'Acorn, sans-serif' }}>
              SNEHA DHARADEV
            </h2>
          </div>

          {/* CTA Button */}
          <div
            ref={buttonRef}
            className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center items-center"
          >
            <button
              className="px-6 py-3 md:px-8 md:py-4 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 bg-gradient-to-r from-white/30 to-white/10 hover:from-white-800 hover:to-white-800 text-white hover:shadow-xl hover:shadow-gray-600/25 text-sm md:text-base"
              onClick={() => {
                // Smooth scroll to about section
                const aboutSection = document.querySelector('#about');
                if (aboutSection) {
                  aboutSection.scrollIntoView({ behavior: 'smooth' });
                }
              }}
            >
              Read More
            </button>

            <button
              className="px-6 py-3 md:px-8 md:py-4 backdrop-blur-md border rounded-full font-semibold transition-all duration-300 transform hover:scale-105 bg-white/10 border-white/20 hover:bg-white/20 text-white text-sm md:text-base"
              onClick={() => {
                // Download CV functionality using Vite module system
                const link = document.createElement('a');
                link.href = cvPDF;
                link.download = 'Sneha-Dharadev-CV.pdf';
                link.click();
              }}
            >
              Download CV
            </button>
          </div>

          {/* Social Links */}
          <div
            data-aos="fade-up"
            data-aos-delay="200"
            className="flex justify-center space-x-4 md:space-x-6 mt-8 md:mt-12"
          >
            <a
              href="https://www.linkedin.com/in/sneha-dharadev-261831332/"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors duration-300 text-white/60 hover:text-white w-5 h-5 md:w-6 md:h-6"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
              </svg>
            </a>
            <a
              href="https://github.com/sneh-cmd"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors duration-300 text-white/60 hover:text-white w-5 h-5 md:w-6 md:h-6"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
              </svg>
            </a>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div
        data-aos="fade-up"
        data-aos-delay="400"
        className="absolute bottom-4 md:bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <div className="animate-bounce">
          <svg className="w-5 h-5 md:w-6 md:h-6 text-white/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default Welcome;