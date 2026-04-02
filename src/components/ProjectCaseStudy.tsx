import { useEffect, useMemo, useState } from 'react'
import type React from 'react'
import { evaluate } from '@mdx-js/mdx'
import * as runtime from 'react/jsx-runtime'

import { projectCaseStudies } from '../content/projects'
import type { Project } from '../types'

export interface ProjectCaseStudyProps {
  projectId: Project['id']
  className?: string
}

type MdxComponent = React.ComponentType<{ components?: Record<string, unknown> }>

const mdxCache = new Map<string, MdxComponent>()

const mdxComponents: Record<string, (props: unknown) => React.ReactElement> = {
  h1: (props) => {
    const p = props as React.HTMLAttributes<HTMLHeadingElement>
    return <h1 {...p} className="text-2xl font-semibold text-slate-900 dark:text-slate-50" />
  },
  h2: (props) => {
    const p = props as React.HTMLAttributes<HTMLHeadingElement>
    return <h2 {...p} className="mt-6 text-xl font-semibold text-slate-900 dark:text-slate-50" />
  },
  h3: (props) => {
    const p = props as React.HTMLAttributes<HTMLHeadingElement>
    return <h3 {...p} className="mt-5 text-lg font-semibold text-slate-900 dark:text-slate-50" />
  },
  p: (props) => {
    const p = props as React.HTMLAttributes<HTMLParagraphElement>
    return <p {...p} className="mt-3 text-sm leading-relaxed text-slate-700 dark:text-slate-300" />
  },
  ul: (props) => {
    const p = props as React.HTMLAttributes<HTMLUListElement>
    return <ul {...p} className="mt-3 list-disc pl-6 text-sm text-slate-700 dark:text-slate-300" />
  },
  ol: (props) => {
    const p = props as React.HTMLAttributes<HTMLOListElement>
    return <ol {...p} className="mt-3 list-decimal pl-6 text-sm text-slate-700 dark:text-slate-300" />
  },
  li: (props) => {
    const p = props as React.HTMLAttributes<HTMLLIElement>
    return <li {...p} className="mt-1 text-sm text-slate-700 dark:text-slate-300" />
  },
  blockquote: (props) => {
    const p = props as React.HTMLAttributes<HTMLElement>
    return (
      <blockquote
        {...p}
        className="mt-3 border-l-2 border-primary/40 bg-primary/5 pl-4 text-sm text-slate-700 dark:text-slate-300"
      />
    )
  },
  a: (props) => {
    const p = props as React.AnchorHTMLAttributes<HTMLAnchorElement>
    return (
      <a
        {...p}
        className="text-primary underline underline-offset-4 hover:text-blue-400"
        target={p.target ?? '_blank'}
        rel={p.rel ?? 'noreferrer'}
      />
    )
  },
  code: (props) => {
    const p = props as React.HTMLAttributes<HTMLElement>
    return (
      <code
        {...p}
        className="rounded bg-slate-200 px-1 py-0.5 font-mono text-xs text-slate-900 dark:bg-slate-900/60 dark:text-slate-100"
      />
    )
  },
  pre: (props) => {
    const p = props as React.HTMLAttributes<HTMLPreElement>
    return (
      <pre
        {...p}
        className="mt-4 overflow-x-auto rounded-xl border border-slate-300 bg-slate-100 p-4 dark:border-slate-800 dark:bg-slate-950/40"
      />
    )
  },
}

export default function ProjectCaseStudy({ projectId, className }: ProjectCaseStudyProps) {
  const mdxSource = useMemo(() => projectCaseStudies[projectId], [projectId])

  const [Content, setContent] = useState<MdxComponent | null>(() => {
    const cached = mdxCache.get(projectId)
    return cached ?? null
  })

  useEffect(() => {
    if (!mdxSource) {
      return
    }

    let cancelled = false

    ;(async () => {
      const cached = mdxCache.get(projectId)
      if (cached) {
        // Avoid synchronous setState inside effect (eslint rule).
        await Promise.resolve()
        if (cancelled) return
        setContent(cached)
        return
      }

      const evaluated = await evaluate(mdxSource, {
        ...runtime,
        baseUrl: import.meta.url,
      })

      const evaluatedDefault = evaluated.default as MdxComponent
      if (cancelled) return

      mdxCache.set(projectId, evaluatedDefault)
      setContent(() => evaluatedDefault)
    })()

    return () => {
      cancelled = true
    }
  }, [mdxSource, projectId])

  if (!mdxSource) return null
  if (!Content)
    return (
      <div className={className}>
        <div className="rounded-xl border border-slate-300 bg-slate-100 p-6 dark:border-slate-800 dark:bg-slate-900/30">
          <div className="h-6 w-1/2 animate-pulse rounded bg-slate-300/60 dark:bg-slate-800/40" />
          <div className="mt-4 h-4 w-2/3 animate-pulse rounded bg-slate-300/60 dark:bg-slate-800/40" />
          <div className="mt-4 h-4 w-1/2 animate-pulse rounded bg-slate-300/60 dark:bg-slate-800/40" />
        </div>
      </div>
    )

  return (
    <div className={className}>
      <Content components={mdxComponents} />
    </div>
  )
}

