"use client"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import { PROFESSIONS, PROFESSION_CATEGORIES, UK_REGIONS } from "@/lib/constants"
import { getRegulatorForProfession } from "@/lib/verification/regulators"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select"

interface Verification {
  status: "unverified" | "verified" | "pending_review" | "failed" | "not_applicable"
  regulator: string | null
  verified_name?: string | null
  reason?: string | null
}

export default function CandidateProfilePage() {
  const router = useRouter()
  const supabase = createClient()
  const [loading, setLoading] = useState(false)
  const [saved, setSaved] = useState(false)
  const [candidateId, setCandidateId] = useState<string | null>(null)
  const [isNewProfile, setIsNewProfile] = useState(false)
  const [verification, setVerification] = useState<Verification | null>(null)
  const [verifying, setVerifying] = useState(false)

  const [form, setForm] = useState({
    full_name: "",
    profession: "",
    registration_number: "",
    location: "",
    region: "",
    bio: "",
    years_experience: "",
  })

  const regulator = getRegulatorForProfession(form.profession)

  useEffect(() => {
    async function load() {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return
      const { data } = await supabase.from("candidates").select("*").eq("user_id", user.id).single()
      if (data) {
        setCandidateId(data.id)
        if (!data.profession) setIsNewProfile(true)
        setForm({
          full_name: data.full_name ?? "",
          profession: data.profession ?? "",
          registration_number: data.registration_number ?? "",
          location: data.location ?? "",
          region: data.region ?? "",
          bio: data.bio ?? "",
          years_experience: data.years_experience?.toString() ?? "",
        })
      }
      const { data: v } = await supabase.from("candidate_verifications").select("status, regulator, verified_name, reason").eq("user_id", user.id).maybeSingle()
      if (v) setVerification(v as Verification)
    }
    load()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  function setField(field: string, value: string) {
    setForm(prev => ({ ...prev, [field]: value }))
    if (field === "registration_number" || field === "profession") setVerification(null)
  }

  async function persist() {
    if (!candidateId) return
    await supabase.from("candidates").update({
      full_name: form.full_name,
      profession: form.profession,
      registration_number: form.registration_number || null,
      location: form.location || null,
      region: form.region || null,
      bio: form.bio || null,
      years_experience: form.years_experience ? parseInt(form.years_experience) : null,
    }).eq("id", candidateId)
  }

  async function handleVerify() {
    if (!form.registration_number.trim()) return
    setVerifying(true)
    await persist() // make sure name/profession/number are saved before the server reads them
    try {
      const res = await fetch("/api/candidate/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ registrationNumber: form.registration_number.trim() }),
      })
      const json = await res.json()
      setVerification({ status: json.status, regulator: json.regulator, verified_name: json.verifiedName, reason: json.reason })
    } catch {
      setVerification({ status: "pending_review", regulator: regulator?.id ?? null })
    }
    setVerifying(false)
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault()
    if (!candidateId) return
    setLoading(true)
    await persist()
    setSaved(true)
    setLoading(false)
    setTimeout(() => setSaved(false), 3000)
    // If they came here to apply for a specific job, send them back to it.
    const next = typeof window !== "undefined" ? localStorage.getItem("tps_next") : null
    if (next && next.startsWith("/")) {
      localStorage.removeItem("tps_next")
      router.push(next)
      return
    }
    router.push(isNewProfile ? "/jobs" : "/candidate/dashboard")
  }

  return (
    <div className="max-w-xl mx-auto px-4 py-10">
      <div className="mb-8">
        <p className="text-xs font-semibold text-teal uppercase tracking-[0.18em] mb-1">
          {isNewProfile ? "One last step" : "Account"}
        </p>
        <h1 className="text-2xl font-bold text-navy">
          {isNewProfile ? "Set up your profile" : "Your profile"}
        </h1>
        <p className="text-brand-slate text-sm mt-1">
          {isNewProfile
            ? "Practices see this when you apply. Takes under a minute — then browse open roles."
            : "Keep this up to date — practices see it when you apply."}
        </p>
      </div>

      {isNewProfile && (
        <div className="flex items-center gap-3 bg-teal/8 border border-teal/20 rounded-xl px-4 py-3 mb-6">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} className="text-teal shrink-0">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <p className="text-xs text-teal font-medium">
            Your account is created. Complete your profile to apply to roles — always free.
          </p>
        </div>
      )}
      <div className="bg-white border border-border rounded-2xl p-8">
        <form onSubmit={handleSave} className="space-y-5">
          <div>
            <Label className="text-navy/80 text-sm font-medium">Full name</Label>
            <Input value={form.full_name} onChange={e => setField("full_name", e.target.value)} required className="mt-1" />
          </div>
          <div>
            <Label className="text-navy/80 text-sm font-medium">Profession</Label>
            <Select value={form.profession} onValueChange={v => setField("profession", v as string)}>
              <SelectTrigger className="mt-1"><SelectValue /></SelectTrigger>
              <SelectContent>
                {PROFESSION_CATEGORIES.map(cat => (
                  <SelectGroup key={cat}>
                    <SelectLabel>{cat}</SelectLabel>
                    {PROFESSIONS.filter(p => p.category === cat).map(p => (
                      <SelectItem key={p.value} value={p.value}>{p.label}</SelectItem>
                    ))}
                  </SelectGroup>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Registration & verification */}
          <div>
            <Label className="text-navy/80 text-sm font-medium">
              {regulator ? `${regulator.name} registration number` : "Registration number"}
              {regulator && <span className="text-red-500"> *</span>}
            </Label>
            <div className="flex gap-2 mt-1">
              <Input
                placeholder={regulator ? regulator.pinHint : "If applicable"}
                value={form.registration_number}
                onChange={e => setField("registration_number", e.target.value)}
                className="flex-1"
              />
              {regulator && (
                <button
                  type="button"
                  onClick={handleVerify}
                  disabled={verifying || !form.registration_number.trim()}
                  className="shrink-0 px-4 rounded-xl border-2 border-teal/30 text-teal text-sm font-semibold hover:border-teal transition-colors disabled:opacity-50"
                >
                  {verifying ? "Checking…" : "Verify"}
                </button>
              )}
            </div>
            <VerificationBadge verification={verification} regulatorName={regulator?.name} hasRegulator={!!regulator} />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label className="text-navy/80 text-sm font-medium">Town / City</Label>
              <Input placeholder="Bristol" value={form.location} onChange={e => setField("location", e.target.value)} className="mt-1" />
            </div>
            <div>
              <Label className="text-navy/80 text-sm font-medium">Region</Label>
              <Select value={form.region} onValueChange={v => setField("region", v as string)}>
                <SelectTrigger className="mt-1"><SelectValue placeholder="Select…" /></SelectTrigger>
                <SelectContent>
                  {UK_REGIONS.map(r => <SelectItem key={r} value={r}>{r}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
          </div>
          <div>
            <Label className="text-navy/80 text-sm font-medium">Years of experience</Label>
            <Input type="number" min="0" max="50" value={form.years_experience} onChange={e => setField("years_experience", e.target.value)} className="mt-1" />
          </div>
          <div>
            <Label className="text-navy/80 text-sm font-medium">Bio <span className="text-brand-slate font-normal">(optional)</span></Label>
            <Textarea rows={4} placeholder="A brief summary of your experience and what you're looking for…" value={form.bio} onChange={e => setField("bio", e.target.value)} className="mt-1" />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-teal text-off-white py-2.5 rounded-full text-sm font-semibold hover:bg-teal/90 transition-colors disabled:opacity-60"
          >
            {saved ? "Saved!" : loading ? "Saving…" : isNewProfile ? "Save and browse roles →" : "Save profile"}
          </button>
        </form>
      </div>
    </div>
  )
}

function VerificationBadge({ verification, regulatorName, hasRegulator }: { verification: Verification | null; regulatorName?: string; hasRegulator: boolean }) {
  if (!hasRegulator) {
    return <p className="text-xs text-brand-slate mt-2">This role type isn’t covered by a statutory UK register — no number needed.</p>
  }
  if (!verification || verification.status === "unverified") {
    return <p className="text-xs text-brand-slate mt-2">Enter your {regulatorName} number and tap Verify. Practices see your verification status when you apply.</p>
  }
  if (verification.status === "verified") {
    return (
      <p className="text-xs text-teal font-medium mt-2 flex items-center gap-1.5">
        <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
        Verified with {regulatorName}{verification.verified_name ? ` — ${verification.verified_name}` : ""}
      </p>
    )
  }
  if (verification.status === "failed") {
    const msg = verification.reason === "bad_format"
      ? `That doesn’t look like a valid ${regulatorName} number — please check it.`
      : "Please enter your registration number."
    return <p className="text-xs text-red-600 mt-2">{msg}</p>
  }
  // pending_review (incl. not_found / lookup_unavailable / manual_only)
  return <p className="text-xs text-amber-600 mt-2">Submitted for review — we’ll confirm your {regulatorName} registration shortly.</p>
}
