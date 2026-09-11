# Interaction Inventory — Session 5 Job Board

## Routes
- [x] / (home)
- [x] /about
- [x] /jobs
- [x] /jobs/[id] (multiple IDs)
- [x] /jobs/create
- [x] /saved-jobs
- [x] /api/jobs (GET, POST via UI)
- [x] /api/jobs/[id] (GET via UI)

## Interactive Controls (per route)

### / (Home)
- [x] Logo/Home link (ref=e4) → /
- [x] Browse Jobs link (ref=e8) → /jobs
- [x] Post a Job link (ref=e10) → /jobs/create
- [x] Saved link (ref=e9) → /saved-jobs
- [x] About link (ref=e11) → /about
- [x] "Browse all jobs" CTA (ref=e19) → /jobs
- [x] "Post a job" CTA (ref=e20) → /jobs/create

### /jobs
- [x] Keyword input (search)
- [x] Location input
- [x] Category select
- [x] Employment type select
- [x] Sort select
- [x] Remote checkbox
- [x] Clear Filters button
- [x] Job cards (multiple) — title links, Save buttons, View Details links
- [x] Job count display

### /jobs/[id]
- [x] Back to all jobs link
- [x] Job title, company, location, badges
- [x] Description
- [x] Requirements list
- [x] Save/Unsave button
- [x] Compensation info

### /saved-jobs
- [x] Saved job cards
- [x] Unsave buttons
- [x] Empty state (when no saved jobs)
- [x] Browse jobs link (empty state action)

### /jobs/create
- [x] Job title input
- [x] Company input
- [x] Location input
- [x] Salary input
- [x] Category select
- [x] Employment type select
- [x] Remote checkbox
- [x] Description textarea
- [x] Requirements textarea
- [x] Submit button (Publish job)
- [x] Cancel button
- [x] Validation errors (5 fields)

### /about
- [x] Navigation links (same as navbar)

### /jobs/does-not-exist (404)
- [x] Not-found message
- [x] Back to all jobs link

### Global
- [x] Navbar links (all 4)
- [x] Saved badge (counter updates live)
- [x] Footer links/info
