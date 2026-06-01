"use client"

import { useEffect, useState } from "react"
import { FOUNDING_PRICE_GBP, FOUNDING_ANNUAL_PRICE_LABEL, SUBSCRIPTION_PRICE_GBP } from "@/lib/constants"

/**
 * Shown on the practice dashboard when a practice signed up via the Founding 41
 * page (we stash `tps_plan` = "founder" or "founder_annual" in localStorage at
 * register). It surfaces a one-click activation of the founder subscription they
 * chose — charged now, locked for life. Hidden once they're subscribed.
 */
export function FounderActivateBanner({ isSubscribed }: { isSubscribed: boolean }) {
  const [plan, setPlan] = useState<"founder" | "founder_annual" | null>(null)

  useEffect(() => {
    if (isSubscribed) return
    const p = localStorage.getItem("tps_plan")
    if (p === "founder" || p === "founder_annual") setPlan(p)
  }, [isSubscribed])

  if (!plan) return null

  const annual = plan === "founder_annual"
  const priceLabel = annual ? `£${FOUNDING_ANNUAL_PRICE_LABEL}/yr` : `£${FOUNDING_PRICE_GBP}/mo`
  const subline = annual
    ? `Activate your founder rate now — £${FOUNDING_ANNUAL_PRICE_LABEL}/year (2 months free), locked for life. Unlimited verified-candidate listings.`
    : `Activate your founder rate now — £${FOUNDING_PRICE_GBP}/month, locked for life (vs £${SUBSCRIPTION_PRICE_GBP} standard). Unlimited verified-candidate listings. Cancel any time.`

  return (
    <div className="rounded-2xl bg-navy p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
      <div>
        <p className="text-sm font-bold text-white flex items-center gap-2">
          <span className="h-1.5 w-1.5 rounded-full bg-mint animate-pulse" />
          You claimed a founding spot
        </p>
        <p className="text-xs text-white/60 mt-1 max-w-md">{subline}</p>
      </div>
      <a
        href={`/api/stripe/checkout?mode=subscription&plan=${plan}`}
        className="shrink-0 bg-mint text-navy text-sm px-5 py-2.5 rounded-full font-semibold hover:bg-mint/90 transition-colors whitespace-nowrap text-center"
      >
        Activate founder rate · {priceLabel}
      </a>
    </div>
  )
}
