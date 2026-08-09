import { describe, expect, it } from 'vitest'
import { resolveRoute } from '@/lib/routing'

describe('resolveRoute', () => {
  it('maps the root path to the readme view as HTML', () => {
    expect(resolveRoute('/')).toEqual({ page: null, view: 'readme', format: 'html' })
  })

  it('maps /index.md to the readme view as markdown', () => {
    expect(resolveRoute('/index.md')).toEqual({ page: 'index', view: 'readme', format: 'md' })
  })

  it('always serves /llms as markdown', () => {
    expect(resolveRoute('/llms')).toEqual({ page: 'llms', view: 'readme', format: 'md' })
    expect(resolveRoute('/llms.txt')).toEqual({ page: 'llms', view: 'readme', format: 'md' })
  })

  it('maps a named page to its own view', () => {
    expect(resolveRoute('/documentation')).toEqual({
      page: 'documentation',
      view: 'documentation',
      format: 'html',
    })
    expect(resolveRoute('/documentation.md')).toEqual({
      page: 'documentation',
      view: 'documentation',
      format: 'md',
    })
  })

  it('tolerates a trailing slash', () => {
    expect(resolveRoute('/documentation/')).toMatchObject({ view: 'documentation' })
  })

  it('never publishes the agent instructions', () => {
    expect(resolveRoute('/claude')).toBeNull()
    expect(resolveRoute('/claude.md')).toBeNull()
    expect(resolveRoute('/CLAUDE')).toBeNull()
    expect(resolveRoute('/Claude.md')).toBeNull()
  })

  it('rejects paths it does not own', () => {
    expect(resolveRoute('/style.css')).toBeNull()
    expect(resolveRoute('/deep/path')).toBeNull()
    expect(resolveRoute('/favicon.ico')).toBeNull()
  })
})
