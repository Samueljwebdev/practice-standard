import { NextResponse } from "next/server"
import { sendReferralInvite, sendReferralNotice } from "@/lib/resend"

/** Referral — emails the referred practice an invite + notifies the founder to apply the reward. */
export async function POST(request: Request) {
  let d: Record<string, string>
  try { d = await request.json() } catch { return NextResponse.json({ error: "bad_request" }, { status: 400 }) }
  const { friendEmail, referrerPractice, note } = d
  if (!friendEmail || !referrerPractice) return NextResponse.json({ error: "missing" }, { status: 400 })

  const FOUNDER = process.env.FOUNDER_EMAIL ?? "samueljfx@gmail.com"
  await sendReferralInvite({ to: friendEmail, referrerPractice, note }).catch(() => {})
  await sendReferralNotice({ to: FOUNDER, referrerPractice, friendEmail }).catch(() => {})
  return NextResponse.json({ ok: true })
}
