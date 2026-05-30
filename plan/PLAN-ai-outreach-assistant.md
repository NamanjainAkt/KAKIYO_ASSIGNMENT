# Plan: AI Outreach Assistant

## Overview
Build a full-stack AI-powered outreach platform for generating highly personalized outreach messages, managing prospects, and tracking activities. Tailored for assignment completion with high-quality AI outputs that feel human-written.

## Project Type
WEB

## Success Criteria
- Authentication works (Better Auth).
- Users can create/manage offerings and custom prompts.
- Prospects are processed via URLs/Screenshots into a Unified Prospect Context.
- Messages sound human-written, reflecting offering, prompt, and prospect details.
- Chat replies continue conversation naturally without restarting.
- Analytics track basic usage.

## Tech Stack
- **Frontend**: Next.js 15, React, Tailwind CSS, shadcn/ui
- **Backend**: Next.js API Routes / Server Actions
- **Auth**: Better Auth
- **Database**: Neon (PostgreSQL) + Drizzle ORM
- **Storage**: Cloudinary (for LinkedIn screenshots)
- **AI**: Gemini 2.5 Flash (Text) & Vision (Images)
- **Scraping**: Firecrawl (Primary) + Cheerio (Fallback)

## File Structure
```
├── app/
│   ├── (auth)/
│   ├── dashboard/
│   ├── offerings/
│   ├── prompts/
│   ├── prospects/
│   ├── messages/
│   └── api/
├── components/
│   ├── ui/
│   └── shared/
├── db/
│   ├── schema.ts
│   └── index.ts
├── lib/
│   ├── ai/
│   ├── scraper/
│   └── cloudinary/
```

## Task Breakdown

### Phase 1: Foundation & Auth
**Task 1.1: Project Setup & DB Scaffolding**
- **Agent**: devops-engineer
- **Skills**: app-builder
- **Priority**: P0
- **Dependencies**: None
- **INPUT**: Next.js 15 template
- **OUTPUT**: Configured project with Tailwind, shadcn, Neon DB, and Drizzle schema setup.
- **VERIFY**: `npm run build` passes, DB connection successful.

**Task 1.2: Better Auth Integration**
- **Agent**: security-auditor
- **Skills**: api-patterns
- **Priority**: P0
- **Dependencies**: 1.1
- **INPUT**: Better Auth docs
- **OUTPUT**: Sign up, login, logout flows. Protected routes.
- **VERIFY**: User can register, login, and access `/dashboard`.

### Phase 2: Core CRUD (Offerings & Prompts)
**Task 2.1: Offerings Management**
- **Agent**: backend-specialist & frontend-specialist
- **Skills**: database-design
- **Priority**: P1
- **Dependencies**: 1.2
- **INPUT**: Drizzle schema for Offerings
- **OUTPUT**: UI and Server Actions to CRUD offerings.
- **VERIFY**: User can create, edit, and delete offerings.

**Task 2.2: Prompts Management**
- **Agent**: backend-specialist & frontend-specialist
- **Skills**: database-design
- **Priority**: P1
- **Dependencies**: 1.2
- **INPUT**: Drizzle schema for Prompts
- **OUTPUT**: UI and Server Actions to CRUD prompts.
- **VERIFY**: User can create and reuse prompts.

### Phase 3: Prospect Intelligence
**Task 3.1: Scraper Setup (Firecrawl/Cheerio)**
- **Agent**: backend-specialist
- **Skills**: api-patterns
- **Priority**: P1
- **Dependencies**: 1.1
- **INPUT**: Firecrawl API keys
- **OUTPUT**: Scraper utility for URLs.
- **VERIFY**: Unit test extracting text from a sample URL.

**Task 3.2: Image Upload (Cloudinary)**
- **Agent**: backend-specialist
- **Skills**: api-patterns
- **Priority**: P1
- **Dependencies**: 1.1
- **INPUT**: Cloudinary keys
- **OUTPUT**: Utility to upload LinkedIn screenshots and return URL.
- **VERIFY**: Image successfully uploads and returns secure URL.

**Task 3.3: Prospect Context Generation (Gemini)**
- **Agent**: backend-specialist
- **Skills**: api-patterns
- **Priority**: P1
- **Dependencies**: 3.1, 3.2
- **INPUT**: Scraped text / uploaded image
- **OUTPUT**: Server Action that calls Gemini 2.5 Flash/Vision to generate "Unified Prospect Context" and saves to DB.
- **VERIFY**: Creating a prospect yields a structured summary in DB.

### Phase 4: Message Generation & Chat
**Task 4.1: Message Generation Engine**
- **Agent**: backend-specialist
- **Skills**: api-patterns
- **Priority**: P0
- **Dependencies**: 2.1, 2.2, 3.3
- **INPUT**: Offering + Prompt + Prospect Context
- **OUTPUT**: Gemini prompt pipeline that outputs personalized message.
- **VERIFY**: Generated message accurately reflects inputs and feels human.

**Task 4.2: Follow-up Reply Chatbot**
- **Agent**: frontend-specialist & backend-specialist
- **Skills**: frontend-design
- **Priority**: P1
- **Dependencies**: 4.1
- **INPUT**: Conversation History + Prospect Context
- **OUTPUT**: Chat UI and API to generate continuous replies.
- **VERIFY**: Reply maintains context and tone without restarting.

### Phase 5: UI Polish & Analytics
**Task 5.1: Analytics Dashboard**
- **Agent**: frontend-specialist
- **Skills**: database-design
- **Priority**: P2
- **Dependencies**: 4.1, 4.2
- **INPUT**: DB generation logs
- **OUTPUT**: Dashboard cards showing total messages, prospects, replies.
- **VERIFY**: Numbers match DB counts exactly.

**Task 5.2: UI Polish**
- **Agent**: frontend-specialist
- **Skills**: frontend-design
- **Priority**: P2
- **Dependencies**: All
- **INPUT**: shadcn components
- **OUTPUT**: Polished sidebar, responsive layout, loading states.
- **VERIFY**: App works perfectly on mobile and desktop.

## Phase X: Verification
- [ ] Run security scan (`security_scan.py`)
- [ ] Lint & Type Check (`npm run lint && npx tsc --noEmit`)
- [ ] UX Audit (`ux_audit.py`)
- [ ] Lighthouse performance (`lighthouse_audit.py`)
- [ ] Manual check: Socratic Gate respected, NO generic templates, NO purple/violet hex codes.
