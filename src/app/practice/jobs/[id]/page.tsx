import { createClient, createServiceClient } from "@/lib/supabase/server"
import { redirect, notFound } from "next/navigation"
import Link from "next/link"
import { PROFESSIONS } from "@/lib/constants"
import { regulatorName } from "@/lib/verification"
import { ApplicantActions } from "@/components/practice/ApplicantActions"

interface Props { params: Promise<{ id: string }> }

const STATUS_STYLE: Record<string, string> = {
  verified: "bg-teal/10 text-teal border-teal/25",
  pending_review: "bg-amber-50 text-amber-700 border-amber-200",
}

export default async function JobApplicantsPage({ params }: Props) {
  const { id } = await params
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect("/auth/login")

  const { data: practice } = await supabase.from("practices").select("id").eq("user_id", user.id).single()
  if (!practice) redirect("/auth/register")

  const { data: job } = await supabase
    .from("jobs")
    .select("id, title, city, region, status, practice_id")
    .eq("id", id)
    .single()
  if (!job || job.practice_id !== practice.id) notFound()

  const { data: applications } = await supabase
    .from("applications")
    .select("id, status, cover_letter, created_at, candidates(full_name, profession, location, region, years_experience, bio, cv_url, user_id)")
    .eq("job_id", id)
    .order("created_at", { ascending: false })

  // Supplementary data the practice is entitled to: applicant email + verification.
  const admin = createServiceClient()
  const userIds = (applications ?? []).map(a => (a.candidates as any)?.user_id).filter(Boolean)
  const emails = new Map<string, string>()
  for (const uid of userIds) {
    const { data } = await admin.auth.admin.getUserById(uid)
    if (data.user?.email) emails.set(uid, data.user.email)
  }
  const { data: vers } = userIds.length
    ? await admin.from("candidate_verifications").select("user_id, status, regulator, verified_name").in("user_id", userIds)
    : { data: [] }
  const verByUser = new Map((vers ?? []).map(v => [v.user_id, v]))

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <Link href="/practice/dashboard" className="text-sm text-brand-slate hover:text-teal transition-colors">← Dashboard</Link>

      <div className="mt-4 mb-8">
        <p className="text-xs font-semibold text-teal uppercase tracking-[0.18em] mb-1">Applicants</p>
        <h1 className="text-2xl font-bold text-navy">{job.title}</h1>
        <p className="text-brand-slate text-sm mt-1">{job.city ?? job.region} · {applications?.length ?? 0} applicant{(applications?.length ?? 0) === 1 ? "" : "s"}</p>
      </div>

      {!applications?.length ? (
        <div className="rounded-2xl bg-white p-12 text-center ring-1 ring-navy/8">
          <p className="text-navy font-bold mb-1">No applicants yet</p>
          <p className="text-brand-slate text-sm">You&rsquo;ll be emailed the moment someone applies — and they&rsquo;ll appear here.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {applications.map(app => {
            const c = app.candidates as any
            const v = verByUser.get(c?.user_id) as any
            const email = emails.get(c?.user_id)
            const professionLabel = PROFESSIONS.find(p => p.value === c?.profession)?.label ?? c?.profession
            return (
              <div key={app.id} className="bg-white rounded-2xl ring-1 ring-navy/8 p-5">
                <div className="flex items-start justify-between gap-4">
                  <div className="min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h2 className="font-bold text-navy">{c?.full_name}</h2>
                      {v?.status === "verified" ? (
                        <span className={`inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[10px] font-semibold ${STATUS_STYLE.verified}`}>
                          <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                          {regulatorName(v.regulator)} verified
                        </span>
                      ) : v?.status === "pending_review" ? (
                        <span className={`rounded-full border px-2 py-0.5 text-[10px] font-semibold ${STATUS_STYLE.pending_review}`}>Verification pending</span>
                      ) : (
                        <span className="rounded-full border border-navy/12 px-2 py-0.5 text-[10px] font-medium text-brand-slate/70">Unverified</span>
                      )}
                    </div>
                    <p className="text-sm text-brand-slate mt-0.5">
                      {professionLabel}{c?.years_experience != null ? ` · ${c.years_experience} yrs` : ""}{c?.location ? ` · ${c.location}` : ""}
                    </p>
                  </div>
                  <span className="shrink-0 text-[11px] text-brand-slate/60">{new Date(app.created_at).toLocaleDateString("en-GB")}</span>
                </div>

                {c?.bio && <p className="text-sm text-navy/75 mt-3 leading-relaxed">{c.bio}</p>}
                {app.cover_letter && (
                  <div className="mt-3 rounded-xl bg-off-white p-3">
                    <p className="text-[11px] font-semibold text-brand-slate uppercase tracking-wide mb-1">Cover note</p>
                    <p className="text-sm text-navy/75 whitespace-pre-wrap">{app.cover_letter}</p>
                  </div>
                )}

                <div className="flex flex-wrap items-center justify-between gap-3 mt-4 pt-3.5 border-t border-navy/6">
                  <div className="flex items-center gap-3 text-sm">
                    {email && <a href={`mailto:${email}`} className="text-teal font-semibold hover:underline">{email}</a>}
                    {c?.cv_url && <a href={c.cv_url} target="_blank" rel="noopener noreferrer" className="text-navy/60 hover:text-teal text-xs font-medium">View CV →</a>}
                  </div>
                  <ApplicantActions appId={app.id} initial={app.status} />
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
