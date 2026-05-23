import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import Link from "next/link"

export default async function PracticeDashboard() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect("/auth/login")

  const { data: practice } = await supabase
    .from("practices")
    .select("*")
    .eq("user_id", user.id)
    .single()

  if (!practice) redirect("/auth/register")

  const { data: jobs } = await supabase
    .from("jobs")
    .select("id, title, city, region, status, payment_status, created_at, applications(count)")
    .eq("practice_id", practice.id)
    .order("created_at", { ascending: false })

  return (
    <div className="max-w-4xl mx-auto px-4 py-10 space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">{practice.name}</h1>
          <p className="text-slate-500 text-sm">Practice dashboard</p>
        </div>
        <Link href="/practice/post">
          <button className="bg-slate-900 text-white text-sm px-4 py-2 rounded-md hover:bg-slate-700 transition-colors">+ Post a job</button>
        </Link>
      </div>

      {practice.subscription_status !== "active" && (
        <Card className="border-amber-200 bg-amber-50">
          <CardContent className="py-4 flex items-center justify-between">
            <div>
              <p className="font-medium text-amber-900">Unlimited listings for £249/month</p>
              <p className="text-sm text-amber-700">Subscribe and never pay per listing again.</p>
            </div>
            <Link href="/api/stripe/checkout?mode=subscription">
              <button className="bg-amber-600 text-white text-sm px-4 py-2 rounded-md hover:bg-amber-700 transition-colors">Subscribe</button>
            </Link>
          </CardContent>
        </Card>
      )}

      <div>
        <h2 className="font-semibold text-slate-900 mb-4">Your listings</h2>
        {!jobs?.length ? (
          <Card>
            <CardContent className="py-10 text-center text-slate-500">
              No jobs posted yet.{" "}
              <Link href="/practice/post" className="underline">Post your first role →</Link>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-3">
            {jobs.map((job: any) => (
              <Card key={job.id}>
                <CardContent className="py-4 flex items-center justify-between gap-4">
                  <div className="min-w-0">
                    <p className="font-medium text-slate-900 truncate">{job.title}</p>
                    <p className="text-sm text-slate-500">{job.city ?? job.region} · Posted {new Date(job.created_at).toLocaleDateString("en-GB")}</p>
                  </div>
                  <div className="flex items-center gap-3 shrink-0">
                    <span className="text-sm text-slate-600">
                      {(job.applications as any)?.[0]?.count ?? 0} applicants
                    </span>
                    <Badge variant={job.status === "active" ? "default" : "secondary"}>
                      {job.payment_status === "unpaid" ? "Unpaid" : job.status}
                    </Badge>
                    {job.payment_status === "unpaid" && (
                      <Link href={`/api/stripe/checkout?jobId=${job.id}`}>
                        <button className="border border-slate-300 text-sm px-3 py-1.5 rounded-md hover:bg-slate-50 transition-colors">Pay £149</button>
                      </Link>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>

      <div>
        <Link href="/api/stripe/portal" className="text-sm text-slate-500 underline">Manage billing</Link>
      </div>
    </div>
  )
}
