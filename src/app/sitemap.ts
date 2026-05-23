import type { MetadataRoute } from "next"
import { createClient } from "@/lib/supabase/server"
import { PROFESSIONS, UK_REGIONS } from "@/lib/constants"
import { professionToSlug, regionToSlug, getBaseUrl } from "@/lib/seo"

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = getBaseUrl()
  const supabase = await createClient()

  const { data: jobs } = await supabase
    .from("jobs")
    .select("slug, published_at")
    .eq("status", "active")
    .eq("payment_status", "paid")

  const jobUrls: MetadataRoute.Sitemap = (jobs ?? []).map(job => ({
    url: `${base}/jobs/${job.slug}`,
    lastModified: job.published_at ?? new Date().toISOString(),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }))

  const professionUrls: MetadataRoute.Sitemap = PROFESSIONS.map(p => ({
    url: `${base}/roles/${professionToSlug(p.value)}`,
    changeFrequency: "daily" as const,
    priority: 0.7,
  }))

  const regionUrls: MetadataRoute.Sitemap = PROFESSIONS.flatMap(p =>
    UK_REGIONS.map(region => ({
      url: `${base}/roles/${professionToSlug(p.value)}/${regionToSlug(region)}`,
      changeFrequency: "daily" as const,
      priority: 0.6,
    }))
  )

  return [
    { url: base, changeFrequency: "daily" as const, priority: 1 },
    { url: `${base}/jobs`, changeFrequency: "daily" as const, priority: 0.9 },
    { url: `${base}/pricing`, changeFrequency: "monthly" as const, priority: 0.6 },
    ...jobUrls,
    ...professionUrls,
    ...regionUrls,
  ]
}
