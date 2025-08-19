'use client';

import React from 'react';
import Image from "next/image";

interface ProjectImageProps {
  src: string;
  alt: string;
  className?: string;
}

export const ProjectImage: React.FC<ProjectImageProps> = ({
  src,
  alt,
  className = "object-contain w-full h-full"
}) => {

  // Fix the image path if it's not correctly formatted
  const imagePath = src.startsWith('/') ? src : `/${src}`;

  return (
    <div className="w-full h-full bg-background relative flex items-center justify-center">
        <Image
          src={imagePath}
          alt={alt}
          className={className}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          style={{ objectFit: "contain" }}
        />
    </div>
  );
};
