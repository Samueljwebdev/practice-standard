import { NextResponse } from "next/server"
import { createServiceClient } from "@/lib/supabase/server"
import { sendPostRoleNudge, sendFirstWeekRecap, sendNoApplicantsHelp } from "@/lib/resend"

// Daily founder-activation lifecycle.
// Day 0 welcome is sent from the Stripe webhook; this cron handles the
// time-delayed, conditional emails. Each is sent at most once per practice
// (a non-null *_sent_at column = already sent). Failures are non-fatal.
export async function GET(request: Request) {
  const authHeader = request.headers.get("authorization")
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const supabase = createServiceClient()
  const now = Date.now()
  const daysAgo = (n: number) => new Date(now - n * 86400000).toISOString()

  // Active, activated founders only. Small base — fine to evaluate per-practice.
  const { data: practices } = await supabase
    .from("practices")
    .select("id, name, user_id, activated_at, nudge_sent_at, week1_sent_at, no_applicants_sent_at")
    .not("activated_at", "is", null)
    .eq("subscription_status", "active")

  const emailFor = async (userId: string | null) => {
    if (!userId) return null
    const { data } = await supabase.auth.admin.getUserById(userId)
    return data.user?.email ?? null
  }

  let nudge = 0, week1 = 0, noApplicants = 0

  for (const p of practices ?? []) {
    const activated = new Date(p.activated_at as string).getTime()
    const ageDays = (now - activated) / 86400000

    // Count this practice's roles + applicants.
    const { data: jobs } = await supabase
      .from("jobs")
      .select("id, title, created_at, applications(count)")
      .eq("practice_id", p.id)
    const jobCount = jobs?.length ?? 0
    const applicantCount = (jobs ?? []).reduce((sum, j: { applications?: { count: number }[] }) => {
      const c = Array.isArray(j.applications) ? (j.applications[0]?.count ?? 0) : 0
      return sum + c
    }, 0)

    // ── Day ~1 nudge: paid, no role posted, not yet nudged ──
    if (!p.nudge_sent_at && jobCount === 0 && p.activated_at! < daysAgo(1) && p.activated_at! > daysAgo(5)) {
      const email = await emailFor(p.user_id as string | null)
      if (email) {
        try {
          await sendPostRoleNudge({ practiceEmail: email, practiceName: (p.name as string) ?? "there" })
          await supabase.from("practices").update({ nudge_sent_at: new Date().toISOString() }).eq("id", p.id)
          nudge++
        } catch { /* non-fatal */ }
      }
    }

    // ── Day ~7 first-week recap ──
    if (!p.week1_sent_at && ageDays >= 7 && ageDays <= 11) {
      const email = await emailFor(p.user_id as string | null)
      if (email) {
        try {
          await sendFirstWeekRecap({ practiceEmail: email, practiceName: (p.name as string) ?? "there", jobCount, applicantCount })
          await supabase.from("practices").update({ week1_sent_at: new Date().toISOString() }).eq("id", p.id)
          week1++
        } catch { /* non-fatal */ }
      }
    }

    // ── Day ~14+ no-applicants help: a role live ≥14 days with 0 applicants ──
    if (!p.no_applicants_sent_at && applicantCount === 0 && jobCount > 0) {
      const staleJob = (jobs ?? []).find((j: { created_at?: string }) => j.created_at && j.created_at < daysAgo(14))
      if (staleJob) {
        const email = await emailFor(p.user_id as string | null)
        if (email) {
          try {
            await sendNoApplicantsHelp({ practiceEmail: email, practiceName: (p.name as string) ?? "there", jobTitle: (staleJob as { title?: string }).title ?? "your" })
            await supabase.from("practices").update({ no_applicants_sent_at: new Date().toISOString() }).eq("id", p.id)
            noApplicants++
          } catch { /* non-fatal */ }
        }
      }
    }
  }

  return NextResponse.json({ ok: true, nudge, week1, noApplicants, evaluated: practices?.length ?? 0 })
}
