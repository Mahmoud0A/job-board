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
import { localizedCategoryLabel, localizedEmploymentTypeLabel } from "@/i18n/labels";
import { translateValidationMessage } from "@/i18n/dictionaries";
import { useLanguage } from "@/i18n/LanguageProvider";
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
  const { lang, t } = useLanguage();
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
      setSubmitError(t("create.submitError"));
    }
  });

  return (
    <Card padding="lg">
      <form
        onSubmit={onSubmit}
        noValidate
        className="stack-4"
        aria-label={t("create.formLabel")}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: "var(--space-4)",
          }}
        >
          <Input
            label={t("create.jobTitle")}
            placeholder={t("create.jobTitlePlaceholder")}
            error={translateValidationMessage(errors.title?.message, lang)}
            required
            {...register("title")}
          />
          <Input
            label={t("create.company")}
            placeholder={t("create.companyPlaceholder")}
            error={translateValidationMessage(errors.company?.message, lang)}
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
            label={t("create.location")}
            placeholder={t("create.locationPlaceholder")}
            error={translateValidationMessage(errors.location?.message, lang)}
            required
            {...register("location")}
          />
          <Input
            label={t("create.salary")}
            placeholder={t("create.salaryPlaceholder")}
            error={translateValidationMessage(errors.salary?.message, lang)}
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
            label={t("create.category")}
            options={JOB_CATEGORIES.map((c) => ({
              value: c.value,
              label: localizedCategoryLabel(c.value, lang),
            }))}
            error={translateValidationMessage(errors.category?.message, lang)}
            required
            {...register("category")}
          />
          <Select
            label={t("create.employmentType")}
            options={EMPLOYMENT_TYPES.map((emp) => ({
              value: emp.value,
              label: localizedEmploymentTypeLabel(emp.value, lang),
            }))}
            error={translateValidationMessage(errors.employmentType?.message, lang)}
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
          <span>{t("create.remote")}</span>
        </label>

        <Textarea
          label={t("create.descriptionLabel")}
          placeholder={t("create.descriptionPlaceholder")}
          rows={6}
          error={translateValidationMessage(errors.description?.message, lang)}
          required
          {...register("description")}
        />

        <Textarea
          label={t("create.requirementsLabel")}
          placeholder={t("create.requirementsPlaceholder")}
          rows={5}
          hint={t("create.requirementsHint")}
          error={translateValidationMessage(errors.requirements?.message, lang)}
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
            {t("create.cancel")}
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? t("create.publishing") : t("create.publish")}
          </Button>
        </div>
      </form>
    </Card>
  );
}
