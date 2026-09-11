# Architecture

## Feature-Based Architecture

This project is organized around **business capabilities**, not technical layers.

```
src/
├── app/                          # Next.js App Router routes & API
├── features/
│   ├── jobs/                     # Job browsing & details capability
│   │   ├── components/
│   │   ├── services/
│   │   ├── types/
│   │   ├── data/
│   │   └── hooks/
│   ├── saved-jobs/               # "Save for later" capability
│   │   ├── store/                # Zustand client store
│   │   └── components/
│   └── job-posting/              # Post a new job capability
│       ├── components/
│       └── schemas/
└── shared/                       # Code reused across features
    ├── components/               # Button, Input, Card, Badge, …
    ├── utils/                    # formatDate, cx
    └── hooks/
```

## Ownership Rules

The rule we use:

> If code belongs to one business feature → keep it inside that feature.
> If code is genuinely reusable across unrelated features → `shared/`.

Examples in this codebase:

- `JobCard` → `features/jobs/components` (it is reused across jobs, saved-jobs, and home, but all of those are still part of the jobs domain, so it stays in `features/jobs`).
- `SaveJobButton` → `features/saved-jobs/components` (it belongs to the saved-jobs capability, not to the jobs listing).
- `Button`, `Input`, `Card`, `Badge`, `Skeleton`, `EmptyState` → `shared/components` (truly reusable primitives).
- `formatDate`, `formatRelative`, `cx` → `shared/utils`.

`JobCard` is deliberately **not** in `shared/`. It is reused in multiple places, but it represents a job. Promoting it to `shared/` would couple every feature to the jobs domain.

## Server vs Client Components

Default to **Server Components**. Move to `"use client"` only when:

- The component uses `useState`, `useEffect`, or other client hooks.
- The component handles events that mutate UI state.
- The component uses browser APIs.
- The component integrates with a client-only library (React Hook Form, Zustand).

In this codebase:

**Server Components** (no `"use client"`):
- `app/layout.tsx`
- `app/page.tsx` (home)
- `app/about/page.tsx`
- `app/jobs/page.tsx`
- `app/jobs/[id]/page.tsx`
- `app/jobs/[id]/loading.tsx`
- `app/jobs/[id]/not-found.tsx`
- `app/api/jobs/route.ts`
- `app/api/jobs/[id]/route.ts`
- `features/jobs/components/JobCard.tsx` (composes data, no state)
- `features/jobs/components/JobListSkeleton.tsx`
- `features/jobs/services/*`

**Client Components**:
- `features/jobs/components/JobFilters.tsx` — controlled inputs, event handlers.
- `features/jobs/components/JobsBrowser.tsx` — owns filter state via Lift State Up.
- `features/jobs/components/JobResults.tsx` — receives props, but renders interactive save buttons.
- `features/saved-jobs/components/SaveJobButton.tsx` — Zustand subscription.
- `features/saved-jobs/components/SavedJobsBadge.tsx` — Zustand subscription.
- `features/saved-jobs/components/SavedJobsList.tsx` — client-side data fetch.
- `features/saved-jobs/store/savedJobsStore.ts` — Zustand store.
- `features/job-posting/components/JobForm.tsx` — React Hook Form.
- `app/jobs/error.tsx` and `app/error.tsx` — error boundaries must be Client Components.
- `shared/components/Navbar.tsx` is a Server Component (it has no state and only contains the client `SavedJobsBadge` which is itself `"use client"`).

## Data Flow

1. Server Components call `jobsService.list()` directly in the route. No HTTP round trip.
2. The first render ships already-filtered jobs to the client.
3. When filters change, `JobsBrowser` (client) calls `/api/jobs` to fetch new data.
4. `SavedJobsList` uses `/api/jobs/[id]` for each saved id.
5. The job posting form POSTs to `/api/jobs`, then navigates to the new job's detail page.

## API Surface

- `GET /api/jobs?search=&location=&category=&employmentType=&remote=&sort=` — list jobs.
- `GET /api/jobs/[id]` — single job.
- `POST /api/jobs` — create a job.

## Loading & Error UI

- `app/jobs/loading.tsx` and `app/jobs/[id]/loading.tsx` provide skeleton UIs.
- `app/jobs/error.tsx` and `app/error.tsx` are interactive error boundaries with a retry action.
- `app/jobs/[id]/not-found.tsx` handles unknown ids.

## Recent Improvements

- **URL-synchronized filters** (`JobsBrowser`): `useSearchParams` + `router.replace()` updates the URL when filters change, making searches shareable and bookmarkable.
- **Server-side validation** (`POST /api/jobs`): `jobSchema.safeParse()` validates submitted data using the same Zod schema as the client form (`features/job-posting/schemas/jobSchema.ts`).
- **Stale saved-ID handling** (`SavedJobsList`): missing job IDs (404) are skipped gracefully instead of crashing the entire saved-jobs list.
- **Responsive CSS classes** (`.jobs-browser-grid`, `.job-detail-grid`): clean media-query rules replace brittle inline-style selectors.
- **Favicon** (`src/app/favicon.ico`): eliminates 404 console error.