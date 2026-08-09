# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is the **LLMs Meta Tags Standard** - a TypeScript/Next.js application that demonstrates and documents a proposed set of HTML meta tags for optimizing websites for Large Language Model consumption and Generative Engine Optimization (GEO). The application intelligently serves different content formats based on User-Agent detection (markdown for bots, HTML for browsers).

## Commands

### Development
```bash
# Start development server with hot reload
npm run dev

# Install dependencies
npm install

# Production build and server
npm run build
npm start
```

### Testing
```bash
# Run all tests
npm test

# Watch mode
npm run test:watch

# Run a specific test file
npx vitest run spec/application.test.tsx
```

### Linting
```bash
# Type checking
npm run typecheck

# Run linting
npm run lint

# Auto-fix linting issues
npm run lint -- --fix
```

## Architecture

The application follows a **content-negotiation pattern** where the same route serves different content based on the User-Agent:

1. **Proxy** (`proxy.ts`): runs on every request. It applies canonical host / HTTPS redirects, then rewrites the request to the raw content handler when the client is a bot (`lib/bot.ts`) or when the URL asks for markdown. Browsers fall through to the rendered page.
2. **Raw content** (`app/api/raw/[[...path]]/route.ts`): returns the markdown source with `text/markdown` (or the LICENSE with `text/plain`). The originally requested path arrives appended to `/api/raw` — a rewrite does not carry query params to the handler.
3. **HTML page** (`app/[[...slug]]/page.tsx`): a server component that renders the same markdown to HTML through the unified pipeline in `lib/markdown.ts`.

### Key Components

- **Route resolution**: `lib/routing.ts` - maps a URL to a view name and a format (`md`/`html`). Runtime-agnostic so the proxy and the page share it.
- **Bot detection**: `lib/bot.ts` - User-Agent patterns for crawlers, LLM agents and HTTP clients
- **Content loading**: `lib/content.ts` - reads `<VIEW>.md` from the repository root
- **Markdown rendering**: `lib/markdown.ts` - remark/rehype pipeline (GFM, smart quotes, heading ids, syntax highlighting, `*.md` link rewriting)
- **Layout**: `app/layout.tsx` plus `app/globals.css`
- **Tests**: `spec/` - Vitest specs for routing, bot detection, markdown rendering and the application routes

### Content Management Pattern

The markdown files at the repository root are the single source of truth, so GitHub and the site render the exact same content:

| URL | File |
| --- | --- |
| `/`, `/index.md`, `/llms`, `/llms.txt` | `README.md` |
| `/documentation`, `/documentation.md` | `DOCUMENTATION.md` |
| `/contributing`, `/contributing.md` | `CONTRIBUTING.md` |
| `/LICENSE` | `LICENSE` |

A view name from the URL is uppercased to find its file, so `/faq` would serve `FAQ.md`. Publishing a new page takes two steps: drop the file at the root and add it to `PUBLISHED_CONTENT` in `next.config.ts`, which is what traces it into serverless builds (locally it works without that second step — production is where it 404s).

`PRIVATE_VIEWS` in `lib/routing.ts` blocks paths that must never be served; `CLAUDE.md` is listed there, so `/claude` 404s in every format and the file is left out of the deployed bundle.

### Deployment

Deploys to Vercel with `vercel.json` (framework preset plus `npm ci` / `npm run build`). The markdown sources are read from disk at request time, so `outputFileTracingIncludes` in `next.config.ts` is what puts them inside the serverless bundle — if a page returns 404 in production but works locally, check that list first. Note that `outputFileTracingExcludes` does not subtract from an explicit include, which is why the include enumerates files instead of globbing.

### Environment Variables

- `DOMAIN` - domain shown in the `curl` examples on the page (defaults to the request host)
- `CANONICAL_HOST` - redirects any other host to this one
- `FORCE_SSL` - set to `true` to redirect `http` to `https` (only when a proxy sets `x-forwarded-proto`)
- `CONTENT_ROOT` - directory holding the markdown sources (defaults to the working directory)

## TypeScript/Next.js Conventions

- Next.js 16 App Router with React 19 server components
- `proxy.ts` is the Next.js 16 name for what used to be `middleware.ts`
- Strict TypeScript; `@/*` path alias resolves from the project root
- Tests use Vitest and live in `spec/`

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
