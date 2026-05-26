"use client"
import { useState, useEffect } from "react"

const STORAGE_KEY = "tps_cookie_consent"

declare global {
  interface Window {
    gtag: (...args: unknown[]) => void
  }
}

function updateGtag(granted: boolean) {
  if (typeof window !== "undefined" && typeof window.gtag === "function") {
    window.gtag("consent", "update", {
      analytics_storage: granted ? "granted" : "denied",
      ad_storage: "denied",
    })
  }
}

export function CookieBanner() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (!stored) {
      setVisible(true)
    } else if (stored === "accepted") {
      updateGtag(true)
    }
  }, [])

  function accept() {
    localStorage.setItem(STORAGE_KEY, "accepted")
    updateGtag(true)
    setVisible(false)
  }

  function decline() {
    localStorage.setItem(STORAGE_KEY, "declined")
    updateGtag(false)
    setVisible(false)
  }

  if (!visible) return null

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 sm:p-5 bg-navy border-t border-white/10">
      <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6 justify-between">
        <p className="text-white/70 text-xs leading-relaxed max-w-xl">
          We use analytics cookies to understand how visitors use our site. No advertising cookies.{" "}
          <a href="/privacy" className="text-mint hover:underline">Privacy policy</a>
        </p>
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={decline}
            className="text-white/50 hover:text-white text-xs font-medium px-4 py-2 rounded-full border border-white/20 hover:border-white/40 transition-colors"
          >
            Decline
          </button>
          <button
            onClick={accept}
            className="bg-mint text-navy text-xs font-semibold px-5 py-2 rounded-full hover:bg-mint/85 transition-colors"
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  )
}
