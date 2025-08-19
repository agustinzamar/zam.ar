'use client';

import React from 'react';
import { ProjectImage } from './ProjectImage';

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
  return (
    <div className="flex flex-col">
      <button
        onClick={() => onClick(id)}
        className={`text-left transition-all duration-300 px-2 py-4 border-t border-border text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight w-full cursor-pointer ${
          isActive
            ? 'text-foreground'
            : 'text-foreground/40 hover:text-foreground/60'
        }`}
        aria-pressed={isActive}
        type="button"
      >
        {title}
      </button>

      {isActive && (
        <div className="md:hidden mt-4 mb-8 px-2">
          <div className="w-full aspect-video bg-background mb-4 overflow-hidden">
            <ProjectImage
              src={imageUrl}
              alt={title}
            />
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
