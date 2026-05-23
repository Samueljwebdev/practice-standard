"use client"
import { useRouter, useSearchParams } from "next/navigation"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { PROFESSIONS, JOB_TYPES, UK_REGIONS } from "@/lib/constants"

export function JobFilters() {
  const router = useRouter()
  const searchParams = useSearchParams()

  function update(key: string, value: string) {
    const params = new URLSearchParams(searchParams.toString())
    if (value && value !== "all") {
      params.set(key, value)
    } else {
      params.delete(key)
    }
    params.delete("page")
    router.push(`/jobs?${params.toString()}`)
  }

  return (
    <div className="flex flex-wrap gap-3">
      <Input
        placeholder="Search jobs..."
        defaultValue={searchParams.get("q") ?? ""}
        className="w-48"
        onChange={e => update("q", e.target.value)}
      />
      <Select defaultValue={searchParams.get("profession") ?? "all"} onValueChange={v => update("profession", v as string)}>
        <SelectTrigger className="w-48"><SelectValue placeholder="Profession" /></SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All professions</SelectItem>
          {PROFESSIONS.map(p => <SelectItem key={p.value} value={p.value}>{p.label}</SelectItem>)}
        </SelectContent>
      </Select>
      <Select defaultValue={searchParams.get("region") ?? "all"} onValueChange={v => update("region", v as string)}>
        <SelectTrigger className="w-44"><SelectValue placeholder="Region" /></SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All regions</SelectItem>
          {UK_REGIONS.map(r => <SelectItem key={r} value={r}>{r}</SelectItem>)}
        </SelectContent>
      </Select>
      <Select defaultValue={searchParams.get("type") ?? "all"} onValueChange={v => update("type", v as string)}>
        <SelectTrigger className="w-40"><SelectValue placeholder="Job type" /></SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All types</SelectItem>
          {JOB_TYPES.map(t => <SelectItem key={t.value} value={t.value}>{t.label}</SelectItem>)}
        </SelectContent>
      </Select>
    </div>
  )
}
