"use client"
import { track } from "@/lib/analytics"
import { Button } from "@/components/ui/button"

interface Props {
  jobId: string
  candidateId: string
  profession: string
}

export function ApplyButton({ jobId, candidateId, profession }: Props) {
  function handleSubmit() {
    track("application_submitted", { job_id: jobId, profession })
  }

  return (
    <form action="/api/jobs/apply" method="POST" onSubmit={handleSubmit}>
      <input type="hidden" name="jobId" value={jobId} />
      <input type="hidden" name="candidateId" value={candidateId} />
      <Button type="submit" className="w-full rounded-full bg-teal hover:bg-teal/90 text-off-white">Apply for this role</Button>
    </form>
  )
}
