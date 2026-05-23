import { createClient, createServiceClient } from "@/lib/supabase/server"
import { sendApplicationNotification } from "@/lib/resend"
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
      if (authUser.user?.email) {
        await sendApplicationNotification({
          practiceEmail: authUser.user.email,
          practiceName: (practicesData?.name as string | undefined) ?? "Practice",
          jobTitle: job.title,
          candidateName: candidate.full_name,
          jobSlug: job.slug,
        }).catch(() => {})
      }
    }
  }

  return NextResponse.redirect(`${process.env.NEXT_PUBLIC_BASE_URL}/candidate/dashboard?notice=applied`, { status: 302 })
}
