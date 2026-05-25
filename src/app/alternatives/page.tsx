import Link from "next/link"
import { AnimateIn } from "@/components/ui/AnimateIn"
import { ALTERNATIVES } from "@/lib/alternatives-content"
import { getBaseUrl } from "@/lib/seo"
import type { Metadata } from "next"

export function generateMetadata(): Metadata {
  const base = getBaseUrl()
  return {
    title: "Job Board Alternatives for Private Healthcare | The Practice Standard",
    description: "Compare The Practice Standard to Indeed, Reed, BDJ Jobs, Vet Times Jobs, recruitment agencies, and NHS Jobs. The cheapest specialist board for regulated UK private healthcare.",
    alternates: { canonical: `${base}/alternatives` },
  }
}

export default function AlternativesIndexPage() {
  const base = getBaseUrl()
  return (
    <>
      <div className="max-w-4xl mx-auto px-4 py-20">
        <AnimateIn>
          <div className="text-center mb-14">
            <p className="text-xs font-semibold text-teal uppercase tracking-[0.18em] mb-4">Comparisons</p>
            <h1 className="text-3xl md:text-4xl font-bold text-navy mb-4 leading-tight">
              How The Practice Standard compares
            </h1>
            <p className="text-brand-slate max-w-xl mx-auto leading-relaxed">
              Evaluating your options for private healthcare hiring? See how we stack up against the alternatives — on price, quality, and coverage.
            </p>
          </div>
        </AnimateIn>

        <div className="grid md:grid-cols-2 gap-4">
          {Object.values(ALTERNATIVES).map((alt, i) => (
            <AnimateIn key={alt.slug} delay={i * 0.05}>
              <Link
                href={`/alternatives/${alt.slug}`}
                className="group block bg-white border border-border rounded-2xl p-6 hover:border-teal/40 hover:shadow-sm transition-all"
              >
                <p className="text-[10px] font-bold text-teal uppercase tracking-widest mb-2">vs {alt.competitor}</p>
                <p className="font-bold text-navy text-sm mb-2 group-hover:text-teal transition-colors">{alt.headline}</p>
                <p className="text-brand-slate text-xs leading-relaxed line-clamp-2">{alt.competitorSummary}</p>
                <p className="mt-4 text-xs font-semibold text-teal">Compare →</p>
              </Link>
            </AnimateIn>
          ))}
        </div>
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Home", item: base },
              { "@type": "ListItem", position: 2, name: "Alternatives", item: `${base}/alternatives` },
            ],
          }),
        }}
      />
    </>
  )
}
