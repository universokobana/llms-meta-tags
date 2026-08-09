import { describe, expect, it } from 'vitest'
import { isBot } from '@/lib/bot'

describe('isBot', () => {
  it.each([
    'Googlebot/2.1',
    'curl/8.4.0',
    'python-requests/2.31.0',
    'axios/1.6.0',
    'Mozilla/5.0 (compatible; ClaudeBot/1.0)',
  ])('detects %s as a bot', (userAgent) => {
    expect(isBot(userAgent)).toBe(true)
  })

  it.each([
    'Mozilla/5.0',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 Safari/537.36',
  ])('treats %s as a browser', (userAgent) => {
    expect(isBot(userAgent)).toBe(false)
  })

  it('treats a missing user agent as a browser', () => {
    expect(isBot(null)).toBe(false)
    expect(isBot(undefined)).toBe(false)
  })
})
