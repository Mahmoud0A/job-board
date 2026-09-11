# Presentation Script (≈3 minutes)

## 1. Project idea (15s)

JobBoard — a small, modern job board built with Next.js. Browse, search, filter, save, and post jobs. The point of the project is not the features — it's the architecture.

## 2. Main features (15s)

- Browse jobs at `/jobs` with search, filters, and sort.
- Dynamic job details at `/jobs/[id]`.
- Saved jobs at `/saved-jobs`.
- Post a new job at `/jobs/create`.

## 3. Feature-Based Architecture (30s)

Open the file tree:

```
src/
  app/         # routes + API
  features/    # business capabilities
    jobs/
    saved-jobs/
    job-posting/
  shared/      # truly reusable code
```

The rule: feature code lives in `features/<feature>/`. Code reused across **unrelated** features lives in `shared/`. `JobCard` is reused but stays inside `features/jobs/` because every place that uses it is still part of the jobs domain.

## 4. Browse, Search, Filter (25s)

`/jobs` is a Server Component. It calls `jobsService.list()` on the server. Filters are owned by `JobsBrowser` (client) — Lift State Up. When filters change, the client calls `/api/jobs` to fetch fresh results. No client-side job store.

## 5. Dynamic route (15s)

`app/jobs/[id]/page.tsx` — one file, many ids. `generateMetadata` builds a per-job `<title>` for SEO.

## 6. Server vs Client Components (25s)

- Default = Server: layout, navbar (except the badge), job cards, home, detail.
- Client only where needed: `JobFilters`, `JobsBrowser`, `SaveJobButton`, `SavedJobsBadge`, `JobForm`, error boundaries.

## 7. Saved jobs state (20s)

Zustand store at `features/saved-jobs/store/savedJobsStore.ts`. Persisted to `localStorage`. The store only holds **ids**. Job records stay on the server.

## 8. React Hook Form + Zod (20s)

`features/job-posting/schemas/jobSchema.ts` is the single source of truth. The form uses `useForm` with `zodResolver`. Same schema can later validate the API POST.

## 9. Loading & Error (15s)

`loading.tsx` shows skeleton cards. `error.tsx` is a Client Component with a retry button. `not-found.tsx` handles unknown ids.

## 10. Final demo (30s)

Live walkthrough:

1. `/jobs` → search "engineer", filter to Engineering → 2 hits.
2. Open a job → Save it.
3. `/saved-jobs` → it appears.
4. `/jobs/create` → submit empty → see validation. Fill in real values → redirect to the new job.
5. Show the folder structure briefly.

## 30-Second Instructor Explanation

> "JobBoard is a Next.js App Router project organized by feature. Server Components fetch jobs directly from a service; Client Components handle filters, the save toggle, and the posting form. Saved jobs are IDs in a Zustand store — job records stay on the server. Forms use React Hook Form with a single Zod schema. `loading.tsx` and `error.tsx` cover the rest of the state model."