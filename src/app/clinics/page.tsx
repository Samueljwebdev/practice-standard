import { createClient } from "@/lib/supabase/server"
import { CLINIC_VERTICALS, verticalLabel } from "@/lib/clinics"
import { UK_REGIONS } from "@/lib/constants"
import { getBaseUrl } from "@/lib/seo"
import Link from "next/link"
import type { Clinic } from "@/types/database"
import type { Metadata } from "next"

export function generateMetadata(): Metadata {
  const base = getBaseUrl()
  return {
    title: "UK Private Healthcare Clinic Directory | The Practice Standard",
    description: "Browse private veterinary, aesthetic, physiotherapy, optometry, dental and medical clinics across the UK. Find clinics that are hiring, or claim your practice profile.",
    alternates: { canonical: `${base}/clinics` },
  }
}

interface PageProps { searchParams: Promise<{ vertical?: string; region?: string }> }

export default async function ClinicsPage({ searchParams }: PageProps) {
  const sp = await searchParams
  const supabase = await createClient()

  let query = supabase
    .from("clinics")
    .select("slug, name, category, vertical, city, region, is_hiring, rating, reviews_count")
    .order("is_hiring", { ascending: false })
    .order("reviews_count", { ascending: false, nullsFirst: false })

  if (sp.vertical) query = query.eq("vertical", sp.vertical)
  if (sp.region) query = query.eq("region", sp.region)

  const { data: clinics } = await query.limit(120)
  const hiringCount = clinics?.filter(c => c.is_hiring).length ?? 0

  return (
    <>
      <section className="relative overflow-hidden bg-white border-b border-navy/6">
        <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute right-0 top-0 h-[400px] w-[500px] -translate-y-1/4 translate-x-1/3 rounded-full bg-mint/15 blur-[120px]" />
        </div>
        <div className="relative mx-auto max-w-4xl px-6 pt-14 pb-9">
          <span className="inline-flex items-center gap-2.5 rounded-full border border-teal/20 bg-teal/5 px-4 py-1.5 mb-6">
            <span className="h-1.5 w-1.5 rounded-full bg-teal" />
            <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-teal">Clinic directory</span>
          </span>
          <h1 className="text-[clamp(1.8rem,4vw,2.8rem)] font-black leading-[0.95] tracking-[-0.03em] text-navy mb-3">
            UK Private Healthcare Clinics
          </h1>
          <p className="text-brand-slate text-sm leading-relaxed max-w-lg">
            Veterinary, aesthetic, physiotherapy, optometry, dental and private-medical clinics across the UK.
            {hiringCount > 0 && <> <span className="text-teal font-semibold">{hiringCount} hiring now</span> in this view.</>}
          </p>
        </div>
      </section>

      <section className="bg-off-white min-h-[50vh] px-6 py-9">
        <div className="mx-auto max-w-4xl">
          {/* Vertical filters */}
          <div className="flex flex-wrap gap-2 mb-3">
            <Link href="/clinics" className={`px-3.5 py-1.5 text-xs font-medium border rounded-full transition-colors ${!sp.vertical ? "bg-teal text-off-white border-teal" : "border-navy/12 text-navy/70 hover:border-teal"}`}>All</Link>
            {CLINIC_VERTICALS.map(v => (
              <Link key={v.value} href={`/clinics?vertical=${v.value}${sp.region ? `&region=${encodeURIComponent(sp.region)}` : ""}`}
                className={`px-3.5 py-1.5 text-xs font-medium border rounded-full transition-colors ${sp.vertical === v.value ? "bg-teal text-off-white border-teal" : "border-navy/12 text-navy/70 hover:border-teal"}`}>
                {v.label}
              </Link>
            ))}
          </div>
          {/* Region filters */}
          <div className="flex flex-wrap gap-1.5 mb-6">
            {UK_REGIONS.map(r => (
              <Link key={r} href={`/clinics?region=${encodeURIComponent(r)}${sp.vertical ? `&vertical=${sp.vertical}` : ""}`}
                className={`px-3 py-1 text-[11px] font-medium border rounded-full transition-colors ${sp.region === r ? "bg-navy text-white border-navy" : "border-navy/10 text-navy/60 hover:border-navy/40"}`}>
                {r}
              </Link>
            ))}
          </div>

          {!clinics?.length ? (
            <div className="rounded-2xl bg-white p-12 text-center ring-1 ring-navy/8">
              <p className="text-navy font-bold mb-1">No clinics in this view</p>
              <Link href="/clinics" className="text-teal text-sm font-medium hover:underline">Clear filters</Link>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 gap-3">
              {(clinics as Partial<Clinic>[]).map(c => (
                <Link key={c.slug} href={`/clinics/${c.slug}`}
                  className="group rounded-2xl bg-white p-4 ring-1 ring-navy/8 hover:ring-teal/25 hover:shadow-[0_6px_24px_rgba(15,61,62,0.08)] transition-[box-shadow,ring-color]">
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <h2 className="font-bold text-navy text-sm leading-snug truncate group-hover:text-teal transition-colors">{c.name}</h2>
                      <p className="text-xs text-brand-slate mt-0.5">{c.category} · {c.city}</p>
                    </div>
                    {c.is_hiring && (
                      <span className="shrink-0 inline-flex items-center gap-1 rounded-full bg-teal/10 px-2 py-0.5 text-[10px] font-semibold text-teal border border-teal/20">
                        <span className="h-1 w-1 rounded-full bg-teal animate-pulse" /> Hiring
                      </span>
                    )}
                  </div>
                  <div className="mt-2.5 pt-2.5 border-t border-navy/6 flex items-center gap-2 text-[11px] text-brand-slate">
                    <span className="font-medium text-navy/70">{verticalLabel(c.vertical)}</span>
                    {c.rating ? <><span className="text-navy/20">·</span><span>★ {c.rating}{c.reviews_count ? ` (${c.reviews_count})` : ""}</span></> : null}
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Claim CTA */}
      <section className="bg-navy py-14 px-6">
        <div className="mx-auto max-w-4xl flex flex-col md:flex-row md:items-center md:justify-between gap-5">
          <div>
            <p className="text-[11px] font-semibold text-mint uppercase tracking-[0.2em] mb-2">Own one of these clinics?</p>
            <p className="text-xl font-black text-white leading-tight mb-1">Claim your free profile.</p>
            <p className="text-white/50 text-sm">Manage your listing and receive register-verified applicants — no agency fees.</p>
          </div>
          <Link href="/auth/register" className="shrink-0 rounded-full bg-mint px-6 py-3.5 text-sm font-semibold text-navy hover:bg-mint/85 transition-colors">
            Claim your profile →
          </Link>
        </div>
      </section>
    </>
  )
}
