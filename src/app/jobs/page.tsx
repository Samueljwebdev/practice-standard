import { createClient } from "@/lib/supabase/server"
import { JobCard } from "@/components/jobs/JobCard"
import { JobFilters } from "@/components/jobs/JobFilters"
import { Suspense } from "react"
import type { Job } from "@/types/database"

interface PageProps {
  searchParams: Promise<{ q?: string; profession?: string; region?: string; type?: string }>
}

async function JobList({ searchParams }: { searchParams: Awaited<PageProps["searchParams"]> }) {
  const supabase = await createClient()
  let query = supabase
    .from("jobs")
    .select("*, practices(name, practice_type, city)")
    .eq("status", "active")
    .eq("payment_status", "paid")
    .order("published_at", { ascending: false })

  if (searchParams.profession) query = query.eq("profession", searchParams.profession)
  if (searchParams.region) query = query.eq("region", searchParams.region)
  if (searchParams.type) query = query.eq("job_type", searchParams.type)
  if (searchParams.q) query = query.textSearch("title", searchParams.q, { type: "websearch" })

  const { data: jobs } = await query.limit(50)

  if (!jobs?.length) {
    return (
      <div className="bg-white border border-border rounded-2xl p-12 text-center mt-6">
        <p className="text-navy font-semibold mb-2">No roles found</p>
        <p className="text-brand-slate text-sm">Try adjusting your filters or check back soon.</p>
      </div>
    )
  }

  return (
    <div className="space-y-3 mt-6">
      {jobs.map(job => <JobCard key={job.id} job={job as unknown as Job} />)}
    </div>
  )
}

export default async function JobsPage({ searchParams }: PageProps) {
  const resolvedParams = await searchParams
  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <div className="mb-6">
        <p className="text-xs font-semibold text-teal uppercase tracking-[0.18em] mb-2">Open roles</p>
        <h1 className="text-2xl font-bold text-navy">Healthcare Jobs UK</h1>
        <p className="text-brand-slate text-sm mt-1">Dental, veterinary, optician, aesthetic, physio and GP roles.</p>
      </div>
      <Suspense fallback={null}>
        <JobFilters />
      </Suspense>
      <Suspense fallback={<p className="text-brand-slate text-sm mt-6">Loading jobs…</p>}>
        <JobList searchParams={resolvedParams} />
      </Suspense>
    </div>
  )
}
