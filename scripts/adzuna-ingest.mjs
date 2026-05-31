// Aggregated job ingest from the Adzuna API.
// Run: ADZUNA_APP_ID=.. ADZUNA_APP_KEY=.. node scripts/adzuna-ingest.mjs
// (with NEXT_PUBLIC_SUPABASE_URL + SUPABASE_SERVICE_ROLE_KEY in env too)
//
// Pulls real UK vacancies for our verticals (NOT dental), maps them to the
// jobs schema, and upserts them as source='aggregated', status='active',
// noindex=true, linking back to the source to apply.

import { createClient } from "@supabase/supabase-js"

const { NEXT_PUBLIC_SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, ADZUNA_APP_ID, ADZUNA_APP_KEY } = process.env
if (!ADZUNA_APP_ID || !ADZUNA_APP_KEY) { console.error("Missing ADZUNA_APP_ID / ADZUNA_APP_KEY"); process.exit(1) }
const admin = createClient(NEXT_PUBLIC_SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, { auth: { persistSession: false } })

// keyword -> our profession value (lib/constants). Dental deliberately excluded.
const SEARCHES = [
  ["aesthetic nurse", "aesthetic_nurse"],
  ["aesthetic practitioner", "aesthetic_nurse"],
  ["aesthetic doctor", "aesthetic_doctor"],
  ["veterinary surgeon", "veterinarian"],
  ["veterinary nurse", "vet_nurse"],
  ["optometrist", "optometrist"],
  ["dispensing optician", "optometrist"],
  ["physiotherapist", "physiotherapist"],
  ["podiatrist", "podiatrist"],
  ["osteopath", "osteopath"],
  ["private gp", "private_gp"],
  ["practice nurse", "practice_nurse"],
  ["theatre nurse", "theatre_nurse"],
  ["dietitian", "dietitian"],
]
const PAGES = 2 // 50 results/page

const UK_REGIONS = ["London","South East","South West","East of England","East Midlands","West Midlands","Yorkshire","North West","North East","Scotland","Wales","Northern Ireland"]
const REGION_MATCH = [
  [/london/i,"London"],[/south[- ]east/i,"South East"],[/south[- ]west/i,"South West"],
  [/east of england|east england|eastern/i,"East of England"],[/east midlands/i,"East Midlands"],
  [/west midlands/i,"West Midlands"],[/yorkshire|humber/i,"Yorkshire"],[/north[- ]west/i,"North West"],
  [/north[- ]east/i,"North East"],[/scotland|glasgow|edinburgh|aberdeen|dundee/i,"Scotland"],
  [/wales|cardiff|swansea|newport/i,"Wales"],[/northern ireland|belfast/i,"Northern Ireland"],
]
function toRegion(area, displayName){
  const hay = [...(area||[]), displayName||""].join(" ")
  for (const [re, r] of REGION_MATCH) if (re.test(hay)) return r
  return "South East"
}
const strip = s => (s||"").replace(/<[^>]*>/g," ").replace(/&amp;/g,"&").replace(/&nbsp;/g," ").replace(/\s+/g," ").trim()
const slugify = s => strip(s).toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,"").slice(0,70)

// Classify a job from its actual title (Adzuna keyword matching is loose, so we
// can't trust the search term). Returns a profession value or null (drop dental
// + non-clinical noise). Keep in sync with scripts/clean-aggregated.mjs.
const DENTAL=/dentist|dental|orthodont|endodont|periodont|hygienist/i
const BLOCK=/business development|account manager|\bsales\b|merchandiser|retail|maintenance|\bhgv\b|driver|warehouse|logistics|it systems|it support|software|developer|\bengineer\b|research officer|marketing|recruit|finance|payroll|cleaner|porter|catering|\bchef\b|security|fundrais|volunteer|apprentice|work experience|student/i
const TESTS=[
 [/aesthetic.*(doctor|physician)|cosmetic doctor/i,"aesthetic_doctor"],
 [/injector|dermal filler|botox|aesthetic (nurse|practitioner|clinician)|nurse prescriber|aesthetician|skin (specialist|therapist)|laser (technician|practitioner)|\baesthetic\b/i,"aesthetic_nurse"],
 [/r\.?v\.?n\b|veterinary nurse|vet nurse/i,"vet_nurse"],
 [/veterinary surgeon|veterinarian|\bvet\b/i,"veterinarian"],
 [/optometrist/i,"optometrist"],
 [/dispensing optician|optical (assistant|advisor|consultant)|optician/i,"optometrist"],
 [/physiother|physio\b|sports therap|musculoskeletal|\bmsk\b/i,"physiotherapist"],
 [/podiatr|chiropod/i,"podiatrist"],[/osteopath/i,"osteopath"],[/dietit|dietic/i,"dietitian"],
 [/general practitioner|\bgp\b|private doctor|salaried gp/i,"private_gp"],
 [/theatre (nurse|practitioner)|scrub nurse|recovery nurse|\bodp\b|operating department|anaesthetic (nurse|practitioner)/i,"theatre_nurse"],
 [/practice nurse|treatment room nurse/i,"practice_nurse"],
 [/sonograph/i,"sonographer"],[/radiograph/i,"radiographer"],[/phlebotom/i,"phlebotomist"],
 [/health\s?care assistant|\bhca\b|nursing assistant|care assistant/i,"healthcare_assistant"],
 [/specialist nurse|clinical nurse|\brgn\b|\brmn\b|registered nurse|staff nurse|nurse/i,"specialist_nurse"],
 [/receptionist/i,"medical_receptionist"],[/medical secretary|secretary/i,"medical_secretary"],
 [/practice manager|clinic manager|clinical lead|clinical director/i,"clinic_manager"],
 [/coordinator|administrator|\badmin\b/i,"clinic_coordinator"],
]
function classify(t){ if(DENTAL.test(t))return null; if(BLOCK.test(t))return null; for(const [re,p] of TESTS)if(re.test(t))return p; return null }

async function fetchPage(what, page){
  const u = new URL(`https://api.adzuna.com/v1/api/jobs/gb/search/${page}`)
  u.searchParams.set("app_id", ADZUNA_APP_ID)
  u.searchParams.set("app_key", ADZUNA_APP_KEY)
  u.searchParams.set("results_per_page","50")
  u.searchParams.set("what", what)
  u.searchParams.set("max_days_old","45")
  u.searchParams.set("content-type","application/json")
  const r = await fetch(u, { signal: AbortSignal.timeout(15000) })
  if (!r.ok) { console.warn(`  Adzuna ${r.status} for "${what}" p${page}`); return [] }
  const j = await r.json()
  return j.results || []
}

const rows = new Map() // slug -> row
let raw = 0
for (const [what] of SEARCHES){
  for (let p=1; p<=PAGES; p++){
    const results = await fetchPage(what, p)
    raw += results.length
    for (const it of results){
      const title = strip(it.title)
      if (!title) continue
      const profession = classify(title)
      if (!profession) continue // drop dental + non-clinical noise
      const company = strip(it.company?.display_name) || "Private practice"
      const city = strip((it.location?.display_name||"").split(",")[0]) || null
      const region = toRegion(it.location?.area, it.location?.display_name)
      const jobType = it.contract_type==="contract" ? "contract" : it.contract_time==="part_time" ? "part_time" : "permanent"
      const slug = `${slugify(title)}-${slugify(city||region)}-ad${it.id}`
      if (rows.has(slug)) continue
      rows.set(slug, {
        practice_id: null,
        title, profession, job_type: jobType, region, city,
        salary_min: it.salary_min ? Math.round(it.salary_min) : null,
        salary_max: it.salary_max ? Math.round(it.salary_max) : null,
        description: strip(it.description).slice(0,600) || title,
        requirements: null,
        slug,
        status: "active",
        payment_status: "unpaid",
        source: "aggregated",
        source_url: it.redirect_url || null,
        external_org_name: company,
        external_org_url: null,
        noindex: true,
        published_at: it.created || new Date().toISOString(),
        expires_at: null,
      })
    }
    await new Promise(r=>setTimeout(r,350))
  }
  console.log(`"${what}" -> running total unique: ${rows.size}`)
}

const all = [...rows.values()]
console.log(`\nRaw results: ${raw} | unique mapped: ${all.length}`)
// upsert in batches of 200
let inserted = 0
for (let i=0;i<all.length;i+=200){
  const batch = all.slice(i,i+200)
  const { error, count } = await admin.from("jobs").upsert(batch, { onConflict: "slug", ignoreDuplicates: true, count: "exact" })
  if (error) { console.error("upsert error:", error.message); break }
  inserted += (count ?? batch.length)
}
console.log(`Done. Aggregated jobs in DB after ingest: ${inserted} affected.`)
const byProf = {}; all.forEach(r=>byProf[r.profession]=(byProf[r.profession]||0)+1)
console.log("By profession:", JSON.stringify(byProf))
