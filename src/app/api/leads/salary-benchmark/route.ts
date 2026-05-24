import { NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"
import { sendSalaryBenchmark } from "@/lib/resend"

export async function POST(request: Request) {
  const { email, name, practice_type } = await request.json()

  if (!email || !name) {
    return NextResponse.json({ ok: false, error: "Name and email are required" }, { status: 400 })
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(email)) {
    return NextResponse.json({ ok: false, error: "Invalid email address" }, { status: 400 })
  }

  try {
    const supabase = await createClient()
    await supabase.from("benchmark_leads").insert({
      email: email.toLowerCase().trim(),
      name: name.trim(),
      practice_type: practice_type || null,
    })
  } catch {
    // Non-fatal — proceed to send the email even if DB insert fails
  }

  try {
    await sendSalaryBenchmark({ email: email.trim(), name: name.trim() })
  } catch {
    return NextResponse.json({ ok: false, error: "Failed to send email. Please try again." }, { status: 500 })
  }

  return NextResponse.json({ ok: true })
}
