"use client"

import Link from "next/link"
import type { ReactNode } from "react"
import { track } from "@/lib/analytics"

/**
 * Founding-plan CTA that records which plan the visitor chose before they leave
 * for checkout/register — so the funnel can show monthly vs annual intent.
 */
export function PlanCTA({ href, plan, className, children }: { href: string; plan: string; className?: string; children: ReactNode }) {
  return (
    <Link href={href} className={className} onClick={() => track("founding_checkout_clicked", { plan })}>
      {children}
    </Link>
  )
}
