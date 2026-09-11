import type { Job } from "../types/job";

export const initialJobs: Job[] = [
  {
    id: "frontend-engineer-1",
    title: "Senior Frontend Engineer",
    company: "Lumen Labs",
    location: "Istanbul, Turkey",
    remote: true,
    employmentType: "full-time",
    category: "engineering",
    salary: "$80,000 – $110,000",
    description:
      "We are looking for a Senior Frontend Engineer to help us build a polished, accessible product. You will own key UI surfaces end-to-end and collaborate closely with design and product.",
    requirements: [
      "5+ years building production React applications",
      "Strong TypeScript fluency",
      "Experience with Next.js or other SSR frameworks",
      "Comfort with modern CSS / design systems",
      "Eye for accessibility and performance",
    ],
    postedAt: "2026-08-22T09:00:00Z",
  },
  {
    id: "product-designer-1",
    title: "Product Designer",
    company: "Northwind Studio",
    location: "Berlin, Germany",
    remote: false,
    employmentType: "full-time",
    category: "design",
    salary: "€70,000 – €90,000",
    description:
      "Northwind is hiring a Product Designer to shape our B2B SaaS experience. You'll lead the design process from research to handoff and partner with engineering to ship it.",
    requirements: [
      "3+ years designing complex web apps",
      "Strong portfolio of end-to-end work",
      "Fluency in Figma and prototyping",
      "Comfortable in fast-moving startup environments",
    ],
    postedAt: "2026-08-25T14:30:00Z",
  },
  {
    id: "backend-engineer-1",
    title: "Backend Engineer",
    company: "Helios Cloud",
    location: "Remote (EU)",
    remote: true,
    employmentType: "full-time",
    category: "engineering",
    salary: "€75,000 – €105,000",
    description:
      "Help us build the data backbone of Helios Cloud. You'll design APIs, own critical services, and improve reliability of a system that processes millions of events per day.",
    requirements: [
      "Strong Node.js or Go experience",
      "Comfort with relational databases",
      "Production experience with cloud providers",
      "Care for observability and reliability",
    ],
    postedAt: "2026-08-28T08:15:00Z",
  },
  {
    id: "growth-marketing-1",
    title: "Growth Marketing Lead",
    company: "Pebble",
    location: "London, UK",
    remote: false,
    employmentType: "full-time",
    category: "marketing",
    salary: "£65,000 – £85,000",
    description:
      "Own the growth engine for Pebble. You'll design experiments across the funnel, partner with product, and report on the metrics that matter.",
    requirements: [
      "4+ years in growth or performance marketing",
      "Strong analytical chops",
      "Excellent written communication",
      "Comfort owning a number",
    ],
    postedAt: "2026-08-20T11:45:00Z",
  },
  {
    id: "data-analyst-1",
    title: "Data Analyst",
    company: "Atlas Insights",
    location: "Amsterdam, Netherlands",
    remote: true,
    employmentType: "contract",
    category: "data",
    salary: "€55 – €75 / hour",
    description:
      "6-month contract supporting our analytics team. You'll build dashboards, run deep-dive analyses, and work directly with stakeholders across the company.",
    requirements: [
      "Strong SQL",
      "Experience with BI tools (Looker / Tableau / Metabase)",
      "Clear, structured communication",
    ],
    postedAt: "2026-08-29T16:00:00Z",
  },
  {
    id: "sales-rep-1",
    title: "Enterprise Sales Representative",
    company: "Pinecrest",
    location: "Dubai, UAE",
    remote: false,
    employmentType: "full-time",
    category: "sales",
    salary: "$90,000 base + commission",
    description:
      "Pinecrest is hiring an enterprise rep to lead our expansion in the MENA region. You'll own a portfolio of strategic accounts.",
    requirements: [
      "5+ years closing enterprise SaaS deals",
      "Strong network in the region",
      "Fluent English; Arabic a plus",
    ],
    postedAt: "2026-08-18T07:30:00Z",
  },
  {
    id: "product-manager-1",
    title: "Product Manager",
    company: "Brightline",
    location: "Remote (Worldwide)",
    remote: true,
    employmentType: "full-time",
    category: "product",
    salary: "$110,000 – $140,000",
    description:
      "Define and ship the next chapter of Brightline's core product. You'll work with a tight, senior team and own a meaningful surface area.",
    requirements: [
      "4+ years product management",
      "Strong written communication",
      "Comfortable with technical concepts",
      "Track record of shipping",
    ],
    postedAt: "2026-08-26T10:00:00Z",
  },
  {
    id: "design-intern-1",
    title: "Design Intern",
    company: "Northwind Studio",
    location: "Berlin, Germany",
    remote: false,
    employmentType: "internship",
    category: "design",
    description:
      "Join the Northwind design team for a 6-month internship. You'll contribute to real product work and learn alongside senior designers.",
    requirements: [
      "Currently studying design or related field",
      "Strong portfolio",
      "Curiosity and craft",
    ],
    postedAt: "2026-08-30T09:00:00Z",
  },
  {
    id: "ops-coordinator-1",
    title: "Operations Coordinator",
    company: "Maple & Co.",
    location: "Toronto, Canada",
    remote: false,
    employmentType: "part-time",
    category: "operations",
    salary: "CAD $40,000 – $50,000 (pro-rated)",
    description:
      "Support day-to-day operations at Maple & Co. You'll own scheduling, vendor coordination, and process documentation.",
    requirements: [
      "Excellent organization",
      "Comfort with modern productivity tools",
      "Clear written communication",
    ],
    postedAt: "2026-08-19T13:20:00Z",
  },
  {
    id: "fullstack-engineer-1",
    title: "Fullstack Engineer",
    company: "Lumen Labs",
    location: "Istanbul, Turkey",
    remote: true,
    employmentType: "full-time",
    category: "engineering",
    salary: "$70,000 – $95,000",
    description:
      "Work across the stack to ship polished product surfaces. You'll partner with design and product to deliver cohesive end-to-end features.",
    requirements: [
      "3+ years fullstack experience",
      "Comfort with React and a backend language",
      "Care for quality and detail",
    ],
    postedAt: "2026-08-27T15:00:00Z",
  },
  {
    id: "marketing-intern-1",
    title: "Marketing Intern",
    company: "Pebble",
    location: "London, UK",
    remote: true,
    employmentType: "internship",
    category: "marketing",
    description:
      "Support the growth team on content, social, and campaign execution. Ideal for someone early in their marketing career.",
    requirements: [
      "Strong writing skills",
      "Curiosity about growth",
      "Currently studying or recently graduated",
    ],
    postedAt: "2026-08-31T08:00:00Z",
  },
  {
    id: "data-engineer-1",
    title: "Data Engineer",
    company: "Atlas Insights",
    location: "Remote (EU)",
    remote: true,
    employmentType: "contract",
    category: "data",
    salary: "€70 – €90 / hour",
    description:
      "Build and maintain our data pipelines. You'll work closely with analytics and product to make sure the right data lands in the right place.",
    requirements: [
      "Strong SQL and Python",
      "Experience with modern data stack tools",
      "Care for data quality",
    ],
    postedAt: "2026-08-24T12:00:00Z",
  },
];

export function slugify(value: string): string {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}