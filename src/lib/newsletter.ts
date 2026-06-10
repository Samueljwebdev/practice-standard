import { Resend } from "resend"

const resend = new Resend(process.env.RESEND_API_KEY)
const AUDIENCE_ID = process.env.RESEND_AUDIENCE_ID
const FROM = process.env.RESEND_FROM_EMAIL ?? "hello@thepracticestandard.co.uk"

/**
 * Add a subscriber to the Resend Audience that powers The Standard.
 * No-op (returns {skipped}) until RESEND_AUDIENCE_ID is configured, so the
 * signup form works end-to-end before the audience exists.
 */
export async function addNewsletterContact(email: string, firstName?: string) {
  if (!AUDIENCE_ID) return { skipped: true as const }
  await resend.contacts.create({ email, firstName, unsubscribed: false, audienceId: AUDIENCE_ID })
  return { ok: true as const }
}

/** Single confirmation email sent right after signup. */
export async function sendNewsletterWelcome(email: string) {
  await resend.emails.send({
    from: `The Standard <${FROM}>`,
    to: email,
    subject: "You're in — The Standard",
    html: `<!DOCTYPE html><html><body style="font-family:-apple-system,'Segoe UI',sans-serif;background:#F2F4F3;padding:40px 16px;margin:0">
<div style="max-width:560px;margin:0 auto;background:#fff;border:1px solid #E5E7EB;border-radius:12px;padding:40px">
  <div style="font-size:15px;font-weight:700;color:#0F3D3E;margin-bottom:24px">The Standard</div>
  <p style="font-size:15px;line-height:1.6;color:#374151;margin:0 0 16px">You're subscribed. Every Tuesday you'll get a five-minute brief on what's actually moving in private-practice hiring — regulation, workforce data, and the odd number worth knowing. No fluff.</p>
  <p style="font-size:15px;line-height:1.6;color:#374151;margin:0">First issue lands soon. — Sam, The Practice Standard</p>
</div></body></html>`,
  })
}
