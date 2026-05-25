import { createClient } from "@/lib/supabase/server"
import { JobCard } from "@/components/jobs/JobCard"
import { JobFilters } from "@/components/jobs/JobFilters"
import { Suspense } from "react"
import { PROFESSIONS, UK_REGIONS } from "@/lib/constants"
import { professionToSlug, regionToSlug, getBaseUrl } from "@/lib/seo"
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
    .eq("payment_status", "paid")
    .order("published_at", { ascending: false })

  if (searchParams.profession) query = query.eq("profession", searchParams.profession)
  if (searchParams.region) query = query.eq("region", searchParams.region)
  if (searchParams.type) query = query.eq("job_type", searchParams.type)
  if (searchParams.q) query = query.textSearch("title", searchParams.q, { type: "websearch" })

  const { data: jobs } = await query.limit(50)

  if (!jobs?.length) {
    return (
      <div className="bg-white border border-border rounded-2xl p-12 text-center mt-6">
        <p className="text-navy font-semibold mb-2">No roles found</p>
        <p className="text-brand-slate text-sm">Try adjusting your filters or check back soon.</p>
      </div>
    )
  }

  return (
    <div className="space-y-3 mt-6">
      {jobs.map(job => <JobCard key={job.id} job={job as unknown as Job} />)}
    </div>
  )
}

const DISCIPLINE_GROUPS = [
  {
    label: "Dentistry",
    description: "General dentists, associate dentists, orthodontists, dental hygienists, dental nurses and practice managers at private dental practices.",
    professions: ["general_dentist", "associate_dentist", "orthodontist", "dental_hygienist", "dental_nurse", "dental_practice_manager"],
  },
  {
    label: "Aesthetics & MedSpa",
    description: "Aesthetic nurses, doctors, injectors, laser technicians, skin therapists and clinic management roles.",
    professions: ["aesthetic_nurse", "aesthetic_doctor", "nurse_injector", "skin_therapist", "clinic_manager"],
  },
  {
    label: "Veterinary",
    description: "Veterinarians and veterinary nurses at independent and corporate private practices across the UK.",
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

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <div className="mb-6">
        <p className="text-xs font-semibold text-teal uppercase tracking-[0.18em] mb-2">Open roles</p>
        <h1 className="text-2xl font-bold text-navy">Private Healthcare Jobs UK</h1>
        <p className="text-brand-slate text-sm mt-1">Dental, veterinary, optometry, aesthetics, physiotherapy and private medical roles — always free to apply.</p>
      </div>
      <Suspense fallback={null}>
        <JobFilters />
      </Suspense>
      <Suspense fallback={<p className="text-brand-slate text-sm mt-6">Loading jobs…</p>}>
        <JobList searchParams={resolvedParams} />
      </Suspense>

      {/* Browse by discipline — always visible, gives Google content + helps navigation */}
      <div className="mt-16 border-t border-border pt-10">
        <p className="text-xs font-semibold text-brand-slate uppercase tracking-[0.18em] mb-6">Browse by discipline</p>
        <div className="space-y-6">
          {DISCIPLINE_GROUPS.map(group => (
            <div key={group.label}>
              <h2 className="text-sm font-bold text-navy mb-1">{group.label}</h2>
              <p className="text-xs text-brand-slate mb-2 leading-relaxed">{group.description}</p>
              <div className="flex flex-wrap gap-1.5">
                {group.professions.map(prof => {
                  const match = PROFESSIONS.find(p => p.value === prof)
                  if (!match) return null
                  return (
                    <Link
                      key={prof}
                      href={`/roles/${professionToSlug(prof)}`}
                      className="px-3 py-1 text-xs border border-border rounded-full text-navy hover:bg-teal hover:text-off-white hover:border-teal transition-all duration-200"
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

      {/* Browse by region */}
      <div className="mt-10 border-t border-border pt-8">
        <p className="text-xs font-semibold text-brand-slate uppercase tracking-[0.18em] mb-4">Browse by region</p>
        <div className="flex flex-wrap gap-2">
          {UK_REGIONS.map(region => (
            <Link
              key={region}
              href={`/jobs?region=${encodeURIComponent(region)}`}
              className="px-3 py-1.5 text-sm border border-border rounded-full text-navy hover:bg-teal hover:text-off-white hover:border-teal transition-all duration-200"
            >
              {region}
            </Link>
          ))}
        </div>
      </div>

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
    </div>
  )
}
