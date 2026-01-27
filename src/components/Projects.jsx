import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useTheme } from '../contexts/ThemeContext';
import dictionaryVideo from '../assets/Dictionary.mp4';
import bjpVideo from '../assets/bjp_web.mp4';
import openhrVideo from '../assets/openhr.mp4';
import smartshowVideo from '../assets/smartshow.mp4';

gsap.registerPlugin(ScrollTrigger);

const Projects = () => {
  const { isDark } = useTheme();
  const projectsRef = useRef(null);
  const filterButtonsRef = useRef(null);

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true
    });

    // GSAP Filter Buttons Animation
    gsap.fromTo(filterButtonsRef.current,
      { opacity: 0, y: -20 },
      { 
        opacity: 1, 
        y: 0, 
        duration: 0.8, 
        ease: "power3.out",
        scrollTrigger: {
          trigger: filterButtonsRef.current,
          start: "top center+=100"
        }
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  const projects = [
    {
      title: "Dictionary App",
      description: "A comprehensive dictionary application built with React.js and Axios for fetching word definitions, pronunciations, and examples from external APIs.",
      video: dictionaryVideo,
      technologies: ["React.js", "Axios", "Tailwind CSS"],
      liveUrl: "https://sneh-cmd.github.io/dictionary/",
      githubUrl: "https://github.com/sneh-cmd/dictionary",
      category: "web"
    },
    {
      title: "BJP Wings",
      description: "A political organization website featuring dynamic content management, member registration, and event management system.",
      video: bjpVideo,
      technologies: ["React.js", "JavaScript", "HTML", "CSS", "Tailwind CSS"],
      liveUrl: "http://mmc.mhbjplok.com:8080/",
      githubUrl: "#",
      category: "web"
    },
    {
      title: "OpenHR",
      description: "A modern HR management platform with intuitive design for employee onboarding, payroll processing, and performance tracking with beautiful UI/UX.",
      video: openhrVideo,
      technologies: ["HTML", "Tailwind CSS", "AOS", "GSAP"],
      liveUrl: "http://openhrfrontend.lv.pwtech.pw/HR/index.html",
      githubUrl: "#",
      category: "design"
    },
    {
      title: "SmartShow",
      description: "Smart Show — our intelligent presentation management system designed to simplify, automate, and elevate professional presentations. From managing slides and videos to real-time control and analytics, Smart Show delivers a seamless, all-in-one experience for modern events and enterprises.",
      video: smartshowVideo,
      technologies: ["React.js", "javascript", "State Management"],
      liveUrl: "#",
      githubUrl: "#",
      category: "web"
    }
  ];

  const categories = ["all", "web", "mobile", "design"];
  const [activeCategory, setActiveCategory] = React.useState("all");

  const filteredProjects = activeCategory === "all" 
    ? projects 
    : projects.filter(project => project.category === activeCategory);

  return (
    <div className="min-h-screen pt-8 md:pt-8 pl-0 md:pl-64 transition-colors duration-300 text-white">
      <div className="container mx-auto px-4 py-8 md:py-16">
        {/* Section Title */}
        <div 
          data-aos="fade-up"
          className="text-center mb-8 md:mb-16"
        >
          <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold mb-3 md:mb-4 bg-gradient-to-r from-gray-300 to-gray-400 bg-clip-text text-transparent"
           style={{ fontFamily: 'Acorn, sans-serif' }}>
            My recent projects
          </h2>
          <p className="text-sm md:text-lg text-gray-300">
            Explore my recent work and creative projects
          </p>
        </div>

        {/* Filter Buttons */}
        <div 
          ref={filterButtonsRef}
          className="flex flex-wrap justify-center gap-2 md:gap-4 mb-8 md:mb-12"
        >
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-4 py-2 md:px-6 md:py-2 rounded-full text-xs md:text-sm font-medium transition-all duration-300 ${
                activeCategory === category
                  ? 'bg-gray-700 text-white shadow-lg shadow-gray-600/25'
                  : 'bg-white/10 text-gray-300 hover:bg-white/20 border border-white/20'
              }`}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
          ))}
        </div>

        {/* Projects List */}
        <div className="space-y-8 md:space-y-16">
          {filteredProjects.map((project, index) => (
            <div
              key={index}
              data-aos="fade-up"
              data-aos-delay={index * 100}
              className={`flex flex-col ${
                index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'
              } gap-6 md:gap-8 lg:gap-12 items-center`}
            >
              {/* Project Image/Video */}
              <div className="flex-1">
                <div className="relative overflow-hidden rounded-2xl">
                  {project.video ? (
                    <video 
                      src={project.video} 
                      autoPlay 
                      loop 
                      muted 
                      playsInline
                      className="w-full h-48 md:h-64 lg:h-80 object-cover transition-transform duration-500 hover:scale-105"
                    />
                  ) : (
                    <img 
                      src={project.image} 
                      alt={project.title}
                      className="w-full h-48 md:h-64 lg:h-80 object-cover transition-transform duration-500 hover:scale-105"
                    />
                  )}
                </div>
              </div>

              {/* Project Content */}
              <div className="flex-1 space-y-3 md:space-y-4">
                <h3 className="text-xl md:text-3xl lg:text-4xl font-bold text-white">
                  {project.title}
                </h3>
                
                <p className="text-sm md:text-lg leading-relaxed text-gray-300">
                  {project.description}
                </p>

                {/* Technologies */}
                <div className="flex flex-wrap gap-1 md:gap-2">
                  {project.technologies.map((tech, techIndex) => (
                    <span
                      key={techIndex}
                      className="px-2 py-1 md:px-3 md:py-1 rounded-full text-xs md:text-sm font-medium bg-gradient-to-r from-white/30 to-white/10 text-white border border-gray-600/30 shadow-md backdrop-blur-sm"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2 md:gap-4 pt-2">
                  {project.liveUrl !== "#" && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 md:px-6 md:py-2 rounded-lg text-xs md:text-sm font-medium transition-all duration-300 bg-green-600 text-white hover:bg-green-700"
                    >
                      Live
                    </a>
                  )}
                  {project.githubUrl !== "#" && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 md:px-6 md:py-2 rounded-lg text-xs md:text-sm font-medium transition-all duration-300 bg-gray-700 text-white hover:bg-gray-800"
                    >
                      Code
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredProjects.length === 0 && (
          <div 
            data-aos="fade-up"
            className="text-center py-8 md:py-16"
          >
            <div className="text-4xl md:text-6xl mb-3 md:mb-4 text-gray-600">
              📁
            </div>
            <h3 className="text-lg md:text-2xl font-bold mb-2 text-white">
              No projects found
            </h3>
            <p className="text-sm md:text-base text-gray-400">
              Try selecting a different category
            </p>
          </div>
        )}

        {/* Call to Action */}
        <div 
          data-aos="fade-up"
          className="mt-8 md:mt-16 p-4 md:p-8 rounded-2xl text-center backdrop-blur-md border bg-gradient-to-r from-gray-700/20 to-gray-600/20 border-gray-500/30"
        >
          <h3 className="text-xl md:text-3xl font-bold mb-3 md:mb-4 text-white">
            Interested in working together?
          </h3>
          <p className="mb-4 md:mb-6 text-sm md:text-base text-gray-300">
            I'm always open to discussing new projects and opportunities
          </p>
          <a
            href="#contact"
            className="inline-flex items-center px-6 py-2 md:px-8 md:py-3 rounded-lg text-sm md:text-base font-semibold transition-all duration-300 bg-white text-slate-900 hover:bg-gray-100"
          >
            Get In Touch
            <svg className="w-4 h-4 md:w-5 md:h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Projects;
