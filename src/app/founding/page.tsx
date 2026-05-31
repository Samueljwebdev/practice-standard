import Link from "next/link"
import { createClient } from "@/lib/supabase/server"
import { AnimateIn } from "@/components/ui/AnimateIn"
import {
  FOUNDING_TOTAL_SPOTS,
  FOUNDING_SPOTS_CLAIMED,
  FOUNDING_PRICE_GBP,
  SUBSCRIPTION_PRICE_GBP,
  LISTING_PRICE_GBP,
} from "@/lib/constants"
import { getBaseUrl } from "@/lib/seo"
import type { Metadata } from "next"

const SPOTS_LEFT = Math.max(FOUNDING_TOTAL_SPOTS - FOUNDING_SPOTS_CLAIMED, 0)
const CLAIMED_PCT = Math.round((FOUNDING_SPOTS_CLAIMED / FOUNDING_TOTAL_SPOTS) * 100)

export function generateMetadata(): Metadata {
  const base = getBaseUrl()
  return {
    title: "Founding 41 | The Practice Standard — UK Private Healthcare Hiring",
    description: `${FOUNDING_TOTAL_SPOTS} founding practices only. Founder rate £${FOUNDING_PRICE_GBP}/month — locked for life, vs £${SUBSCRIPTION_PRICE_GBP} standard. Unlimited verified-candidate listings, no agency fees. Cancel any time.`,
    alternates: { canonical: `${base}/founding` },
  }
}

const BENEFITS = [
  {
    title: "Founder rate — locked for life",
    body: `£${FOUNDING_PRICE_GBP}/month, forever. As the standard price rises to £${SUBSCRIPTION_PRICE_GBP} and beyond, your rate never moves. Unlimited listings across every discipline you hire for.`,
  },
  {
    title: "Founding Member badge",
    body: "Your listings carry a Founding Member badge — early credibility with candidates, and a permanent marker that you backed this first.",
  },
  {
    title: "Verified candidates only",
    body: "Every applicant's NMC / GMC / GDC / RCVS / GOC / HCPC registration is checked before they reach you. Private-practice professionals only — no NHS noise, no unregistered CVs.",
  },
  {
    title: "Cancel any time — no contract",
    body: "Month to month. No lock-in, no notice period, no setup fee. If it isn't earning its keep, leave — but founder pricing only exists while these 41 spots are open.",
  },
]

const STEPS = [
  {
    n: "01",
    title: "Claim your spot",
    body: "Create a practice account and tell us your disciplines. Under two minutes.",
  },
  {
    n: "02",
    title: `Activate the founder rate`,
    body: `Start your founder subscription — £${FOUNDING_PRICE_GBP}/month, locked for life. One card entry, then unlimited listings.`,
  },
  {
    n: "03",
    title: "Post roles & hire",
    body: "List as many roles as you like and meet register-verified candidates. Every applicant is screened before they reach you.",
  },
]

const FAQ = [
  {
    q: "What does a founding spot cost?",
    a: `£${FOUNDING_PRICE_GBP}/month — charged when you activate, then locked at that rate for life (the standard price is £${SUBSCRIPTION_PRICE_GBP} and rising). It covers unlimited job listings across every discipline. Cancel any time, no contract.`,
  },
  {
    q: `Why only ${FOUNDING_TOTAL_SPOTS} practices?`,
    a: `Founder pricing is locked for life and comes with a direct line to us — that only works at small scale. ${FOUNDING_TOTAL_SPOTS} lets us look after every founding practice properly. Once the spots are gone, the rate closes for good.`,
  },
  {
    q: "What's different about your candidates?",
    a: "Every candidate's professional registration — NMC, GMC, GDC, RCVS, GOC, HCPC and others — is verified before they reach you. You see private-practice professionals only, already screened. No NHS noise, no unregistered applicants.",
  },
  {
    q: "How is this cheaper than an agency?",
    a: `Agencies charge 15–25% of first-year salary — up to £11,250 on a single £45k hire. Founder pricing is £${FOUNDING_PRICE_GBP}/month for unlimited roles across every discipline. One agency placement would fund you for years.`,
  },
  {
    q: "Can I cancel?",
    a: "Any time, from your dashboard — no notice period, no fee. You keep your founder rate for as long as you stay subscribed; if you cancel and the founding spots have closed, you'd rejoin at standard pricing.",
  },
  {
    q: "Do you also offer pay-per-listing?",
    a: `Yes — a single listing is £${LISTING_PRICE_GBP} if you only hire occasionally. But the founder subscription at £${FOUNDING_PRICE_GBP}/month pays for itself the moment you post a second role, and the rate is locked for life.`,
  },
]

const CHECK = (
  <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <path d="M20 6 9 17l-5-5" />
  </svg>
)

export default async function FoundingPage() {
  // Logged-in practices go straight to founder checkout; everyone else registers first.
  let ctaHref = "/auth/register?plan=founder"
  try {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (user) {
      const { data: practice } = await supabase
        .from("practices")
        .select("id")
        .eq("user_id", user.id)
        .maybeSingle()
      if (practice) ctaHref = "/api/stripe/checkout?mode=subscription&plan=founder"
    }
  } catch {
    // fall through with the register link
  }

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
              <span className="h-1.5 w-1.5 rounded-full bg-teal animate-pulse" />
              <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-teal">
                {SPOTS_LEFT} of {FOUNDING_TOTAL_SPOTS} founding spots left
              </span>
            </span>
          </AnimateIn>

          <AnimateIn delay={0.08}>
            <h1 className="text-[clamp(2.4rem,5.5vw,4rem)] font-black leading-[0.95] tracking-[-0.03em] text-navy mb-6">
              Be one of {FOUNDING_TOTAL_SPOTS}<br />
              <span className="text-teal">founding practices.</span>
            </h1>
          </AnimateIn>

          <AnimateIn delay={0.16}>
            <p className="text-[16px] leading-[1.8] text-brand-slate max-w-[540px] mx-auto mb-10">
              {FOUNDING_TOTAL_SPOTS} practices lock in the founder rate: <strong className="text-navy">£{FOUNDING_PRICE_GBP}/month for life</strong>, vs £{SUBSCRIPTION_PRICE_GBP} standard.
              Unlimited verified-candidate listings, a Founding Member badge, no agency fees. Cancel any time.
            </p>
          </AnimateIn>

          {/* Spot counter */}
          <AnimateIn delay={0.2}>
            <div className="mx-auto max-w-sm mb-10">
              <div className="flex items-center justify-between text-[11px] font-semibold uppercase tracking-[0.15em] text-brand-slate mb-2.5">
                <span>{FOUNDING_SPOTS_CLAIMED} claimed</span>
                <span className="text-teal">{SPOTS_LEFT} remaining</span>
              </div>
              <div className="h-2 w-full overflow-hidden rounded-full bg-navy/8">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-teal to-mint transition-all duration-700"
                  style={{ width: `${Math.max(CLAIMED_PCT, 4)}%` }}
                />
              </div>
            </div>
          </AnimateIn>

          <AnimateIn delay={0.26}>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <Link
                href={ctaHref}
                className="group inline-flex items-center gap-3 rounded-full bg-teal px-6 py-3.5 text-sm font-semibold text-off-white shadow-[0_4px_28px_rgba(15,61,62,0.22)] transition-[box-shadow,transform] duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] hover:shadow-[0_6px_36px_rgba(15,61,62,0.32)] active:scale-[0.98]"
              >
                Claim your founding spot
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-white/20 text-xs leading-none transition-transform duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:translate-x-0.5 group-hover:-translate-y-px">
                  →
                </span>
              </Link>
              <Link
                href="/jobs"
                className="inline-flex items-center rounded-full border-2 border-navy/15 px-6 py-3.5 text-sm font-semibold text-navy transition-[border-color,background-color] duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:border-navy/30 hover:bg-navy/4 active:scale-[0.98]"
              >
                See live roles
              </Link>
            </div>
          </AnimateIn>

          <AnimateIn delay={0.32}>
            <p className="text-xs text-brand-slate/60 mt-6">
              £{FOUNDING_PRICE_GBP}/mo locked for life · Cancel any time · Candidates always free
            </p>
          </AnimateIn>
        </div>
      </section>

      {/* ── Benefits ── */}
      <section className="bg-off-white py-24 px-6">
        <div className="mx-auto max-w-4xl">
          <AnimateIn>
            <span className="text-[11px] font-semibold text-brand-slate uppercase tracking-[0.2em] block mb-4">What founding members get</span>
            <h2 className="text-[clamp(1.8rem,4vw,2.8rem)] font-black leading-tight tracking-[-0.02em] text-navy mb-12">
              Four things only the first {FOUNDING_TOTAL_SPOTS} get.
            </h2>
          </AnimateIn>

          <div className="grid md:grid-cols-2 gap-5">
            {BENEFITS.map((b, i) => (
              <AnimateIn key={b.title} delay={0.05 + i * 0.06}>
                <div className="h-full rounded-[2rem] bg-gradient-to-b from-navy/4 to-navy/1 p-2 ring-1 ring-navy/8 shadow-[0_2px_40px_rgba(13,27,42,0.05)]">
                  <div className="h-full rounded-[calc(2rem-0.5rem)] bg-white p-7 shadow-[inset_0_1px_1px_rgba(255,255,255,0.9)]">
                    <div className="flex items-center gap-2.5 mb-3">
                      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-teal/10 text-teal">{CHECK}</span>
                      <h3 className="text-[17px] font-black text-navy leading-tight">{b.title}</h3>
                    </div>
                    <p className="text-sm text-brand-slate leading-[1.8]">{b.body}</p>
                  </div>
                </div>
              </AnimateIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── The maths ── dark dramatic section ── */}
      <section className="bg-navy py-24 px-6">
        <div className="mx-auto max-w-4xl">
          <AnimateIn>
            <span className="inline-flex items-center gap-2 rounded-full border border-mint/20 bg-mint/10 px-4 py-1.5 mb-8">
              <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-mint">The maths</span>
            </span>
            <h2 className="text-[clamp(1.8rem,4vw,3rem)] font-black leading-[0.95] tracking-[-0.02em] text-white mb-4">
              One agency invoice would fund<br className="hidden md:block" /> your founder rate for years.
            </h2>
            <p className="text-white/50 text-sm leading-relaxed mb-12 max-w-lg">
              Agency fees run 15–25% of first-year salary. On a £45k hire, that&apos;s up to £11,250 — paid once, for one person. Founder pricing is unlimited roles, every discipline, locked for life.
            </p>
          </AnimateIn>

          <div className="grid md:grid-cols-3 gap-4">
            {[
              { label: "Agency fee on a £45k hire", value: "£11,250", sub: "At 25% — standard placement fee", highlight: false },
              { label: "Founder rate for 12 months", value: `£${FOUNDING_PRICE_GBP * 12}`, sub: "Unlimited listings, all disciplines", highlight: false },
              { label: "Your rate in year 5", value: `£${FOUNDING_PRICE_GBP}`, sub: "Still locked. It never rises.", highlight: true },
            ].map((item, i) => (
              <AnimateIn key={item.label} delay={0.08 + i * 0.06}>
                <div className={`h-full rounded-[1.5rem] p-[1.5px] ${item.highlight ? "bg-gradient-to-b from-mint/40 to-mint/10" : "bg-gradient-to-b from-white/10 to-white/3"}`}>
                  <div className={`h-full rounded-[calc(1.5rem-1.5px)] p-6 ${item.highlight ? "bg-teal/20" : "bg-white/5"}`}>
                    <p className="text-white/45 text-xs mb-3 leading-snug">{item.label}</p>
                    <p className={`text-2xl font-black leading-none mb-2 ${item.highlight ? "text-mint" : "text-white"}`}>{item.value}</p>
                    <p className="text-white/35 text-xs">{item.sub}</p>
                  </div>
                </div>
              </AnimateIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── How it works ── */}
      <section className="bg-white py-24 px-6">
        <div className="mx-auto max-w-4xl">
          <AnimateIn>
            <span className="text-[11px] font-semibold text-brand-slate uppercase tracking-[0.2em] block mb-4">How it works</span>
            <h2 className="text-[clamp(1.8rem,4vw,2.8rem)] font-black leading-tight tracking-[-0.02em] text-navy mb-12">
              Claimed in two minutes.
            </h2>
          </AnimateIn>

          <div className="grid md:grid-cols-3 gap-5">
            {STEPS.map((s, i) => (
              <AnimateIn key={s.n} delay={0.05 + i * 0.07}>
                <div className="h-full rounded-[2rem] bg-gradient-to-b from-navy/4 to-transparent p-2 ring-1 ring-navy/8">
                  <div className="h-full rounded-[calc(2rem-0.5rem)] bg-white p-7 shadow-[inset_0_1px_1px_rgba(255,255,255,0.9)]">
                    <p className="text-3xl font-black text-mint mb-4 leading-none">{s.n}</p>
                    <h3 className="text-[17px] font-black text-navy mb-2.5 leading-tight">{s.title}</h3>
                    <p className="text-sm text-brand-slate leading-[1.8]">{s.body}</p>
                  </div>
                </div>
              </AnimateIn>
            ))}
          </div>
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
                  <p className="font-bold text-navy text-[15px] mb-2.5 leading-snug">{item.q}</p>
                  <p className="text-brand-slate text-sm leading-[1.85]">{item.a}</p>
                </div>
              </AnimateIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── Final CTA ── teal full-width ── */}
      <section className="bg-teal py-24 px-6">
        <div className="mx-auto max-w-3xl text-center">
          <AnimateIn>
            <span className="inline-flex items-center gap-2 rounded-full border border-mint/25 bg-mint/10 px-4 py-1.5 mb-8">
              <span className="h-1.5 w-1.5 rounded-full bg-mint animate-pulse" />
              <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-mint">{SPOTS_LEFT} spots remaining</span>
            </span>
            <h2 className="text-[clamp(1.8rem,4vw,3rem)] font-black leading-[0.95] tracking-[-0.02em] text-white mb-4">
              When they&apos;re gone,<br />they&apos;re gone.
            </h2>
            <p className="text-white/55 text-sm leading-[1.85] mb-10 max-w-md mx-auto">
              Lock in £{FOUNDING_PRICE_GBP}/month for life before the {FOUNDING_TOTAL_SPOTS} spots close. Unlimited verified-candidate listings. Cancel any time.
            </p>

            <Link
              href={ctaHref}
              className="group inline-flex items-center gap-3 rounded-full bg-white px-6 py-3.5 text-sm font-semibold text-teal shadow-[0_4px_28px_rgba(0,0,0,0.12)] transition-[box-shadow,transform] duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] hover:shadow-[0_6px_36px_rgba(0,0,0,0.2)] active:scale-[0.98]"
            >
              Claim your founding spot
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-teal/10 text-xs leading-none transition-transform duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:translate-x-0.5 group-hover:-translate-y-px">
                →
              </span>
            </Link>

            <p className="text-xs text-white/40 mt-6">
              Prefer to pay per role? Single listings from £{LISTING_PRICE_GBP}. Candidates always free.
            </p>
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
