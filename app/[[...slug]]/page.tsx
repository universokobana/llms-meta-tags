import { headers } from 'next/headers'
import { notFound } from 'next/navigation'
import { CopyButton } from '@/components/copy-button'
import { readView } from '@/lib/content'
import { renderMarkdown } from '@/lib/markdown'
import { resolveRoute } from '@/lib/routing'

interface PageProps {
  params: Promise<{ slug?: string[] }>
}

async function currentDomain(): Promise<string> {
  if (process.env.DOMAIN) return process.env.DOMAIN
  const requestHeaders = await headers()
  return requestHeaders.get('host') ?? ''
}

export default async function ContentPage({ params }: PageProps) {
  const { slug = [] } = await params
  const route = resolveRoute(`/${slug.join('/')}`)
  if (!route) notFound()

  const markdown = await readView(route.view)
  if (markdown === null) notFound()

  const html = await renderMarkdown(markdown)
  const domain = await currentDomain()
  const pageName = route.page ?? 'index'
  const curlUrl = route.page ? `${domain}/${route.page}` : domain

  return (
    <>
      <header>
        <p>
          <strong>⚠️ Note:</strong> This content is also designed for LLMs.
        </p>
        <p>🤖 For LLMs/programmatic access, you can fetch this content directly:</p>
        <code style={{ background: '#eee', padding: 10, margin: 10 }}>{`curl ${curlUrl}`}</code>
        <p>
          🌐 You see this HTML because you are in a browser. If you access it via curl/code/program,
          you get a text/markdown response as below. You can also access the markdown directly at{' '}
          <a href={`${pageName}.md`}>{`${domain}/${pageName}.md`}</a>
        </p>
        <p>
          ✨{' '}
          <a href="https://github.com/universokobana/llms-meta-tags/">
            Check out our Github for more info
          </a>
        </p>
      </header>
      <main>
        <CopyButton text={markdown} />
        <pre style={{ display: 'none' }}>{markdown}</pre>
        <div id="content" dangerouslySetInnerHTML={{ __html: html }} />
      </main>
      <footer>
        <p>
          For direct content access: <code>{`curl ${curlUrl}`}</code>
        </p>
      </footer>
    </>
  )
}
