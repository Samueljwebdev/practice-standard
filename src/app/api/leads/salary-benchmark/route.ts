import { NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"
import { sendSalaryBenchmark } from "@/lib/resend"

const COOLDOWN_HOURS = 24

export async function POST(request: Request) {
  const { email, name, practice_type } = await request.json()

  if (!email || !name) {
    return NextResponse.json({ ok: false, error: "Name and email are required" }, { status: 400 })
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(email)) {
    return NextResponse.json({ ok: false, error: "Invalid email address" }, { status: 400 })
  }

  const normalizedEmail = email.toLowerCase().trim()
  const supabase = await createClient()

  // Deduplicate: if this email already received the benchmark in the last 24h, return ok silently
  const cutoff = new Date(Date.now() - COOLDOWN_HOURS * 60 * 60 * 1000).toISOString()
  const { data: existing } = await supabase
    .from("benchmark_leads")
    .select("id")
    .eq("email", normalizedEmail)
    .gte("created_at", cutoff)
    .limit(1)
    .maybeSingle()

  if (existing) {
    return NextResponse.json({ ok: true })
  }

  try {
    await supabase.from("benchmark_leads").insert({
      email: normalizedEmail,
      name: name.trim(),
      practice_type: practice_type || null,
    })
  } catch {
    // Non-fatal
  }

  try {
    await sendSalaryBenchmark({ email: normalizedEmail, name: name.trim() })
  } catch {
    return NextResponse.json({ ok: false, error: "Failed to send email. Please try again." }, { status: 500 })
  }

  return NextResponse.json({ ok: true })
}
