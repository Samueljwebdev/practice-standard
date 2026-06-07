import { createClient } from "@/lib/supabase/server"
import { stripe, cleanEnv } from "@/lib/stripe"
import { FOUNDING_TOTAL_SPOTS, FOUNDING_SPOTS_CLAIMED } from "@/lib/constants"
import { NextResponse } from "next/server"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const jobId = searchParams.get("jobId")
  const mode = searchParams.get("mode") ?? "listing"
  const plan = searchParams.get("plan") // "founder" → founder price; else standard
  const base = process.env.NEXT_PUBLIC_BASE_URL

  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.redirect(`${base}/auth/login`)

  const { data: practice } = await supabase
    .from("practices")
    .select("id, name, stripe_customer_id, subscription_status")
    .eq("user_id", user.id)
    .single()

  if (!practice) return NextResponse.redirect(`${base}/practice/dashboard`)

  try {
    let customerId = practice.stripe_customer_id
    if (!customerId) {
      const customer = await stripe.customers.create({
        email: user.email,
        name: practice.name,
        metadata: { practice_id: practice.id },
      })
      customerId = customer.id
      await supabase.from("practices").update({ stripe_customer_id: customerId }).eq("id", practice.id)
    }

    if (mode === "subscription") {
      // Founder plans use the locked-for-life founder prices when configured;
      // each falls back gracefully if its env isn't set yet.
      // Founder pricing is capped at the 41 founding spots (FOUNDING_SPOTS_CLAIMED is the
      // same counter that drives the public /founding tally). Once full, a request for any
      // founder plan transparently falls back to standard pricing. While spots remain
      // (claimed < total) behaviour is unchanged.
      const foundingOpen = FOUNDING_SPOTS_CLAIMED < FOUNDING_TOTAL_SPOTS
      const isFounderAnnual = foundingOpen && plan === "founder_annual"
      const isFounder = foundingOpen && (plan === "founder" || plan === "founder_annual")
      const monthlyFounder = cleanEnv(process.env.STRIPE_FOUNDER_PRICE_ID)
      const annualFounder = cleanEnv(process.env.STRIPE_FOUNDER_ANNUAL_PRICE_ID)
      const standard = cleanEnv(process.env.STRIPE_SUBSCRIPTION_PRICE_ID)

      let subPrice = standard
      if (isFounderAnnual) subPrice = annualFounder || monthlyFounder || standard
      else if (isFounder) subPrice = monthlyFounder || standard

      const session = await stripe.checkout.sessions.create({
        customer: customerId,
        mode: "subscription",
        line_items: [{ price: subPrice, quantity: 1 }],
        success_url: `${base}/practice/dashboard?subscribed=true${isFounder ? "&founder=1" : ""}`,
        cancel_url: `${base}${isFounder ? "/founding" : "/pricing"}`,
        metadata: { practice_id: practice.id, plan: isFounderAnnual ? "founder_annual" : isFounder ? "founder" : "standard" },
      })
      return NextResponse.redirect(session.url!)
    }

    if (!jobId) return NextResponse.redirect(`${base}/practice/dashboard`)

    if (practice.subscription_status === "active") {
      const thirtyDaysFromNow = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString()
      await supabase.from("jobs").update({
        status: "active",
        payment_status: "paid",
        published_at: new Date().toISOString(),
        expires_at: thirtyDaysFromNow,
      }).eq("id", jobId)
      return NextResponse.redirect(`${base}/practice/dashboard?published=true`)
    }

    const session = await stripe.checkout.sessions.create({
      customer: customerId,
      mode: "payment",
      line_items: [{ price: cleanEnv(process.env.STRIPE_LISTING_PRICE_ID), quantity: 1 }],
      success_url: `${base}/practice/dashboard?published=true`,
      cancel_url: `${base}/practice/post`,
      metadata: { practice_id: practice.id, job_id: jobId },
    })

    return NextResponse.redirect(session.url!)
  } catch (err) {
    console.error("Stripe checkout failed:", err)
    const dest = mode === "subscription" ? "/pricing" : "/practice/dashboard"
    return NextResponse.redirect(`${base}${dest}?error=checkout`)
  }
}
