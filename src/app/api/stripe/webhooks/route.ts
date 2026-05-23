import { stripe } from "@/lib/stripe"
import { createServiceClient } from "@/lib/supabase/server"
import { NextResponse } from "next/server"
import type Stripe from "stripe"

export async function POST(request: Request) {
  const body = await request.text()
  const sig = request.headers.get("stripe-signature")!

  let event: Stripe.Event
  try {
    event = stripe.webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET!)
  } catch {
    return new NextResponse("Webhook signature invalid", { status: 400 })
  }

  const supabase = createServiceClient()

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session
    const practiceId = session.metadata?.practice_id
    const jobId = session.metadata?.job_id

    if (!practiceId) return NextResponse.json({ ok: true })

    if (session.mode === "payment" && jobId) {
      const thirtyDaysFromNow = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString()
      await supabase.from("jobs").update({
        status: "active",
        payment_status: "paid",
        published_at: new Date().toISOString(),
        expires_at: thirtyDaysFromNow,
      }).eq("id", jobId)

      await supabase.from("job_purchases").insert({
        job_id: jobId,
        practice_id: practiceId,
        stripe_payment_intent_id: session.payment_intent as string,
        amount_pence: session.amount_total ?? 14900,
      })
    }
  }

  if (event.type === "customer.subscription.created" || event.type === "customer.subscription.updated") {
    const sub = event.data.object as Stripe.Subscription
    const customerId = sub.customer as string
    const { data: practice } = await supabase
      .from("practices")
      .select("id")
      .eq("stripe_customer_id", customerId)
      .single()

    if (practice) {
      // current_period_end was removed in Stripe v22; use cancel_at or ended_at as fallback
      const periodEnd = (sub as any).current_period_end ?? sub.cancel_at ?? null
      await supabase.from("practices").update({
        subscription_status: sub.status === "active" ? "active" : (sub.status as any),
        subscription_end: periodEnd ? new Date(periodEnd * 1000).toISOString() : null,
      }).eq("id", practice.id)
    }
  }

  if (event.type === "customer.subscription.deleted") {
    const sub = event.data.object as Stripe.Subscription
    const customerId = sub.customer as string
    await supabase.from("practices")
      .update({ subscription_status: "cancelled", subscription_end: null })
      .eq("stripe_customer_id", customerId)
  }

  return NextResponse.json({ ok: true })
}
