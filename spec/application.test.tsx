import { renderToStaticMarkup } from 'react-dom/server'
import { NextRequest } from 'next/server'
import { describe, expect, it, vi } from 'vitest'

const HOST = 'llms-meta-tags.test'

vi.mock('next/headers', () => ({
  headers: async () => new Headers({ host: HOST }),
}))

vi.mock('next/navigation', () => ({
  notFound: () => {
    throw new Error('NEXT_NOT_FOUND')
  },
}))

const { GET } = await import('@/app/api/raw/[[...path]]/route')
const { default: proxy } = await import('@/proxy')
const { default: ContentPage } = await import('@/app/[[...slug]]/page')

function request(path: string, userAgent = 'Mozilla/5.0'): NextRequest {
  return new NextRequest(`http://${HOST}${path}`, { headers: { 'user-agent': userAgent } })
}

function rewriteTarget(path: string, userAgent?: string): string | null {
  const rewritten = proxy(request(path, userAgent)).headers.get('x-middleware-rewrite')
  return rewritten ? new URL(rewritten).pathname : null
}

async function renderPage(slug?: string[]): Promise<string> {
  const element = await ContentPage({ params: Promise.resolve(slug ? { slug } : {}) })
  return renderToStaticMarkup(element)
}

/** Calls the raw handler the way the proxy rewrite does. */
async function raw(path: string): Promise<Response> {
  const segments = path.split('/').filter(Boolean)
  return GET(new NextRequest(`http://${HOST}/api/raw${path}`), {
    params: Promise.resolve(segments.length ? { path: segments } : {}),
  })
}

describe('content negotiation', () => {
  it('lets browsers through to the rendered page', () => {
    expect(rewriteTarget('/')).toBeNull()
    expect(rewriteTarget('/documentation')).toBeNull()
  })

  it('rewrites bot requests to the raw content handler', () => {
    expect(rewriteTarget('/', 'Googlebot/2.1')).toBe('/api/raw')
    expect(rewriteTarget('/documentation', 'curl/8.4.0')).toBe('/api/raw/documentation')
  })

  it('rewrites markdown urls even for browsers', () => {
    expect(rewriteTarget('/index.md')).toBe('/api/raw/index.md')
    expect(rewriteTarget('/llms.txt')).toBe('/api/raw/llms.txt')
  })

  it('rewrites the license to the raw content handler', () => {
    expect(rewriteTarget('/LICENSE')).toBe('/api/raw/LICENSE')
  })

  it('ignores paths it does not own', () => {
    expect(rewriteTarget('/style.css', 'curl/8.4.0')).toBeNull()
  })
})

describe('GET / with a browser user agent', () => {
  it('returns HTML built from the readme', async () => {
    const html = await renderPage()
    expect(html).toMatch(/LLMs Meta Tags Standard/)
    expect(html).toMatch(/This content is also designed for LLMs/)
    expect(html).toContain(`curl ${HOST}`)
  })
})

describe('GET / with a bot user agent', () => {
  it('returns markdown', async () => {
    const response = await raw('/')
    expect(response.status).toBe(200)
    expect(response.headers.get('content-type')).toBe('text/markdown; charset=utf-8')
    expect(await response.text()).toMatch(/# LLMs Meta Tags Standard/)
  })
})

describe('GET /index.md', () => {
  it('returns markdown without the HTML chrome', async () => {
    const response = await raw('/index.md')
    expect(response.status).toBe(200)
    expect(response.headers.get('content-type')).toBe('text/markdown; charset=utf-8')

    const body = await response.text()
    expect(body).toMatch(/LLMs Meta Tags Standard/)
    expect(body).not.toMatch(/This content is also designed for LLMs/)
  })
})

describe('GET /LICENSE', () => {
  it('returns plain text', async () => {
    const response = await raw('/LICENSE')
    expect(response.status).toBe(200)
    expect(response.headers.get('content-type')).toBe('text/plain; charset=utf-8')
    expect(await response.text()).toMatch(/MIT License/)
  })
})

describe('GET /documentation', () => {
  it('renders the documentation page', async () => {
    const html = await renderPage(['documentation'])
    expect(html).toContain(`curl ${HOST}/documentation`)
    expect(html).toMatch(/LLMs Meta Tags/)
  })
})

describe('GET /claude', () => {
  it('is not served in any format', async () => {
    expect(rewriteTarget('/claude', 'curl/8.4.0')).toBeNull()
    expect((await raw('/claude')).status).toBe(404)
    expect((await raw('/claude.md')).status).toBe(404)
    expect((await raw('/CLAUDE')).status).toBe(404)
    await expect(renderPage(['claude'])).rejects.toThrow('NEXT_NOT_FOUND')
  })
})

describe('GET /notfound', () => {
  it('returns 404 for the raw handler', async () => {
    const response = await raw('/notfound')
    expect(response.status).toBe(404)
    expect(await response.text()).toBe('Not Found')
  })

  it('triggers the not-found page for browsers', async () => {
    await expect(renderPage(['notfound'])).rejects.toThrow('NEXT_NOT_FOUND')
  })
})

describe('GET /notfound.md', () => {
  it('returns 404', async () => {
    const response = await raw('/notfound.md')
    expect(response.status).toBe(404)
    expect(await response.text()).toBe('Not Found')
  })
})
