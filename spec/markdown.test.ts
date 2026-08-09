import { describe, expect, it } from 'vitest'
import { renderMarkdown } from '@/lib/markdown'

describe('renderMarkdown', () => {
  it('renders headings with generated ids', async () => {
    const html = await renderMarkdown('## Quick Start\n')
    expect(html).toContain('<h2 id="quick-start">Quick Start</h2>')
  })

  it('renders GitHub flavored tables', async () => {
    const html = await renderMarkdown('| Tag | Purpose |\n| --- | --- |\n| a | b |\n')
    expect(html).toContain('<table>')
    expect(html).toContain('<th>Tag</th>')
  })

  it('highlights fenced code blocks', async () => {
    const html = await renderMarkdown('```html\n<meta name="llms:website" content="x">\n```\n')
    expect(html).toContain('language-html')
    expect(html).toContain('hljs')
  })

  it('rewrites relative markdown links to site routes', async () => {
    const html = await renderMarkdown('[Docs](DOCUMENTATION.md)\n')
    expect(html).toContain('<a href="documentation">Docs</a>')
  })

  it('leaves external links untouched', async () => {
    const html = await renderMarkdown('[Repo](https://github.com/universokobana/README.md)\n')
    expect(html).toContain('href="https://github.com/universokobana/README.md"')
  })
})
