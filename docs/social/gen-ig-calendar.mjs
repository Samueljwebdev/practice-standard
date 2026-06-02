import fs from "fs"
// Builds a 52-week, 3x/week Instagram schedule (Mon/Wed/Fri) from the rendered
// carousel library. Seasonal pegs land on their date-week; evergreen rotates.
const FIRST = new Date("2026-06-01T00:00:00Z") // Monday
const wk = (iso) => Math.floor((new Date(iso+"T00:00:00Z") - FIRST) / (7*864e5))

// Seasonal carousels keyed to the week of their real 2026/27 date.
const SEASONAL = {
  [wk("2026-06-08")]:"s02-pride", [wk("2026-06-15")]:"s01-mens-health",
  [wk("2026-07-06")]:"s03-summer-myth", [wk("2026-06-29")]:"s04-nhs-birthday",
  [wk("2026-08-10")]:"s05-results-day", [wk("2026-09-07")]:"s06-physio-day",
  [wk("2026-09-14")]:"s07-q4-hiring", [wk("2026-09-21")]:"s08-eye-health",
  [wk("2026-10-05")]:"s09-mental-health", [wk("2026-10-19")]:"s10-menopause",
  [wk("2026-10-26")]:"s11-halloween", [wk("2026-11-02")]:"s12-movember",
  [wk("2026-11-09")]:"f17-diabetes-day", [wk("2026-11-23")]:"s13-black-friday",
  [wk("2026-12-14")]:"s14-christmas", [wk("2026-12-28")]:"s15-new-year",
  [wk("2027-01-04")]:"f01-new-year-pro", [wk("2027-01-18")]:"f02-blue-monday",
  [wk("2027-02-01")]:"f03-cancer-day", [wk("2027-02-08")]:"f05-valentines",
  [wk("2027-02-15")]:"f04-time-to-talk", [wk("2027-03-01")]:"f06-careers-week",
  [wk("2027-03-08")]:"f07-iwd", [wk("2027-03-15")]:"f08-mothers-day",
  [wk("2027-03-29")]:"f10-april-fools", [wk("2027-04-05")]:"f11-tax-year",
  [wk("2027-04-12")]:"f13-stress-month", [wk("2027-04-19")]:"f09-vet-day",
  [wk("2027-05-03")]:"f14-midwife-day", [wk("2027-05-10")]:"f15-nurses-day",
  [wk("2027-05-17")]:"f16-mh-week",
}

// Evergreen rotation pool (business + professional + photo posts).
const EVERGREEN = [
 "01-agency-maths","p1-verify","pp01-physio","04-ask-5","17-aesthetics-numbers","pp06-screening","19-clinicians-private",
 "08-agency-vs-board","p3-worth","pp02-optometry","13-what-verified","02-private-boom","pp07-empty-chair","07-empty-chair",
 "p5-question","pp10-male-nurse","22-green-flags","11-time-to-fill","pp03-vet","05-aesthetics-verify","p2-team",
 "21-how-it-works","pp14-two-min","03-salary-2026","16-will-i-get-quality","pp04-gp","12-post-once","p7-greenflags",
 "09-always-agency","pp13-aesthetics","06-optometry","14-quality-volume","pp08-team","p4-bridge","20-good-hiring",
 "10-fill-no-agency","pp11-returner","18-blind-spot","f18-returners","pp15-verified","15-compliance","p6-chair",
 "pp05-dental","pp09-owner","pp12-job-search",
]
const FOUNDING = "23-founding-41"
const fmt = (d) => d.toISOString().slice(0,10)

let ei = 0
const next = (avoid) => { let id; do { id = EVERGREEN[ei % EVERGREEN.length]; ei++ } while (avoid.includes(id)); return id }

const rows = [["week_start","mon","wed","fri"]]
for (let i=0;i<52;i++){
  const start = new Date(FIRST.getTime()+i*7*864e5)
  const used = []
  // Mon: seasonal peg if any, else evergreen
  const mon = SEASONAL[i] || next(used); used.push(mon)
  // Wed: a founder push every 4th week for the first 26 weeks, else evergreen
  const wed = (i<26 && i%4===2) ? FOUNDING : next(used); used.push(wed)
  // Fri: evergreen (or photo-led)
  const fri = next(used); used.push(fri)
  rows.push([fmt(start), mon, wed, fri])
}
fs.writeFileSync("C:/Users/samue/practice-standard/docs/social/instagram-year-calendar.csv",
  rows.map(r=>r.join(",")).join("\n"))
console.log("Wrote 52-week (156-slot) Instagram calendar.")
