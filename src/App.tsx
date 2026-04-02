import { useEffect, useMemo, useState } from 'react'
import clsx from 'clsx'

import { AnimatePresence, motion } from 'framer-motion'

import ProjectFilter from './components/ProjectFilter'
import ProjectCaseStudy from './components/ProjectCaseStudy'
import ProjectGrid from './components/ProjectGrid'
import ContactForm from './components/ContactForm'
import ThemeToggle from './components/ThemeToggle'
import { projects } from './data/projects'
import type { Project, TechTag } from './types'

const THEME_STORAGE_KEY = 'theme'

function App() {
  const [activeTag, setActiveTag] = useState<TechTag | null>(null)
  const [caseStudyProjectId, setCaseStudyProjectId] = useState<Project['id'] | null>(null)
  const [isDark, setIsDark] = useState(() => {
    const stored = localStorage.getItem(THEME_STORAGE_KEY)
    if (stored === 'light') return false
    if (stored === 'dark') return true
    return window.matchMedia('(prefers-color-scheme: dark)').matches
  })

  const availableTags = useMemo(() => {
    const TAG_ORDER: TechTag[] = ['React', 'Next.js', 'Tailwind', 'TypeScript', 'Node.js', 'Framer Motion']
    return TAG_ORDER.filter((t) => projects.some((p) => p.tags.includes(t)))
  }, [])

  const filteredProjects = useMemo(() => {
    return activeTag ? projects.filter((p) => p.tags.includes(activeTag)) : projects
  }, [activeTag])

  const caseStudyProject = useMemo(
    () => (caseStudyProjectId ? projects.find((p) => p.id === caseStudyProjectId) ?? null : null),
    [caseStudyProjectId],
  )

  useEffect(() => {
    if (!caseStudyProjectId) return

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setCaseStudyProjectId(null)
    }

    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [caseStudyProjectId])

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDark)
    localStorage.setItem(THEME_STORAGE_KEY, isDark ? 'dark' : 'light')
  }, [isDark])

  return (
    <main className="min-h-screen bg-slate-100 py-12 text-slate-900 transition-colors dark:bg-background dark:text-slate-100">
      <div className="mx-auto w-full max-w-6xl px-6">
        <div className="rounded-2xl border border-slate-300 bg-white/80 p-6 backdrop-blur dark:border-slate-800 dark:bg-slate-900/50">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <h1 className="text-2xl font-semibold text-slate-900 dark:text-slate-50">Projects</h1>
              <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
                A responsive project gallery using <span className="text-primary">lg</span> as the layout
                breakpoint.
              </p>
            </div>
            <ThemeToggle isDark={isDark} onToggle={() => setIsDark((v) => !v)} />
          </div>

          <div className="mt-6 rounded-xl border border-slate-300 bg-white/70 p-4 dark:border-slate-800 dark:bg-slate-900/30">
            <ProjectFilter availableTags={availableTags} activeTag={activeTag} onChange={setActiveTag} />
          </div>
        </div>
      </div>

      <div className="mt-8">
        <ProjectGrid
          projects={filteredProjects}
          onOpenCaseStudy={(projectId) => setCaseStudyProjectId(projectId)}
        />
      </div>

      <div className="mt-12 mx-auto w-full max-w-6xl px-6">
        <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-50">Contact Form</h2>
        <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
          If you are interested in collaboration or hiring, send us a message below. Email validation
          and submission status are already included.
        </p>
        <div className="mt-6">
          <ContactForm />
        </div>
      </div>

      <AnimatePresence>
        {caseStudyProjectId && (
          <motion.div
            key={caseStudyProjectId}
            className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onMouseDown={(e) => {
              if (e.target === e.currentTarget) setCaseStudyProjectId(null)
            }}
          >
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 16 }}
              transition={{ duration: 0.2 }}
              className={clsx(
                'w-full max-w-3xl overflow-hidden rounded-2xl border backdrop-blur',
                'border-slate-300 bg-white/95 dark:border-slate-800 dark:bg-slate-900/80',
              )}
            >
              <div className="flex items-start justify-between gap-3 border-b border-slate-300 p-6 dark:border-slate-800">
                <div>
                  <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-50">
                    {caseStudyProject?.title}
                  </h2>
                  <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
                    Project case study (MDX)
                  </p>
                </div>

                <button
                  type="button"
                  className="rounded-md border border-slate-300 bg-white/70 px-3 py-1.5 text-sm font-medium text-slate-700 transition hover:border-slate-400 hover:bg-white dark:border-slate-700 dark:bg-slate-900/30 dark:text-slate-200 dark:hover:border-slate-600 dark:hover:bg-slate-900/50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                  onClick={() => setCaseStudyProjectId(null)}
                >
                  Close
                </button>
              </div>

              <div className="max-h-[80vh] overflow-auto p-6">
                <ProjectCaseStudy projectId={caseStudyProjectId} />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  )
}

export default App
