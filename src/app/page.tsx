import Link from "next/link"
import Image from "next/image"
import { createClient } from "@/lib/supabase/server"
import { PROFESSIONS } from "@/lib/constants"
import { HomeHero } from "@/components/home/HomeHero"
import { AnimateIn } from "@/components/ui/AnimateIn"

export default async function HomePage() {
  const supabase = await createClient()
  const { count } = await supabase
    .from("jobs")
    .select("*", { count: "exact", head: true })
    .eq("status", "active")
    .eq("payment_status", "paid")

  return (
    <>
      <HomeHero count={count ?? 0} />

      {/* Professions */}
      <section className="py-16 bg-white border-b border-border/40">
        <div className="max-w-5xl mx-auto px-4">
          <AnimateIn>
            <p className="text-xs font-semibold text-brand-slate uppercase tracking-[0.18em] text-center mb-8">
              Roles we cover
            </p>
            <div className="flex flex-wrap gap-2 justify-center">
              {PROFESSIONS.map(p => (
                <Link
                  key={p.value}
                  href={`/jobs?profession=${p.value}`}
                  className="px-4 py-2 text-sm bg-off-white border border-border rounded-full text-navy hover:bg-teal hover:text-off-white hover:border-teal transition-all duration-200"
                >
                  {p.label}
                </Link>
              ))}
            </div>
          </AnimateIn>
        </div>
      </section>

      {/* For practices — dark */}
      <section className="py-24 bg-navy">
        <div className="max-w-6xl mx-auto px-4">
          <AnimateIn>
            <div className="grid md:grid-cols-2 gap-14 lg:gap-20 items-center">
              <div>
                <p className="text-xs font-semibold text-mint uppercase tracking-[0.18em] mb-5">For practices</p>
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-5 leading-tight">
                  High standards attract great people.
                </h2>
                <p className="text-white/55 text-sm leading-relaxed mb-7">
                  Reach verified, registered professionals across every discipline. Post a role in minutes and start receiving applications the same day.
                </p>
                <div className="space-y-3 mb-8">
                  {[
                    "Dental, vet, optician, aesthetics, physio and GP roles",
                    "Applications managed in your dashboard",
                    "Unlimited listings with Practice Pro",
                  ].map((item) => (
                    <div key={item} className="flex items-start gap-3">
                      <div className="mt-1 w-3.5 h-3.5 rounded-full bg-mint/20 flex items-center justify-center shrink-0">
                        <div className="w-1.5 h-1.5 rounded-full bg-mint" />
                      </div>
                      <span className="text-white/60 text-sm">{item}</span>
                    </div>
                  ))}
                </div>
                <Link
                  href="/pricing"
                  className="inline-flex bg-mint text-navy px-6 py-3 rounded-full font-semibold text-sm hover:bg-mint/85 transition-colors"
                >
                  See pricing
                </Link>
              </div>

              {/* Image */}
              <AnimateIn direction="left" delay={0.15}>
                <div className="relative aspect-[3/4] rounded-2xl overflow-hidden shadow-2xl shadow-black/30">
                  <Image
                    src="https://images.unsplash.com/photo-1629909615184-74f495363b67?auto=format&fit=crop&w=600&q=80"
                    alt="Dental practice professional"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy/50 via-transparent to-transparent" />
                  <div className="absolute bottom-5 left-5 right-5">
                    <p className="text-white/50 text-[10px] uppercase tracking-wider mb-1">Listing reached</p>
                    <p className="text-white font-semibold text-sm">Senior Dental Hygienist — London</p>
                  </div>
                </div>
              </AnimateIn>
            </div>
          </AnimateIn>
        </div>
      </section>

      {/* For professionals — light */}
      <section className="py-24 bg-off-white">
        <div className="max-w-6xl mx-auto px-4">
          <AnimateIn>
            <div className="grid md:grid-cols-2 gap-14 lg:gap-20 items-center">

              {/* Image */}
              <AnimateIn direction="right" delay={0.1}>
                <div className="relative aspect-[3/4] rounded-2xl overflow-hidden shadow-xl shadow-teal/8 order-2 md:order-1">
                  <Image
                    src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=600&q=80"
                    alt="Healthcare professional"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy/20 via-transparent to-transparent" />
                </div>
              </AnimateIn>

              <div className="order-1 md:order-2">
                <p className="text-xs font-semibold text-teal uppercase tracking-[0.18em] mb-5">For professionals</p>
                <h2 className="text-3xl md:text-4xl font-bold text-navy mb-5 leading-tight">
                  Your career, at a higher standard.
                </h2>
                <p className="text-brand-slate text-sm leading-relaxed mb-7">
                  Finding your next role should be straightforward. Browse positions, apply in seconds, and track your applications — always free.
                </p>
                <div className="space-y-3 mb-8">
                  {[
                    "Always free to search and apply",
                    "Roles from practices that operate at a higher standard",
                    "Track every application in one dashboard",
                  ].map((item) => (
                    <div key={item} className="flex items-start gap-3">
                      <div className="mt-1 w-3.5 h-3.5 rounded-full bg-teal/10 flex items-center justify-center shrink-0">
                        <div className="w-1.5 h-1.5 rounded-full bg-teal" />
                      </div>
                      <span className="text-navy/65 text-sm">{item}</span>
                    </div>
                  ))}
                </div>
                <Link
                  href="/auth/register"
                  className="inline-flex border-2 border-teal text-teal px-6 py-3 rounded-full font-semibold text-sm hover:bg-teal hover:text-off-white transition-colors"
                >
                  Create free account
                </Link>
              </div>
            </div>
          </AnimateIn>
        </div>
      </section>

      {/* Bottom CTA strip */}
      <section className="py-14 bg-teal">
        <AnimateIn>
          <div className="max-w-2xl mx-auto px-4 text-center">
            <h2 className="text-2xl font-bold text-off-white mb-3">Ready to find your next hire?</h2>
            <p className="text-off-white/60 text-sm mb-7">Join practices across the UK using The Practice Standard.</p>
            <div className="flex flex-wrap gap-3 justify-center">
              <Link
                href="/auth/register"
                className="bg-white text-teal px-6 py-3 rounded-full font-semibold text-sm hover:bg-off-white transition-colors"
              >
                Post a job — from £149
              </Link>
              <Link
                href="/jobs"
                className="border-2 border-white/30 text-white px-6 py-3 rounded-full font-semibold text-sm hover:border-white transition-colors"
              >
                Browse open roles
              </Link>
            </div>
          </div>
        </AnimateIn>
      </section>
    </>
  )
}
