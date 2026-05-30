export async function scrapeWithFirecrawl(url: string) {
  const apiKey = process.env.FIRECRAWL_API_KEY;
  if (!apiKey) throw new Error("FIRECRAWL_API_KEY not set");

  const response = await fetch('https://api.firecrawl.dev/v1/scrape', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`
    },
    body: JSON.stringify({
      url,
      formats: ["markdown"]
    })
  });

  if (!response.ok) {
    throw new Error(`Firecrawl API error: ${response.statusText}`);
  }

  const data = await response.json();
  return data.data.markdown;
}
