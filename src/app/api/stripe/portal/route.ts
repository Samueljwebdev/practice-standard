import { createClient } from "@/lib/supabase/server"
import { stripe } from "@/lib/stripe"
import { NextResponse } from "next/server"

export async function GET() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.redirect(`${process.env.NEXT_PUBLIC_BASE_URL}/auth/login`)

  const { data: practice } = await supabase
    .from("practices")
    .select("stripe_customer_id")
    .eq("user_id", user.id)
    .single()

  if (!practice?.stripe_customer_id) {
    return NextResponse.redirect(`${process.env.NEXT_PUBLIC_BASE_URL}/practice/dashboard`)
  }

  const session = await stripe.billingPortal.sessions.create({
    customer: practice.stripe_customer_id,
    return_url: `${process.env.NEXT_PUBLIC_BASE_URL}/practice/dashboard`,
  })

  return NextResponse.redirect(session.url)
}
