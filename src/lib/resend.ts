import { Resend } from "resend"

function getResend() {
  return new Resend(process.env.RESEND_API_KEY)
}

export async function sendApplicationNotification({
  practiceEmail,
  practiceName,
  jobTitle,
  candidateName,
  jobSlug,
}: {
  practiceEmail: string
  practiceName: string
  jobTitle: string
  candidateName: string
  jobSlug: string
}) {
  const resend = getResend()
  await resend.emails.send({
    from: process.env.RESEND_FROM_EMAIL!,
    to: practiceEmail,
    subject: `New application for ${jobTitle}`,
    html: `
      <p>Hi ${practiceName},</p>
      <p><strong>${candidateName}</strong> has applied for your role: <strong>${jobTitle}</strong>.</p>
      <p><a href="${process.env.NEXT_PUBLIC_BASE_URL}/practice/dashboard">View application in dashboard →</a></p>
      <p>— The Practice Standard</p>
    `,
  })
}
