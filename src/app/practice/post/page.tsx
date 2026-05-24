"use client"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import { generateJobSlug } from "@/lib/utils/slug"
import { PROFESSIONS, PROFESSION_CATEGORIES, JOB_TYPES, UK_REGIONS, LISTING_PRICE_GBP } from "@/lib/constants"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import type { Practice } from "@/types/database"

export default function PostJobPage() {
  const router = useRouter()
  const supabase = createClient()
  const [practice, setPractice] = useState<Practice | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const [form, setForm] = useState({
    title: "",
    profession: "",
    job_type: "",
    region: "",
    city: "",
    salary_min: "",
    salary_max: "",
    description: "",
    requirements: "",
  })

  useEffect(() => {
    async function loadPractice() {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return
      const { data } = await supabase
        .from("practices")
        .select("*")
        .eq("user_id", user.id)
        .single()
      setPractice(data)
    }
    loadPractice()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  function set(field: string, value: string) {
    setForm(prev => ({ ...prev, [field]: value }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!practice) return
    setLoading(true)
    setError("")

    const slug = generateJobSlug(form.title, form.city || null)

    const { data: job, error: jobError } = await supabase
      .from("jobs")
      .insert({
        practice_id: practice.id,
        title: form.title,
        profession: form.profession,
        job_type: form.job_type,
        region: form.region,
        city: form.city || null,
        salary_min: form.salary_min ? parseInt(form.salary_min) : null,
        salary_max: form.salary_max ? parseInt(form.salary_max) : null,
        description: form.description,
        requirements: form.requirements || null,
        slug,
      })
      .select()
      .single()

    if (jobError || !job) {
      setError("Failed to save job. Please try again.")
      setLoading(false)
      return
    }

    router.push(`/api/stripe/checkout?jobId=${job.id}`)
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-12">

      {/* Progress strip */}
      <div className="flex items-center gap-2 mb-6 text-xs text-brand-slate">
        <span className="font-semibold text-teal">1. Write your listing</span>
        <span className="h-px w-6 bg-border" />
        <span>2. Pay £{LISTING_PRICE_GBP}</span>
        <span className="h-px w-6 bg-border" />
        <span>3. Go live</span>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Post a role</CardTitle>
          <CardDescription>
            {practice?.subscription_status === "active"
              ? "Included in your Practice Pro subscription — post as many roles as you need."
              : `£${LISTING_PRICE_GBP} + VAT · Active for 30 days · Goes live immediately after payment.`}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <Label>Job title</Label>
              <Input placeholder="e.g. Senior Aesthetic Nurse" value={form.title} onChange={e => set("title", e.target.value)} required />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Profession</Label>
                <Select onValueChange={v => set("profession", v as string)}>
                  <SelectTrigger><SelectValue placeholder="Select..." /></SelectTrigger>
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
                <Label>Job type</Label>
                <Select onValueChange={v => set("job_type", v as string)}>
                  <SelectTrigger><SelectValue placeholder="Select..." /></SelectTrigger>
                  <SelectContent>
                    {JOB_TYPES.map(t => <SelectItem key={t.value} value={t.value}>{t.label}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Region</Label>
                <Select onValueChange={v => set("region", v as string)}>
                  <SelectTrigger><SelectValue placeholder="Select..." /></SelectTrigger>
                  <SelectContent>
                    {UK_REGIONS.map(r => <SelectItem key={r} value={r}>{r}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>City / Town</Label>
                <Input placeholder="e.g. Bristol" value={form.city} onChange={e => set("city", e.target.value)} />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Salary from (£/yr)</Label>
                <Input type="number" placeholder="30000" value={form.salary_min} onChange={e => set("salary_min", e.target.value)} />
              </div>
              <div>
                <Label>Salary to (£/yr)</Label>
                <Input type="number" placeholder="40000" value={form.salary_max} onChange={e => set("salary_max", e.target.value)} />
              </div>
            </div>
            <div>
              <Label>Job description</Label>
              <Textarea rows={6} placeholder="Describe the role, the practice, and what makes this a great opportunity..." value={form.description} onChange={e => set("description", e.target.value)} required />
            </div>
            <div>
              <Label>Requirements (optional)</Label>
              <Textarea rows={3} placeholder="GDC registration, years experience, specific skills..." value={form.requirements} onChange={e => set("requirements", e.target.value)} />
            </div>
            {error && <p className="text-sm text-red-600">{error}</p>}
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Saving..." : `Continue to payment — £${LISTING_PRICE_GBP}`}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
