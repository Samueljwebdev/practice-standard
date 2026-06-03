import { NextResponse } from "next/server"
import { sendRoleIntakeToFounder, sendRoleIntakeConfirmation } from "@/lib/resend"

/** Role intake from a warm "yes" lead — emails the founder a clean brief + confirms to the practice. */
export async function POST(request: Request) {
  let d: Record<string, string>
  try { d = await request.json() } catch { return NextResponse.json({ error: "bad_request" }, { status: 400 }) }
  if (!d.email || !d.roleTitle) return NextResponse.json({ error: "missing" }, { status: 400 })

  const FOUNDER = process.env.FOUNDER_EMAIL ?? "samueljfx@gmail.com"
  await sendRoleIntakeToFounder({ to: FOUNDER, d }).catch(() => {})
  await sendRoleIntakeConfirmation({ to: d.email, name: d.yourName || "there" }).catch(() => {})
  return NextResponse.json({ ok: true })
}
