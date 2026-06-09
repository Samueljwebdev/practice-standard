"use client"

import { useState } from "react"

const INPUT = "w-full rounded-xl border-2 border-border bg-white px-3 py-2 text-sm text-navy focus:border-teal outline-none"
const JOB_TYPES = ["permanent", "part_time", "locum", "contract"]

export function PostJobForm({ practices }: { practices: { id: string; name: string }[] }) {
  const [form, setForm] = useState<Record<string, string>>({ job_type: "permanent" })
  const [state, setState] = useState<"idle" | "loading" | "done" | "error">("idle")
  const [msg, setMsg] = useState("")
  const set = (k: string, v: string) => setForm(f => ({ ...f, [k]: v }))

  async function submit(e: React.FormEvent) {
    e.preventDefault()
    setState("loading"); setMsg("")
    try {
      const res = await fetch("/api/admin/jobs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      })
      const j = await res.json().catch(() => ({}))
      if (res.ok) {
        setState("done")
        setMsg(j.slug ? `Live → /jobs/${j.slug}` : "Posted.")
        setForm({ job_type: "permanent" })
      } else {
        setState("error"); setMsg(j.error ?? "Failed to post")
      }
    } catch { setState("error"); setMsg("Failed to post") }
  }

  return (
    <form onSubmit={submit} className="rounded-xl border-2 border-border bg-white p-5 grid grid-cols-2 gap-3">
      <select required value={form.practice_id ?? ""} onChange={e => set("practice_id", e.target.value)} className={`${INPUT} col-span-2`}>
        <option value="">Post on behalf of… (select a business)</option>
        <option value="house">🏠 House — The Practice Standard (no business)</option>
        {practices.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
      </select>
      {form.practice_id === "house" && (
        <input className={`${INPUT} col-span-2`} placeholder="Org name to display (default: The Practice Standard)" value={form.org_name ?? ""} onChange={e => set("org_name", e.target.value)} />
      )}
      <input required className={`${INPUT} col-span-2`} placeholder="Job title" value={form.title ?? ""} onChange={e => set("title", e.target.value)} />
      <input required className={INPUT} placeholder="Profession (e.g. Optometrist)" value={form.profession ?? ""} onChange={e => set("profession", e.target.value)} />
      <select className={INPUT} value={form.job_type} onChange={e => set("job_type", e.target.value)}>
        {JOB_TYPES.map(t => <option key={t} value={t}>{t.replace("_", " ")}</option>)}
      </select>
      <input required className={INPUT} placeholder="Region (e.g. South West)" value={form.region ?? ""} onChange={e => set("region", e.target.value)} />
      <input className={INPUT} placeholder="City (optional)" value={form.city ?? ""} onChange={e => set("city", e.target.value)} />
      <input className={INPUT} type="number" placeholder="Salary min (£)" value={form.salary_min ?? ""} onChange={e => set("salary_min", e.target.value)} />
      <input className={INPUT} type="number" placeholder="Salary max (£)" value={form.salary_max ?? ""} onChange={e => set("salary_max", e.target.value)} />
      <textarea required className={`${INPUT} col-span-2`} rows={4} placeholder="Description" value={form.description ?? ""} onChange={e => set("description", e.target.value)} />
      <textarea className={`${INPUT} col-span-2`} rows={2} placeholder="Requirements (optional)" value={form.requirements ?? ""} onChange={e => set("requirements", e.target.value)} />
      <button disabled={state === "loading"} className="col-span-2 rounded-full bg-teal text-off-white px-6 py-2.5 text-sm font-semibold hover:bg-teal/90 disabled:opacity-60">
        {state === "loading" ? "Posting…" : "Post job (goes live)"}
      </button>
      {msg && <p className={`col-span-2 text-xs text-center ${state === "error" ? "text-red-600" : "text-teal"}`}>{msg}</p>}
    </form>
  )
}
