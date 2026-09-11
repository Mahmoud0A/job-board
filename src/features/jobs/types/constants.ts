import type { EmploymentType, JobCategory } from "./job";

export const EMPLOYMENT_TYPES: { value: EmploymentType; label: string }[] = [
  { value: "full-time", label: "Full-time" },
  { value: "part-time", label: "Part-time" },
  { value: "contract", label: "Contract" },
  { value: "internship", label: "Internship" },
];

export const JOB_CATEGORIES: { value: JobCategory; label: string }[] = [
  { value: "engineering", label: "Engineering" },
  { value: "design", label: "Design" },
  { value: "product", label: "Product" },
  { value: "marketing", label: "Marketing" },
  { value: "sales", label: "Sales" },
  { value: "operations", label: "Operations" },
  { value: "data", label: "Data" },
];

export function employmentTypeLabel(value: EmploymentType): string {
  return EMPLOYMENT_TYPES.find((t) => t.value === value)?.label ?? value;
}

export function jobCategoryLabel(value: JobCategory): string {
  return JOB_CATEGORIES.find((c) => c.value === value)?.label ?? value;
}