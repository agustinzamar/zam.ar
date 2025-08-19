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

  useEffect(() => {
    // Need to register ScrollTrigger with GSAP
    if (typeof window !== 'undefined') {
      gsap.registerPlugin(ScrollTrigger);

      // Wait for the next frame to ensure DOM is ready
      requestAnimationFrame(() => {
        // Clear any existing ScrollTriggers to prevent duplicates
        ScrollTrigger.getAll().forEach(trigger => trigger.kill());

        // Set initial state for job elements - off screen to the left and transparent
        if (jobRefs.current.length > 0) {
          gsap.set(jobRefs.current, {
            x: -50,
            opacity: 0,
            immediateRender: true
          });

          // Create individual animations for each job element
          jobRefs.current.forEach((job, index) => {
            if (job) {
              gsap.to(job, {
                x: 0,
                opacity: 1,
                duration: 1,
                ease: "power2.out",
                delay: index * 0.2,
                scrollTrigger: {
                  trigger: job,
                  start: "top 85%", // Trigger when the top of the element reaches 85% down the viewport
                  end: "top 60%",
                  toggleActions: "restart none none reset", // Change to restart on enter and reset on leave
                  id: `job-${index}`,
                }
              });
            }
          });
        } else {
          console.warn('No job elements found to animate');
        }
      });
    }

    // Cleanup function
    return () => {
      if (typeof window !== 'undefined') {
        ScrollTrigger.getAll().forEach(trigger => trigger.kill());
      }
    };
  }, []); // Empty dependency array means this runs once on mount

  // Reset the refs array before populating it
  const setRefs = (el: HTMLDivElement | null, index: number) => {
    if (el && jobRefs.current.length <= experiences.length) {
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
            style={{ opacity: 0 }} // Set initial opacity to ensure elements start invisible
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
