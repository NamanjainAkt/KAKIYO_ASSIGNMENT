# AI Outreach Assistant

## Overview

Build a full-stack AI-powered outreach platform that helps users generate highly personalized outreach messages, manage prospects, continue conversations naturally, and track outreach activity. The primary objective is generating messages that feel genuinely relevant to the prospect and clearly reflect the user's offering and custom instructions.

## Goals

1. Users can create and manage offerings.
2. Users can customize AI behavior through prompts.
3. Users can create prospects using flexible inputs.
4. Generated messages feel personalized rather than generic.
5. Different prompts and offerings produce noticeably different outputs.
6. Reply generation feels like a continuation of the conversation.

## Core User Flow

1. User registers/logs in.
2. User creates an offering (product description, audience, value prop, etc.).
3. User creates a prompt (tone, length, style).
4. User creates a prospect by providing URLs, screenshots, or notes.
5. System scrapes and analyzes prospect inputs to generate a unified prospect context.
6. User generates an outreach message using an offering, prompt, and prospect context.
7. User generates follow-up replies based on conversation history.

## Features

### Offering Management
- Create, edit, delete offerings.
- Scrape websites, add manual information, combine content.
- Offerings contain product description, audience, value prop, benefits, differentiators.

### Prompt Management
- Create, edit, delete, reuse prompts.
- Prompts injected into AI generation to control tone, style, length, etc.

### Prospect Management & Intelligence
- Create prospects via URLs, screenshots, notes.
- Scrape URLs and analyze screenshots to extract info.
- Generate prospect understanding summaries to build a unified context.

### Message & Reply Generation
- Generate personalized outreach using Offering + Prompt + Prospect Context.
- Generate natural replies using Conversation History + Prospect Context + Offering + Reply.
- Copy, favorite, delete, regenerate messages.

### Analytics
- Track total messages, prospects, replies, and most used offering.

## Scope

### In Scope
- Full-stack web application with Authentication.
- Offering, Prompt, and Prospect Management.
- AI-driven content extraction and summarization.
- Message generation and reply continuity.
- Basic Analytics tracking.
- Web scraping and screenshot OCR.

### Out of Scope
- CRM integrations
- LinkedIn APIs
- Email sending
- Redis
- Queues
- RAG
- Vector databases
- WebSockets
- Organizations
- Team workspaces

## Success Criteria

1. Platform is production-like, visually polished, fully deployed.
2. Codebase remains clean, maintainable, and easy to extend.
3. Personalization and message quality sound human-written, avoiding generic AI language.
