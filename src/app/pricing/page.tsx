import Link from "next/link"
import { AnimateIn } from "@/components/ui/AnimateIn"
import { LISTING_PRICE_GBP, SUBSCRIPTION_PRICE_GBP } from "@/lib/constants"
import { getBaseUrl } from "@/lib/seo"
import type { Metadata } from "next"

export function generateMetadata(): Metadata {
  const base = getBaseUrl()
  return {
    title: "Pricing | The Practice Standard — UK Private Healthcare Jobs",
    description: `Post private healthcare jobs from £${LISTING_PRICE_GBP}. Cheaper than every specialist board, covers all disciplines. Candidates always free. No agency fees.`,
    alternates: { canonical: `${base}/pricing` },
  }
}

const COMPARISON = [
  { name: "Vet Times Jobs", price: "£595 +VAT", note: "Vet only" },
  { name: "BDJ Jobs (dental)", price: "£430–£790 +VAT", note: "Dental only" },
  { name: "Indeed (sponsored)", price: "£700+ /month", note: "All sectors, unfiltered" },
  { name: "CSP Jobs (physio)", price: "£220–£370 +VAT", note: "Physio only" },
  { name: "Reed", price: "£199–£799 +VAT", note: "All sectors, unfiltered" },
]

const FAQ = [
  {
    q: "How long does a listing stay live?",
    a: "Pay-per-listing roles are active for 30 days. Practice Pro listings stay live for as long as your subscription is active — no 30-day expiry.",
  },
  {
    q: "Can I post roles across different disciplines?",
    a: "Yes — that's the point. You can post a veterinary nurse role, an operations manager role, and a receptionist role all from the same account. No other specialist board lets you do this.",
  },
  {
    q: "Do candidates pay anything?",
    a: "Never. Candidates can search, browse, and apply for free — always. No registration fee, no application fee, no premium tier.",
  },
  {
    q: "What's included in Practice Pro?",
    a: `Practice Pro is £${SUBSCRIPTION_PRICE_GBP}/month and includes unlimited job listings (no per-post charges), featured placement in search results, applications dashboard, and email notifications per applicant. Cancel any time — no contract.`,
  },
  {
    q: "Why is it cheaper than BDJ Jobs or Vet Times?",
    a: "Those boards rely on institutional brand trust and print advertising legacy. We're digital-first and built specifically for self-serve posting. Lower overhead, passed on in pricing.",
  },
  {
    q: "What if I only hire once or twice a year?",
    a: `Pay-per-listing at £${LISTING_PRICE_GBP} is built for you — no monthly commitment, no subscription. Post when you need to, pay once.`,
  },
  {
    q: "Is there a free trial?",
    a: "We don't offer a free trial — but at £149 per listing the cost of trying it is a fraction of a single agency call. If you post and don't receive any relevant applicants within 30 days, contact us.",
  },
]

export default function PricingPage() {
  const base = getBaseUrl()

  return (
    <>
      <div className="max-w-4xl mx-auto px-4 py-20">

        {/* Header */}
        <AnimateIn>
          <div className="text-center mb-14">
            <p className="text-xs font-semibold text-teal uppercase tracking-[0.18em] mb-4">Pricing</p>
            <h1 className="text-3xl md:text-4xl font-bold text-navy mb-4 leading-tight">
              Less than one agency invoice.<br className="hidden md:block" /> Every month.
            </h1>
            <p className="text-brand-slate max-w-xl mx-auto leading-relaxed">
              The only job board covering all regulated private healthcare disciplines — and the most affordable specialist board available. Candidates always free.
            </p>
          </div>
        </AnimateIn>

        {/* Pricing cards */}
        <div className="grid md:grid-cols-2 gap-5 max-w-2xl mx-auto mb-20">

          {/* Pay per listing */}
          <AnimateIn delay={0.05}>
            <div className="bg-white border border-border rounded-2xl p-7 h-full flex flex-col">
              <div className="mb-6">
                <h2 className="text-lg font-bold text-navy mb-1">Pay per listing</h2>
                <p className="text-sm text-brand-slate">Best for occasional hiring</p>
              </div>
              <div className="mb-6">
                <span className="text-4xl font-bold text-navy">£{LISTING_PRICE_GBP}</span>
                <span className="text-brand-slate text-sm ml-1">+VAT / listing</span>
              </div>
              <ul className="space-y-3 text-sm text-navy/70 mb-8 flex-1">
                {[
                  "Active for 30 days",
                  "Listed on all relevant profession + region pages",
                  "Applications managed in your dashboard",
                  "Email notification per applicant",
                  "Visible to registered professionals only",
                  "No contract, no commitment",
                ].map(f => (
                  <li key={f} className="flex items-start gap-2.5">
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" className="text-teal shrink-0 mt-0.5"><path d="M20 6 9 17l-5-5"/></svg>
                    <span>{f}</span>
                  </li>
                ))}
              </ul>
              <Link
                href="/auth/register"
                className="block w-full text-center border-2 border-teal/30 text-teal px-4 py-2.5 rounded-full text-sm font-semibold hover:border-teal hover:bg-teal/5 transition-colors"
              >
                Post a job
              </Link>
            </div>
          </AnimateIn>

          {/* Practice Pro */}
          <AnimateIn delay={0.12}>
            <div className="bg-teal rounded-2xl p-7 h-full flex flex-col relative overflow-hidden">
              <div className="absolute top-4 right-4">
                <span className="text-[10px] font-bold text-teal bg-mint px-2.5 py-1 rounded-full uppercase tracking-wider">
                  Best value
                </span>
              </div>
              <div className="mb-6">
                <h2 className="text-lg font-bold text-off-white mb-1">Practice Pro</h2>
                <p className="text-sm text-off-white/55">Best for practices hiring regularly</p>
              </div>
              <div className="mb-6">
                <span className="text-4xl font-bold text-off-white">£{SUBSCRIPTION_PRICE_GBP}</span>
                <span className="text-off-white/55 text-sm ml-1">+VAT / month</span>
              </div>
              <ul className="space-y-3 text-sm text-off-white/75 mb-8 flex-1">
                {[
                  { text: "Unlimited job listings", bold: true },
                  { text: "Everything in Pay per listing", bold: false },
                  { text: "Featured placement in search results", bold: false },
                  { text: "Post across multiple sites and disciplines", bold: false },
                  { text: "Cancel any time — no lock-in", bold: false },
                ].map(f => (
                  <li key={f.text} className="flex items-start gap-2.5">
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" className="text-mint shrink-0 mt-0.5"><path d="M20 6 9 17l-5-5"/></svg>
                    <span className={f.bold ? "font-semibold text-off-white" : ""}>{f.text}</span>
                  </li>
                ))}
              </ul>
              <Link
                href="/auth/register"
                className="block w-full text-center bg-mint text-navy px-4 py-2.5 rounded-full text-sm font-semibold hover:bg-mint/85 transition-colors"
              >
                Get started — £{SUBSCRIPTION_PRICE_GBP}/month
              </Link>
            </div>
          </AnimateIn>
        </div>

        {/* The agency maths */}
        <AnimateIn delay={0.1}>
          <div className="bg-navy rounded-2xl p-8 md:p-10 mb-16">
            <p className="text-xs font-semibold text-mint uppercase tracking-[0.18em] mb-4">The maths</p>
            <h2 className="text-xl md:text-2xl font-bold text-white mb-8 leading-snug">
              One agency placement funds Practice Pro<br className="hidden md:block" /> for three years.
            </h2>
            <div className="grid md:grid-cols-3 gap-4">
              {[
                {
                  label: "Agency fee on a £45k hire",
                  value: "£6,750–£11,250",
                  sub: "Standard 15–25% placement fee",
                  highlight: false,
                },
                {
                  label: "Practice Pro for 12 months",
                  value: "£2,988",
                  sub: "Unlimited listings, all disciplines",
                  highlight: false,
                },
                {
                  label: "Saving on first hire alone",
                  value: "£3,762–£8,262",
                  sub: "Every hire after that is pure saving",
                  highlight: true,
                },
              ].map(item => (
                <div key={item.label} className={`rounded-xl p-5 ${item.highlight ? "bg-teal/20 border border-teal/30" : "bg-white/5"}`}>
                  <p className="text-white/50 text-xs mb-2">{item.label}</p>
                  <p className={`text-xl font-bold mb-1 ${item.highlight ? "text-mint" : "text-white"}`}>{item.value}</p>
                  <p className="text-white/40 text-xs">{item.sub}</p>
                </div>
              ))}
            </div>
          </div>
        </AnimateIn>

        {/* Competitor comparison */}
        <AnimateIn delay={0.1}>
          <div className="mb-16">
            <p className="text-xs font-semibold text-brand-slate uppercase tracking-[0.18em] mb-3">How it compares</p>
            <h2 className="text-xl font-bold text-navy mb-2">The cheapest specialist board available.</h2>
            <p className="text-brand-slate text-sm mb-7">Every other specialist board covers one discipline. We cover all 88 regulated healthcare professions.</p>
            <div className="bg-off-white border border-border rounded-2xl overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left px-5 py-3 text-brand-slate font-semibold text-xs uppercase tracking-wide">Platform</th>
                      <th className="text-left px-5 py-3 text-brand-slate font-semibold text-xs uppercase tracking-wide">Cost per listing</th>
                      <th className="text-left px-5 py-3 text-brand-slate font-semibold text-xs uppercase tracking-wide hidden sm:table-cell">Scope</th>
                    </tr>
                  </thead>
                  <tbody>
                    {COMPARISON.map(row => (
                      <tr key={row.name} className="border-b border-border/50">
                        <td className="px-5 py-3.5 text-navy/65">{row.name}</td>
                        <td className="px-5 py-3.5 text-navy/65">{row.price}</td>
                        <td className="px-5 py-3.5 text-navy/40 text-xs hidden sm:table-cell">{row.note}</td>
                      </tr>
                    ))}
                    <tr className="bg-teal/5 border-t-2 border-teal/20">
                      <td className="px-5 py-4 font-bold text-teal">The Practice Standard</td>
                      <td className="px-5 py-4 font-bold text-teal">£{LISTING_PRICE_GBP} +VAT</td>
                      <td className="px-5 py-4 font-bold text-teal text-xs hidden sm:table-cell">All 88 regulated professions</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </AnimateIn>

        {/* FAQ */}
        <AnimateIn delay={0.1}>
          <div className="mb-16">
            <p className="text-xs font-semibold text-brand-slate uppercase tracking-[0.18em] mb-8">Common questions</p>
            <div className="space-y-6">
              {FAQ.map(item => (
                <div key={item.q} className="border-b border-border pb-6 last:border-0">
                  <p className="font-semibold text-navy mb-2">{item.q}</p>
                  <p className="text-brand-slate text-sm leading-relaxed">{item.a}</p>
                </div>
              ))}
            </div>
          </div>
        </AnimateIn>

        {/* Candidate strip */}
        <AnimateIn delay={0.1}>
          <div className="bg-off-white border border-border rounded-2xl p-8 text-center mb-10">
            <p className="text-xs font-semibold text-teal uppercase tracking-[0.18em] mb-2">For professionals</p>
            <h2 className="text-xl font-bold text-navy mb-2">You&apos;re a candidate? It&apos;s free. Always.</h2>
            <p className="text-brand-slate text-sm mb-5 max-w-md mx-auto">
              Search, browse, and apply for private practice roles across all disciplines — no fees, no premium tier, no catch.
            </p>
            <Link
              href="/auth/register"
              className="inline-flex border-2 border-teal text-teal px-6 py-2.5 rounded-full text-sm font-semibold hover:bg-teal hover:text-off-white transition-colors"
            >
              Create free account
            </Link>
          </div>
        </AnimateIn>

        <AnimateIn delay={0.1}>
          <p className="text-center text-xs text-brand-slate/50">
            All prices exclude VAT. Practice Pro billed monthly. Cancel any time.
          </p>
        </AnimateIn>
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: FAQ.map(item => ({
              "@type": "Question",
              name: item.q,
              acceptedAnswer: { "@type": "Answer", text: item.a },
            })),
          }),
        }}
      />
    </>
  )
}
