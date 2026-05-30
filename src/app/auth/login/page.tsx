"use client"
import { useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from "next/link"
import { Suspense } from "react"

function LoginForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const supabase = createClient()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const resetSuccess = searchParams.get("reset") === "success"

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError("")
    const { data, error: loginError } = await supabase.auth.signInWithPassword({ email, password })
    if (loginError || !data.user) {
      if (loginError && /email not confirmed/i.test(loginError.message)) {
        setError("Please confirm your email first — check your inbox for the confirmation link.")
      } else {
        setError("Invalid email or password")
      }
      setLoading(false)
      return
    }
    let role = (await supabase.from("profiles").select("role").eq("id", data.user.id).maybeSingle()).data?.role

    // Safety net: if the profile was never created (e.g. the confirm callback
    // didn't run), provision it now from the user's signUp metadata.
    if (!role) {
      try {
        const res = await fetch("/api/auth/provision", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ userId: data.user.id }),
        })
        const json = await res.json().catch(() => null)
        if (json?.role) role = json.role
      } catch {
        // fall through with default routing
      }
    }

    router.push(role === "practice" ? "/practice/dashboard" : "/candidate/dashboard")
    router.refresh()
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-off-white px-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <p className="text-xs font-semibold text-teal uppercase tracking-[0.18em] mb-2">Welcome back</p>
          <h1 className="text-2xl font-bold text-navy">Sign in</h1>
        </div>

        {resetSuccess && (
          <div className="bg-teal/8 border border-teal/20 rounded-xl px-4 py-3 mb-5 text-center">
            <p className="text-sm font-medium text-teal">Password updated — sign in with your new password.</p>
          </div>
        )}

        <div className="bg-white border border-border rounded-2xl p-8 shadow-sm">
          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <Label htmlFor="email" className="text-navy/80 text-sm font-medium">Email</Label>
              <Input id="email" type="email" value={email} onChange={e => setEmail(e.target.value)} required className="mt-1" />
            </div>
            <div>
              <div className="flex items-center justify-between mb-1">
                <Label htmlFor="password" className="text-navy/80 text-sm font-medium">Password</Label>
                <Link href="/auth/forgot-password" className="text-xs text-teal hover:underline">
                  Forgot password?
                </Link>
              </div>
              <Input id="password" type="password" value={password} onChange={e => setPassword(e.target.value)} required />
            </div>
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg px-4 py-3">
                <p className="text-sm text-red-700">{error}</p>
              </div>
            )}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-teal text-off-white py-3 rounded-full text-sm font-semibold hover:bg-teal/90 transition-colors disabled:opacity-60"
            >
              {loading ? "Signing in…" : "Sign in"}
            </button>
            <p className="text-center text-sm text-brand-slate">
              No account?{" "}
              <Link href="/auth/register" className="text-teal font-medium hover:underline">Create one — it&apos;s free</Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  )
}

export default function LoginPage() {
  return (
    <Suspense>
      <LoginForm />
    </Suspense>
  )
}
