import clsx from 'clsx'
import { twMerge } from 'tailwind-merge'

import type { TechTag } from '../types'

export interface TechBadgeProps {
  tag: TechTag
  className?: string
}

const TECH_BADGE_CLASSES: Record<TechTag, string> = {
  React: 'border-blue-500/20 bg-blue-500/10 text-blue-300',
  'Next.js': 'border-sky-500/20 bg-sky-500/10 text-sky-300',
  Tailwind: 'border-teal-500/20 bg-teal-500/10 text-teal-300',
  TypeScript: 'border-indigo-500/20 bg-indigo-500/10 text-indigo-300',
  'Node.js': 'border-emerald-500/20 bg-emerald-500/10 text-emerald-300',
  'Framer Motion': 'border-pink-500/20 bg-pink-500/10 text-pink-300',
}

export default function TechBadge({ tag, className }: TechBadgeProps) {
  const tagClassName = TECH_BADGE_CLASSES[tag]

  return (
    <span
      className={twMerge(
        clsx(
          'inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-medium',
          'backdrop-blur-sm',
          tagClassName,
        ),
        className,
      )}
    >
      {tag}
    </span>
  )
}

