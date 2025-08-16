import { NextResponse } from 'next/server';

// Static resume data based on Chieh Shih's actual resume
const resumeData = {
  personalInfo: {
    name: 'Chieh Shih',
    title: 'Senior Associate Full-Stack Engineer',
    location: 'Jersey City, USA',
    email: 'chieh.shih@example.com'
  },
  experience: [
    {
      title: 'Senior Associate Full-Stack Engineer',
      company: 'BNY',
      location: 'Jersey City, USA',
      period: 'May 2023 - present',
      description: 'Led the end-to-end design and development of a new enterprise-wide, cross-platform Account Management system, serving over 100K users. Architected using a robust microservices approach, the system leveraged Spring Boot, Angular, Kubernetes and Docker for containerized deployment, integrating Oracle DB, PostgreSQL, MongoDB, LDAP, and Active Directory.',
      achievements: [
        'Reduced manual account management workload by over 85% and enhanced monitoring of all service accounts',
        'Collaborated with Broadcom Team to design and optimize the Privileged Access Management tool (Architecture/REST APIs)',
        'Implemented robust access controls for databases, reducing security incidents by 95% via enhanced Splunk monitoring',
        'Mentored junior developers and led the migration of an on-premise infrastructure to a SaaS solution, improving system uptime by 99.9% and cutting infrastructure costs by 55%'
      ]
    },
    {
      title: 'Full-Stack Engineer',
      company: 'BNY',
      location: 'Remote in New York, USA',
      period: 'Apr 2021 - Apr 2023',
      achievements: [
        'Spearheaded the modernization of legacy services with React and Node.js, leveraging Docker for streamlined deployment',
        'Implemented comprehensive monitoring solutions using Splunk and Grafana for real-time performance monitoring, achieving a 45% reduction in UI response time',
        'Implemented robust authentication & authorization mechanisms, enhancing platform security and compliance with banking industry regulations',
        'Designed and implemented intelligent, automated daily batch jobs to integrate HR system data, enabling seamless onboarding and permission provisioning for over 100,000 employees and clients across the world'
      ]
    },
    {
      title: 'Software Engineer',
      company: 'ECARD Inc.',
      location: 'New York, USA',
      period: 'Oct 2019 - May 2020',
      achievements: [
        'Automated background checks by implementing the LexisNexis API within a React and Node.js-based platform, boosting the TCAD client card application rate by about 400%',
        'Developed and enhanced partner-facing application features with RESTful APIs integrating ORM and leveraged Python for data analysis and report automation',
        'Optimized PostgreSQL database queries and indexing to improve data retrieval efficiency and support scaled application loads'
      ]
    },
    {
      title: 'Research Assistant - Full Stack Web Developer',
      company: 'BioCompLab - Kaohsiung Medical University',
      location: 'Kaohsiung, Taiwan',
      period: 'Oct 2017 - Apr 2019',
      achievements: [
        'Developed and launched SkinSensDB, an interactive database structure to study relationship (QSAR) model that predicts skin sensitization activity of chemical compounds',
        'Optimized PostgreSQL database queries and indexing to improve data retrieval efficiency and support scaled application loads',
        'Developed and launched SkinSensDB, implementing Python scripts for efficient backend data processing and integrating RESTful APIs to facilitate global collaboration in biological research'
      ]
    }
  ],
  skills: {
    programmingLanguages: 'Java, JavaScript, TypeScript, Python, PHP, Go, SQL, HTML/CSS',
    frameworks: 'Spring Boot, Spring Security, Angular, React.js, Node.js, Next.js, Jest, Mockito, Vue.js, Ploton',
    others: 'Oracle SQL, PostgreSQL, MongoDB, Kafka, Splunk, Kubernetes, Git, GitLab, Docker, AWS, Linux, Apache, Splunk, Grafana'
  },
  education: [
    {
      degree: 'Master of Science in Computer Science',
      institution: 'Stevens Institute of Technology, Hoboken, New Jersey',
      year: '2019'
    },
    {
      degree: 'Bachelor of Science in Telecommunications Engineering',
      institution: 'Feng Chia University, Taichung, Taiwan',
      year: '2014'
    }
  ],
  lastUpdated: new Date().toISOString()
};

export async function GET() {
  try {
    return NextResponse.json({
      success: true,
      data: resumeData
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch resume data' },
      { status: 500 }
    );
  }
}