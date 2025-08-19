'use client';

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

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
  const timelineRef = useRef<HTMLDivElement>(null);
  const jobRefs = useRef<(HTMLDivElement | null)[]>([]);
  const animationsCreated = useRef(false);

  useEffect(() => {
    // Need to register ScrollTrigger with GSAP
    if (typeof window !== 'undefined') {
      gsap.registerPlugin(ScrollTrigger);

      // Make sure we have refs populated and animations haven't been created yet
      if (jobRefs.current.length > 0 && !animationsCreated.current) {
        // Clear any existing ScrollTriggers for this component
        ScrollTrigger.getAll().forEach(trigger => {
          if (trigger.vars && trigger.vars.id && trigger.vars.id.toString().startsWith('experience-')) {
            trigger.kill();
          }
        });

        // Set initial state for all job elements
        jobRefs.current.forEach(job => {
          if (job) {
            gsap.set(job, { opacity: 0, x: -50 });
          }
        });

        // For each job element, create its own timeline and add it to the master
        jobRefs.current.forEach((job, index) => {
          if (job) {
            // Create a scroll trigger that controls visibility
            ScrollTrigger.create({
              trigger: job,
              start: "top 85%",
              id: `experience-job-${index}`,
              onEnter: () => {
                // Animate in when entering viewport
                gsap.to(job, {
                  opacity: 1,
                  x: 0,
                  duration: 0.8,
                  delay: index * 0.2,
                  ease: "power2.out",
                  overwrite: true
                });
              },
              onLeaveBack: () => {
                // Reset when scrolling back up out of view
                gsap.to(job, {
                  opacity: 0,
                  x: -50,
                  duration: 0.5,
                  ease: "power2.in",
                  overwrite: true
                });
              }
            });
          }
        });

        // Mark animations as created to prevent recreation
        animationsCreated.current = true;
      }
    }

    return () => {
      // Cleanup function - only kill experience-specific ScrollTriggers
      if (typeof window !== 'undefined') {
        ScrollTrigger.getAll().forEach(trigger => {
          if (trigger.vars && trigger.vars.id && trigger.vars.id.toString().startsWith('experience-')) {
            trigger.kill();
          }
        });
      }
    };
  }, []);

  // Reset the refs array before populating it
  const setRefs = (el: HTMLDivElement | null, index: number) => {
    if (el) {
      jobRefs.current[index] = el;
    }
  };

  return (
    <div className="px-8" ref={timelineRef}>
      <div className="grid grid-cols-1 gap-0">
        {experiences.map((job, index) => (
          <div
            key={job.id}
            className="border-t border-border py-12"
            ref={(el) => setRefs(el, index)}
            style={{ opacity: 0 }} // Reset to opacity 0 to prevent flash of content before animation
          >
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
