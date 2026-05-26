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

const CHECK = (
  <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <path d="M20 6 9 17l-5-5" />
  </svg>
)

export default function PricingPage() {
  const base = getBaseUrl()

  return (
    <>
      {/* ── Hero ── */}
      <section className="relative overflow-hidden bg-white">
        <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute right-0 top-0 h-[600px] w-[600px] -translate-y-1/4 translate-x-1/3 rounded-full bg-mint/20 blur-[130px]" />
          <div className="absolute bottom-0 left-0 h-[350px] w-[400px] translate-y-1/3 -translate-x-1/4 rounded-full bg-teal/7 blur-[100px]" />
        </div>

        <div className="relative mx-auto max-w-5xl px-6 py-24 md:py-32 text-center">
          <AnimateIn>
            <span className="inline-flex items-center gap-2.5 rounded-full border border-teal/20 bg-teal/5 px-4 py-1.5 mb-8">
              <span className="h-1.5 w-1.5 rounded-full bg-teal" />
              <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-teal">Transparent pricing</span>
            </span>
          </AnimateIn>

          <AnimateIn delay={0.08}>
            <h1 className="text-[clamp(2.4rem,5.5vw,4rem)] font-black leading-[0.95] tracking-[-0.03em] text-navy mb-6">
              Less than one agency invoice.<br />
              <span className="text-teal">Every single month.</span>
            </h1>
          </AnimateIn>

          <AnimateIn delay={0.16}>
            <p className="text-[16px] leading-[1.8] text-brand-slate max-w-[520px] mx-auto mb-10">
              The only board covering all 88 regulated private healthcare professions — and the most affordable specialist board available. Candidates always free.
            </p>
          </AnimateIn>

          <AnimateIn delay={0.22}>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <Link
                href="/auth/register"
                className="group inline-flex items-center gap-3 rounded-full bg-teal px-6 py-3.5 text-sm font-semibold text-off-white shadow-[0_4px_28px_rgba(15,61,62,0.22)] transition-[box-shadow,transform] duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] hover:shadow-[0_6px_36px_rgba(15,61,62,0.32)] active:scale-[0.98]"
              >
                Post a role — from £{LISTING_PRICE_GBP}
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-white/20 text-xs leading-none transition-transform duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:translate-x-0.5 group-hover:-translate-y-px">
                  →
                </span>
              </Link>
              <Link
                href="/jobs"
                className="inline-flex items-center rounded-full border-2 border-navy/15 px-6 py-3.5 text-sm font-semibold text-navy transition-[border-color,background-color] duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:border-navy/30 hover:bg-navy/4 active:scale-[0.98]"
              >
                Browse open roles
              </Link>
            </div>
          </AnimateIn>
        </div>
      </section>

      {/* ── Pricing cards ── */}
      <section className="bg-off-white py-24 px-6">
        <div className="mx-auto max-w-3xl">
          <div className="grid md:grid-cols-2 gap-5">

            {/* Pay per listing — light double-bezel */}
            <AnimateIn delay={0.05}>
              <div className="h-full rounded-[2rem] bg-gradient-to-b from-navy/4 to-navy/1 p-2 ring-1 ring-navy/8 shadow-[0_2px_40px_rgba(13,27,42,0.05)]">
                <div className="h-full rounded-[calc(2rem-0.5rem)] bg-white p-7 shadow-[inset_0_1px_1px_rgba(255,255,255,0.9)] flex flex-col">
                  <div className="mb-7">
                    <p className="text-[10px] font-bold text-brand-slate uppercase tracking-[0.2em] mb-3">Pay per listing</p>
                    <h2 className="text-2xl font-black text-navy leading-none mb-1">
                      £{LISTING_PRICE_GBP}
                      <span className="text-sm font-medium text-brand-slate ml-1.5">+VAT / listing</span>
                    </h2>
                    <p className="text-xs text-brand-slate/70 mt-2">Best for occasional hiring</p>
                  </div>

                  <ul className="space-y-3 flex-1 mb-8">
                    {[
                      "Active for 30 days",
                      "Listed on all relevant profession + region pages",
                      "Applications managed in your dashboard",
                      "Email notification per applicant",
                      "No contract, no commitment",
                    ].map(f => (
                      <li key={f} className="flex items-start gap-2.5 text-sm text-navy/70">
                        <span className="text-teal shrink-0 mt-1">{CHECK}</span>
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>

                  <Link
                    href="/auth/register"
                    className="group inline-flex w-full items-center justify-center gap-2.5 rounded-full border-2 border-teal/30 px-5 py-3 text-sm font-semibold text-teal transition-[border-color,background-color] duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:border-teal hover:bg-teal/5 active:scale-[0.98]"
                  >
                    Post a job
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-teal/10 text-xs leading-none transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-px">
                      →
                    </span>
                  </Link>
                </div>
              </div>
            </AnimateIn>

            {/* Practice Pro — dark double-bezel */}
            <AnimateIn delay={0.12}>
              <div className="h-full rounded-[2rem] bg-gradient-to-b from-teal to-teal/80 p-2 ring-1 ring-white/10 shadow-[0_4px_48px_rgba(15,61,62,0.28)]">
                <div className="relative h-full rounded-[calc(2rem-0.5rem)] bg-teal p-7 shadow-[inset_0_1px_1px_rgba(255,255,255,0.15)] overflow-hidden flex flex-col">

                  {/* Ambient glow inside card */}
                  <div aria-hidden className="pointer-events-none absolute -right-8 -top-8 h-28 w-28 rounded-full bg-mint/20 blur-2xl" />

                  <div className="absolute top-5 right-5">
                    <span className="text-[10px] font-bold text-teal bg-mint px-2.5 py-1 rounded-full uppercase tracking-[0.15em]">
                      Best value
                    </span>
                  </div>

                  <div className="mb-7">
                    <p className="text-[10px] font-bold text-mint/70 uppercase tracking-[0.2em] mb-3">Practice Pro</p>
                    <h2 className="text-2xl font-black text-off-white leading-none mb-1">
                      £{SUBSCRIPTION_PRICE_GBP}
                      <span className="text-sm font-medium text-off-white/55 ml-1.5">+VAT / month</span>
                    </h2>
                    <p className="text-xs text-off-white/50 mt-2">Best for practices hiring regularly</p>
                  </div>

                  <ul className="space-y-3 flex-1 mb-8">
                    {[
                      { text: "Unlimited job listings", bold: true },
                      { text: "Everything in Pay per listing", bold: false },
                      { text: "Featured placement in search results", bold: false },
                      { text: "Post across multiple sites and disciplines", bold: false },
                      { text: "Cancel any time — no lock-in", bold: false },
                    ].map(f => (
                      <li key={f.text} className="flex items-start gap-2.5 text-sm text-off-white/75">
                        <span className="text-mint shrink-0 mt-1">{CHECK}</span>
                        <span className={f.bold ? "font-semibold text-off-white" : ""}>{f.text}</span>
                      </li>
                    ))}
                  </ul>

                  <Link
                    href="/auth/register"
                    className="group inline-flex w-full items-center justify-center gap-2.5 rounded-full bg-mint px-5 py-3 text-sm font-semibold text-navy shadow-[0_3px_20px_rgba(168,213,204,0.35)] transition-[box-shadow,transform,background-color] duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:bg-mint/90 hover:shadow-[0_5px_28px_rgba(168,213,204,0.5)] active:scale-[0.98]"
                  >
                    Get started — £{SUBSCRIPTION_PRICE_GBP}/month
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-navy/10 text-xs leading-none transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-px">
                      →
                    </span>
                  </Link>
                </div>
              </div>
            </AnimateIn>
          </div>

          <AnimateIn delay={0.2}>
            <p className="text-center text-xs text-brand-slate/50 mt-6">
              All prices exclude VAT. Practice Pro billed monthly. Cancel any time.
            </p>
          </AnimateIn>
        </div>
      </section>

      {/* ── Agency maths ── dark dramatic section */}
      <section className="bg-navy py-24 px-6">
        <div className="mx-auto max-w-4xl">
          <AnimateIn>
            <span className="inline-flex items-center gap-2 rounded-full border border-mint/20 bg-mint/10 px-4 py-1.5 mb-8">
              <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-mint">The maths</span>
            </span>
            <h2 className="text-[clamp(1.8rem,4vw,3rem)] font-black leading-[0.95] tracking-[-0.02em] text-white mb-4">
              One agency placement funds Practice Pro<br className="hidden md:block" /> for three years.
            </h2>
            <p className="text-white/50 text-sm leading-relaxed mb-12 max-w-lg">
              Standard agency fees run 15–25% of first-year salary. On a £45k hire, that's up to £11,250 — paid once, for one person.
            </p>
          </AnimateIn>

          <div className="grid md:grid-cols-3 gap-4">
            {[
              {
                label: "Agency fee on a £45k hire",
                value: "£11,250",
                sub: "At 25% — standard placement fee",
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
                value: "£8,262",
                sub: "Every hire after that is pure saving",
                highlight: true,
              },
            ].map((item, i) => (
              <AnimateIn key={item.label} delay={0.08 + i * 0.06}>
                {/* Double-bezel dark card */}
                <div className={`h-full rounded-[1.5rem] p-[1.5px] ${item.highlight ? "bg-gradient-to-b from-mint/40 to-mint/10" : "bg-gradient-to-b from-white/10 to-white/3"}`}>
                  <div className={`h-full rounded-[calc(1.5rem-1.5px)] p-6 ${item.highlight ? "bg-teal/20" : "bg-white/5"}`}>
                    <p className="text-white/45 text-xs mb-3 leading-snug">{item.label}</p>
                    <p className={`text-2xl font-black leading-none mb-2 ${item.highlight ? "text-mint" : "text-white"}`}>
                      {item.value}
                    </p>
                    <p className="text-white/35 text-xs">{item.sub}</p>
                  </div>
                </div>
              </AnimateIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── Competitor comparison ── */}
      <section className="bg-white py-24 px-6">
        <div className="mx-auto max-w-4xl">
          <AnimateIn>
            <span className="text-[11px] font-semibold text-brand-slate uppercase tracking-[0.2em] block mb-4">How it compares</span>
            <h2 className="text-[clamp(1.8rem,4vw,2.8rem)] font-black leading-tight tracking-[-0.02em] text-navy mb-3">
              The most affordable<br />specialist board available.
            </h2>
            <p className="text-brand-slate text-sm leading-relaxed mb-10 max-w-lg">
              Every other specialist board covers one discipline. We cover all 88 regulated healthcare professions.
            </p>
          </AnimateIn>

          <AnimateIn delay={0.1}>
            {/* Table in double-bezel */}
            <div className="rounded-[2rem] bg-gradient-to-b from-navy/4 to-transparent p-2 ring-1 ring-navy/8 shadow-[0_2px_40px_rgba(13,27,42,0.04)]">
              <div className="rounded-[calc(2rem-0.5rem)] bg-white overflow-hidden shadow-[inset_0_1px_1px_rgba(255,255,255,0.9)]">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-navy/8 bg-off-white/80">
                        <th className="text-left px-6 py-3.5 text-brand-slate font-semibold text-[11px] uppercase tracking-[0.15em]">Platform</th>
                        <th className="text-left px-6 py-3.5 text-brand-slate font-semibold text-[11px] uppercase tracking-[0.15em]">Cost per listing</th>
                        <th className="text-left px-6 py-3.5 text-brand-slate font-semibold text-[11px] uppercase tracking-[0.15em] hidden sm:table-cell">Scope</th>
                      </tr>
                    </thead>
                    <tbody>
                      {COMPARISON.map((row, i) => (
                        <tr key={row.name} className={`border-b border-navy/5 last:border-0 ${i % 2 === 1 ? "bg-off-white/40" : ""}`}>
                          <td className="px-6 py-4 text-navy/55 text-sm">{row.name}</td>
                          <td className="px-6 py-4 text-navy/55 text-sm font-medium">{row.price}</td>
                          <td className="px-6 py-4 text-navy/35 text-xs hidden sm:table-cell">{row.note}</td>
                        </tr>
                      ))}
                      {/* Our row */}
                      <tr className="border-t-2 border-teal/20 bg-teal/4">
                        <td className="px-6 py-4.5 font-bold text-teal">The Practice Standard</td>
                        <td className="px-6 py-4.5 font-bold text-teal">£{LISTING_PRICE_GBP} +VAT</td>
                        <td className="px-6 py-4.5 text-teal/70 text-xs font-medium hidden sm:table-cell">All 88 regulated professions</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </AnimateIn>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="bg-off-white py-24 px-6">
        <div className="mx-auto max-w-3xl">
          <AnimateIn>
            <span className="text-[11px] font-semibold text-brand-slate uppercase tracking-[0.2em] block mb-4">Common questions</span>
            <h2 className="text-[clamp(1.6rem,3.5vw,2.5rem)] font-black leading-tight tracking-[-0.02em] text-navy mb-12">
              Everything you need to know.
            </h2>
          </AnimateIn>

          <div className="space-y-0">
            {FAQ.map((item, i) => (
              <AnimateIn key={item.q} delay={0.04 * i}>
                <div className="border-b border-navy/8 py-6 last:border-0">
                  {/* Double-bezel subtle hover indicator */}
                  <p className="font-bold text-navy text-[15px] mb-2.5 leading-snug">{item.q}</p>
                  <p className="text-brand-slate text-sm leading-[1.85]">{item.a}</p>
                </div>
              </AnimateIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── Candidate strip — teal full-width ── */}
      <section className="bg-teal py-24 px-6">
        <div className="mx-auto max-w-3xl text-center">
          <AnimateIn>
            <span className="inline-flex items-center gap-2 rounded-full border border-mint/25 bg-mint/10 px-4 py-1.5 mb-8">
              <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-mint">For professionals</span>
            </span>
            <h2 className="text-[clamp(1.8rem,4vw,3rem)] font-black leading-[0.95] tracking-[-0.02em] text-white mb-4">
              You&apos;re a candidate?<br />It&apos;s free. Always.
            </h2>
            <p className="text-white/55 text-sm leading-[1.85] mb-10 max-w-md mx-auto">
              Search, browse, and apply for private practice roles across all disciplines — no fees, no premium tier, no catch.
            </p>

            {/* Button-in-button on teal bg */}
            <Link
              href="/auth/register"
              className="group inline-flex items-center gap-3 rounded-full bg-white px-6 py-3.5 text-sm font-semibold text-teal shadow-[0_4px_28px_rgba(0,0,0,0.12)] transition-[box-shadow,transform] duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] hover:shadow-[0_6px_36px_rgba(0,0,0,0.2)] active:scale-[0.98]"
            >
              Create free account
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-teal/10 text-xs leading-none transition-transform duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:translate-x-0.5 group-hover:-translate-y-px">
                →
              </span>
            </Link>
          </AnimateIn>
        </div>
      </section>

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
