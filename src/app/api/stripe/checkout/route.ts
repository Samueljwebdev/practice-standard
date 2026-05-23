import { createClient } from "@/lib/supabase/server"
import { stripe } from "@/lib/stripe"
import { NextResponse } from "next/server"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const jobId = searchParams.get("jobId")
  const mode = searchParams.get("mode") ?? "listing"

  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.redirect(`${process.env.NEXT_PUBLIC_BASE_URL}/auth/login`)

  const { data: practice } = await supabase
    .from("practices")
    .select("id, name, stripe_customer_id, subscription_status")
    .eq("user_id", user.id)
    .single()

  if (!practice) return NextResponse.redirect(`${process.env.NEXT_PUBLIC_BASE_URL}/practice/dashboard`)

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
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/practice/dashboard?subscribed=true`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/pricing`,
      metadata: { practice_id: practice.id },
    })
    return NextResponse.redirect(session.url!)
  }

  if (!jobId) return NextResponse.redirect(`${process.env.NEXT_PUBLIC_BASE_URL}/practice/dashboard`)

  if (practice.subscription_status === "active") {
    const thirtyDaysFromNow = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString()
    await supabase.from("jobs").update({
      status: "active",
      payment_status: "paid",
      published_at: new Date().toISOString(),
      expires_at: thirtyDaysFromNow,
    }).eq("id", jobId)
    return NextResponse.redirect(`${process.env.NEXT_PUBLIC_BASE_URL}/practice/dashboard?published=true`)
  }

  const session = await stripe.checkout.sessions.create({
    customer: customerId,
    mode: "payment",
    line_items: [{ price: process.env.STRIPE_LISTING_PRICE_ID!, quantity: 1 }],
    success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/practice/dashboard?published=true`,
    cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/practice/post`,
    metadata: { practice_id: practice.id, job_id: jobId },
  })

  return NextResponse.redirect(session.url!)
}
