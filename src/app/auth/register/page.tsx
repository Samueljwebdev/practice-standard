"use client"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
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

    const { error: profileError } = await supabase
      .from("profiles")
      .insert({ id: data.user.id, role })

    if (profileError) {
      setError("Account created but profile setup failed. Please contact support.")
      setLoading(false)
      return
    }

    if (role === "practice") {
      await supabase.from("practices").insert({
        user_id: data.user.id,
        name,
        practice_type: "dental",
      })
      router.push("/practice/dashboard")
    } else {
      await supabase.from("candidates").insert({
        user_id: data.user.id,
        full_name: name,
        profession: "dentist",
      })
      router.push("/candidate/profile")
    }
    router.refresh()
  }

  if (!role) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 p-4">
        <div className="w-full max-w-md space-y-4">
          <h1 className="text-2xl font-bold text-center text-slate-900">Join The Practice Standard</h1>
          <p className="text-center text-slate-500">I am a...</p>
          <div className="grid grid-cols-2 gap-4">
            <Card
              className="cursor-pointer hover:border-slate-900 transition-colors"
              onClick={() => setRole("practice")}
            >
              <CardContent className="pt-6 text-center">
                <div className="text-3xl mb-2">🏥</div>
                <CardTitle className="text-base">Practice</CardTitle>
                <CardDescription className="text-xs mt-1">Post jobs and find professionals</CardDescription>
              </CardContent>
            </Card>
            <Card
              className="cursor-pointer hover:border-slate-900 transition-colors"
              onClick={() => setRole("candidate")}
            >
              <CardContent className="pt-6 text-center">
                <div className="text-3xl mb-2">👩‍⚕️</div>
                <CardTitle className="text-base">Professional</CardTitle>
                <CardDescription className="text-xs mt-1">Find your next role — always free</CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Create your account</CardTitle>
          <CardDescription>
            {role === "practice" ? "Post jobs and manage applicants" : "Find your next role — always free"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleRegister} className="space-y-4">
            <div>
              <Label htmlFor="name">{role === "practice" ? "Practice name" : "Full name"}</Label>
              <Input id="name" value={name} onChange={e => setName(e.target.value)} required />
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" value={email} onChange={e => setEmail(e.target.value)} required />
            </div>
            <div>
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" value={password} onChange={e => setPassword(e.target.value)} required minLength={8} />
            </div>
            {error && <p className="text-sm text-red-600">{error}</p>}
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Creating account..." : "Create account"}
            </Button>
            <p className="text-center text-sm text-slate-500">
              Already have an account?{" "}
              <Link href="/auth/login" className="underline">Sign in</Link>
            </p>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
