declare global {
  interface Window {
    gtag: (...args: unknown[]) => void
  }
}

export function track(eventName: string, properties?: Record<string, unknown>) {
  if (typeof window !== "undefined" && typeof window.gtag === "function") {
    window.gtag("event", eventName, properties ?? {})
  }
}
