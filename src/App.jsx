import React, { useState, useEffect, useRef } from 'react';
import * as Lucide from 'lucide-react';

const App = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [typedText, setTypedText] = useState('');
  const fullText = "Building Efficient CI/CD & Secure Cloud Infra.";
  const intervalRef = useRef(null);

  useEffect(() => {
    let index = 0;
    intervalRef.current = window.setInterval(() => {
      if (index >= fullText.length) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
        return;
      }
      setTypedText(fullText.slice(0, index + 1));
      index++;
    }, 50);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [fullText]);

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(id);
      setIsMenuOpen(false);
    }
  };

  const NavLink = ({ id, label }) => (
    <button
      type="button"
      onClick={() => scrollToSection(id)}
      aria-current={activeSection === id ? 'true' : 'false'}
      className={`uppercase tracking-widest text-sm transition-colors ${
        activeSection === id
          ? 'text-green-400 border-b-2 border-green-400'
          : 'text-gray-400 hover:text-green-400'
      }`}
    >
      {label}
    </button>
  );

  const I = (name, props = {}) => {
    const Icon = Lucide[name] || Lucide.ExternalLink;
    return <Icon {...props} />;
  };

  const SectionTitle = ({ title, icon }) => (
    <div className="flex items-center gap-4 mb-12 border-b border-gray-700 pb-4 max-w-6xl mx-auto px-6">
      {I(icon, { className: 'text-green-400 w-8 h-8' })}
      <h2 className="text-3xl font-bold tracking-tighter uppercase text-gray-200">{title}</h2>
    </div>
  );

  /* data unchanged */
  const skills = [
    { category: 'Infrastructure', items: ['AWS', 'Terraform', 'Kubernetes', 'Docker'] },
    { category: 'CI/CD & Ops', items: ['GitHub Actions', 'Jenkins', 'Linux Admin'] },
    { category: 'Scripting & Backend', items: ['Python', 'Bash', 'MongoDB', 'SQL'] },
    { category: 'Security & Observability', items: ['Prometheus', 'Grafana', 'IAM Policy', 'Secret Mgmt'] }
  ];

  const experience = [
    {
      company: 'Hex64',
      role: 'DevOps Engineer',
      period: 'Jan 2024 - Sep 2024',
      description:
        'Designed and implemented scalable infrastructure on AWS using Terraform, reducing deployment times by 60%. Developed CI/CD pipelines with GitHub Actions, automating testing and deployment processes, which improved release frequency by 25%.',
      tech: ['AWS', 'Kubernetes', 'Python', 'Terraform', 'Docker']
    },
    {
      company: 'SSPL - DRDO',
      role: 'Software Engineer Intern',
      period: 'Jul 2023 - Aug 2023',
      description:
        'Developed a high-performance SaaS web application using Next.js and Prisma ORM, enhancing data retrieval speeds by 40% through optimized database queries.',
      tech: ['Linux', 'Ansible', 'Python', 'Jenkins']
    },
    {
      company: 'Motherson Technology Services',
      role: 'Software Engineer Intern',
      period: 'Jun 2023 - Jun 2023',
      description:
        'Enhanced C++ application performance by 45% through code optimization and managed MSSQL database operations for data integrity. Collaborated in an Agile team to deliver features on time.',
      tech: ['C++', 'MSSQL']
    }
  ];

  const projects = [
    {
      title: 'Issue Tracker — Full CI/CD on AWS (ECR + EKS)',
      desc:
        'React + Node.js + MongoDB | GitHub Actions| Docker | ECR | Kubernetes (EKS) | Terraform\n\nAutomated end-to-end CI/CD pipeline deploying a full-stack issue tracker application on AWS EKS. Features include automated testing, containerization, and infrastructure as code with Terraform.',
      tags: ['Github Actions', 'AWS', 'Kubernetes', 'Docker', 'ECR'],
      repoLink: 'https://github.com/nipun221/issue-tracker'
    },
    {
      title: 'DevOps Project Report: Automated CI/CD Pipeline for a 2-Tier Flask Blog Application on AWS',
      desc:
        'Flask + SQLite | Jenkins | Docker | AWS (EC2 + S3) | Terraform\n\nDesigned and implemented an automated CI/CD pipeline using Jenkins for a Flask-based blog application. The pipeline includes stages for building, testing, and deploying Docker containers to AWS EC2 instances, with static assets stored in S3.',
      tags: ['Jenkins', 'Docker', 'AWS', 'Flask'],
      repoLink: 'https://github.com/nipun221/flask-blog-app'
    },
    {
      title: 'S3 Static Website Hosting with Terraform',
      desc:
        'HTML + CSS | Terraform | AWS S3 | Route 53\n\nProvisioned an S3 bucket configured for static website hosting using Terraform. Automated the setup of DNS records in Route 53 to point a custom domain to the S3 website endpoint.',
      tags: ['Terraform', 'AWS', 'S3', 'Route 53'],
      repoLink: 'https://github.com/nipun221/s3-static-website'
    }
  ];

  return (
    // outermost wrapper must be full width
    <div className="w-full min-h-screen font-mono selection:bg-green-900 selection:text-green-100">
      {/* Global reset + font + ensure body/background is full width */}
      <style>{`
        html, body, #root { height: 100%; width: 100%; margin: 0; padding: 0; }
        body { background: #0f1720; } /* Tailwind neutral-900 hex fallback so background is full-bleed */
        @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;700&display=swap');
        * { box-sizing: border-box; }
      `}</style>

      {/* Full bleed background layer (guarantees background covers whole viewport) */}
      <div className="fixed inset-0 -z-10 bg-neutral-900" />

      {/* Content (centered within max width) */}
      <div className="text-gray-300">

        {/* NAV (full-width bar) */}
        <nav className="fixed top-0 left-0 right-0 bg-neutral-900/95 border-b border-gray-800 z-50 backdrop-blur-sm">
          <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
            <div className="text-green-400 font-bold text-xl flex items-center gap-2">
              {I('Terminal', { size: 20 })}
              <span>./nipun.sh</span>
            </div>

            <div className="hidden md:flex gap-8">
              <NavLink id="about" label="About" />
              <NavLink id="skills" label="Skills" />
              <NavLink id="experience" label="Experience" />
              <NavLink id="projects" label="Projects" />
              <NavLink id="contact" label="Contact" />
            </div>

            <button
              type="button"
              className="md:hidden text-gray-300"
              aria-expanded={isMenuOpen}
              aria-controls="mobile-menu"
              onClick={() => setIsMenuOpen((s) => !s)}
            >
              {isMenuOpen ? I('X') : I('Menu')}
            </button>
          </div>

          {isMenuOpen && (
            <div id="mobile-menu" className="md:hidden border-b border-gray-800 bg-neutral-900 p-4 flex flex-col gap-4">
              <NavLink id="about" label="About" />
              <NavLink id="skills" label="Skills" />
              <NavLink id="experience" label="Experience" />
              <NavLink id="projects" label="Projects" />
              <NavLink id="contact" label="Contact" />
            </div>
          )}
        </nav>

        {/* HERO */}
        <section id="home" className="min-h-screen flex flex-col justify-center pt-20">
          <div className="max-w-6xl mx-auto px-6 border-l-4 border-green-500 pl-6 md:pl-10 py-2">
            <p className="text-green-400 mb-4 tracking-widest uppercase text-sm font-bold">System Status: Online</p>
            <h1 className="text-4xl md:text-7xl font-bold text-white mb-6 leading-tight">
              HI! I'M NIPUN<br />
              <span className="text-gray-500">DEVOPS & CLOUD ENGINEER</span>
            </h1>
            <div className="h-8 md:h-12 flex items-center">
              <span className="text-lg md:text-2xl text-gray-400">
                $ {typedText}
                <span className="animate-pulse text-green-400">_</span>
              </span>
            </div>

            <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-neutral-800/50 p-6 border border-gray-700 hover:border-green-500/50 transition-colors">
                {I('Cloud', { className: 'text-green-400 mb-4', size: 32 })}
                <h3 className="text-white font-bold mb-2">Cloud Native</h3>
                <p className="text-sm text-gray-400">Architecting scalable infrastructure on AWS using Terraform & Kubernetes.</p>
              </div>
              <div className="bg-neutral-800/50 p-6 border border-gray-700 hover:border-green-500/50 transition-colors">
                {I('GitBranch', { className: 'text-green-400 mb-4', size: 32 })}
                <h3 className="text-white font-bold mb-2">CI/CD Pipelines</h3>
                <p className="text-sm text-gray-400">Streamlining delivery with efficient GitHub Actions, Jenkins & Docker workflows.</p>
              </div>
              <div className="bg-neutral-800/50 p-6 border border-gray-700 hover:border-green-500/50 transition-colors">
                {I('Shield', { className: 'text-green-400 mb-4', size: 32 })}
                <h3 className="text-white font-bold mb-2">DevSecOps</h3>
                <p className="text-sm text-gray-400">Integrating security controls and observability into the deployment lifecycle.</p>
              </div>
            </div>

            <div className="mt-12 flex justify-center animate-bounce">
              {I('ChevronDown', { className: 'text-gray-600' })}
            </div>
          </div>
        </section>

        {/* ABOUT */}
        <section id="about" className="py-24">
          <div className="max-w-6xl mx-auto px-6">
            <SectionTitle title="About_Me" icon="Terminal" />
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="space-y-6 text-lg text-gray-400 leading-relaxed">
                <p><span className="text-white font-bold">I don't just write code; I build the systems that run it.</span></p>
                <p>I am passionate about eliminating manual toil through automation. My expertise lies in designing resilient cloud architectures, optimizing CI/CD pipelines for speed and security, and ensuring deep system observability.</p>
                <p>Whether it's scripting in Python, managing K8s clusters, or locking down IAM policies, I focus on building infrastructure that is scalable, secure, and cost-efficient.</p>
              </div>
              <div className="bg-neutral-800 p-6 border border-gray-700 text-sm">
                <div className="flex gap-2 mb-4 border-b border-gray-700 pb-2">
                  <div className="w-3 h-3 rounded-full bg-red-500" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500" />
                  <div className="w-3 h-3 rounded-full bg-green-500" />
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex">
                    <span className="text-green-400 mr-2">user@server:~$</span>
                    <span>cat interest_areas.txt</span>
                  </div>
                  <div className="text-gray-400 pl-4">
                    {'>'} Infrastructure as Code (Terraform)
                    <br />
                    {'>'} Container Orchestration (K8s)
                    <br />
                    {'>'} Network Security
                    <br />
                    {'>'} Serverless Computing
                  </div>
                  <div className="flex mt-4">
                    <span className="text-green-400 mr-2">user@server:~$</span>
                    <span className="animate-pulse">_</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SKILLS */}
        <section id="skills" className="py-24 bg-neutral-800/30">
          <div className="max-w-6xl mx-auto px-6">
            <SectionTitle title="Tech_Stack" icon="Cpu" />
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {skills.map((skillGroup, idx) => (
                <div key={idx} className="bg-neutral-900 p-6 border border-gray-800 hover:border-green-500/30 transition-all">
                  <h3 className="text-green-400 font-bold mb-4 uppercase text-sm tracking-wider">{skillGroup.category}</h3>
                  <div className="flex flex-wrap gap-2">
                    {skillGroup.items.map((skill, sIdx) => (
                      <span key={sIdx} className="bg-neutral-800 text-gray-300 px-3 py-1 text-xs border border-gray-700 hover:text-white hover:border-gray-500 transition-colors cursor-default">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* EXPERIENCE */}
        <section id="experience" className="py-24">
          <div className="max-w-6xl mx-auto px-6">
            <SectionTitle title="System_Logs (Exp)" icon="Briefcase" />
            <div className="relative border-l-2 border-gray-800 ml-3 md:ml-6 space-y-12">
              {experience.map((job, idx) => (
                <div key={idx} className="relative pl-8 md:pl-12">
                  <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-neutral-900 border-2 border-green-500" />
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2">
                    <h3 className="text-xl font-bold text-white">{job.role}</h3>
                    <span className="text-green-400 font-mono text-sm border border-green-500/30 px-2 py-1 rounded bg-green-500/10 mt-2 sm:mt-0 w-fit">{job.period}</span>
                  </div>
                  <h4 className="text-gray-500 font-bold mb-4 flex items-center gap-2">@ {job.company}</h4>
                  <p className="text-gray-400 mb-4 max-w-2xl leading-relaxed">{job.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {job.tech.map((tech, tIdx) => <span key={tIdx} className="text-xs text-gray-500 font-mono">[{tech}]</span>)}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* PROJECTS */}
        <section id="projects" className="py-24">
          <div className="max-w-6xl mx-auto px-6">
            <SectionTitle title="Deployed_Projects" icon="Server" />
            <div className="grid md:grid-cols-3 gap-8">
              {projects.map((project, idx) => (
                <div key={idx} className="group relative bg-neutral-900 border border-gray-700 p-6 hover:border-green-400 transition-all duration-300">
                  <div className="absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity">{I('Code', { className: 'text-green-400' })}</div>
                  <h3 className="text-xl font-bold text-white mb-4 group-hover:text-green-400 transition-colors">{project.title}</h3>
                  <p className="text-gray-400 text-sm mb-6 leading-relaxed">{project.desc}</p>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.tags.map((tag, tIdx) => <span key={tIdx} className="text-xs text-gray-500 border border-gray-800 px-2 py-1">#{tag}</span>)}
                  </div>
                  <a href={project.repoLink} target="_blank" rel="noopener noreferrer" className="inline-flex items-center text-sm font-bold text-white hover:text-green-400 gap-2 border-b border-transparent hover:border-green-400 pb-1 transition-all">
                    VIEW REPOSITORY {I('ExternalLink', { size: 14 })}
                  </a>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CONTACT */}
        <section id="contact" className="py-24 bg-neutral-900 border-t border-gray-800">
          <div className="max-w-6xl mx-auto px-6 text-center">
            <SectionTitle title="Init_Connection" icon="Terminal" />
            <p className="text-gray-400 mb-12 text-lg">
              Currently available for new opportunities in Cloud Infrastructure and DevOps.
              <br />
              Let's discuss how we can automate your deployment workflows.
            </p>

            <div className="flex flex-col md:flex-row justify-center items-center gap-6 md:gap-12">
              <a
                href="mailto:nipunvats5@gmail.com"
                className="flex items-center justify-center gap-3 bg-neutral-800 border border-gray-700 px-8 py-4 text-white hover:bg-green-500 hover:text-black hover:border-green-500 transition-all group"
              >
                {I('Mail', { size: 20 })}
                <span className="font-bold">SEND EMAIL</span>
              </a>

              <a
                href="https://github.com/nipun221"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-3 bg-neutral-800 border border-gray-700 px-8 py-4 text-white hover:bg-white hover:text-black hover:border-white transition-all group"
              >
                {I('Github', { size: 20 })}
                <span className="font-bold">GITHUB</span>
              </a>

              <a
                href="https://www.linkedin.com/in/nipun-vats-295524216/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-3 bg-neutral-800 border border-gray-700 px-8 py-4 text-white hover:bg-[#0077b5] hover:text-white hover:border-[#0077b5] transition-all group"
              >
                {I('Linkedin', { size: 20 })}
                <span className="font-bold">LINKEDIN</span>
              </a>

              {/* Resume download button */}
              <a
                href="/resume.pdf"
                // set download filename — if same-origin browser will download with this filename
                download="Nipun_Vats_Resume.pdf"
                // Also open in new tab as fallback for cross-origin where download might be ignored
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-3 bg-neutral-800 border border-gray-700 px-6 py-4 text-white hover:bg-green-500 hover:text-black hover:border-green-500 transition-all group"
                aria-label="Download resume"
              >
                {I('ExternalLink', { size: 18 })}
                <span className="font-bold">DOWNLOAD RESUME</span>
              </a>
            </div>

            <footer className="mt-24 text-gray-600 text-sm">
              <p>System Status: All Systems Operational</p>
              <p className="mt-2">&copy; {new Date().getFullYear()} Nipun Vats. Built with React & Tailwind.</p>
            </footer>
          </div>
        </section>


      </div>
    </div>
  );
};

export default App;
