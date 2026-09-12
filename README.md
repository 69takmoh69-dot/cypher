# Cypher

**Enter the Code. Create Reality.**

A premium AI Creation Studio: structured, category-specific workflows that turn one
brief into a complete content package — script, shot timeline, video prompt,
caption, hashtags, and production tips — in the strongly-typed shape every
Studio, Project, and history view shares.

## Stack

Next.js 15 (App Router) · TypeScript (strict) · Tailwind CSS · Vercel AI SDK
(`generateObject` + Zod) · Prisma + PostgreSQL · Zustand · Framer Motion.

## Getting started

```bash
npm install
cp .env.example .env        # fill in DATABASE_URL and OPENAI_API_KEY
npx prisma migrate dev --name init
npm run db:seed              # creates CYPHER-DEMO0001, 50 uses, for local testing
npm run dev
```

Open http://localhost:3000. Click **Unlock** in the header and enter
`CYPHER-DEMO0001` to flip your session into membership and unlock every
Premium Studio and Skill.

## How membership works

There are no accounts or passwords. On first request, `getOrCreateSession`
(`lib/session.ts`) issues an httpOnly session cookie and a matching `Session`
row. Redeeming a code (`lib/unlock.ts`) validates and increments the
`UnlockCode` inside a transaction — so two simultaneous redemptions of a
near-exhausted code can't both slip through — then flips that session's
`isMember` flag. The client-side Zustand store (`lib/store.ts`) only mirrors
that flag for instant UI; every route that actually gates content re-checks
the server session.

## Project structure

```
app/
  api/            unlock, generate, missions, projects — all server-only
  studio/         listing + [id] generation page
  skills/         searchable Skills Library
  missions/       guided step-by-step flows
  projects/       generation history for the current session
  tools/flow/     external production tool launcher
components/
  studio/         generation form, results view, unlock modal, locked state
  layout/         header, matrix-rain background
  ui/             small shadcn-style primitives (button, input, textarea...)
lib/
  studios.ts      the 8 Studio definitions + system prompts
  skills.ts       generated Skills Library data
  session.ts      cookie + session helpers
  unlock.ts       code validation/redemption
  store.ts        Zustand client store
prisma/
  schema.prisma   UnlockCode, Session, Project, MissionProgress
```

## Adding a new Studio

Add an entry to the `studios` array in `lib/studios.ts` matching the `Studio`
type in `types/studio.ts`. The generation form, results view, and premium-lock
gating are all fully generic — no other file needs to change for a new studio
to work end-to-end.

## Design tokens

See `DESIGN.md` for the full palette, type, and layout rationale.
