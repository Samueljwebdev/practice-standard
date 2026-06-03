import { createClient, createServiceClient } from "@/lib/supabase/server"
import { NextResponse } from "next/server"

/**
 * "Claim this listing" for an aggregated (web-sourced) vacancy. Warm-employer
 * funnel: a practice claims a vacancy we're already showing, then we route them
 * to the founding offer to manage/feature it.
 *  - Logged-out → register as a founding practice (then they can come back).
 *  - Logged-in practice → associate the aggregated job with them, send to /founding.
 */
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const jobId = searchParams.get("jobId")
  const base = process.env.NEXT_PUBLIC_BASE_URL

  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.redirect(`${base}/auth/register?plan=founder`)

  const { data: practice } = await supabase.from("practices").select("id").eq("user_id", user.id).single()
  if (!practice) return NextResponse.redirect(`${base}/auth/register?plan=founder`)

  if (jobId) {
    const admin = createServiceClient()
    const { data: job } = await admin.from("jobs").select("id, practice_id, source").eq("id", jobId).single()
    // Only claimable if it's an unowned aggregated listing.
    if (job && job.source === "aggregated" && !job.practice_id) {
      await admin.from("jobs").update({ practice_id: practice.id }).eq("id", jobId)
    }
  }

  return NextResponse.redirect(`${base}/founding?claimed=1`)
}
