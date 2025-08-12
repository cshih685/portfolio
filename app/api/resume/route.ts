import { NextResponse } from 'next/server';

// Mock data - in a real app, this would come from your database
const mockResumeData = {
  sections: [
    {
      title: 'Professional Summary',
      content: '<p>Experienced full-stack developer with 5+ years of expertise in React, Node.js, and PostgreSQL. Passionate about creating scalable web applications and leading development teams.</p>',
      type: 'summary'
    },
    {
      title: 'Work Experience',
      content: `
        <div>
          <h4>Senior Full Stack Developer</h4>
          <p><strong>Tech Company Inc.</strong> | 2022 - Present</p>
          <ul>
            <li>Led development of microservices architecture serving 100k+ users</li>
            <li>Implemented CI/CD pipelines reducing deployment time by 60%</li>
            <li>Mentored junior developers and conducted code reviews</li>
          </ul>
        </div>
        <div>
          <h4>Frontend Developer</h4>
          <p><strong>Startup Solutions</strong> | 2020 - 2022</p>
          <ul>
            <li>Built responsive web applications using React and TypeScript</li>
            <li>Collaborated with UX/UI designers to implement pixel-perfect designs</li>
            <li>Optimized application performance achieving 95+ Lighthouse scores</li>
          </ul>
        </div>
      `,
      type: 'experience'
    },
    {
      title: 'Education',
      content: `
        <div>
          <h4>Bachelor of Science in Computer Science</h4>
          <p><strong>University of Technology</strong> | 2016 - 2020</p>
          <p>Graduated Magna Cum Laude, GPA: 3.8/4.0</p>
        </div>
      `,
      type: 'education'
    },
    {
      title: 'Technical Skills',
      content: `
        <div>
          <p><strong>Frontend:</strong> React, Next.js, TypeScript, Tailwind CSS, HTML5, CSS3</p>
          <p><strong>Backend:</strong> Node.js, Express, PostgreSQL, MongoDB, REST APIs, GraphQL</p>
          <p><strong>Tools & Technologies:</strong> Git, Docker, AWS, Vercel, Jest, Cypress</p>
          <p><strong>Methodologies:</strong> Agile, Scrum, Test-Driven Development</p>
        </div>
      `,
      type: 'skills'
    }
  ],
  lastUpdated: new Date().toISOString()
};

export async function GET() {
  try {
    // In a real application, fetch from database
    return NextResponse.json({
      success: true,
      data: mockResumeData
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch resume data' },
      { status: 500 }
    );
  }
}