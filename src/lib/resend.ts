import { Resend } from "resend"

function getResend() {
  return new Resend(process.env.RESEND_API_KEY)
}

const FROM = process.env.RESEND_FROM_EMAIL ?? "hello@thepracticestandard.co.uk"
const BASE = process.env.NEXT_PUBLIC_BASE_URL ?? "https://thepracticestandard.co.uk"

// ─── Shared layout ────────────────────────────────────────────────────────────

function html(body: string) {
  return `<!DOCTYPE html><html><head><meta charset="utf-8">
<style>
  body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; background: #F2F4F3; margin: 0; padding: 40px 16px; }
  .wrap { max-width: 560px; margin: 0 auto; background: #fff; border-radius: 12px; border: 1px solid #E5E7EB; padding: 40px; }
  .logo { font-size: 15px; font-weight: 700; color: #0F3D3E; letter-spacing: -0.02em; margin-bottom: 32px; }
  p { font-size: 15px; line-height: 1.6; color: #374151; margin: 0 0 16px; }
  .btn { display: inline-block; background: #0F3D3E; color: #F2F4F3 !important; padding: 12px 24px; border-radius: 100px; font-size: 14px; font-weight: 600; text-decoration: none; margin: 8px 0 24px; }
  .divider { border: none; border-top: 1px solid #E5E7EB; margin: 24px 0; }
  .meta { font-size: 13px; color: #9CA3AF; }
</style></head><body>
<div class="wrap">
  <div class="logo">The Practice Standard</div>
  ${body}
  <hr class="divider">
  <p class="meta">The Practice Standard · <a href="${BASE}" style="color:#9CA3AF;">thepracticestandard.co.uk</a></p>
</div>
</body></html>`
}

// ─── Application notifications ────────────────────────────────────────────────

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
    from: FROM,
    to: practiceEmail,
    subject: `New application for ${jobTitle}`,
    html: html(`
      <p>Hi ${practiceName},</p>
      <p><strong>${candidateName}</strong> has applied for your role: <strong>${jobTitle}</strong>.</p>
      <a class="btn" href="${BASE}/practice/dashboard">View application →</a>
      <p>Log in to your dashboard to review their profile and respond.</p>
    `),
  })
}

export async function sendApplicationConfirmation({
  candidateEmail,
  candidateName,
  jobTitle,
  practiceName,
}: {
  candidateEmail: string
  candidateName: string
  jobTitle: string
  practiceName: string
}) {
  const resend = getResend()
  await resend.emails.send({
    from: FROM,
    to: candidateEmail,
    subject: `Application sent — ${jobTitle}`,
    html: html(`
      <p>Hi ${candidateName},</p>
      <p>Your application for <strong>${jobTitle}</strong> at <strong>${practiceName}</strong> has been sent.</p>
      <a class="btn" href="${BASE}/candidate/dashboard">View your applications →</a>
      <p>We'll let the practice know you're interested. Good luck.</p>
    `),
  })
}

// ─── Job published ─────────────────────────────────────────────────────────────

export async function sendJobPublishedConfirmation({
  practiceEmail,
  practiceName,
  jobTitle,
  jobSlug,
  expiresAt,
}: {
  practiceEmail: string
  practiceName: string
  jobTitle: string
  jobSlug: string
  expiresAt: string
}) {
  const resend = getResend()
  const expiry = new Date(expiresAt).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })
  await resend.emails.send({
    from: FROM,
    to: practiceEmail,
    subject: `Your role is live — ${jobTitle}`,
    html: html(`
      <p>Hi ${practiceName},</p>
      <p>Your role <strong>${jobTitle}</strong> is now live on The Practice Standard and visible to registered professionals across the UK.</p>
      <a class="btn" href="${BASE}/jobs/${jobSlug}">View your listing →</a>
      <p>The listing is active until <strong>${expiry}</strong>. You'll receive an email when candidates apply.</p>
      <p>Manage all your listings and applications from your dashboard.</p>
      <a class="btn" href="${BASE}/practice/dashboard">Go to dashboard →</a>
    `),
  })
}

// ─── Subscription activated ───────────────────────────────────────────────────

export async function sendSubscriptionActivated({
  practiceEmail,
  practiceName,
}: {
  practiceEmail: string
  practiceName: string
}) {
  const resend = getResend()
  await resend.emails.send({
    from: FROM,
    to: practiceEmail,
    subject: "Practice Pro is active — post unlimited roles",
    html: html(`
      <p>Hi ${practiceName},</p>
      <p>Your <strong>Practice Pro</strong> subscription is now active. You can post unlimited job listings for £249 + VAT per month — no per-listing fees.</p>
      <a class="btn" href="${BASE}/practice/post">Post your first role →</a>
      <p>Your subscription renews monthly. You can manage or cancel it at any time from your dashboard.</p>
      <a class="btn" href="${BASE}/practice/dashboard">Go to dashboard →</a>
    `),
  })
}

// ─── Welcome emails ───────────────────────────────────────────────────────────

export async function sendPracticeWelcome({
  practiceEmail,
  practiceName,
}: {
  practiceEmail: string
  practiceName: string
}) {
  const resend = getResend()
  await resend.emails.send({
    from: FROM,
    to: practiceEmail,
    subject: `Welcome to The Practice Standard, ${practiceName}`,
    html: html(`
      <p>Hi ${practiceName},</p>
      <p>Welcome to The Practice Standard — the UK's specialist job board for regulated private healthcare practices.</p>
      <p>You're now set up. Post your first role and reach verified professionals across veterinary, optometry, aesthetics, physiotherapy, and private medical disciplines.</p>
      <a class="btn" href="${BASE}/practice/post">Post a role — from £149 →</a>
      <p>Or explore <a href="${BASE}/pricing">Practice Pro</a> if you hire regularly — unlimited listings for £249/month.</p>
    `),
  })
}

export async function sendCandidateWelcome({
  candidateEmail,
  candidateName,
}: {
  candidateEmail: string
  candidateName: string
}) {
  const resend = getResend()
  await resend.emails.send({
    from: FROM,
    to: candidateEmail,
    subject: `Welcome to The Practice Standard`,
    html: html(`
      <p>Hi ${candidateName},</p>
      <p>Welcome to The Practice Standard. You now have free access to private practice roles across the UK — veterinary, optometry, aesthetics, physiotherapy, private GP, and more.</p>
      <a class="btn" href="${BASE}/jobs">Browse open roles →</a>
      <p>Complete your profile so practices can see your details when you apply.</p>
      <a class="btn" href="${BASE}/candidate/profile">Complete your profile →</a>
    `),
  })
}

// ─── Job expiry reminder ──────────────────────────────────────────────────────

export async function sendJobExpiryReminder({
  practiceEmail,
  practiceName,
  jobTitle,
  jobSlug,
  daysRemaining,
}: {
  practiceEmail: string
  practiceName: string
  jobTitle: string
  jobSlug: string
  daysRemaining: number
}) {
  const resend = getResend()
  await resend.emails.send({
    from: FROM,
    to: practiceEmail,
    subject: `Your listing expires in ${daysRemaining} days — ${jobTitle}`,
    html: html(`
      <p>Hi ${practiceName},</p>
      <p>Your listing <strong>${jobTitle}</strong> expires in <strong>${daysRemaining} days</strong>.</p>
      <p>If you haven't filled the role yet, renew it to keep reaching registered professionals.</p>
      <a class="btn" href="${BASE}/practice/dashboard">Renew listing →</a>
    `),
  })
}
