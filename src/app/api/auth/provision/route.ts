import { createServiceClient } from "@/lib/supabase/server"
import { sendPracticeWelcome, sendCandidateWelcome } from "@/lib/resend"
import { NextResponse } from "next/server"

/**
 * Creates the profile + practice/candidate rows for a freshly signed-up user.
 *
 * Runs with the service-role key so it bypasses RLS. This is required because
 * email confirmation is enabled — at sign-up time the user has no session, so a
 * client-side insert (anon key) would be rejected by row-level security.
 *
 * The account type / name are read from the user's auth metadata (set during
 * signUp), never trusted from the request body. The route is idempotent: if a
 * profile already exists it returns ok without touching anything, so it's safe
 * to call both right after sign-up and again from the email-confirm callback.
 */
export async function POST(request: Request) {
  let userId: string
  try {
    ;({ userId } = await request.json())
  } catch {
    return NextResponse.json({ ok: false, error: "Bad request" }, { status: 400 })
  }

  if (!userId) {
    return NextResponse.json({ ok: false, error: "Missing userId" }, { status: 400 })
  }

  const admin = createServiceClient()

  // Look the user up server-side — this is the source of truth, not the body.
  const { data: userResult, error: userError } = await admin.auth.admin.getUserById(userId)
  if (userError || !userResult?.user) {
    return NextResponse.json({ ok: false, error: "User not found" }, { status: 404 })
  }

  const user = userResult.user
  const meta = user.user_metadata ?? {}
  const role = meta.role === "practice" ? "practice" : meta.role === "candidate" ? "candidate" : null
  const name = (meta.full_name ?? "").toString().trim()
  const practiceType = (meta.practice_type ?? "").toString().trim()
  const email = user.email ?? ""

  if (!role) {
    return NextResponse.json({ ok: false, error: "No account type on user" }, { status: 400 })
  }

  // Idempotency — if the profile already exists, this user is already provisioned.
  const { data: existing } = await admin.from("profiles").select("id").eq("id", userId).maybeSingle()
  if (existing) {
    return NextResponse.json({ ok: true, alreadyProvisioned: true })
  }

  const { error: profileError } = await admin.from("profiles").insert({ id: userId, role })
  if (profileError) {
    return NextResponse.json({ ok: false, error: profileError.message }, { status: 500 })
  }

  if (role === "practice") {
    const { error } = await admin.from("practices").insert({
      user_id: userId,
      name: name || "My practice",
      practice_type: practiceType || "other",
    })
    if (error) {
      return NextResponse.json({ ok: false, error: error.message }, { status: 500 })
    }
  } else {
    const { error } = await admin.from("candidates").insert({
      user_id: userId,
      full_name: name || "New member",
      profession: "",
    })
    if (error) {
      return NextResponse.json({ ok: false, error: error.message }, { status: 500 })
    }
  }

  // Welcome email — non-fatal.
  if (email) {
    try {
      if (role === "practice") {
        await sendPracticeWelcome({ practiceEmail: email, practiceName: name || "there" })
      } else {
        await sendCandidateWelcome({ candidateEmail: email, candidateName: name || "there" })
      }
    } catch {
      // ignore — provisioning already succeeded
    }
  }

  return NextResponse.json({ ok: true, role })
}
