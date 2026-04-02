import clsx from 'clsx'

import type { TechTag } from '../types'

export interface ProjectFilterProps {
  availableTags: TechTag[]
  activeTag: TechTag | null
  onChange: (next: TechTag | null) => void
}

const TAG_ORDER: TechTag[] = ['React', 'Next.js', 'Tailwind', 'TypeScript', 'Node.js', 'Framer Motion']

function sortTags(tags: TechTag[]) {
  const set = new Set(tags)
  return TAG_ORDER.filter((t) => set.has(t))
}

export default function ProjectFilter({
  availableTags,
  activeTag,
  onChange,
}: ProjectFilterProps) {
  const orderedTags = sortTags(availableTags)

  return (
    <div className="flex flex-wrap gap-2">
      <button
        type="button"
        onClick={() => onChange(null)}
        className={clsx(
          'rounded-full border px-3 py-1 text-sm font-medium transition',
          activeTag === null
            ? 'border-primary/50 bg-primary/10 text-primary'
            : 'border-slate-300 bg-white/70 text-slate-700 hover:border-slate-400 dark:border-slate-700 dark:bg-slate-900/30 dark:text-slate-300 dark:hover:border-slate-600',
        )}
      >
        All
      </button>

      {orderedTags.map((tag) => (
        <button
          key={tag}
          type="button"
          onClick={() => onChange(tag)}
          className={clsx(
            'rounded-full border px-3 py-1 text-sm font-medium transition',
            activeTag === tag
              ? 'border-primary/50 bg-primary/10 text-primary'
              : 'border-slate-300 bg-white/70 text-slate-700 hover:border-slate-400 dark:border-slate-700 dark:bg-slate-900/30 dark:text-slate-300 dark:hover:border-slate-600',
          )}
        >
          {tag}
        </button>
      ))}
    </div>
  )
}

