"use client";

import { useEffect, useRef, useState } from "react";

export const ScrollAnimation = ({ children }: { children: React.ReactNode }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [windowHeight, setWindowHeight] = useState(0);
  const childrenArray = Array.isArray(children) ? children : [children];
  const [activeSection, setActiveSection] = useState(0);

  useEffect(() => {
    // Set window height once we're in the browser
    setWindowHeight(window.innerHeight);

    const handleScroll = () => {
      if (containerRef.current) {
        const newScrollPosition = window.scrollY;
        setScrollPosition(newScrollPosition);

        // Calculate which section should be active
        const sectionIndex = Math.min(
          Math.floor(newScrollPosition / windowHeight),
          childrenArray.length - 1
        );
        setActiveSection(sectionIndex);
      }
    };

    const handleResize = () => {
      setWindowHeight(window.innerHeight);
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleResize);
    handleScroll(); // Initialize on mount

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, [childrenArray.length, windowHeight]);

  return (
    <div ref={containerRef} className="relative">
      {/* Fixed sections container */}
      <div className="fixed inset-0 w-full h-screen overflow-hidden pointer-events-none">
        {childrenArray.map((child, index) => {
          // Only calculate this once we have a valid window height
          if (windowHeight === 0) return null;

          // For each section, determine if it should be visible
          const progress = Math.max(
            0,
            Math.min(
              1,
              (scrollPosition - index * windowHeight) / windowHeight
            )
          );

          return (
            <div
              key={index}
              className={`absolute inset-0 w-full h-full ${
                index === 0 ? "" : "rounded-t-[40px]"
              } pointer-events-auto`}
              style={{
                zIndex: index + 10,
                transform:
                  index === 0
                    ? "none"
                    : `translateY(${Math.max(0, 100 - progress * 100)}%)`,
                transition: "transform 0.2s ease-out",
                display: progress > 0 || index === activeSection ? "block" : "none",
              }}
            >
              {child}
            </div>
          );
        })}
      </div>

      {/* Spacer to allow scrolling - full height for each section */}
      <div
        className="relative"
        style={{ height: `${childrenArray.length * 100}vh` }}
      >
        {childrenArray.map((_, index) => (
          <div key={index} className="h-screen w-full" />
        ))}
      </div>
    </div>
  );
};
