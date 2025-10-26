'use client';
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Code, Brain, Cpu, Github, Linkedin, Mail, Menu, X } from 'lucide-react';
import Image from "next/image";

export default function PortfolioFrontpage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const services = [
    {
      icon: <Cpu className="w-8 h-8" />,
      title: 'AI Embedded Systems',
      desc: 'Integrating ML intelligence into automotive embedded platforms for RCA and automation.',
      gradient: 'from-blue-500 to-cyan-500',
    },
    {
      icon: <Code className="w-8 h-8" />,
      title: 'Log Analysis & Automation',
      desc: 'Building AI-driven tools for log filtering, regex generation, and Jira similarity detection.',
      gradient: 'from-amber-500 to-orange-500',
    },
    {
      icon: <Brain className="w-8 h-8" />,
      title: 'AI/ML Solutions',
      desc: 'Developing NLP and ML models for text similarity, TF-IDF, and BERT-based ticket classification.',
      gradient: 'from-purple-500 to-pink-500',
    },
  ];

  const projects = [
    {
      title: 'AryanGPT',
      desc: 'An AI-powered chatbot portfolio that talks like my digital twin — powered by Gemini AI & Next.js.',
      tags: ['Next.js', 'React', 'Gemini AI', 'Tailwind'],
      image: '🤖',
    },
    {
      title: 'Log Intelligence System',
      desc: 'AI-assisted automotive log analyzer using TF-IDF + regex for RCA automation.',
      tags: ['Python', 'ML', 'Regex', 'Pandas'],
      image: '⚙️',
    },
    {
      title: 'Jira Similarity Detector',
      desc: 'Machine Learning pipeline using Sentence-BERT to auto-detect duplicate Jira tickets.',
      tags: ['PyTorch', 'BERT', 'Automation'],
      image: '🧠',
    },
  ];

  const testimonials = [
    {
      text: 'Aryan developed automation tools that transformed RCA workflows — precise, fast, and scalable.',
      author: 'Team Lead',
      role: 'Infotainment Division, L&T Technology Services',
    },
    {
      text: 'Delivered AI scripts that detect duplicate Jira issues with 90%+ accuracy. Game-changer!',
      author: 'Senior Engineer',
      role: 'Automotive Systems',
    },
    {
      text: 'Blends embedded engineering and AI brilliance — Aryan makes debugging feel futuristic.',
      author: 'Colleague',
      role: 'AI & Embedded Systems',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white overflow-x-hidden">
      {/* Navbar */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${
          scrolled ? 'bg-slate-950/80 backdrop-blur-xl border-b border-slate-800' : ''
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-amber-400">
              <Image
                src="/profile_pic.jpg"
                alt="Aryan"
                width={40}
                height={40}
                className="object-cover w-full h-full"
              />
            </div>
            <span className="text-xl font-bold">Aryan</span>
          </div>


          <div className="hidden md:flex items-center gap-8">
            <a href="#home" className="hover:text-amber-400 transition">Home</a>
            <a href="#about" className="hover:text-amber-400 transition">About</a>
            <a href="#services" className="hover:text-amber-400 transition">Skills</a>
            <a href="#projects" className="hover:text-amber-400 transition">Projects</a>
            <a href="#contact" className="hover:text-amber-400 transition">Contact</a>
            <a href="/aryangpt" className="px-4 py-2 bg-amber-400 text-slate-900 rounded-full font-medium hover:bg-amber-500 transition">
              Chat with AryanGPT
            </a>
          </div>

          <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden text-amber-400">
            {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <section id="home" className="min-h-screen flex items-center justify-center pt-24">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="text-center px-6">
          <div className="text-6xl font-extrabold mb-6 bg-gradient-to-r from-amber-400 via-orange-500 to-pink-500 bg-clip-text text-transparent">
            AI Embedded Engineer
          </div>
          <p className="text-lg text-slate-300 max-w-2xl mx-auto mb-8">
            Root-cause analyst for automotive infotainment systems • Specializing in AI automation, log intelligence, and ML-powered diagnostics.
          </p>
          <div className="flex justify-center gap-4">
            <a href="#projects" className="px-6 py-3 bg-amber-400 text-slate-900 rounded-full font-semibold hover:bg-amber-500 transition">Explore Work</a>
            <a href="/aryangpt" className="px-6 py-3 bg-slate-800 text-white rounded-full font-semibold hover:bg-slate-700 transition">Talk to AryanGPT</a>
          </div>
        </motion.div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 px-6 bg-slate-900/50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold mb-6">About Me</h2>
            <p className="text-slate-300 text-lg max-w-3xl mx-auto leading-relaxed">
              Hi, I’m Aryan — an AI Embedded Software Engineer at L&T Technology Services (BMW Ecosystem).  
              I specialize in analyzing automotive logs, creating ML-based pattern detection models, and automating RCA flows.  
              My work blends embedded debugging, regex automation, and NLP-based similarity matching for smarter diagnostics.
            </p>
          </div>

          {/* Stats + Award */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
            <div className="bg-gradient-to-br from-blue-500/20 to-cyan-500/20 p-6 rounded-2xl border border-blue-500/30 text-center">
              <div className="text-4xl font-bold text-amber-400 mb-2">2+</div>
              <div className="text-slate-300">Years Experience</div>
            </div>
            <div className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 p-6 rounded-2xl border border-purple-500/30 text-center">
              <div className="text-4xl font-bold text-amber-400 mb-2">5+</div>
              <div className="text-slate-300">Projects Done</div>
            </div>
            <div className="bg-gradient-to-br from-green-500/20 to-emerald-500/20 p-6 rounded-2xl border border-green-500/30 text-center">
              <div className="text-4xl font-bold text-amber-400 mb-2">100%</div>
              <div className="text-slate-300">Client Satisfaction</div>
            </div>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-gradient-to-br from-yellow-500/20 to-amber-500/20 p-6 rounded-2xl border border-yellow-500/40 text-center shadow-md hover:shadow-amber-400/40 transition"
            >
              <div className="w-20 h-20 mx-auto mb-3 rounded-xl overflow-hidden border-2 border-amber-400 shadow-md">
                <Image
                  src="/som.jpeg"
                  alt="Star of the Month - Aryan Kumar"
                  width={80}
                  height={80}
                  className="object-cover w-full h-full"
                />
              </div>

              <div className="text-amber-400 font-bold text-lg">⭐ Star of the Month</div>
              <div className="text-slate-300 text-sm mt-1">
                Awarded for excellence in RCA automation & AI-driven innovation
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="services" className="py-20 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-5xl font-bold mb-10">Core Skills</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {services.map((service, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-slate-800/60 p-8 rounded-2xl border border-slate-700 hover:border-amber-400 transition"
              >
                <div className={`w-16 h-16 mb-6 rounded-xl bg-gradient-to-br ${service.gradient} flex items-center justify-center`}>
                  {service.icon}
                </div>
                <h3 className="text-2xl font-bold mb-3 text-amber-400">{service.title}</h3>
                <p className="text-slate-300">{service.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 px-6 bg-slate-900/50">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-5xl font-bold mb-10">Projects</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {projects.map((p, i) => (
              <motion.div key={i} whileHover={{ scale: 1.05 }} className="bg-slate-800/60 p-6 rounded-2xl border border-slate-700 hover:border-amber-400 transition">
                <div className="text-6xl mb-4">{p.image}</div>
                <h3 className="text-2xl font-semibold text-amber-400 mb-3">{p.title}</h3>
                <p className="text-slate-300 mb-4">{p.desc}</p>
                <div className="flex flex-wrap gap-2 justify-center">
                  {p.tags.map((t, j) => (
                    <span key={j} className="px-3 py-1 bg-slate-700/60 rounded-full text-sm text-slate-300">
                      {t}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-5xl font-bold mb-10">What People Say</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((t, i) => (
              <motion.div key={i} whileHover={{ y: -5 }} className="bg-slate-800/50 p-8 rounded-2xl border border-slate-700">
                <p className="italic text-slate-300 mb-4">“{t.text}”</p>
                <div className="text-amber-400 font-semibold">{t.author}</div>
                <div className="text-sm text-slate-400">{t.role}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="py-20 px-6 bg-slate-900/50 text-center">
        <h2 className="text-5xl font-bold mb-10">Get in Touch</h2>
        <div className="flex flex-wrap justify-center gap-6">
          <a href="mailto:aryankr8121@gmail.com" className="flex items-center gap-3 px-6 py-3 bg-slate-800 rounded-full hover:bg-slate-700 transition">
            <Mail className="text-amber-400" /> aryankr8121@gmail.com
          </a>
          <a href="https://linkedin.com/in/aryan-477aa9201" target="_blank" className="flex items-center gap-3 px-6 py-3 bg-slate-800 rounded-full hover:bg-slate-700 transition">
            <Linkedin className="text-amber-400" /> LinkedIn
          </a>
          <a href="https://github.com/aryankr8121" target="_blank" className="flex items-center gap-3 px-6 py-3 bg-slate-800 rounded-full hover:bg-slate-700 transition">
            <Github className="text-amber-400" /> GitHub
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-slate-800 text-center text-slate-500">
        © 2025 Aryan Kumar — Built with Next.js, Tailwind, and AI ✨
      </footer>
    </div>
  );
}
