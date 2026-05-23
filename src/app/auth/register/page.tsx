"use client"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from "next/link"

export default function RegisterPage() {
  const router = useRouter()
  const supabase = createClient()
  const [role, setRole] = useState<"practice" | "candidate" | null>(null)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [name, setName] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  async function handleRegister(e: React.FormEvent) {
    e.preventDefault()
    if (!role) return
    setLoading(true)
    setError("")
    const { data, error: signUpError } = await supabase.auth.signUp({ email, password })
    if (signUpError || !data.user) {
      setError(signUpError?.message ?? "Registration failed")
      setLoading(false)
      return
    }
    const { error: profileError } = await supabase.from("profiles").insert({ id: data.user.id, role })
    if (profileError) {
      setError("Account created but profile setup failed. Please contact support.")
      setLoading(false)
      return
    }
    if (role === "practice") {
      await supabase.from("practices").insert({ user_id: data.user.id, name, practice_type: "aesthetic" })
      router.push("/practice/dashboard")
    } else {
      await supabase.from("candidates").insert({ user_id: data.user.id, full_name: name, profession: "" })
      router.push("/candidate/profile")
    }
    router.refresh()
  }

  if (!role) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-off-white px-4">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <p className="text-xs font-semibold text-teal uppercase tracking-[0.18em] mb-2">Get started</p>
            <h1 className="text-2xl font-bold text-navy">Join The Practice Standard</h1>
            <p className="text-brand-slate text-sm mt-2">I am a…</p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <button
              onClick={() => setRole("practice")}
              className="bg-white border-2 border-border rounded-2xl p-6 text-left hover:border-teal hover:shadow-sm transition-all group"
            >
              <div className="text-3xl mb-3">🏥</div>
              <p className="font-bold text-navy text-sm group-hover:text-teal transition-colors">Practice</p>
              <p className="text-xs text-brand-slate mt-1">Post jobs and find professionals</p>
            </button>
            <button
              onClick={() => setRole("candidate")}
              className="bg-white border-2 border-border rounded-2xl p-6 text-left hover:border-teal hover:shadow-sm transition-all group"
            >
              <div className="text-3xl mb-3">👩‍⚕️</div>
              <p className="font-bold text-navy text-sm group-hover:text-teal transition-colors">Professional</p>
              <p className="text-xs text-brand-slate mt-1">Find your next role — always free</p>
            </button>
          </div>
          <p className="text-center text-sm text-brand-slate mt-6">
            Already have an account?{" "}
            <Link href="/auth/login" className="text-teal font-medium hover:underline">Sign in</Link>
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-off-white px-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <p className="text-xs font-semibold text-teal uppercase tracking-[0.18em] mb-2">
            {role === "practice" ? "For practices" : "For professionals"}
          </p>
          <h1 className="text-2xl font-bold text-navy">Create your account</h1>
          <p className="text-brand-slate text-sm mt-1">
            {role === "practice" ? "Post jobs and manage applicants" : "Find your next role — always free"}
          </p>
        </div>
        <div className="bg-white border border-border rounded-2xl p-8 shadow-sm">
          <form onSubmit={handleRegister} className="space-y-5">
            <div>
              <Label className="text-navy/80 text-sm font-medium">{role === "practice" ? "Practice name" : "Full name"}</Label>
              <Input value={name} onChange={e => setName(e.target.value)} required className="mt-1" />
            </div>
            <div>
              <Label className="text-navy/80 text-sm font-medium">Email</Label>
              <Input type="email" value={email} onChange={e => setEmail(e.target.value)} required className="mt-1" />
            </div>
            <div>
              <Label className="text-navy/80 text-sm font-medium">Password</Label>
              <Input type="password" value={password} onChange={e => setPassword(e.target.value)} required minLength={8} className="mt-1" />
            </div>
            {error && <p className="text-sm text-red-600">{error}</p>}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-teal text-off-white py-2.5 rounded-full text-sm font-semibold hover:bg-teal/90 transition-colors disabled:opacity-60"
            >
              {loading ? "Creating account…" : "Create account"}
            </button>
            <p className="text-center text-sm text-brand-slate">
              Already have an account?{" "}
              <Link href="/auth/login" className="text-teal font-medium hover:underline">Sign in</Link>
            </p>
          </form>
        </div>
        <p className="text-center mt-4">
          <button onClick={() => setRole(null)} className="text-xs text-brand-slate hover:text-navy transition-colors">← Change account type</button>
        </p>
      </div>
    </div>
  )
}
