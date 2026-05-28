"use client"
import { useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from "next/link"

export default function ForgotPasswordPage() {
  const supabase = createClient()
  const [email, setEmail] = useState("")
  const [loading, setLoading] = useState(false)
  const [sent, setSent] = useState(false)
  const [error, setError] = useState("")

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError("")

    const redirectTo = `${process.env.NEXT_PUBLIC_BASE_URL}/auth/reset-password`
    const { error: resetError } = await supabase.auth.resetPasswordForEmail(email, { redirectTo })

    if (resetError) {
      setError(resetError.message || "Something went wrong. Please try again.")
      setLoading(false)
      return
    }

    setSent(true)
    setLoading(false)
  }

  if (sent) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-off-white px-4">
        <div className="w-full max-w-sm text-center">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-teal/10 mb-6">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} className="text-teal">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
            </svg>
          </div>
          <p className="text-xs font-semibold text-teal uppercase tracking-[0.18em] mb-3">Email sent</p>
          <h1 className="text-2xl font-bold text-navy mb-3">Check your inbox</h1>
          <p className="text-brand-slate text-sm leading-relaxed mb-6">
            We&apos;ve sent a password reset link to <span className="font-semibold text-navy">{email}</span>. Check your spam folder if you don&apos;t see it.
          </p>
          <Link
            href="/auth/login"
            className="inline-flex items-center gap-2 rounded-full border-2 border-teal/30 px-6 py-2.5 text-sm font-semibold text-teal transition-[border-color,background-color] duration-300 hover:border-teal hover:bg-teal/5"
          >
            Back to sign in
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-off-white px-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <p className="text-xs font-semibold text-teal uppercase tracking-[0.18em] mb-2">Account access</p>
          <h1 className="text-2xl font-bold text-navy mb-1">Reset your password</h1>
          <p className="text-brand-slate text-sm">We&apos;ll send a reset link to your email.</p>
        </div>

        <div className="bg-white border border-border rounded-2xl p-8 shadow-sm">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <Label htmlFor="email" className="text-navy/80 text-sm font-medium">Email address</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="you@example.com"
                required
                className="mt-1"
              />
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
              {loading ? "Sending…" : "Send reset link"}
            </button>

            <p className="text-center text-sm text-brand-slate">
              <Link href="/auth/login" className="text-teal font-medium hover:underline">
                ← Back to sign in
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  )
}
