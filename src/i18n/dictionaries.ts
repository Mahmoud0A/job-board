export type Language = "en" | "ar";

export const LANGUAGES: { value: Language; label: string; shortLabel: string }[] = [
  { value: "en", label: "English", shortLabel: "EN" },
  { value: "ar", label: "العربية", shortLabel: "عربي" },
];

export const LANGUAGE_STORAGE_KEY = "job-board-lang";

const en = {
  nav: {
    browse: "Browse Jobs",
    saved: "Saved",
    post: "Post a Job",
    about: "About",
    toggle: "Toggle navigation",
    home: "Home",
    savedBadge: "{count} saved jobs",
  },
  language: {
    label: "Language",
    switchToArabic: "Switch to Arabic",
    switchToEnglish: "Switch to English",
  },
  footer: {
    tagline: "Built with Next.js · TypeScript · Feature-Based Architecture",
  },
  home: {
    badge: "Session 5 · Feature-Based Architecture",
    title: "A modern job board, built to teach architecture.",
    description:
      "Browse curated roles, filter by keyword and category, save your favorites, and post a new opportunity — all backed by a clean Next.js App Router architecture with deliberate Server and Client component boundaries.",
    browseAll: "Browse all jobs",
    postJob: "Post a job",
    openRoles: "open roles",
    companies: "companies",
    categories: "categories",
    latestRoles: "Latest roles",
    seeAll: "See all",
  },
  jobs: {
    title: "Browse jobs",
    description:
      "Discover open roles across product teams. Use the filters to narrow down by keyword, location, category, or employment type.",
  },
  browser: {
    filters: "Filters",
    active: "Active",
    errorTitle: "Something went wrong",
    loadError: "We couldn't load jobs. Please try again.",
    tryAgain: "Try again",
  },
  filters: {
    title: "Filter jobs",
    keyword: "Keyword",
    keywordPlaceholder: "Search title, company, skill…",
    location: "Location",
    locationPlaceholder: "City or country",
    category: "Category",
    allCategories: "All categories",
    employmentType: "Employment type",
    allTypes: "All types",
    sort: "Sort",
    newest: "Newest first",
    oldest: "Oldest first",
    remoteOnly: "Remote only",
    clear: "Clear filters",
  },
  results: {
    showing: "Showing {shown} of {total}",
    noMatchTitle: "No jobs match your filters",
    noMatchDescription: "Try removing a filter or broadening your search.",
    noJobsTitle: "No jobs yet",
    noJobsDescription: "Check back soon — new opportunities are posted regularly.",
    resultsLabel: "Job results",
  },
  jobCard: {
    remote: "Remote",
    posted: "Posted {relative}",
    viewDetails: "View Details",
  },
  saveJob: {
    save: "Save Job",
    saved: "Saved",
    saveLabel: "Save job",
    unsaveLabel: "Unsave job",
  },
  detail: {
    back: "Back to all jobs",
    aboutRole: "About the role",
    requirements: "Requirements",
    compensation: "Compensation",
    notSpecified: "Not specified",
    posted: "Posted {relative} ({date})",
    remoteFriendly: "Remote friendly",
    jobActions: "Job actions",
    breadcrumb: "Breadcrumb",
    notFoundTitle: "Job not found",
    notFoundDescription: "The role you're looking for may have been filled or removed.",
    backToJobs: "Back to all jobs",
  },
  create: {
    title: "Post a new job",
    description:
      "Share the role with the community. All fields marked required must be filled in. Validation runs in the browser and on the server.",
    formLabel: "Post a new job",
    jobTitle: "Job title",
    jobTitlePlaceholder: "e.g. Senior Frontend Engineer",
    company: "Company",
    companyPlaceholder: "e.g. Lumen Labs",
    location: "Location",
    locationPlaceholder: "City, country",
    salary: "Salary (optional)",
    salaryPlaceholder: "e.g. $80,000 – $110,000",
    category: "Category",
    employmentType: "Employment type",
    remote: "Open to remote candidates",
    descriptionLabel: "Description",
    descriptionPlaceholder:
      "Describe the role, the team, and what makes this opportunity exciting.",
    requirementsLabel: "Requirements",
    requirementsPlaceholder: "3+ years of React experience\nStrong TypeScript",
    requirementsHint: "Write one requirement per line.",
    cancel: "Cancel",
    publish: "Publish job",
    publishing: "Publishing…",
    submitError: "We couldn't publish the job. Please try again.",
  },
  saved: {
    title: "Saved jobs",
    description:
      "Your shortlist. Saved jobs live in your browser and stay available across sessions.",
    emptyTitle: "No saved jobs yet",
    emptyDescription: "Save a job from the listing or detail page and it will show up here.",
    browseJobs: "Browse jobs",
    loadError: "We couldn't load your saved jobs. Please try again.",
    errorTitle: "Something went wrong",
    missingTitle: "Saved jobs couldn't be found",
    missingDescription: "They may have been removed. Try saving another role.",
  },
  about: {
    title: "About this project",
    description:
      "A Session 5 hands-on project demonstrating scalable frontend architecture with Next.js.",
    stackTitle: "Stack",
    stackBody:
      "Next.js (App Router), React, TypeScript, React Hook Form, Zod, Zustand. No Redux, no heavy UI library.",
    archTitle: "Architecture",
    archBody:
      "Feature-based folders. Server Components by default; Client Components only where interactivity is required.",
    dataTitle: "Data",
    dataBody:
      "Jobs are served by Next.js Route Handlers backed by an in-memory repository, swapping in a real DB later is a one-file change.",
    formsTitle: "Forms",
    formsBody:
      "Posting a job uses React Hook Form with a Zod schema for both in-browser and server-side validation.",
  },
  errors: {
    globalTitle: "Something went wrong",
    globalDescription: "Please try again. If the issue persists, refresh the page.",
    jobsTitle: "We couldn't load jobs",
    jobsDescription: "Something went wrong on our side. Please try again in a moment.",
    tryAgain: "Try again",
  },
  categories: {
    engineering: "Engineering",
    design: "Design",
    product: "Product",
    marketing: "Marketing",
    sales: "Sales",
    operations: "Operations",
    data: "Data",
  },
  employmentTypes: {
    "full-time": "Full-time",
    "part-time": "Part-time",
    contract: "Contract",
    internship: "Internship",
  },
};

export type Dictionary = typeof en;

const ar: Dictionary = {
  nav: {
    browse: "تصفح الوظائف",
    saved: "المحفوظات",
    post: "انشر وظيفة",
    about: "عن المشروع",
    toggle: "فتح/إغلاق التنقل",
    home: "الرئيسية",
    savedBadge: "{count} وظائف محفوظة",
  },
  language: {
    label: "اللغة",
    switchToArabic: "التحويل إلى العربية",
    switchToEnglish: "التحويل إلى الإنجليزية",
  },
  footer: {
    tagline: "مبني بـ Next.js و TypeScript وبنية قائمة على المزايا",
  },
  home: {
    badge: "الجلسة 5 · بنية قائمة على المزايا",
    title: "لوحة وظائف حديثة، مبنية لتعليم البنية المعمارية.",
    description:
      "تصفح وظائف مختارة، ورشّح بالكلمة المفتاحية والتصنيف، واحفظ مفضلتك، وانشر فرصة جديدة — كل ذلك مدعوم ببنية Next.js App Router نظيفة مع فصل مدروس بين مكونات الخادم والعميل.",
    browseAll: "تصفح كل الوظائف",
    postJob: "انشر وظيفة",
    openRoles: "وظائف مفتوحة",
    companies: "شركات",
    categories: "تصنيفات",
    latestRoles: "أحدث الوظائف",
    seeAll: "عرض الكل",
  },
  jobs: {
    title: "تصفح الوظائف",
    description:
      "اكتشف الوظائف المفتوحة في فرق المنتجات. استخدم المرشحات للتضييق بالكلمة المفتاحية أو الموقع أو التصنيف أو نوع الدوام.",
  },
  browser: {
    filters: "المرشحات",
    active: "نشطة",
    errorTitle: "حدث خطأ ما",
    loadError: "تعذر تحميل الوظائف. حاول مرة أخرى.",
    tryAgain: "حاول مرة أخرى",
  },
  filters: {
    title: "رشّح الوظائف",
    keyword: "الكلمة المفتاحية",
    keywordPlaceholder: "ابحث بالمسمى أو الشركة أو المهارة…",
    location: "الموقع",
    locationPlaceholder: "المدينة أو الدولة",
    category: "التصنيف",
    allCategories: "كل التصنيفات",
    employmentType: "نوع الدوام",
    allTypes: "كل الأنواع",
    sort: "الترتيب",
    newest: "الأحدث أولًا",
    oldest: "الأقدم أولًا",
    remoteOnly: "عن بُعد فقط",
    clear: "مسح المرشحات",
  },
  results: {
    showing: "عرض {shown} من {total}",
    noMatchTitle: "لا توجد وظائف مطابقة للمرشحات",
    noMatchDescription: "جرّب إزالة مرشح أو توسيع نطاق البحث.",
    noJobsTitle: "لا توجد وظائف بعد",
    noJobsDescription: "عُد قريبًا — تُنشر فرص جديدة بانتظام.",
    resultsLabel: "نتائج الوظائف",
  },
  jobCard: {
    remote: "عن بُعد",
    posted: "نُشر {relative}",
    viewDetails: "عرض التفاصيل",
  },
  saveJob: {
    save: "حفظ الوظيفة",
    saved: "محفوظة",
    saveLabel: "حفظ الوظيفة",
    unsaveLabel: "إلغاء حفظ الوظيفة",
  },
  detail: {
    back: "رجوع إلى كل الوظائف",
    aboutRole: "عن الدور",
    requirements: "المتطلبات",
    compensation: "التعويض",
    notSpecified: "غير محدد",
    posted: "نُشر {relative} ({date})",
    remoteFriendly: "مناسب للعمل عن بُعد",
    jobActions: "إجراءات الوظيفة",
    breadcrumb: "مسار التنقل",
    notFoundTitle: "الوظيفة غير موجودة",
    notFoundDescription: "ربما تم شغل الدور الذي تبحث عنه أو إزالته.",
    backToJobs: "رجوع إلى كل الوظائف",
  },
  create: {
    title: "انشر وظيفة جديدة",
    description:
      "شارك الدور مع المجتمع. يجب ملء كل الحقول المطلوبة. يعمل التحقق في المتصفح وعلى الخادم.",
    formLabel: "انشر وظيفة جديدة",
    jobTitle: "المسمى الوظيفي",
    jobTitlePlaceholder: "مثال: مهندس واجهات أمامية أول",
    company: "الشركة",
    companyPlaceholder: "مثال: Lumen Labs",
    location: "الموقع",
    locationPlaceholder: "المدينة، الدولة",
    salary: "الراتب (اختياري)",
    salaryPlaceholder: "مثال: $80,000 – $110,000",
    category: "التصنيف",
    employmentType: "نوع الدوام",
    remote: "متاح للعمل عن بُعد",
    descriptionLabel: "الوصف",
    descriptionPlaceholder: "صِف الدور والفريق وما يميز هذه الفرصة.",
    requirementsLabel: "المتطلبات",
    requirementsPlaceholder: "3+ سنوات خبرة في React\nإتقان TypeScript",
    requirementsHint: "اكتب كل متطلب في سطر.",
    cancel: "إلغاء",
    publish: "نشر الوظيفة",
    publishing: "جارٍ النشر…",
    submitError: "تعذر نشر الوظيفة. حاول مرة أخرى.",
  },
  saved: {
    title: "الوظائف المحفوظة",
    description: "قائمتك المختصرة. الوظائف المحفوظة تبقى في متصفحك ومتاحة بين الجلسات.",
    emptyTitle: "لا توجد وظائف محفوظة بعد",
    emptyDescription: "احفظ وظيفة من القائمة أو صفحة التفاصيل وستظهر هنا.",
    browseJobs: "تصفح الوظائف",
    loadError: "تعذر تحميل وظائفك المحفوظة. حاول مرة أخرى.",
    errorTitle: "حدث خطأ ما",
    missingTitle: "تعذر العثور على الوظائف المحفوظة",
    missingDescription: "ربما تمت إزالتها. جرّب حفظ دور آخر.",
  },
  about: {
    title: "عن هذا المشروع",
    description: "مشروع عملي للجلسة 5 يوضح بنية الواجهات الأمامية القابلة للتوسع مع Next.js.",
    stackTitle: "التقنيات",
    stackBody:
      "Next.js (App Router) و React و TypeScript و React Hook Form و Zod و Zustand. بدون Redux وبدون مكتبة واجهات ثقيلة.",
    archTitle: "البنية",
    archBody:
      "مجلدات قائمة على المزايا. مكونات الخادم افتراضيًا؛ ومكونات العميل فقط حيث يلزم التفاعل.",
    dataTitle: "البيانات",
    dataBody:
      "تُقدَّم الوظائف عبر Route Handlers في Next.js مدعومة بمستودع في الذاكرة، واستبداله بقاعدة بيانات حقيقية لاحقًا يتطلب تغيير ملف واحد.",
    formsTitle: "النماذج",
    formsBody:
      "يستخدم نشر الوظيفة React Hook Form مع مخطط Zod للتحقق في المتصفح وعلى الخادم معًا.",
  },
  errors: {
    globalTitle: "حدث خطأ ما",
    globalDescription: "حاول مرة أخرى. إذا استمرت المشكلة، حدّث الصفحة.",
    jobsTitle: "تعذر تحميل الوظائف",
    jobsDescription: "حدث خطأ من جهتنا. حاول مرة أخرى بعد قليل.",
    tryAgain: "حاول مرة أخرى",
  },
  categories: {
    engineering: "هندسة",
    design: "تصميم",
    product: "منتج",
    marketing: "تسويق",
    sales: "مبيعات",
    operations: "عمليات",
    data: "بيانات",
  },
  employmentTypes: {
    "full-time": "دوام كامل",
    "part-time": "دوام جزئي",
    contract: "عقد",
    internship: "تدريب",
  },
};

export const dictionaries: Record<Language, Dictionary> = { en, ar };

/** English Zod messages produced by the job schema, mapped to Arabic. */
const validationAr: Record<string, string> = {
  "Title must be at least 3 characters": "يجب أن يكون المسمى 3 أحرف على الأقل",
  "Title is too long": "المسمى طويل جدًا",
  "Company name must be at least 2 characters": "يجب أن يكون اسم الشركة حرفين على الأقل",
  "Company name is too long": "اسم الشركة طويل جدًا",
  "Location is required": "الموقع مطلوب",
  "Location is too long": "الموقع طويل جدًا",
  "Salary description is too long": "وصف الراتب طويل جدًا",
  "Description should be at least 40 characters": "يجب أن يكون الوصف 40 حرفًا على الأقل",
  "Description is too long": "الوصف طويل جدًا",
  "List at least one requirement": "اذكر متطلبًا واحدًا على الأقل",
  "Requirements list is too long": "قائمة المتطلبات طويلة جدًا",
  Required: "مطلوب",
};

/** Translate a client-displayed validation message to the active language. */
export function translateValidationMessage(
  message: string | undefined,
  lang: Language
): string | undefined {
  if (!message || lang === "en") return message;
  return validationAr[message] ?? message;
}
