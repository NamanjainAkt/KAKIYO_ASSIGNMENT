# Kakiyo AI — Intelligent Sales Outreach Platform

Kakiyo is an AI-powered sales development platform that generates hyper-personalized cold outreach messages. It crawls prospect websites, extracts actionable intelligence using Gemini 2.5 Flash, and combines that context with your product offerings and custom prompt instructions to produce outreach that reads like it was written by a human who actually researched the prospect.

---

## ✨ Key Features

### 🎯 Prospect Intelligence
- **URL Scraping**: Paste any website (company site, portfolio, GitHub) — Firecrawl extracts the full content, with Cheerio as a fallback
- **Screenshot Analysis**: Upload LinkedIn screenshots or profile images — Gemini Vision extracts structured data via OCR
- **Unified Context**: All prospect data is processed into a structured JSON context (company name, industry, pain points, decision makers, value hypothesis) and stored for reuse

### 📦 Offering Management
- Define multiple products/services with descriptions, target audiences, and value propositions
- Each offering shapes how outreach messages are framed — different offerings produce noticeably different outputs

### ✍️ Prompt Customization
- Create reusable prompt templates with custom instructions and tone settings
- Prompts are injected directly into AI generation with **highest priority** — they override default behavior
- Changing tone from "Casual" to "Direct" to "Enterprise" produces visibly different message styles

### 💬 Message Generation & Conversation
- Select a prospect + offering + optional prompt → generate a personalized cold outreach message
- **Copy** any generated message with one click
- **Regenerate** the initial outreach if the first draft doesn't land
- **Reply simulation**: Type a prospect's potential response, and the AI continues the conversation naturally using full chat history
- Replies maintain tone, context, and persona — they never restart the conversation

### 📊 Dashboard Analytics
- Track total prospects, offerings, prompts, and messages generated
- Quick-access cards to each section of the platform

---

## 🏗 Architecture

```
┌──────────────────────────────────────────────────┐
│                   Next.js 15 App                 │
│                                                  │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐       │
│  │ Offerings│  │ Prompts  │  │Prospects │       │
│  │  CRUD    │  │  CRUD    │  │  + Intel │       │
│  └────┬─────┘  └────┬─────┘  └────┬─────┘       │
│       │              │             │              │
│       └──────────────┼─────────────┘              │
│                      ▼                            │
│            ┌─────────────────┐                    │
│            │ Message Engine  │                    │
│            │  (Gemini 2.5)   │                    │
│            └────────┬────────┘                    │
│                     │                             │
│            ┌────────▼────────┐                    │
│            │  Conversations  │                    │
│            │  + Chat History │                    │
│            └─────────────────┘                    │
└──────────────────────────────────────────────────┘
         │              │              │
    ┌────▼────┐   ┌─────▼─────┐  ┌────▼────┐
    │ Neon DB │   │ Cloudinary│  │Firecrawl│
    │(Postgres)│   │ (Images)  │  │(Scraper)│
    └─────────┘   └───────────┘  └─────────┘
```

### Tech Stack
| Layer | Technology |
|-------|-----------|
| Framework | Next.js 15 (App Router, Server Actions) |
| Language | TypeScript |
| Styling | Tailwind CSS v4 |
| Auth | Better Auth (email/password) |
| Database | PostgreSQL via Neon (serverless) |
| ORM | Drizzle ORM |
| AI | Google Gemini 2.5 Flash |
| Scraping | Firecrawl (primary) + Cheerio (fallback) |
| Storage | Cloudinary (prospect screenshots) |
| Animations | Framer Motion |
| Deployment | Vercel |

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm or pnpm

### 1. Clone the repo
```bash
git clone https://github.com/YOUR_USERNAME/kakiyo.git
cd kakiyo
```

### 2. Install dependencies
```bash
npm install
```

### 3. Set up environment variables
Create a `.env.local` file in the project root:

```env
# Database (Neon)
DATABASE_URL=postgresql://user:password@host.neon.tech/dbname?sslmode=require

# Better Auth
BETTER_AUTH_SECRET=your-secret-key-here
BETTER_AUTH_URL=http://localhost:3000

# Google Gemini AI
GEMINI_API_KEY=your-gemini-api-key

# Firecrawl (Web Scraping)
FIRECRAWL_API_KEY=your-firecrawl-api-key

# Cloudinary (Image Storage)
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret
```

### 4. Push the database schema
```bash
npm run db:push
```

### 5. Start the dev server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

### 🐳 Docker (Run in 30 seconds)

If you have Docker installed, skip all of the above:

```bash
git clone https://github.com/YOUR_USERNAME/kakiyo.git
cd kakiyo

# Add your env vars
cp .env.example .env.local   # then edit .env.local with your keys

# Build & run
docker compose up --build
```

That's it. Open [http://localhost:3000](http://localhost:3000).

> The Docker image uses a multi-stage build with Next.js standalone output — final image is ~150MB.

---

## 📁 Project Structure

```
kakiyo/
├── app/
│   ├── (auth)/              # Sign-in / Sign-up pages
│   ├── api/auth/            # Better Auth API handler
│   ├── messages/            # Message generation page + actions
│   ├── offerings/           # Offering CRUD page + actions
│   ├── prompts/             # Prompt CRUD page + actions
│   ├── prospects/           # Prospect intelligence page + actions
│   ├── layout.tsx           # Root layout with auth + navbar
│   ├── page.tsx             # Dashboard (landing for guests, stats for users)
│   └── globals.css          # Design tokens + Tailwind config
├── components/
│   ├── chat/                # ChatInterface (reply simulation)
│   ├── forms/               # OfferingForm, PromptForm, AddProspectForm
│   └── ui/                  # Navbar, DashboardGrid, UserMenu
├── db/
│   ├── index.ts             # Neon + Drizzle connection
│   └── schema.ts            # Full database schema
├── lib/
│   ├── ai/                  # Message + Reply generators (Gemini)
│   ├── cloudinary/          # Image upload utility
│   ├── scraper/             # Firecrawl + Cheerio scrapers
│   ├── auth.ts              # Better Auth server config
│   └── auth-client.ts       # Better Auth client config
├── middleware.ts             # Route protection
└── PRD.md                   # Full product requirements document
```

---

## 🧠 AI Design Philosophy

### Why messages feel human, not robotic

1. **Structured context, not raw data**: Prospect websites are scraped → analyzed by Gemini → stored as structured JSON (company, pain points, value hypothesis). Messages are generated from this curated context, not raw HTML.

2. **Anti-AI-slop guardrails**: The system prompt explicitly bans generic phrases ("I hope this finds you well", "leverage", "game-changer") and enforces natural language patterns (contractions, first-person voice, brevity).

3. **Custom prompts have highest priority**: When a user creates a prompt with specific instructions (e.g., "open with a compliment about their tech stack, keep it under 3 sentences"), those instructions override all defaults. This means changing prompts produces visibly different outputs.

4. **Offering-aware framing**: Different offerings produce different messages. The AI doesn't just describe what you sell — it connects your value proposition to the prospect's specific pain points.

5. **Conversation continuity**: Reply generation uses Gemini's multi-turn chat with the full conversation history. The system instruction explicitly prevents re-introductions, value prop repetition, and generic AI acknowledgments.

---

## 🗄 Database Schema

| Table | Purpose |
|-------|---------|
| `user` | Auth users (Better Auth managed) |
| `session` | Active sessions |
| `account` | OAuth accounts |
| `verification` | Email verification tokens |
| `offerings` | Products/services being pitched |
| `prompts` | Custom AI instructions + tone |
| `prospects` | Target companies/people |
| `prospect_contexts` | Structured intelligence (JSON) |
| `conversations` | Links prospect + offering + prompt |
| `messages` | Chat messages (model + user roles) |

---

## 🔐 Security

- All routes (except `/`, `/sign-in`, `/sign-up`, `/api/auth`) are protected via middleware cookie check
- All server actions verify session ownership before any database operation
- Delete operations verify the record belongs to the authenticated user
- AI API calls happen server-side only — no API keys exposed to the client
- Cloudinary uploads are processed server-side

---

## 📦 Deployment

### Vercel (Recommended)
1. Push to GitHub
2. Import in Vercel
3. Add all environment variables in Vercel dashboard
4. Deploy — Neon DB connection works automatically with Vercel

### Environment Variables Required
| Variable | Service | Required |
|----------|---------|----------|
| `DATABASE_URL` | Neon | ✅ |
| `BETTER_AUTH_SECRET` | Better Auth | ✅ |
| `BETTER_AUTH_URL` | Better Auth | ✅ |
| `GEMINI_API_KEY` | Google AI | ✅ |
| `FIRECRAWL_API_KEY` | Firecrawl | ✅ |
| `CLOUDINARY_CLOUD_NAME` | Cloudinary | ✅ |
| `CLOUDINARY_API_KEY` | Cloudinary | ✅ |
| `CLOUDINARY_API_SECRET` | Cloudinary | ✅ |

---

## 📹 Video Walkthrough

> [Link to video walkthrough will be added here]

The walkthrough covers:
1. Sign up / Sign in flow
2. Creating an offering (with description, audience, value prop)
3. Creating a custom prompt (with tone and instructions)
4. Adding a prospect via URL scraping
5. Adding a prospect via screenshot upload
6. Generating a personalized outreach message
7. Copying and regenerating messages
8. Simulating a prospect reply and seeing conversation continuity
9. Dashboard analytics overview

---

## License

MIT
