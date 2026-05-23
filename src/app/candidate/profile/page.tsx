"use client"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import { PROFESSIONS, UK_REGIONS } from "@/lib/constants"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

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
      <Card>
        <CardHeader><CardTitle>Your profile</CardTitle></CardHeader>
        <CardContent>
          <form onSubmit={handleSave} className="space-y-4">
            <div>
              <Label>Full name</Label>
              <Input value={form.full_name} onChange={e => setField("full_name", e.target.value)} required />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Profession</Label>
                <Select value={form.profession} onValueChange={v => setField("profession", v as string)}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {PROFESSIONS.map(p => <SelectItem key={p.value} value={p.value}>{p.label}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Registration number</Label>
                <Input placeholder="GDC / RCVS / GOC..." value={form.registration_number} onChange={e => setField("registration_number", e.target.value)} />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Town / City</Label>
                <Input placeholder="Bristol" value={form.location} onChange={e => setField("location", e.target.value)} />
              </div>
              <div>
                <Label>Region</Label>
                <Select value={form.region} onValueChange={v => setField("region", v as string)}>
                  <SelectTrigger><SelectValue placeholder="Select..." /></SelectTrigger>
                  <SelectContent>
                    {UK_REGIONS.map(r => <SelectItem key={r} value={r}>{r}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div>
              <Label>Years of experience</Label>
              <Input type="number" min="0" max="50" value={form.years_experience} onChange={e => setField("years_experience", e.target.value)} />
            </div>
            <div>
              <Label>Bio (optional)</Label>
              <Textarea rows={4} placeholder="A brief summary of your experience and what you're looking for..." value={form.bio} onChange={e => setField("bio", e.target.value)} />
            </div>
            <button type="submit" className="w-full bg-slate-900 text-white text-sm py-2.5 rounded-md hover:bg-slate-700 transition-colors disabled:opacity-50" disabled={loading}>
              {saved ? "Saved!" : loading ? "Saving..." : "Save profile"}
            </button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
