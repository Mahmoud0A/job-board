# 5 Best Files to Open During Presentation

These files best demonstrate the Session 5 architectural objectives.

---

## 1. `src/features/jobs/components/JobsBrowser.tsx`

**Why:** Shows Lift State Up (filter state owned by parent), Client Component justification (`useState`, `useEffect`, `useTransition`, `fetch`), URL synchronization (`useSearchParams` + `router.replace`), and the `useRef` mechanism (`lastFetchedQueryRef`) that prevents duplicate initial fetches.

**What to point out:**
- `const [query, setQuery] = useState(...)` — parent owns state.
- `useEffect` with `lastFetchedQueryRef` — avoids refetching initial server-rendered data.
- `router.replace(newUrl, { scroll: false })` — URL sync for shareable filters.
- `startTransition` — non-blocking updates.

---

## 2. `src/features/job-posting/schemas/jobSchema.ts`

**Why:** Demonstrates the single source of truth for validation. The same `z.object()` is used by `JobForm` (client) and `POST /api/jobs` (server).

**What to point out:**
- `z.string().min(3, ...)` — inline error messages.
- `employmentTypeEnum` and `categoryEnum` — enum validation.
- `z.infer<typeof jobSchema>` — TypeScript types derived from schema.
- `safeParse()` used in the Route Handler.

---

## 3. `src/features/saved-jobs/store/savedJobsStore.ts`

**Why:** Shows a minimal, focused Zustand store. Only IDs are stored (`ids: string[]`), not full job records. Uses `persist` middleware for browser persistence.

**What to point out:**
- `ids` array — not job objects.
- `saveJob`, `unsaveJob`, `toggleJob`, `isSaved` — small, focused API.
- `persist({ name: "saved-jobs" })` — survives refresh.
- No Redux, no over-engineering.

---

## 4. `src/app/api/jobs/route.ts`

**Why:** Shows server-side data access (`jobsService.list()` for GET, `jobSchema.safeParse()` for POST) and the separation between server data and client state.

**What to point out:**
- `GET` uses `parseQuery()` + `jobsService.list(query)` — direct service access, no self-fetch.
- `POST` validates with `jobSchema.safeParse()` — same schema as client.
- `NextResponse.json()` — clean API responses.
- No database dependency — `jobRepository` is in-memory.

---

## 5. `src/app/jobs/[id]/page.tsx`

**Why:** Demonstrates dynamic routing (`[id]`), server-side data fetching (`jobsService.findById()`), `generateMetadata` for SEO, and the `notFound()` convention.

**What to point out:**
- `params.id` — dynamic segment.
- `generateMetadata` — per-job `<title>`.
- `notFound()` — clean 404 handling.
- `SaveJobButton` — client interaction embedded in a Server Component.
- `job-detail-grid` — responsive layout (2-col desktop, 1-col mobile).
