'use client';

import { useState } from 'react';
import { Download, Eye, FileText, Calendar, MapPin } from 'lucide-react';

const Resume = () => {
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownload = async () => {
    setIsDownloading(true);
    // Simulate download process
    setTimeout(() => {
      // In a real app, this would trigger the actual download
      const link = document.createElement('a');
      link.href = '/resume.pdf'; // You'll need to add your resume file to the public folder
      link.download = 'YourName_Resume.pdf';
      link.click();
      setIsDownloading(false);
    }, 1000);
  };

  const experience = [
    {
      title: 'Senior Full Stack Developer',
      company: 'Tech Company',
      period: '2022 - Present',
      location: 'Remote',
      description: 'Lead development of web applications using React, Next.js, and Node.js'
    },
    {
      title: 'Frontend Developer',
      company: 'Startup Inc',
      period: '2020 - 2022',
      location: 'New York, NY',
      description: 'Built responsive web applications and improved user experience'
    },
    {
      title: 'Junior Developer',
      company: 'Digital Agency',
      period: '2019 - 2020',
      location: 'San Francisco, CA',
      description: 'Developed and maintained client websites using modern web technologies'
    }
  ];

  return (
    <section id="resume" className="py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-800 mb-6">
            Resume
          </h2>
          <p className="text-lg text-slate-600 mb-8">
            Download my resume or view my experience below
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={handleDownload}
              disabled={isDownloading}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-all duration-200 hover:scale-105 shadow-lg hover:shadow-xl flex items-center gap-2 disabled:opacity-50"
            >
              {isDownloading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                  Downloading...
                </>
              ) : (
                <>
                  <Download size={18} />
                  Download Resume
                </>
              )}
            </button>
            <button className="border border-slate-300 text-slate-700 hover:bg-slate-100 px-6 py-3 rounded-lg font-medium transition-all duration-200 hover:scale-105 shadow-md hover:shadow-lg flex items-center gap-2">
              <Eye size={18} />
              Preview
            </button>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-8">
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-6">
              <FileText size={24} className="text-blue-600" />
              <h3 className="text-2xl font-bold text-slate-800">Experience</h3>
            </div>
            
            <div className="space-y-6">
              {experience.map((job, index) => (
                <div key={index} className="border-l-4 border-blue-600 pl-6 pb-6">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-2">
                    <h4 className="text-xl font-semibold text-slate-800">{job.title}</h4>
                    <div className="flex items-center gap-4 text-slate-600 text-sm">
                      <div className="flex items-center gap-1">
                        <Calendar size={14} />
                        {job.period}
                      </div>
                      <div className="flex items-center gap-1">
                        <MapPin size={14} />
                        {job.location}
                      </div>
                    </div>
                  </div>
                  <p className="text-blue-600 font-medium mb-2">{job.company}</p>
                  <p className="text-slate-600">{job.description}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="border-t pt-8">
            <h3 className="text-2xl font-bold text-slate-800 mb-6">Skills & Technologies</h3>
            <div className="grid md:grid-cols-3 gap-6">
              <div>
                <h4 className="font-semibold text-slate-700 mb-3">Frontend</h4>
                <div className="flex flex-wrap gap-2">
                  {['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'HTML5', 'CSS3'].map(skill => (
                    <span key={skill} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <h4 className="font-semibold text-slate-700 mb-3">Backend</h4>
                <div className="flex flex-wrap gap-2">
                  {['Node.js', 'Express', 'PostgreSQL', 'MongoDB', 'REST APIs'].map(skill => (
                    <span key={skill} className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <h4 className="font-semibold text-slate-700 mb-3">Tools</h4>
                <div className="flex flex-wrap gap-2">
                  {['Git', 'Docker', 'AWS', 'Vercel', 'Figma', 'VS Code'].map(skill => (
                    <span key={skill} className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Resume;