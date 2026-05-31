"use client"
import { useState } from "react"
import Link from "next/link"

const fmt = (n: number) => "£" + Math.round(n).toLocaleString("en-GB")

function Slider({ label, value, min, max, step, suffix, onChange }: {
  label: string; value: number; min: number; max: number; step: number; suffix: string; onChange: (n: number) => void
}) {
  return (
    <div>
      <div className="flex items-baseline justify-between mb-2">
        <label className="text-sm font-semibold text-navy/80">{label}</label>
        <span className="text-lg font-bold text-teal tabular-nums">{suffix === "£" ? fmt(value) : `${value}${suffix}`}</span>
      </div>
      <input
        type="range" min={min} max={max} step={step} value={value}
        onChange={e => onChange(Number(e.target.value))}
        className="w-full accent-teal cursor-pointer"
      />
    </div>
  )
}

export function HiringCostCalculator() {
  const [salary, setSalary] = useState(45000)
  const [agencyPct, setAgencyPct] = useState(20)
  const [hires, setHires] = useState(3)

  const agencyPerHire = salary * (agencyPct / 100)
  const agencyAnnual = agencyPerHire * hires
  const perListing = 149 * hires
  const proAnnual = 249 * 12
  const usePro = perListing > proAnnual
  const tpsAnnual = Math.min(perListing, proAnnual)
  const savings = Math.max(0, agencyAnnual - tpsAnnual)
  const savingsPct = agencyAnnual > 0 ? Math.round((savings / agencyAnnual) * 100) : 0

  return (
    <div className="grid lg:grid-cols-2 gap-8 items-start">
      {/* Inputs */}
      <div className="bg-white rounded-2xl ring-1 ring-navy/8 p-7 space-y-7">
        <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-teal">Your hiring</p>
        <Slider label="Average salary of the role" value={salary} min={20000} max={150000} step={1000} suffix="£" onChange={setSalary} />
        <Slider label="Typical agency fee" value={agencyPct} min={10} max={30} step={1} suffix="%" onChange={setAgencyPct} />
        <Slider label="Roles you hire per year" value={hires} min={1} max={20} step={1} suffix="" onChange={setHires} />
        <p className="text-xs text-brand-slate/70 leading-relaxed pt-1">
          UK healthcare agency fees typically run 15–25% of first-year salary. Drag the sliders to match your practice.
        </p>
      </div>

      {/* Result */}
      <div className="space-y-4">
        <div className="rounded-2xl bg-navy p-7 text-center">
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-mint mb-2">You could save</p>
          <p className="text-[clamp(2.5rem,8vw,4rem)] font-black leading-none text-white tracking-[-0.03em]">{fmt(savings)}</p>
          <p className="text-white/60 text-sm mt-2">per year vs recruitment agencies — that&rsquo;s <span className="text-mint font-semibold">{savingsPct}% less</span></p>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="rounded-2xl bg-white ring-1 ring-navy/8 p-5">
            <p className="text-xs font-semibold text-brand-slate/70 mb-1">Recruitment agency</p>
            <p className="text-2xl font-black text-navy">{fmt(agencyAnnual)}<span className="text-sm font-semibold text-brand-slate">/yr</span></p>
            <p className="text-[11px] text-brand-slate/60 mt-1">{fmt(agencyPerHire)} per hire × {hires}</p>
          </div>
          <div className="rounded-2xl bg-teal/8 ring-1 ring-teal/25 p-5">
            <p className="text-xs font-semibold text-teal mb-1">The Practice Standard</p>
            <p className="text-2xl font-black text-navy">{fmt(tpsAnnual)}<span className="text-sm font-semibold text-brand-slate">/yr</span></p>
            <p className="text-[11px] text-brand-slate/60 mt-1">{usePro ? "Practice Pro — unlimited listings" : `£149 × ${hires} listings`}</p>
          </div>
        </div>

        <div className="rounded-2xl bg-white ring-1 ring-navy/8 p-5">
          <p className="text-sm text-navy/80 leading-relaxed">
            {usePro
              ? <>At {hires} hires a year, <strong className="text-navy">Practice Pro (£249/mo)</strong> is your best value — unlimited listings across every discipline.</>
              : <>At {hires} hires a year, <strong className="text-navy">pay-per-listing (£149)</strong> keeps it simple — post only when you need to.</>}
            {savings > 0 && <> One avoided agency placement covers it many times over.</>}
          </p>
          <div className="flex flex-wrap gap-2 mt-4">
            <Link href="/pricing" className="rounded-full bg-teal text-off-white text-sm px-5 py-2.5 font-semibold hover:bg-teal/90 transition-colors">See pricing</Link>
            <Link href="/auth/register" className="rounded-full border-2 border-teal/30 text-teal text-sm px-5 py-2.5 font-semibold hover:border-teal transition-colors">Post a role →</Link>
          </div>
        </div>
        <p className="text-[11px] text-brand-slate/55 text-center px-4 leading-relaxed">
          Estimate only. Agency cost = salary × fee % × hires. Practice Standard = the cheaper of pay-per-listing (£149) or Practice Pro (£249/mo). Prices exclude VAT.
        </p>
      </div>
    </div>
  )
}
