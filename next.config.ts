import { fileURLToPath } from 'node:url'
import type { NextConfig } from 'next'

/**
 * Markdown sources live at the repository root and are read at request time, so
 * they must be traced into standalone/serverless builds explicitly. The list is
 * enumerated rather than globbed (`./*.md` would also ship CLAUDE.md, which is
 * guidance for coding agents and not site content), so publishing a new page
 * means adding its file here as well.
 */
const PUBLISHED_CONTENT = ['./README.md', './DOCUMENTATION.md', './CONTRIBUTING.md', './LICENSE']

const nextConfig: NextConfig = {
  // This repository is nested inside a parent folder that also has lockfiles.
  turbopack: { root: fileURLToPath(new URL('.', import.meta.url)) },
  outputFileTracingIncludes: {
    '/**': PUBLISHED_CONTENT,
  },
}

export default nextConfig
