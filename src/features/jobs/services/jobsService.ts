import type { JobsQuery, JobsResponse } from "../types/job";
import { jobRepository } from "./jobRepository";

function matchesQuery(
  job: import("../types/job").Job,
  query: JobsQuery
): boolean {
  if (query.search) {
    const needle = query.search.toLowerCase();
    const haystack = [
      job.title,
      job.company,
      job.location,
      job.description,
      ...job.requirements,
    ]
      .join(" ")
      .toLowerCase();
    if (!haystack.includes(needle)) return false;
  }

  if (query.location) {
    const needle = query.location.toLowerCase();
    if (!job.location.toLowerCase().includes(needle)) return false;
  }

  if (query.category && query.category !== "all") {
    if (job.category !== query.category) return false;
  }

  if (query.employmentType && query.employmentType !== "all") {
    if (job.employmentType !== query.employmentType) return false;
  }

  if (typeof query.remote === "boolean") {
    if (job.remote !== query.remote) return false;
  }

  return true;
}

function sortJobs(
  jobs: import("../types/job").Job[],
  sort: JobsQuery["sort"]
): import("../types/job").Job[] {
  const direction = sort === "oldest" ? 1 : -1;
  return [...jobs].sort((a, b) => {
    const aTime = new Date(a.postedAt).getTime();
    const bTime = new Date(b.postedAt).getTime();
    return (aTime - bTime) * direction;
  });
}

export const jobsService = {
  async list(query: JobsQuery = {}): Promise<JobsResponse> {
    // Simulate a small amount of server latency so loading UI is meaningful.
    await new Promise((resolve) => setTimeout(resolve, 250));

    const filtered = jobRepository.list().filter((job) => matchesQuery(job, query));
    const jobs = sortJobs(filtered, query.sort ?? "newest");

    return { jobs, total: jobs.length };
  },

  async findById(id: string): Promise<import("../types/job").Job | null> {
    await new Promise((resolve) => setTimeout(resolve, 200));
    return jobRepository.findById(id) ?? null;
  },

  async create(
    job: import("../types/job").Job
  ): Promise<import("../types/job").Job> {
    await new Promise((resolve) => setTimeout(resolve, 250));
    return jobRepository.create(job);
  },
};