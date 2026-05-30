# Phase 3: Prospect Intelligence

## Objective
Enable users to add prospects via URL or LinkedIn screenshot. The system will scrape or analyze the input and generate a Unified Prospect Context using Gemini.

## File Structure & Changes
- `db/schema.ts`: Add `prospects` table and `prospect_contexts` table.
- `lib/scraper/firecrawl.ts`: API integration for Firecrawl.
- `lib/scraper/cheerio.ts`: Fallback scraper logic.
- `lib/cloudinary/upload.ts`: Helper to upload screenshots.
- `lib/ai/prospect-analyzer.ts`: Gemini 2.5 Flash/Vision logic to extract and summarize prospect data.
- `app/prospects/page.tsx`: UI to add a prospect (input URL or image upload).
- `app/prospects/actions.ts`: Server action orchestrating scrape -> summarize -> save.

## Task Breakdown
1. **Storage & Scraping**: Implement Cloudinary upload and Firecrawl scraping.
2. **AI Context Generation**: Prompt Gemini to summarize raw scraped text or image OCR into a structured prospect context.
3. **Prospect Creation Flow**: Wire UI to the server action that saves the unified context.

## Verification
- Providing a GitHub URL successfully scrapes data and saves a summary to DB.
- Uploading a screenshot uploads to Cloudinary, runs OCR via Gemini Vision, and saves a summary.
