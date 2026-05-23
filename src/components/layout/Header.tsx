import Link from "next/link"
import { createClient } from "@/lib/supabase/server"

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
    <header className="border-b bg-white">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="font-semibold text-lg tracking-tight text-slate-900">
          The Practice Standard
        </Link>
        <nav className="flex items-center gap-4">
          <Link href="/jobs" className="text-sm text-slate-600 hover:text-slate-900">Browse Jobs</Link>
          {!user && (
            <>
              <Link href="/pricing" className="text-sm text-slate-600 hover:text-slate-900">For Practices</Link>
              <Link
                href="/auth/login"
                className="inline-flex items-center justify-center rounded-lg border border-input bg-background px-2.5 py-1.5 text-[0.8rem] font-medium transition-colors hover:bg-muted hover:text-foreground"
              >
                Sign in
              </Link>
              <Link
                href="/auth/register"
                className="inline-flex items-center justify-center rounded-lg bg-primary px-2.5 py-1.5 text-[0.8rem] font-medium text-primary-foreground transition-colors hover:bg-primary/80"
              >
                Post a job
              </Link>
            </>
          )}
          {user && role === "practice" && (
            <Link
              href="/practice/dashboard"
              className="inline-flex items-center justify-center rounded-lg bg-primary px-2.5 py-1.5 text-[0.8rem] font-medium text-primary-foreground transition-colors hover:bg-primary/80"
            >
              Dashboard
            </Link>
          )}
          {user && role === "candidate" && (
            <Link
              href="/candidate/dashboard"
              className="inline-flex items-center justify-center rounded-lg bg-primary px-2.5 py-1.5 text-[0.8rem] font-medium text-primary-foreground transition-colors hover:bg-primary/80"
            >
              My Applications
            </Link>
          )}
        </nav>
      </div>
    </header>
  )
}
