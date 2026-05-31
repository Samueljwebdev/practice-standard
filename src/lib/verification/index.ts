import { getRegulatorForProfession, REGULATORS, type Regulator } from "./regulators"

export type VerificationStatus =
  | "verified" | "pending_review" | "failed" | "not_applicable"

export interface VerificationResult {
  status: VerificationStatus
  regulator: string | null
  registrationNumber: string | null
  verifiedName?: string | null
  registrantType?: string | null
  reason?: string
  meta?: Record<string, unknown>
}

const BROWSER_UA =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36"

function surnameOf(fullName: string): string {
  const parts = fullName.trim().split(/\s+/)
  return parts.length ? parts[parts.length - 1] : ""
}

function stripTags(s: string): string {
  return s.replace(/<[^>]*>/g, " ").replace(/&nbsp;/g, " ").replace(/\s+/g, " ").trim()
}

/**
 * Main entry point. Determines the regulator from the profession, validates the
 * PIN format, then attempts a live lookup. Any uncertainty or live-lookup
 * failure resolves to `pending_review` so a human makes the final call — we
 * never return `verified` unless an official register positively confirmed it.
 */
export async function verifyRegistration(opts: {
  profession: string
  registrationNumber: string
  fullName: string
}): Promise<VerificationResult> {
  const regulator = getRegulatorForProfession(opts.profession)

  // Profession with no statutory regulator → nothing to verify against.
  if (!regulator) {
    return { status: "not_applicable", regulator: null, registrationNumber: null, reason: "no_regulator" }
  }

  const pin = regulator.normalize(opts.registrationNumber ?? "")
  if (!pin) {
    return { status: "failed", regulator: regulator.id, registrationNumber: null, reason: "missing" }
  }
  if (!regulator.pinPattern.test(pin)) {
    return { status: "failed", regulator: regulator.id, registrationNumber: pin, reason: "bad_format" }
  }

  const surname = surnameOf(opts.fullName)

  // Live adapter where available; otherwise queue for manual review.
  if (regulator.live) {
    try {
      const live = await runLiveAdapter(regulator, pin, surname)
      if (live) return live
    } catch {
      // fall through to manual review on any network/parse failure
    }
  }

  return {
    status: "pending_review",
    regulator: regulator.id,
    registrationNumber: pin,
    reason: regulator.live ? "lookup_unavailable" : "manual_only",
  }
}

async function runLiveAdapter(regulator: Regulator, pin: string, surname: string): Promise<VerificationResult | null> {
  switch (regulator.id) {
    case "gdc":
      return verifyGDC(pin, surname)
    default:
      return null
  }
}

/**
 * Live GDC lookup. Searches the public register by surname and matches the row
 * whose registration number equals `pin`, then checks its status. Conservative:
 * only returns `verified` on a positive "Registered" match; anything else →
 * pending_review (never a false "verified").
 */
async function verifyGDC(pin: string, surname: string): Promise<VerificationResult> {
  const base = { regulator: "gdc" as const, registrationNumber: pin }
  if (!surname) {
    return { status: "pending_review", ...base, reason: "no_surname" }
  }

  const url = REGULATORS.gdc.searchUrl(pin, surname)
  const res = await fetch(url, {
    headers: { "User-Agent": BROWSER_UA, Accept: "text/html" },
    signal: AbortSignal.timeout(8000),
  })
  if (!res.ok) {
    return { status: "pending_review", ...base, reason: "lookup_unavailable" }
  }

  const html = await res.text()
  const rows = html.match(/<tr[\s\S]*?<\/tr>/gi) ?? []
  const digits = (s: string) => s.replace(/\D/g, "")

  for (const row of rows) {
    const cells = [...row.matchAll(/<t[dh][\s\S]*?>([\s\S]*?)<\/t[dh]>/gi)].map(m => stripTags(m[1]))
    if (cells.length < 4) continue
    // A results row contains the registration number in one of its cells.
    if (!cells.some(c => digits(c) === pin)) continue

    const statusCell = cells.find(c => /\b(registered|erased|suspended|removed)\b/i.test(c)) ?? ""
    const isRegistered = /\bregistered\b/i.test(statusCell)
    // Name cells are the non-number, non-status ones (Surname + Forenames).
    const nameParts = cells.filter(c => c && digits(c) !== pin && !/\b(registered|erased|suspended|removed)\b/i.test(c) && !/^(dentist|dental|specialist)/i.test(c))
    const verifiedName = nameParts.slice(0, 2).reverse().join(" ").trim() || null
    const registrantType = cells.find(c => /dentist|nurse|technician|hygienist|therapist|dcp/i.test(c)) ?? null

    if (isRegistered) {
      return { status: "verified", ...base, verifiedName, registrantType, reason: "register_match" }
    }
    // Found the number but status isn't current → needs a human to look.
    return { status: "pending_review", ...base, verifiedName, reason: "status_not_registered", meta: { statusCell } }
  }

  // Number not found among this surname's results.
  return { status: "pending_review", ...base, reason: "not_found" }
}

/** Short label for a regulator id, for UI/emails. */
export function regulatorName(id: string | null | undefined): string | null {
  if (!id) return null
  return (REGULATORS as Record<string, Regulator>)[id]?.name ?? id.toUpperCase()
}
