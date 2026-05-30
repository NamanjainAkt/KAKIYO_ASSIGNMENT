# Phase 2: Core CRUD (Offerings & Prompts)

## Objective
Allow users to manage multiple "Offerings" (products/services) and custom AI "Prompts".

## File Structure & Changes
- `db/schema.ts`: Add `offerings` table (description, audience, value prop) and `prompts` table (text, tone). Both linked to `userId`.
- `app/offerings/page.tsx`: List and create offerings.
- `app/offerings/actions.ts`: Server actions (create, edit, delete).
- `app/prompts/page.tsx`: List and create custom prompts.
- `app/prompts/actions.ts`: Server actions for prompts.
- `components/forms/offering-form.tsx`: Reusable form for offerings.
- `components/forms/prompt-form.tsx`: Reusable form for prompts.

## Task Breakdown
1. **Schema Update**: Define Drizzle tables and run migrations.
2. **Offerings Module**: Build UI and server actions to manage offerings.
3. **Prompts Module**: Build UI and server actions to manage custom prompts.

## Verification
- User can create a new offering and see it in the DB.
- User can edit and delete offerings.
- User can create, edit, delete custom prompts.
