import ProjectGrid from './components/ProjectGrid'
import { projects } from './data/projects'

function App() {
  return (
    <main className="min-h-screen bg-background py-12">
      <div className="mx-auto w-full max-w-6xl px-6">
        <h1 className="text-2xl font-semibold text-slate-50">Projects</h1>
        <p className="mt-2 text-sm text-slate-300">
          A responsive project gallery using <span className="text-primary">lg</span> as the layout breakpoint.
        </p>
      </div>

      <div className="mt-8">
        <ProjectGrid projects={projects} />
      </div>
    </main>
  )
}

export default App
