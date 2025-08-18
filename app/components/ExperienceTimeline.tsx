'use client';

import React from 'react';

interface JobExperience {
  id: string;
  title: string;
  company: string;
  location: string;
  period: string;
  description: string[];
  technologies: string[];
}

const experiences: JobExperience[] = [
  {
    id: 'job1',
    title: 'Senior Frontend Developer',
    company: 'TechCorp',
    location: 'San Francisco, CA',
    period: '2023 - Present',
    description: [
      'Led the frontend development team in redesigning the company\'s flagship product',
      'Implemented performance optimizations resulting in 40% faster page load times',
      'Established coding standards and review processes for a team of 8 developers'
    ],
    technologies: ['React', 'TypeScript', 'Next.js', 'Tailwind CSS']
  },
  {
    id: 'job2',
    title: 'Full Stack Developer',
    company: 'InnovateLabs',
    location: 'New York, NY',
    period: '2021 - 2023',
    description: [
      'Developed and maintained multiple client-facing web applications',
      'Created RESTful APIs and implemented database schemas',
      'Collaborated with design team to ensure pixel-perfect implementation'
    ],
    technologies: ['Vue.js', 'Node.js', 'MongoDB', 'Express']
  },
  {
    id: 'job3',
    title: 'Web Developer',
    company: 'DigitalSolutions',
    location: 'Remote',
    period: '2019 - 2021',
    description: [
      'Built responsive websites for clients across various industries',
      'Implemented e-commerce functionality with payment processing',
      'Optimized sites for SEO and accessibility compliance'
    ],
    technologies: ['JavaScript', 'PHP', 'WordPress', 'MySQL']
  }
];

export const ExperienceTimeline: React.FC = () => {
  return (
    <div className="px-8">
      <div className="grid grid-cols-1 gap-0">
        {experiences.map((job) => (
          <div key={job.id} className="border-t border-border py-12">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
              {/* Left column - period */}
              <div className="md:col-span-2">
                <p className="text-lg font-mono text-muted-foreground">{job.period}</p>
              </div>

              {/* Middle column - job details */}
              <div className="md:col-span-6">
                <h3 className="text-3xl font-bold mb-2">{job.title}</h3>
                <p className="text-xl mb-6">
                  {job.company} • {job.location}
                </p>
                <ul className="space-y-3">
                  {job.description.map((item, index) => (
                    <li key={index} className="text-lg">
                      <span className="inline-block w-6 text-primary font-mono">→</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Right column - technologies */}
              <div className="md:col-span-4 flex flex-wrap gap-2 content-start">
                {job.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="text-sm px-3 py-1 bg-primary text-primary-foreground"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
