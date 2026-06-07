"use client"

import { useState } from "react"

export default function NewsletterPage() {
  const [form, setForm] = useState<Record<string, string>>({})
  const [state, setState] = useState<"idle" | "loading" | "done" | "error">("idle")
  const set = (k: string, v: string) => setForm(f => ({ ...f, [k]: v }))

  async function submit(e: React.FormEvent) {
    e.preventDefault()
    setState("loading")
    try {
      const res = await fetch("/api/newsletter/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, source: "newsletter_page" }),
      })
      setState(res.ok ? "done" : "error")
    } catch { setState("error") }
  }

  if (state === "done") return (
    <div className="min-h-screen flex items-center justify-center bg-off-white px-4">
      <div className="max-w-md text-center">
        <div className="text-4xl mb-4">📬</div>
        <h1 className="text-2xl font-black text-navy mb-2">You&rsquo;re in.</h1>
        <p className="text-brand-slate text-sm">Check your inbox for a quick confirmation. The first issue of The Standard lands Tuesday.</p>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-off-white px-4 py-16">
      <div className="max-w-md mx-auto">
        <p className="text-xs font-semibold text-teal uppercase tracking-[0.18em] mb-2">The Standard</p>
        <h1 className="text-2xl font-black text-navy mb-2">The weekly brief for private-practice hiring.</h1>
        <p className="text-brand-slate text-sm mb-8">Five minutes, every Tuesday: the regulation, workforce data and numbers shaping who you can hire — across vet, optometry, physio, aesthetics and private medical. Free, no fluff.</p>
        <form onSubmit={submit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-navy mb-1">First name (optional)</label>
            <input value={form.firstName ?? ""} onChange={e => set("firstName", e.target.value)}
              className="w-full rounded-xl border-2 border-border bg-white px-4 py-2.5 text-sm text-navy focus:border-teal outline-none" />
          </div>
          <div>
            <label className="block text-xs font-semibold text-navy mb-1">Email</label>
            <input type="email" required value={form.email ?? ""} onChange={e => set("email", e.target.value)}
              className="w-full rounded-xl border-2 border-border bg-white px-4 py-2.5 text-sm text-navy focus:border-teal outline-none" />
          </div>
          <button disabled={state === "loading"} className="w-full rounded-full bg-teal text-off-white px-6 py-3 text-sm font-semibold hover:bg-teal/90 disabled:opacity-60">
            {state === "loading" ? "Subscribing…" : "Subscribe →"}
          </button>
          {state === "error" && <p className="text-xs text-red-600 text-center">Something went wrong — try again.</p>}
        </form>
        <p className="text-xs text-brand-slate mt-6">Want to reach this audience? <a href="/sponsor" className="text-teal underline">Sponsor The Standard →</a></p>
      </div>
    </div>
  )
}
