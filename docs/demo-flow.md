# 3-Minute Live Demo Flow

Use the actual running application (`npm run dev` or `npm run start`).

---

## Minute 1 — Browse, Search, Filter (60s)

1. Open `/` — explain architecture from hero (Feature-Based, Server/Client split).
2. Click "Browse all jobs" → `/jobs`.
3. Type "engineer" in Keyword → observe 5 results.
4. Select Category = Design → observe 1 result (filter combination works).
5. Click "Clear filters" → observe 12 results restored.
6. Point out URL updates (`/jobs?search=engineer`) — shareable/bookmarkable.

---

## Minute 2 — Dynamic Details, Save, Saved Jobs (60s)

7. Click a job title (e.g., "Senior Frontend Engineer") → `/jobs/frontend-engineer-1`.
8. Point out `generateMetadata` (tab title shows job + company).
9. Click "Save Job" → observe star changes to filled, button text changes to "Saved".
10. Point out navbar badge updates live (Zustand subscription).
11. Click "Saved" in navbar → `/saved-jobs` → saved job appears.
12. Click "Unsave" → observe removal; empty state appears.

---

## Minute 3 — Post Job, Validation, Not Found (60s)

13. Click "Post a Job" → `/jobs/create`.
14. Click "Publish job" with empty fields → observe 5 inline Zod errors (`Title must be at least 3 characters`, etc.).
15. Fill in valid data (title, company, location, description, requirements) → submit.
16. Observe redirect to `/jobs/[new-id]` — new job visible with requirements list.
17. Manually navigate to `/jobs/does-not-exist` → observe `not-found.tsx` with "Back to all jobs" link.
18. Briefly show folder tree (`src/features/`, `src/shared/`) and mention server-side Zod validation (`POST /api/jobs` uses `jobSchema.safeParse()`).

---

## Key Talking Points During Demo

- "Server Component here" (`/jobs` page) — no `"use client"`, direct `jobsService` access.
- "Client Component here" (`JobsBrowser`) — owns filter state, calls `/api/jobs`.
- "Same Zod schema" — `features/job-posting/schemas/jobSchema.ts` used by form and API.
- "Zustand only holds IDs" — `savedJobsStore` never caches full job records.
- "URL sync" — filters are shareable because `useSearchParams` + `router.replace()` updates the URL.
