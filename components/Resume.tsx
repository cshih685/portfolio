'use client';

import { useState, useEffect } from 'react';
import { Download, Eye, FileText, Calendar, MapPin, Upload, RefreshCw } from 'lucide-react';
import ResumeUpload from './ResumeUpload';

const Resume = () => {
  const [isDownloading, setIsDownloading] = useState(false);
  const [showUpload, setShowUpload] = useState(false);
  const [resumeData, setResumeData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState<string>('');

  useEffect(() => {
    fetchResumeData();
  }, []);

  const fetchResumeData = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/resume');
      const result = await response.json();
      
      if (result.success) {
        setResumeData(result.data);
        setLastUpdated(new Date(result.data.lastUpdated).toLocaleDateString());
      }
    } catch (error) {
      console.error('Failed to fetch resume data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleUploadSuccess = (data: any) => {
    setResumeData({ sections: data.sections, lastUpdated: new Date().toISOString() });
    setLastUpdated(new Date().toLocaleDateString());
  };
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

  const renderSection = (section: any) => {
    return (
      <div key={section.title} className="mb-8">
        <h3 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
          <div className="w-1 h-6 bg-blue-600 rounded-full"></div>
          {section.title}
        </h3>
        <div 
          className="prose prose-slate max-w-none"
          dangerouslySetInnerHTML={{ __html: section.content }}
        />
      </div>
    );
  };

  return (
    <section id="resume" className="py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-800 mb-6">
            Resume
          </h2>
          <p className="text-lg text-slate-600 mb-8">
            {lastUpdated && `Last updated: ${lastUpdated} • `}
            Download my resume or view my experience below
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-4">
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
            <button
              onClick={() => setShowUpload(true)}
              className="border border-blue-600 text-blue-600 hover:bg-blue-50 px-6 py-3 rounded-lg font-medium transition-all duration-200 hover:scale-105 shadow-md hover:shadow-lg flex items-center gap-2"
            >
              <Upload size={18} />
              Update Resume
            </button>
            <button
              onClick={fetchResumeData}
              disabled={loading}
              className="text-slate-600 hover:text-slate-800 p-2 rounded-lg hover:bg-slate-100 transition-colors disabled:opacity-50"
              title="Refresh resume data"
            >
              <RefreshCw size={18} className={loading ? 'animate-spin' : ''} />
            </button>
          </div>
        </div>


        <div className="bg-white rounded-xl shadow-lg p-8">
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <div className="animate-spin rounded-full h-8 w-8 border-2 border-blue-600 border-t-transparent"></div>
              <span className="ml-3 text-slate-600">Loading resume...</span>
            </div>
          ) : resumeData && resumeData.sections ? (
            <div className="space-y-8">
              {resumeData.sections.map((section: any) => renderSection(section))}
            </div>
          ) : (
            <div className="text-center py-12">
              <FileText size={48} className="mx-auto text-slate-400 mb-4" />
              <h3 className="text-xl font-semibold text-slate-800 mb-2">No Resume Data</h3>
              <p className="text-slate-600 mb-6">Upload your Word document to get started</p>
              <button
                onClick={() => setShowUpload(true)}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors flex items-center gap-2 mx-auto"
              >
                <Upload size={18} />
                Upload Resume
              </button>
            </div>
          )}
        </div>

        {showUpload && (
          <ResumeUpload
            onUploadSuccess={handleUploadSuccess}
            onClose={() => setShowUpload(false)}
          />
        )}
      </div>
    </section>
  );
};

export default Resume;