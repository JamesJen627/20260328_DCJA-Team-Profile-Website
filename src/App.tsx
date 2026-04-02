function App() {
  return (
    <main className="flex min-h-screen items-center justify-center px-6 py-16">
      <section className="w-full max-w-2xl rounded-2xl border border-slate-700 bg-slate-800/60 p-8 shadow-xl shadow-slate-950/30">
        <p className="text-sm uppercase tracking-[0.18em] text-primary">
          Task 1.2 Complete
        </p>
        <h1 className="mt-3 text-3xl font-semibold text-slate-50">
          Tailwind Theme Initialized
        </h1>
        <p className="mt-4 text-slate-300">
          Global background uses <code className="text-primary">slate-900</code>,
          and the primary brand color is set to{' '}
          <code className="text-primary">blue-500</code>.
        </p>
        <button
          type="button"
          className="mt-8 rounded-lg bg-primary px-4 py-2 font-medium text-white transition hover:bg-blue-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
        >
          Primary Action
        </button>
      </section>
    </main>
  )
}

export default App
