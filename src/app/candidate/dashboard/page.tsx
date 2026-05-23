import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import Link from "next/link"

const STATUS_LABELS: Record<string, string> = {
  pending: "Pending review",
  viewed: "Viewed",
  shortlisted: "Shortlisted",
  rejected: "Not progressing",
}

const STATUS_COLOR: Record<string, string> = {
  pending: "bg-border text-brand-slate",
  viewed: "bg-mint/15 text-teal",
  shortlisted: "bg-mint/30 text-teal font-semibold",
  rejected: "bg-border text-brand-slate",
}

export default async function CandidateDashboard() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect("/auth/login")

  const { data: candidate } = await supabase
    .from("candidates")
    .select("*")
    .eq("user_id", user.id)
    .single()

  if (!candidate) redirect("/candidate/profile")

  const { data: applications } = await supabase
    .from("applications")
    .select("id, status, created_at, jobs(title, slug, city, region, practices(name))")
    .eq("candidate_id", candidate.id)
    .order("created_at", { ascending: false })

  return (
    <div className="max-w-3xl mx-auto px-4 py-10 space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs font-semibold text-teal uppercase tracking-[0.18em] mb-1">Candidate dashboard</p>
          <h1 className="text-2xl font-bold text-navy">My Applications</h1>
          <p className="text-brand-slate text-sm mt-0.5">{candidate.full_name} · {candidate.profession?.replace(/_/g, " ")}</p>
        </div>
        <Link
          href="/candidate/profile"
          className="border-2 border-teal/25 text-teal text-sm px-4 py-2 rounded-full font-semibold hover:border-teal transition-colors"
        >
          Edit profile
        </Link>
      </div>

      {!applications?.length ? (
        <div className="bg-white border border-border rounded-2xl p-10 text-center">
          <p className="text-navy font-semibold mb-2">No applications yet</p>
          <p className="text-brand-slate text-sm mb-5">Browse open roles and apply in seconds.</p>
          <Link
            href="/jobs"
            className="inline-flex bg-teal text-off-white px-5 py-2.5 rounded-full text-sm font-semibold hover:bg-teal/90 transition-colors"
          >
            Browse jobs
          </Link>
        </div>
      ) : (
        <div className="space-y-3">
          {applications.map((app: any) => (
            <div key={app.id} className="bg-white border border-border rounded-2xl px-5 py-4 flex items-center justify-between gap-4">
              <div className="min-w-0">
                <Link href={`/jobs/${app.jobs?.slug}`} className="font-semibold text-navy hover:text-teal transition-colors">
                  {app.jobs?.title}
                </Link>
                <p className="text-sm text-brand-slate mt-0.5">
                  {app.jobs?.practices?.name} · {app.jobs?.city ?? app.jobs?.region}
                </p>
                <p className="text-xs text-brand-slate/60 mt-1">Applied {new Date(app.created_at).toLocaleDateString("en-GB")}</p>
              </div>
              <span className={`shrink-0 text-xs px-2.5 py-1 rounded-full ${STATUS_COLOR[app.status] ?? "bg-border text-brand-slate"}`}>
                {STATUS_LABELS[app.status] ?? app.status}
              </span>
            </div>
          ))}
        </div>
      )}

      <Link
        href="/jobs"
        className="inline-flex bg-teal text-off-white text-sm px-5 py-2.5 rounded-full font-semibold hover:bg-teal/90 transition-colors"
      >
        Browse more jobs
      </Link>
    </div>
  )
}
