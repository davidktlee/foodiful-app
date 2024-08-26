import type { JSX } from 'react'

export {}

declare global {
  namespace NodeJS {
    export interface ProcessEnv {
      ENVIRONMENT: 'production' | 'development' | 'local'
      API_URL: string
    }
  }
}
