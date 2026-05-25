import Link from "next/link"

export function Footer() {
  return (
    <footer className="bg-navy text-white/70">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid md:grid-cols-3 gap-8 mb-10">
          <div>
            <div className="flex flex-col leading-none mb-3">
              <span className="text-[9px] font-bold text-white/40 tracking-[0.2em] uppercase">The</span>
              <span className="text-[14px] font-bold text-white tracking-[0.05em] uppercase">Practice Standard</span>
            </div>
            <p className="text-sm text-white/50 max-w-xs leading-relaxed">
              Where better practices hire. The UK&apos;s professional job board for practice-based healthcare.
            </p>
          </div>

          <div>
            <p className="text-xs font-semibold text-white/40 uppercase tracking-widest mb-4">For Candidates</p>
            <nav className="flex flex-col gap-2.5 text-sm">
              <Link href="/jobs" className="hover:text-white transition-colors">Browse Jobs</Link>
              <Link href="/auth/register" className="hover:text-white transition-colors">Create Account</Link>
              <Link href="/candidate/dashboard" className="hover:text-white transition-colors">My Applications</Link>
            </nav>
          </div>

          <div>
            <p className="text-xs font-semibold text-white/40 uppercase tracking-widest mb-4">For Practices</p>
            <nav className="flex flex-col gap-2.5 text-sm">
              <Link href="/pricing" className="hover:text-white transition-colors">Pricing</Link>
              <Link href="/auth/register" className="hover:text-white transition-colors">Post a Job</Link>
              <Link href="/practice/dashboard" className="hover:text-white transition-colors">Dashboard</Link>
              <Link href="/salary-benchmark" className="hover:text-white transition-colors">Salary Benchmark</Link>
              <Link href="/alternatives" className="hover:text-white transition-colors">Compare Alternatives</Link>
              <Link href="/about" className="hover:text-white transition-colors">About</Link>
            </nav>
          </div>
        </div>

        <div className="border-t border-white/10 pt-6 flex flex-col md:flex-row justify-between items-center gap-3">
          <p className="text-xs text-white/30">
            © {new Date().getFullYear()} The Practice Standard. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <Link href="/terms" className="text-xs text-white/30 hover:text-white/60 transition-colors">Terms</Link>
            <Link href="/privacy" className="text-xs text-white/30 hover:text-white/60 transition-colors">Privacy</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
