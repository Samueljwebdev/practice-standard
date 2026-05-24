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

// ─── Salary benchmark delivery ───────────────────────────────────────────────

export async function sendSalaryBenchmark({
  email,
  name,
}: {
  email: string
  name: string
}) {
  const resend = getResend()
  await resend.emails.send({
    from: FROM,
    to: email,
    subject: "UK Private Practice Salary Benchmark 2026",
    html: html(`
      <p>Hi ${name},</p>
      <p>Here's your copy of the <strong>UK Private Practice Salary Benchmark 2026</strong> — salary ranges across five disciplines, compiled from job listings, industry data, and regulatory body workforce reports.</p>

      <hr class="divider">

      <p style="font-size:13px;font-weight:700;color:#0D1B2A;text-transform:uppercase;letter-spacing:0.1em;margin-bottom:8px;">🔬 Aesthetics</p>
      <table style="width:100%;border-collapse:collapse;font-size:13px;margin-bottom:20px;">
        <tr style="background:#F2F4F3;"><td style="padding:8px 10px;font-weight:600;color:#0D1B2A;">Role</td><td style="padding:8px 10px;font-weight:600;color:#0D1B2A;">Salary range (£/yr)</td></tr>
        <tr><td style="padding:8px 10px;border-bottom:1px solid #E5E7EB;">Aesthetic Nurse Prescriber</td><td style="padding:8px 10px;border-bottom:1px solid #E5E7EB;">£38,000–£58,000</td></tr>
        <tr style="background:#F9FAFB;"><td style="padding:8px 10px;border-bottom:1px solid #E5E7EB;">Aesthetic Doctor (GP/Derm background)</td><td style="padding:8px 10px;border-bottom:1px solid #E5E7EB;">£70,000–£130,000</td></tr>
        <tr><td style="padding:8px 10px;border-bottom:1px solid #E5E7EB;">Skin Therapist / Beauty Therapist</td><td style="padding:8px 10px;border-bottom:1px solid #E5E7EB;">£22,000–£32,000</td></tr>
        <tr style="background:#F9FAFB;"><td style="padding:8px 10px;border-bottom:1px solid #E5E7EB;">Clinic Manager</td><td style="padding:8px 10px;border-bottom:1px solid #E5E7EB;">£28,000–£42,000</td></tr>
        <tr><td style="padding:8px 10px;">Treatment Coordinator</td><td style="padding:8px 10px;">£24,000–£34,000</td></tr>
      </table>
      <p style="font-size:12px;color:#6B7A80;margin-top:-12px;margin-bottom:20px;">Note: Commission structures are common in aesthetics. Many nurse prescribers earn 30–50% above base via performance pay.</p>

      <p style="font-size:13px;font-weight:700;color:#0D1B2A;text-transform:uppercase;letter-spacing:0.1em;margin-bottom:8px;">🐾 Veterinary</p>
      <table style="width:100%;border-collapse:collapse;font-size:13px;margin-bottom:20px;">
        <tr style="background:#F2F4F3;"><td style="padding:8px 10px;font-weight:600;color:#0D1B2A;">Role</td><td style="padding:8px 10px;font-weight:600;color:#0D1B2A;">Salary range (£/yr)</td></tr>
        <tr><td style="padding:8px 10px;border-bottom:1px solid #E5E7EB;">Newly Qualified Vet (0–3 yrs)</td><td style="padding:8px 10px;border-bottom:1px solid #E5E7EB;">£33,000–£40,000</td></tr>
        <tr style="background:#F9FAFB;"><td style="padding:8px 10px;border-bottom:1px solid #E5E7EB;">Experienced Vet (3+ yrs)</td><td style="padding:8px 10px;border-bottom:1px solid #E5E7EB;">£42,000–£65,000</td></tr>
        <tr><td style="padding:8px 10px;border-bottom:1px solid #E5E7EB;">Certificate / Specialist Vet</td><td style="padding:8px 10px;border-bottom:1px solid #E5E7EB;">£60,000–£105,000+</td></tr>
        <tr style="background:#F9FAFB;"><td style="padding:8px 10px;border-bottom:1px solid #E5E7EB;">Registered Veterinary Nurse (RVN)</td><td style="padding:8px 10px;border-bottom:1px solid #E5E7EB;">£22,000–£32,000</td></tr>
        <tr><td style="padding:8px 10px;border-bottom:1px solid #E5E7EB;">Senior / Head Nurse</td><td style="padding:8px 10px;border-bottom:1px solid #E5E7EB;">£28,000–£38,000</td></tr>
        <tr style="background:#F9FAFB;"><td style="padding:8px 10px;">Practice Manager</td><td style="padding:8px 10px;">£32,000–£50,000</td></tr>
      </table>
      <p style="font-size:12px;color:#6B7A80;margin-top:-12px;margin-bottom:20px;">Note: EU-registered vet numbers dropped 68% post-Brexit. Candidates with RCVS registration can negotiate at the higher end of these ranges in most markets.</p>

      <p style="font-size:13px;font-weight:700;color:#0D1B2A;text-transform:uppercase;letter-spacing:0.1em;margin-bottom:8px;">👁️ Optometry</p>
      <table style="width:100%;border-collapse:collapse;font-size:13px;margin-bottom:20px;">
        <tr style="background:#F2F4F3;"><td style="padding:8px 10px;font-weight:600;color:#0D1B2A;">Role</td><td style="padding:8px 10px;font-weight:600;color:#0D1B2A;">Salary range (£/yr)</td></tr>
        <tr><td style="padding:8px 10px;border-bottom:1px solid #E5E7EB;">Newly Qualified Optometrist</td><td style="padding:8px 10px;border-bottom:1px solid #E5E7EB;">£36,000–£44,000</td></tr>
        <tr style="background:#F9FAFB;"><td style="padding:8px 10px;border-bottom:1px solid #E5E7EB;">Experienced Optometrist (3+ yrs)</td><td style="padding:8px 10px;border-bottom:1px solid #E5E7EB;">£44,000–£58,000</td></tr>
        <tr><td style="padding:8px 10px;border-bottom:1px solid #E5E7EB;">IP Optometrist</td><td style="padding:8px 10px;border-bottom:1px solid #E5E7EB;">£52,000–£68,000</td></tr>
        <tr style="background:#F9FAFB;"><td style="padding:8px 10px;border-bottom:1px solid #E5E7EB;">Dispensing Optician</td><td style="padding:8px 10px;border-bottom:1px solid #E5E7EB;">£24,000–£34,000</td></tr>
        <tr><td style="padding:8px 10px;">Practice Manager</td><td style="padding:8px 10px;">£30,000–£45,000</td></tr>
      </table>
      <p style="font-size:12px;color:#6B7A80;margin-top:-12px;margin-bottom:20px;">Note: The College of Optometrists projects a shortage of ~2,000 practitioners by 2030. Independent practices now competing with multiples for a shrinking pool — competitive salary is increasingly non-negotiable.</p>

      <p style="font-size:13px;font-weight:700;color:#0D1B2A;text-transform:uppercase;letter-spacing:0.1em;margin-bottom:8px;">🦴 Physiotherapy &amp; Allied Health</p>
      <table style="width:100%;border-collapse:collapse;font-size:13px;margin-bottom:20px;">
        <tr style="background:#F2F4F3;"><td style="padding:8px 10px;font-weight:600;color:#0D1B2A;">Role</td><td style="padding:8px 10px;font-weight:600;color:#0D1B2A;">Salary range (£/yr)</td></tr>
        <tr><td style="padding:8px 10px;border-bottom:1px solid #E5E7EB;">Newly Qualified Physiotherapist</td><td style="padding:8px 10px;border-bottom:1px solid #E5E7EB;">£28,000–£35,000</td></tr>
        <tr style="background:#F9FAFB;"><td style="padding:8px 10px;border-bottom:1px solid #E5E7EB;">MSK Physiotherapist (2+ yrs)</td><td style="padding:8px 10px;border-bottom:1px solid #E5E7EB;">£35,000–£50,000</td></tr>
        <tr><td style="padding:8px 10px;border-bottom:1px solid #E5E7EB;">Specialist Physio (sports / neuro)</td><td style="padding:8px 10px;border-bottom:1px solid #E5E7EB;">£42,000–£62,000</td></tr>
        <tr style="background:#F9FAFB;"><td style="padding:8px 10px;border-bottom:1px solid #E5E7EB;">Clinical Director / Principal</td><td style="padding:8px 10px;border-bottom:1px solid #E5E7EB;">£55,000–£80,000</td></tr>
        <tr><td style="padding:8px 10px;">Podiatrist / Occupational Therapist</td><td style="padding:8px 10px;">£28,000–£48,000</td></tr>
      </table>

      <p style="font-size:13px;font-weight:700;color:#0D1B2A;text-transform:uppercase;letter-spacing:0.1em;margin-bottom:8px;">🩺 Private Medical / GP</p>
      <table style="width:100%;border-collapse:collapse;font-size:13px;margin-bottom:20px;">
        <tr style="background:#F2F4F3;"><td style="padding:8px 10px;font-weight:600;color:#0D1B2A;">Role</td><td style="padding:8px 10px;font-weight:600;color:#0D1B2A;">Salary range (£/yr)</td></tr>
        <tr><td style="padding:8px 10px;border-bottom:1px solid #E5E7EB;">Salaried Private GP</td><td style="padding:8px 10px;border-bottom:1px solid #E5E7EB;">£85,000–£140,000</td></tr>
        <tr style="background:#F9FAFB;"><td style="padding:8px 10px;border-bottom:1px solid #E5E7EB;">Advanced Nurse Practitioner</td><td style="padding:8px 10px;border-bottom:1px solid #E5E7EB;">£46,000–£65,000</td></tr>
        <tr><td style="padding:8px 10px;border-bottom:1px solid #E5E7EB;">Practice Nurse</td><td style="padding:8px 10px;border-bottom:1px solid #E5E7EB;">£32,000–£48,000</td></tr>
        <tr style="background:#F9FAFB;"><td style="padding:8px 10px;border-bottom:1px solid #E5E7EB;">Healthcare Assistant</td><td style="padding:8px 10px;border-bottom:1px solid #E5E7EB;">£22,000–£28,000</td></tr>
        <tr><td style="padding:8px 10px;">Practice Manager</td><td style="padding:8px 10px;">£38,000–£58,000</td></tr>
      </table>

      <hr class="divider">

      <p style="font-size:13px;font-weight:700;color:#0D1B2A;margin-bottom:8px;">Regional adjustments</p>
      <p style="font-size:13px;color:#374151;">These figures reflect typical mid-market rates across England. Apply the following adjustments:</p>
      <table style="width:100%;border-collapse:collapse;font-size:13px;margin-bottom:20px;">
        <tr style="background:#F2F4F3;"><td style="padding:8px 10px;font-weight:600;color:#0D1B2A;">Region</td><td style="padding:8px 10px;font-weight:600;color:#0D1B2A;">Adjustment</td></tr>
        <tr><td style="padding:8px 10px;border-bottom:1px solid #E5E7EB;">London</td><td style="padding:8px 10px;border-bottom:1px solid #E5E7EB;">+15–25%</td></tr>
        <tr style="background:#F9FAFB;"><td style="padding:8px 10px;border-bottom:1px solid #E5E7EB;">South East (excl. London)</td><td style="padding:8px 10px;border-bottom:1px solid #E5E7EB;">+8–15%</td></tr>
        <tr><td style="padding:8px 10px;border-bottom:1px solid #E5E7EB;">Midlands / East of England</td><td style="padding:8px 10px;border-bottom:1px solid #E5E7EB;">Benchmark rate</td></tr>
        <tr style="background:#F9FAFB;"><td style="padding:8px 10px;border-bottom:1px solid #E5E7EB;">Northern England</td><td style="padding:8px 10px;border-bottom:1px solid #E5E7EB;">–5–10%</td></tr>
        <tr><td style="padding:8px 10px;">Scotland / Wales / NI</td><td style="padding:8px 10px;">–5–10%</td></tr>
      </table>

      <hr class="divider">

      <p style="font-size:13px;font-weight:700;color:#0D1B2A;margin-bottom:8px;">Beyond salary: what candidates ask about</p>
      <p style="font-size:13px;color:#374151;">Salary is rarely the only factor. Candidates consistently raise these in private practice job searches:</p>
      <ul style="font-size:13px;color:#374151;padding-left:20px;line-height:1.8;margin-bottom:16px;">
        <li><strong>CPD budget</strong> — £500–£2,000/yr is the expected range; anything below £500 is a red flag</li>
        <li><strong>Indemnity cover</strong> — confirm who covers it; candidates in aesthetics and medical roles ask this first</li>
        <li><strong>Clinical supervision</strong> — especially important for newly qualified staff</li>
        <li><strong>Equipment and facilities</strong> — candidates want to know the clinic is properly equipped</li>
        <li><strong>Practice culture</strong> — NHS-to-private switchers prioritise autonomy and team size</li>
      </ul>

      <p>Ready to find your next hire? Post your role on The Practice Standard and reach registered professionals across the UK — without agency fees.</p>
      <a class="btn" href="${BASE}/practice/post">Post a role — from £149 →</a>
      <p style="font-size:13px;color:#6B7A80;">Questions? Reply to this email or reach us at hello@thepracticestandard.co.uk</p>
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
