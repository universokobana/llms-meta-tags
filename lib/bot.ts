/**
 * Crawlers, LLM agents and programmatic clients get raw markdown instead of HTML.
 */
const BOT_USER_AGENT =
  /bot|crawl|spider|scrape|curl|wget|python|java|ruby|go|rust|php|node|axios|fetch|postman/i

export function isBot(userAgent: string | null | undefined): boolean {
  return BOT_USER_AGENT.test(userAgent ?? '')
}
