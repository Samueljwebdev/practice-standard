"use client"
import { useState } from "react"
import { createClient } from "@/lib/supabase/client"

const STATUSES: [string, string][] = [
  ["viewed", "Viewed"],
  ["shortlisted", "Shortlist"],
  ["rejected", "Reject"],
]

export function ApplicantActions({ appId, initial }: { appId: string; initial: string }) {
  const supabase = createClient()
  const [status, setStatus] = useState(initial)
  const [saving, setSaving] = useState(false)

  async function set(s: string) {
    const next = status === s ? "pending" : s
    setSaving(true)
    const { error } = await supabase.from("applications").update({ status: next }).eq("id", appId)
    if (!error) setStatus(next)
    setSaving(false)
  }

  return (
    <div className="flex gap-1.5">
      {STATUSES.map(([val, label]) => {
        const active = status === val
        const reject = val === "rejected"
        return (
          <button
            key={val}
            onClick={() => set(val)}
            disabled={saving}
            className={`text-[11px] px-2.5 py-1 rounded-full border font-medium transition-colors disabled:opacity-50 ${
              active
                ? reject
                  ? "bg-red-50 border-red-300 text-red-600"
                  : "bg-teal/10 border-teal/30 text-teal"
                : "border-navy/15 text-navy/60 hover:border-teal hover:text-teal"
            }`}
          >
            {active && !reject ? "✓ " : ""}{label}
          </button>
        )
      })}
    </div>
  )
}
