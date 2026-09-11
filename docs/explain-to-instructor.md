# Explain to Instructor

Short answers to the "why" questions you may be asked.

## Why Feature-Based Architecture?

Because technical-layer folders (`components/`, `hooks/`, `services/`) force every feature to touch many folders. Feature folders keep all the code for one capability together, which makes ownership obvious and changes safer.

## Why is JobCard inside `features/jobs/components` and not `shared/components`?

`JobCard` represents a job. Even though it is reused in the saved jobs page and the home page, all three are still part of the **jobs domain**. Promoting it to `shared/` would create an implicit dependency from `saved-jobs` and the home page to the jobs domain, which is exactly what feature-based architecture tries to avoid.

## Why dynamic routes?

`/jobs/[id]` lets one page handle many jobs. The id is in the URL, so the route is bookmarkable, shareable, and works with Next.js metadata (`generateMetadata`).

## Why Server Components here?

- `app/jobs/page.tsx` and `app/jobs/[id]/page.tsx` fetch jobs on the server. They produce SEO-friendly HTML and ship zero JS for the data layer.
- The home page reads jobs server-side too.
- Layout, navbar (except the badge), `JobCard`, and skeletons are pure presentation.

## Why Client Components here?

- `JobFilters` — controlled form inputs.
- `JobsBrowser` — owns filter state via Lift State Up and re-fetches via `/api/jobs`.
- `SaveJobButton` and `SavedJobsBadge` — subscribe to the Zustand store.
- `JobForm` — React Hook Form.
- `SavedJobsList` — fetches each saved job client-side.
- `error.tsx` — error boundaries must be Client Components in the App Router.

## Why is saved-jobs state global?

Because three unrelated surfaces need to read or write it: the save button on every job card, the badge in the navbar, and the saved jobs page itself. The cleanest way to share that state is a tiny client store (Zustand). Putting it in `useState` somewhere would force prop drilling; putting it in Redux would be over-engineering.

## Why not put API jobs into Zustand?

Jobs are **server data**. They live in the repository and are served by Route Handlers. Caching belongs to the framework (and eventually the database). Putting them in a client store would duplicate the source of truth and create stale-data bugs.

## Why React Hook Form?

It handles field state, validation messages, dirty/touched tracking, focus management, and submission state without re-rendering every field on each keystroke. It also has a first-class Zod resolver.

## Why Zod?

A single schema gives us:

- TypeScript types (`z.infer<typeof jobSchema>`).
- In-browser validation in the form.
- The same rules can later run on the API Route Handler — one source of truth for validation.

## Why `loading.tsx`?

Next.js App Router renders `loading.tsx` automatically while the segment is loading. It keeps users oriented and avoids layout flashes. We use skeleton cards, not just "Loading…".

## Why `error.tsx`?

It catches runtime errors inside a route segment and gives us a recovery UI with a retry button. It must be a Client Component because `reset` is a function passed by the framework.