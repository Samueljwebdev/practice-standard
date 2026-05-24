import Link from "next/link"
import { AnimateIn } from "@/components/ui/AnimateIn"
import { getBaseUrl } from "@/lib/seo"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "About | The Practice Standard",
  description: "The Practice Standard is the UK's specialist job board for regulated private healthcare practices. Built because private practice deserves better than NHS job boards and agency fees.",
  alternates: { canonical: `${getBaseUrl()}/about` },
}

const stats = [
  { figure: "£13.75bn", label: "UK private healthcare market (2024)" },
  { figure: "5,000+", label: "independent aesthetic clinics in the UK" },
  { figure: "10.3%", label: "vacancy rate in UK optometry" },
  { figure: "15–25%", label: "typical agency fee on a clinical hire" },
]

const disciplines = [
  { name: "Veterinary", note: "RCVS-registered vets and vet nurses" },
  { name: "Optometry", note: "GOC-registered optometrists and dispensing opticians" },
  { name: "Aesthetics", note: "Aesthetic doctors, nurses, and skin therapists" },
  { name: "Physiotherapy", note: "HCPC-registered physios and allied health professionals" },
  { name: "Private Medical", note: "Private GPs, consultants, and clinical support" },
  { name: "Mental Health", note: "BABCP and BACP-accredited therapists and counsellors" },
]

export default function AboutPage() {
  const base = getBaseUrl()

  return (
    <div className="max-w-3xl mx-auto px-4 py-16">

      {/* Hero */}
      <AnimateIn>
        <p className="text-xs font-semibold text-teal uppercase tracking-[0.18em] mb-4">About</p>
        <h1 className="text-3xl md:text-4xl font-bold text-navy mb-6 leading-tight">
          Private practice deserves<br className="hidden md:block" /> its own hiring standard.
        </h1>
        <p className="text-lg text-brand-slate leading-relaxed mb-4">
          The UK's private healthcare sector is a £13.75 billion industry. It employs tens of thousands of registered professionals. It is growing every year, driven by record NHS waiting lists and rising patient demand for accessible, quality care.
        </p>
        <p className="text-lg text-brand-slate leading-relaxed">
          And yet there is no job board built for it.
        </p>
      </AnimateIn>

      {/* The problem */}
      <AnimateIn delay={0.08}>
        <div className="border-t border-border mt-12 pt-12">
          <h2 className="text-xl font-bold text-navy mb-5">The problem with every alternative</h2>
          <div className="space-y-4 text-navy/70 text-[15px] leading-relaxed">
            <p>
              NHS Jobs is built for the NHS. Posting a private practice role there reaches people who want hospital jobs, band-by-band progression, and NHS pension schemes. The fit is almost never right.
            </p>
            <p>
              Indeed and Reed are volume boards. They generate applications — most of which are from candidates who aren't registered, aren't qualified, or aren't looking for private practice work at all. Practices waste hours reviewing irrelevant CVs.
            </p>
            <p>
              Specialist agencies charge 15–25% of first-year salary. For a clinical hire at £45,000, that's up to £11,250 per placement. For a growing practice hiring two or three people a year, that cost compounds fast.
            </p>
            <p>
              Discipline-specific boards — RCVS Jobs, Dentistry.co.uk, aesthetic-specific platforms — only cover one profession. A multi-disciplinary private clinic still has to post across five different sites to cover all its roles.
            </p>
          </div>
        </div>
      </AnimateIn>

      {/* What we're building */}
      <AnimateIn delay={0.12}>
        <div className="border-t border-border mt-12 pt-12">
          <h2 className="text-xl font-bold text-navy mb-5">What we're building</h2>
          <div className="space-y-4 text-navy/70 text-[15px] leading-relaxed">
            <p>
              The Practice Standard is a single destination for private practice hiring across all regulated healthcare disciplines. Practices post roles. Registered professionals apply. Candidates always search and apply for free.
            </p>
            <p>
              We're not trying to compete with NHS Jobs on volume. We're building something smaller, more specific, and more useful — a platform where the job board itself is a signal that a practice operates at a certain standard.
            </p>
            <p>
              We cover 88 regulated professions across 12 UK regions. Every profession page is written specifically for that discipline — what the role involves, who regulates it, what the salary range looks like in private practice. The content is built for professionals who are actively looking, not passively browsing.
            </p>
          </div>
        </div>
      </AnimateIn>

      {/* Stats */}
      <AnimateIn delay={0.15}>
        <div className="grid grid-cols-2 gap-4 mt-12">
          {stats.map((s) => (
            <div key={s.figure} className="bg-white border border-border rounded-2xl p-6">
              <p className="text-2xl font-bold text-teal mb-1">{s.figure}</p>
              <p className="text-xs text-brand-slate leading-snug">{s.label}</p>
            </div>
          ))}
        </div>
      </AnimateIn>

      {/* Disciplines */}
      <AnimateIn delay={0.18}>
        <div className="border-t border-border mt-12 pt-12">
          <p className="text-xs font-semibold text-brand-slate uppercase tracking-[0.15em] mb-6">Disciplines covered</p>
          <div className="space-y-3">
            {disciplines.map((d) => (
              <div key={d.name} className="flex items-start gap-4">
                <span className="text-mint font-bold text-sm mt-0.5 w-4 shrink-0">—</span>
                <div>
                  <span className="text-sm font-semibold text-navy">{d.name}</span>
                  <span className="text-sm text-brand-slate ml-2">{d.note}</span>
                </div>
              </div>
            ))}
          </div>
          <p className="text-sm text-brand-slate mt-4">
            Plus dentistry, operations and management roles, and more.{" "}
            <Link href="/jobs" className="text-teal hover:underline">Browse all open roles →</Link>
          </p>
        </div>
      </AnimateIn>

      {/* Early stage honesty */}
      <AnimateIn delay={0.2}>
        <div className="bg-white border border-border rounded-2xl p-8 mt-12">
          <p className="text-xs font-semibold text-teal uppercase tracking-[0.15em] mb-3">Where we are</p>
          <p className="text-[15px] text-navy/70 leading-relaxed mb-4">
            The Practice Standard is new. We're building the candidate supply and working with early practices who see the same gap we do. If you post now, you'll have less competition for applicant attention than you will in a year — and you'll be helping shape what this platform becomes.
          </p>
          <p className="text-[15px] text-navy/70 leading-relaxed">
            We'd rather be honest about that than pretend we've been doing this for a decade.
          </p>
        </div>
      </AnimateIn>

      {/* Contact */}
      <AnimateIn delay={0.22}>
        <div className="border-t border-border mt-12 pt-12">
          <p className="text-xs font-semibold text-brand-slate uppercase tracking-[0.15em] mb-4">Get in touch</p>
          <p className="text-[15px] text-navy/70 leading-relaxed mb-6">
            Questions about posting a role, pricing, or anything else — reach us at{" "}
            <a href="mailto:hello@thepracticestandard.co.uk" className="text-teal hover:underline">
              hello@thepracticestandard.co.uk
            </a>
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/auth/register"
              className="inline-flex bg-teal text-off-white px-5 py-2.5 rounded-full text-sm font-semibold hover:bg-teal/90 transition-colors"
            >
              Post a role — from £149
            </Link>
            <Link
              href="/jobs"
              className="inline-flex border border-border text-navy px-5 py-2.5 rounded-full text-sm font-semibold hover:border-teal hover:text-teal transition-colors"
            >
              Browse open roles
            </Link>
          </div>
        </div>
      </AnimateIn>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "AboutPage",
            url: `${base}/about`,
            name: "About The Practice Standard",
            description: "The Practice Standard is the UK's specialist job board for regulated private healthcare practices.",
            publisher: {
              "@type": "Organization",
              name: "The Practice Standard",
              url: base,
            },
          }),
        }}
      />
    </div>
  )
}
