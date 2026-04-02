import type { Project } from '../types'

export const projects: Project[] = [
  {
    id: 'dcja-portfolio-site',
    title: 'DCJA Team Portfolio',
    description:
      'A team portfolio website focused on modern motion, clean typography, and clear project storytelling.',
    tags: ['React', 'TypeScript', 'Tailwind', 'Framer Motion'],
    imageUrl: '/images/projects/dcja-portfolio-site/cover.webp',
    link: 'https://dcja-portfolio.example.com',
    githubUrl: 'https://github.com/JamesJen627/20260328_DCJA-Team-Profile-Website',
    featured: true,
  },
  {
    id: 'task-flow-dashboard',
    title: 'Task Flow Dashboard',
    description:
      'A kanban-style team dashboard for sprint planning, delivery tracking, and milestone visibility.',
    tags: ['React', 'Next.js', 'TypeScript'],
    imageUrl: '/images/projects/task-flow-dashboard/cover.webp',
    link: 'https://task-flow.example.com',
    githubUrl: 'https://github.com/example/task-flow-dashboard',
    featured: true,
  },
  {
    id: 'node-api-starter',
    title: 'Node API Starter',
    description:
      'A production-ready backend starter with layered architecture, validation, and deployable defaults.',
    tags: ['Node.js', 'TypeScript'],
    imageUrl: '/images/projects/node-api-starter/cover.webp',
    link: 'https://node-api-starter.example.com',
    githubUrl: 'https://github.com/example/node-api-starter',
    featured: false,
  },
]
