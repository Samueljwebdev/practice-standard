import { notFound } from "next/navigation"
import Link from "next/link"
import { getBlogPost, getBlogPosts, type Block } from "@/lib/blog-content"

import { AnimateIn } from "@/components/ui/AnimateIn"
import { getBaseUrl } from "@/lib/seo"
import type { Metadata } from "next"

type Props = { params: Promise<{ slug: string }> }

export async function generateStaticParams() {
  return getBlogPosts().map(p => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const post = getBlogPost(slug)
  if (!post) return {}
  const base = getBaseUrl()
  return {
    title: `${post.title} | The Practice Standard`,
    description: post.description,
    alternates: { canonical: `${base}/blog/${slug}` },
  }
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params
  const post = getBlogPost(slug)
  if (!post) notFound()

  const base = getBaseUrl()
  const related = getBlogPosts().filter(p => p.slug !== post.slug).slice(0, 2)

  return (
    <>
      <section className="bg-navy py-14 px-4">
        <div className="max-w-3xl mx-auto">
          <AnimateIn>
            <Link href="/blog" className="text-xs font-semibold text-mint/70 hover:text-mint transition-colors mb-6 inline-flex items-center gap-1.5">
              ← Back to resources
            </Link>
            <div className="flex items-center gap-3 mb-4 mt-2">
              <span className="text-[10px] font-bold text-mint uppercase tracking-widest bg-mint/10 px-2.5 py-1 rounded-full">
                {post.category}
              </span>
              <span className="text-white/40 text-xs">{post.readingTime}</span>
              <span className="text-white/40 text-xs">
                {new Date(post.date).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })}
              </span>
            </div>
            <h1 className="text-2xl md:text-3xl font-bold text-white leading-tight mb-4">
              {post.title}
            </h1>
            <p className="text-white/55 text-sm leading-relaxed max-w-2xl">
              {post.description}
            </p>
          </AnimateIn>
        </div>
      </section>

      <section className="py-12 bg-off-white px-4">
        <div className="max-w-3xl mx-auto">
          <div className="grid md:grid-cols-[1fr_280px] gap-10 items-start">
            <article>
              <AnimateIn>
                <div className="space-y-5">
                  {post.blocks.map((block, i) => (
                    <BlockRenderer key={i} block={block} />
                  ))}
                </div>
              </AnimateIn>
            </article>

            <div className="md:sticky md:top-8 space-y-4">
              <AnimateIn direction="left" delay={0.1}>
                <div className="bg-teal rounded-2xl p-6">
                  <p className="text-xs font-semibold text-mint uppercase tracking-[0.18em] mb-2">Post a role</p>
                  <p className="text-white font-semibold text-sm mb-1">Reach registered professionals</p>
                  <p className="text-white/50 text-xs mb-4 leading-relaxed">
                    From £149 +VAT per listing. No agency fees. No NHS noise.
                  </p>
                  <Link
                    href="/auth/register"
                    className="block w-full text-center bg-mint text-navy px-4 py-2.5 rounded-full text-sm font-semibold hover:bg-mint/85 transition-colors"
                  >
                    Post a role — from £149
                  </Link>
                </div>

                <div className="bg-white border border-border rounded-2xl p-5 mt-4">
                  <p className="text-xs font-semibold text-brand-slate uppercase tracking-[0.18em] mb-3">Free resource</p>
                  <p className="text-navy font-semibold text-sm mb-1">Salary Benchmark 2026</p>
                  <p className="text-brand-slate text-xs mb-3 leading-relaxed">
                    Salary ranges for 25+ roles across 5 disciplines. Regional adjustments included.
                  </p>
                  <Link
                    href="/salary-benchmark"
                    className="block w-full text-center border border-teal/30 text-teal px-4 py-2 rounded-full text-xs font-semibold hover:border-teal hover:bg-teal/5 transition-colors"
                  >
                    Get the free benchmark →
                  </Link>
                </div>
              </AnimateIn>
            </div>
          </div>
        </div>
      </section>

      {related.length > 0 && (
        <section className="py-10 bg-white border-t border-border/40 px-4">
          <div className="max-w-3xl mx-auto">
            <p className="text-xs font-semibold text-brand-slate uppercase tracking-[0.18em] mb-5">More guides</p>
            <div className="grid sm:grid-cols-2 gap-4">
              {related.map(r => (
                <Link
                  key={r.slug}
                  href={`/blog/${r.slug}`}
                  className="group block bg-off-white border border-border rounded-xl p-5 hover:border-teal/30 transition-colors"
                >
                  <p className="text-[10px] font-bold text-teal uppercase tracking-widest mb-2">{r.category}</p>
                  <p className="text-sm font-semibold text-navy group-hover:text-teal transition-colors leading-snug">
                    {r.title}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [
              {
                "@type": "Article",
                headline: post.title,
                description: post.description,
                datePublished: post.date,
                dateModified: post.date,
                author: { "@type": "Organization", name: "The Practice Standard" },
                publisher: {
                  "@type": "Organization",
                  name: "The Practice Standard",
                  logo: { "@type": "ImageObject", url: `${base}/icon` },
                },
                url: `${base}/blog/${post.slug}`,
              },
              {
                "@type": "BreadcrumbList",
                itemListElement: [
                  { "@type": "ListItem", position: 1, name: "Home", item: base },
                  { "@type": "ListItem", position: 2, name: "Blog", item: `${base}/blog` },
                  { "@type": "ListItem", position: 3, name: post.title, item: `${base}/blog/${post.slug}` },
                ],
              },
            ],
          }),
        }}
      />
    </>
  )
}

function BlockRenderer({ block }: { block: Block }) {
  switch (block.type) {
    case "p":
      return <p className="text-navy/75 text-sm leading-7">{block.text}</p>

    case "h2":
      return <h2 className="text-xl font-bold text-navy mt-8 mb-1 leading-snug">{block.text}</h2>

    case "h3":
      return <h3 className="text-base font-bold text-navy mt-5 mb-1 leading-snug">{block.text}</h3>

    case "ul":
      return (
        <ul className="space-y-2 pl-1">
          {block.items.map((item, i) => (
            <li key={i} className="flex items-start gap-2.5 text-sm text-navy/75">
              <span className="mt-2.5 w-1.5 h-1.5 rounded-full bg-teal shrink-0" />
              <span className="leading-7">{item}</span>
            </li>
          ))}
        </ul>
      )

    case "ol":
      return (
        <ol className="space-y-2 pl-1">
          {block.items.map((item, i) => (
            <li key={i} className="flex items-start gap-3 text-sm text-navy/75">
              <span className="mt-0.5 w-5 h-5 rounded-full bg-teal/10 flex items-center justify-center text-[10px] font-bold text-teal shrink-0">
                {i + 1}
              </span>
              <span className="leading-7">{item}</span>
            </li>
          ))}
        </ol>
      )

    case "callout":
      return (
        <div className="bg-teal/5 border-l-4 border-teal rounded-r-xl px-5 py-4 my-4">
          {block.heading && (
            <p className="text-[10px] font-bold text-teal uppercase tracking-widest mb-1.5">{block.heading}</p>
          )}
          <p className="text-sm text-navy/80 leading-relaxed">{block.text}</p>
        </div>
      )

    case "stats":
      return (
        <div className="grid grid-cols-2 gap-3 my-4">
          {block.items.map((stat, i) => (
            <div key={i} className="bg-white border border-border rounded-xl p-4">
              <p className="text-xl font-bold text-teal leading-none mb-1">{stat.value}</p>
              <p className="text-xs text-brand-slate leading-snug">{stat.label}</p>
            </div>
          ))}
        </div>
      )

    case "table":
      return (
        <div className="overflow-x-auto my-4 rounded-xl border border-border">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-off-white border-b border-border">
                {block.headers.map((h, i) => (
                  <th key={i} className="text-left px-4 py-2.5 text-navy/60 font-semibold text-xs uppercase tracking-wide whitespace-nowrap">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {block.rows.map((row, ri) => (
                <tr key={ri} className={`border-b border-border/50 last:border-0 ${ri % 2 === 1 ? "bg-off-white/50" : "bg-white"}`}>
                  {row.map((cell, ci) => (
                    <td key={ci} className="px-4 py-3 text-navy/70 text-xs leading-relaxed">
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )

    case "links":
      return (
        <div className="bg-off-white border border-border rounded-xl p-5 my-2">
          <p className="text-[10px] font-bold text-brand-slate uppercase tracking-widest mb-3">{block.heading}</p>
          <div className="flex flex-wrap gap-2">
            {block.items.map((link, i) => (
              <Link
                key={i}
                href={link.href}
                className="text-xs font-semibold text-teal border border-teal/25 px-3 py-1.5 rounded-full hover:bg-teal/5 hover:border-teal/60 transition-colors"
              >
                {link.label} →
              </Link>
            ))}
          </div>
        </div>
      )

    default:
      return null
  }
}
