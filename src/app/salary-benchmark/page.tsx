"use client"
import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { AnimateIn } from "@/components/ui/AnimateIn"
import Link from "next/link"

const DISCIPLINES = [
  { value: "aesthetic", label: "Aesthetic clinic" },
  { value: "veterinary", label: "Veterinary practice" },
  { value: "optometry", label: "Optometry" },
  { value: "physiotherapy", label: "Physiotherapy" },
  { value: "private_medical", label: "Private medical / GP" },
  { value: "other", label: "Other" },
]

const PREVIEW_ROWS = [
  { discipline: "Aesthetics", role: "Aesthetic Nurse Prescriber", range: "£38,000–£58,000" },
  { discipline: "Veterinary", role: "Experienced Vet (3+ yrs)", range: "£42,000–£65,000" },
  { discipline: "Optometry", role: "IP Optometrist", range: "£52,000–£68,000" },
  { discipline: "Physiotherapy", role: "MSK Physiotherapist", range: "£35,000–£50,000" },
  { discipline: "Private Medical", role: "Salaried Private GP", range: "£85,000–£140,000" },
]

export default function SalaryBenchmarkPage() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [practiceType, setPracticeType] = useState("")
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState("")

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError("")

    const res = await fetch("/api/leads/salary-benchmark", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, practice_type: practiceType }),
    })
    const data = await res.json()

    if (!data.ok) {
      setError(data.error ?? "Something went wrong. Please try again.")
      setLoading(false)
      return
    }

    setSuccess(true)
    setLoading(false)
  }

  if (success) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center px-4">
        <div className="max-w-md w-full text-center">
          <div className="w-12 h-12 rounded-full bg-teal/10 flex items-center justify-center mx-auto mb-5">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} className="text-teal">
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-navy mb-3">On its way</h1>
          <p className="text-brand-slate text-sm leading-relaxed mb-6">
            The UK Private Practice Salary Benchmark 2026 is in your inbox. Check your spam folder if it doesn't arrive within a couple of minutes.
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Link
              href="/practice/post"
              className="bg-teal text-off-white px-5 py-2.5 rounded-full text-sm font-semibold hover:bg-teal/90 transition-colors"
            >
              Post a role — from £149
            </Link>
            <Link
              href="/jobs"
              className="border border-border text-navy px-5 py-2.5 rounded-full text-sm font-semibold hover:border-teal hover:text-teal transition-colors"
            >
              Browse open roles
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <>
      {/* Hero */}
      <section className="bg-navy py-20 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <AnimateIn>
            <p className="text-xs font-semibold text-mint uppercase tracking-[0.18em] mb-4">Free resource</p>
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-5 leading-tight">
              UK Private Practice<br className="hidden md:block" /> Salary Benchmark 2026
            </h1>
            <p className="text-white/55 text-base leading-relaxed max-w-xl mx-auto">
              Salary ranges for 25+ clinical and management roles across aesthetics, veterinary, optometry, physiotherapy, and private medical — with regional adjustment notes.
            </p>
          </AnimateIn>
        </div>
      </section>

      {/* Main content + form */}
      <section className="py-16 bg-off-white px-4">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-start">

            {/* Left: what's inside */}
            <AnimateIn>
              <p className="text-xs font-semibold text-brand-slate uppercase tracking-[0.18em] mb-6">What's inside</p>
              <div className="space-y-4 mb-8">
                {[
                  { icon: "💷", text: "Salary ranges for 25+ roles across 5 disciplines" },
                  { icon: "📍", text: "Regional adjustment guide — London, South East, North, Scotland" },
                  { icon: "📋", text: "The non-salary benefits candidates ask about most" },
                  { icon: "📉", text: "Workforce shortage context by discipline (why candidates have leverage)" },
                ].map(item => (
                  <div key={item.text} className="flex items-start gap-3">
                    <span className="text-lg shrink-0">{item.icon}</span>
                    <p className="text-sm text-navy/75 leading-relaxed">{item.text}</p>
                  </div>
                ))}
              </div>

              {/* Salary preview table */}
              <p className="text-xs font-semibold text-brand-slate uppercase tracking-[0.18em] mb-3">Sample data</p>
              <div className="bg-white border border-border rounded-xl overflow-hidden">
                <table className="w-full text-xs">
                  <thead>
                    <tr className="bg-off-white border-b border-border">
                      <th className="text-left px-4 py-2.5 text-navy/60 font-semibold">Role</th>
                      <th className="text-right px-4 py-2.5 text-navy/60 font-semibold">Range</th>
                    </tr>
                  </thead>
                  <tbody>
                    {PREVIEW_ROWS.map((row, i) => (
                      <tr key={row.role} className={i % 2 === 1 ? "bg-off-white/50" : ""}>
                        <td className="px-4 py-2.5 border-b border-border/50">
                          <span className="text-navy/50 block text-[10px] uppercase tracking-wide">{row.discipline}</span>
                          <span className="text-navy font-medium">{row.role}</span>
                        </td>
                        <td className="px-4 py-2.5 border-b border-border/50 text-right font-semibold text-teal whitespace-nowrap">{row.range}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <div className="px-4 py-3 bg-off-white/50 text-[11px] text-brand-slate text-center">
                  + 20 more roles · Regional adjustments · Benefits benchmarks
                </div>
              </div>
            </AnimateIn>

            {/* Right: form */}
            <AnimateIn direction="left" delay={0.1}>
              <div className="bg-white border border-border rounded-2xl p-8 shadow-sm sticky top-8">
                <p className="text-xs font-semibold text-teal uppercase tracking-[0.18em] mb-2">Free download</p>
                <h2 className="text-xl font-bold text-navy mb-1">Get the benchmark</h2>
                <p className="text-brand-slate text-sm mb-6">Delivered to your inbox instantly. No spam.</p>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <Label className="text-navy/80 text-sm font-medium">Your name</Label>
                    <Input
                      value={name}
                      onChange={e => setName(e.target.value)}
                      placeholder="e.g. Sarah Johnson"
                      required
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label className="text-navy/80 text-sm font-medium">Work email</Label>
                    <Input
                      type="email"
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      placeholder="you@yourclinic.co.uk"
                      required
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label className="text-navy/80 text-sm font-medium">
                      Practice type <span className="text-brand-slate font-normal">(optional)</span>
                    </Label>
                    <div className="mt-2 grid grid-cols-2 gap-1.5">
                      {DISCIPLINES.map(d => (
                        <button
                          key={d.value}
                          type="button"
                          onClick={() => setPracticeType(p => p === d.value ? "" : d.value)}
                          className={`text-left px-3 py-2 rounded-lg border text-xs font-medium transition-all ${
                            practiceType === d.value
                              ? "border-teal bg-teal/5 text-teal"
                              : "border-border text-navy/60 hover:border-teal/40"
                          }`}
                        >
                          {d.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {error && (
                    <div className="bg-red-50 border border-red-200 rounded-lg px-4 py-3">
                      <p className="text-sm text-red-700">{error}</p>
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-teal text-off-white py-3 rounded-full text-sm font-semibold hover:bg-teal/90 transition-colors disabled:opacity-60 mt-2"
                  >
                    {loading ? "Sending…" : "Send me the benchmark →"}
                  </button>

                  <p className="text-center text-xs text-brand-slate">
                    No spam. Unsubscribe any time.
                  </p>
                </form>
              </div>
            </AnimateIn>
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-12 bg-white border-t border-border/40 px-4">
        <div className="max-w-2xl mx-auto text-center">
          <p className="text-xs font-semibold text-brand-slate uppercase tracking-[0.18em] mb-3">
            Ready to hire?
          </p>
          <p className="text-navy font-semibold mb-5">
            Post your role on The Practice Standard and reach registered professionals — without agency fees.
          </p>
          <Link
            href="/auth/register"
            className="inline-flex bg-teal text-off-white px-6 py-3 rounded-full text-sm font-semibold hover:bg-teal/90 transition-colors"
          >
            Post a role — from £149
          </Link>
        </div>
      </section>
    </>
  )
}
