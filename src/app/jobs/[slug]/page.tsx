import { createClient } from "@/lib/supabase/server"
import { notFound } from "next/navigation"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { PROFESSIONS, JOB_TYPES } from "@/lib/constants"
import Link from "next/link"
import type { Metadata } from "next"

interface Props { params: Promise<{ slug: string }> }

function buildJobSchema(job: Record<string, unknown>): string {
  return JSON.stringify({
    "@context": "https://schema.org",
    "@type": "JobPosting",
    title: job.title,
    description: job.description,
    hiringOrganization: {
      "@type": "Organization",
      name: (job.practices as Record<string, unknown> | null)?.name ?? "Practice",
    },
    jobLocation: {
      "@type": "Place",
      address: {
        "@type": "PostalAddress",
        addressLocality: job.city ?? job.region,
        addressCountry: "GB",
      },
    },
    employmentType: job.job_type === "permanent" ? "FULL_TIME" : job.job_type === "part_time" ? "PART_TIME" : "TEMPORARY",
    datePosted: job.published_at,
    validThrough: job.expires_at,
    ...(job.salary_min
      ? {
          baseSalary: {
            "@type": "MonetaryAmount",
            currency: "GBP",
            value: {
              "@type": "QuantitativeValue",
              minValue: job.salary_min,
              maxValue: job.salary_max ?? job.salary_min,
              unitText: "YEAR",
            },
          },
        }
      : {}),
  })
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const supabase = await createClient()
  const { data: job } = await supabase
    .from("jobs")
    .select("title, city, region, profession, practices(name)")
    .eq("slug", slug)
    .single()

  if (!job) return { title: "Job Not Found" }
  return {
    title: `${job.title} — ${(job as Record<string, unknown> & { practices?: { name?: string } }).practices?.name} | The Practice Standard`,
    description: `${job.title} role in ${job.city ?? job.region}. Apply now on The Practice Standard.`,
  }
}

export default async function JobDetailPage({ params }: Props) {
  const { slug } = await params
  const supabase = await createClient()
  const { data: job } = await supabase
    .from("jobs")
    .select("*, practices(name, practice_type, city, website)")
    .eq("slug", slug)
    .eq("status", "active")
    .single()

  if (!job) notFound()

  const { data: { user } } = await supabase.auth.getUser()
  let candidateId: string | null = null
  if (user) {
    const { data: candidate } = await supabase
      .from("candidates")
      .select("id")
      .eq("user_id", user.id)
      .single()
    candidateId = candidate?.id ?? null
  }

  const practicesData = job.practices as Record<string, unknown> | null
  const professionLabel = PROFESSIONS.find(p => p.value === job.profession)?.label ?? job.profession
  const typeLabel = JOB_TYPES.find(t => t.value === job.job_type)?.label ?? job.job_type

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <div className="mb-2">
        <Link href="/jobs" className="text-sm text-slate-500 hover:text-slate-900">← Back to jobs</Link>
      </div>
      <div className="bg-white border rounded-lg p-8 space-y-6">
        <div>
          <div className="flex items-start justify-between gap-4 mb-2">
            <h1 className="text-2xl font-bold text-slate-900">{job.title}</h1>
            <Badge>{typeLabel}</Badge>
          </div>
          <p className="text-slate-600">{practicesData?.name as string ?? ""}</p>
          <p className="text-slate-500 text-sm">{job.city ?? job.region}</p>
        </div>

        <div className="flex flex-wrap gap-4 text-sm border-t border-b py-4">
          <div><span className="text-slate-500">Profession</span><br /><span className="font-medium">{professionLabel}</span></div>
          <div><span className="text-slate-500">Type</span><br /><span className="font-medium">{typeLabel}</span></div>
          {(job.salary_min || job.salary_max) && (
            <div>
              <span className="text-slate-500">Salary</span><br />
              <span className="font-medium">
                {job.salary_min && job.salary_max
                  ? `£${job.salary_min.toLocaleString()} – £${job.salary_max.toLocaleString()}`
                  : job.salary_min
                  ? `From £${job.salary_min.toLocaleString()}`
                  : `Up to £${job.salary_max!.toLocaleString()}`}
              </span>
            </div>
          )}
        </div>

        <div>
          <h2 className="font-semibold mb-2">About the role</h2>
          <div className="text-slate-700 whitespace-pre-wrap text-sm leading-relaxed">{job.description}</div>
        </div>

        {job.requirements && (
          <div>
            <h2 className="font-semibold mb-2">Requirements</h2>
            <div className="text-slate-700 whitespace-pre-wrap text-sm leading-relaxed">{job.requirements}</div>
          </div>
        )}

        <div className="pt-2">
          {!user ? (
            <Link
              href={`/auth/register?next=/jobs/${job.slug}`}
              className="flex w-full items-center justify-center rounded-lg bg-primary px-3 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/80"
            >
              Create free account to apply
            </Link>
          ) : candidateId ? (
            <form action="/api/jobs/apply" method="POST">
              <input type="hidden" name="jobId" value={job.id} />
              <input type="hidden" name="candidateId" value={candidateId} />
              <Button type="submit" className="w-full">Apply for this role</Button>
            </form>
          ) : (
            <p className="text-sm text-slate-500 text-center">Practice accounts cannot apply for jobs.</p>
          )}
        </div>
      </div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: buildJobSchema(job as Record<string, unknown>) }}
      />
    </div>
  )
}
