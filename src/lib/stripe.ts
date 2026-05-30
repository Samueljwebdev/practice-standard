import Stripe from "stripe"

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2026-04-22.dahlia" as any,
  // Use the fetch-based HTTP client. The SDK's default Node HTTP client throws
  // "An error occurred with our connection to Stripe" (StripeConnectionError)
  // in Vercel's serverless runtime; fetch (available on Node 18+) is reliable.
  httpClient: Stripe.createFetchHttpClient(),
})
