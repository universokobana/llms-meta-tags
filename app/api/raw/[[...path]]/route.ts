import { readProjectFile, readView } from '@/lib/content'
import { LICENSE_PATH, resolveRoute } from '@/lib/routing'

interface RouteContext {
  params: Promise<{ path?: string[] }>
}

/**
 * Serves the source content verbatim. Requests reach it through a rewrite from
 * `proxy.ts` whenever the client is a bot or the URL asks for markdown, so the
 * originally requested path is appended to `/api/raw`.
 */
export async function GET(_request: Request, { params }: RouteContext): Promise<Response> {
  const { path = [] } = await params
  const pathname = `/${path.join('/')}`

  if (pathname === LICENSE_PATH) {
    return respond(await readProjectFile('LICENSE'), 'text/plain; charset=utf-8')
  }

  const route = resolveRoute(pathname)
  if (!route) return notFound()

  return respond(await readView(route.view), 'text/markdown; charset=utf-8')
}

function respond(body: string | null, contentType: string): Response {
  if (body === null) return notFound()

  return new Response(body, {
    status: 200,
    headers: { 'content-type': contentType },
  })
}

function notFound(): Response {
  return new Response('Not Found', {
    status: 404,
    headers: { 'content-type': 'text/plain; charset=utf-8' },
  })
}
