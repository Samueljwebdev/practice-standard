import { createClient } from "@/lib/supabase/server"
import { notFound } from "next/navigation"
import { PROFESSIONS, JOB_TYPES } from "@/lib/constants"
import { professionToSlug, getBaseUrl } from "@/lib/seo"
import Link from "next/link"
import { ApplyButton } from "@/components/jobs/ApplyButton"
import type { Metadata } from "next"

interface Props { params: Promise<{ slug: string }> }

function buildJobSchema(job: Record<string, unknown>, base: string): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "JobPosting",
    url: `${base}/jobs/${job.slug}`,
    identifier: {
      "@type": "PropertyValue",
      name: "The Practice Standard",
      value: job.id,
    },
    title: job.title,
    description: job.description,
    directApply: job.source !== "aggregated",
    hiringOrganization: {
      "@type": "Organization",
      name: (job.practices as Record<string, unknown> | null)?.name ?? job.external_org_name ?? "Practice",
      sameAs: (job.practices as Record<string, unknown> | null)?.website ?? job.external_org_url ?? undefined,
    },
    jobLocation: {
      "@type": "Place",
      address: {
        "@type": "PostalAddress",
        addressLocality: job.city ?? job.region,
        addressRegion: job.region,
        addressCountry: "GB",
      },
    },
    employmentType: job.job_type === "permanent" ? "FULL_TIME" : job.job_type === "part_time" ? "PART_TIME" : "TEMPORARY",
    datePosted: job.published_at,
    validThrough: job.expires_at,
    ...(job.salary_min ? {
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
    } : {}),
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const supabase = await createClient()
  const { data: job } = await supabase
    .from("jobs")
    .select("title, city, region, profession, source, external_org_name, noindex, practices(name)")
    .eq("slug", slug)
    .single()
  if (!job) return { title: "Job Not Found" }
  const org = (job as any).practices?.name ?? (job as any).external_org_name ?? "Private practice"
  return {
    title: `${job.title} — ${org} | The Practice Standard`,
    description: `${job.title} role in ${job.city ?? job.region}. Apply now on The Practice Standard.`,
    // Aggregated listings are noindexed to protect the domain's SEO.
    robots: { index: !(job as any).noindex, follow: true },
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
    const { data: candidate } = await supabase.from("candidates").select("id").eq("user_id", user.id).single()
    candidateId = candidate?.id ?? null
  }

  const base = getBaseUrl()
  const isExternal = job.source === "aggregated"
  const practicesData = job.practices as Record<string, unknown> | null
  const orgName = isExternal ? (job.external_org_name ?? "Private practice") : ((practicesData?.name as string) ?? "")
  const professionLabel = PROFESSIONS.find(p => p.value === job.profession)?.label ?? job.profession
  const typeLabel = JOB_TYPES.find(t => t.value === job.job_type)?.label ?? job.job_type
  const profSlug = professionToSlug(job.profession)

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <nav className="text-sm text-brand-slate mb-6 flex items-center gap-2 flex-wrap">
        <Link href="/jobs" className="hover:text-teal transition-colors">Jobs</Link>
        <span className="text-border">·</span>
        <Link href={`/roles/${profSlug}`} className="hover:text-teal transition-colors">{professionLabel}</Link>
        <span className="text-border">·</span>
        <span className="text-navy truncate">{job.title}</span>
      </nav>

      <div className="bg-white border border-border rounded-2xl p-8 space-y-6">
        <div>
          <div className="flex items-start justify-between gap-4 mb-2">
            <h1 className="text-2xl font-bold text-navy">{job.title}</h1>
            <span className="shrink-0 text-xs font-semibold bg-mint/20 text-teal px-2.5 py-1 rounded-full">{typeLabel}</span>
          </div>
          <p className="text-brand-slate font-medium">{orgName}</p>
          <p className="text-brand-slate text-sm">{job.city ?? job.region}</p>
        </div>

        <div className="flex flex-wrap gap-6 text-sm border-t border-b border-border py-4">
          <div>
            <p className="text-brand-slate text-xs uppercase tracking-wide mb-0.5">Profession</p>
            <p className="font-semibold text-navy">{professionLabel}</p>
          </div>
          <div>
            <p className="text-brand-slate text-xs uppercase tracking-wide mb-0.5">Type</p>
            <p className="font-semibold text-navy">{typeLabel}</p>
          </div>
          {(job.salary_min || job.salary_max) && (
            <div>
              <p className="text-brand-slate text-xs uppercase tracking-wide mb-0.5">Salary</p>
              <p className="font-semibold text-navy">
                {job.salary_min && job.salary_max
                  ? `£${job.salary_min.toLocaleString()} – £${job.salary_max.toLocaleString()}`
                  : job.salary_min
                  ? `From £${job.salary_min.toLocaleString()}`
                  : `Up to £${job.salary_max!.toLocaleString()}`}
              </p>
            </div>
          )}
        </div>

        <div>
          <h2 className="font-bold text-navy mb-3">About the role</h2>
          <div className="text-navy/75 whitespace-pre-wrap text-sm leading-relaxed">{job.description}</div>
        </div>

        {job.requirements && (
          <div>
            <h2 className="font-bold text-navy mb-3">Requirements</h2>
            <div className="text-navy/75 whitespace-pre-wrap text-sm leading-relaxed">{job.requirements}</div>
          </div>
        )}

        <div className="pt-2">
          {isExternal ? (
            <div className="space-y-2">
              <a
                href={job.source_url ?? job.external_org_url ?? "#"}
                target="_blank"
                rel="noopener noreferrer nofollow"
                className="flex w-full items-center justify-center bg-teal text-off-white px-6 py-3 rounded-full font-semibold text-sm hover:bg-teal/90 transition-colors"
              >
                Apply on {orgName}&rsquo;s website →
              </a>
              <p className="text-[11px] text-brand-slate/70 text-center">
                Sourced from {orgName}&rsquo;s public careers page · you apply directly with them.
                {" "}
                <a href="mailto:hello@thepracticestandard.co.uk?subject=Remove%20listing" className="underline hover:text-teal">Request removal</a>
              </p>
            </div>
          ) : !user ? (
            <Link
              href={`/auth/register?next=/jobs/${job.slug}`}
              className="flex w-full items-center justify-center bg-teal text-off-white px-6 py-3 rounded-full font-semibold text-sm hover:bg-teal/90 transition-colors"
            >
              Create free account to apply
            </Link>
          ) : candidateId ? (
            <ApplyButton jobId={job.id} candidateId={candidateId} profession={job.profession} />
          ) : (
            <p className="text-sm text-brand-slate text-center">Practice accounts cannot apply for jobs.</p>
          )}
        </div>
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [
              buildJobSchema(job as Record<string, unknown>, base),
              {
                "@type": "BreadcrumbList",
                itemListElement: [
                  { "@type": "ListItem", position: 1, name: "Home", item: base },
                  { "@type": "ListItem", position: 2, name: "Jobs", item: `${base}/jobs` },
                  { "@type": "ListItem", position: 3, name: professionLabel, item: `${base}/roles/${profSlug}` },
                  { "@type": "ListItem", position: 4, name: job.title as string, item: `${base}/jobs/${job.slug}` },
                ],
              },
            ],
          }),
        }}
      />
    </div>
  )
}
