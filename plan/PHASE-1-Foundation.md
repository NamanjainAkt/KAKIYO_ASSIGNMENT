# Phase 1: Foundation & Auth

## Objective
Set up the Next.js 15 project, configure the Neon PostgreSQL database with Drizzle ORM, and implement user authentication using Better Auth.

## File Structure & Changes
- `package.json`: Add dependencies (drizzle-orm, better-auth, pg, tailwindcss, shadcn/ui).
- `.env.local`: Add `DATABASE_URL`, `BETTER_AUTH_SECRET`, `BETTER_AUTH_URL`.
- `db/index.ts`: Initialize Neon database connection.
- `db/schema.ts`: Define `users`, `sessions`, `accounts` tables for Better Auth.
- `lib/auth.ts`: Configure Better Auth instance.
- `app/api/auth/[...all]/route.ts`: Better Auth API route handler.
- `app/layout.tsx`: Add AuthProvider context.
- `app/(auth)/sign-in/page.tsx`: Sign-in UI.
- `app/(auth)/sign-up/page.tsx`: Sign-up UI.
- `middleware.ts`: Protect dashboard routes.

## Task Breakdown
1. **Scaffold Next.js 15 Project**: Initialize with Tailwind CSS and TypeScript.
2. **Database Setup**: Connect to Neon and push initial Drizzle schema.
3. **Authentication**: Setup Better Auth and build sign-in/sign-up pages.

## Verification
- User can register an account.
- User can log in and be redirected to a protected route.
- Database contains the new user record.
