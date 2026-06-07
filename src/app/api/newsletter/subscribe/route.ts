import { NextResponse } from "next/server"
import { addNewsletterContact, sendNewsletterWelcome } from "@/lib/newsletter"
import { createServiceClient } from "@/lib/supabase/server"

/** Newsletter signup for The Standard — adds to the Resend Audience + our own list, sends a welcome. */
export async function POST(request: Request) {
  let d: Record<string, string>
  try { d = await request.json() } catch { return NextResponse.json({ error: "bad_request" }, { status: 400 }) }

  const email = (d.email ?? "").toLowerCase().trim()
  const firstName = (d.firstName ?? "").trim() || undefined
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(email)) return NextResponse.json({ error: "invalid_email" }, { status: 400 })

  // Our own copy of the list. Service role so the write actually persists (RLS denies anon).
  // Best-effort: wrapped so the form still works before the migration is applied.
  try {
    const db = createServiceClient()
    await db
      .from("newsletter_subscribers")
      .upsert({ email, first_name: firstName ?? null, source: d.source ?? "web" }, { onConflict: "email" })
  } catch {}

  await addNewsletterContact(email, firstName).catch(() => {})
  await sendNewsletterWelcome(email).catch(() => {})

  return NextResponse.json({ ok: true })
}
