"use client"
import Link from "next/link"
import { motion } from "framer-motion"

const lines = ["The hiring standard", "for modern", "healthcare."]

export function HomeHero({ count }: { count: number }) {
  return (
    <section className="relative overflow-hidden bg-off-white">
      {/* Ambient blobs */}
      <div className="absolute top-10 right-1/4 w-72 h-72 bg-mint/25 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/5 w-56 h-56 bg-teal/8 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-5xl mx-auto px-4 py-28 text-center">
        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-3 mb-10"
        >
          <span className="h-px w-8 bg-teal/30" />
          <span className="text-[11px] font-semibold text-teal uppercase tracking-[0.2em]">
            Where better practices hire
          </span>
          <span className="h-px w-8 bg-teal/30" />
        </motion.div>

        {/* Headline — line-by-line reveal */}
        <h1 className="mb-8 leading-[1.06] tracking-tight">
          {lines.map((line, i) => (
            <span key={i} className="block overflow-hidden">
              <motion.span
                className="block text-5xl md:text-7xl font-bold text-navy"
                initial={{ y: "105%" }}
                animate={{ y: 0 }}
                transition={{ duration: 0.7, delay: 0.15 + i * 0.12, ease: [0.16, 1, 0.3, 1] }}
              >
                {i === 2 ? (
                  <>{"healthcare."}</>
                ) : line}
              </motion.span>
            </span>
          ))}
          {/* Teal accent line under last word */}
          <motion.span
            className="block overflow-hidden mt-1"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.6, delay: 0.55, ease: [0.16, 1, 0.3, 1] }}
            style={{ transformOrigin: "left" }}
          >
            <span className="block h-1 w-32 mx-auto bg-mint rounded-full" />
          </motion.span>
        </h1>

        {/* Subtext */}
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.55 }}
          className="text-lg text-brand-slate mb-10 max-w-lg mx-auto leading-relaxed"
        >
          A UK jobs board for dentistry, medical, aesthetics and more. Free for candidates — built for the professions that matter.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.65 }}
          className="flex flex-wrap gap-3 justify-center"
        >
          <Link
            href="/jobs"
            className="bg-teal text-off-white px-7 py-3.5 rounded-full font-semibold text-sm hover:bg-teal/90 transition-colors shadow-sm"
          >
            Browse{count > 0 ? ` ${count}` : ""} open roles
          </Link>
          <Link
            href="/auth/register"
            className="border-2 border-teal/25 text-teal px-7 py-3.5 rounded-full font-semibold text-sm hover:border-teal hover:bg-teal/5 transition-colors"
          >
            Post a job — from £149
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
