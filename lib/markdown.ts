import rehypeHighlight from 'rehype-highlight'
import rehypeRaw from 'rehype-raw'
import rehypeSlug from 'rehype-slug'
import rehypeStringify from 'rehype-stringify'
import remarkGfm from 'remark-gfm'
import remarkParse from 'remark-parse'
import remarkRehype from 'remark-rehype'
import remarkSmartypants from 'remark-smartypants'
import { unified } from 'unified'
import { visit } from 'unist-util-visit'
import type { Root } from 'hast'

const ABSOLUTE_URL = /^(?:[a-z][a-z\d+.-]*:|\/\/)/i

/**
 * `[Docs](DOCUMENTATION.md)` links point at files on GitHub; on the site they
 * must point at the equivalent route (`/documentation`).
 */
function rewriteMarkdownLinks() {
  return (tree: Root) => {
    visit(tree, 'element', (node) => {
      if (node.tagName !== 'a') return

      const href = node.properties?.href
      if (typeof href !== 'string') return
      if (!href.toLowerCase().endsWith('.md')) return
      if (ABSOLUTE_URL.test(href)) return

      node.properties.href = href.slice(0, -'.md'.length).toLowerCase()
    })
  }
}

const processor = unified()
  .use(remarkParse)
  .use(remarkGfm)
  .use(remarkSmartypants)
  .use(remarkRehype, { allowDangerousHtml: true })
  .use(rehypeRaw)
  .use(rehypeSlug)
  .use(rehypeHighlight, { detect: false, ignoreMissing: true })
  .use(rewriteMarkdownLinks)
  .use(rehypeStringify, { allowDangerousHtml: true })

export async function renderMarkdown(markdown: string): Promise<string> {
  const file = await processor.process(markdown)
  return String(file)
}
