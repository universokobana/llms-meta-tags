import { readFile } from 'node:fs/promises'
import path from 'node:path'

/**
 * Markdown sources live at the repository root (README.md, DOCUMENTATION.md, ...)
 * so GitHub and the site render the exact same files.
 */
const CONTENT_ROOT = process.env.CONTENT_ROOT
  ? path.resolve(process.env.CONTENT_ROOT)
  : process.cwd()

/** Views come from the URL, so only plain names are accepted. */
const SAFE_NAME = /^[A-Za-z0-9_-]+$/

async function read(fileName: string): Promise<string | null> {
  const filePath = path.join(CONTENT_ROOT, fileName)
  try {
    return await readFile(filePath, 'utf8')
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === 'ENOENT') return null
    throw error
  }
}

/** Reads the markdown file backing a view, or `null` when it does not exist. */
export async function readView(view: string): Promise<string | null> {
  if (!SAFE_NAME.test(view)) return null
  return read(`${view.toUpperCase()}.md`)
}

/** Reads a plain file from the content root (used for LICENSE). */
export async function readProjectFile(fileName: string): Promise<string | null> {
  if (!SAFE_NAME.test(fileName)) return null
  return read(fileName)
}
