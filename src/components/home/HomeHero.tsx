"use client"
import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"

const ease = [0.32, 0.72, 0, 1] as const

const HEADLINE = [
  { text: "The hiring", accent: false },
  { text: "standard", accent: false },
  { text: "for modern", accent: true },
  { text: "healthcare.", accent: false },
]

export function HomeHero({ count }: { count: number }) {
  return (
    <section className="relative bg-white">
      {/* Ambient background orbs — GPU layer, no reflow */}
      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute right-0 top-0 h-[700px] w-[700px] -translate-y-1/3 translate-x-1/3 rounded-full bg-mint/20 blur-[140px]" />
        <div className="absolute bottom-0 left-0 h-[450px] w-[500px] translate-y-1/4 -translate-x-1/4 rounded-full bg-teal/7 blur-[110px]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6 py-24 md:py-32 lg:py-40">
        <div className="grid items-center gap-12 lg:gap-16 md:grid-cols-[1fr_400px] lg:grid-cols-[1fr_440px]">

          {/* ── Left: editorial typography ── */}
          <div>
            {/* Eyebrow pill */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, ease }}
            >
              <span className="inline-flex items-center gap-2.5 rounded-full border border-teal/20 bg-teal/5 px-4 py-1.5">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-teal" />
                <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-teal">
                  Where better practices hire
                </span>
              </span>
            </motion.div>

            {/* Staggered headline */}
            <h1 className="mt-8 leading-[0.92] tracking-[-0.03em]">
              {HEADLINE.map((line, i) => (
                <span key={i} className="block overflow-hidden py-[0.06em]">
                  <motion.span
                    className={`block text-[clamp(3rem,7vw,5.5rem)] font-black ${line.accent ? "text-teal" : "text-navy"}`}
                    initial={{ y: "115%", opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.85, delay: 0.1 + i * 0.08, ease }}
                  >
                    {line.text}
                  </motion.span>
                </span>
              ))}
              {/* Mint rule */}
              <motion.span
                className="mt-5 block h-[3px] w-14 rounded-full bg-mint"
                initial={{ scaleX: 0, opacity: 0 }}
                animate={{ scaleX: 1, opacity: 1 }}
                transition={{ duration: 0.7, delay: 0.5, ease }}
                style={{ transformOrigin: "left" }}
              />
            </h1>

            {/* Description */}
            <motion.p
              className="mt-8 max-w-[420px] text-[16px] leading-[1.8] text-brand-slate"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.58, ease }}
            >
              The UK&apos;s specialist job board for regulated private healthcare practices. Post a role and reach registered professionals — without agency fees.
            </motion.p>

            {/* Button-in-button CTAs */}
            <motion.div
              className="mt-9 flex flex-wrap items-center gap-3"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.66, ease }}
            >
              <Link
                href="/auth/register"
                className="group inline-flex items-center gap-3 rounded-full bg-teal px-6 py-3.5 text-sm font-semibold text-off-white shadow-[0_4px_28px_rgba(15,61,62,0.22)] transition-[box-shadow,transform] duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] hover:shadow-[0_6px_36px_rgba(15,61,62,0.32)] active:scale-[0.98]"
              >
                Post a role — from £149
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-white/20 text-xs leading-none transition-transform duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:translate-x-0.5 group-hover:-translate-y-px">
                  →
                </span>
              </Link>
              <Link
                href="/jobs"
                className="group inline-flex items-center rounded-full border-2 border-navy/15 px-6 py-3.5 text-sm font-semibold text-navy transition-[border-color,background-color,transform] duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:border-navy/30 hover:bg-navy/4 active:scale-[0.98]"
              >
                Browse{count > 10 ? ` ${count}` : ""} open roles
              </Link>
            </motion.div>

            {/* Stats strip */}
            <motion.div
              className="mt-11 flex items-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.82 }}
            >
              {[
                { value: "88", label: "professions", accent: false },
                { value: "12", label: "UK regions", accent: false },
                { value: "Free", label: "for candidates", accent: true },
              ].map((s, i) => (
                <div key={s.label} className="flex items-center">
                  <div className={i > 0 ? "pl-6 pr-6" : "pr-6"}>
                    <p className={`text-[1.6rem] font-black leading-none tracking-tight ${s.accent ? "text-teal" : "text-navy"}`}>
                      {s.value}
                    </p>
                    <p className="mt-0.5 text-[11px] text-brand-slate/60">{s.label}</p>
                  </div>
                  {i < 2 && <div className="h-8 w-px bg-navy/10" />}
                </div>
              ))}
            </motion.div>
          </div>

          {/* ── Right: double-bezel image card ── */}
          <motion.div
            className="relative hidden md:block"
            initial={{ opacity: 0, scale: 0.97, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 1.05, delay: 0.2, ease }}
          >
            {/* Outer shell — machined frame */}
            <div className="relative rounded-[2.5rem] bg-gradient-to-b from-navy/6 to-navy/2 p-2 ring-1 ring-navy/8 shadow-[0_2px_48px_rgba(13,27,42,0.06)]">
              {/* Inner core */}
              <div className="relative aspect-[3/4] overflow-hidden rounded-[calc(2.5rem-0.5rem)] shadow-[inset_0_1px_1px_rgba(255,255,255,0.55)]">
                <Image
                  src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=700&q=80"
                  alt="Healthcare professional in a private practice"
                  fill
                  className="object-cover"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy/70 via-navy/10 to-transparent" />

                {/* Glass role card — bottom of image */}
                <div className="absolute bottom-5 left-5 right-5 rounded-2xl border border-white/15 bg-white/12 p-4 backdrop-blur-2xl">
                  <p className="mb-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-white/55">
                    Role posted
                  </p>
                  <p className="text-sm font-bold text-white">Senior Aesthetic Nurse — Manchester</p>
                  <div className="mt-2.5 flex items-center gap-2">
                    <span className="rounded-full bg-mint/20 px-2.5 py-0.5 text-[10px] font-semibold text-mint">
                      Aesthetics
                    </span>
                    <span className="text-[10px] text-white/45">Permanent · £52k</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating coverage card */}
            <motion.div
              className="absolute -left-6 top-[36%] rounded-2xl border border-navy/8 bg-white/95 px-5 py-4 shadow-[0_8px_40px_rgba(13,27,42,0.08)] backdrop-blur-xl"
              initial={{ opacity: 0, x: 16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.65, delay: 0.88, ease }}
            >
              <p className="mb-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-teal">Coverage</p>
              <p className="text-sm font-bold text-navy">88 professions</p>
              <p className="text-[11px] text-brand-slate/60">12 UK regions</p>
            </motion.div>

            {/* Free badge */}
            <motion.div
              className="absolute -right-4 top-10 rounded-full border border-mint/20 bg-mint px-5 py-2.5 shadow-[0_4px_24px_rgba(168,213,204,0.45)]"
              initial={{ opacity: 0, scale: 0.82 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 1.0, ease }}
            >
              <p className="text-[11px] font-bold text-teal">Candidates always free</p>
            </motion.div>

            {/* Ambient glow */}
            <div aria-hidden className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-mint/35 blur-3xl" />
          </motion.div>

        </div>
      </div>
    </section>
  )
}
