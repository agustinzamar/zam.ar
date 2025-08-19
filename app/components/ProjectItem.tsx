'use client';

import React, { useRef, useEffect } from 'react';
import { ProjectImage } from './ProjectImage';
import gsap from 'gsap';

interface ProjectItemProps {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  tags: string[];
  isActive: boolean;
  onClick: (id: string) => void;
}

export const ProjectItem: React.FC<ProjectItemProps> = ({
  id,
  title,
  description,
  imageUrl,
  tags,
  isActive,
  onClick,
}) => {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const isInitialMount = useRef(true);

  // Animation when active state changes
  useEffect(() => {
    if (!buttonRef.current || !bgRef.current) return;

    // Set initial state without animation on first render
    if (isInitialMount.current) {
      if (isActive) {
        gsap.set(bgRef.current, { scaleX: 1 });
        gsap.set(buttonRef.current, { color: 'var(--background)' });
      } else {
        gsap.set(bgRef.current, { scaleX: 0 });
        gsap.set(buttonRef.current, { color: 'var(--foreground-75)' });
      }
      isInitialMount.current = false;
      return;
    }

    // Create a single timeline for both background and text color animations
    const tl = gsap.timeline();

    if (isActive) {
      // Animate the background in and text color change together
      tl.to(bgRef.current, {
        scaleX: 1,
        duration: 0.4,
        ease: 'power2.out',
      });

      tl.to(
        buttonRef.current,
        {
          color: 'var(--background)',
          duration: 0.2,
          ease: 'power2.out',
        },
        '-=0.2' // Start slightly before background animation completes
      );
    } else {
      // Animate the background out and text color change together
      tl.to(buttonRef.current, {
        color: 'var(--foreground-75)',
        duration: 0.2,
        ease: 'power2.in',
      });

      tl.to(
        bgRef.current,
        {
          scaleX: 0,
          duration: 0.3,
          ease: 'power2.in',
        },
        '-=0.1' // Start slightly before text color change completes
      );
    }
  }, [isActive]);

  return (
    <div className="flex flex-col relative">
      <button
        ref={buttonRef}
        onClick={() => onClick(id)}
        className="text-left px-2 py-4 border-t border-border text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight w-full cursor-pointer relative z-10"
        aria-pressed={isActive}
        type="button"
      >
        {/* Background element that animates */}
        <div
          ref={bgRef}
          className="absolute left-0 top-0 w-full h-full bg-foreground z-[-1]"
          style={{
            transformOrigin: 'left',
            transform: 'scaleX(0)',
          }}
        ></div>
        {title}
      </button>

      {isActive && (
        <div className="md:hidden mt-4 mb-8 px-2">
          <div className="w-full aspect-video bg-background mb-4 overflow-hidden">
            <ProjectImage src={imageUrl} alt={title} />
          </div>
          <p className="text-lg mb-3">{description}</p>
          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <span
                key={tag}
                className="text-sm px-3 py-1 bg-primary text-primary-foreground"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
