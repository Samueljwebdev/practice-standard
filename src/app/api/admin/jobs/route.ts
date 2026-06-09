import { NextResponse } from "next/server"
import { createClient, createServiceClient } from "@/lib/supabase/server"

const ADMIN_EMAIL = process.env.ADMIN_EMAIL ?? "samueljfx@gmail.com"
const JOB_TYPES = ["permanent", "part_time", "locum", "contract"]

/** Admin-only: create a job and publish it immediately (status active, payment paid). */
export async function POST(request: Request) {
  // Verify the caller is the admin (their authenticated session) BEFORE using service role.
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user || (user.email ?? "").toLowerCase() !== ADMIN_EMAIL.toLowerCase()) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  let d: Record<string, string>
  try { d = await request.json() } catch { return NextResponse.json({ error: "Bad request" }, { status: 400 }) }

  const { practice_id, title, profession, job_type, region, description } = d
  if (!practice_id || !title || !profession || !job_type || !region || !description) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
  }
  if (!JOB_TYPES.includes(job_type)) return NextResponse.json({ error: "Invalid job type" }, { status: 400 })

  const slug =
    title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "").slice(0, 60) +
    "-" + Math.random().toString(36).slice(2, 7)
  const now = new Date().toISOString()
  const expires = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString()

  const admin = createServiceClient()
  const { error } = await admin.from("jobs").insert({
    practice_id,
    title,
    profession,
    job_type,
    region,
    city: d.city || null,
    salary_min: d.salary_min ? parseInt(d.salary_min, 10) : null,
    salary_max: d.salary_max ? parseInt(d.salary_max, 10) : null,
    description,
    requirements: d.requirements || null,
    slug,
    status: "active",
    payment_status: "paid",
    published_at: now,
    expires_at: expires,
  })
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })

  return NextResponse.json({ ok: true, slug })
}
