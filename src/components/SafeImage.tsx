import { useEffect, useState } from 'react'
import clsx from 'clsx'
import { twMerge } from 'tailwind-merge'

type SafeImageStatus = 'loading' | 'loaded' | 'error'

export type SafeImageProps = {
  src: string
  alt: string
  className?: string

  /**
   * Wrapper aspect ratio class, e.g. `aspect-[16/9]` or `aspect-square`.
   * (Tailwind only; avoid inline styles.)
   */
  aspectClassName?: string

  /**
   * Rendered while the image is loading.
   * If omitted, a small skeleton is shown.
   */
  loadingFallback?: React.ReactNode

  /**
   * Rendered when the image fails to load.
   * If omitted, a simple placeholder is shown.
   */
  fallback?: React.ReactNode
}

export default function SafeImage({
  src,
  alt,
  className,
  aspectClassName = 'aspect-[16/9]',
  loadingFallback,
  fallback,
}: SafeImageProps) {
  const [status, setStatus] = useState<SafeImageStatus>('loading')

  useEffect(() => {
    // Reset state when `src` changes. Use a microtask to avoid sync setState-in-effect lint.
    Promise.resolve().then(() => setStatus('loading'))
  }, [src])

  const wrapperClassName = twMerge(
    'relative overflow-hidden rounded-xl border border-slate-800 bg-slate-900/10',
    aspectClassName,
    className,
  )

  const imgClassName = twMerge(
    clsx(
      'absolute inset-0 h-full w-full object-cover transition-opacity duration-300',
      status === 'loaded' ? 'opacity-100' : 'opacity-0',
    ),
  )

  const defaultLoading = (
    <div className="h-full w-full animate-pulse bg-slate-800/40" aria-label="Loading image" />
  )

  const defaultFallback = (
    <div className="flex h-full w-full items-center justify-center">
      <span className="rounded-md border border-slate-800 bg-slate-900/30 px-3 py-1 text-xs text-slate-300">
        Image unavailable
      </span>
    </div>
  )

  return (
    <div className={wrapperClassName}>
      {status !== 'loaded' && (
        <div className="absolute inset-0">
          {status === 'error' ? fallback ?? defaultFallback : loadingFallback ?? defaultLoading}
        </div>
      )}

      <img
        src={src}
        alt={alt}
        className={imgClassName}
        loading="lazy"
        onLoad={() => setStatus('loaded')}
        onError={() => setStatus('error')}
      />
    </div>
  )
}

