import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import Link from "next/link"

const STATUS_COLOR: Record<string, string> = {
  active: "bg-mint/20 text-teal",
  draft: "bg-border text-brand-slate",
  expired: "bg-border text-brand-slate",
  filled: "bg-mint/20 text-teal",
}

const STEPS = [
  { n: 1, label: "Create account", done: true },
  { n: 2, label: "Post your first role", done: false },
  { n: 3, label: "Receive applications", done: false },
]

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

  const hasJobs = (jobs?.length ?? 0) > 0
  const isSubscribed = practice.subscription_status === "active"

  return (
    <div className="max-w-4xl mx-auto px-4 py-10 space-y-8">

      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs font-semibold text-teal uppercase tracking-[0.18em] mb-1">Practice dashboard</p>
          <h1 className="text-2xl font-bold text-navy">{practice.name}</h1>
        </div>
        {hasJobs && (
          <Link
            href="/practice/post"
            className="bg-teal text-off-white text-sm px-5 py-2.5 rounded-full font-semibold hover:bg-teal/90 transition-colors"
          >
            + Post a job
          </Link>
        )}
      </div>

      {/* First-time onboarding — shown before any jobs are posted */}
      {!hasJobs && (
        <div className="bg-white border border-border rounded-2xl overflow-hidden">
          <div className="bg-navy px-8 py-6">
            <p className="text-xs font-semibold text-mint uppercase tracking-[0.18em] mb-2">Getting started</p>
            <h2 className="text-xl font-bold text-white mb-1">Your first listing takes about 5 minutes.</h2>
            <p className="text-white/55 text-sm">It goes live immediately after payment — no waiting, no review queue.</p>
          </div>

          {/* Step tracker */}
          <div className="px-8 py-6 border-b border-border">
            <div className="flex items-center gap-0">
              {STEPS.map((step, i) => (
                <div key={step.n} className="flex items-center gap-0 flex-1 last:flex-none">
                  <div className="flex items-center gap-2.5">
                    <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${step.done ? "bg-teal text-white" : i === 1 ? "bg-navy text-white" : "bg-border text-brand-slate"}`}>
                      {step.done ? (
                        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      ) : step.n}
                    </div>
                    <span className={`text-xs font-medium whitespace-nowrap ${i === 1 ? "text-navy" : "text-brand-slate"}`}>{step.label}</span>
                  </div>
                  {i < STEPS.length - 1 && (
                    <div className="h-px bg-border flex-1 mx-3" />
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="px-8 py-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <p className="text-sm text-navy font-medium mb-1">Ready to post your first role?</p>
              <p className="text-xs text-brand-slate">£149 per listing · 30 days active · Applications in your dashboard</p>
            </div>
            <Link
              href="/practice/post"
              className="shrink-0 bg-teal text-off-white px-6 py-3 rounded-full text-sm font-semibold hover:bg-teal/90 transition-colors"
            >
              Post your first role →
            </Link>
          </div>
        </div>
      )}

      {/* Jobs list */}
      {hasJobs && (
        <div>
          <h2 className="font-bold text-navy mb-4">Your listings</h2>
          <div className="space-y-3">
            {jobs!.map((job: any) => (
              <div key={job.id} className="bg-white border border-border rounded-2xl px-5 py-4 flex items-center justify-between gap-4">
                <div className="min-w-0">
                  <p className="font-semibold text-navy truncate">{job.title}</p>
                  <p className="text-sm text-brand-slate mt-0.5">
                    {job.city ?? job.region} · Posted {new Date(job.created_at).toLocaleDateString("en-GB")}
                  </p>
                </div>
                <div className="flex items-center gap-3 shrink-0">
                  <span className="text-sm text-brand-slate">
                    {(job.applications as any)?.[0]?.count ?? 0} applicants
                  </span>
                  <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
                    job.payment_status === "unpaid"
                      ? "bg-amber-100 text-amber-700"
                      : STATUS_COLOR[job.status] ?? "bg-border text-brand-slate"
                  }`}>
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
        </div>
      )}

      {/* Subscription upsell — only shown after they've posted at least one job */}
      {hasJobs && !isSubscribed && (
        <div className="bg-navy rounded-2xl p-6 flex items-center justify-between gap-4">
          <div>
            <p className="font-bold text-white mb-1">Hiring more than once? Unlimited listings for £249/month.</p>
            <p className="text-sm text-white/60">One agency hire costs £7,000+. Practice Pro pays for itself on the first listing.</p>
          </div>
          <Link
            href="/api/stripe/checkout?mode=subscription"
            className="shrink-0 bg-mint text-navy text-sm px-5 py-2.5 rounded-full font-semibold hover:bg-mint/85 transition-colors"
          >
            Upgrade to Pro
          </Link>
        </div>
      )}

      <Link href="/api/stripe/portal" className="text-sm text-brand-slate hover:text-teal transition-colors">
        Manage billing →
      </Link>
    </div>
  )
}
