import Link from "next/link"
import Image from "next/image"
import { createClient } from "@/lib/supabase/server"
import { PROFESSIONS } from "@/lib/constants"
import { professionToSlug, getBaseUrl } from "@/lib/seo"
import { HomeHero } from "@/components/home/HomeHero"
import { AnimateIn } from "@/components/ui/AnimateIn"

export default async function HomePage() {
  const supabase = await createClient()
  const { count } = await supabase
    .from("jobs")
    .select("*", { count: "exact", head: true })
    .eq("status", "active")
    .eq("payment_status", "paid")

  const base = getBaseUrl()

  return (
    <>
      <HomeHero count={count ?? 0} />

      {/* Lead magnet banner */}
      <section className="py-5 bg-teal/8 border-b border-teal/15">
        <div className="max-w-5xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-sm text-navy font-medium text-center sm:text-left">
            <span className="font-bold">Free resource:</span> UK Private Practice Salary Benchmark 2026 — 25+ roles, 5 disciplines, regional adjustments.
          </p>
          <Link
            href="/salary-benchmark"
            className="shrink-0 bg-teal text-off-white text-xs font-semibold px-4 py-2 rounded-full hover:bg-teal/90 transition-colors whitespace-nowrap"
          >
            Get the free benchmark →
          </Link>
        </div>
      </section>

      {/* Why not the alternatives */}
      <section className="py-16 bg-white border-b border-border/40">
        <div className="max-w-5xl mx-auto px-4">
          <AnimateIn>
            <p className="text-xs font-semibold text-brand-slate uppercase tracking-[0.18em] text-center mb-10">
              Why practices choose us
            </p>
            <div className="grid md:grid-cols-3 gap-4">
              {[
                {
                  versus: "vs. Agencies",
                  heading: "Keep the £8k per hire",
                  body: "A £45k aesthetic nurse hire through an agency costs £6,750–£11,250 in fees. Practice Pro is £249/month for unlimited listings across every discipline. One successful hire pays for years of the platform.",
                },
                {
                  versus: "vs. Indeed & Reed",
                  heading: "No unqualified flood",
                  body: "\"Virtually all applications from completely unqualified individuals.\" — Indeed employer, Trustpilot. Indeed now costs £700+/month for sponsored visibility. We're £149 per listing, private-practice only.",
                },
                {
                  versus: "vs. NHS Jobs",
                  heading: "Private practice only",
                  body: "NHS Jobs is built for NHS trusts — private practices can't even post there. Professionals searching NHS Jobs want NHS pay bands, not private practice careers. Ours are looking specifically for independent roles.",
                },
              ].map((item) => (
                <div key={item.versus} className="bg-off-white border border-border rounded-2xl p-6">
                  <p className="text-[10px] font-bold text-teal uppercase tracking-widest mb-3">{item.versus}</p>
                  <p className="text-sm font-bold text-navy mb-2">{item.heading}</p>
                  <p className="text-xs text-brand-slate leading-relaxed">{item.body}</p>
                </div>
              ))}
            </div>
          </AnimateIn>
        </div>
      </section>

      {/* Professions */}
      <section className="py-16 bg-white border-b border-border/40">
        <div className="max-w-5xl mx-auto px-4">
          <AnimateIn>
            <p className="text-xs font-semibold text-brand-slate uppercase tracking-[0.18em] text-center mb-8">
              88 regulated professions covered
            </p>
            <div className="flex flex-wrap gap-2 justify-center">
              {PROFESSIONS.map(p => (
                <Link
                  key={p.value}
                  href={`/roles/${professionToSlug(p.value)}`}
                  className="px-4 py-2 text-sm bg-off-white border border-border rounded-full text-navy hover:bg-teal hover:text-off-white hover:border-teal transition-all duration-200"
                >
                  {p.label}
                </Link>
              ))}
            </div>
          </AnimateIn>
        </div>
      </section>

      {/* Pricing comparison */}
      <section className="py-16 bg-white border-b border-border/40">
        <div className="max-w-4xl mx-auto px-4">
          <AnimateIn>
            <p className="text-xs font-semibold text-brand-slate uppercase tracking-[0.18em] text-center mb-3">Pricing</p>
            <h2 className="text-2xl md:text-3xl font-bold text-navy text-center mb-2">
              The cheapest specialist board in the UK.
            </h2>
            <p className="text-brand-slate text-sm text-center mb-10">By quite a lot — and the only one that covers every discipline.</p>
            <div className="bg-off-white border border-border rounded-2xl overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left px-5 py-3 text-brand-slate font-semibold text-xs uppercase tracking-wide">Platform</th>
                      <th className="text-left px-5 py-3 text-brand-slate font-semibold text-xs uppercase tracking-wide">Cost per listing</th>
                      <th className="text-left px-5 py-3 text-brand-slate font-semibold text-xs uppercase tracking-wide hidden sm:table-cell">Covers all disciplines?</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { name: "Vet Times Jobs", price: "£595 +VAT", allDisciplines: false },
                      { name: "BDJ Jobs (dental)", price: "£430–£790 +VAT", allDisciplines: false },
                      { name: "Indeed (sponsored)", price: "£700+ per month", allDisciplines: false },
                      { name: "CSP Jobs (physio)", price: "£220–£370 +VAT", allDisciplines: false },
                      { name: "Reed", price: "£199–£799 +VAT", allDisciplines: false },
                    ].map((row) => (
                      <tr key={row.name} className="border-b border-border/50">
                        <td className="px-5 py-3 text-navy/70">{row.name}</td>
                        <td className="px-5 py-3 text-navy/70">{row.price}</td>
                        <td className="px-5 py-3 text-navy/40 hidden sm:table-cell text-xs">One discipline only</td>
                      </tr>
                    ))}
                    <tr className="bg-teal/5 border-t-2 border-teal/20">
                      <td className="px-5 py-3.5 font-bold text-teal">The Practice Standard</td>
                      <td className="px-5 py-3.5 font-bold text-teal">£149 +VAT</td>
                      <td className="px-5 py-3.5 font-bold text-teal hidden sm:table-cell text-xs">Yes — all 88 professions</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <p className="text-center mt-5">
              <Link
                href="/auth/register"
                className="inline-flex bg-teal text-off-white px-6 py-3 rounded-full font-semibold text-sm hover:bg-teal/90 transition-colors"
              >
                Post a role — from £149
              </Link>
            </p>
          </AnimateIn>
        </div>
      </section>

      {/* For practices — dark */}
      <section className="py-24 bg-navy">
        <div className="max-w-6xl mx-auto px-4">
          <AnimateIn>
            <div className="grid md:grid-cols-2 gap-14 lg:gap-20 items-center">
              <div>
                <p className="text-xs font-semibold text-mint uppercase tracking-[0.18em] mb-5">For practices</p>
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-5 leading-tight">
                  High standards attract great people.
                </h2>
                <p className="text-white/55 text-sm leading-relaxed mb-7">
                  Reach verified, registered professionals across every discipline — without the agency markup. Post a role in minutes and receive applications from people who actually want to work in private practice.
                </p>
                <div className="space-y-3 mb-8">
                  {[
                    "Vet, optician, aesthetics, physio, private medical and more",
                    "Applications managed in your dashboard",
                    "Unlimited listings from £249/month with Practice Pro",
                  ].map((item) => (
                    <div key={item} className="flex items-start gap-3">
                      <div className="mt-1 w-3.5 h-3.5 rounded-full bg-mint/20 flex items-center justify-center shrink-0">
                        <div className="w-1.5 h-1.5 rounded-full bg-mint" />
                      </div>
                      <span className="text-white/60 text-sm">{item}</span>
                    </div>
                  ))}
                </div>
                <Link
                  href="/pricing"
                  className="inline-flex bg-mint text-navy px-6 py-3 rounded-full font-semibold text-sm hover:bg-mint/85 transition-colors"
                >
                  See pricing
                </Link>
              </div>

              <AnimateIn direction="left" delay={0.15}>
                <div className="relative aspect-[3/4] rounded-2xl overflow-hidden shadow-2xl shadow-black/30">
                  <Image
                    src="https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?auto=format&fit=crop&w=600&q=80"
                    alt="Private healthcare professional at work"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy/60 via-transparent to-transparent" />
                  <div className="absolute bottom-5 left-5 right-5">
                    <p className="text-white/50 text-[10px] uppercase tracking-wider mb-1">Role posted</p>
                    <p className="text-white font-semibold text-sm">Senior Aesthetic Nurse — Manchester</p>
                  </div>
                </div>
              </AnimateIn>
            </div>
          </AnimateIn>
        </div>
      </section>

      {/* For professionals — light */}
      <section className="py-24 bg-off-white">
        <div className="max-w-6xl mx-auto px-4">
          <AnimateIn>
            <div className="grid md:grid-cols-2 gap-14 lg:gap-20 items-center">

              <AnimateIn direction="right" delay={0.1}>
                <div className="relative aspect-[3/4] rounded-2xl overflow-hidden shadow-xl shadow-teal/8 order-2 md:order-1">
                  <Image
                    src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=600&q=80"
                    alt="Registered healthcare professional"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy/20 via-transparent to-transparent" />
                </div>
              </AnimateIn>

              <div className="order-1 md:order-2">
                <p className="text-xs font-semibold text-teal uppercase tracking-[0.18em] mb-5">For professionals</p>
                <h2 className="text-3xl md:text-4xl font-bold text-navy mb-5 leading-tight">
                  Your career, at a higher standard.
                </h2>
                <p className="text-brand-slate text-sm leading-relaxed mb-7">
                  Private practice roles used to be invisible — buried under NHS listings or locked behind agency relationships. Not here. Browse and apply for free, always.
                </p>
                <div className="space-y-3 mb-8">
                  {[
                    "Always free to search and apply — no fees, ever",
                    "Private practice roles only — no NHS clutter",
                    "Track every application in one dashboard",
                  ].map((item) => (
                    <div key={item} className="flex items-start gap-3">
                      <div className="mt-1 w-3.5 h-3.5 rounded-full bg-teal/10 flex items-center justify-center shrink-0">
                        <div className="w-1.5 h-1.5 rounded-full bg-teal" />
                      </div>
                      <span className="text-navy/65 text-sm">{item}</span>
                    </div>
                  ))}
                </div>
                <Link
                  href="/auth/register"
                  className="inline-flex border-2 border-teal text-teal px-6 py-3 rounded-full font-semibold text-sm hover:bg-teal hover:text-off-white transition-colors"
                >
                  Create free account
                </Link>
              </div>
            </div>
          </AnimateIn>
        </div>
      </section>

      {/* Honest early-stage CTA strip */}
      <section className="py-14 bg-teal">
        <AnimateIn>
          <div className="max-w-2xl mx-auto px-4 text-center">
            <h2 className="text-2xl font-bold text-off-white mb-3">
              Post your next role without paying agency fees.
            </h2>
            <p className="text-off-white/60 text-sm mb-7">
              From £149 per listing. Candidates always free. No contracts.
            </p>
            <div className="flex flex-wrap gap-3 justify-center">
              <Link
                href="/auth/register"
                className="bg-white text-teal px-6 py-3 rounded-full font-semibold text-sm hover:bg-off-white transition-colors"
              >
                Post a role — from £149
              </Link>
              <Link
                href="/about"
                className="border-2 border-white/30 text-white px-6 py-3 rounded-full font-semibold text-sm hover:border-white transition-colors"
              >
                About The Practice Standard
              </Link>
            </div>
          </div>
        </AnimateIn>
      </section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [
              {
                "@type": "Organization",
                "@id": `${base}/#organization`,
                name: "The Practice Standard",
                url: base,
                logo: {
                  "@type": "ImageObject",
                  url: `${base}/icon`,
                  width: 32,
                  height: 32,
                },
                description: "The UK's specialist job board for regulated private healthcare practices — dental, veterinary, optometry, aesthetics, physiotherapy, and private medical.",
                areaServed: { "@type": "Country", name: "United Kingdom" },
              },
              {
                "@type": "WebSite",
                "@id": `${base}/#website`,
                url: base,
                name: "The Practice Standard",
                publisher: { "@id": `${base}/#organization` },
                potentialAction: {
                  "@type": "SearchAction",
                  target: {
                    "@type": "EntryPoint",
                    urlTemplate: `${base}/jobs?q={search_term_string}`,
                  },
                  "query-input": "required name=search_term_string",
                },
              },
            ],
          }),
        }}
      />
    </>
  )
}
