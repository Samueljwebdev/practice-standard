import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import Link from "next/link"

const STATUS_LABELS: Record<string, string> = {
  pending: "Pending review",
  viewed: "Viewed",
  shortlisted: "Shortlisted",
  rejected: "Not progressing",
}

const STATUS_VARIANTS: Record<string, "default" | "secondary" | "outline"> = {
  pending: "secondary",
  viewed: "secondary",
  shortlisted: "default",
  rejected: "outline",
}

export default async function CandidateDashboard() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect("/auth/login")

  const { data: candidate } = await supabase
    .from("candidates")
    .select("*")
    .eq("user_id", user.id)
    .single()

  if (!candidate) redirect("/candidate/profile")

  const { data: applications } = await supabase
    .from("applications")
    .select("id, status, created_at, jobs(title, slug, city, region, practices(name))")
    .eq("candidate_id", candidate.id)
    .order("created_at", { ascending: false })

  return (
    <div className="max-w-3xl mx-auto px-4 py-10 space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">My Applications</h1>
          <p className="text-slate-500 text-sm">{candidate.full_name} · {candidate.profession}</p>
        </div>
        <Link href="/candidate/profile" className="border border-slate-300 text-sm px-3 py-2 rounded-md hover:bg-slate-50 transition-colors">
          Edit profile
        </Link>
      </div>

      {!applications?.length ? (
        <Card>
          <CardContent className="py-10 text-center text-slate-500">
            No applications yet.{" "}
            <Link href="/jobs" className="underline">Browse jobs →</Link>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-3">
          {applications.map((app: any) => (
            <Card key={app.id}>
              <CardContent className="py-4 flex items-center justify-between gap-4">
                <div className="min-w-0">
                  <Link href={`/jobs/${app.jobs?.slug}`} className="font-medium text-slate-900 hover:underline">
                    {app.jobs?.title}
                  </Link>
                  <p className="text-sm text-slate-500">
                    {app.jobs?.practices?.name} · {app.jobs?.city ?? app.jobs?.region}
                  </p>
                  <p className="text-xs text-slate-400 mt-1">Applied {new Date(app.created_at).toLocaleDateString("en-GB")}</p>
                </div>
                <Badge variant={STATUS_VARIANTS[app.status] ?? "secondary"}>
                  {STATUS_LABELS[app.status] ?? app.status}
                </Badge>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      <Link href="/jobs" className="inline-block bg-slate-900 text-white text-sm px-4 py-2 rounded-md hover:bg-slate-700 transition-colors">
        Browse more jobs
      </Link>
    </div>
  )
}
