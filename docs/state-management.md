# State Management

We use **deliberate state ownership**. Each piece of state has exactly one home.

## State Map

| State | Solution | Why |
|---|---|---|
| Filter inputs (search, location, category, type, sort, remote) | **Lift State Up** in `JobsBrowser` | Multiple children (`JobFilters`, `JobResults`) need to read it. Not global. |
| Filtered job list | Server-side fetch + `useState` inside `JobsBrowser` | Server data is the source of truth; only the latest list lives in the client. |
| Saved job IDs | **Zustand** (`useSavedJobsStore`) | Read by `SaveJobButton` (on `JobCard` and detail), `SavedJobsList`, and `SavedJobsBadge`. Multiple unrelated components — genuine global client state. |
| Form state (job posting) | **React Hook Form** + **Zod** | Field-level state, validation, submission. Form-specific state. |
| Error boundary state | React (`useEffect` to log) | Local to the error UI. |
| Job data on the server | `jobRepository` (in-memory) | Source of truth for jobs; swappable with a real DB. |

## Why not put job data in Zustand?

Job records come from a server (or a Route Handler backed by a repository). They should stay there:

- Caching should be done by the framework, not by client stores.
- A client store would duplicate the source of truth and risk staleness.
- The data is needed by Server Components for SEO and faster first paint.

Saved job **IDs** are different: they are user preferences, owned by the browser. They persist via Zustand's `persist` middleware.

## Why Zustand, not Context?

`SaveJobButton` is rendered inside `JobCard`, which is rendered inside `JobResults`, which is rendered inside `JobsBrowser`. The same store is also read on the navbar (`SavedJobsBadge`) and on the saved jobs page. Threading that through React Context with a manual reducer would work, but Zustand:

- Avoids re-renders for unrelated consumers (selector-based subscriptions).
- Has a tiny API (`saveJob`, `unsaveJob`, `toggleJob`, `isSaved`).
- Has built-in `persist` so the user's saved jobs survive a refresh.

## Why Lift State Up for filters?

`JobFilters` writes filter values. `JobResults` reads them and re-renders the list. Both are siblings under `JobsBrowser`. The parent owns the state and passes it down, which is the textbook Lift State Up pattern.

We deliberately do **not** put filters in Zustand: nothing outside this page needs them, and promoting them to a global store would couple unrelated features to the jobs page UI.

## React Hook Form + Zod

- `jobSchema` lives in `features/job-posting/schemas/`.
- The form is registered to RHF, validated against Zod via `@hookform/resolvers/zod`.
- The same schema can later be reused on the API Route Handler to validate `POST /api/jobs` — same source of truth.

| Filter UI | Lift State Up + URL sync (`useSearchParams` + `router.replace`) | Related components need it; URL makes filters shareable/bookmarkable |