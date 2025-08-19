'use client';

import React, { useState, useEffect } from 'react';
import { ProjectItem } from './ProjectItem';
import { ProjectImage } from './ProjectImage';

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

	const handleProjectClick = (id: string) => {
		setActiveProject(id);
	};

	const activeProjectData = projects.find(
		(project) => project.id === activeProject
	);

	return (
		<div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 relative z-20">
			{/* Left column - Project list */}
			<div className="space-y-0">
				{projects.map((project) => (
					<ProjectItem
						key={project.id}
						id={project.id}
						title={project.title}
						description={project.description}
						imageUrl={project.imageUrl}
						tags={project.tags}
						isActive={project.id === activeProject}
						onClick={handleProjectClick}
					/>
				))}
			</div>

			{/* Right column - Project details (hidden on mobile) */}
			<div className="hidden md:block">
				{activeProjectData && (
					<div className="sticky top-24">
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
