import { HiringCostCalculator } from "@/components/tools/HiringCostCalculator"
import { getBaseUrl } from "@/lib/seo"
import Link from "next/link"
import type { Metadata } from "next"

export function generateMetadata(): Metadata {
  const base = getBaseUrl()
  return {
    title: "Recruitment Agency Fee Calculator | The Practice Standard",
    description: "How much are recruitment agencies really costing your practice? Calculate your annual agency spend vs a flat-fee job board, free. Built for UK private healthcare practices.",
    alternates: { canonical: `${base}/tools/hiring-cost-calculator` },
  }
}

export default function HiringCostCalculatorPage() {
  const base = getBaseUrl()
  return (
    <>
      <section className="relative overflow-hidden bg-white border-b border-navy/6">
        <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute right-0 top-0 h-[400px] w-[500px] -translate-y-1/4 translate-x-1/3 rounded-full bg-mint/15 blur-[120px]" />
        </div>
        <div className="relative mx-auto max-w-4xl px-6 pt-14 pb-9">
          <span className="inline-flex items-center gap-2.5 rounded-full border border-teal/20 bg-teal/5 px-4 py-1.5 mb-6">
            <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-teal">Free tool</span>
          </span>
          <h1 className="text-[clamp(1.8rem,4vw,2.8rem)] font-black leading-[0.98] tracking-[-0.03em] text-navy mb-3">
            What are recruitment agencies really costing you?
          </h1>
          <p className="text-brand-slate text-sm leading-relaxed max-w-xl">
            Drag the sliders to see your annual agency spend — and what the same hiring would cost on a flat-fee, private-practice job board.
          </p>
        </div>
      </section>

      <section className="bg-off-white px-6 py-10">
        <div className="mx-auto max-w-4xl">
          <HiringCostCalculator />
        </div>
      </section>

      {/* SEO supporting content */}
      <section className="bg-white px-6 py-14 border-t border-navy/6">
        <div className="mx-auto max-w-2xl space-y-6 text-[15px] leading-relaxed text-navy/80">
          <h2 className="text-xl font-bold text-navy">Why recruitment agencies cost so much</h2>
          <p>UK healthcare recruitment agencies typically charge 15–25% of a candidate&rsquo;s first-year salary as a placement fee. On a £45,000 hire at 20%, that&rsquo;s £9,000 — for one role. Hire three a year and you&rsquo;re spending £27,000 on agency fees alone, on top of the UK&rsquo;s £6,125 average internal cost-per-hire.</p>
          <p>For a private practice, that&rsquo;s not a line item — it&rsquo;s equipment, a treatment list, or a part-time salary. And it recurs with every hire.</p>
          <h2 className="text-xl font-bold text-navy">The flat-fee alternative</h2>
          <p>A job board built for private practice flips the model. The Practice Standard charges <strong className="text-navy">£149 per listing</strong> (30 days) or <strong className="text-navy">£249/month</strong> for unlimited roles across every discipline — no percentage of salary, no placement fee. A single avoided agency placement typically covers a year of listings.</p>
          <p>And because every candidate&rsquo;s professional registration (NMC, GDC, RCVS, GOC, HCPC) is verified, you skip the other hidden cost of cheap job boards: clinical time wasted screening unqualified applicants.</p>
          <h2 className="text-xl font-bold text-navy">How the calculator works</h2>
          <p>Agency cost = average salary × agency fee % × number of hires per year. The Practice Standard cost is the cheaper of pay-per-listing (£149 × hires) or Practice Pro (£249/month, unlimited). Your saving is the difference. Figures exclude VAT and are an estimate for comparison.</p>
          <div className="flex flex-wrap gap-3 pt-2">
            <Link href="/pricing" className="rounded-full bg-teal text-off-white text-sm px-5 py-2.5 font-semibold hover:bg-teal/90 transition-colors">See pricing</Link>
            <Link href="/salary-benchmark" className="rounded-full border-2 border-navy/15 text-navy text-sm px-5 py-2.5 font-semibold hover:border-teal hover:text-teal transition-colors">Get the salary benchmark</Link>
          </div>
        </div>
      </section>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org", "@type": "WebApplication",
        name: "Recruitment Agency Fee Calculator", applicationCategory: "BusinessApplication",
        operatingSystem: "Web", url: `${base}/tools/hiring-cost-calculator`,
        offers: { "@type": "Offer", price: "0", priceCurrency: "GBP" },
        description: "Calculate your annual recruitment agency spend vs a flat-fee private healthcare job board.",
      }) }} />
    </>
  )
}
