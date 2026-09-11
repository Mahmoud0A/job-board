import type { Job } from "../types/job";
import { initialJobs } from "../data/jobs";

// In-memory store. Lives for the lifetime of the dev server process.
// Acts like server data: a real DB would slot in here later.
const store: Job[] = [...initialJobs];

export const jobRepository = {
  list(): Job[] {
    return [...store];
  },
  findById(id: string): Job | undefined {
    return store.find((job) => job.id === id);
  },
  create(job: Job): Job {
    store.unshift(job);
    return job;
  },
};