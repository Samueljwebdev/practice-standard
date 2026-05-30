import { createClient, createServiceClient } from "@/lib/supabase/server"
import { NextResponse } from "next/server"

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get("code")

  if (!code) {
    return NextResponse.redirect(`${origin}/auth/login`)
  }

  const supabase = await createClient()
  const { data, error } = await supabase.auth.exchangeCodeForSession(code)

  if (error || !data.user) {
    return NextResponse.redirect(`${origin}/auth/login?error=confirm`)
  }

  // Ensure the profile/practice/candidate rows exist. They are normally created
  // at sign-up, but provisioning here too makes email confirmation self-healing.
  const admin = createServiceClient()
  let role = "candidate"
  const { data: profile } = await admin
    .from("profiles")
    .select("role")
    .eq("id", data.user.id)
    .maybeSingle()

  if (profile?.role) {
    role = profile.role
  } else {
    try {
      const res = await fetch(`${origin}/api/auth/provision`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: data.user.id }),
      })
      const json = await res.json().catch(() => null)
      if (json?.role) role = json.role
    } catch {
      // fall through with default role
    }
  }

  const dest = role === "practice" ? "/practice/dashboard" : "/candidate/profile"
  return NextResponse.redirect(`${origin}${dest}`)
}
