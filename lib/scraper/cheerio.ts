import * as cheerio from 'cheerio';

export async function scrapeWithCheerio(url: string) {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Failed to fetch ${url}`);
  }
  
  const html = await response.text();
  const $ = cheerio.load(html);
  
  // Remove script, style, and navigation tags
  $('script, style, nav, footer, header, noscript').remove();
  
  return $('body').text().replace(/\s+/g, ' ').trim();
}
