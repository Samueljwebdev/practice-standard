import { createClient, createServiceClient } from "@/lib/supabase/server"
import { verifyRegistration } from "@/lib/verification"
import { NextResponse } from "next/server"

/**
 * Verifies the signed-in candidate's professional registration and stores the
 * authoritative result in candidate_verifications (service role — the candidate
 * cannot write this table themselves). Returns the resulting status.
 */
export async function POST(request: Request) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: "unauthorized" }, { status: 401 })

  let body: { registrationNumber?: string } = {}
  try { body = await request.json() } catch {}

  const { data: candidate } = await supabase
    .from("candidates")
    .select("id, full_name, profession, registration_number")
    .eq("user_id", user.id)
    .single()

  if (!candidate) return NextResponse.json({ error: "no_candidate" }, { status: 404 })

  const registrationNumber = (body.registrationNumber ?? candidate.registration_number ?? "").toString().trim()
  const profession = candidate.profession ?? ""

  const result = await verifyRegistration({
    profession,
    registrationNumber,
    fullName: candidate.full_name ?? "",
  })

  // Persist the claimed number on the candidate row, and the authoritative
  // verification result on the protected table.
  const admin = createServiceClient()
  if (registrationNumber && registrationNumber !== candidate.registration_number) {
    await admin.from("candidates").update({ registration_number: registrationNumber }).eq("id", candidate.id)
  }

  await admin.from("candidate_verifications").upsert({
    user_id: user.id,
    regulator: result.regulator,
    registration_number: result.registrationNumber,
    status: result.status,
    verified_name: result.verifiedName ?? null,
    registrant_type: result.registrantType ?? null,
    reason: result.reason ?? null,
    checked_at: new Date().toISOString(),
    meta: result.meta ?? null,
    updated_at: new Date().toISOString(),
  }, { onConflict: "user_id" })

  return NextResponse.json({
    status: result.status,
    regulator: result.regulator,
    verifiedName: result.verifiedName ?? null,
    reason: result.reason ?? null,
  })
}
