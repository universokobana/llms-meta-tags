/**
 * Route resolution shared by the proxy, the HTML page and the raw content handler.
 *
 * Handles paths like:
 *   /                 -> page=null,          view=readme,        format=html
 *   /index.md         -> page=index,         view=readme,        format=md
 *   /llms.txt         -> page=llms,          view=readme,        format=md
 *   /documentation    -> page=documentation, view=documentation, format=html
 *   /documentation.md -> page=documentation, view=documentation, format=md
 *
 * Kept free of Node APIs so it can run in any runtime.
 */

export type ContentFormat = 'md' | 'html'

export interface ResolvedRoute {
  /** Page name from the URL, or `null` for the root path. */
  page: string | null
  /** Logical view name; uppercased it becomes the markdown file name. */
  view: string
  format: ContentFormat
}

/** A single dot-free segment, optionally suffixed with `.md` and/or `.txt`. */
const ROUTE_PATTERN = /^\/?([^/.]+)?(?:\.md)?(?:\.txt)?\/?$/

const DEFAULT_VIEW = 'readme'
const DEFAULT_VIEW_ALIASES = ['index', 'llms']

/** Pages that are always served as markdown, whatever the client is. */
const MARKDOWN_ONLY_PAGES = ['llms']

/**
 * Markdown files that live at the repository root but must not be published.
 * CLAUDE.md holds internal guidance for coding agents, not site content.
 */
const PRIVATE_VIEWS = ['claude']

/** Path served verbatim as `text/plain`. */
export const LICENSE_PATH = '/LICENSE'

export function resolveRoute(pathname: string): ResolvedRoute | null {
  const match = ROUTE_PATTERN.exec(pathname)
  if (!match) return null

  const page = match[1] ?? null
  const view = page === null || DEFAULT_VIEW_ALIASES.includes(page) ? DEFAULT_VIEW : page
  if (PRIVATE_VIEWS.includes(view.toLowerCase())) return null

  const format: ContentFormat =
    (page !== null && MARKDOWN_ONLY_PAGES.includes(page)) || pathname.endsWith('.md') ? 'md' : 'html'

  return { page, view, format }
}
