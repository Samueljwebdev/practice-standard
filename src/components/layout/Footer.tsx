import Link from "next/link"

export function Footer() {
  return (
    <footer className="border-t bg-white mt-auto">
      <div className="max-w-6xl mx-auto px-4 py-8 flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-sm text-slate-500">
          © {new Date().getFullYear()} The Practice Standard. The UK&apos;s professional job board for practice-based healthcare.
        </p>
        <nav className="flex gap-6 text-sm text-slate-500">
          <Link href="/jobs" className="hover:text-slate-900">Jobs</Link>
          <Link href="/pricing" className="hover:text-slate-900">Pricing</Link>
          <Link href="/auth/register" className="hover:text-slate-900">Post a Job</Link>
        </nav>
      </div>
    </footer>
  )
}
