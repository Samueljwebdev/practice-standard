"use client"
import { useState } from "react"
import { useRouter } from "next/navigation"

interface Props {
  clinicId: string
  slug: string
  clinicName: string
  userRole: "practice" | "candidate" | null
}

export function ClaimButton({ clinicId, slug, clinicName, userRole }: Props) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  async function claim() {
    setLoading(true)
    setError("")
    try {
      const res = await fetch("/api/clinics/claim", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ clinicId }),
      })
      const j = await res.json().catch(() => ({}))
      if (!res.ok) {
        setError(j.error === "already_claimed" ? "This profile has already been claimed." : "Couldn’t claim — please try again.")
        setLoading(false)
        return
      }
      router.push(`/practice/dashboard?claimed=${encodeURIComponent(clinicName)}`)
      router.refresh()
    } catch {
      setError("Couldn’t claim — please try again.")
      setLoading(false)
    }
  }

  if (userRole === "practice") {
    return (
      <>
        <button onClick={claim} disabled={loading}
          className="rounded-full bg-mint text-navy px-6 py-3 text-sm font-semibold hover:bg-mint/85 transition-colors disabled:opacity-60">
          {loading ? "Claiming…" : "Claim this profile"}
        </button>
        {error && <p className="text-red-300 text-xs mt-2">{error}</p>}
      </>
    )
  }
  if (userRole === "candidate") {
    return <p className="text-white/50 text-xs">You’re signed in as a professional — claiming is for practice accounts.</p>
  }
  return (
    <a href={`/auth/register?next=/clinics/${slug}`}
      className="inline-block rounded-full bg-mint text-navy px-6 py-3 text-sm font-semibold hover:bg-mint/85 transition-colors">
      Claim this profile — free →
    </a>
  )
}
