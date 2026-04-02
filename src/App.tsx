import { useMemo, useState } from 'react'

import ProjectFilter from './components/ProjectFilter'
import ProjectGrid from './components/ProjectGrid'
import { projects } from './data/projects'
import type { TechTag } from './types'

function App() {
  const [activeTag, setActiveTag] = useState<TechTag | null>(null)

  const availableTags = useMemo(() => {
    const TAG_ORDER: TechTag[] = ['React', 'Next.js', 'Tailwind', 'TypeScript', 'Node.js', 'Framer Motion']
    return TAG_ORDER.filter((t) => projects.some((p) => p.tags.includes(t)))
  }, [])

  const filteredProjects = useMemo(() => {
    return activeTag ? projects.filter((p) => p.tags.includes(activeTag)) : projects
  }, [activeTag])

  return (
    <main className="min-h-screen bg-background py-12">
      <div className="mx-auto w-full max-w-6xl px-6">
        <h1 className="text-2xl font-semibold text-slate-50">Projects</h1>
        <p className="mt-2 text-sm text-slate-300">
          A responsive project gallery using <span className="text-primary">lg</span> as the layout breakpoint.
        </p>

        <div className="mt-6">
          <ProjectFilter availableTags={availableTags} activeTag={activeTag} onChange={setActiveTag} />
        </div>
      </div>

      <div className="mt-8">
        <ProjectGrid projects={filteredProjects} />
      </div>
    </main>
  )
}

export default App
