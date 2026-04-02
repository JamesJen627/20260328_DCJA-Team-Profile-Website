export type TechTag =
  | 'React'
  | 'Next.js'
  | 'Tailwind'
  | 'TypeScript'
  | 'Node.js'
  | 'Framer Motion'

export interface Project {
  id: string
  title: string
  description: string
  tags: TechTag[]
  imageUrl: string
  link: string
  githubUrl?: string
  featured: boolean
}

// Message is only the contact-form payload shape for V1 email delivery.
export interface Message {
  name: string
  email: string
  content: string
}
