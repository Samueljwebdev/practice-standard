import Link from "next/link"
import Image from "next/image"
import { createClient } from "@/lib/supabase/server"
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

      {/* Benchmark banner */}
      <section className="border-b border-teal/12 bg-teal/5 py-4">
        <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-3 px-6 sm:flex-row">
          <p className="text-center text-sm text-navy sm:text-left">
            <span className="font-bold">Free:</span> UK Private Practice Salary Benchmark 2026 — know what to pay before you post. 25+ roles, 5 disciplines, regional adjustments.
          </p>
          <Link
            href="/salary-benchmark"
            className="group inline-flex shrink-0 items-center gap-2 rounded-full bg-teal px-5 py-2 text-xs font-semibold text-off-white transition-[box-shadow,transform] duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:bg-teal/90 active:scale-[0.98] whitespace-nowrap"
          >
            Get the free benchmark →
          </Link>
        </div>
      </section>

      {/* ── How it works — asymmetric bento ── */}
      <section className="bg-white py-24 px-6 border-b border-border/40">
        <div className="mx-auto max-w-5xl">
          <AnimateIn>
            <p className="mb-4 text-center text-[11px] font-semibold uppercase tracking-[0.22em] text-brand-slate">
              How it works
            </p>
            <h2 className="mb-12 text-center text-2xl font-black tracking-[-0.02em] text-navy md:text-3xl">
              Post a role. Get applications. Hire directly.
            </h2>
          </AnimateIn>

          {/* Bento grid — 12-col at md */}
          <div className="grid gap-3 md:grid-cols-12">

            {/* Card 1 — wide (7 cols): col-span on AnimateIn so it IS the grid item */}
            <AnimateIn delay={0.05} className="md:col-span-7">
              <div className="h-full rounded-[1.75rem] bg-gradient-to-b from-navy/4 to-navy/2 p-[1.5px] ring-1 ring-navy/8">
                <div className="h-full rounded-[calc(1.75rem-1.5px)] bg-white p-8 shadow-[inset_0_1px_1px_rgba(255,255,255,0.8)]">
                  <div className="mb-5 inline-flex h-10 w-10 items-center justify-center rounded-full bg-teal/10">
                    <span className="text-sm font-black text-teal">1</span>
                  </div>
                  <h3 className="mb-3 text-[1.1rem] font-black tracking-[-0.02em] text-navy">
                    Post your role in minutes
                  </h3>
                  <p className="text-sm leading-relaxed text-brand-slate">
                    Fill in the job details, pay once, and your listing goes live immediately — visible across every relevant profession and region page. No account manager. No back-and-forth.
                  </p>
                  <div className="mt-7 rounded-xl bg-off-white px-5 py-4">
                    <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-brand-slate">Cost comparison</p>
                    <div className="flex items-baseline gap-3">
                      <span className="text-2xl font-black text-teal">£149</span>
                      <span className="text-xs text-brand-slate">vs. £9,000 avg agency fee</span>
                    </div>
                  </div>
                </div>
              </div>
            </AnimateIn>

            {/* Card 2 — narrow (5 cols) */}
            <AnimateIn delay={0.1} className="md:col-span-5">
              <div className="h-full rounded-[1.75rem] bg-gradient-to-b from-teal to-teal/90 p-[1.5px]">
                <div className="h-full rounded-[calc(1.75rem-1.5px)] bg-teal p-8">
                  <div className="mb-5 inline-flex h-10 w-10 items-center justify-center rounded-full bg-white/15">
                    <span className="text-sm font-black text-white">2</span>
                  </div>
                  <h3 className="mb-3 text-[1.1rem] font-black tracking-[-0.02em] text-white">
                    Reach registered professionals
                  </h3>
                  <p className="text-sm leading-relaxed text-white/65">
                    Your role reaches candidates who are registered with their professional body — NMC, RCVS, HCPC, GOC — and actively looking for private practice work. No NHS noise. No unqualified flood.
                  </p>
                  <div className="mt-7 flex items-center gap-3">
                    <div className="h-px flex-1 bg-white/15" />
                    <span className="text-[11px] font-semibold text-white/40">88 professions covered</span>
                    <div className="h-px flex-1 bg-white/15" />
                  </div>
                </div>
              </div>
            </AnimateIn>

            {/* Card 3 — full width (12 cols), horizontal at md */}
            <AnimateIn delay={0.15} className="md:col-span-12">
              <div className="rounded-[1.75rem] bg-gradient-to-b from-navy/4 to-navy/2 p-[1.5px] ring-1 ring-navy/8">
                <div className="flex flex-col items-start gap-6 rounded-[calc(1.75rem-1.5px)] bg-white p-8 shadow-[inset_0_1px_1px_rgba(255,255,255,0.8)] md:flex-row md:items-center">
                  <div className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-teal/10">
                    <span className="text-sm font-black text-teal">3</span>
                  </div>
                  <div className="flex-1">
                    <h3 className="mb-1.5 text-[1.1rem] font-black tracking-[-0.02em] text-navy">
                      Review and respond directly
                    </h3>
                    <p className="text-sm leading-relaxed text-brand-slate max-w-xl">
                      Applications come straight to your dashboard. No consultant in the middle. You see every applicant, shortlist who you want, and respond directly — no placement fee when you hire.
                    </p>
                  </div>
                  <Link
                    href="/auth/register"
                    className="group inline-flex shrink-0 items-center gap-2.5 rounded-full bg-navy px-6 py-3 text-sm font-semibold text-white transition-[transform,background-color] duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:bg-navy/85 active:scale-[0.98]"
                  >
                    Post a role
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white/15 text-xs transition-transform duration-500 group-hover:translate-x-0.5">
                      →
                    </span>
                  </Link>
                </div>
              </div>
            </AnimateIn>
          </div>
        </div>
      </section>

      {/* ── Why practices choose us — dark dramatic cards ── */}
      <section className="bg-navy py-24 px-6">
        <div className="mx-auto max-w-5xl">
          <AnimateIn>
            <p className="mb-4 text-center text-[11px] font-semibold uppercase tracking-[0.22em] text-mint/60">
              Why practices choose us
            </p>
            <h2 className="mb-12 text-center text-2xl font-black tracking-[-0.02em] text-white md:text-3xl">
              The alternative to the alternative.
            </h2>
          </AnimateIn>
          <div className="grid gap-3 md:grid-cols-3">
            {[
              {
                versus: "vs. Agencies",
                stat: "£9k",
                statLabel: "avg fee, avoided",
                heading: "Keep the placement fee",
                body: "A £45k aesthetic nurse hire through an agency costs £6,750–£11,250. Practice Pro at £249/month is less than one agency invoice for unlimited hires across every discipline.",
              },
              {
                versus: "vs. Indeed & Reed",
                stat: "0",
                statLabel: "unqualified applicants",
                heading: "No unqualified flood",
                body: `"Virtually all applications from completely unqualified individuals." — Indeed employer, Trustpilot. Indeed now costs £700+/month. We're £149 per listing, private-practice only.`,
              },
              {
                versus: "vs. NHS Jobs",
                stat: "88",
                statLabel: "professions, one board",
                heading: "Private practice only",
                body: "NHS Jobs is built for NHS trusts. Professionals searching it want NHS pay bands, not independent practice careers. Ours are looking specifically for private roles.",
              },
            ].map((item, i) => (
              <AnimateIn key={item.versus} delay={0.06 * i}>
                <div className="h-full rounded-[1.75rem] bg-white/5 p-[1.5px] ring-1 ring-white/10">
                  <div className="h-full rounded-[calc(1.75rem-1.5px)] bg-navy p-7 shadow-[inset_0_1px_1px_rgba(255,255,255,0.06)]">
                    <p className="mb-5 text-[10px] font-bold uppercase tracking-widest text-mint/70">{item.versus}</p>
                    <p className="mb-1 text-[2.5rem] font-black leading-none tracking-tight text-white">{item.stat}</p>
                    <p className="mb-5 text-[11px] text-white/35">{item.statLabel}</p>
                    <p className="mb-2 text-sm font-bold text-white">{item.heading}</p>
                    <p className="text-xs leading-relaxed text-white/45">{item.body}</p>
                  </div>
                </div>
              </AnimateIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── Team / social proof image ── */}
      <section className="bg-off-white py-24 px-6 border-b border-border/40">
        <div className="mx-auto max-w-5xl">
          <AnimateIn>
            <p className="mb-3 text-center text-[11px] font-semibold uppercase tracking-[0.22em] text-brand-slate">
              Built for practices like yours
            </p>
            <h2 className="mb-10 text-center text-2xl font-black tracking-[-0.02em] text-navy md:text-3xl">
              The people who use The Practice Standard.
            </h2>
          </AnimateIn>
          <AnimateIn delay={0.1}>
            {/* Wide double-bezel image */}
            <div className="rounded-[2rem] bg-gradient-to-b from-navy/5 to-navy/2 p-2 ring-1 ring-navy/8 shadow-[0_4px_40px_rgba(13,27,42,0.06)]">
              <div className="relative aspect-[16/9] overflow-hidden rounded-[calc(2rem-0.5rem)] shadow-[inset_0_1px_1px_rgba(255,255,255,0.7)]">
                <Image
                  src="/images/aesthetics-team.png"
                  alt="Aesthetics clinic team — The Practice Standard"
                  fill
                  className="object-cover object-center"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy/50 via-transparent to-transparent" />
                {/* Overlay caption */}
                <div className="absolute bottom-5 left-5 flex items-center gap-3">
                  <span className="rounded-full bg-mint/20 px-3 py-1 text-[10px] font-semibold text-mint backdrop-blur-sm border border-mint/20">
                    Aesthetics &amp; MedSpa
                  </span>
                  <span className="text-[11px] text-white/60">Private clinic, South East England</span>
                </div>
              </div>
            </div>
          </AnimateIn>
          {/* Discipline strip */}
          <AnimateIn delay={0.18}>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              {["Dental", "Aesthetics", "Veterinary", "Optometry", "Physiotherapy", "Private Medical"].map(d => (
                <span key={d} className="rounded-full border border-navy/10 bg-white px-4 py-1.5 text-[11px] font-semibold text-navy/60">
                  {d}
                </span>
              ))}
            </div>
          </AnimateIn>
        </div>
      </section>

      {/* ── Professions — curated shortlist ── */}
      <section className="bg-white py-20 px-6 border-b border-border/40">
        <div className="mx-auto max-w-5xl">
          <AnimateIn>
            <p className="mb-8 text-center text-[11px] font-semibold uppercase tracking-[0.22em] text-brand-slate">
              Popular roles
            </p>
            <div className="flex flex-wrap justify-center gap-2">
              {[
                { value: "aesthetic_nurse",      label: "Aesthetic Nurse" },
                { value: "dental_hygienist",     label: "Dental Hygienist" },
                { value: "veterinarian",          label: "Veterinarian" },
                { value: "physiotherapist",       label: "Physiotherapist" },
                { value: "private_gp",            label: "Private GP" },
                { value: "optometrist",           label: "Optometrist" },
                { value: "dental_nurse",          label: "Dental Nurse" },
                { value: "dental_practice_manager", label: "Practice Manager" },
              ].map(p => (
                <Link
                  key={p.value}
                  href={`/roles/${professionToSlug(p.value)}`}
                  className="rounded-full border border-border bg-off-white px-4 py-2 text-sm text-navy transition-all duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] hover:border-teal hover:bg-teal hover:text-off-white"
                >
                  {p.label}
                </Link>
              ))}
              <Link
                href="/jobs"
                className="rounded-full border-2 border-teal/30 bg-transparent px-4 py-2 text-sm font-semibold text-teal transition-all duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] hover:border-teal hover:bg-teal hover:text-off-white"
              >
                Browse all 88 roles →
              </Link>
            </div>
          </AnimateIn>
        </div>
      </section>

      {/* ── Pricing comparison ── */}
      <section className="bg-off-white py-24 px-6 border-b border-border/40">
        <div className="mx-auto max-w-4xl">
          <AnimateIn>
            <p className="mb-3 text-center text-[11px] font-semibold uppercase tracking-[0.22em] text-brand-slate">Pricing</p>
            <h2 className="mb-2 text-center text-2xl font-black tracking-[-0.02em] text-navy md:text-3xl">
              The cheapest specialist board in the UK.
            </h2>
            <p className="mb-10 text-center text-sm text-brand-slate">
              By quite a lot — and the only one that covers every discipline.
            </p>

            <div className="rounded-[1.75rem] bg-gradient-to-b from-navy/5 to-navy/2 p-[1.5px] ring-1 ring-navy/8 overflow-hidden">
              <div className="overflow-hidden rounded-[calc(1.75rem-1.5px)] bg-white shadow-[inset_0_1px_1px_rgba(255,255,255,0.8)]">
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-border bg-off-white">
                        <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-brand-slate">Platform</th>
                        <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-brand-slate">Cost per listing</th>
                        <th className="hidden px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide text-brand-slate sm:table-cell">All disciplines?</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        { name: "Vet Times Jobs", price: "£595 +VAT" },
                        { name: "BDJ Jobs (dental)", price: "£430–£790 +VAT" },
                        { name: "Indeed (sponsored)", price: "£700+ per month" },
                        { name: "CSP Jobs (physio)", price: "£220–£370 +VAT" },
                        { name: "Reed", price: "£199–£799 +VAT" },
                      ].map((row) => (
                        <tr key={row.name} className="border-b border-border/40">
                          <td className="px-6 py-3.5 text-navy/60">{row.name}</td>
                          <td className="px-6 py-3.5 text-navy/60">{row.price}</td>
                          <td className="hidden px-6 py-3.5 text-xs text-navy/35 sm:table-cell">One discipline only</td>
                        </tr>
                      ))}
                      {/* TPS highlight row */}
                      <tr className="bg-teal/6 border-t-2 border-teal/20">
                        <td className="px-6 py-4 font-bold text-teal">The Practice Standard</td>
                        <td className="px-6 py-4 font-bold text-teal">£149 +VAT</td>
                        <td className="hidden px-6 py-4 text-xs font-bold text-teal sm:table-cell">Yes — all 88 professions</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            <p className="mt-6 text-center">
              <Link
                href="/auth/register"
                className="group inline-flex items-center gap-2.5 rounded-full bg-teal px-7 py-3.5 text-sm font-semibold text-off-white shadow-[0_4px_24px_rgba(15,61,62,0.2)] transition-[box-shadow,transform] duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:shadow-[0_6px_32px_rgba(15,61,62,0.3)] active:scale-[0.98]"
              >
                Post a role — from £149
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white/20 text-xs transition-transform duration-500 group-hover:translate-x-0.5">
                  →
                </span>
              </Link>
            </p>
          </AnimateIn>
        </div>
      </section>

      {/* ── For practices — dark, double-bezel image ── */}
      <section className="bg-navy py-28 px-6">
        <div className="mx-auto max-w-6xl">
          <AnimateIn>
            <div className="grid items-center gap-14 md:grid-cols-2 lg:gap-20">
              <div>
                <p className="mb-5 text-[11px] font-semibold uppercase tracking-[0.22em] text-mint">For practices</p>
                <h2 className="mb-5 text-3xl font-black leading-tight tracking-[-0.02em] text-white md:text-4xl">
                  High standards attract great people.
                </h2>
                <p className="mb-7 text-sm leading-relaxed text-white/50">
                  Reach verified, registered professionals across every discipline — without the agency markup. Post a role in minutes and receive applications from people who actually want to work in private practice.
                </p>
                <div className="mb-8 space-y-3.5">
                  {[
                    "Vet, optician, aesthetics, physio, private medical and more",
                    "Applications managed in your dashboard",
                    "Unlimited listings from £249/month with Practice Pro",
                  ].map((item) => (
                    <div key={item} className="flex items-start gap-3">
                      <div className="mt-1 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-mint/20">
                        <div className="h-1.5 w-1.5 rounded-full bg-mint" />
                      </div>
                      <span className="text-sm text-white/55">{item}</span>
                    </div>
                  ))}
                </div>
                <Link
                  href="/pricing"
                  className="group inline-flex items-center gap-2.5 rounded-full bg-mint px-6 py-3 text-sm font-semibold text-navy transition-[box-shadow,transform] duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:bg-mint/85 active:scale-[0.98]"
                >
                  See pricing
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-navy/10 text-xs transition-transform duration-500 group-hover:translate-x-0.5">
                    →
                  </span>
                </Link>
              </div>

              <AnimateIn direction="left" delay={0.15}>
                {/* Double-bezel image — dark variant */}
                <div className="relative rounded-[2.5rem] bg-gradient-to-b from-white/10 to-white/4 p-2 ring-1 ring-white/10">
                  <div className="relative aspect-[3/4] overflow-hidden rounded-[calc(2.5rem-0.5rem)] shadow-[inset_0_1px_1px_rgba(255,255,255,0.12)]">
                    <Image
                      src="/images/for-practices.png"
                      alt="Private clinic manager — The Practice Standard"
                      fill
                      className="object-cover object-top"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-navy/70 via-navy/10 to-transparent" />
                    <div className="absolute bottom-5 left-5 right-5 rounded-2xl border border-white/12 bg-white/10 p-4 backdrop-blur-2xl">
                      <p className="mb-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-white/50">Practice posting</p>
                      <p className="text-sm font-bold text-white">Clinic Manager — Bristol</p>
                    </div>
                  </div>
                </div>
              </AnimateIn>
            </div>
          </AnimateIn>
        </div>
      </section>

      {/* ── For professionals — light, double-bezel image ── */}
      <section className="bg-white py-28 px-6 border-b border-border/40">
        <div className="mx-auto max-w-6xl">
          <AnimateIn>
            <div className="grid items-center gap-14 md:grid-cols-2 lg:gap-20">

              <AnimateIn direction="right" delay={0.1}>
                {/* Double-bezel image — light variant */}
                <div className="relative rounded-[2.5rem] bg-gradient-to-b from-navy/6 to-navy/2 p-2 ring-1 ring-navy/8 order-2 md:order-1">
                  <div className="relative aspect-[3/4] overflow-hidden rounded-[calc(2.5rem-0.5rem)] shadow-[inset_0_1px_1px_rgba(255,255,255,0.6)]">
                    <Image
                      src="/images/aesthetics-consultation.jpg"
                      alt="Aesthetics professional consulting a patient — The Practice Standard"
                      fill
                      sizes="(max-width: 768px) 100vw, 600px"
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-navy/25 via-transparent to-transparent" />
                  </div>
                </div>
              </AnimateIn>

              <div className="order-1 md:order-2">
                <p className="mb-5 text-[11px] font-semibold uppercase tracking-[0.22em] text-teal">For professionals</p>
                <h2 className="mb-5 text-3xl font-black leading-tight tracking-[-0.02em] text-navy md:text-4xl">
                  Your career, at a higher standard.
                </h2>
                <p className="mb-7 text-sm leading-relaxed text-brand-slate">
                  Private practice roles used to be invisible — buried under NHS listings or locked behind agency relationships. Not here. Browse and apply for free, always.
                </p>
                <div className="mb-8 space-y-3.5">
                  {[
                    "Always free to search and apply — no fees, ever",
                    "Private practice roles only — no NHS clutter",
                    "Track every application in one dashboard",
                  ].map((item) => (
                    <div key={item} className="flex items-start gap-3">
                      <div className="mt-1 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-teal/10">
                        <div className="h-1.5 w-1.5 rounded-full bg-teal" />
                      </div>
                      <span className="text-sm text-navy/65">{item}</span>
                    </div>
                  ))}
                </div>
                <Link
                  href="/auth/register"
                  className="group inline-flex items-center gap-2.5 rounded-full border-2 border-teal px-6 py-3 text-sm font-semibold text-teal transition-[background-color,color,transform] duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:bg-teal hover:text-off-white active:scale-[0.98]"
                >
                  Create free account
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-teal/10 text-xs transition-transform duration-500 group-hover:translate-x-0.5 group-hover:bg-white/20">
                    →
                  </span>
                </Link>
              </div>
            </div>
          </AnimateIn>
        </div>
      </section>

      {/* ── Final CTA strip ── */}
      <section className="bg-teal py-20 px-6">
        <AnimateIn>
          <div className="mx-auto max-w-2xl text-center">
            <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.22em] text-mint/60">Ready to hire?</p>
            <h2 className="mb-3 text-2xl font-black tracking-[-0.02em] text-white md:text-3xl">
              Post your next role without paying agency fees.
            </h2>
            <p className="mb-9 text-sm text-white/50">
              From £149 per listing. Candidates always free. No contracts.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <Link
                href="/auth/register"
                className="group inline-flex items-center gap-2.5 rounded-full bg-white px-7 py-3.5 text-sm font-semibold text-teal shadow-[0_4px_24px_rgba(0,0,0,0.12)] transition-[box-shadow,transform] duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:shadow-[0_6px_32px_rgba(0,0,0,0.18)] active:scale-[0.98]"
              >
                Post a role — from £149
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-teal/10 text-xs transition-transform duration-500 group-hover:translate-x-0.5">
                  →
                </span>
              </Link>
              <Link
                href="/about"
                className="inline-flex rounded-full border-2 border-white/25 px-7 py-3.5 text-sm font-semibold text-white transition-[border-color,transform] duration-500 hover:border-white/50 active:scale-[0.98]"
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
                logo: { "@type": "ImageObject", url: `${base}/icon`, width: 32, height: 32 },
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
                  target: { "@type": "EntryPoint", urlTemplate: `${base}/jobs?q={search_term_string}` },
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
