// One-off backfill: add every EXISTING practice + professional to The Standard audience.
// New signups are added automatically by /api/auth/provision; this catches everyone
// who joined before that hook existed.
//
//   node scripts/seed-newsletter-audience.mjs
//
// Env required:
//   SUPABASE_URL (or NEXT_PUBLIC_SUPABASE_URL), SUPABASE_SERVICE_ROLE_KEY,
//   RESEND_API_KEY, RESEND_AUDIENCE_ID
import { createClient } from "@supabase/supabase-js"
import { Resend } from "resend"

const url = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL
const key = process.env.SUPABASE_SERVICE_ROLE_KEY
const audienceId = process.env.RESEND_AUDIENCE_ID
const resendKey = process.env.RESEND_API_KEY

if (!url || !key || !audienceId || !resendKey) {
  console.error("Missing env: need SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, RESEND_API_KEY, RESEND_AUDIENCE_ID")
  process.exit(1)
}

const supabase = createClient(url, key)
const resend = new Resend(resendKey)

let page = 1, scanned = 0, added = 0
for (;;) {
  const { data, error } = await supabase.auth.admin.listUsers({ page, perPage: 200 })
  if (error) { console.error(error); break }
  const users = data?.users ?? []
  if (users.length === 0) break

  for (const u of users) {
    scanned++
    const role = u.user_metadata?.role
    if (!u.email || (role !== "practice" && role !== "candidate")) continue
    const fullName = (u.user_metadata?.full_name ?? "").toString().trim()
    const firstName = fullName.split(/\s+/)[0] || undefined
    try {
      await resend.contacts.create({ email: u.email, firstName, unsubscribed: false, audienceId })
      await supabase
        .from("newsletter_subscribers")
        .upsert({ email: u.email.toLowerCase(), first_name: fullName || null, source: `backfill_${role}` }, { onConflict: "email" })
      added++
    } catch {
      // already in the audience / transient — skip
    }
  }
  page++
}
console.log(`Scanned ${scanned} users · added ~${added} practices + professionals to The Standard.`)
