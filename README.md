# Job Board

A modern job board built with Next.js (App Router), TypeScript, and a feature-based architecture. Browse curated roles, filter by keyword and category, save favorites locally, and post new opportunities through a validated form backed by Route Handler APIs.

## Features

- Arabic/English localization with persistent language switcher and bidirectional support
- Full RTL (Right-to-Left) layout and typography support in Arabic mode
- Storybook 8 component documentation with interactive locale switcher decorator
- Home page with featured/latest roles and aggregate stats
- Jobs listing with URL-synchronized filters (keyword, location, category, employment type, remote-only, sort)
- Job detail pages with metadata, requirements, and compensation card
- Post-a-job form with client-side (React Hook Form + Zod) and server-side (Zod) validation
- Save/unsave jobs persisted in the browser via Zustand + `localStorage`
- Saved-jobs page with shortlist management
- REST-style JSON APIs: `GET /api/jobs`, `POST /api/jobs`, `GET /api/jobs/[id]`
- Custom `not-found` and error UIs for the jobs routes, plus loading skeletons
- Responsive layout with a mobile filter toggle and collapsible navigation
- Unit/component tests with Vitest + Testing Library
- Playwright helper scripts for manual QA and screenshots (`e2e.mjs`, `screenshot.mjs`)

> Scope notes: jobs are stored in an in-memory repository — created jobs disappear when the server restarts. No authentication is required for this portfolio demonstration.

## Tech Stack

- Next.js 14 (App Router) + React 18
- TypeScript
- Storybook 8 (Component documentation & isolation)
- React Hook Form + Zod (+ `@hookform/resolvers`)
- Lightweight Custom Localization Context (`src/i18n`) with `localStorage` persistence and RTL styling
- Zustand (persisted client store)
- Vitest + Testing Library + jsdom (tests)
- Playwright (manual QA/screenshot scripts)
- Plain CSS with custom properties & logical properties (no heavy UI framework)

## Routes

| Route | Description |
| --- | --- |
| `/` | Landing page with latest roles |
| `/jobs` | Browse + filter jobs (filters sync to URL) |
| `/jobs/[id]` | Job detail; custom `not-found` UI for unknown ids |
| `/jobs/create` | Post a new job (validated form) |
| `/saved-jobs` | Jobs saved in this browser |
| `/about` | Project/stack overview |
| `/api/jobs` | `GET` list (supports `search`, `location`, `category`, `employmentType`, `remote`, `sort`), `POST` create |
| `/api/jobs/[id]` | `GET` single job (404 JSON when missing) |

## Getting Started

Requirements: Node.js 18+ (tested with Node 24) and npm.

```bash
npm install
cp .env.example .env.local   # optional; defaults already work
npm run dev
```

Open http://localhost:3000.

Environment:

- `NEXT_PUBLIC_API_URL` — base URL for client-side API calls (default `/api`).

## Scripts

```bash
npm run dev              # start dev server
npm run build            # production build
npm run start            # run the production build
npm run lint             # Next.js ESLint
npm run type-check       # tsc --noEmit
npm test                 # vitest run (14 tests)
npm run storybook        # start Storybook dev server (port 6006)
npm run build-storybook  # build static Storybook documentation
```

Manual QA helpers (need the app running on http://localhost:3000):

```bash
node e2e.mjs          # walk key flows, writes qa-*.png to the project root
node screenshot.mjs   # capture routes × viewports into screenshots/
```

Both outputs are git-ignored.

## Project Structure

```text
src/
  app/                    # App Router routes, layouts, APIs, loading/error UIs
    api/jobs/             # GET list, POST create, GET by id
    jobs/                 # listing, detail, create pages
    saved-jobs/           # shortlist page
    about/                # overview page
  features/
    jobs/                 # browsing capability (components, service, repository, types, data)
    saved-jobs/           # save/unsave capability (components + Zustand store)
    job-posting/          # create capability (form + Zod schema)
  shared/
    components/           # Button, Input, Select, Textarea, Card, Badge, Navbar, ...
    utils/                # formatDate, cx
docs/                     # architecture and QA notes from development
e2e.mjs                   # Playwright QA walkthrough
screenshot.mjs            # Playwright screenshot matrix
```

Data layer: `features/jobs/services/jobRepository.ts` is the only file that touches storage (currently an in-memory array seeded from `features/jobs/data/jobs.ts`), so swapping in a real database is a one-file change.

## Screenshots

No screenshots are committed to the repo. To generate them locally:

```bash
npm run dev              # in one terminal
node screenshot.mjs      # in another; outputs to screenshots/ (git-ignored)
```
