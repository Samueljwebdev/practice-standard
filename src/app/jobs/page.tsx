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
  if (searchParams.q) {
    query = query.textSearch("title", searchParams.q, { type: "websearch" })
  }

  const { data: jobs } = await query.limit(50)

  if (!jobs?.length) {
    return <p className="text-slate-500 text-center py-16">No jobs found. Try adjusting your filters.</p>
  }

  return (
    <div className="space-y-3">
      {jobs.map(job => <JobCard key={job.id} job={job as unknown as Job} />)}
    </div>
  )
}

export default async function JobsPage({ searchParams }: PageProps) {
  const resolvedParams = await searchParams
  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold text-slate-900 mb-2">Healthcare Jobs UK</h1>
      <p className="text-slate-500 mb-6">Dental, veterinary, optician, aesthetic, physio and GP roles.</p>
      <Suspense fallback={null}>
        <JobFilters />
      </Suspense>
      <div className="mt-6">
        <Suspense fallback={<p className="text-slate-500">Loading jobs...</p>}>
          <JobList searchParams={resolvedParams} />
        </Suspense>
      </div>
    </div>
  )
}
