# AI Outreach Assistant - Product Specification

## Project Goal

Build a full-stack AI-powered outreach platform that helps users generate highly personalized outreach messages, manage prospects, continue conversations naturally, and track outreach activity.

The primary objective is not simply generating messages, but generating messages that feel genuinely relevant to the prospect and clearly reflect the user's offering and custom instructions.

The application should be production-like, visually polished, fully deployed, and optimized for assignment completion rather than enterprise-scale architecture.

---

# Success Criteria

The platform will be considered successful if:

1. Users can create and manage offerings.
2. Users can customize AI behavior through prompts.
3. Users can create prospects using flexible inputs.
4. Generated messages feel personalized rather than generic.
5. Different prompts produce noticeably different outputs.
6. Different offerings produce noticeably different outputs.
7. Reply generation feels like a continuation of the conversation.
8. Analytics accurately reflect platform activity.
9. The application is deployed and usable end-to-end.
10. The codebase remains clean, maintainable, and easy to extend.

---

# Assignment Evaluation Requirements

The implementation must satisfy all of the following:

## Message Quality

Generated outreach must:

* Sound human-written.
* Avoid generic AI language.
* Reference prospect-specific details whenever possible.
* Reflect the selected offering.
* Reflect the selected prompt instructions.
* Feel relevant to the prospect.

Message quality is the most important evaluation criterion.

---

## Prompt Customization

Prompt customization must meaningfully affect output.

Changing:

* Tone
* Length
* Style
* Opening
* Closing
* Sales approach

should produce visibly different results.

---

## Offering Customization

Offering selection must affect:

* Message direction
* Value proposition
* Benefits emphasized
* Call-to-action

Different offerings should produce different outreach messages for the same prospect.

---

## Flexible Prospect Inputs

Prospects should support any combination of:

* GitHub URLs
* Portfolio URLs
* Company Websites
* Custom URLs
* LinkedIn Screenshots
* Notes

No fixed prospect format should be required.

---

## Conversation Continuity

Reply generation must:

* Use conversation history.
* Preserve tone.
* Continue naturally.
* Avoid restarting the conversation.

Replies should feel like a human continuing an existing discussion.

---

# Recommended Technology Stack

## Frontend

* Next.js 15
* TypeScript
* Tailwind CSS
* shadcn/ui

## Backend

* Next.js API Routes
* Next.js Server Actions
* Vercel Serverless Functions

## Authentication

* Better Auth

## Database

* PostgreSQL (Neon)

## ORM

* Drizzle ORM

## Storage

* Cloudinary

Used for:

* LinkedIn screenshots
* Uploaded prospect images

Only URLs should be stored in the database.

---

## AI

### Gemini 2.5 Flash

Used for:

* Offering extraction
* Prospect summarization
* Message generation
* Reply generation

### Gemini Vision

Used for:

* Screenshot analysis
* OCR
* Profile understanding

---

## Scraping

Primary:

* Firecrawl

Fallback:

* Cheerio

---

## Deployment

Frontend and APIs:

* Vercel

Database:

* Neon

Storage:

* Cloudinary

---

# Core Features

## Authentication

Users should be able to:

* Register
* Login
* Logout

All data should be scoped to the authenticated user.

---

## Offering Management

Users should be able to:

* Create offerings
* Edit offerings
* Delete offerings
* Scrape websites
* Add manual information
* Combine scraped and manual content

Offerings should contain:

* Product description
* Audience
* Value proposition
* Benefits
* Differentiators

Users should be able to manage multiple offerings.

---

## Prompt Management

Users should be able to:

* Create prompts
* Edit prompts
* Delete prompts
* Reuse prompts

Prompt examples:

* Conversational
* Friendly
* Direct
* Short-form
* Long-form

Prompts should be injected directly into AI generation.

---

## Prospect Management

Users should be able to create prospects using:

* URLs
* Screenshots
* Notes

The system should process available data and generate a prospect understanding summary.

Prospects should be reusable across multiple offerings.

---

## Prospect Intelligence Workflow

When a prospect is saved:

1. Scrape provided URLs.
2. Analyze uploaded screenshots.
3. Extract relevant information.
4. Generate summaries.
5. Create a unified prospect context.
6. Store the final context.

Future message generation should use stored context instead of reprocessing sources.

---

## Message Generation

Input:

* Offering
* Prompt
* Prospect Context

Output:

* Personalized Outreach Message

Users should be able to:

* Copy
* Favorite
* Delete
* Regenerate

All generated messages should be stored.

---

## Reply Generation

Input:

* Original message
* Conversation history
* Prospect context
* Prospect reply

Output:

* Natural follow-up response

The system must maintain conversational continuity.

---

## Analytics

Track:

* Total messages generated
* Total prospects
* Total replies
* Most used offering

Simple cards are sufficient.

Complex analytics are unnecessary.

---

# Data Model Principles

The schema should prioritize flexibility.

Recommended entities:

* Users
* Offerings
* Prompts
* Prospects
* Prospect Sources
* Prospect Contexts
* Message Generations
* Conversations
* Conversation Messages

Prospect sources should be generic rather than hardcoded.

This allows future source types without schema changes.

---

# AI Design Principles

## Context First

Do not generate messages directly from raw URLs or screenshots.

Instead:

Raw Sources
→ Summaries
→ Unified Prospect Context
→ Message Generation

---

## Structured Context

The AI should understand:

* Who the prospect is
* What they do
* What interests them
* What pain points they may have
* Why the offering may be relevant

---

## Message Generation Strategy

Use:

Offering
+
Prompt
+
Prospect Context

to create personalized outreach.

The model should prioritize relevance over creativity.

---

## Reply Generation Strategy

Use:

Conversation History
+
Prospect Context
+
Offering
+
Reply

to continue the discussion naturally.

---

# UI Requirements

Sidebar Navigation:

* Dashboard
* Offerings
* Prompts
* Prospects
* Messages
* Analytics

Pages should feel modern and polished.

Use shadcn/ui components wherever appropriate.

---

# Performance Requirements

* Fast page loads
* Responsive UI
* Minimal waiting during generation
* Mobile-friendly layout
* Optimized serverless usage

---

# Security Requirements

* Route protection
* User data isolation
* Secure API keys
* Server-side AI requests only
* Input validation
* Error handling

---

# What Not To Build

Do not implement:

* CRM integrations
* LinkedIn APIs
* Email sending
* Redis
* Queues
* RAG
* Vector databases
* WebSockets
* Organizations
* Team workspaces

These are outside MVP scope.

---

# Deliverables

The final project should include:

1. Public GitHub Repository
2. Complete README
3. Environment Variable Documentation
4. Architecture Overview
5. Deployment Instructions
6. Live Deployment
7. Video Walkthrough

The video should demonstrate:

* Authentication
* Offering Creation
* Prompt Creation
* Prospect Creation
* Message Generation
* Reply Handling
* Analytics Dashboard

---

# Implementation Philosophy

Prioritize:

1. Message Quality
2. Personalization
3. Simplicity
4. Clean Architecture
5. Fast Delivery

Avoid over-engineering.

A smaller, polished system with strong personalization is preferable to a large system with weak message quality.
