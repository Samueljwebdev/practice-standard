"use client"
import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"

const lines = ["The hiring standard", "for modern", "healthcare."]

export function HomeHero({ count }: { count: number }) {
  return (
    <section className="relative overflow-hidden bg-off-white">
      <div className="absolute inset-y-0 right-0 w-1/2 bg-gradient-to-l from-mint/12 to-transparent pointer-events-none" />

      <div className="relative max-w-6xl mx-auto px-4 py-16 md:py-24">
        <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-center">

          {/* Left: text */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-3 mb-8"
            >
              <span className="h-px w-6 bg-teal/30" />
              <span className="text-[11px] font-semibold text-teal uppercase tracking-[0.2em]">
                Where better practices hire
              </span>
            </motion.div>

            <h1 className="mb-7 tracking-tight">
              {lines.map((line, i) => (
                <span key={i} className="block overflow-hidden pb-[0.15em] -mb-[0.15em]">
                  <motion.span
                    className="block text-5xl md:text-6xl font-bold text-navy leading-[1.1]"
                    initial={{ y: "110%" }}
                    animate={{ y: 0 }}
                    transition={{ duration: 0.7, delay: 0.15 + i * 0.12, ease: [0.16, 1, 0.3, 1] }}
                  >
                    {line}
                  </motion.span>
                </span>
              ))}
              <motion.span
                className="block mt-4"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.6, delay: 0.58, ease: [0.16, 1, 0.3, 1] }}
                style={{ transformOrigin: "left" }}
              >
                <span className="block h-[3px] w-16 bg-mint rounded-full" />
              </motion.span>
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.56 }}
              className="text-[15px] text-brand-slate mb-9 max-w-md leading-relaxed"
            >
              The UK&apos;s specialist job board for regulated private healthcare practices. Post a role and reach registered professionals — without agency fees.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.65 }}
              className="flex flex-wrap gap-3"
            >
              <Link
                href="/auth/register"
                className="bg-teal text-off-white px-6 py-3 rounded-full font-semibold text-sm hover:bg-teal/90 transition-colors shadow-sm"
              >
                Post a role — from £149
              </Link>
              <Link
                href="/jobs"
                className="border-2 border-teal/25 text-teal px-6 py-3 rounded-full font-semibold text-sm hover:border-teal hover:bg-teal/5 transition-colors"
              >
                Browse{count > 0 ? ` ${count}` : ""} open roles
              </Link>
            </motion.div>
          </div>

          {/* Right: image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.85, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="relative hidden md:block"
          >
            <div className="relative aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl shadow-teal/10">
              <Image
                src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=700&q=80"
                alt="Healthcare professional in a private practice"
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy/30 via-transparent to-transparent" />
            </div>

            {/* Floating trust card */}
            <motion.div
              initial={{ opacity: 0, x: 16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="absolute -bottom-4 -left-7 bg-white rounded-xl px-4 py-3.5 shadow-lg shadow-navy/8 border border-border/50"
            >
              <p className="text-[10px] font-semibold text-teal uppercase tracking-wider mb-0.5">Coverage</p>
              <p className="text-xs font-medium text-navy">88 professions · 12 UK regions</p>
              <p className="text-[10px] text-brand-slate mt-0.5">Candidates always free</p>
            </motion.div>

            <div className="absolute -top-3 -right-3 w-16 h-16 bg-mint/30 rounded-full blur-xl" />
          </motion.div>

        </div>
      </div>
    </section>
  )
}
