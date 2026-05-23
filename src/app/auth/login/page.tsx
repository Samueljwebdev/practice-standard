"use client"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from "next/link"

export default function LoginPage() {
  const router = useRouter()
  const supabase = createClient()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError("")
    const { data, error: loginError } = await supabase.auth.signInWithPassword({ email, password })
    if (loginError || !data.user) {
      setError("Invalid email or password")
      setLoading(false)
      return
    }
    const { data: profile } = await supabase.from("profiles").select("role").eq("id", data.user.id).single()
    router.push(profile?.role === "practice" ? "/practice/dashboard" : "/candidate/dashboard")
    router.refresh()
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-off-white px-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <p className="text-xs font-semibold text-teal uppercase tracking-[0.18em] mb-2">Welcome back</p>
          <h1 className="text-2xl font-bold text-navy">Sign in</h1>
        </div>
        <div className="bg-white border border-border rounded-2xl p-8 shadow-sm">
          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <Label htmlFor="email" className="text-navy/80 text-sm font-medium">Email</Label>
              <Input id="email" type="email" value={email} onChange={e => setEmail(e.target.value)} required className="mt-1" />
            </div>
            <div>
              <Label htmlFor="password" className="text-navy/80 text-sm font-medium">Password</Label>
              <Input id="password" type="password" value={password} onChange={e => setPassword(e.target.value)} required className="mt-1" />
            </div>
            {error && <p className="text-sm text-red-600">{error}</p>}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-teal text-off-white py-2.5 rounded-full text-sm font-semibold hover:bg-teal/90 transition-colors disabled:opacity-60"
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
