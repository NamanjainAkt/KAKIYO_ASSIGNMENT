import { describe, it, expect, vi, type Mock } from 'vitest'
import { scrapeWithCheerio } from '@/lib/scraper/cheerio'

// Mock global fetch
global.fetch = vi.fn()

describe('Cheerio Scraper', () => {
  it('extracts body text and removes scripts', async () => {
    (fetch as Mock).mockResolvedValueOnce({
      ok: true,
      text: async () => '<html><head><script>alert("test")</script></head><body>Hello <span>World</span><nav>Skip me</nav></body></html>'
    })

    const text = await scrapeWithCheerio('http://example.com')
    expect(text).toBe('Hello World')
  })
})
