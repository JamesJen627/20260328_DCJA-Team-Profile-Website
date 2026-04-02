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
            : 'border-slate-700 bg-slate-900/30 text-slate-300 hover:border-slate-600',
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
              : 'border-slate-700 bg-slate-900/30 text-slate-300 hover:border-slate-600',
          )}
        >
          {tag}
        </button>
      ))}
    </div>
  )
}

