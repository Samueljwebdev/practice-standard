import { NextResponse } from "next/server"
import { createServiceClient } from "@/lib/supabase/server"
import { runAggregateIngest } from "@/lib/jobs/aggregate"

export const maxDuration = 60

export async function GET(request: Request) {
  // Vercel cron only — header-only secret (a query-param secret would leak in access logs).
  const auth = request.headers.get("authorization")
  if (auth !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

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
