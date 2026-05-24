import { sendPracticeWelcome, sendCandidateWelcome } from "@/lib/resend"
import { NextResponse } from "next/server"

export async function POST(request: Request) {
  const { email, name, role } = await request.json()

  if (!email || !name || !role) {
    return NextResponse.json({ ok: false }, { status: 400 })
  }

  try {
    if (role === "practice") {
      await sendPracticeWelcome({ practiceEmail: email, practiceName: name })
    } else {
      await sendCandidateWelcome({ candidateEmail: email, candidateName: name })
    }
  } catch {
    // Non-fatal — registration already succeeded
  }

  return NextResponse.json({ ok: true })
}
