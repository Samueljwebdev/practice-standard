import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import Link from "next/link"

export default async function PracticeDashboard() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect("/auth/login")

  const { data: practice } = await supabase
    .from("practices")
    .select("*")
    .eq("user_id", user.id)
    .single()

  if (!practice) redirect("/auth/register")

  const { data: jobs } = await supabase
    .from("jobs")
    .select("id, title, city, region, status, payment_status, created_at, applications(count)")
    .eq("practice_id", practice.id)
    .order("created_at", { ascending: false })

  const STATUS_COLOR: Record<string, string> = {
    active: "bg-mint/20 text-teal",
    draft: "bg-border text-brand-slate",
    expired: "bg-border text-brand-slate",
    filled: "bg-mint/20 text-teal",
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-10 space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs font-semibold text-teal uppercase tracking-[0.18em] mb-1">Practice dashboard</p>
          <h1 className="text-2xl font-bold text-navy">{practice.name}</h1>
        </div>
        <Link
          href="/practice/post"
          className="bg-teal text-off-white text-sm px-5 py-2.5 rounded-full font-semibold hover:bg-teal/90 transition-colors"
        >
          + Post a job
        </Link>
      </div>

      {practice.subscription_status !== "active" && (
        <div className="bg-navy rounded-2xl p-6 flex items-center justify-between gap-4">
          <div>
            <p className="font-bold text-white mb-1">Unlimited listings for £249/month</p>
            <p className="text-sm text-white/60">Subscribe and never pay per listing again.</p>
          </div>
          <Link
            href="/api/stripe/checkout?mode=subscription"
            className="shrink-0 bg-mint text-navy text-sm px-5 py-2.5 rounded-full font-semibold hover:bg-mint/85 transition-colors"
          >
            Subscribe
          </Link>
        </div>
      )}

      <div>
        <h2 className="font-bold text-navy mb-4">Your listings</h2>
        {!jobs?.length ? (
          <div className="bg-white border border-border rounded-2xl p-10 text-center">
            <p className="text-navy font-semibold mb-2">No jobs posted yet</p>
            <p className="text-brand-slate text-sm mb-5">Post your first role and start receiving applications.</p>
            <Link
              href="/practice/post"
              className="inline-flex bg-teal text-off-white px-5 py-2.5 rounded-full text-sm font-semibold hover:bg-teal/90 transition-colors"
            >
              Post your first role
            </Link>
          </div>
        ) : (
          <div className="space-y-3">
            {jobs.map((job: any) => (
              <div key={job.id} className="bg-white border border-border rounded-2xl px-5 py-4 flex items-center justify-between gap-4">
                <div className="min-w-0">
                  <p className="font-semibold text-navy truncate">{job.title}</p>
                  <p className="text-sm text-brand-slate mt-0.5">{job.city ?? job.region} · Posted {new Date(job.created_at).toLocaleDateString("en-GB")}</p>
                </div>
                <div className="flex items-center gap-3 shrink-0">
                  <span className="text-sm text-brand-slate">
                    {(job.applications as any)?.[0]?.count ?? 0} applicants
                  </span>
                  <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${job.payment_status === "unpaid" ? "bg-amber-100 text-amber-700" : STATUS_COLOR[job.status] ?? "bg-border text-brand-slate"}`}>
                    {job.payment_status === "unpaid" ? "Unpaid" : job.status}
                  </span>
                  {job.payment_status === "unpaid" && (
                    <Link
                      href={`/api/stripe/checkout?jobId=${job.id}`}
                      className="border-2 border-teal/25 text-teal text-xs px-3 py-1.5 rounded-full font-semibold hover:border-teal transition-colors"
                    >
                      Pay £149
                    </Link>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <Link href="/api/stripe/portal" className="text-sm text-brand-slate hover:text-teal transition-colors">
        Manage billing →
      </Link>
    </div>
  )
}
