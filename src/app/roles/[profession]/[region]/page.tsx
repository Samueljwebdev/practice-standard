import { notFound } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { UK_REGIONS } from "@/lib/constants"
import { getProfessionBySlug, slugToRegion, regionToSlug, getBaseUrl } from "@/lib/seo"
import { JobCard } from "@/components/jobs/JobCard"
import { AnimateIn } from "@/components/ui/AnimateIn"
import Link from "next/link"
import type { Metadata } from "next"
import type { Job } from "@/types/database"

interface Props { params: Promise<{ profession: string; region: string }> }

export const revalidate = 3600

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { profession, region } = await params
  const prof = getProfessionBySlug(profession)
  const regionLabel = slugToRegion(region)
  if (!prof || !regionLabel) return { title: "Jobs | The Practice Standard" }
  const base = getBaseUrl()
  return {
    title: `${prof.label} Jobs in ${regionLabel} | The Practice Standard`,
    description: `Find ${prof.label} jobs in ${regionLabel}. Browse permanent, part-time, locum and contract ${prof.label.toLowerCase()} roles on The Practice Standard.`,
    alternates: { canonical: `${base}/roles/${profession}/${region}` },
  }
}

export default async function ProfessionRegionPage({ params }: Props) {
  const { profession: profSlug, region: regionSlug } = await params
  const prof = getProfessionBySlug(profSlug)
  const regionLabel = slugToRegion(regionSlug)
  if (!prof || !regionLabel) notFound()

  const supabase = await createClient()
  const { data: jobs } = await supabase
    .from("jobs")
    .select("*, practices(name, practice_type, city)")
    .eq("status", "active")
    .eq("payment_status", "paid")
    .eq("profession", prof.value)
    .eq("region", regionLabel)
    .order("published_at", { ascending: false })
    .limit(50)

  const base = getBaseUrl()
  const count = jobs?.length ?? 0

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <nav className="text-sm text-brand-slate mb-6 flex items-center gap-2 flex-wrap">
        <Link href="/" className="hover:text-teal transition-colors">Home</Link>
        <span className="text-border">·</span>
        <Link href="/jobs" className="hover:text-teal transition-colors">Jobs</Link>
        <span className="text-border">·</span>
        <Link href={`/roles/${profSlug}`} className="hover:text-teal transition-colors">{prof.label}</Link>
        <span className="text-border">·</span>
        <span className="text-navy">{regionLabel}</span>
      </nav>

      <AnimateIn>
        <h1 className="text-3xl md:text-4xl font-bold text-navy mb-3">
          {prof.label} Jobs in {regionLabel}
        </h1>
        <p className="text-brand-slate mb-8">
          {count > 0
            ? `${count} ${prof.label.toLowerCase()} role${count !== 1 ? "s" : ""} in ${regionLabel}`
            : `No ${prof.label.toLowerCase()} roles in ${regionLabel} right now — check back soon or post one.`}
        </p>
      </AnimateIn>

      {count > 0 ? (
        <AnimateIn delay={0.05}>
          <div className="space-y-3 mb-12">
            {jobs!.map(job => <JobCard key={job.id} job={job as unknown as Job} />)}
          </div>
        </AnimateIn>
      ) : (
        <AnimateIn delay={0.05}>
          <div className="bg-white border border-border rounded-2xl p-10 text-center mb-12">
            <p className="text-navy font-semibold mb-2">No roles in {regionLabel} yet</p>
            <p className="text-brand-slate text-sm mb-6">
              Be the first to post a {prof.label} role in {regionLabel}.
            </p>
            <div className="flex flex-wrap gap-3 justify-center">
              <Link
                href="/auth/register"
                className="inline-flex bg-teal text-off-white px-5 py-2.5 rounded-full text-sm font-semibold hover:bg-teal/90 transition-colors"
              >
                Post a job — from £149
              </Link>
              <Link
                href={`/roles/${profSlug}`}
                className="inline-flex border-2 border-teal/25 text-teal px-5 py-2.5 rounded-full text-sm font-semibold hover:border-teal transition-colors"
              >
                All UK {prof.label} jobs
              </Link>
            </div>
          </div>
        </AnimateIn>
      )}

      <AnimateIn delay={0.1}>
        <div className="border-t border-border pt-8">
          <p className="text-xs font-semibold text-brand-slate uppercase tracking-[0.15em] mb-4">
            Other regions
          </p>
          <div className="flex flex-wrap gap-2">
            {UK_REGIONS.filter(r => r !== regionLabel).map(region => (
              <Link
                key={region}
                href={`/roles/${profSlug}/${regionToSlug(region)}`}
                className="px-3 py-1.5 text-sm border border-border rounded-full text-navy hover:bg-teal hover:text-off-white hover:border-teal transition-all duration-200"
              >
                {region}
              </Link>
            ))}
          </div>
        </div>
      </AnimateIn>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [
              {
                "@type": "BreadcrumbList",
                itemListElement: [
                  { "@type": "ListItem", position: 1, name: "Home", item: base },
                  { "@type": "ListItem", position: 2, name: "Jobs", item: `${base}/jobs` },
                  { "@type": "ListItem", position: 3, name: `${prof.label} Jobs`, item: `${base}/roles/${profSlug}` },
                  { "@type": "ListItem", position: 4, name: `${prof.label} Jobs in ${regionLabel}`, item: `${base}/roles/${profSlug}/${regionSlug}` },
                ],
              },
              ...(jobs && jobs.length > 0 ? [{
                "@type": "ItemList",
                name: `${prof.label} Jobs in ${regionLabel}`,
                numberOfItems: count,
                itemListElement: (jobs as Job[]).map((job, i) => ({
                  "@type": "ListItem",
                  position: i + 1,
                  url: `${base}/jobs/${job.slug}`,
                  name: job.title,
                })),
              }] : []),
            ],
          }),
        }}
      />
    </div>
  )
}
