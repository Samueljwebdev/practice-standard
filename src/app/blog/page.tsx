import Link from "next/link"
import { AnimateIn } from "@/components/ui/AnimateIn"
import { getBlogPosts } from "@/lib/blog-content"
import { getBaseUrl } from "@/lib/seo"
import type { Metadata } from "next"

export function generateMetadata(): Metadata {
  const base = getBaseUrl()
  return {
    title: "Hiring Guides & Resources | The Practice Standard",
    description: "Practical hiring guides for UK private healthcare practices — aesthetics, veterinary, physiotherapy, optometry, and private medical. Salary benchmarks, recruitment costs, and what candidates really want.",
    alternates: { canonical: `${base}/blog` },
  }
}

const CATEGORY_COLORS: Record<string, string> = {
  "Aesthetics": "bg-teal/10 text-teal",
  "Veterinary": "bg-mint/30 text-teal",
  "Hiring": "bg-navy/8 text-navy",
  "Physiotherapy": "bg-teal/10 text-teal",
  "Private Medical": "bg-mint/30 text-teal",
}

export default function BlogIndexPage() {
  const posts = getBlogPosts()
  const base = getBaseUrl()

  return (
    <>
      <section className="bg-navy py-16 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <AnimateIn>
            <p className="text-xs font-semibold text-mint uppercase tracking-[0.18em] mb-4">Resources</p>
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-4 leading-tight">
              Hiring guides for private practice
            </h1>
            <p className="text-white/55 text-sm leading-relaxed max-w-lg mx-auto">
              Practical advice on hiring clinical and management staff across aesthetics, veterinary, physiotherapy, optometry, and private medical — without agency fees.
            </p>
          </AnimateIn>
        </div>
      </section>

      <section className="py-16 bg-off-white px-4">
        <div className="max-w-4xl mx-auto">
          <div className="space-y-6">
            {posts.map((post, i) => (
              <AnimateIn key={post.slug} delay={i * 0.06}>
                <Link
                  href={`/blog/${post.slug}`}
                  className="group block bg-white border border-border rounded-2xl p-7 hover:border-teal/30 hover:shadow-sm transition-all"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <span className={`text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full ${CATEGORY_COLORS[post.category] ?? "bg-teal/10 text-teal"}`}>
                      {post.category}
                    </span>
                    <span className="text-xs text-brand-slate">{post.readingTime}</span>
                    <span className="text-xs text-brand-slate">
                      {new Date(post.date).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })}
                    </span>
                  </div>
                  <h2 className="text-lg font-bold text-navy mb-2 group-hover:text-teal transition-colors leading-snug">
                    {post.title}
                  </h2>
                  <p className="text-brand-slate text-sm leading-relaxed line-clamp-2">
                    {post.description}
                  </p>
                  <p className="text-teal text-xs font-semibold mt-4 group-hover:underline">
                    Read more →
                  </p>
                </Link>
              </AnimateIn>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 bg-white border-t border-border/40 px-4">
        <div className="max-w-2xl mx-auto text-center">
          <p className="text-xs font-semibold text-brand-slate uppercase tracking-[0.18em] mb-3">Ready to post?</p>
          <p className="text-navy font-semibold mb-5">
            Reach registered private healthcare professionals without agency fees.
          </p>
          <Link
            href="/auth/register"
            className="inline-flex bg-teal text-off-white px-6 py-3 rounded-full text-sm font-semibold hover:bg-teal/90 transition-colors"
          >
            Post a role — from £149
          </Link>
        </div>
      </section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Home", item: base },
              { "@type": "ListItem", position: 2, name: "Blog", item: `${base}/blog` },
            ],
          }),
        }}
      />
    </>
  )
}
