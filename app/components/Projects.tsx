'use client';

import React, { useState, useEffect, useRef } from 'react';
import { ProjectItem } from './ProjectItem';
import { ProjectImage } from './ProjectImage';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Sample project data - you can replace with real data later
const projects = [
	{
		id: 'project1',
		title: 'E-Commerce Platform',
		description:
			'A modern e-commerce platform with responsive design and seamless checkout experience for a fashion retailer.',
		imageUrl: '/projects/project1.png',
		tags: ['React', 'Next.js', 'Tailwind CSS', 'Stripe', 'MongoDB'],
	},
	{
		id: 'project2',
		title: 'Finance Dashboard',
		description:
			'Data visualization dashboard for financial analysts with real-time updates and interactive charts.',
		imageUrl: '/projects/project2.png',
		tags: ['TypeScript', 'D3.js', 'Express', 'PostgreSQL', 'WebSockets'],
	},
	{
		id: 'project3',
		title: 'Social Media App',
		description:
			'Mobile-first social platform with user-generated content and a powerful recommendation engine.',
		imageUrl: '/projects/project3.png',
		tags: ['React Native', 'GraphQL', 'Node.js', 'AWS', 'Firebase'],
	},
	{
		id: 'project4',
		title: 'Health Tracker',
		description:
			'Wellness application that helps users track fitness goals, nutrition, and sleep patterns with actionable insights.',
		imageUrl: '/projects/project4.png',
		tags: ['Vue.js', 'Tailwind CSS', 'Express', 'MongoDB', 'Docker'],
	},
	{
		id: 'project5',
		title: 'AI Content Generator',
		description:
			'Creative assistant platform that helps content creators generate and refine ideas using machine learning.',
		imageUrl: '/projects/project5.png',
		tags: ['React', 'Python', 'TensorFlow', 'FastAPI', 'PostgreSQL'],
	},
];

export const Projects = () => {
	const [activeProject, setActiveProject] = useState(projects[0].id);
	const projectsRef = useRef(null);
	const projectItemsRef = useRef<(HTMLDivElement | null)[]>([]);
	const detailsRef = useRef(null);

	// Initialize GSAP and ScrollTrigger
	useEffect(() => {
		if (typeof window !== 'undefined') {
			gsap.registerPlugin(ScrollTrigger);

			// Set initial opacity to 1 to ensure content is visible even without animation
			gsap.set(projectsRef.current, { opacity: 1 });

			// Give time for the refs to be populated
			setTimeout(() => {
				// Only animate if ScrollTrigger is available and elements exist
				if (ScrollTrigger && projectsRef.current) {
					// Clear any existing ScrollTriggers to prevent duplicates
					ScrollTrigger.getAll().forEach((trigger) => trigger.kill());

					// Create a timeline for the animations
					const tl = gsap.timeline({
						scrollTrigger: {
							trigger: projectsRef.current,
							start: 'top 80%',
							toggleActions: 'play none none none',
						}
					});

					// Add the main section animation
					tl.fromTo(
						projectsRef.current,
						{ opacity: 0.5, y: 30 },
						{
							opacity: 1,
							y: 0,
							duration: 0.8,
							ease: 'power2.out',
						}
					);

					// Add the staggered project items animation if they exist
					if (projectItemsRef.current.length > 0) {
						tl.fromTo(
							projectItemsRef.current,
							{ x: -30, opacity: 0 },
							{
								x: 0,
								opacity: 1,
								stagger: 0.1,
								duration: 0.6,
								ease: 'power2.out',
							},
							"-=0.4" // Start slightly before the previous animation finishes
						);
					}
				}
			}, 100);
		}

		return () => {
			if (typeof window !== 'undefined' && ScrollTrigger) {
				ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
			}
		};
	}, []);

	// Add animation when switching between projects
	useEffect(() => {
		if (detailsRef.current) {
			// Create a timeline for smooth transition
			const tl = gsap.timeline();

			// Fade out and slide right
			tl.to(detailsRef.current, {
				opacity: 0,
				x: 20,
				duration: 0.3,
				ease: 'power2.in',
			});

			// Reset position and fade in with a slight delay
			tl.to(detailsRef.current, {
				x: -20,
				duration: 0,
				onComplete: () => {
					// This ensures the content has updated before animating back in
					setTimeout(() => {
						gsap.to(detailsRef.current, {
							opacity: 1,
							x: 0,
							duration: 0.5,
							ease: 'power2.out',
						});
					}, 50);
				}
			}, '>0.1');
		}
	}, [activeProject]);

	const handleProjectClick = (id: string) => {
		setActiveProject(id);
	};

	// Reset the refs array before populating it
	const setProjectItemRef = (el: HTMLDivElement | null, index: number) => {
		if (el) {
			projectItemsRef.current[index] = el;
		}
	};

	const activeProjectData = projects.find(
		(project) => project.id === activeProject
	);

	return (
		<div
			ref={projectsRef}
			className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 relative z-20"
			style={{ opacity: 1 }} // Ensure initial visibility
		>
			{/* Left column - Project list */}
			<div className="space-y-0">
				{projects.map((project, index) => (
					<div
						key={project.id}
						ref={(el) => setProjectItemRef(el as HTMLDivElement, index)}
					>
						<ProjectItem
							id={project.id}
							title={project.title}
							description={project.description}
							imageUrl={project.imageUrl}
							tags={project.tags}
							isActive={project.id === activeProject}
							onClick={handleProjectClick}
						/>
					</div>
				))}
			</div>

			{/* Right column - Project details (hidden on mobile) */}
			<div className="hidden md:block">
				{activeProjectData && (
					<div ref={detailsRef} className="sticky top-24">
						<div className="w-full aspect-video bg-muted mb-6 overflow-hidden">
							<ProjectImage
								src={activeProjectData.imageUrl}
								alt={activeProjectData.title}
							/>
						</div>
						<p className="text-lg mb-4">{activeProjectData.description}</p>
						<div className="flex flex-wrap gap-2">
							{activeProjectData.tags.map((tag) => (
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
		</div>
	);
};
