import Link from "next/link"
import { notFound } from "next/navigation"
import { AnimateIn } from "@/components/ui/AnimateIn"
import { ALTERNATIVES, getAlternative } from "@/lib/alternatives-content"
import { getBaseUrl } from "@/lib/seo"
import type { Metadata } from "next"

type Props = { params: Promise<{ competitor: string }> }

export function generateStaticParams() {
  return Object.keys(ALTERNATIVES).map(slug => ({ competitor: slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { competitor } = await params
  const content = getAlternative(competitor)
  if (!content) return {}
  const base = getBaseUrl()
  return {
    title: content.metaTitle,
    description: content.metaDescription,
    alternates: { canonical: `${base}/alternatives/${competitor}` },
  }
}

export default async function AlternativePage({ params }: Props) {
  const { competitor } = await params
  const content = getAlternative(competitor)
  if (!content) notFound()

  const base = getBaseUrl()

  return (
    <>
      <div className="max-w-4xl mx-auto px-4 py-20">

        {/* Header */}
        <AnimateIn>
          <div className="text-center mb-16">
            <p className="text-xs font-semibold text-teal uppercase tracking-[0.18em] mb-4">
              {content.competitor} Alternative
            </p>
            <h1 className="text-3xl md:text-4xl font-bold text-navy mb-5 leading-tight">
              {content.headline}
            </h1>
            <p className="text-brand-slate max-w-2xl mx-auto leading-relaxed">
              {content.subheadline}
            </p>
            <div className="mt-8 flex flex-wrap gap-3 justify-center">
              <Link
                href="/auth/register"
                className="bg-teal text-off-white px-6 py-3 rounded-full font-semibold text-sm hover:bg-teal/90 transition-colors"
              >
                Post a role — from £149
              </Link>
              <Link
                href="/pricing"
                className="border-2 border-border text-navy px-6 py-3 rounded-full font-semibold text-sm hover:border-teal hover:text-teal transition-colors"
              >
                See pricing
              </Link>
            </div>
          </div>
        </AnimateIn>

        {/* Competitor summary */}
        <AnimateIn delay={0.05}>
          <div className="bg-off-white border border-border rounded-2xl p-7 mb-14">
            <p className="text-xs font-semibold text-brand-slate uppercase tracking-[0.18em] mb-3">
              About {content.competitor}
            </p>
            <p className="text-navy/75 leading-relaxed text-sm">{content.competitorSummary}</p>
          </div>
        </AnimateIn>

        {/* Pain points */}
        <AnimateIn delay={0.05}>
          <div className="mb-16">
            <p className="text-xs font-semibold text-brand-slate uppercase tracking-[0.18em] mb-3">
              The problems
            </p>
            <h2 className="text-xl font-bold text-navy mb-8">
              Why practices move away from {content.competitor}
            </h2>
            <div className="space-y-4">
              {content.painPoints.map((point, i) => (
                <div key={i} className="bg-white border border-border rounded-2xl p-6">
                  <div className="flex items-start gap-4">
                    <div className="shrink-0 w-7 h-7 rounded-full bg-red-50 border border-red-100 flex items-center justify-center mt-0.5">
                      <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" className="text-red-400"><path d="M18 6 6 18M6 6l12 12"/></svg>
                    </div>
                    <div>
                      <p className="font-semibold text-navy mb-1.5">{point.heading}</p>
                      <p className="text-brand-slate text-sm leading-relaxed">{point.body}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </AnimateIn>

        {/* Comparison table */}
        <AnimateIn delay={0.05}>
          <div className="mb-16">
            <p className="text-xs font-semibold text-brand-slate uppercase tracking-[0.18em] mb-3">
              Side by side
            </p>
            <h2 className="text-xl font-bold text-navy mb-7">
              {content.competitor} vs The Practice Standard
            </h2>
            <div className="bg-off-white border border-border rounded-2xl overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left px-5 py-3 text-brand-slate font-semibold text-xs uppercase tracking-wide">Feature</th>
                      <th className="text-left px-5 py-3 text-brand-slate font-semibold text-xs uppercase tracking-wide">{content.competitor}</th>
                      <th className="text-left px-5 py-3 text-teal font-semibold text-xs uppercase tracking-wide">The Practice Standard</th>
                    </tr>
                  </thead>
                  <tbody>
                    {content.comparison.map((row, i) => (
                      <tr key={i} className="border-b border-border/50">
                        <td className="px-5 py-3.5 text-navy/60 text-xs font-medium">{row.feature}</td>
                        <td className="px-5 py-3.5 text-navy/55 text-sm">{row.competitor}</td>
                        <td className="px-5 py-3.5 text-teal font-semibold text-sm">{row.tps}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </AnimateIn>

        {/* CTA banner */}
        <AnimateIn delay={0.05}>
          <div className="bg-navy rounded-2xl p-8 md:p-10 mb-16 text-center">
            <p className="text-xl font-bold text-white mb-3">{content.cta}</p>
            <p className="text-white/50 text-sm mb-7">
              All 88 regulated professions. 12 UK regions. Candidates always free.
            </p>
            <Link
              href="/auth/register"
              className="inline-flex bg-mint text-navy px-8 py-3 rounded-full font-semibold text-sm hover:bg-mint/85 transition-colors"
            >
              Get started — from £149
            </Link>
          </div>
        </AnimateIn>

        {/* FAQ */}
        <AnimateIn delay={0.05}>
          <div className="mb-16">
            <p className="text-xs font-semibold text-brand-slate uppercase tracking-[0.18em] mb-8">
              Common questions
            </p>
            <div className="space-y-6">
              {content.faq.map((item, i) => (
                <div key={i} className="border-b border-border pb-6 last:border-0">
                  <p className="font-semibold text-navy mb-2">{item.q}</p>
                  <p className="text-brand-slate text-sm leading-relaxed">{item.a}</p>
                </div>
              ))}
            </div>
          </div>
        </AnimateIn>

        {/* Other alternatives */}
        <AnimateIn delay={0.05}>
          <div className="bg-off-white border border-border rounded-2xl p-7">
            <p className="text-xs font-semibold text-brand-slate uppercase tracking-[0.18em] mb-4">
              More comparisons
            </p>
            <div className="flex flex-wrap gap-2">
              {Object.values(ALTERNATIVES)
                .filter(a => a.slug !== competitor)
                .map(alt => (
                  <Link
                    key={alt.slug}
                    href={`/alternatives/${alt.slug}`}
                    className="text-sm text-navy/65 bg-white border border-border px-3 py-1.5 rounded-full hover:border-teal hover:text-teal transition-colors"
                  >
                    vs {alt.competitor}
                  </Link>
                ))}
            </div>
          </div>
        </AnimateIn>

      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [
              {
                "@type": "FAQPage",
                mainEntity: content.faq.map(item => ({
                  "@type": "Question",
                  name: item.q,
                  acceptedAnswer: { "@type": "Answer", text: item.a },
                })),
              },
              {
                "@type": "BreadcrumbList",
                itemListElement: [
                  { "@type": "ListItem", position: 1, name: "Home", item: base },
                  { "@type": "ListItem", position: 2, name: "Alternatives", item: `${base}/alternatives` },
                  { "@type": "ListItem", position: 3, name: content.competitor, item: `${base}/alternatives/${competitor}` },
                ],
              },
            ],
          }),
        }}
      />
    </>
  )
}
