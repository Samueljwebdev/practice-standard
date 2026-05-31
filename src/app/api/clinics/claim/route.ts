import { createClient, createServiceClient } from "@/lib/supabase/server"
import { NextResponse } from "next/server"

/** Links a directory clinic to the signed-in user's practice account. */
export async function POST(request: Request) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: "unauthorized" }, { status: 401 })

  let clinicId: string
  try { ({ clinicId } = await request.json()) } catch { return NextResponse.json({ error: "bad_request" }, { status: 400 }) }
  if (!clinicId) return NextResponse.json({ error: "bad_request" }, { status: 400 })

  // Must be a practice account.
  const { data: practice } = await supabase.from("practices").select("id, name").eq("user_id", user.id).single()
  if (!practice) return NextResponse.json({ error: "not_a_practice" }, { status: 403 })

  const admin = createServiceClient()
  const { data: clinic } = await admin.from("clinics").select("id, claimed_by_practice_id").eq("id", clinicId).single()
  if (!clinic) return NextResponse.json({ error: "not_found" }, { status: 404 })
  if (clinic.claimed_by_practice_id && clinic.claimed_by_practice_id !== practice.id) {
    return NextResponse.json({ error: "already_claimed" }, { status: 409 })
  }

  const { error } = await admin.from("clinics").update({ claimed_by_practice_id: practice.id }).eq("id", clinicId)
  if (error) return NextResponse.json({ error: "claim_failed" }, { status: 500 })

  return NextResponse.json({ ok: true })
}
