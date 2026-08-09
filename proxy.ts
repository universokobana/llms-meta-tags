import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { isBot } from '@/lib/bot'
import { LICENSE_PATH, resolveRoute } from '@/lib/routing'

/**
 * Content negotiation happens here: bots and `.md`/`.txt` URLs are rewritten to
 * the raw content handler, everyone else falls through to the rendered page.
 */
export default function proxy(request: NextRequest): NextResponse {
  const redirect = canonicalRedirect(request)
  if (redirect) return redirect

  const { pathname } = request.nextUrl

  if (pathname === LICENSE_PATH) return rewriteToRaw(request, pathname)

  const route = resolveRoute(pathname)
  if (!route) return NextResponse.next()

  if (route.format === 'md' || isBot(request.headers.get('user-agent'))) {
    return rewriteToRaw(request, pathname)
  }

  return NextResponse.next()
}

export const RAW_PREFIX = '/api/raw'

function rewriteToRaw(request: NextRequest, pathname: string): NextResponse {
  const url = request.nextUrl.clone()
  url.pathname = pathname === '/' ? RAW_PREFIX : `${RAW_PREFIX}${pathname}`
  return NextResponse.rewrite(url)
}

/**
 * Replaces `Rack::CanonicalHost` and `Rack::SslEnforcer`. HTTPS redirects are
 * opt-in (`FORCE_SSL=true`) because most hosts terminate TLS themselves, and a
 * server that never sees `https` would redirect to itself forever.
 */
function canonicalRedirect(request: NextRequest): NextResponse | null {
  const canonicalHost = process.env.CANONICAL_HOST
  const host = request.headers.get('host')
  const forwardedProto = request.headers.get('x-forwarded-proto')

  const wrongHost = Boolean(canonicalHost && host && host !== canonicalHost)
  const insecure = process.env.FORCE_SSL === 'true' && forwardedProto === 'http'
  if (!wrongHost && !insecure) return null

  const url = request.nextUrl.clone()
  if (canonicalHost && wrongHost) url.host = canonicalHost
  if (insecure) url.protocol = 'https:'

  return NextResponse.redirect(url, 301)
}

export const config = {
  matcher: ['/((?!_next/static|_next/image).*)'],
}
