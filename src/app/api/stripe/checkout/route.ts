import { createClient } from "@/lib/supabase/server"
import { stripe } from "@/lib/stripe"
import { NextResponse } from "next/server"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const jobId = searchParams.get("jobId")
  const mode = searchParams.get("mode") ?? "listing"
  const base = process.env.NEXT_PUBLIC_BASE_URL

  // TEMP: raw connectivity probe to api.stripe.com (bypasses the Stripe SDK)
  if (searchParams.get("debug") === "net") {
    const out: any = { keyPresent: !!process.env.STRIPE_SECRET_KEY, keyLen: (process.env.STRIPE_SECRET_KEY ?? "").length, keyPrefix: (process.env.STRIPE_SECRET_KEY ?? "").slice(0, 7) }
    try {
      const t0 = Date.now()
      const resp = await fetch("https://api.stripe.com/v1/charges?limit=1", {
        headers: { Authorization: `Bearer ${process.env.STRIPE_SECRET_KEY}` },
      })
      out.rawFetchStatus = resp.status
      out.ms = Date.now() - t0
      out.body = (await resp.text()).slice(0, 200)
    } catch (e: any) {
      out.rawFetchThrew = String(e?.message ?? e)
      out.cause = String(e?.cause?.message ?? e?.cause ?? "")
    }
    return NextResponse.json(out, { status: 200 })
  }

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
      const session = await stripe.checkout.sessions.create({
        customer: customerId,
        mode: "subscription",
        line_items: [{ price: process.env.STRIPE_SUBSCRIPTION_PRICE_ID!, quantity: 1 }],
        success_url: `${base}/practice/dashboard?subscribed=true`,
        cancel_url: `${base}/pricing`,
        metadata: { practice_id: practice.id },
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
      line_items: [{ price: process.env.STRIPE_LISTING_PRICE_ID!, quantity: 1 }],
      success_url: `${base}/practice/dashboard?published=true`,
      cancel_url: `${base}/practice/post`,
      metadata: { practice_id: practice.id, job_id: jobId },
    })

    return NextResponse.redirect(session.url!)
  } catch (err: any) {
    console.error("Stripe checkout failed:", err)
    if (searchParams.get("debug") === "1") {
      return NextResponse.json({
        message: String(err?.message ?? err),
        name: err?.name,
        type: err?.type,
        code: err?.code,
        statusCode: err?.statusCode,
        cause: String(err?.cause?.message ?? err?.cause ?? ""),
      }, { status: 500 })
    }
    const dest = mode === "subscription" ? "/pricing" : "/practice/dashboard"
    return NextResponse.redirect(`${base}${dest}?error=checkout`)
  }
}
