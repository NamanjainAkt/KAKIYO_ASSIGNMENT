# Architecture Context

## Stack

| Layer     | Technology                  | Role   |
| --------- | --------------------------- | ------ |
| Framework | Next.js 15 + TypeScript     | Full-stack framework |
| UI        | Tailwind CSS + shadcn/ui    | Styling and component library |
| Auth      | Better Auth                 | Authentication |
| Database  | PostgreSQL (Neon)           | Relational database |
| ORM       | Drizzle ORM                 | Database access |
| Storage   | Cloudinary                  | Image and file storage |
| AI Model  | Gemini 2.5 Flash / Vision   | Message generation and screenshot analysis |
| Scraping  | Firecrawl (primary) / Cheerio (fallback) | Website content extraction |

## System Boundaries

- `components/ui` — Generated shadcn/ui components.
- `app/api` — Next.js API Routes for backend logic.
- `app/actions` — Next.js Server Actions for mutations.
- `lib/ai` — Gemini API integration for generation and analysis.
- `lib/scraper` — Scraping utilities using Firecrawl/Cheerio.
- `db/` — Drizzle ORM schema and database connection setup.

## Storage Model

- **Database (PostgreSQL via Neon)**: Users, Offerings, Prompts, Prospects, Prospect Sources, Prospect Contexts, Message Generations, Conversations, Conversation Messages. Only URLs to media should be stored here.
- **File Storage (Cloudinary)**: LinkedIn screenshots and uploaded prospect images.

## Auth and Access Model

- Users register, login, and logout via Better Auth.
- All data (Offerings, Prompts, Prospects, Messages) is strictly scoped to the authenticated user.

## Invariants

1. Do not generate messages directly from raw URLs or screenshots. Always generate a Unified Prospect Context first.
2. Only store image URLs in the database, upload actual files to Cloudinary.
3. Server-side AI requests only; do not expose AI API keys to the client.
4. Use Server Actions or API routes for data mutations, scoped by user ID.
