"use client"

import { useState } from "react"

const FIELDS: { name: string; label: string; type?: string; required?: boolean; full?: boolean }[] = [
  { name: "practiceName", label: "Practice name", required: true },
  { name: "yourName", label: "Your name", required: true },
  { name: "email", label: "Email", type: "email", required: true },
  { name: "phone", label: "Phone (optional)" },
  { name: "roleTitle", label: "Role you're hiring for", required: true, full: true },
  { name: "salary", label: "Salary / range" },
  { name: "hours", label: "Hours (e.g. full-time, 3 days)" },
  { name: "location", label: "Location" },
]
const DISCIPLINES = ["Optometry", "Physiotherapy", "Veterinary", "Private medical", "Aesthetics", "Dental", "Other"]

export default function SetupPage() {
  const [form, setForm] = useState<Record<string, string>>({ discipline: "Optometry" })
  const [state, setState] = useState<"idle" | "loading" | "done" | "error">("idle")
  const set = (k: string, v: string) => setForm(f => ({ ...f, [k]: v }))

  async function submit(e: React.FormEvent) {
    e.preventDefault()
    setState("loading")
    try {
      const res = await fetch("/api/setup", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) })
      setState(res.ok ? "done" : "error")
    } catch { setState("error") }
  }

  if (state === "done") return (
    <div className="min-h-screen flex items-center justify-center bg-off-white px-4">
      <div className="max-w-md text-center">
        <div className="text-4xl mb-4">✓</div>
        <h1 className="text-2xl font-black text-navy mb-2">Got it — your role is on the way.</h1>
        <p className="text-brand-slate text-sm mb-6">We&rsquo;ll have your listing live shortly. Lock in your founder rate so you can manage applications and post unlimited roles.</p>
        <a href="/founding" className="inline-flex items-center gap-2 rounded-full bg-teal text-off-white px-6 py-3 text-sm font-semibold hover:bg-teal/90">Claim your founding spot →</a>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-off-white px-4 py-16">
      <div className="max-w-xl mx-auto">
        <p className="text-xs font-semibold text-teal uppercase tracking-[0.18em] mb-2">Set up your role</p>
        <h1 className="text-2xl font-black text-navy mb-2">Tell us the role — we&rsquo;ll get it live.</h1>
        <p className="text-brand-slate text-sm mb-8">Two minutes. We&rsquo;ll put your vacancy in front of register-verified, private-practice professionals only.</p>
        <form onSubmit={submit} className="grid grid-cols-2 gap-4">
          {FIELDS.map(f => (
            <div key={f.name} className={f.full ? "col-span-2" : "col-span-2 sm:col-span-1"}>
              <label className="block text-xs font-semibold text-navy mb-1">{f.label}</label>
              <input type={f.type ?? "text"} required={f.required} value={form[f.name] ?? ""} onChange={e => set(f.name, e.target.value)}
                className="w-full rounded-xl border-2 border-border bg-white px-4 py-2.5 text-sm text-navy focus:border-teal outline-none" />
            </div>
          ))}
          <div className="col-span-2 sm:col-span-1">
            <label className="block text-xs font-semibold text-navy mb-1">Discipline</label>
            <select value={form.discipline} onChange={e => set("discipline", e.target.value)} className="w-full rounded-xl border-2 border-border bg-white px-4 py-2.5 text-sm text-navy focus:border-teal outline-none">
              {DISCIPLINES.map(d => <option key={d}>{d}</option>)}
            </select>
          </div>
          <div className="col-span-2">
            <label className="block text-xs font-semibold text-navy mb-1">Anything else? (optional)</label>
            <textarea value={form.notes ?? ""} onChange={e => set("notes", e.target.value)} rows={3} className="w-full rounded-xl border-2 border-border bg-white px-4 py-2.5 text-sm text-navy focus:border-teal outline-none" />
          </div>
          <div className="col-span-2">
            <button disabled={state === "loading"} className="w-full rounded-full bg-teal text-off-white px-6 py-3 text-sm font-semibold hover:bg-teal/90 disabled:opacity-60">
              {state === "loading" ? "Sending…" : "Send my role →"}
            </button>
            {state === "error" && <p className="text-xs text-red-600 text-center mt-2">Something went wrong — email hello@thepracticestandard.co.uk and we&rsquo;ll sort it.</p>}
          </div>
        </form>
      </div>
    </div>
  )
}
