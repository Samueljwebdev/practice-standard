// Builds a 26-week content calendar (4 posts/week: 2 LinkedIn + 2 Instagram = 104)
// from the post headers in 01-linkedin.md / 02-instagram.md.
import fs from "fs"
const dir = "C:/Users/samue/practice-standard/docs/social"
function parse(file, tag) {
  const txt = fs.readFileSync(`${dir}/${file}`, "utf8")
  const rows = []
  const re = /^### ((?:LI|IG)-\d+)\s*·\s*([A-Z]+)[^·]*·\s*(.+)$/gm
  let m
  while ((m = re.exec(txt))) rows.push({ id: m[1], format: m[2], title: m[3].trim() })
  return rows
}
const li = parse("01-linkedin.md")
const ig = parse("02-instagram.md")
const WEEKS = 26
const slots = [["Mon", "LinkedIn"], ["Tue", "Instagram"], ["Thu", "LinkedIn"], ["Fri", "Instagram"]]
const out = ["Week,Day,Platform,PostID,Format,Title"]
const esc = v => `"${String(v ?? "").replace(/"/g, '""')}"`
for (let w = 0; w < WEEKS; w++) {
  // Stride: pair an early (pillar 1-3) post with a later (pillar 4-6) post each week for variety.
  const liA = li[w], liB = li[w + WEEKS]
  const igA = ig[w], igB = ig[w + WEEKS]
  const picks = { LinkedIn: [liA, liB], Instagram: [igA, igB] }
  const used = { LinkedIn: 0, Instagram: 0 }
  for (const [day, platform] of slots) {
    const p = picks[platform][used[platform]++]
    if (!p) continue
    out.push([`Week ${w + 1}`, day, platform, p.id, p.format, p.title].map(esc).join(","))
  }
}
fs.writeFileSync(`${dir}/social-content-calendar.csv`, out.join("\n"))
fs.writeFileSync("C:/Users/samue/social-content-calendar.csv", out.join("\n"))
console.log(`Calendar: ${out.length - 1} scheduled posts across ${WEEKS} weeks`)
console.log(`Parsed ${li.length} LinkedIn + ${ig.length} Instagram posts`)
console.log("\nWeek 1 sample:")
out.slice(1, 5).forEach(l => console.log("  " + l))
