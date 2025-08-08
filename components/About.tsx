'use client';

import { useEffect, useState } from 'react';
import { Code, Database, Server, Smartphone } from 'lucide-react';

const About = () => {
  const [introduction, setIntroduction] = useState('');
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // This would fetch from your database
    setIntroduction(
      "I'm a passionate full-stack developer with expertise in modern web technologies. I love creating seamless user experiences and robust backend systems. When I'm not coding, you'll find me exploring new technologies, contributing to open-source projects, or capturing moments through photography."
    );

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    const element = document.querySelector('#about');
    if (element) observer.observe(element);

    return () => observer.disconnect();
  }, []);

  const skills = [
    {
      icon: Code,
      title: 'Frontend Development',
      description: 'React, Next.js, TypeScript, Tailwind CSS',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: Server,
      title: 'Backend Development',
      description: 'Node.js, Express, API Design, Microservices',
      color: 'from-green-500 to-emerald-500'
    },
    {
      icon: Database,
      title: 'Database Management',
      description: 'PostgreSQL, Supabase, MongoDB, Redis',
      color: 'from-purple-500 to-pink-500'
    },
    {
      icon: Smartphone,
      title: 'Mobile Development',
      description: 'React Native, Progressive Web Apps',
      color: 'from-orange-500 to-red-500'
    },
  ];

  return (
    <section id="about" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-800 mb-6">
              About Me
            </h2>
            <div className="max-w-4xl mx-auto">
              <p className="text-lg text-slate-600 leading-relaxed mb-8">
                {introduction}
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {skills.map((skill, index) => (
              <div 
                key={skill.title}
                className={`bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 delay-${index * 100}`}
              >
                <div className={`inline-flex p-3 rounded-lg bg-gradient-to-r ${skill.color} mb-4`}>
                  <skill.icon size={24} className="text-white" />
                </div>
                <h3 className="text-xl font-semibold text-slate-800 mb-2">
                  {skill.title}
                </h3>
                <p className="text-slate-600">
                  {skill.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;