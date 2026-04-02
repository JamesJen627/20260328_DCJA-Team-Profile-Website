import { useState } from 'react'
import clsx from 'clsx'
import { useForm } from 'react-hook-form'

import type { Message } from '../types'

export interface ContactFormProps {
  className?: string
}

const WEB3FORMS_ENDPOINT = 'https://api.web3forms.com/submit'

export default function ContactForm({ className }: ContactFormProps) {
  const [isSent, setIsSent] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)
  const [submitSuccess, setSubmitSuccess] = useState<string | null>(null)

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
    setSubmitError(null)
    setSubmitSuccess(null)

    const accessKey = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY
    if (!accessKey) {
      setSubmitError('Missing VITE_WEB3FORMS_ACCESS_KEY in environment variables.')
      return
    }

    const response = await fetch(WEB3FORMS_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        access_key: accessKey,
        name: values.name,
        email: values.email,
        message: values.content,
        subject: 'New portfolio contact message',
      }),
    })

    const data = (await response.json()) as { success?: boolean; message?: string }
    if (!response.ok || !data.success) {
      setSubmitError(data.message ?? 'Failed to send. Please try again.')
      return
    }

    setIsSent(true)
    setSubmitSuccess('Message sent successfully.')
    reset()
  }

  return (
    <form
      className={clsx(
        'rounded-2xl border border-slate-300 bg-white/80 p-6 backdrop-blur dark:border-slate-800 dark:bg-slate-900/30',
        className,
      )}
      onSubmit={handleSubmit(submit)}
    >
      <div className="grid gap-4">
        <div>
          <label htmlFor="contact-name" className="block text-sm font-medium text-slate-700 dark:text-slate-100">
            Name
          </label>
          <input
            id="contact-name"
            type="text"
            autoComplete="name"
            disabled={isSent}
            aria-invalid={errors.name ? 'true' : 'false'}
            className={clsx(
              'mt-2 w-full rounded-md border bg-white/80 px-3 py-2 text-sm text-slate-800 outline-none transition dark:bg-slate-950/30 dark:text-slate-100',
              errors.name
                ? 'border-red-500/80'
                : 'border-slate-300 focus:border-primary/60 dark:border-slate-700',
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
          <label htmlFor="contact-email" className="block text-sm font-medium text-slate-700 dark:text-slate-100">
            Email
          </label>
          <input
            id="contact-email"
            type="email"
            autoComplete="email"
            disabled={isSent}
            aria-invalid={errors.email ? 'true' : 'false'}
            className={clsx(
              'mt-2 w-full rounded-md border bg-white/80 px-3 py-2 text-sm text-slate-800 outline-none transition dark:bg-slate-950/30 dark:text-slate-100',
              errors.email
                ? 'border-red-500/80'
                : 'border-slate-300 focus:border-primary/60 dark:border-slate-700',
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
          <label
            htmlFor="contact-content"
            className="block text-sm font-medium text-slate-700 dark:text-slate-100"
          >
            Message
          </label>
          <textarea
            id="contact-content"
            rows={5}
            autoComplete="off"
            disabled={isSent}
            aria-invalid={errors.content ? 'true' : 'false'}
            className={clsx(
              'mt-2 w-full rounded-md border bg-white/80 px-3 py-2 text-sm text-slate-800 outline-none transition dark:bg-slate-950/30 dark:text-slate-100',
              errors.content
                ? 'border-red-500/80'
                : 'border-slate-300 focus:border-primary/60 dark:border-slate-700',
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

        {submitSuccess && <p className="text-xs text-emerald-600 dark:text-emerald-300">{submitSuccess}</p>}
        {submitError && <p className="text-xs text-red-600 dark:text-red-300">{submitError}</p>}
      </div>
    </form>
  )
}

