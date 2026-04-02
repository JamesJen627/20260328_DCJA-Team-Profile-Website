import { useState } from 'react'
import clsx from 'clsx'
import { useForm } from 'react-hook-form'

import type { Message } from '../types'

export interface ContactFormProps {
  className?: string
  /**
   * V1: placeholder behavior for "success -> sent" state only.
   * Task 4.2 will replace this with real Web3Forms / Netlify Forms requests.
   */
  onSend?: (message: Message) => Promise<void>
}

export default function ContactForm({ className, onSend }: ContactFormProps) {
  const [isSent, setIsSent] = useState(false)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<Message>({
    mode: 'onBlur',
    defaultValues: {
      name: '',
      email: '',
      content: '',
    },
  })

  const submit = async (values: Message) => {
    if (isSent) return

    // Placeholder: Task 4.2 will replace this with email forwarding calls.
    const sender =
      onSend ??
      (async () => {
        await new Promise((r) => setTimeout(r, 600))
      })

    await sender(values)

    setIsSent(true)
    reset()
  }

  return (
    <form
      className={clsx(
        'rounded-2xl border border-slate-800 bg-slate-900/30 p-6 backdrop-blur',
        className,
      )}
      onSubmit={handleSubmit(submit)}
    >
      <div className="grid gap-4">
        <div>
          <label htmlFor="contact-name" className="block text-sm font-medium text-slate-100">
            Name
          </label>
          <input
            id="contact-name"
            type="text"
            autoComplete="name"
            disabled={isSent}
            aria-invalid={errors.name ? 'true' : 'false'}
            className={clsx(
              'mt-2 w-full rounded-md border bg-slate-950/30 px-3 py-2 text-sm text-slate-100 outline-none transition',
              errors.name ? 'border-red-500/80' : 'border-slate-700 focus:border-primary/60',
              'disabled:cursor-not-allowed disabled:opacity-60',
            )}
            {...register('name', {
              required: 'Please enter your name',
              minLength: { value: 2, message: 'Name must be at least 2 characters' },
            })}
          />
          {errors.name?.message && <p className="mt-1 text-xs text-red-300">{errors.name.message}</p>}
        </div>

        <div>
          <label htmlFor="contact-email" className="block text-sm font-medium text-slate-100">
            Email
          </label>
          <input
            id="contact-email"
            type="email"
            autoComplete="email"
            disabled={isSent}
            aria-invalid={errors.email ? 'true' : 'false'}
            className={clsx(
              'mt-2 w-full rounded-md border bg-slate-950/30 px-3 py-2 text-sm text-slate-100 outline-none transition',
              errors.email ? 'border-red-500/80' : 'border-slate-700 focus:border-primary/60',
              'disabled:cursor-not-allowed disabled:opacity-60',
            )}
            {...register('email', {
              required: 'Please enter your email',
              pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'Please enter a valid email' },
            })}
          />
          {errors.email?.message && <p className="mt-1 text-xs text-red-300">{errors.email.message}</p>}
        </div>

        <div>
          <label htmlFor="contact-content" className="block text-sm font-medium text-slate-100">
            Message
          </label>
          <textarea
            id="contact-content"
            rows={5}
            autoComplete="off"
            disabled={isSent}
            aria-invalid={errors.content ? 'true' : 'false'}
            className={clsx(
              'mt-2 w-full rounded-md border bg-slate-950/30 px-3 py-2 text-sm text-slate-100 outline-none transition',
              errors.content ? 'border-red-500/80' : 'border-slate-700 focus:border-primary/60',
              'disabled:cursor-not-allowed disabled:opacity-60',
            )}
            {...register('content', {
              required: 'Please enter your message',
              minLength: { value: 10, message: 'Message must be at least 10 characters' },
            })}
          />
          {errors.content?.message && (
            <p className="mt-1 text-xs text-red-300">{errors.content.message}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={isSent || isSubmitting}
          className={clsx(
            'mt-2 inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-semibold text-white transition',
            'hover:brightness-110',
            'disabled:cursor-not-allowed disabled:opacity-60',
          )}
        >
          {isSent ? 'Sent' : isSubmitting ? 'Sending...' : 'Send Message'}
        </button>
      </div>
    </form>
  )
}

