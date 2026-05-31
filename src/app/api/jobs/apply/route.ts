import { createClient, createServiceClient } from "@/lib/supabase/server"
import { sendApplicationNotification, sendApplicationConfirmation } from "@/lib/resend"
import { regulatorName } from "@/lib/verification"
import { NextResponse } from "next/server"

export async function POST(request: Request) {
  const formData = await request.formData()
  const jobId = formData.get("jobId") as string
  const candidateId = formData.get("candidateId") as string

  if (!jobId || !candidateId) {
    return NextResponse.redirect(`${process.env.NEXT_PUBLIC_BASE_URL}/jobs?error=invalid`, { status: 302 })
  }

  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    return NextResponse.redirect(`${process.env.NEXT_PUBLIC_BASE_URL}/auth/login`, { status: 302 })
  }

  const { data: candidate } = await supabase
    .from("candidates")
    .select("id, full_name")
    .eq("id", candidateId)
    .eq("user_id", user.id)
    .single()

  if (!candidate) {
    return NextResponse.redirect(`${process.env.NEXT_PUBLIC_BASE_URL}/jobs?error=unauthorized`, { status: 302 })
  }

  const { error } = await supabase.from("applications").insert({
    job_id: jobId,
    candidate_id: candidateId,
    status: "pending",
  })

  if (error?.code === "23505") {
    return NextResponse.redirect(`${process.env.NEXT_PUBLIC_BASE_URL}/candidate/dashboard?notice=already-applied`, { status: 302 })
  }

  if (error) {
    return NextResponse.redirect(`${process.env.NEXT_PUBLIC_BASE_URL}/jobs?error=apply-failed`, { status: 302 })
  }

  // Fetch job + practice for email notification
  const { data: job } = await supabase
    .from("jobs")
    .select("title, slug, practices(name, user_id)")
    .eq("id", jobId)
    .single()

  if (job) {
    const practicesRaw = job.practices as unknown
    const practicesData = Array.isArray(practicesRaw)
      ? (practicesRaw[0] as Record<string, unknown> | undefined)
      : (practicesRaw as Record<string, unknown> | null)
    const practiceUserId = practicesData?.user_id as string | undefined
    if (practiceUserId) {
      const serviceClient = createServiceClient()
      const { data: authUser } = await serviceClient.auth.admin.getUserById(practiceUserId)

      // Authoritative verification status for this applicant (server-read).
      const { data: ver } = await serviceClient
        .from("candidate_verifications")
        .select("status, regulator")
        .eq("user_id", user.id)
        .maybeSingle()
      let verificationLabel: string | undefined
      if (ver?.status === "verified") verificationLabel = `✓ Verified with ${regulatorName(ver.regulator)}`
      else if (ver?.status === "pending_review") verificationLabel = "Registration pending verification"
      else if (ver?.status === "failed") verificationLabel = "Registration not verified"

      if (authUser.user?.email) {
        await sendApplicationNotification({
          practiceEmail: authUser.user.email,
          practiceName: (practicesData?.name as string | undefined) ?? "Practice",
          jobTitle: job.title,
          candidateName: candidate.full_name,
          jobSlug: job.slug,
          verificationLabel,
        }).catch(() => {})
      }
    }
  }

  // Confirm to the candidate that their application was sent
  if (job) {
    const practicesRaw = job.practices as unknown
    const practicesData = Array.isArray(practicesRaw)
      ? (practicesRaw[0] as Record<string, unknown> | undefined)
      : (practicesRaw as Record<string, unknown> | null)
    await sendApplicationConfirmation({
      candidateEmail: user.email!,
      candidateName: candidate.full_name,
      jobTitle: job.title,
      practiceName: (practicesData?.name as string | undefined) ?? "the practice",
    }).catch(() => {})
  }

  return NextResponse.redirect(`${process.env.NEXT_PUBLIC_BASE_URL}/candidate/dashboard?notice=applied`, { status: 302 })
}
