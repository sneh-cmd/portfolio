import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useTheme } from '../contexts/ThemeContext';

gsap.registerPlugin(ScrollTrigger);

const Skills = () => {
  const { isDark } = useTheme();
  const skillsRef = useRef(null);
  const progressBarsRef = useRef([]);

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true
    });

    // GSAP Progress Bar Animation
    progressBarsRef.current.forEach((bar, index) => {
      if (bar) {
        const width = bar.getAttribute('data-width');
        gsap.fromTo(bar,
          { width: "0%" },
          {
            width: width,
            duration: 1.5,
            ease: "power2.out",
            delay: index * 0.1,
            scrollTrigger: {
              trigger: bar,
              start: "top center+=100",
              toggleActions: "play none none reverse"
            }
          }
        );
      }
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  const skills = [
    { name: "React.js", level: 85, category: "frontend", icon: "⚛️" },
    { name: "HTML", level: 95, category: "frontend", icon: "🌐" },
    { name: "CSS", level: 90, category: "frontend", icon: "🎨" },
    { name: "JavaScript", level: 85, category: "frontend", icon: "📜" },
    { name: "Tailwind CSS", level: 80, category: "frontend", icon: "🎯" },
    { name: "Bootstrap", level: 75, category: "frontend", icon: "🅱️" },
    // { name: "GSAP", level: 70, category: "animation", icon: "✨" },
    // { name: "AOS", level: 65, category: "animation", icon: "🎭" },
    { name: "Git", level: 75, category: "tools", icon: "📦" },
    { name: "Responsive Design", level: 90, category: "design", icon: "📱" }
  ];

  const categories = ["all", "frontend", "tools", "design"];
  const [activeCategory, setActiveCategory] = React.useState("all");

  const filteredSkills = activeCategory === "all" 
    ? skills 
    : skills.filter(skill => skill.category === activeCategory);

  const getCategoryIcon = (category) => {
    switch(category) {
      case "frontend": return "🖥️";
      case "animation": return "🎬";
      case "tools": return "🛠️";
      case "design": return "🎨";
      default: return "📚";
    }
  };

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
            Skills
          </h2>
          <p className="text-sm md:text-lg text-gray-300">
            Technologies and tools I work with
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-2 md:gap-4 mb-8 md:mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`flex items-center px-3 py-2 md:px-6 md:py-2 rounded-full text-xs md:text-sm font-medium transition-all duration-300 ${
                activeCategory === category
                  ? 'bg-gray-700 text-white shadow-lg shadow-gray-600/25'
                  : 'bg-white/10 text-gray-300 hover:bg-white/20 border border-white/20'
              }`}
            >
              <span className="mr-1 md:mr-2">{getCategoryIcon(category)}</span>
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
          ))}
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4 md:gap-8 mb-8 md:mb-16">
          {filteredSkills.map((skill, index) => (
            <div
              key={index}
              data-aos="fade-up"
              data-aos-delay={index * 50}
              className="p-4 md:p-6 rounded-2xl backdrop-blur-md border bg-white/5 border-white/10"
            >
              <div className="flex items-center justify-between mb-3 md:mb-4">
                <div className="flex items-center space-x-2 md:space-x-3">
                  <span className="text-lg md:text-2xl">{skill.icon}</span>
                  <h3 className="text-base md:text-xl font-bold text-white">
                    {skill.name}
                  </h3>
                </div>
                <span className="text-xs md:text-sm font-bold text-gray-300">
                  {skill.level}%
                </span>
              </div>
              
              {/* Progress Bar */}
              <div className="w-full h-2 md:h-3 rounded-full overflow-hidden bg-white/10">
                <div
                  ref={el => progressBarsRef.current[index] = el}
                  className="h-full rounded-full transition-all duration-300 bg-gradient-to-r from-gray-300 to-gray-400"
                  data-width={`${skill.level}%`}
                ></div>
              </div>
            </div>
          ))}
        </div>

        {/* Skills Summary */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8 mb-8 md:mb-16">
          <div
            data-aos="fade-up"
            data-aos-delay="0"
            className="p-4 md:p-8 rounded-2xl text-center backdrop-blur-md border bg-white/5 border-white/10"
          >
            <div className="text-2xl md:text-4xl mb-3 md:mb-4">🚀</div>
            <h3 className="text-lg md:text-2xl font-bold mb-2 text-purple-400">
              Frontend Development
            </h3>
            <p className="text-sm md:text-base text-gray-300">
              Building responsive, interactive user interfaces with modern JavaScript frameworks
            </p>
          </div>

          <div
            data-aos="fade-up"
            data-aos-delay="100"
            className="p-4 md:p-8 rounded-2xl text-center backdrop-blur-md border bg-white/5 border-white/10"
          >
            <div className="text-2xl md:text-4xl mb-3 md:mb-4">✨</div>
            <h3 className="text-lg md:text-2xl font-bold mb-2 text-purple-400">
              Animations
            </h3>
            <p className="text-sm md:text-base text-gray-300">
              Creating smooth, engaging animations using GSAP and AOS libraries
            </p>
          </div>

          <div
            data-aos="fade-up"
            data-aos-delay="200"
            className="p-4 md:p-8 rounded-2xl text-center backdrop-blur-md border bg-white/5 border-white/10"
          >
            <div className="text-2xl md:text-4xl mb-3 md:mb-4">🎨</div>
            <h3 className="text-lg md:text-2xl font-bold mb-2 text-purple-400">
              Design Systems
            </h3>
            <p className="text-sm md:text-base text-gray-300">
              Working with modern CSS frameworks and design principles
            </p>
          </div>
        </div>

        {/* Learning Path */}
        <div 
          data-aos="fade-up"
          className="p-4 md:p-8 rounded-2xl backdrop-blur-md border bg-gradient-to-r from-gray-700/20 to-gray-600/20 border-gray-500/30"
        >
          <h3 className="text-xl md:text-3xl font-bold mb-4 md:mb-6 text-center text-white">
            Currently Learning
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6">
            {[
              { name: "Node.js", icon: "🟢", status: "In Progress" },
              { name: "TypeScript", icon: "📘", status: "Starting Soon" },
              { name: "Next.js", icon: "▲", status: "Planned" },
              { name: "React Native", icon: "📱", status: "Future Goal" }
            ].map((item, index) => (
              <div
                key={index}
                className="p-3 md:p-4 rounded-lg text-center bg-white/5"
              >
                <div className="text-2xl md:text-3xl mb-2">{item.icon}</div>
                <h4 className="text-sm md:text-base font-bold mb-1 text-white">
                  {item.name}
                </h4>
                <p className="text-xs md:text-sm text-gray-400">
                  {item.status}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Skills;
