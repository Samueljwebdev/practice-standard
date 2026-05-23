"use client"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import { PROFESSIONS, PROFESSION_CATEGORIES, UK_REGIONS } from "@/lib/constants"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function CandidateProfilePage() {
  const router = useRouter()
  const supabase = createClient()
  const [loading, setLoading] = useState(false)
  const [saved, setSaved] = useState(false)
  const [candidateId, setCandidateId] = useState<string | null>(null)

  const [form, setForm] = useState({
    full_name: "",
    profession: "",
    registration_number: "",
    location: "",
    region: "",
    bio: "",
    years_experience: "",
  })

  useEffect(() => {
    async function load() {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return
      const { data } = await supabase.from("candidates").select("*").eq("user_id", user.id).single()
      if (data) {
        setCandidateId(data.id)
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
    }
    load()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  function setField(field: string, value: string) {
    setForm(prev => ({ ...prev, [field]: value }))
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault()
    if (!candidateId) return
    setLoading(true)
    await supabase.from("candidates").update({
      full_name: form.full_name,
      profession: form.profession,
      registration_number: form.registration_number || null,
      location: form.location || null,
      region: form.region || null,
      bio: form.bio || null,
      years_experience: form.years_experience ? parseInt(form.years_experience) : null,
    }).eq("id", candidateId)
    setSaved(true)
    setLoading(false)
    setTimeout(() => setSaved(false), 3000)
    router.push("/candidate/dashboard")
  }

  return (
    <div className="max-w-xl mx-auto px-4 py-10">
      <div className="mb-8">
        <p className="text-xs font-semibold text-teal uppercase tracking-[0.18em] mb-1">Account</p>
        <h1 className="text-2xl font-bold text-navy">Your profile</h1>
        <p className="text-brand-slate text-sm mt-1">Keep this up to date — practices see it when you apply.</p>
      </div>
      <div className="bg-white border border-border rounded-2xl p-8">
        <form onSubmit={handleSave} className="space-y-5">
          <div>
            <Label className="text-navy/80 text-sm font-medium">Full name</Label>
            <Input value={form.full_name} onChange={e => setField("full_name", e.target.value)} required className="mt-1" />
          </div>
          <div className="grid grid-cols-2 gap-4">
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
            <div>
              <Label className="text-navy/80 text-sm font-medium">Registration number</Label>
              <Input placeholder="GDC / RCVS / GOC…" value={form.registration_number} onChange={e => setField("registration_number", e.target.value)} className="mt-1" />
            </div>
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
            {saved ? "Saved!" : loading ? "Saving…" : "Save profile"}
          </button>
        </form>
      </div>
    </div>
  )
}
