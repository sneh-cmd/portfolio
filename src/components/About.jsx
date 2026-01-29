import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useTheme } from '../contexts/ThemeContext';
import joyOfReactMascot from '../assets/joy-of-react-mascot.png';

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const { isDark } = useTheme();
  const aboutRef = useRef(null);
  const statsRef = useRef(null);
  const timelineRef = useRef(null);

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true
    });

    // GSAP Timeline Animation
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: aboutRef.current,
        start: "top center+=100",
        toggleActions: "play none none reverse"
      }
    });

    tl.fromTo(timelineRef.current,
      { opacity: 0, x: -50 },
      { opacity: 1, x: 0, duration: 0.8, ease: "power3.out" }
    );

    // Stats Counter Animation
    const stats = statsRef.current;
    if (stats) {
      const statNumbers = stats.querySelectorAll('.stat-number');
      statNumbers.forEach(stat => {
        const finalValue = parseInt(stat.getAttribute('data-value'));
        gsap.fromTo(stat,
          { textContent: 0 },
          {
            textContent: finalValue,
            duration: 2,
            ease: "power2.out",
            snap: { textContent: 1 },
            scrollTrigger: {
              trigger: stat,
              start: "top center+=100",
              toggleActions: "play none none reverse"
            }
          }
        );
      });
    }

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  const education = [
    {
      title: "Learn React JS",
      institution: "TOPS Technologies",
      duration: "July 2024 - Dec 2024",
      location: "Rajkot",
      type: "Training"
    }
  ];

  const certifications = [
    {
      title: "Certificate of Training",
      url: "https://tops-int.com/certificate/sneha-0307",
      issuer: "TOPS Technologies"
    },
    {
      title: "Completion of React JS",
      url: "https://tops-int.com/certificate/nsdc/sneha-0307",
      issuer: "NSDC"
    }
  ];

  const experience = [
    {
      title: "Front End Developer",
      company: "PW Tech Web",
      duration: "Apr 2025 - Present",
      responsibilities: [
        "Develop and maintain responsive web interfaces using React.js, JavaScript, HTML, and CSS",
        "Collaborate with designers and backend teams for API integration",
        "UI optimization and clean, reusable component development"
      ]
    }
  ];

  const stats = [
    { number: "1+", label: "Years Experience" },
    { number: "5+", label: "Projects Completed" },
    { number: "100%", label: "Client Satisfaction" }
  ];

  return (
    <>
      <style>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-20px);
          }
        }
      `}</style>
      <div className="min-h-screen pt-8 md:pt-8 pl-0 md:pl-64 transition-colors duration-300 text-white">
      <div className="container mx-auto px-4 py-8 md:py-16">
        {/* Section Title */}
        <div 
          data-aos="fade-up"
          className="text-center mb-8 md:mb-16"
        >
          <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold mb-3 md:mb-4 bg-gradient-to-r from-gray-300 to-gray-400 bg-clip-text text-transparent"
           style={{ fontFamily: 'Acorn, sans-serif' }}>
            About Me ^_^
          </h2>
          <p className="text-sm md:text-lg text-gray-300">
            Passionate Front-End Developer with a love for creating beautiful, functional web experiences
          </p>
        </div>

        {/* Profile Summary */}
        <div 
          ref={timelineRef}
          className="max-w-4xl mx-auto mb-8 md:mb-16 relative"
        >
          <div className="p-4 md:p-8 rounded-2xl backdrop-blur-md border bg-white/5 border-white/10 relative">
            <h3 className="text-lg md:text-2xl font-bold mb-3 md:mb-4 text-gray-300">
              Profile Summary
            </h3>
            <p className="text-sm md:text-base leading-relaxed text-gray-300">
              Motivated Front-End Developer with hands-on experience in React.js, JavaScript, HTML, and CSS. 
              Skilled in developing responsive, user-friendly web applications and reusable UI components. 
              Familiar with API integration for dynamic data handling. Enthusiastic about learning new technologies 
              like Node.js, and passionate about writing maintainable code. Seeking opportunities to contribute 
              to innovative projects and grow as a Front-End Developer in a collaborative team environment.
            </p>
            
            {/* Joy of React Mascot */}
            <img 
              src={joyOfReactMascot}
              alt="Joy of React Mascot"
              className="absolute -right-4 sm:-right-4 md:-right-4 lg:-right-4 xl:-right-14 -top-10 sm:-top-14 md:-top-14 lg:-top-24 xl:-top-30 w-24 h-24 sm:w-20 sm:h-20 md:w-32 md:h-32 lg:w-48 lg:h-48 xl:w-52 xl:h-64 object-contain animate-bounce"
              style={{
                filter: 'drop-shadow(0 0 20px rgba(139, 92, 246, 0.5))',
                animation: 'float 3s ease-in-out infinite'
              }}
            />
          </div>
        </div>

        {/* Stats */}
        <div 
          ref={statsRef}
          className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8 mb-8 md:mb-16"
        >
          {stats.map((stat, index) => (
            <div
              key={index}
              data-aos="fade-up"
              data-aos-delay={index * 100}
              className="p-4 md:p-8 rounded-2xl text-center backdrop-blur-md border bg-white/5 border-white/10"
            >
              <div className="stat-number text-2xl md:text-4xl lg:text-5xl font-bold mb-2 bg-gradient-to-r from-gray-300 to-gray-400 bg-clip-text text-transparent" data-value={stat.number.replace('+', '')}>
                {stat.number}
              </div>
              <div className="text-xs md:text-sm font-medium text-gray-400">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* Experience Timeline */}
        <div className="mb-8 md:mb-16">
          <h3 
            data-aos="fade-up"
            className="text-xl md:text-3xl font-bold mb-4 md:mb-8 text-gray-300"
          >
            Experience
          </h3>
          <div className="space-y-4 md:space-y-8">
            {experience.map((exp, index) => (
              <div
                key={index}
                data-aos="fade-up"
                data-aos-delay={index * 100}
                className="p-4 md:p-8 rounded-2xl backdrop-blur-md border bg-white/5 border-white/10"
              >
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-3 md:mb-4">
                  <div>
                    <h4 className="text-lg md:text-2xl font-bold text-white">
                      {exp.title}
                    </h4>
                    <p className="text-sm md:text-lg text-gray-300">
                      {exp.company}
                    </p>
                  </div>
                  <div className="text-xs md:text-sm font-mono mt-2 md:mt-0 text-gray-400">
                    {exp.duration}
                  </div>
                </div>
                <ul className="space-y-1 md:space-y-2 text-sm md:text-base text-gray-300">
                  {exp.responsibilities.map((resp, idx) => (
                    <li key={idx} className="flex items-start">
                      <span className="mr-2 text-gray-300">&#8226;</span>
                      {resp}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Education */}
        <div className="mb-8 md:mb-16">
          <h3 
            data-aos="fade-up"
            className="text-xl md:text-3xl font-bold mb-4 md:mb-8 text-gray-300"
          >
            Education
          </h3>
          <div className="space-y-4 md:space-y-8">
            {education.map((edu, index) => (
              <div
                key={index}
                data-aos="fade-up"
                data-aos-delay={index * 100}
                className="p-4 md:p-8 rounded-2xl backdrop-blur-md border bg-white/5 border-white/10"
              >
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-3 md:mb-4">
                  <div>
                    <h4 className="text-lg md:text-2xl font-bold text-white">
                      {edu.title}
                    </h4>
                    <p className="text-sm md:text-lg text-gray-300">
                      {edu.institution}
                    </p>
                  </div>
                  <div className="text-xs md:text-sm font-mono mt-2 md:mt-0 text-gray-400">
                    {edu.duration} • {edu.location}
                  </div>
                </div>
                <div className="inline-block px-2 py-1 md:px-3 md:py-1 rounded-full text-xs md:text-sm font-medium bg-gray-700/20 text-gray-300 border border-gray-600/30">
                  {edu.type}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Certifications */}
        <div>
          <h3 
            data-aos="fade-up"
            className="text-xl md:text-3xl font-bold mb-4 md:mb-8 text-gray-300"
          >
            Certifications
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
            {certifications.map((cert, index) => (
              <div
                key={index}
                data-aos="fade-up"
                data-aos-delay={index * 100}
                className="p-4 md:p-8 rounded-2xl backdrop-blur-md border bg-white/5 border-white/10"
              >
                <h4 className="text-lg md:text-xl font-bold mb-2 text-white">
                  {cert.title}
                </h4>
                <p className="mb-3 md:mb-4 text-sm md:text-base text-gray-400">
                  {cert.issuer}
                </p>
                <a
                  href={cert.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-3 py-2 md:px-4 md:py-2 rounded-lg text-xs md:text-sm font-medium transition-all duration-300 bg-gray-700/20 text-gray-300 border border-gray-600/30 hover:bg-gray-700/30"
                >
                  View Certificate
                  <svg className="w-3 h-3 md:w-4 md:h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>
      </div>
    </>
  );
};

export default About;
