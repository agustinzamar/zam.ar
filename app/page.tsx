'use client';

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Projects } from "./components/Projects";
import { ExperienceTimeline } from "./components/ExperienceTimeline";
import { Nav } from "./components/Nav";
import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function Home() {
  const headingRef = useRef(null);

  useEffect(() => {
    if (!headingRef.current) return;

    // Get the original text
    const element = headingRef.current as HTMLHeadingElement;
    const originalText = element.textContent;

    // Create a wrapper div to hold the split text
    const wrapper = document.createElement("div");
    wrapper.style.display = "inline";
    wrapper.className = "split-text-wrapper";

    // Split text by words and add to wrapper with proper spacing
    const words = originalText.trim().split(/\s+/);

    words.forEach((word: string, index: number) => {
      // Create word span
      const wordSpan = document.createElement("span");
      wordSpan.textContent = word;
      wordSpan.style.display = "inline-block";
      wordSpan.style.opacity = "0";
      wordSpan.style.transform = "translateY(20px)";
      wordSpan.className = "word-span";

      // Add to wrapper
      wrapper.appendChild(wordSpan);

      // Add non-breaking space after each word except the last
      if (index < words.length - 1) {
        wrapper.appendChild(document.createTextNode(" "));
      }
    });

    // Replace content with our wrapper
    element.textContent = "";
    element.appendChild(wrapper);

    // Animate the word spans
    gsap.to(".word-span", {
      opacity: 1,
      y: 0,
      duration: 0.8,
      stagger: 0.1,
      ease: "power3.out",
    });
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground font-sans">
      {/* Navigation */}
      <Nav />
      <div className="lg:mr-32">


      {/* Hero Section - First section */}
      <div id="hero" className="bg-background flex flex-col justify-end h-screen">
        <div className="px-8 pb-16 md:pb-24">
          <div className="mb-4">
            <Badge variant="subtle" className="px-3 py-1 text-sm">
              Hi, I&apos;m Agustin
            </Badge>
          </div>
          <h1
            ref={headingRef}
            className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-none text-left max-w-4xl"
          >
            I craft elegant and scalable production software.
          </h1>
          <div className="mt-8">
            <Button>View Projects</Button>
          </div>
        </div>
      </div>

      {/* About Section - Second section */}
      <div id="about" className="overflow-auto">
        <div className="mx-auto px-8 py-24">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            <div>
              <h2 className="text-4xl font-bold mb-8">About Me</h2>
              <p className="text-xl leading-relaxed mb-6">
                I&apos;m Full Stack Developer with 5+ years of experience specializing in building exceptional digital
                experiences. With a focus on performance and design, I create
                solutions that balance form and function.
              </p>
              <p className="text-xl leading-relaxed">
                My expertise spans frontend and backend development, with a passion for delivering features that truly matter. I thrive in collaborative environments, working closely with designers and stakeholders to
                bring ideas to life.
              </p>
            </div>
            <div className="flex items-center justify-center">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-primary/10  rounded-xl p-6">
                  <h3 className="text-2xl font-bold mb-2">Frontend</h3>
                  <p>React, Next.js, TypeScript, Tailwind CSS</p>
                </div>
                <div className="bg-primary/10 rounded-xl p-6">
                  <h3 className="text-2xl font-bold mb-2">Backend</h3>
                  <p>Node.js, Express, PostgreSQL, MongoDB</p>
                </div>
                <div className="bg-primary/10 rounded-xl p-6">
                  <h3 className="text-2xl font-bold mb-2">Design</h3>
                  <p>Figma, Design Systems, UI/UX</p>
                </div>
                <div className="bg-primary/10 rounded-xl p-6">
                  <h3 className="text-2xl font-bold mb-2">DevOps</h3>
                  <p>Docker, CI/CD, AWS, Vercel</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Projects Section - Third section */}
      <div id="projects" className="bg-background text-foreground overflow-auto">
        <div className="mx-auto px-8 py-24">
          <h2 className="text-4xl font-bold mb-12 text-center">My Work</h2>
          <Projects />
        </div>
      </div>

      {/* Experience Section - Fourth section */}
      <div id="experience" className="bg-background text-foreground overflow-auto">
        <div className="py-24">
          <h2 className="text-4xl font-bold mb-12 text-center">Experience</h2>
          <ExperienceTimeline />
        </div>
      </div>
    </div>
    </div>
  );
}
