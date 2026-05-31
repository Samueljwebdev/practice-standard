// Canonical aggregated-job ingest from the Adzuna API.
// Used by the weekly cron (/api/cron/ingest-jobs). Pulls real UK vacancies for
// our verticals, classifies each from its actual title (dental included — those
// are inbound/SEO, never cold-outreach), drops NHS + non-clinical noise, and
// full-refreshes the source='aggregated' listings.

import type { SupabaseClient } from "@supabase/supabase-js"

const SEARCHES = [
  "aesthetic nurse", "aesthetic practitioner", "aesthetic doctor",
  "veterinary surgeon", "veterinary nurse",
  "optometrist", "dispensing optician",
  "physiotherapist", "podiatrist", "osteopath",
  "private gp", "practice nurse", "theatre nurse", "dietitian",
  // Dental — listings only (inbound/SEO); we never cold-email dental practices.
  "dentist", "dental nurse", "dental hygienist", "dental therapist", "orthodontist",
]
const PAGES = 2

// NHS / public-sector signals — your board pitches "no NHS noise".
const NHS = /\bnhs\b|foundation trust|\bband\s?[1-9]\b|hscni|health board|\bhse\b/i
// Genuinely non-clinical roles to drop even at a healthcare employer.
const BLOCK = /business development|account manager|\bsales\b|merchandiser|retail|maintenance|\bhgv\b|driver|warehouse|logistics|it systems|it support|software|developer|\bengineer\b|research officer|marketing|recruit|finance|payroll|cleaner|porter|catering|\bchef\b|security|fundrais|volunteer|apprentice|work experience|student/i

// Title → profession. Order matters (dental + specific before generic).
const TESTS: [RegExp, string][] = [
  [/orthodontist/i, "orthodontist"],
  [/dental hygienist|hygiene therapist/i, "dental_hygienist"],
  [/dental therapist/i, "dental_therapist"],
  [/dental nurse/i, "dental_nurse"],
  [/dental technician|dental lab/i, "dental_technician"],
  [/dental receptionist/i, "dental_receptionist"],
  [/treatment coordinator/i, "treatment_coordinator"],
  [/associate dentist|dental associate/i, "associate_dentist"],
  [/dentist|dental (officer|surgeon|practitioner)/i, "general_dentist"],
  [/aesthetic.*(doctor|physician)|cosmetic doctor/i, "aesthetic_doctor"],
  [/injector|dermal filler|botox|aesthetic (nurse|practitioner|clinician)|nurse prescriber|aesthetician|skin (specialist|therapist)|laser (technician|practitioner)|\baesthetic\b/i, "aesthetic_nurse"],
  [/r\.?v\.?n\b|veterinary nurse|vet nurse/i, "vet_nurse"],
  [/veterinary surgeon|veterinarian|\bvet\b/i, "veterinarian"],
  [/optometrist/i, "optometrist"],
  [/dispensing optician|optical (assistant|advisor|consultant)|optician/i, "optometrist"],
  [/physiother|physio\b|sports therap|musculoskeletal|\bmsk\b/i, "physiotherapist"],
  [/podiatr|chiropod/i, "podiatrist"],
  [/osteopath/i, "osteopath"],
  [/dietit|dietic/i, "dietitian"],
  [/general practitioner|\bgp\b|private doctor|salaried gp/i, "private_gp"],
  [/theatre (nurse|practitioner)|scrub nurse|recovery nurse|\bodp\b|operating department|anaesthetic (nurse|practitioner)/i, "theatre_nurse"],
  [/practice nurse|treatment room nurse/i, "practice_nurse"],
  [/sonograph/i, "sonographer"], [/radiograph/i, "radiographer"], [/phlebotom/i, "phlebotomist"],
  [/health\s?care assistant|\bhca\b|nursing assistant|care assistant/i, "healthcare_assistant"],
  [/specialist nurse|clinical nurse|\brgn\b|\brmn\b|registered nurse|staff nurse|nurse/i, "specialist_nurse"],
  [/dental receptionist/i, "dental_receptionist"],
  [/receptionist/i, "medical_receptionist"],
  [/medical secretary|secretary/i, "medical_secretary"],
  [/practice manager|clinic manager|clinical lead|clinical director/i, "clinic_manager"],
  [/coordinator|administrator|\badmin\b/i, "clinic_coordinator"],
]

function classify(title: string, company: string): string | null {
  if (NHS.test(title) || NHS.test(company)) return null
  if (BLOCK.test(title)) return null
  for (const [re, p] of TESTS) if (re.test(title)) return p
  return null
}

const REGION_MATCH: [RegExp, string][] = [
  [/london/i, "London"], [/south[- ]east/i, "South East"], [/south[- ]west/i, "South West"],
  [/east of england|east england|eastern/i, "East of England"], [/east midlands/i, "East Midlands"],
  [/west midlands/i, "West Midlands"], [/yorkshire|humber/i, "Yorkshire"], [/north[- ]west/i, "North West"],
  [/north[- ]east/i, "North East"], [/scotland|glasgow|edinburgh|aberdeen|dundee/i, "Scotland"],
  [/wales|cardiff|swansea|newport/i, "Wales"], [/northern ireland|belfast/i, "Northern Ireland"],
]
function toRegion(area: string[] | undefined, displayName: string | undefined): string {
  const hay = [...(area || []), displayName || ""].join(" ")
  for (const [re, r] of REGION_MATCH) if (re.test(hay)) return r
  return "South East"
}
const strip = (s: string) => (s || "").replace(/<[^>]*>/g, " ").replace(/&amp;/g, "&").replace(/&nbsp;/g, " ").replace(/\s+/g, " ").trim()
const slugify = (s: string) => strip(s).toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "").slice(0, 70)

async function fetchPage(appId: string, appKey: string, what: string, page: number) {
  const u = new URL(`https://api.adzuna.com/v1/api/jobs/gb/search/${page}`)
  u.searchParams.set("app_id", appId); u.searchParams.set("app_key", appKey)
  u.searchParams.set("results_per_page", "50"); u.searchParams.set("what", what)
  u.searchParams.set("max_days_old", "45"); u.searchParams.set("content-type", "application/json")
  const r = await fetch(u, { signal: AbortSignal.timeout(15000) })
  if (!r.ok) return []
  const j = await r.json()
  return (j.results || []) as any[]
}

export async function runAggregateIngest(admin: SupabaseClient, appId: string, appKey: string) {
  const rows = new Map<string, Record<string, unknown>>()
  for (const what of SEARCHES) {
    for (let p = 1; p <= PAGES; p++) {
      const results = await fetchPage(appId, appKey, what, p)
      for (const it of results) {
        const title = strip(it.title); if (!title) continue
        const company = strip(it.company?.display_name) || "Private practice"
        const profession = classify(title, company); if (!profession) continue
        const city = strip((it.location?.display_name || "").split(",")[0]) || null
        const region = toRegion(it.location?.area, it.location?.display_name)
        const jobType = it.contract_type === "contract" ? "contract" : it.contract_time === "part_time" ? "part_time" : "permanent"
        const slug = `${slugify(title)}-${slugify(city || region)}-ad${it.id}`
        if (rows.has(slug)) continue
        rows.set(slug, {
          practice_id: null, title, profession, job_type: jobType, region, city,
          salary_min: it.salary_min ? Math.round(it.salary_min) : null,
          salary_max: it.salary_max ? Math.round(it.salary_max) : null,
          description: strip(it.description).slice(0, 600) || title,
          requirements: null, slug, status: "active", payment_status: "unpaid",
          source: "aggregated", source_url: it.redirect_url || null,
          external_org_name: company, external_org_url: null, noindex: true,
          published_at: it.created || new Date().toISOString(), expires_at: null,
        })
      }
      await new Promise(r => setTimeout(r, 200))
    }
  }
  const all = [...rows.values()]
  // Full refresh: drop the old aggregated set, insert the fresh one.
  await admin.from("jobs").delete().eq("source", "aggregated")
  let inserted = 0
  for (let i = 0; i < all.length; i += 200) {
    const batch = all.slice(i, i + 200)
    const { error } = await admin.from("jobs").insert(batch)
    if (!error) inserted += batch.length
  }
  const byProfession: Record<string, number> = {}
  all.forEach(r => { const p = r.profession as string; byProfession[p] = (byProfession[p] || 0) + 1 })
  return { inserted, byProfession }
}
