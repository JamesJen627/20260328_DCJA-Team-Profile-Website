import clsx from 'clsx'
import { twMerge } from 'tailwind-merge'

import type { Project, TechTag } from '../types'

import SafeImage from './SafeImage'
import TechBadge from './TechBadge'

export interface ProjectGridProps {
  projects: Project[]
  className?: string
}

function ProjectCard({ project }: { project: Project }) {
  return (
    <a
      href={project.link}
      target="_blank"
      rel="noreferrer"
      className={clsx(
        'group block overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/30',
        'transition-colors hover:border-slate-600',
      )}
    >
      <div className="p-4">
        <SafeImage src={project.imageUrl} alt={project.title} aspectClassName="aspect-[4/3]" />

        <div className="mt-4">
          <h3 className="text-lg font-semibold text-slate-50 transition-colors group-hover:text-primary">
            {project.title}
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-slate-300">{project.description}</p>

          <div className="mt-3 flex flex-wrap gap-2">
            {project.tags.map((tag: TechTag) => (
              <TechBadge key={tag} tag={tag} />
            ))}
          </div>

          {project.featured && (
            <div className="mt-3 inline-flex rounded-full border border-primary/30 bg-primary/10 px-2.5 py-1 text-xs font-medium text-primary">
              Featured
            </div>
          )}
        </div>
      </div>
    </a>
  )
}

export default function ProjectGrid({ projects, className }: ProjectGridProps) {
  return (
    <div className={twMerge('w-full max-w-6xl px-6', className)}>
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </div>
  )
}

