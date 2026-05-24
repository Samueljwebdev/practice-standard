import { notFound } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { UK_REGIONS, PROFESSIONS } from "@/lib/constants"
import { getProfessionBySlug, regionToSlug, professionToSlug, getBaseUrl } from "@/lib/seo"
import { PROFESSION_CONTENT } from "@/lib/profession-content"
import { JobCard } from "@/components/jobs/JobCard"
import { AnimateIn } from "@/components/ui/AnimateIn"
import Link from "next/link"
import type { Metadata } from "next"
import type { Job } from "@/types/database"

interface Props { params: Promise<{ profession: string }> }

export const revalidate = 3600

export function generateStaticParams() {
  return PROFESSIONS.map(p => ({ profession: professionToSlug(p.value) }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { profession } = await params
  const prof = getProfessionBySlug(profession)
  if (!prof) return { title: "Jobs | The Practice Standard" }
  const base = getBaseUrl()
  return {
    title: `${prof.label} Jobs UK | The Practice Standard`,
    description: `Find ${prof.label} jobs across the UK. Browse permanent, part-time, locum and contract roles on The Practice Standard — the UK's niche healthcare job board.`,
    alternates: { canonical: `${base}/roles/${profession}` },
  }
}

export default async function ProfessionPage({ params }: Props) {
  const { profession: profSlug } = await params
  const prof = getProfessionBySlug(profSlug)
  if (!prof) notFound()

  const supabase = await createClient()
  const { data: jobs } = await supabase
    .from("jobs")
    .select("*, practices(name, practice_type, city)")
    .eq("status", "active")
    .eq("payment_status", "paid")
    .eq("profession", prof.value)
    .order("published_at", { ascending: false })
    .limit(50)

  const base = getBaseUrl()
  const count = jobs?.length ?? 0
  const content = PROFESSION_CONTENT[prof.value] ?? null

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <nav className="text-sm text-brand-slate mb-6 flex items-center gap-2">
        <Link href="/" className="hover:text-teal transition-colors">Home</Link>
        <span className="text-border">·</span>
        <Link href="/jobs" className="hover:text-teal transition-colors">Jobs</Link>
        <span className="text-border">·</span>
        <span className="text-navy">{prof.label}</span>
      </nav>

      <AnimateIn>
        <h1 className="text-3xl md:text-4xl font-bold text-navy mb-3">
          {prof.label} Jobs in the UK
        </h1>
        <p className="text-brand-slate mb-8">
          {count > 0
            ? `${count} ${prof.label.toLowerCase()} role${count !== 1 ? "s" : ""} currently available`
            : `No ${prof.label.toLowerCase()} roles listed right now — check back soon or post one.`}
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
            <p className="text-navy font-semibold mb-2">No roles posted yet</p>
            <p className="text-brand-slate text-sm mb-6">
              Be the first to post a {prof.label} role and reach verified UK professionals.
            </p>
            <Link
              href="/auth/register"
              className="inline-flex bg-teal text-off-white px-5 py-2.5 rounded-full text-sm font-semibold hover:bg-teal/90 transition-colors"
            >
              Post a job — from £149
            </Link>
          </div>
        </AnimateIn>
      )}

      {content && (
        <AnimateIn delay={0.12}>
          <div className="bg-white border border-border rounded-2xl p-8 mb-8 space-y-6">
            <div>
              <p className="text-xs font-semibold text-teal uppercase tracking-[0.15em] mb-3">About this role</p>
              <p className="text-navy/75 text-sm leading-relaxed">{content.intro}</p>
              <div className="flex flex-wrap gap-4 mt-4 text-sm">
                {content.regulator && (
                  <div>
                    <span className="text-brand-slate text-xs uppercase tracking-wide">Regulator </span>
                    <span className="text-navy font-medium">{content.regulator}</span>
                  </div>
                )}
                <div>
                  <span className="text-brand-slate text-xs uppercase tracking-wide">Typical salary </span>
                  <span className="text-navy font-medium">{content.salaryRange}</span>
                </div>
              </div>
            </div>
            <div className="border-t border-border pt-6 space-y-4">
              <p className="text-xs font-semibold text-brand-slate uppercase tracking-[0.15em]">Common questions</p>
              {content.faq.map((item, i) => (
                <div key={i}>
                  <p className="text-sm font-semibold text-navy mb-1">{item.q}</p>
                  <p className="text-sm text-navy/70 leading-relaxed">{item.a}</p>
                </div>
              ))}
            </div>
          </div>
        </AnimateIn>
      )}

      <AnimateIn delay={0.1}>
        <div className="border-t border-border pt-8">
          <p className="text-xs font-semibold text-brand-slate uppercase tracking-[0.15em] mb-4">
            {prof.label} jobs by region
          </p>
          <div className="flex flex-wrap gap-2">
            {UK_REGIONS.map(region => (
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
                ],
              },
              ...(jobs && jobs.length > 0 ? [{
                "@type": "ItemList",
                name: `${prof.label} Jobs in the UK`,
                numberOfItems: count,
                itemListElement: (jobs as Job[]).map((job, i) => ({
                  "@type": "ListItem",
                  position: i + 1,
                  url: `${base}/jobs/${job.slug}`,
                  name: job.title,
                })),
              }] : []),
              ...(content ? [{
                "@type": "FAQPage",
                mainEntity: content.faq.map(item => ({
                  "@type": "Question",
                  name: item.q,
                  acceptedAnswer: { "@type": "Answer", text: item.a },
                })),
              }] : []),
            ],
          }),
        }}
      />
    </div>
  )
}
