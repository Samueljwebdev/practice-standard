import Link from "next/link"
import { createClient } from "@/lib/supabase/server"
import { PROFESSIONS } from "@/lib/constants"

export default async function HomePage() {
  const supabase = await createClient()
  const { count } = await supabase
    .from("jobs")
    .select("*", { count: "exact", head: true })
    .eq("status", "active")
    .eq("payment_status", "paid")

  return (
    <div className="max-w-5xl mx-auto px-4">
      <section className="py-20 text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4 leading-tight">
          The UK&apos;s professional job board<br />for practice-based healthcare
        </h1>
        <p className="text-xl text-slate-500 mb-8 max-w-2xl mx-auto">
          Dental, veterinary, optician, aesthetic, physio and GP roles — in one place, built for professionals.
        </p>
        <div className="flex flex-wrap gap-4 justify-center">
          <Link href="/jobs" className="bg-slate-900 text-white px-6 py-3 rounded-md font-medium hover:bg-slate-700 transition-colors">
            Browse {count ?? 0} open roles
          </Link>
          <Link href="/auth/register" className="border border-slate-300 text-slate-700 px-6 py-3 rounded-md font-medium hover:bg-slate-50 transition-colors">
            Post a job — from £149
          </Link>
        </div>
      </section>

      <section className="py-12 border-t">
        <h2 className="text-lg font-semibold text-slate-900 mb-6 text-center">Roles we cover</h2>
        <div className="flex flex-wrap gap-2 justify-center">
          {PROFESSIONS.map(p => (
            <Link
              key={p.value}
              href={`/jobs?profession=${p.value}`}
              className="px-3 py-1.5 text-sm bg-white border rounded-full text-slate-700 hover:border-slate-900 transition-colors"
            >
              {p.label}
            </Link>
          ))}
        </div>
      </section>

      <section className="py-12 border-t grid md:grid-cols-2 gap-12 items-center">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 mb-3">For practices</h2>
          <p className="text-slate-600 mb-6">Reach verified, registered professionals across every practice discipline. Post a role in minutes and start receiving applications the same day.</p>
          <Link href="/pricing" className="bg-slate-900 text-white px-5 py-2.5 rounded-md text-sm font-medium hover:bg-slate-700 transition-colors">
            See pricing
          </Link>
        </div>
        <div className="space-y-3 text-sm text-slate-700">
          <div className="flex gap-3"><span>✓</span><span>Listings visible to thousands of registered professionals</span></div>
          <div className="flex gap-3"><span>✓</span><span>Professions include dental, vet, optician, aesthetics, physio and GP</span></div>
          <div className="flex gap-3"><span>✓</span><span>Applications managed in your dashboard</span></div>
          <div className="flex gap-3"><span>✓</span><span>Unlimited listings with Practice Pro subscription</span></div>
        </div>
      </section>

      <section className="py-12 border-t grid md:grid-cols-2 gap-12 items-center">
        <div className="space-y-3 text-sm text-slate-700 order-2 md:order-1">
          <div className="flex gap-3"><span>✓</span><span>Always free to search and apply</span></div>
          <div className="flex gap-3"><span>✓</span><span>Roles from practices who meet The Practice Standard</span></div>
          <div className="flex gap-3"><span>✓</span><span>Track every application in one dashboard</span></div>
        </div>
        <div className="order-1 md:order-2">
          <h2 className="text-2xl font-bold text-slate-900 mb-3">For professionals</h2>
          <p className="text-slate-600 mb-6">Finding your next role should be straightforward. Browse positions, apply in seconds, and track your applications — always free.</p>
          <Link href="/auth/register" className="border border-slate-300 text-slate-700 px-5 py-2.5 rounded-md text-sm font-medium hover:bg-slate-50 transition-colors">
            Create free account
          </Link>
        </div>
      </section>
    </div>
  )
}
