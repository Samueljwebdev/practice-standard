import type { Metadata } from "next"
import { getBaseUrl } from "@/lib/seo"

export const metadata: Metadata = {
  title: "UK Private Practice Salary Benchmark 2026 | The Practice Standard",
  description: "Free salary guide: ranges for 25+ clinical roles across aesthetics, veterinary, optometry, physiotherapy, and private medical. Regional adjustments included.",
  alternates: { canonical: `${getBaseUrl()}/salary-benchmark` },
  openGraph: {
    title: "UK Private Practice Salary Benchmark 2026",
    description: "Free salary guide for private practice owners — 25+ roles, 5 disciplines, regional adjustments.",
    url: `${getBaseUrl()}/salary-benchmark`,
  },
}

export default function SalaryBenchmarkLayout({ children }: { children: React.ReactNode }) {
  return children
}
