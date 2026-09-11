import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jobsService } from "@/features/jobs/services/jobsService";
import { jobSchema } from "@/features/job-posting/schemas/jobSchema";
import type { JobsQuery, EmploymentType, JobCategory } from "@/features/jobs/types/job";

function parseQuery(request: NextRequest): JobsQuery {
  const url = new URL(request.url);
  const params = url.searchParams;

  const category = params.get("category") as JobCategory | null;
  const employmentType = params.get("employmentType") as EmploymentType | null;
  const sort = params.get("sort");
  const remote = params.get("remote");

  return {
    search: params.get("search") ?? undefined,
    location: params.get("location") ?? undefined,
    category: category ?? "all",
    employmentType: employmentType ?? "all",
    remote: remote === "true" ? true : undefined,
    sort: sort === "oldest" ? "oldest" : "newest",
  };
}

export async function GET(request: NextRequest) {
  try {
    const query = parseQuery(request);
    const data = await jobsService.list(query);
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to load jobs" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Server-side validation using the same Zod schema as the form.
    const parsed = jobSchema.safeParse({
      ...body,
      remote: body.remote === true || body.remote === "true",
      requirements: Array.isArray(body.requirements)
        ? body.requirements.join("\n")
        : body.requirements,
    });

    if (!parsed.success) {
      return NextResponse.json(
        { message: "Validation failed", errors: parsed.error.flatten() },
        { status: 400 }
      );
    }

    const job = {
      ...parsed.data,
      id: body.id ?? `job-${Date.now()}`,
      postedAt: body.postedAt ?? new Date().toISOString(),
      requirements: Array.isArray(body.requirements)
        ? body.requirements.map((r: string) => r.trim()).filter(Boolean)
        : parsed.data.requirements.split("\n").map((line: string) => line.trim()).filter(Boolean),
    };
    const created = await jobsService.create(job);
    return NextResponse.json(created, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to create job" },
      { status: 400 }
    );
  }
}