"use client"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from "next/link"
import { track } from "@/lib/analytics"

const PRACTICE_TYPES = [
  { value: "aesthetic", label: "Aesthetic clinic" },
  { value: "veterinary", label: "Veterinary practice" },
  { value: "optometry", label: "Optometry / ophthalmology" },
  { value: "physiotherapy", label: "Physiotherapy / allied health" },
  { value: "private_medical", label: "Private GP / medical clinic" },
  { value: "other", label: "Other" },
]

export default function RegisterPage() {
  const router = useRouter()
  const supabase = createClient()
  const [role, setRole] = useState<"practice" | "candidate" | null>(null)
  const [practiceType, setPracticeType] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [name, setName] = useState("")
  const [error, setError] = useState("")
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({})
  const [loading, setLoading] = useState(false)

  function validate() {
    const errors: Record<string, string> = {}
    if (!name.trim()) errors.name = "Required"
    if (!email.trim()) errors.email = "Required"
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.email = "Enter a valid email address"
    if (!password) errors.password = "Required"
    else if (password.length < 8) errors.password = "Must be at least 8 characters"
    if (role === "practice" && !practiceType) errors.practiceType = "Please select your practice type"
    return errors
  }

  async function handleRegister(e: React.FormEvent) {
    e.preventDefault()
    if (!role) return
    const errors = validate()
    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors)
      return
    }
    setFieldErrors({})
    setLoading(true)
    setError("")

    try {
      const { data, error: signUpError } = await supabase.auth.signUp({ email, password })

      if (signUpError) {
        setError(signUpError.message || "Registration failed. Please try again.")
        setLoading(false)
        return
      }

      // Email confirmation pending — user created successfully, just needs to verify
      if (!data.user) {
        router.push(`/auth/confirm?email=${encodeURIComponent(email)}`)
        return
      }

      const { error: profileError } = await supabase.from("profiles").insert({ id: data.user.id, role })
      if (profileError) {
        setError("Account created but profile setup failed. Please contact support.")
        setLoading(false)
        return
      }

      if (role === "practice") {
        await supabase.from("practices").insert({
          user_id: data.user.id,
          name,
          practice_type: practiceType,
        })
      } else {
        await supabase.from("candidates").insert({ user_id: data.user.id, full_name: name, profession: "" })
      }

      fetch("/api/auth/welcome", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, name, role }),
      }).catch(() => {})

      track("signup_completed", { role, ...(role === "practice" ? { practice_type: practiceType } : {}) })

      router.push(role === "practice" ? "/practice/dashboard" : "/candidate/profile")
      router.refresh()
    } catch {
      setError("Registration failed. Please check your connection and try again.")
      setLoading(false)
    }
  }

  // Step 1: Role selection
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
    <div className="min-h-screen flex items-center justify-center bg-off-white px-4 py-12">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <p className="text-xs font-semibold text-teal uppercase tracking-[0.18em] mb-2">
            {role === "practice" ? "For practices" : "For professionals"}
          </p>
          <h1 className="text-2xl font-bold text-navy">
            {role === "practice" ? "Start hiring better" : "Find your next role"}
          </h1>
          <p className="text-brand-slate text-sm mt-1">
            {role === "practice"
              ? "Reach registered professionals — without agency fees"
              : "Private practice roles only. Always free."}
          </p>
        </div>

        <div className="bg-white border border-border rounded-2xl p-8 shadow-sm">
          <form onSubmit={handleRegister} className="space-y-5" noValidate>

            {/* Practice type — practices only */}
            {role === "practice" && (
              <div>
                <Label className="text-navy/80 text-sm font-medium">Type of practice</Label>
                <div className="mt-2 grid grid-cols-2 gap-2">
                  {PRACTICE_TYPES.map(pt => (
                    <button
                      key={pt.value}
                      type="button"
                      onClick={() => setPracticeType(pt.value)}
                      className={`text-left px-3 py-2 rounded-xl border text-xs font-medium transition-all ${
                        practiceType === pt.value
                          ? "border-teal bg-teal/5 text-teal"
                          : "border-border text-navy/70 hover:border-teal/50"
                      }`}
                    >
                      {pt.label}
                    </button>
                  ))}
                </div>
                {fieldErrors.practiceType && (
                  <p className="text-xs text-red-600 mt-1">{fieldErrors.practiceType}</p>
                )}
              </div>
            )}

            {/* Name */}
            <div>
              <Label className="text-navy/80 text-sm font-medium">
                {role === "practice" ? "Practice name" : "Full name"}
              </Label>
              <Input
                value={name}
                onChange={e => {
                  setName(e.target.value)
                  if (fieldErrors.name) setFieldErrors(p => ({ ...p, name: "" }))
                }}
                placeholder={role === "practice" ? "e.g. The Aesthetic Clinic" : "e.g. Sarah Johnson"}
                className={`mt-1 ${fieldErrors.name ? "border-red-400 focus-visible:ring-red-300" : ""}`}
              />
              {fieldErrors.name && <p className="text-xs text-red-600 mt-1">{fieldErrors.name}</p>}
            </div>

            {/* Email */}
            <div>
              <Label className="text-navy/80 text-sm font-medium">Email address</Label>
              <Input
                type="email"
                value={email}
                onChange={e => {
                  setEmail(e.target.value)
                  if (fieldErrors.email) setFieldErrors(p => ({ ...p, email: "" }))
                }}
                placeholder="you@example.com"
                autoComplete="email"
                className={`mt-1 ${fieldErrors.email ? "border-red-400 focus-visible:ring-red-300" : ""}`}
              />
              {fieldErrors.email && <p className="text-xs text-red-600 mt-1">{fieldErrors.email}</p>}
            </div>

            {/* Password */}
            <div>
              <Label className="text-navy/80 text-sm font-medium">Password</Label>
              <div className="relative mt-1">
                <Input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={e => {
                    setPassword(e.target.value)
                    if (fieldErrors.password) setFieldErrors(p => ({ ...p, password: "" }))
                  }}
                  placeholder="Min. 8 characters"
                  autoComplete="new-password"
                  className={`pr-10 ${fieldErrors.password ? "border-red-400 focus-visible:ring-red-300" : ""}`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(s => !s)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-brand-slate hover:text-navy transition-colors"
                  tabIndex={-1}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? (
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 4.411m0 0L21 21" />
                    </svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  )}
                </button>
              </div>
              {fieldErrors.password && <p className="text-xs text-red-600 mt-1">{fieldErrors.password}</p>}
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
              {loading
                ? "Creating account…"
                : role === "practice"
                ? "Create account — post a role →"
                : "Create free account — browse roles →"}
            </button>

            {/* Trust signals */}
            <div className="flex items-center justify-center gap-1.5 pt-1">
              <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} className="text-teal shrink-0">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
              <p className="text-xs text-brand-slate">
                {role === "practice"
                  ? "No commitment — cancel or pause any time"
                  : "Always free for professionals — no hidden fees"}
              </p>
            </div>

            <p className="text-center text-sm text-brand-slate">
              Already have an account?{" "}
              <Link href="/auth/login" className="text-teal font-medium hover:underline">Sign in</Link>
            </p>
          </form>
        </div>

        <p className="text-center mt-4">
          <button
            onClick={() => { setRole(null); setPracticeType(""); setFieldErrors({}) }}
            className="text-xs text-brand-slate hover:text-navy transition-colors"
          >
            ← Change account type
          </button>
        </p>
      </div>
    </div>
  )
}
