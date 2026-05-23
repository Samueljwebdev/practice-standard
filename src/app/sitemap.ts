import type { MetadataRoute } from "next"
import { createClient } from "@/lib/supabase/server"

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = process.env.NEXT_PUBLIC_BASE_URL!
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

  return [
    { url: base, changeFrequency: "daily" as const, priority: 1 },
    { url: `${base}/jobs`, changeFrequency: "daily" as const, priority: 0.9 },
    { url: `${base}/pricing`, changeFrequency: "monthly" as const, priority: 0.6 },
    ...jobUrls,
  ]
}
