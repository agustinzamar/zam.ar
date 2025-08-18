'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import { gsap } from 'gsap';
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

type Testimonial = {
  id: number;
  name: string;
  role: string;
  quote: string;
  avatar: string;
  initials: string;
};

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "CTO at TechFlow",
    quote: "Agustin delivered our platform on time and exceeded our expectations. His attention to detail is remarkable.",
    avatar: "/avatars/avatar-1.png",
    initials: "SJ"
  },
  {
    id: 2,
    name: "Michael Chen",
    role: "Founder at StartupLabs",
    quote: "Working with Agustin was a game-changer for our business. His solutions are elegant and scalable.",
    avatar: "/avatars/avatar-2.png",
    initials: "MC"
  },
  {
    id: 3,
    name: "Emma Williams",
    role: "Product Manager at InnovateCorp",
    quote: "The user experience Agustin created for our app has significantly improved our conversion rates.",
    avatar: "/avatars/avatar-3.png",
    initials: "EW"
  },
  {
    id: 4,
    name: "James Rodriguez",
    role: "Lead Developer at CodeSphere",
    quote: "Agustin's code is clean, well-documented, and follows best practices. A true professional.",
    avatar: "/avatars/avatar-4.png",
    initials: "JR"
  },
  {
    id: 5,
    name: "Olivia Taylor",
    role: "UI/UX Director at DesignBox",
    quote: "His eye for design and technical skill make Agustin an exceptional full-stack developer.",
    avatar: "/avatars/avatar-5.png",
    initials: "OT"
  },
  {
    id: 6,
    name: "Daniel Kim",
    role: "CEO at NextWave",
    quote: "Agustin's solutions are not just functional but beautifully executed. A rare combination.",
    avatar: "/avatars/avatar-6.png",
    initials: "DK"
  },
  {
    id: 7,
    name: "Sophia Martinez",
    role: "Marketing Director at GrowthHacks",
    quote: "The website Agustin built for us has become our best marketing asset. Outstanding work.",
    avatar: "/avatars/avatar-7.png",
    initials: "SM"
  }
];

export function TestimonialMarquee() {
  const marqueeRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!marqueeRef.current || !contentRef.current) return;

    // Clone the content to create the infinite effect
    const content = contentRef.current;
    const clone = content.cloneNode(true);
    marqueeRef.current.appendChild(clone);

    // Set up the animation
    const totalWidth = content.offsetWidth;

    const tl = gsap.timeline({
      repeat: -1, // Infinite repetition
      defaults: { ease: "none" }
    });

    tl.to(marqueeRef.current.children, {
      x: -totalWidth,
      duration: 30, // Slow animation
      ease: "linear"
    });

    // Clean up
    return () => {
      tl.kill();
    };
  }, []);

  return (
    <div className="overflow-hidden w-full relative">
      <div ref={marqueeRef} className="flex">
        <div ref={contentRef} className="flex py-8">
          {testimonials.map(testimonial => (
            <div
              key={testimonial.id}
              className="bg-white flex-shrink-0 w-[300px] p-6 rounded-lg shadow-md border border-gray-200 mx-4"
            >
              <div className="flex items-center mb-4">
                <Avatar className="size-12 mr-4">
                  <AvatarImage
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    onError={(e) => {
                      // Fallback for missing avatars
                      (e.target as HTMLImageElement).src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDIwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjIwMCIgaGVpZ2h0PSIyMDAiIGZpbGw9IiNFNUU3RUIiLz48cGF0aCBkPSJNMTAwIDEzMEM4My40MzE1IDEzMCA3MCAxMTYuNTY5IDcwIDEwMEM3MCA4My40MzE1IDgzLjQzMTUgNzAgMTAwIDcwQzExNi41NjkgNzAgMTMwIDgzLjQzMTUgMTMwIDEwMEMxMzAgMTE2LjU2OSAxMTYuNTY5IDEzMCAxMDAgMTMwWiIgZmlsbD0iI0E3QTdBNyIvPjxwYXRoIGQ9Ik0xMDAgMTgwQzU1LjgxNzIgMTgwIDIwIDE0NC4xODMgMjAgMTAwQzIwIDU1LjgxNzIgNTUuODE3MiAyMCAxMDAgMjBDMTQ0LjE4MyAyMCAxODAgNTUuODE3MiAxODAgMTAwQzE4MCAxNDQuMTgzIDE0NC4xODMgMTgwIDEwMCAxODBaIiBzdHJva2U9IiNBN0E3QTciIHN0cm9rZS13aWR0aD0iMTIiLz48L3N2Zz4=';
                    }}
                  />
                  <AvatarFallback className="bg-black text-white">
                    {testimonial.initials}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                  <p className="text-sm text-gray-600">{testimonial.role}</p>
                </div>
              </div>
              <blockquote className="text-gray-700 italic">"{testimonial.quote}"</blockquote>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
