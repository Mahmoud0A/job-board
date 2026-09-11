import { z } from "zod";

export const employmentTypeEnum = z.enum([
  "full-time",
  "part-time",
  "contract",
  "internship",
]);

export const categoryEnum = z.enum([
  "engineering",
  "design",
  "marketing",
  "sales",
  "product",
  "operations",
  "data",
]);

export const jobSchema = z.object({
  title: z
    .string()
    .min(3, "Title must be at least 3 characters")
    .max(80, "Title is too long"),
  company: z
    .string()
    .min(2, "Company name must be at least 2 characters")
    .max(60, "Company name is too long"),
  location: z
    .string()
    .min(2, "Location is required")
    .max(60, "Location is too long"),
  remote: z.boolean().default(false),
  employmentType: employmentTypeEnum,
  category: categoryEnum,
  salary: z
    .string()
    .max(60, "Salary description is too long")
    .optional()
    .or(z.literal("")),
  description: z
    .string()
    .min(40, "Description should be at least 40 characters")
    .max(2000, "Description is too long"),
  requirements: z
    .string()
    .min(10, "List at least one requirement")
    .max(1500, "Requirements list is too long"),
});

export type JobFormValues = z.infer<typeof jobSchema>;
export type JobFormInput = z.input<typeof jobSchema>;