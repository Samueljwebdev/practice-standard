import { createClient } from "@/lib/supabase/server"
import { notFound } from "next/navigation"
import { verticalLabel } from "@/lib/clinics"
import { getBaseUrl } from "@/lib/seo"
import Link from "next/link"
import { ClaimButton } from "@/components/clinics/ClaimButton"
import type { Clinic } from "@/types/database"
import type { Metadata } from "next"

interface Props { params: Promise<{ slug: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const supabase = await createClient()
  const { data: c } = await supabase.from("clinics").select("name, city, category").eq("slug", slug).single()
  if (!c) return { title: "Clinic Not Found" }
  const base = getBaseUrl()
  return {
    title: `${c.name} — ${c.city} | The Practice Standard`,
    description: `${c.name}, a ${(c.category || "healthcare").toLowerCase()} in ${c.city}. View details and current vacancies on The Practice Standard.`,
    alternates: { canonical: `${base}/clinics/${slug}` },
  }
}

export default async function ClinicProfilePage({ params }: Props) {
  const { slug } = await params
  const supabase = await createClient()
  const { data } = await supabase.from("clinics").select("*").eq("slug", slug).single()
  if (!data) notFound()
  const clinic = data as Clinic

  // Who's viewing — to decide the claim CTA.
  const { data: { user } } = await supabase.auth.getUser()
  let userRole: "practice" | "candidate" | null = null
  if (user) {
    const { data: p } = await supabase.from("profiles").select("role").eq("id", user.id).maybeSingle()
    userRole = (p?.role as "practice" | "candidate") ?? null
  }

  const base = getBaseUrl()
  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <nav className="text-sm text-brand-slate mb-6 flex items-center gap-2 flex-wrap">
        <Link href="/clinics" className="hover:text-teal transition-colors">Clinics</Link>
        <span className="text-border">·</span>
        <Link href={`/clinics?vertical=${clinic.vertical}`} className="hover:text-teal transition-colors">{verticalLabel(clinic.vertical)}</Link>
        <span className="text-border">·</span>
        <span className="text-navy truncate">{clinic.name}</span>
      </nav>

      <div className="bg-white border border-border rounded-2xl p-8 space-y-6">
        <div>
          <div className="flex items-start justify-between gap-4 mb-1.5">
            <h1 className="text-2xl font-bold text-navy">{clinic.name}</h1>
            {clinic.is_hiring && (
              <span className="shrink-0 inline-flex items-center gap-1.5 rounded-full bg-teal/10 px-3 py-1 text-[11px] font-semibold text-teal border border-teal/20">
                <span className="h-1.5 w-1.5 rounded-full bg-teal animate-pulse" /> Hiring now
              </span>
            )}
          </div>
          <p className="text-brand-slate text-sm">{clinic.category} · {clinic.city}{clinic.region ? `, ${clinic.region}` : ""}</p>
        </div>

        <div className="flex flex-wrap gap-6 text-sm border-t border-b border-border py-4">
          <div>
            <p className="text-brand-slate text-xs uppercase tracking-wide mb-0.5">Discipline</p>
            <p className="font-semibold text-navy">{verticalLabel(clinic.vertical)}</p>
          </div>
          {clinic.rating != null && (
            <div>
              <p className="text-brand-slate text-xs uppercase tracking-wide mb-0.5">Rating</p>
              <p className="font-semibold text-navy">★ {clinic.rating}{clinic.reviews_count ? ` · ${clinic.reviews_count} reviews` : ""}</p>
            </div>
          )}
          {clinic.website && (
            <div>
              <p className="text-brand-slate text-xs uppercase tracking-wide mb-0.5">Website</p>
              <a href={clinic.website} target="_blank" rel="noopener noreferrer nofollow" className="font-semibold text-teal hover:underline">Visit site →</a>
            </div>
          )}
        </div>

        {clinic.is_hiring && clinic.careers_url && (
          <div className="rounded-xl bg-teal/5 border border-teal/15 p-4 flex items-center justify-between gap-4">
            <p className="text-sm text-navy font-medium">This clinic is advertising vacancies.</p>
            <a href={clinic.careers_url} target="_blank" rel="noopener noreferrer nofollow"
              className="shrink-0 rounded-full bg-teal text-off-white px-4 py-2 text-xs font-semibold hover:bg-teal/90 transition-colors">
              View their vacancies →
            </a>
          </div>
        )}

        {/* Claim funnel */}
        <div className="rounded-xl bg-navy p-6">
          {clinic.claimed_by_practice_id ? (
            <p className="text-sm text-white/70 flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} className="text-mint"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
              This profile has been claimed by the practice.
            </p>
          ) : (
            <>
              <p className="text-mint text-[11px] font-semibold uppercase tracking-[0.18em] mb-1.5">Is this your clinic?</p>
              <p className="text-white font-bold mb-1">Claim this profile — free.</p>
              <p className="text-white/55 text-sm mb-4">Manage your listing and receive register-verified applicants directly. No agency fees, candidates always free.</p>
              <ClaimButton clinicId={clinic.id} slug={clinic.slug} clinicName={clinic.name} userRole={userRole} />
            </>
          )}
        </div>
      </div>

      <p className="text-center text-xs text-brand-slate/70 mt-4">
        Listing information is sourced from public records.{" "}
        <a href={`mailto:hello@thepracticestandard.co.uk?subject=Clinic%20listing%20-%20${encodeURIComponent(clinic.name)}`} className="underline hover:text-teal">Request a change or removal</a>.
      </p>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context": "https://schema.org", "@type": "MedicalBusiness",
        name: clinic.name, url: `${base}/clinics/${clinic.slug}`,
        address: { "@type": "PostalAddress", addressLocality: clinic.city, addressRegion: clinic.region, addressCountry: "GB" },
        ...(clinic.rating ? { aggregateRating: { "@type": "AggregateRating", ratingValue: clinic.rating, reviewCount: clinic.reviews_count ?? 1 } } : {}),
      }) }} />
    </div>
  )
}
