// Seed the public clinic directory from the scraped Google Maps dataset,
// enriched with the careers/hiring scan. Run:
//   node scripts/ingest-clinics.mjs
// (needs NEXT_PUBLIC_SUPABASE_URL + SUPABASE_SERVICE_ROLE_KEY in env)

import fs from "fs"
import { createClient } from "@supabase/supabase-js"

const PLACES = "C:/Users/samue/Downloads/dataset_crawler-google-places_2026-05-24_09-03-44-346.json"
const SCAN = "C:/Users/samue/clinic_scan.json"
const admin = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY, { auth: { persistSession: false } })

const places = JSON.parse(fs.readFileSync(PLACES, "utf8"))
const scan = fs.existsSync(SCAN) ? JSON.parse(fs.readFileSync(SCAN, "utf8")) : { career: [], hiringPrivate: [] }

const host = u => { try { return new URL(u).host.replace(/^www\./, "").toLowerCase() } catch { return "" } }
const careerByHost = new Map()
for (const c of scan.career || []) { const h = host(c.site); if (h && !careerByHost.has(h)) careerByHost.set(h, c.careerUrl) }
const hiringHosts = new Set((scan.hiringPrivate || []).map(c => host(c.site)).filter(Boolean))

function vertical(category) {
  const c = (category || "").toLowerCase()
  if (/dental|dentist|orthodont/.test(c)) return "dental"
  if (/vet|animal/.test(c)) return "vet"
  if (/skin|spa|aesthetic|cosmetic|laser|derma/.test(c)) return "aesthetics"
  if (/physio|physical therap|sports|osteopath|chiropract|podiatr/.test(c)) return "physio"
  if (/optic|optometr|ophthalm|eye/.test(c)) return "optometry"
  return "medical"
}
const REGION = [[/london/i,"London"],[/bristol|bath|swindon|salisbury|somerset|gloucester|wells|clevedon|weston|chippenham|devizes|marlborough|trowbridge|melksham|calne|pewsey|wincanton|nailsea|south[- ]west/i,"South West"],[/winchester|salisbury|portsmouth|southampton|brighton|surrey|kent|sussex|oxford|reading|south[- ]east/i,"South East"],[/cardiff|swansea|newport|wales/i,"Wales"],[/glasgow|edinburgh|aberdeen|dundee|ayr|kilmarnock|scotland/i,"Scotland"],[/manchester|liverpool|preston|north[- ]west/i,"North West"],[/leeds|sheffield|york|bradford|hull|yorkshire/i,"Yorkshire"],[/newcastle|sunderland|durham|north[- ]east/i,"North East"],[/birmingham|coventry|wolverhampton|west midlands/i,"West Midlands"],[/nottingham|leicester|derby|east midlands/i,"East Midlands"],[/norwich|cambridge|ipswich|east of england|eastern/i,"East of England"],[/belfast|northern ireland/i,"Northern Ireland"]]
function region(city, state) { const h = `${city||""} ${state||""}`; for (const [re,r] of REGION) if (re.test(h)) return r; return "South East" }
const slugify = s => (s||"").toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,"").slice(0,70)

const seen = new Set()
const rows = []
for (const p of places) {
  if (!p.title) continue
  let slug = `${slugify(p.title)}-${slugify(p.city||"")}`.replace(/-+$/,"")
  if (seen.has(slug)) { let n=2; while (seen.has(`${slug}-${n}`)) n++; slug = `${slug}-${n}` }
  seen.add(slug)
  const h = host(p.website)
  rows.push({
    slug, name: p.title, category: p.categoryName || null, vertical: vertical(p.categoryName),
    city: p.city || null, region: region(p.city, p.state), street: p.street || null,
    website: p.website ? p.website.split("?")[0] : null, phone: p.phone || null,
    rating: typeof p.totalScore === "number" ? p.totalScore : null,
    reviews_count: typeof p.reviewsCount === "number" ? p.reviewsCount : null,
    is_hiring: h ? hiringHosts.has(h) : false,
    careers_url: h ? (careerByHost.get(h) || null) : null,
    source: "directory",
  })
}

console.log(`Clinics to upsert: ${rows.length}`)
let done = 0
for (let i=0;i<rows.length;i+=200) {
  const { error } = await admin.from("clinics").upsert(rows.slice(i,i+200), { onConflict: "slug", ignoreDuplicates: false })
  if (error) { console.error("upsert error:", error.message); break }
  done += Math.min(200, rows.length-i)
}
const byVert = {}; rows.forEach(r=>byVert[r.vertical]=(byVert[r.vertical]||0)+1)
const hiring = rows.filter(r=>r.is_hiring).length
console.log(`Upserted ${done}. Hiring: ${hiring}. By vertical:`, JSON.stringify(byVert))
