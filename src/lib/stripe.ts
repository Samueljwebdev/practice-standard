import Stripe from "stripe"

/**
 * Strip a leading UTF-8 BOM (U+FEFF) and surrounding whitespace from an env
 * value. Secrets pasted from a BOM-encoded file (common on Windows/PowerShell)
 * carry an invisible 0xFEFF that corrupts HTTP headers — e.g. it makes the
 * Authorization header unencodable, so every Stripe request throws a
 * StripeConnectionError. This makes env reads resilient to that.
 */
export function cleanEnv(v: string | undefined): string {
  let s = v ?? ""
  // Drop a leading UTF-8 BOM (char code 0xFEFF) if present, then trim.
  if (s.charCodeAt(0) === 0xfeff) s = s.slice(1)
  return s.trim()
}

export const stripe = new Stripe(cleanEnv(process.env.STRIPE_SECRET_KEY), {
  apiVersion: "2026-04-22.dahlia" as any,
  // fetch-based client is the reliable choice in Vercel's serverless runtime
  httpClient: Stripe.createFetchHttpClient(),
})
