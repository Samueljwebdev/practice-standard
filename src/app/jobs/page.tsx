import { createClient } from "@/lib/supabase/server"
import { JobCard } from "@/components/jobs/JobCard"
import { JobFilters } from "@/components/jobs/JobFilters"
import { Suspense } from "react"
import { PROFESSIONS, UK_REGIONS } from "@/lib/constants"
import { professionToSlug, getBaseUrl } from "@/lib/seo"
import Link from "next/link"
import type { Job } from "@/types/database"
import type { Metadata } from "next"

export function generateMetadata(): Metadata {
  const base = getBaseUrl()
  return {
    title: "Private Healthcare Jobs UK | The Practice Standard",
    description: "Browse dental, veterinary, optometry, aesthetics, physiotherapy and private medical jobs across the UK. Permanent, part-time, locum and contract roles at private practices. Always free to apply.",
    alternates: { canonical: `${base}/jobs` },
  }
}

interface PageProps {
  searchParams: Promise<{ q?: string; profession?: string; region?: string; type?: string }>
}

async function JobList({ searchParams }: { searchParams: Awaited<PageProps["searchParams"]> }) {
  const supabase = await createClient()
  let query = supabase
    .from("jobs")
    .select("*, practices(name, practice_type, city)")
    .eq("status", "active")
    // Practice listings must be paid; aggregated (wrapped) listings are public.
    .or("payment_status.eq.paid,source.eq.aggregated")
    .order("published_at", { ascending: false })

  if (searchParams.profession) query = query.eq("profession", searchParams.profession)
  if (searchParams.region) query = query.eq("region", searchParams.region)
  if (searchParams.type) query = query.eq("job_type", searchParams.type)
  if (searchParams.q) query = query.textSearch("title", searchParams.q, { type: "websearch" })

  const { data: jobs } = await query.limit(50)

  if (!jobs?.length) {
    return (
      <div className="mt-6 rounded-[2rem] bg-gradient-to-b from-navy/4 to-transparent p-2 ring-1 ring-navy/8">
        <div className="rounded-[calc(2rem-0.5rem)] bg-white p-12 text-center shadow-[inset_0_1px_1px_rgba(255,255,255,0.9)]">
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-brand-slate mb-3">No results</p>
          <p className="text-navy font-bold text-lg mb-2">No roles found</p>
          <p className="text-brand-slate text-sm mb-6 max-w-xs mx-auto leading-relaxed">
            Try adjusting your filters or check back soon — new roles are posted weekly.
          </p>
          <Link
            href="/jobs"
            className="inline-flex items-center gap-2 rounded-full border-2 border-teal/30 px-5 py-2.5 text-sm font-semibold text-teal transition-[border-color,background-color] duration-500 hover:border-teal hover:bg-teal/5"
          >
            Clear all filters
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-3 mt-5">
      {jobs.map(job => <JobCard key={job.id} job={job as unknown as Job} />)}
    </div>
  )
}

const DISCIPLINE_GROUPS = [
  {
    label: "Dentistry",
    description: "General dentists, associates, orthodontists, hygienists, nurses and practice managers at private dental practices.",
    professions: ["general_dentist", "associate_dentist", "orthodontist", "dental_hygienist", "dental_nurse", "dental_practice_manager"],
  },
  {
    label: "Aesthetics & MedSpa",
    description: "Aesthetic nurses, doctors, injectors, laser technicians, skin therapists and clinic management roles.",
    professions: ["aesthetic_nurse", "aesthetic_doctor", "nurse_injector", "skin_therapist", "clinic_manager"],
  },
  {
    label: "Veterinary",
    description: "Veterinarians and veterinary nurses at independent and corporate private practices.",
    professions: ["veterinarian", "vet_nurse"],
  },
  {
    label: "Optometry & Ophthalmology",
    description: "Optometrists, ophthalmologists and ophthalmic technicians at private optical practices.",
    professions: ["optometrist", "ophthalmologist", "ophthalmic_technician"],
  },
  {
    label: "Physiotherapy & Allied Health",
    description: "Physiotherapists, osteopaths, chiropractors, podiatrists, occupational therapists and more.",
    professions: ["physiotherapist", "osteopath", "chiropractor", "podiatrist", "occupational_therapist"],
  },
  {
    label: "Private Medical",
    description: "Private GPs, consultant specialists, dermatologists, surgical nurses and private hospital roles.",
    professions: ["private_gp", "consultant_specialist", "dermatologist", "practice_nurse", "theatre_nurse"],
  },
  {
    label: "Operations & Management",
    description: "Practice managers, operations managers, compliance leads and patient experience roles.",
    professions: ["operations_manager", "clinic_director", "compliance_manager", "patient_coordinator"],
  },
]

export default async function JobsPage({ searchParams }: PageProps) {
  const resolvedParams = await searchParams
  const base = getBaseUrl()
  const hasFilters = !!(resolvedParams.q || resolvedParams.profession || resolvedParams.region || resolvedParams.type)

  return (
    <>
      {/* ── Hero header ── */}
      <section className="relative overflow-hidden bg-white border-b border-navy/6">
        <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute right-0 top-0 h-[400px] w-[500px] -translate-y-1/4 translate-x-1/3 rounded-full bg-mint/15 blur-[120px]" />
        </div>

        <div className="relative mx-auto max-w-4xl px-6 pt-14 pb-10">
          <span className="inline-flex items-center gap-2.5 rounded-full border border-teal/20 bg-teal/5 px-4 py-1.5 mb-6">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-teal" />
            <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-teal">Open roles</span>
          </span>

          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6">
            <div>
              <h1 className="text-[clamp(1.8rem,4vw,2.8rem)] font-black leading-[0.95] tracking-[-0.03em] text-navy mb-3">
                Private Healthcare Jobs UK
              </h1>
              <p className="text-brand-slate text-sm leading-relaxed max-w-md">
                Dental, veterinary, aesthetics, physiotherapy and private medical roles — always free to apply.
              </p>
            </div>

            <Link
              href="/auth/register"
              className="group inline-flex shrink-0 items-center gap-3 rounded-full bg-teal px-5 py-3 text-sm font-semibold text-off-white shadow-[0_4px_24px_rgba(15,61,62,0.2)] transition-[box-shadow,transform] duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] hover:shadow-[0_6px_32px_rgba(15,61,62,0.3)] active:scale-[0.98]"
            >
              Post a role
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-white/20 text-xs leading-none transition-transform duration-700 group-hover:translate-x-0.5">
                →
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* ── Filters + results ── */}
      <section className="bg-off-white min-h-[50vh] px-6 py-10">
        <div className="mx-auto max-w-4xl">
          <Suspense fallback={null}>
            <JobFilters />
          </Suspense>
          <Suspense fallback={
            <div className="mt-5 space-y-3">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="h-24 rounded-2xl bg-white/60 animate-pulse" />
              ))}
            </div>
          }>
            <JobList searchParams={resolvedParams} />
          </Suspense>
        </div>
      </section>

      {/* ── Browse by discipline ── */}
      <section className="bg-white py-16 px-6 border-t border-navy/6">
        <div className="mx-auto max-w-4xl">
          <p className="text-[11px] font-semibold text-brand-slate uppercase tracking-[0.2em] mb-8">Browse by discipline</p>
          <div className="grid sm:grid-cols-2 gap-8">
            {DISCIPLINE_GROUPS.map(group => (
              <div key={group.label}>
                <h2 className="text-sm font-bold text-navy mb-1.5">{group.label}</h2>
                <p className="text-[11px] text-brand-slate/65 mb-3 leading-relaxed">{group.description}</p>
                <div className="flex flex-wrap gap-1.5">
                  {group.professions.map(prof => {
                    const match = PROFESSIONS.find(p => p.value === prof)
                    if (!match) return null
                    return (
                      <Link
                        key={prof}
                        href={`/roles/${professionToSlug(prof)}`}
                        className="px-3 py-1 text-[11px] font-medium border border-navy/12 rounded-full text-navy/70 transition-[background-color,border-color,color] duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] hover:bg-teal hover:text-off-white hover:border-teal"
                      >
                        {match.label}
                      </Link>
                    )
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Browse by region ── */}
      <section className="bg-off-white py-14 px-6 border-t border-navy/6">
        <div className="mx-auto max-w-4xl">
          <p className="text-[11px] font-semibold text-brand-slate uppercase tracking-[0.2em] mb-5">Browse by region</p>
          <div className="flex flex-wrap gap-2">
            {UK_REGIONS.map(region => (
              <Link
                key={region}
                href={`/jobs?region=${encodeURIComponent(region)}`}
                className={`px-4 py-2 text-sm font-medium border rounded-full transition-[background-color,border-color,color] duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] ${
                  resolvedParams.region === region
                    ? "bg-teal text-off-white border-teal"
                    : "border-navy/12 text-navy/70 hover:bg-teal hover:text-off-white hover:border-teal"
                }`}
              >
                {region}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── Practice CTA ── */}
      <section className="bg-navy py-16 px-6">
        <div className="mx-auto max-w-4xl flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div>
            <p className="text-[11px] font-semibold text-mint uppercase tracking-[0.2em] mb-2">For practices</p>
            <p className="text-xl font-black text-white leading-tight mb-1">Hiring? Reach registered professionals.</p>
            <p className="text-white/50 text-sm">From £{149} +VAT. No agency fees. No NHS noise.</p>
          </div>
          <Link
            href="/pricing"
            className="group inline-flex shrink-0 items-center gap-3 rounded-full bg-mint px-6 py-3.5 text-sm font-semibold text-navy shadow-[0_4px_24px_rgba(168,213,204,0.3)] transition-[box-shadow,transform] duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] hover:shadow-[0_6px_32px_rgba(168,213,204,0.45)] active:scale-[0.98]"
          >
            See pricing
            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-navy/10 text-xs leading-none transition-transform duration-700 group-hover:translate-x-0.5 group-hover:-translate-y-px">
              →
            </span>
          </Link>
        </div>
      </section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ItemList",
            name: "Private Healthcare Jobs UK",
            description: "Veterinary, optometry, aesthetics, physiotherapy and private medical jobs across the UK.",
            url: `${base}/jobs`,
          }),
        }}
      />
    </>
  )
}
