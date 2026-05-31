// UK healthcare regulator definitions: PIN formats, official register search
// URLs, and which professions each one governs.
//
// None of these regulators offer a free official API. Automated verification is
// best-effort against their public register search pages; everything else falls
// back to manual review. The PIN-format check is the reliable first gate.

export type RegulatorId =
  | "gmc" | "nmc" | "gdc" | "hcpc" | "rcvs" | "goc" | "gphc" | "gosc" | "gcc"

export interface Regulator {
  id: RegulatorId
  name: string        // short badge label, e.g. "NMC"
  fullName: string
  /** Human hint shown next to the input. */
  pinHint: string
  /** Strict-ish format check. Pin is uppercased + trimmed before testing. */
  pinPattern: RegExp
  /** Normalise a raw user-entered pin (strip spaces, known prefixes). */
  normalize: (raw: string) => string
  /** Deep link to the official register so a human can confirm in one click. */
  searchUrl: (pin: string, surname: string) => string
  /** True if we have an automated live adapter wired up. */
  live: boolean
}

const strip = (s: string) => s.replace(/\s+/g, "").toUpperCase()

export const REGULATORS: Record<RegulatorId, Regulator> = {
  gmc: {
    id: "gmc", name: "GMC", fullName: "General Medical Council",
    pinHint: "7-digit GMC reference number",
    pinPattern: /^\d{7}$/,
    normalize: (r) => strip(r).replace(/^GMC/, ""),
    searchUrl: () => `https://www.gmc-uk.org/registration-and-licensing/the-medical-register`,
    live: false,
  },
  nmc: {
    id: "nmc", name: "NMC", fullName: "Nursing and Midwifery Council",
    pinHint: "PIN like 01A2345N",
    pinPattern: /^\d{2}[A-Z]\d{4}[A-Z]$/,
    normalize: strip,
    searchUrl: () => `https://www.nmc.org.uk/registration/search-the-register/`,
    live: false,
  },
  gdc: {
    id: "gdc", name: "GDC", fullName: "General Dental Council",
    pinHint: "GDC number (5–6 digits)",
    pinPattern: /^\d{5,6}$/,
    normalize: (r) => strip(r).replace(/^DD/, ""),
    searchUrl: (_pin, surname) =>
      `https://olr.gdc-uk.org/searchregister/SearchResults?Register=All&Surname=${encodeURIComponent(surname)}&SurnameSoundsLike=False&FirstNameSoundsLike=False&IncludeErasedRegistrants=True&SortAscending=True`,
    live: true,
  },
  hcpc: {
    id: "hcpc", name: "HCPC", fullName: "Health and Care Professions Council",
    pinHint: "Number like PH123456 (2 letters + 6 digits)",
    pinPattern: /^[A-Z]{2}\d{6}$/,
    normalize: strip,
    searchUrl: () => `https://www.hcpc-uk.org/check-the-register/`,
    live: false,
  },
  rcvs: {
    id: "rcvs", name: "RCVS", fullName: "Royal College of Veterinary Surgeons",
    pinHint: "RCVS registration number",
    pinPattern: /^\d{4,8}$/,
    normalize: strip,
    searchUrl: () => `https://findavet.rcvs.org.uk/find-a-vet-surgeon/`,
    live: false,
  },
  goc: {
    id: "goc", name: "GOC", fullName: "General Optical Council",
    pinHint: "GOC number (e.g. 01-12345)",
    pinPattern: /^\d{2}-?\d{4,6}$/,
    normalize: (r) => strip(r),
    searchUrl: () => `https://www.optical.org/en/utilities/find-optician-search.cfm`,
    live: false,
  },
  gphc: {
    id: "gphc", name: "GPhC", fullName: "General Pharmaceutical Council",
    pinHint: "7-digit GPhC number",
    pinPattern: /^\d{7}$/,
    normalize: strip,
    searchUrl: () => `https://www.pharmacyregulation.org/registers`,
    live: false,
  },
  gosc: {
    id: "gosc", name: "GOsC", fullName: "General Osteopathic Council",
    pinHint: "GOsC registration number",
    pinPattern: /^\d{3,6}$/,
    normalize: strip,
    searchUrl: () => `https://www.osteopathy.org.uk/register-search/`,
    live: false,
  },
  gcc: {
    id: "gcc", name: "GCC", fullName: "General Chiropractic Council",
    pinHint: "GCC registration number",
    pinPattern: /^\d{3,6}$/,
    normalize: strip,
    searchUrl: () => `https://www.gcc-uk.org/the-register`,
    live: false,
  },
}

/**
 * Maps each profession value (see lib/constants PROFESSIONS) to its statutory
 * regulator. Professions not present here are not statutorily regulated in the
 * UK (aesthetic practitioners, HCAs, admin, management, etc.) → no auto-verify.
 */
export const PROFESSION_REGULATOR: Record<string, RegulatorId> = {
  // Dentistry → GDC
  general_dentist: "gdc", associate_dentist: "gdc", specialist_dentist: "gdc",
  orthodontist: "gdc", endodontist: "gdc", periodontist: "gdc", prosthodontist: "gdc",
  oral_surgeon: "gdc", implantologist: "gdc", sedation_dentist: "gdc", cosmetic_dentist: "gdc",
  dental_hygienist: "gdc", dental_therapist: "gdc", dental_nurse: "gdc",
  lead_dental_nurse: "gdc", dental_technician: "gdc",

  // Doctors → GMC
  aesthetic_doctor: "gmc", cosmetic_doctor: "gmc", private_gp: "gmc",
  consultant_specialist: "gmc", dermatologist: "gmc", ent_consultant: "gmc",
  fertility_specialist: "gmc", surgical_consultant: "gmc", ophthalmologist: "gmc",

  // Nurses → NMC
  aesthetic_nurse: "nmc", nurse_injector: "nmc", iv_therapy_nurse: "nmc",
  practice_nurse: "nmc", specialist_nurse: "nmc", theatre_nurse: "nmc",
  scrub_nurse: "nmc", recovery_nurse: "nmc",

  // Allied health → HCPC (+ separate councils)
  physiotherapist: "hcpc", podiatrist: "hcpc", occupational_therapist: "hcpc",
  speech_language_therapist: "hcpc", dietitian: "hcpc", radiographer: "hcpc",
  anaesthetic_practitioner: "hcpc",
  osteopath: "gosc", chiropractor: "gcc",

  // Veterinary & optometry
  veterinarian: "rcvs", vet_nurse: "rcvs", optometrist: "goc",
}

export function getRegulatorForProfession(profession: string): Regulator | null {
  const id = PROFESSION_REGULATOR[profession]
  return id ? REGULATORS[id] : null
}
