import { NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"
import { sendBenchmarkFollowup1, sendBenchmarkFollowup2 } from "@/lib/resend"

export async function GET(request: Request) {
  // Verify Vercel cron secret
  const authHeader = request.headers.get("authorization")
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const supabase = await createClient()

  // Followup 1 — send to leads created 3+ days ago that haven't received it yet
  // Cap at 30 days to avoid emailing stale leads
  const { data: followup1Leads, error: err1 } = await supabase
    .from("benchmark_leads")
    .select("id, email, name")
    .eq("followup1_sent", false)
    .lt("created_at", new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString())
    .gt("created_at", new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString())

  let sent1 = 0
  if (!err1 && followup1Leads) {
    for (const lead of followup1Leads) {
      try {
        await sendBenchmarkFollowup1({ email: lead.email, name: lead.name ?? "there" })
        await supabase
          .from("benchmark_leads")
          .update({ followup1_sent: true })
          .eq("id", lead.id)
        sent1++
      } catch {
        // Non-fatal — move to next lead
      }
    }
  }

  // Followup 2 — send to leads created 7+ days ago that received followup1 but not followup2
  const { data: followup2Leads, error: err2 } = await supabase
    .from("benchmark_leads")
    .select("id, email, name")
    .eq("followup1_sent", true)
    .eq("followup2_sent", false)
    .lt("created_at", new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString())
    .gt("created_at", new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString())

  let sent2 = 0
  if (!err2 && followup2Leads) {
    for (const lead of followup2Leads) {
      try {
        await sendBenchmarkFollowup2({ email: lead.email, name: lead.name ?? "there" })
        await supabase
          .from("benchmark_leads")
          .update({ followup2_sent: true })
          .eq("id", lead.id)
        sent2++
      } catch {
        // Non-fatal — move to next lead
      }
    }
  }

  return NextResponse.json({ ok: true, followup1: sent1, followup2: sent2 })
}
