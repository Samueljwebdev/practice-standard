import { createClient, createServiceClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import { PostJobForm } from "./PostJobForm"

export const metadata = { title: "Admin — The Practice Standard" }
export const dynamic = "force-dynamic"

const ADMIN_EMAIL = process.env.ADMIN_EMAIL ?? "samueljfx@gmail.com"

function fmt(d?: string | null) { return d ? new Date(d).toLocaleDateString("en-GB") : "—" }

function Stat({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-xl border-2 border-border bg-white px-4 py-3">
      <div className="text-2xl font-black text-navy">{value}</div>
      <div className="text-xs text-brand-slate">{label}</div>
    </div>
  )
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mb-10">
      <h2 className="text-sm font-black text-navy uppercase tracking-wide mb-3">{title}</h2>
      {children}
    </section>
  )
}

function Table({ headers, rows }: { headers: string[]; rows: (string | number)[][] }) {
  return (
    <div className="overflow-x-auto rounded-xl border-2 border-border bg-white">
      <table className="w-full text-sm">
        <thead>
          <tr className="bg-navy text-off-white">
            {headers.map(h => <th key={h} className="text-left font-semibold px-3 py-2 whitespace-nowrap">{h}</th>)}
          </tr>
        </thead>
        <tbody>
          {rows.length === 0 ? (
            <tr><td colSpan={headers.length} className="px-3 py-6 text-center text-brand-slate">None yet.</td></tr>
          ) : rows.map((r, i) => (
            <tr key={i} className="border-t border-border">
              {r.map((c, j) => <td key={j} className="px-3 py-2 text-navy whitespace-nowrap">{c}</td>)}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default async function AdminPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect("/auth/login")
  if ((user.email ?? "").toLowerCase() !== ADMIN_EMAIL.toLowerCase()) redirect("/")

  // Admin verified — service role to read everything across RLS.
  const admin = createServiceClient()
  const [practicesRes, candidatesRes, jobsRes, usersRes] = await Promise.all([
    admin.from("practices").select("*").order("created_at", { ascending: false }),
    admin.from("candidates").select("*").order("created_at", { ascending: false }),
    admin.from("jobs").select("id, title, status, payment_status, region, created_at").order("created_at", { ascending: false }).limit(50),
    admin.auth.admin.listUsers({ perPage: 1000 }),
  ])

  const practices = practicesRes.data ?? []
  const candidates = candidatesRes.data ?? []
  const jobs = jobsRes.data ?? []
  const emailById = new Map((usersRes.data?.users ?? []).map(u => [u.id, u.email ?? ""]))

  return (
    <div className="min-h-screen bg-off-white px-4 py-12">
      <div className="max-w-5xl mx-auto">
        <p className="text-xs font-semibold text-teal uppercase tracking-[0.18em] mb-2">Admin</p>
        <h1 className="text-2xl font-black text-navy mb-8">Control room</h1>

        <div className="grid grid-cols-3 gap-3 mb-10">
          <Stat label="Businesses" value={practices.length} />
          <Stat label="Professionals" value={candidates.length} />
          <Stat label="Jobs (recent)" value={jobs.length} />
        </div>

        <Section title="Post a job">
          <PostJobForm practices={practices.map(p => ({ id: p.id, name: p.name }))} />
        </Section>

        <Section title={`Businesses (${practices.length})`}>
          <Table
            headers={["Name", "Type", "City", "Subscription", "Email", "Joined"]}
            rows={practices.map(p => [p.name, p.practice_type ?? "—", p.city ?? "—", p.subscription_status ?? "—", emailById.get(p.user_id) ?? "—", fmt(p.created_at)])}
          />
        </Section>

        <Section title={`Professionals (${candidates.length})`}>
          <Table
            headers={["Name", "Profession", "Reg no.", "Region", "Available", "Email", "Joined"]}
            rows={candidates.map(c => [c.full_name, c.profession || "—", c.registration_number ?? "—", c.region ?? "—", c.available ? "Yes" : "No", emailById.get(c.user_id) ?? "—", fmt(c.created_at)])}
          />
        </Section>
      </div>
    </div>
  )
}
