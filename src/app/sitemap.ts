import type { MetadataRoute } from "next"
import { createClient } from "@/lib/supabase/server"
import { PROFESSIONS, UK_REGIONS } from "@/lib/constants"
import { professionToSlug, regionToSlug, getBaseUrl } from "@/lib/seo"
import { getBlogPosts } from "@/lib/blog-content"

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

  const { data: clinics } = await supabase.from("clinics").select("slug")
  const clinicUrls: MetadataRoute.Sitemap = (clinics ?? []).map(c => ({
    url: `${base}/clinics/${c.slug}`,
    changeFrequency: "weekly" as const,
    priority: 0.5,
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

  const blogUrls: MetadataRoute.Sitemap = getBlogPosts().map(post => ({
    url: `${base}/blog/${post.slug}`,
    lastModified: post.date,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }))

  return [
    { url: base, changeFrequency: "daily" as const, priority: 1 },
    { url: `${base}/jobs`, changeFrequency: "daily" as const, priority: 0.9 },
    { url: `${base}/clinics`, changeFrequency: "daily" as const, priority: 0.7 },
    { url: `${base}/tools/hiring-cost-calculator`, changeFrequency: "monthly" as const, priority: 0.7 },
    { url: `${base}/pricing`, changeFrequency: "monthly" as const, priority: 0.6 },
    { url: `${base}/blog`, changeFrequency: "weekly" as const, priority: 0.7 },
    { url: `${base}/salary-benchmark`, changeFrequency: "monthly" as const, priority: 0.6 },
    { url: `${base}/alternatives`, changeFrequency: "monthly" as const, priority: 0.6 },
    ...blogUrls,
    ...jobUrls,
    ...clinicUrls,
    ...professionUrls,
    ...regionUrls,
  ]
}
