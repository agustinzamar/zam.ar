'use client';

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Github, Linkedin, Moon, Sun, Globe } from "lucide-react";
import Link from "next/link";
import { useTheme } from "../providers/theme-provider";

type Section = {
  id: string;
  label: string;
};

const sections: Section[] = [
  { id: "hero", label: "Home" },
  { id: "about", label: "About" },
  { id: "projects", label: "Projects" },
  { id: "experience", label: "Experience" }
];

export function Nav() {
  const [activeSection, setActiveSection] = useState("hero");
  const { theme, toggleTheme } = useTheme();

  // Handle scroll and update active section
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;

      // Find which section is currently in view
      const currentSection = sections.find((section) => {
        const element = document.getElementById(section.id);
        if (!element) return false;

        const rect = element.getBoundingClientRect();
        return rect.top <= 200 && rect.bottom >= 200;
      });

      if (currentSection) {
        setActiveSection(currentSection.id);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* Top right utility controls */}
      <div className="fixed top-0 right-0 p-6 flex items-center gap-4 z-50">
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleTheme}
          aria-label="Toggle theme"
          className="w-10 h-10"
        >
          {theme === "light" ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
        </Button>

        <Button
          variant="ghost"
          size="icon"
          aria-label="Language"
          className="w-10 h-10"
        >
          <Globe className="h-5 w-5" />
        </Button>

        <Link href="https://github.com/agustinzamar" target="_blank" rel="noopener noreferrer">
          <Button
            variant="ghost"
            size="icon"
            aria-label="GitHub"
            className="w-10 h-10"
          >
            <Github className="h-5 w-5" />
          </Button>
        </Link>

        <Link href="https://linkedin.com/in/agustinzamar" target="_blank" rel="noopener noreferrer">
          <Button
            variant="ghost"
            size="icon"
            aria-label="LinkedIn"
            className="w-10 h-10"
          >
            <Linkedin className="h-5 w-5" />
          </Button>
        </Link>
      </div>

      {/* Right side vertical navigation */}
      <div className="fixed right-6 top-1/2 transform -translate-y-1/2 z-50">
        <nav className="flex flex-col items-end gap-8">
          {sections.map((section) => (
            <Link
              key={section.id}
              href={`#${section.id}`}
              onClick={(e) => {
                e.preventDefault();
                document.getElementById(section.id)?.scrollIntoView({ behavior: "smooth" });
              }}
              className="group flex items-center gap-2"
            >
              <span className={`text-right text-sm font-medium transition-opacity duration-200 ${
                activeSection === section.id ? "opacity-100" : "opacity-0 group-hover:opacity-100"
              }`}>
                {section.label}
              </span>
              <div className="flex items-center">
                <div className={`w-2 h-2 rounded-full transition-all duration-200 ${
                  activeSection === section.id 
                    ? "bg-primary w-3 h-3" 
                    : "bg-foreground/30 group-hover:bg-primary/70"
                }`} />
                <div className={`h-px w-8 transition-all duration-200 ${
                  activeSection === section.id 
                    ? "w-12 bg-primary" 
                    : "bg-foreground/30 group-hover:bg-primary/70"
                }`} />
              </div>
            </Link>
          ))}
        </nav>
      </div>
    </>
  );
}
