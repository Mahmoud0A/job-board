import { dictionaries } from "./dictionaries";
import type { Language } from "./dictionaries";
import type {
  EmploymentType,
  JobCategory,
} from "@/features/jobs/types/job";

/** Localized category label backed by the active dictionary. */
export function localizedCategoryLabel(
  value: JobCategory,
  lang: Language
): string {
  return dictionaries[lang].categories[value] ?? value;
}

/** Localized employment-type label backed by the active dictionary. */
export function localizedEmploymentTypeLabel(
  value: EmploymentType,
  lang: Language
): string {
  return dictionaries[lang].employmentTypes[value] ?? value;
}
