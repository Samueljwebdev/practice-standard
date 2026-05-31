export const CLINIC_VERTICALS = [
  { value: "vet", label: "Veterinary" },
  { value: "aesthetics", label: "Aesthetics & Skin" },
  { value: "physio", label: "Physiotherapy & Allied Health" },
  { value: "optometry", label: "Optometry" },
  { value: "medical", label: "Private Medical" },
  { value: "dental", label: "Dental" },
] as const

export type ClinicVertical = (typeof CLINIC_VERTICALS)[number]["value"]

export function verticalLabel(v: string | null | undefined): string {
  return CLINIC_VERTICALS.find(x => x.value === v)?.label ?? "Healthcare"
}

/** Map a Google Maps category string to one of our verticals. */
export function categoryToVertical(category: string): string {
  const c = (category || "").toLowerCase()
  if (/dental|dentist|orthodont/.test(c)) return "dental"
  if (/vet|animal/.test(c)) return "vet"
  if (/skin|spa|aesthetic|cosmetic|laser|derma/.test(c)) return "aesthetics"
  if (/physio|physical therap|sports|osteopath|chiropract|podiatr/.test(c)) return "physio"
  if (/optic|optometr|ophthalm|eye/.test(c)) return "optometry"
  return "medical"
}
