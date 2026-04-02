/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_WEB3FORMS_ACCESS_KEY?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}

declare module '*.mdx?raw' {
  const content: string
  export default content
}

