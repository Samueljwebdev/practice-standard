"use client"

import { useState } from "react"

export default function ReferPage() {
  const [form, setForm] = useState<Record<string, string>>({})
  const [state, setState] = useState<"idle" | "loading" | "done" | "error">("idle")
  const set = (k: string, v: string) => setForm(f => ({ ...f, [k]: v }))

  async function submit(e: React.FormEvent) {
    e.preventDefault()
    setState("loading")
    try {
      const res = await fetch("/api/refer", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) })
      setState(res.ok ? "done" : "error")
    } catch { setState("error") }
  }

  if (state === "done") return (
    <div className="min-h-screen flex items-center justify-center bg-off-white px-4">
      <div className="max-w-md text-center">
        <div className="text-4xl mb-4">🎉</div>
        <h1 className="text-2xl font-black text-navy mb-2">Invite sent — thank you.</h1>
        <p className="text-brand-slate text-sm">We&rsquo;ve emailed them an introduction. If they join, we&rsquo;ll add an extra free month (or a featured listing) to your account.</p>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-off-white px-4 py-16">
      <div className="max-w-md mx-auto">
        <p className="text-xs font-semibold text-teal uppercase tracking-[0.18em] mb-2">Refer a practice</p>
        <h1 className="text-2xl font-black text-navy mb-2">Know a practice that hires?</h1>
        <p className="text-brand-slate text-sm mb-8">Refer them and if they join, you both win — an extra free month or a featured listing on your account.</p>
        <form onSubmit={submit} className="space-y-4">
          {[
            { name: "referrerPractice", label: "Your practice name", required: true },
            { name: "friendEmail", label: "Their email", type: "email", required: true },
            { name: "friendPractice", label: "Their practice (optional)" },
          ].map(f => (
            <div key={f.name}>
              <label className="block text-xs font-semibold text-navy mb-1">{f.label}</label>
              <input type={f.type ?? "text"} required={f.required} value={form[f.name] ?? ""} onChange={e => set(f.name, e.target.value)}
                className="w-full rounded-xl border-2 border-border bg-white px-4 py-2.5 text-sm text-navy focus:border-teal outline-none" />
            </div>
          ))}
          <div>
            <label className="block text-xs font-semibold text-navy mb-1">A note to them (optional)</label>
            <textarea value={form.note ?? ""} onChange={e => set("note", e.target.value)} rows={3} className="w-full rounded-xl border-2 border-border bg-white px-4 py-2.5 text-sm text-navy focus:border-teal outline-none" />
          </div>
          <button disabled={state === "loading"} className="w-full rounded-full bg-teal text-off-white px-6 py-3 text-sm font-semibold hover:bg-teal/90 disabled:opacity-60">
            {state === "loading" ? "Sending…" : "Send the invite →"}
          </button>
          {state === "error" && <p className="text-xs text-red-600 text-center">Something went wrong — try again or email hello@thepracticestandard.co.uk.</p>}
        </form>
      </div>
    </div>
  )
}
