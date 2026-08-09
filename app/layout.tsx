import type { Metadata } from 'next'
import type { ReactNode } from 'react'
import 'highlight.js/styles/github.css'
import './globals.css'

export const metadata: Metadata = {
  title: 'LLMs Meta Tags Standard',
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
