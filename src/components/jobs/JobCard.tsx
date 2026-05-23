"use client"
import Link from "next/link"
import { motion } from "framer-motion"
import { Badge } from "@/components/ui/badge"
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
      <motion.div
        whileHover={{ y: -2, boxShadow: "0 8px 24px rgba(15,61,62,0.08)" }}
        transition={{ duration: 0.18, ease: "easeOut" }}
        className="bg-white border border-border rounded-xl px-5 py-4 cursor-pointer transition-colors hover:border-teal/30"
      >
        <div className="flex items-start justify-between gap-4">
          <div className="space-y-1 min-w-0">
            <h3 className="font-semibold text-navy truncate">{job.title}</h3>
            <p className="text-sm text-brand-slate">{(job as Job & { practices?: { name?: string } }).practices?.name ?? "Practice"}</p>
            <p className="text-sm text-brand-slate/70">{job.city ?? job.region}</p>
          </div>
          <div className="shrink-0">
            <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-mint/20 text-teal border border-mint/30">
              {typeLabel}
            </span>
          </div>
        </div>
        <div className="flex items-center gap-3 mt-3 pt-3 border-t border-border/40">
          <span className="text-sm text-navy font-medium">{formatSalary(job.salary_min, job.salary_max)}</span>
          <span className="text-border">·</span>
          <span className="text-sm text-brand-slate">{professionLabel}</span>
        </div>
      </motion.div>
    </Link>
  )
}
