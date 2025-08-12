'use client';

import { useEffect, useState } from 'react';
import { ArrowDown, Github, Linkedin, Mail } from 'lucide-react';

const Hero = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const scrollToAbout = () => {
    document.querySelector('#about')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 to-purple-600/10"></div>
      
      <div className={`max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 transition-all duration-1000 ${
        mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}>
        <div className="space-y-8">
          <div className="space-y-4">
            <h1 className="text-5xl md:text-7xl font-bold text-slate-800 leading-tight">
              Hi, I'm{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                Chieh Shih
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
              Full-stack developer passionate about creating beautiful, functional web applications with modern technologies.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button 
              onClick={scrollToAbout}
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-full font-medium transition-all duration-200 hover:scale-105 shadow-lg hover:shadow-xl"
            >
              Learn More About Me
            </button>
            <div className="flex items-center gap-4">
              <a 
                href="https://github.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-3 rounded-full bg-white shadow-md hover:shadow-lg transition-all duration-200 hover:scale-110"
              >
                <Github size={20} className="text-slate-700" />
              </a>
              <a 
                href="https://linkedin.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-3 rounded-full bg-white shadow-md hover:shadow-lg transition-all duration-200 hover:scale-110"
              >
                <Linkedin size={20} className="text-blue-600" />
              </a>
              <a 
                href="mailto:your.email@example.com"
                className="p-3 rounded-full bg-white shadow-md hover:shadow-lg transition-all duration-200 hover:scale-110"
              >
                <Mail size={20} className="text-green-600" />
              </a>
            </div>
          </div>
        </div>

        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
          <button onClick={scrollToAbout}>
            <ArrowDown size={24} className="text-slate-400" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;