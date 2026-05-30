# ── Stage 1: Install dependencies ──
FROM node:20-alpine AS deps
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci --ignore-scripts

# ── Stage 2: Build the application ──
FROM node:20-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Next.js collects telemetry — disable it during build
ENV NEXT_TELEMETRY_DISABLED=1

# Provide dummy env vars so the build doesn't crash on missing secrets
# (actual values are injected at runtime)
ENV DATABASE_URL="postgresql://fake:fake@localhost:5432/fake" \
    BETTER_AUTH_SECRET="build-placeholder" \
    BETTER_AUTH_URL="http://localhost:3000" \
    GEMINI_API_KEY="build-placeholder" \
    FIRECRAWL_API_KEY="build-placeholder" \
    CLOUDINARY_CLOUD_NAME="build-placeholder" \
    CLOUDINARY_API_KEY="build-placeholder" \
    CLOUDINARY_API_SECRET="build-placeholder"

RUN npm run build

# ── Stage 3: Production runner ──
FROM node:20-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

# Don't run as root
RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nextjs

# Copy only what's needed to run
COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

CMD ["node", "server.js"]
