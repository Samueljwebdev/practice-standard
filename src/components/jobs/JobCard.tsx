"use client"
import Link from "next/link"
import { motion } from "framer-motion"
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
  const isExternal = job.source === "aggregated"
  const practiceName = isExternal
    ? (job.external_org_name ?? "Healthcare practice")
    : ((job as Job & { practices?: { name?: string } }).practices?.name ?? "Practice")

  return (
    <Link href={`/jobs/${job.slug}`}>
      <motion.div
        whileHover={{ y: -2 }}
        transition={{ duration: 0.22, ease: [0.32, 0.72, 0, 1] }}
        className="group rounded-2xl bg-white p-5 ring-1 ring-navy/8 shadow-[0_1px_12px_rgba(13,27,42,0.04)] transition-[box-shadow,ring-color] duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] hover:ring-teal/25 hover:shadow-[0_6px_24px_rgba(15,61,62,0.08)] cursor-pointer"
      >
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0 space-y-0.5">
            <h3 className="font-bold text-navy leading-snug truncate group-hover:text-teal transition-colors duration-300">
              {job.title}
            </h3>
            <p className="text-sm text-brand-slate">{practiceName}</p>
            <p className="text-xs text-brand-slate/60">{job.city ?? job.region}</p>
          </div>

          <div className="shrink-0 flex flex-col items-end gap-1.5">
            <span className="inline-flex items-center rounded-full bg-mint/15 px-3 py-1 text-[10px] font-semibold text-teal border border-mint/30">
              {typeLabel}
            </span>
            {isExternal && (
              <span className="inline-flex items-center rounded-full bg-navy/5 px-2.5 py-0.5 text-[9px] font-medium text-brand-slate/70 border border-navy/8">
                Sourced from the web
              </span>
            )}
          </div>
        </div>

        <div className="flex items-center gap-2.5 mt-3.5 pt-3.5 border-t border-navy/6">
          <span className="text-sm font-semibold text-navy">{formatSalary(job.salary_min, job.salary_max)}</span>
          <span className="text-navy/20 text-xs">·</span>
          <span className="text-xs text-brand-slate">{professionLabel}</span>
        </div>
      </motion.div>
    </Link>
  )
}
