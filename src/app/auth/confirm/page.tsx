"use client"
import { Suspense } from "react"
import { useSearchParams } from "next/navigation"
import Link from "next/link"

function ConfirmContent() {
  const params = useSearchParams()
  const email = params.get("email") ?? "your email"

  return (
    <div className="min-h-screen flex items-center justify-center bg-off-white px-4">
      <div className="w-full max-w-sm text-center">
        <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-teal/10 mb-6">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} className="text-teal">
            <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
          </svg>
        </div>

        <p className="text-xs font-semibold text-teal uppercase tracking-[0.18em] mb-3">Almost there</p>
        <h1 className="text-2xl font-bold text-navy mb-3">Check your inbox</h1>
        <p className="text-brand-slate text-sm leading-relaxed mb-2">
          We&apos;ve sent a confirmation link to
        </p>
        <p className="font-semibold text-navy text-sm mb-6">{email}</p>
        <p className="text-brand-slate text-sm leading-relaxed mb-8">
          Click the link in the email to activate your account. Check your spam folder if you don&apos;t see it within a few minutes.
        </p>

        <Link
          href="/auth/login"
          className="inline-flex items-center gap-2 rounded-full border-2 border-teal/30 px-6 py-2.5 text-sm font-semibold text-teal transition-[border-color,background-color] duration-300 hover:border-teal hover:bg-teal/5"
        >
          Go to sign in
        </Link>
      </div>
    </div>
  )
}

export default function ConfirmPage() {
  return (
    <Suspense>
      <ConfirmContent />
    </Suspense>
  )
}
