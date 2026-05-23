import Link from "next/link"
import { createClient } from "@/lib/supabase/server"

function CrossLogo() {
  return (
    <svg width="30" height="30" viewBox="0 0 30 30" fill="none" aria-hidden="true">
      <rect x="10" y="0" width="10" height="30" rx="3" fill="#0F3D3E" />
      <rect x="0" y="10" width="30" height="10" rx="3" fill="#0F3D3E" />
      <path d="M15 8 A7 7 0 0 1 15 22 Z" fill="#F2F4F3" />
    </svg>
  )
}

export async function Header() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  let role: string | null = null
  if (user) {
    const { data: profile } = await supabase
      .from("profiles")
      .select("role")
      .eq("id", user.id)
      .single()
    role = profile?.role ?? null
  }

  return (
    <header className="border-b border-border/60 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2.5 group">
          <CrossLogo />
          <div className="flex flex-col leading-none">
            <span className="text-[9px] font-bold text-navy/50 tracking-[0.2em] uppercase">The</span>
            <span className="text-[13px] font-bold text-navy tracking-[0.05em] uppercase leading-tight">
              Practice Standard
            </span>
          </div>
        </Link>

        <nav className="flex items-center gap-1">
          <Link
            href="/jobs"
            className="text-sm text-brand-slate hover:text-navy px-3 py-1.5 rounded-lg hover:bg-off-white transition-colors"
          >
            Browse Jobs
          </Link>
          {!user && (
            <>
              <Link
                href="/pricing"
                className="text-sm text-brand-slate hover:text-navy px-3 py-1.5 rounded-lg hover:bg-off-white transition-colors"
              >
                Pricing
              </Link>
              <Link
                href="/auth/login"
                className="text-sm text-brand-slate hover:text-navy px-3 py-1.5 rounded-lg hover:bg-off-white transition-colors ml-1"
              >
                Sign in
              </Link>
              <Link
                href="/auth/register"
                className="ml-1 bg-teal text-off-white px-4 py-1.5 rounded-full text-sm font-semibold hover:bg-teal/90 transition-colors"
              >
                Post a job
              </Link>
            </>
          )}
          {user && role === "practice" && (
            <Link
              href="/practice/dashboard"
              className="ml-1 bg-teal text-off-white px-4 py-1.5 rounded-full text-sm font-semibold hover:bg-teal/90 transition-colors"
            >
              Dashboard
            </Link>
          )}
          {user && role === "candidate" && (
            <Link
              href="/candidate/dashboard"
              className="ml-1 bg-teal text-off-white px-4 py-1.5 rounded-full text-sm font-semibold hover:bg-teal/90 transition-colors"
            >
              My Applications
            </Link>
          )}
        </nav>
      </div>
    </header>
  )
}
