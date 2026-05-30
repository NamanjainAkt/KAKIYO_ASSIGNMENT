# Code Standards

## General

- Prioritize message quality, personalization, and simplicity over complex enterprise architecture.
- Keep modules small and single-purpose.
- Prefer smaller, polished system with strong personalization over a large system with weak message quality.

## TypeScript

- Strict mode is required throughout the project.
- Avoid `any` — use explicit interfaces or narrowly scoped types.
- Validate unknown external input at system boundaries before trusting it.

## Next.js

- Default to server components.
- Add `use client` only when browser interactivity requires it.
- Keep route handlers and server actions focused on a single responsibility.
- Ensure fast page loads and minimal waiting during AI generation.

## Styling

- Use modern, polished UI with Tailwind CSS and shadcn/ui components.
- Pages should feel modern and responsive, including mobile-friendly layouts.

## API Routes & Server Actions

- Validate and parse request input before any logic runs.
- Enforce auth and user-data isolation before any mutation or read.
- Handle errors gracefully and ensure input validation.
- All AI API calls must be server-side.

## Data and Storage

- The database schema should prioritize flexibility. Prospect sources should be generic rather than hardcoded.
- Metadata and structured text belong in the database.
- Images and screenshots belong in Cloudinary. Do not store large binary content in the database.

## AI Integration

- **Context First**: Raw Sources -> Summaries -> Unified Prospect Context -> Message Generation.
- Model should prioritize relevance over creativity.
- Reply generation must use Conversation History + Prospect Context + Offering + Reply to continue discussion naturally.
