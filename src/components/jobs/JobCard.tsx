import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import type { Job } from "@/types/database"
import { PROFESSIONS, JOB_TYPES } from "@/lib/constants"

interface Props { job: Job }

function formatSalary(min: number | null, max: number | null): string {
  if (!min && !max) return "Salary negotiable"
  if (min && max) return `£${(min / 1000).toFixed(0)}k – £${(max / 1000).toFixed(0)}k`
  if (min) return `From £${(min / 1000).toFixed(0)}k`
  return `Up to £${(max! / 1000).toFixed(0)}k`
}

export function JobCard({ job }: Props) {
  const professionLabel = PROFESSIONS.find(p => p.value === job.profession)?.label ?? job.profession
  const typeLabel = JOB_TYPES.find(t => t.value === job.job_type)?.label ?? job.job_type

  return (
    <Link href={`/jobs/${job.slug}`}>
      <Card className="hover:border-slate-400 transition-colors cursor-pointer">
        <CardContent className="pt-5 pb-4">
          <div className="flex items-start justify-between gap-4">
            <div className="space-y-1 min-w-0">
              <h3 className="font-semibold text-slate-900 truncate">{job.title}</h3>
              <p className="text-sm text-slate-600">{(job as Job & { practices?: { name?: string } }).practices?.name ?? "Practice"}</p>
              <p className="text-sm text-slate-500">{job.city ?? job.region}</p>
            </div>
            <div className="flex flex-col items-end gap-2 shrink-0">
              <Badge variant="secondary">{typeLabel}</Badge>
            </div>
          </div>
          <div className="flex items-center gap-3 mt-3">
            <span className="text-sm text-slate-700 font-medium">{formatSalary(job.salary_min, job.salary_max)}</span>
            <span className="text-slate-300">·</span>
            <span className="text-sm text-slate-500">{professionLabel}</span>
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}
