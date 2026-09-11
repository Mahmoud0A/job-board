# 15 Likely Oral Questions — Session 5 Job Board

Based strictly on this project's actual implementation.

---

## 1. Why Feature-Based Architecture?

**Answer:** Technical-layer folders (`components/`, `hooks/`, `services/`) force every feature to touch many folders. Feature folders (`features/jobs/`, `features/saved-jobs/`, `features/job-posting/`) keep all code for one capability together, making ownership obvious and changes safer.

---

## 2. Why is `JobCard` inside `features/jobs/components/` and not `shared/components/`?

**Answer:** `JobCard` represents a job. Even though it is reused in `/saved-jobs` and `/`, all three surfaces are still part of the **jobs domain**. Promoting it to `shared/` would couple unrelated features to the jobs domain, which violates feature-based ownership.

---

## 3. What belongs in `shared/`?

**Answer:** Only genuinely cross-feature primitives: `Button`, `Input`, `Textarea`, `Select`, `Card`, `Badge`, `Skeleton`, `EmptyState`, `formatDate`, `formatRelative`, `cx`. Nothing domain-specific.

---

## 4. Why is `SaveJobButton` in `features/saved-jobs/`?

**Answer:** It belongs to the saved-jobs capability. It reads and writes the Zustand store (`useSavedJobsStore`). It is not a generic button — it has domain-specific behavior (toggle save, `aria-pressed`, star icon).

---

## 5. Why App Router?

**Answer:** It provides server-side rendering by default, `loading.tsx` and `error.tsx` conventions, dynamic routes (`[id]`), and `generateMetadata` — all of which this project uses.

---

## 6. What is a Dynamic Route? Why `[id]`?

**Answer:** A dynamic route (`app/jobs/[id]/page.tsx`) handles multiple URLs with one file. The `id` segment is extracted from the URL (`params.id`). It is bookmarkable, shareable, and works with `generateMetadata` for per-job SEO titles.

---

## 7. Why Server Components by default?

**Answer:** They produce SEO-friendly HTML, ship zero JS for data layers, and allow direct service access (`jobsService.list()`) without an HTTP round trip. Client Components are only used when interactivity is required.

---

## 8. Why is `JobsBrowser` a Client Component?

**Answer:** It owns filter state (`useState`), handles events (`onChange`), and performs client-side data fetching (`fetch(/api/jobs)`). It uses `useTransition` for non-blocking updates.

---

## 9. Why is `JobCard` a Server Component?

**Answer:** It has no state, no event handlers, and no browser APIs. It receives `job` props and renders pure HTML. Making it a Client Component would add unnecessary JS to the bundle.

---

## 10. Why is saved-jobs state global (Zustand) instead of local (`useState`)?

**Answer:** Three unrelated surfaces need it: `SaveJobButton` (on every job card), `SavedJobsBadge` (navbar), and `SavedJobsList` (`/saved-jobs`). Prop drilling through `JobsBrowser` → `JobResults` → `JobCard` → `SaveJobButton` would be fragile. Zustand provides selector-based subscriptions with minimal re-renders.

---

## 11. Why not put API job records into Zustand?

**Answer:** Jobs are **server data**. They live in `jobRepository` and are served by Route Handlers. A client store would duplicate the source of truth, risk staleness, and prevent Server Components from rendering SEO-friendly HTML. Only user preferences (saved IDs) belong in the client store.

---

## 12. Why Lift State Up for filters?

**Answer:** `JobFilters` writes filter values; `JobResults` reads them and re-renders. Both are siblings under `JobsBrowser`. The parent owns the state and passes it down — the textbook Lift State Up pattern. It is not global because nothing outside `/jobs` needs it.

---

## 13. Why React Hook Form?

**Answer:** It handles field state, validation messages, dirty/touched tracking, focus management, and submission state without re-rendering every field on each keystroke. It has a first-class Zod resolver (`@hookform/resolvers/zod`).

---

## 14. Why Zod? Why validate on the server too?

**Answer:** A single `jobSchema` gives TypeScript types (`z.infer`), in-browser validation, and server-side validation. Before the audit, `POST /api/jobs` only trusted the client. After the audit, it uses `jobSchema.safeParse()` — same rules, single source of truth.

---

## 15. Why `loading.tsx` and `error.tsx`?

**Answer:** `loading.tsx` renders automatically while the segment loads, providing skeleton cards instead of a blank screen. `error.tsx` catches runtime errors and provides a retry action (`reset`). Both must be Client Components (`"use client"`) because `reset` is a framework-provided function.
