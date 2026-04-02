import clsx from 'clsx'
import { AnimatePresence, motion } from 'framer-motion'
import { twMerge } from 'tailwind-merge'

import type { Project, TechTag } from '../types'

import SafeImage from './SafeImage'
import TechBadge from './TechBadge'

export interface ProjectGridProps {
  projects: Project[]
  className?: string
  onOpenCaseStudy?: (projectId: string) => void
}

function ProjectCard({
  project,
  onOpenCaseStudy,
}: {
  project: Project
  onOpenCaseStudy?: (projectId: string) => void
}) {
  return (
    <a
      href={project.link}
      target="_blank"
      rel="noreferrer"
      className={clsx(
        'group block h-full overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/50 backdrop-blur',
        'transition hover:-translate-y-0.5 hover:border-slate-600',
      )}
    >
      <div className="flex h-full flex-col p-4">
        <SafeImage src={project.imageUrl} alt={project.title} aspectClassName="aspect-[4/3]" />

        <div className="mt-4 flex flex-1 flex-col">
          <h3 className="text-lg font-semibold text-slate-50 transition-colors group-hover:text-primary">
            {project.title}
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-slate-300">{project.description}</p>

          <div className="mt-3 flex flex-wrap gap-2">
            {project.tags.map((tag: TechTag) => (
              <TechBadge key={tag} tag={tag} />
            ))}
          </div>

          <div className="mt-3 min-h-6">
            {project.featured && (
              <div className="inline-flex rounded-full border border-primary/30 bg-primary/10 px-2.5 py-1 text-xs font-medium text-primary">
                Featured
              </div>
            )}
          </div>

          <div className="mt-auto pt-3">
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault()
                e.stopPropagation()
                onOpenCaseStudy?.(project.id)
              }}
              className="inline-flex items-center rounded-md border border-slate-700 bg-slate-900/30 px-3 py-1.5 text-xs font-medium text-slate-200 transition hover:border-slate-600 hover:bg-slate-900/50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
            >
              Case study
            </button>
          </div>
        </div>
      </div>
    </a>
  )
}

export default function ProjectGrid({ projects, className, onOpenCaseStudy }: ProjectGridProps) {
  return (
    <div className={twMerge('mx-auto w-full max-w-6xl px-6', className)}>
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3 lg:auto-rows-fr">
        <AnimatePresence mode="popLayout" initial={false}>
          {projects.map((project) => (
            <motion.div
              key={project.id}
              layout
              className="h-full"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
            >
              <ProjectCard project={project} onOpenCaseStudy={onOpenCaseStudy} />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  )
}

