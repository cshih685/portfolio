'use client';

import { Download, Eye, FileText } from 'lucide-react';

const Resume = () => {
  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = '/resumes/Resume_Chieh_Shih.pdf';
    link.download = 'Chieh_Shih_Resume.pdf';
    link.click();
  };

  const handlePreview = () => {
    window.open('/resumes/Resume_Chieh_Shih.pdf', '_blank');
  };

  return (
    <section id="resume" className="py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-800 mb-6">
            Resume
          </h2>
          <p className="text-lg text-slate-600 mb-8">
            Download my resume or view my professional experience below
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
            <button
              onClick={handleDownload}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-all duration-200 hover:scale-105 shadow-lg hover:shadow-xl flex items-center gap-2"
            >
              <Download size={18} />
              Download Resume
            </button>
            <button 
              onClick={handlePreview}
              className="border border-slate-300 text-slate-700 hover:bg-slate-100 px-6 py-3 rounded-lg font-medium transition-all duration-200 hover:scale-105 shadow-md hover:shadow-lg flex items-center gap-2"
            >
              <Eye size={18} />
              Preview PDF
            </button>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-8">
          <div className="space-y-8">
            {/* Professional Experience */}
            <div className="mb-8">
              <h3 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
                <div className="w-1 h-6 bg-blue-600 rounded-full"></div>
                Professional Experience
              </h3>
              
              <div className="space-y-6">
                {/* BNY */}
                <div className="border-l-2 border-blue-200 pl-6">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-2">
                    <h4 className="text-lg font-semibold text-slate-800">Senior Associate Full-Stack Engineer</h4>
                    <span className="text-slate-600 text-sm">May 2023 - present</span>
                  </div>
                  <p className="text-blue-600 font-medium mb-2">BNY • Jersey City, USA</p>
                  <p className="text-slate-600 mb-3">
                    Led the end-to-end design and development of a new enterprise-wide, cross-platform Account Management system, serving over 100K users. Architected using a robust microservices approach, the system leveraged Spring Boot, Angular, Kubernetes and Docker for containerized deployment, integrating Oracle DB, PostgreSQL, MongoDB, LDAP, and Active Directory.
                  </p>
                  <ul className="list-disc list-inside text-slate-600 space-y-1">
                    <li>Reduced manual account management workload by over 85% and enhanced monitoring of all service accounts</li>
                    <li>Collaborated with Broadcom Team to design and optimize the Privileged Access Management tool (Architecture/REST APIs)</li>
                    <li>Implemented robust access controls for databases, reducing security incidents by 95% via enhanced Splunk monitoring</li>
                    <li>Mentored junior developers and led the migration of an on-premise infrastructure to a SaaS solution, improving system uptime by 99.9% and cutting infrastructure costs by 55%</li>
                  </ul>
                </div>

                {/* BNY - Full Stack Engineer */}
                <div className="border-l-2 border-blue-200 pl-6">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-2">
                    <h4 className="text-lg font-semibold text-slate-800">Full-Stack Engineer</h4>
                    <span className="text-slate-600 text-sm">Apr 2021 - Apr 2023</span>
                  </div>
                  <p className="text-blue-600 font-medium mb-2">BNY • Remote in New York, USA</p>
                  <ul className="list-disc list-inside text-slate-600 space-y-1">
                    <li>Spearheaded the modernization of legacy services with React and Node.js, leveraging Docker for streamlined deployment</li>
                    <li>Implemented comprehensive monitoring solutions using Splunk and Grafana for real-time performance monitoring, achieving a 45% reduction in UI response time</li>
                    <li>Implemented robust authentication & authorization mechanisms, enhancing platform security and compliance with banking industry regulations</li>
                    <li>Designed and implemented intelligent, automated daily batch jobs to integrate HR system data, enabling seamless onboarding and permission provisioning for over 100,000 employees and clients across the world</li>
                  </ul>
                </div>

                {/* ECARD Inc. */}
                <div className="border-l-2 border-blue-200 pl-6">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-2">
                    <h4 className="text-lg font-semibold text-slate-800">Software Engineer</h4>
                    <span className="text-slate-600 text-sm">Oct 2019 - May 2020</span>
                  </div>
                  <p className="text-blue-600 font-medium mb-2">ECARD Inc. • New York, USA</p>
                  <ul className="list-disc list-inside text-slate-600 space-y-1">
                    <li>Automated background checks by implementing the LexisNexis API within a React and Node.js-based platform, boosting the TCAD client card application rate by about 400%</li>
                    <li>Developed and enhanced partner-facing application features with RESTful APIs integrating ORM and leveraged Python for data analysis and report automation</li>
                    <li>Optimized PostgreSQL database queries and indexing to improve data retrieval efficiency and support scaled application loads</li>
                  </ul>
                </div>

                {/* BioCompLab */}
                <div className="border-l-2 border-blue-200 pl-6">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-2">
                    <h4 className="text-lg font-semibold text-slate-800">Research Assistant - Full Stack Web Developer</h4>
                    <span className="text-slate-600 text-sm">Oct 2017 - Apr 2019</span>
                  </div>
                  <p className="text-blue-600 font-medium mb-2">BioCompLab - Kaohsiung Medical University • Kaohsiung, Taiwan</p>
                  <ul className="list-disc list-inside text-slate-600 space-y-1">
                    <li>Developed and launched SkinSensDB, an interactive database structure to study relationship (QSAR) model that predicts skin sensitization activity of chemical compounds</li>
                    <li>Optimized PostgreSQL database queries and indexing to improve data retrieval efficiency and support scaled application loads</li>
                    <li>Developed and launched SkinSensDB, implementing Python scripts for efficient backend data processing and integrating RESTful APIs to facilitate global collaboration in biological research</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Skills */}
            <div className="mb-8">
              <h3 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
                <div className="w-1 h-6 bg-blue-600 rounded-full"></div>
                Skills
              </h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-slate-800 mb-2">Programming Languages</h4>
                  <p className="text-slate-600">Java, JavaScript, TypeScript, Python, PHP, Go, SQL, HTML/CSS</p>
                </div>
                <div>
                  <h4 className="font-semibold text-slate-800 mb-2">Frameworks</h4>
                  <p className="text-slate-600">Spring Boot, Spring Security, Angular, React.js, Node.js, Next.js, Jest, Mockito, Vue.js, Ploton</p>
                </div>
                <div>
                  <h4 className="font-semibold text-slate-800 mb-2">Others</h4>
                  <p className="text-slate-600">Oracle SQL, PostgreSQL, MongoDB, Kafka, Splunk, Kubernetes, Git, GitLab, Docker, AWS, Linux, Apache, Splunk, Grafana</p>
                </div>
              </div>
            </div>

            {/* Education */}
            <div className="mb-8">
              <h3 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
                <div className="w-1 h-6 bg-blue-600 rounded-full"></div>
                Education
              </h3>
              <div className="space-y-4">
                <div className="border-l-2 border-blue-200 pl-6">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-2">
                    <h4 className="text-lg font-semibold text-slate-800">Master of Science in Computer Science</h4>
                    <span className="text-slate-600 text-sm">2019</span>
                  </div>
                  <p className="text-blue-600 font-medium">Stevens Institute of Technology, Hoboken, New Jersey</p>
                </div>
                
                <div className="border-l-2 border-blue-200 pl-6">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-2">
                    <h4 className="text-lg font-semibold text-slate-800">Bachelor of Science in Telecommunications Engineering</h4>
                    <span className="text-slate-600 text-sm">2014</span>
                  </div>
                  <p className="text-blue-600 font-medium">Feng Chia University, Taichung, Taiwan</p>
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