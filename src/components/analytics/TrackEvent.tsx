"use client"

import { useEffect } from "react"
import { track } from "@/lib/analytics"

/**
 * Fires a GA4 event once on mount. Mount inside a server component (e.g. a page)
 * to record a view/conversion landing — e.g. <TrackEvent event="founding_view" />.
 */
export function TrackEvent({ event, props }: { event: string; props?: Record<string, unknown> }) {
  useEffect(() => {
    track(event, props)
    // fire once on mount
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [event])
  return null
}
