"use client";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";

import {
  jobSchema,
  type JobFormValues,
} from "../schemas/jobSchema";
import {
  EMPLOYMENT_TYPES,
  JOB_CATEGORIES,
} from "@/features/jobs/types/constants";
import { Input } from "@/shared/components/Input";
import { Textarea } from "@/shared/components/Textarea";
import { Select } from "@/shared/components/Select";
import { Button } from "@/shared/components/Button";
import { Card } from "@/shared/components/Card";

function toId(title: string): string {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 60);
}

export function JobForm() {
  const router = useRouter();
  const [submitError, setSubmitError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<JobFormValues>({
    resolver: zodResolver(jobSchema),
    defaultValues: {
      title: "",
      company: "",
      location: "",
      remote: false,
      employmentType: "full-time",
      category: "engineering",
      salary: "",
      description: "",
      requirements: "",
    },
    mode: "onBlur",
  });

  const onSubmit = handleSubmit(async (values) => {
    setSubmitError(null);
    const requirements = values.requirements
      .split("\n")
      .map((line) => line.trim())
      .filter(Boolean);

    const payload = {
      id: toId(values.title) || `job-${Date.now()}`,
      title: values.title,
      company: values.company,
      location: values.location,
      remote: values.remote,
      employmentType: values.employmentType,
      category: values.category,
      salary: values.salary || undefined,
      description: values.description,
      requirements,
      postedAt: new Date().toISOString(),
    };

    try {
      const baseUrl = process.env.NEXT_PUBLIC_API_URL || '/api';
      const res = await fetch(`${baseUrl}/jobs`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error("Request failed");
      const created = (await res.json()) as { id: string };
      router.push(`/jobs/${created.id}`);
      router.refresh();
    } catch {
      setSubmitError("We couldn't publish the job. Please try again.");
    }
  });

  return (
    <Card padding="lg">
      <form
        onSubmit={onSubmit}
        noValidate
        className="stack-4"
        aria-label="Post a new job"
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: "var(--space-4)",
          }}
        >
          <Input
            label="Job title"
            placeholder="e.g. Senior Frontend Engineer"
            error={errors.title?.message}
            required
            {...register("title")}
          />
          <Input
            label="Company"
            placeholder="e.g. Lumen Labs"
            error={errors.company?.message}
            required
            {...register("company")}
          />
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: "var(--space-4)",
          }}
        >
          <Input
            label="Location"
            placeholder="City, country"
            error={errors.location?.message}
            required
            {...register("location")}
          />
          <Input
            label="Salary (optional)"
            placeholder="e.g. $80,000 – $110,000"
            error={errors.salary?.message}
            {...register("salary")}
          />
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: "var(--space-4)",
          }}
        >
          <Select
            label="Category"
            options={JOB_CATEGORIES.map((c) => ({
              value: c.value,
              label: c.label,
            }))}
            error={errors.category?.message}
            required
            {...register("category")}
          />
          <Select
            label="Employment type"
            options={EMPLOYMENT_TYPES.map((t) => ({
              value: t.value,
              label: t.label,
            }))}
            error={errors.employmentType?.message}
            required
            {...register("employmentType")}
          />
        </div>

        <label
          className="row"
          style={{
            fontSize: 14,
            color: "var(--color-text)",
            cursor: "pointer",
            userSelect: "none",
          }}
        >
          <input type="checkbox" {...register("remote")} />
          <span>Open to remote candidates</span>
        </label>

        <Textarea
          label="Description"
          placeholder="Describe the role, the team, and what makes this opportunity exciting."
          rows={6}
          error={errors.description?.message}
          required
          {...register("description")}
        />

        <Textarea
          label="Requirements"
          placeholder="One per line, e.g.&#10;3+ years of React experience&#10;Strong TypeScript"
          rows={5}
          hint="Write one requirement per line."
          error={errors.requirements?.message}
          required
          {...register("requirements")}
        />

        {submitError && (
          <p
            role="alert"
            style={{
              color: "var(--color-danger)",
              background: "var(--color-danger-soft)",
              padding: "8px 12px",
              borderRadius: "var(--radius-md)",
              fontSize: 14,
              margin: 0,
            }}
          >
            {submitError}
          </p>
        )}

        <div className="row" style={{ justifyContent: "flex-end" }}>
          <Button
            type="button"
            variant="ghost"
            onClick={() => router.push("/jobs")}
          >
            Cancel
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Publishing…" : "Publish job"}
          </Button>
        </div>
      </form>
    </Card>
  );
}