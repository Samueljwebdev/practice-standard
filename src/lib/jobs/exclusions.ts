// Versioned exclusion config for aggregated listings.
// Keeps the board "private practice only" — hard-excludes NHS / public-sector,
// universities & teaching hospitals, private hospital GROUPS, and national /
// corporate CHAINS. The promise is "independent private practice"; these break it.
//
// Runs on every scrape via aggregate.ts (isExcludedOrg). Extend the arrays as
// new chains/groups appear — keep it conservative: when in doubt, exclude.

// Org-name patterns (case-insensitive). Matched against the employer name.
const EXCLUDED_NAME = new RegExp(
  [
    // NHS / public sector (beyond the base NHS title/company test)
    "\\bnhs\\b", "foundation trust", "\\bnhs trust\\b", "health board", "\\bhscni\\b",
    "\\bccg\\b", "\\bicb\\b", "\\bpcn\\b", "integrated care", "health centre",
    "medical centre", "group practice",
    // Universities / teaching hospitals
    "university", "teaching hospital", "medical school", "veterinary school",
    // Private hospital groups
    "practice plus", "nuffield", "\\bspire\\b", "circle health", "hca healthcare",
    "ramsay", "bmi healthcare",
    // Optical chains
    "specsavers", "vision express", "boots opticians", "optical express", "scrivens",
    // Dental chains
    "mydentist", "\\{my\\}dentist", "bupa dental", "portman dental", "rodericks", "dental partners",
    // Aesthetics / skin chains
    "sk:n clinic", "skinviva", "ace & tate", "ace and tate",
    // Corporate veterinary groups
    "\\bivc\\b", "evidensia", "\\bcvs\\b", "vetpartners", "medivet", "vets4pets",
    "pets at home", "linnaeus", "goddard veterinary",
  ].join("|"),
  "i",
)

// Employer domains to hard-exclude (used where a domain is available, e.g. the
// contact-details scraper / lead enrichment — Adzuna doesn't expose org domains).
export const EXCLUDED_DOMAINS = [
  "nhs.uk", "nhs.net", "scot.nhs.uk", "wales.nhs.uk",
  "specsavers.co.uk", "visionexpress.com", "boots.com", "opticalexpress.co.uk",
  "mydentist.co.uk", "bupa.co.uk", "nuffieldhealth.com", "spirehealthcare.com",
  "practiceplusgroup.com", "ramsayhealth.co.uk", "hcahealthcare.co.uk",
  "ace-tate.com", "aceandtate.com", "medivetgroup.com", "vets4pets.com",
  "ivcevidensia.com", "cvsukltd.co.uk", "vetpartners.co.uk", "gla.ac.uk",
]

/** True if this employer name should be excluded from the board (not private/independent). */
export function isExcludedOrg(company: string): boolean {
  return EXCLUDED_NAME.test(company || "")
}

/** True if this email/website domain belongs to an excluded org. */
export function isExcludedDomain(value: string): boolean {
  const v = (value || "").toLowerCase()
  return EXCLUDED_DOMAINS.some((d) => v.includes(d))
}
