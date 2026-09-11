export type EmploymentType =
  | "full-time"
  | "part-time"
  | "contract"
  | "internship";

export type JobCategory =
  | "engineering"
  | "design"
  | "marketing"
  | "sales"
  | "product"
  | "operations"
  | "data";

export interface Job {
  id: string;
  title: string;
  company: string;
  companyLogo?: string;
  location: string;
  remote: boolean;
  employmentType: EmploymentType;
  category: JobCategory;
  salary?: string;
  description: string;
  requirements: string[];
  postedAt: string;
}

export interface JobsQuery {
  search?: string;
  location?: string;
  category?: JobCategory | "all";
  employmentType?: EmploymentType | "all";
  remote?: boolean;
  sort?: "newest" | "oldest";
}

export interface JobsResponse {
  jobs: Job[];
  total: number;
}