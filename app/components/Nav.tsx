'use client';

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Github, Linkedin, Moon, Sun, Globe, Menu, X } from "lucide-react";
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
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Handle scroll and update active section
  useEffect(() => {
    const handleScroll = () => {
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

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleMobileNavClick = (sectionId: string) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" });
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      {/* Header with semi-transparent background - added pointer-events-none to fix background issues */}
      <header className={`fixed bg-background top-0 left-0 right-0 w-full h-20 z-40 pointer-events-none transition-all duration-300`}></header>

      {/* Mobile hamburger menu button */}
      <div className="fixed top-0 left-0 p-6 z-50 md:hidden">
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleMobileMenu}
          aria-label="Toggle menu"
          className="w-10 h-10"
        >
          {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>
      </div>

      {/* Top right utility controls - visible on all screen sizes */}
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

      {/* Mobile navigation drawer */}
      <div className={`fixed inset-0 bg-background/60 backdrop-blur-sm z-40 transform transition-transform duration-300 ease-in-out ${
        isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
      } md:hidden pt-20`}>
        <div className="flex flex-col h-full px-6">
          <nav className="flex flex-col gap-8">
            {sections.map((section) => (
              <button
                key={section.id}
                onClick={() => handleMobileNavClick(section.id)}
                className={`text-left text-lg font-medium py-2 border-l-2 pl-4 transition-colors ${
                  activeSection === section.id ? "border-primary text-primary" : "border-transparent hover:text-primary/80 hover:border-primary/50"
                }`}
              >
                {section.label}
              </button>
            ))}
          </nav>
        </div>
      </div>

      <div className="fixed right-6 top-1/2 transform -translate-y-1/2 z-50 hidden md:block">
        <nav className="flex flex-col items-end gap-8 p-4 rounded-l-xl bg-background/40 backdrop-blur-[2px] shadow-sm transition-all duration-300">
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
