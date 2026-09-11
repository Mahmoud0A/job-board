import { NextResponse } from "next/server";
import { jobsService } from "@/features/jobs/services/jobsService";

interface Params {
  params: { id: string };
}

export async function GET(_request: Request, { params }: Params) {
  const job = await jobsService.findById(params.id);
  if (!job) {
    return NextResponse.json({ message: "Job not found" }, { status: 404 });
  }
  return NextResponse.json(job);
}