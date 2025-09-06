import React, { useState, useEffect, useRef } from 'react';
import emailjs from 'emailjs-com';
// Typewriter effect for roles
const roles = [
  'Cybersecurity 🛡️',
  'Web Developer 💻',
  'Freelancer 🧑‍💼',
  'Salesforce ☁️'
];

function useTypewriter(words: string[], speed = 120, pause = 1200) {
  const [index, setIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [reverse, setReverse] = useState(false);
  useEffect(() => {
    if (subIndex === words[index].length + 1 && !reverse) {
      setTimeout(() => setReverse(true), pause);
      return;
    }
    if (subIndex === 0 && reverse) {
      setReverse(false);
      setIndex((prev) => (prev + 1) % words.length);
      return;
    }
    const timeout = setTimeout(() => {
      setSubIndex((prev) => prev + (reverse ? -1 : 1));
    }, reverse ? speed / 2 : speed);
    return () => clearTimeout(timeout);
  }, [subIndex, reverse, index, words, speed, pause]);
  return words[index].substring(0, subIndex);
}
import profileImg from './profile.jpeg';
import resume from './Shiva Resume.pdf';
import { 
  Menu, 
  X, 
  Download, 
  Mail, 
  Phone, 
  Github, 
  Linkedin, 
  ExternalLink,
  ChevronUp,
  Shield,
  Briefcase,
  GraduationCap,
  Award,
} from 'lucide-react';

interface Project {
  title: string;
  description: string;
  techStack: string[];
  githubLink: string;
  category: string;
}


const App: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [showBackToTop, setShowBackToTop] = useState(false);

  const projects: Project[] = [
      {
        title: "DefenderC2 Framework",
        description: "A Python & Flask-based defensive Command & Control framework designed for cybersecurity monitoring and incident response.",
        techStack: ["Python", "Flask", "SQLite", "JavaScript"],
        githubLink: "https://github.com/ShivA-800/DefenderC2_Framework",
        category: "Cybersecurity"
      },
      {
        title: "System Hacking via SMB Protocol",
        description: "Research-based project analyzing SMB protocol vulnerabilities and developing defensive countermeasures.",
        techStack: ["Python", "Wireshark", "Metasploit", "Linux"],
        githubLink: "https://github.com/ShivA-800/System-hacking-using-SMB-protocol",
        category: "Security Research"
      },
      {
        title: "DevConnect",
        description: "A comprehensive MERN Stack social platform connecting developers with collaboration and networking features.",
        techStack: ["MongoDB", "Express.js", "React", "Node.js"],
        githubLink: "https://github.com/ShivA-800/DevConnect-MERN-Stack-",
        category: "Web Development"
      },
    {
      title: "FoodLoop",
      description: "FoodLoop is a real-time food-sharing platform that enables anyone to donate surplus food and volunteers to claim and deliver it, helping reduce waste efficiently. ",
      techStack: ["React", "TypeScript", "Vite", "Tailwind CSS", "Lucide Icons", "React Context API", "React Router", "localStorage"],
      githubLink: "https://github.com/ShivA-800/Foodloop",
      category: "Social Impact / Web Development"
    },
    {
      title: "Human Pose Estimation Hub (AICTE Internship)",
      description: "A project developed under the AICTE Internship. This app analyzes and annotates human poses in images using Mediapipe and Streamlit, with applications in fitness, healthcare, sports analytics, and augmented reality. ",
      techStack: ["Python", "Mediapipe", "Streamlit"],
      githubLink: "https://github.com/ShivA-800/aicte-intrenship-pose-estimation",
      category: "AI/ML / Computer Vision"
    }
  ];


  const certifications = [
    "Cisco Networking Academy – Cybersecurity",
    "Cisco Networking Academy – Ethical Hacking",
    "CDAC – Ethical Hacking",
    "Salesforce Developer (AgentBlazer Champion Program)",
    "Google Cloud Security",
    "Mastercard Cybersecurity Job Simulation"
  ];

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.pageYOffset > 300);
      
      const sections = ['home', 'about', 'education', 'experience', 'projects', 'skills', 'certifications', 'contact'];
      const current = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      
      if (current) {
        setActiveSection(current);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="bg-gray-900 text-white min-h-screen">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-black/90 backdrop-blur-md border-b border-cyan-500/20 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex-shrink-0">
              <h1 className="text-xl font-bold text-cyan-400">SKR</h1>
            </div>
            
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                {['Home', 'Education', 'Experience', 'Projects', 'Certifications', 'Contact'].map((item) => (
                  <button
                    key={item}
                    onClick={() => scrollToSection(item.toLowerCase())}
                    className={`px-3 py-2 rounded-md text-sm font-medium transition-all duration-300 ${
                      activeSection === item.toLowerCase()
                        ? 'text-cyan-400 bg-cyan-400/10 border border-cyan-400/20'
                        : 'text-gray-300 hover:text-cyan-400 hover:bg-gray-700/50'
                    }`}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>
            
            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-gray-300 hover:text-cyan-400 p-2"
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>
        
        {isMenuOpen && (
          <div className="md:hidden bg-black/95 backdrop-blur-md">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {['Home', 'Education', 'Experience', 'Projects', 'Certifications', 'Contact'].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item.toLowerCase())}
                  className="block px-3 py-2 text-base font-medium text-gray-300 hover:text-cyan-400 hover:bg-gray-700/50 rounded-md w-full text-left"
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-purple-500/5"></div>
        <div className="max-w-6xl mx-auto px-4 relative z-10 w-full">
          <div className="flex flex-col md:flex-row items-center justify-between w-full">
            {/* Left: Text Content */}
            <div className="flex-1 text-left md:pr-12">
              <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent">
                Shiva Kumar Radharapu
              </h1>
              {/* Typewriter effect for roles */}
              <p className="text-2xl text-cyan-400 mb-8 font-semibold h-10">
                {useTypewriter(roles)}
              </p>
              <p className="text-gray-300 text-lg mb-12 max-w-3xl leading-relaxed">
                Passionate about securing digital landscapes through innovative cybersecurity solutions,
                full-stack development, and cutting-edge technology implementations. Committed to creating
                robust, scalable applications while maintaining the highest security standards.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href="https://drive.google.com/file/d/1oWeEOHtsFlm2lHHOuik1HOYhEjMmU4Mz/view?usp=sharing"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 px-8 py-4 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-cyan-500/25 flex items-center justify-center gap-2"
                >
                  <Download size={20} />
                  View Resume
                </a>
                <button
                  onClick={() => scrollToSection('contact')}
                  className="border border-cyan-400 text-cyan-400 hover:bg-cyan-400 hover:text-black px-8 py-4 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2"
                >
                  <Mail size={20} />
                  Contact Me
                </button>
              </div>
            </div>
            {/* Right: Profile Image */}
            <div className="flex-1 flex justify-center md:justify-end mt-12 md:mt-0">
              <div className="w-80 h-80 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 p-2 flex items-center justify-center shadow-lg">
                <img
                  src={profileImg}
                  alt="Profile"
                  className="w-full h-full object-cover rounded-full border-4 border-cyan-400 shadow-lg"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Education Section */}
      <section id="education" className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-16 text-cyan-400">Education</h2>
          <div className="space-y-8">
            <div className="bg-gradient-to-r from-gray-800/50 to-gray-900/50 p-8 rounded-lg border border-cyan-500/20 hover:border-cyan-400/40 transition-all duration-300 transform hover:scale-[1.02]">
              <div className="flex items-start gap-4">
                <GraduationCap className="text-cyan-400 mt-1" size={32} />
                <div className="flex-1">
                  <h3 className="text-2xl font-semibold text-white mb-2">
                    BTech in Computer Science & Engineering - Cybersecurity
                  </h3>
                  <p className="text-cyan-400 mb-2">CMR College of Engineering & Technology</p>
                  <p className="text-gray-300 mb-4">2023 – 2026 | GPA: 8.65</p>
                  <p className="text-gray-400">
                    Specialized curriculum focusing on cybersecurity principles, secure coding practices, 
                    and advanced security frameworks.
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-gradient-to-r from-gray-800/50 to-gray-900/50 p-8 rounded-lg border border-blue-500/20 hover:border-blue-400/40 transition-all duration-300 transform hover:scale-[1.02]">
              <div className="flex items-start gap-4">
                <GraduationCap className="text-blue-400 mt-1" size={32} />
                <div className="flex-1">
                  <h3 className="text-2xl font-semibold text-white mb-2">
                    Diploma in Computer Science & Engineering
                  </h3>
                  <p className="text-blue-400 mb-2">Jyothishmathi Institute of Technology and Science</p>
                  <p className="text-gray-300 mb-4">2020 – 2023 | GPA: 9.27</p>
                  <p className="text-gray-400">
                    Strong foundation in computer science fundamentals, programming languages, 
                    and software development methodologies.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

  {/* Projects Section */}
  <section id="projects" className="py-20">
    <div className="max-w-7xl mx-auto px-4">
      <h2 className="text-4xl font-bold text-center mb-16 text-cyan-400">Projects</h2>
      <div className="flex justify-center">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-6xl">
          {projects.map((project, index) => (
            <div 
              key={index}
              className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 p-6 rounded-lg border border-gray-700/50 hover:border-cyan-500/50 transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-cyan-500/10 group flex flex-col justify-between"
            >
              <div>
                <div className="mb-4">
                  <span className="px-3 py-1 text-xs font-semibold bg-cyan-400/20 text-cyan-300 rounded-full">
                    {project.category}
                  </span>
                </div>
                <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-cyan-400 transition-colors">
                  {project.title}
                </h3>
                <p className="text-gray-400 mb-4 leading-relaxed">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.techStack.map((tech, techIndex) => (
                    <span 
                      key={techIndex}
                      className="px-2 py-1 text-xs bg-gray-700/50 text-gray-300 rounded border border-gray-600/50"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
              <a 
                href={project.githubLink}
                className="inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300 transition-colors mt-4"
              >
                <Github size={16} />
                View Code
                <ExternalLink size={14} />
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  </section>

      {/* Experience Section */}
      <section id="experience" className="py-20 bg-gray-800/50">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-16 text-cyan-400">Experience</h2>
          
          <div className="space-y-8">
            <div className="bg-gradient-to-r from-gray-900/50 to-gray-800/50 p-8 rounded-lg border border-cyan-500/20 hover:border-cyan-400/40 transition-all duration-300 transform hover:scale-[1.02]">
              <div className="flex items-start gap-4">
                <Briefcase className="text-cyan-400 mt-1" size={32} />
                <div className="flex-1">
                  <h3 className="text-2xl font-semibold text-white mb-2">AI Intern</h3>
                  <p className="text-cyan-400 mb-2">AICTE TechSaksham AI Internship</p>
                  <p className="text-gray-300 mb-4">Dec 2024 – Jan 2025</p>
                  <p className="text-gray-400">
                    Developed AI-powered solutions focusing on machine learning algorithms, 
                    data analysis, and intelligent automation systems. Gained hands-on experience 
                    with TensorFlow, Python, and cloud-based AI platforms.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="bg-gradient-to-r from-gray-900/50 to-gray-800/50 p-8 rounded-lg border border-blue-500/20 hover:border-blue-400/40 transition-all duration-300 transform hover:scale-[1.02]">
              <div className="flex items-start gap-4">
                <Briefcase className="text-blue-400 mt-1" size={32} />
                <div className="flex-1">
                  <h3 className="text-2xl font-semibold text-white mb-2">Salesforce Developer</h3>
                  <p className="text-blue-400 mb-2">AgentBlazer Champion Program</p>
                  <p className="text-gray-300 mb-4">2025</p>
                  <p className="text-gray-400">
                    Specialized in Salesforce platform development including Apex programming, 
                    Lightning Web Components, and custom automation solutions. Contributed to 
                    enterprise CRM implementations and process optimization.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* Certifications Section */}
      <section id="certifications" className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-16 text-cyan-400">Certifications</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {certifications.map((cert, index) => (
              <div 
                key={index}
                className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 p-6 rounded-lg border border-gray-700/50 hover:border-cyan-500/50 transition-all duration-300 transform hover:scale-105 flex items-start gap-4"
              >
                <Award className="text-cyan-400 mt-1 flex-shrink-0" size={24} />
                <p className="text-gray-300 leading-relaxed">{cert}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Extra-curricular Section */}
      <section className="py-20 bg-gray-800/50">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-16 text-cyan-400">Extra-Curricular Activities</h2>
          
          <div className="grid md:grid-cols-4 gap-8">
            <div className="bg-gradient-to-br from-gray-900/50 to-gray-800/50 p-6 rounded-lg border border-blue-500/20 hover:border-blue-400/40 transition-all duration-300 transform hover:scale-105">
              <Briefcase className="text-blue-400 mb-4" size={32} />
              <h3 className="text-xl font-semibold text-white mb-3">Training & Placement Board Member</h3>
              <p className="text-gray-400">CMR College of Engineering & Technology</p>
            </div>
            <div className="bg-gradient-to-br from-gray-900/50 to-gray-800/50 p-6 rounded-lg border border-green-500/20 hover:border-green-400/40 transition-all duration-300 transform hover:scale-105">
              <Briefcase className="text-green-400 mb-4" size={32} />
              <h3 className="text-xl font-semibold text-white mb-3">Founder</h3>
              <p className="text-gray-400">Diksuchi - The NextGen Student Lead WhatsApp Community</p>
            </div>
            <div className="bg-gradient-to-br from-gray-900/50 to-gray-800/50 p-6 rounded-lg border border-purple-500/20 hover:border-purple-400/40 transition-all duration-300 transform hover:scale-105">
              <Shield className="text-purple-400 mb-4" size={32} />
              <h3 className="text-xl font-semibold text-white mb-3">Core Admin</h3>
              <p className="text-gray-400">RootX Cybersecurity WhatsApp Community</p>
            </div>
            <div className="bg-gradient-to-br from-gray-900/50 to-gray-800/50 p-6 rounded-lg border border-cyan-500/20 hover:border-cyan-400/40 transition-all duration-300 transform hover:scale-105">
              <Award className="text-cyan-400 mb-4" size={32} />
              <h3 className="text-xl font-semibold text-white mb-3">CTF Player</h3>
              <p className="text-gray-400">Active participant in Capture The Flag competitions</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-16 text-cyan-400">Get In Touch</h2>
          
          <div className="flex flex-col md:flex-row gap-12 items-center justify-center">
            <div className="flex flex-col items-center justify-center w-full">
              <div className="space-y-6 w-full flex flex-col items-center">
              <h3 className="text-2xl font-semibold text-white mb-8">Let's Connect</h3>
              
              <div className="space-y-4">
                <a 
                  href="mailto:radharapushiva800@gmail.com"
                  className="flex items-center gap-4 p-4 bg-gray-800/50 rounded-lg border border-gray-700/50 hover:border-cyan-500/50 transition-all duration-300 hover:scale-105"
                >
                  <Mail className="text-cyan-400" size={24} />
                  <div>
                    <p className="text-white font-medium">Email</p>
                    <p className="text-gray-400">radharapushiva800@gmail.com</p>
                  </div>
                </a>
                
                <a 
                  href="tel:+918008886309"
                  className="flex items-center gap-4 p-4 bg-gray-800/50 rounded-lg border border-gray-700/50 hover:border-blue-500/50 transition-all duration-300 hover:scale-105"
                >
                  <Phone className="text-blue-400" size={24} />
                  <div>
                    <p className="text-white font-medium">Phone</p>
                    <p className="text-gray-400">+91 8008886309</p>
                  </div>
                </a>
              </div>
              
              <div className="flex gap-4 pt-6">
                <a 
                  href="https://www.linkedin.com/in/shiva-kumar-radharapu-2b79b9240/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="p-3 bg-blue-600/20 hover:bg-blue-600/30 border border-blue-500/30 rounded-lg transition-all duration-300 hover:scale-110"
                >
                  <Linkedin size={24} className="text-blue-400" />
                </a>
                <a 
                  href="https://github.com/ShivA-800" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="p-3 bg-purple-600/20 hover:bg-purple-600/30 border border-purple-500/30 rounded-lg transition-all duration-300 hover:scale-110"
                >
                  <Github size={24} className="text-purple-400" />
                </a>
              </div>
            </div>
            
            {/* Contact form removed as requested */}
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black/50 border-t border-cyan-500/20 py-8">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-gray-400">
            © 2025 Shiva Kumar Radharapu. Crafted with passion for cybersecurity and innovation.
          </p>
        </div>
      </footer>

      {/* Back to Top Button */}
      {showBackToTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 p-3 rounded-full shadow-lg hover:shadow-cyan-500/25 transition-all duration-300 transform hover:scale-110 z-40"
        >
          <ChevronUp size={24} />
        </button>
      )}
    </div>
  );
};

export default App;