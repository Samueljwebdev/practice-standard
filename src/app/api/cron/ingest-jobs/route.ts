import { NextResponse } from "next/server"
import { createServiceClient } from "@/lib/supabase/server"
import { runAggregateIngest } from "@/lib/jobs/aggregate"

export const maxDuration = 60

export async function GET(request: Request) {
  // Allow Vercel cron (Authorization: Bearer CRON_SECRET) or a manual ?secret=.
  const url = new URL(request.url)
  const auth = request.headers.get("authorization")
  const ok = auth === `Bearer ${process.env.CRON_SECRET}` || url.searchParams.get("secret") === process.env.CRON_SECRET
  if (!ok) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  const appId = process.env.ADZUNA_APP_ID
  const appKey = process.env.ADZUNA_APP_KEY
  if (!appId || !appKey) return NextResponse.json({ error: "Adzuna keys not configured" }, { status: 500 })

  try {
    const admin = createServiceClient()
    const result = await runAggregateIngest(admin, appId, appKey)
    return NextResponse.json({ ok: true, ...result })
  } catch (err) {
    console.error("Job ingest failed:", err)
    return NextResponse.json({ ok: false, error: String((err as Error)?.message ?? err) }, { status: 500 })
  }
}
