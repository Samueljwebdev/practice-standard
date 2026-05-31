import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Privacy Policy | The Practice Standard",
  description: "How The Practice Standard collects, uses, and protects your personal data.",
}

export default function PrivacyPage() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-16">
      <div className="mb-10">
        <p className="text-xs font-semibold text-teal uppercase tracking-[0.18em] mb-3">Legal</p>
        <h1 className="text-3xl font-bold text-navy mb-2">Privacy Policy</h1>
        <p className="text-sm text-brand-slate">Last updated: 31 May 2026</p>
      </div>

      <div className="space-y-8 text-[15px] leading-relaxed text-navy/80">

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-navy">1. Who We Are</h2>
          <p>The Practice Standard operates thepracticestandard.co.uk. We are the data controller for personal data collected through this website. If you have any questions about how we handle your data, contact us at <a href="mailto:hello@thepracticestandard.co.uk" className="text-teal hover:underline">hello@thepracticestandard.co.uk</a>.</p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-navy">2. Data We Collect</h2>
          <p><strong className="text-navy font-semibold">All users:</strong> email address, account type, and usage data (pages visited, actions taken).</p>
          <p><strong className="text-navy font-semibold">Candidates:</strong> full name, profession, professional registration / PIN number (optional), location, years of experience, bio, and CV (optional). Where you ask us to verify your registration, we also store the verification result — the regulator, the status (for example, verified or pending review), and the name and registrant type returned by that regulator&rsquo;s public register.</p>
          <p><strong className="text-navy font-semibold">Practices:</strong> practice name, type, address, website, phone number, and billing information (processed by Stripe — we do not store card details).</p>
          <p><strong className="text-navy font-semibold">Applications:</strong> cover letters and any information you include when applying for a role.</p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-navy">3. How We Use Your Data</h2>
          <ul className="list-disc pl-5 space-y-1.5 text-navy/75">
            <li><strong className="text-navy font-medium">To provide the service</strong> — creating accounts, posting jobs, submitting applications, processing payments.</li>
            <li><strong className="text-navy font-medium">To communicate with you</strong> — application notifications, account updates, and (with your consent) relevant job alerts.</li>
            <li><strong className="text-navy font-medium">To verify professional registration</strong> — checking a registration number you provide against the relevant regulator&rsquo;s public register, to confirm genuine professionals and help prevent fraudulent applications.</li>
            <li><strong className="text-navy font-medium">To improve the platform</strong> — understanding how the site is used to make it better.</li>
            <li><strong className="text-navy font-medium">To comply with legal obligations</strong> — financial records, fraud prevention.</li>
          </ul>
          <p>Our lawful basis under UK GDPR is <strong className="text-navy font-medium">contract performance</strong> (to provide the service you signed up for) and <strong className="text-navy font-medium">legitimate interests</strong> (improving the platform, verifying registrations, and preventing fraud).</p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-navy">4. Sharing Your Data</h2>
          <p>We share data only where necessary:</p>
          <ul className="list-disc pl-5 space-y-1.5 text-navy/75">
            <li><strong className="text-navy font-medium">With practices</strong> — when you apply for a role, your application, profile information, and verification status are shared with the hiring practice.</li>
            <li><strong className="text-navy font-medium">Professional regulators</strong> — when you request verification, we query the relevant regulator&rsquo;s public register (for example, the General Dental Council). This involves sending your registration number and surname to that regulator&rsquo;s public search service.</li>
            <li><strong className="text-navy font-medium">Stripe</strong> — payment processing. Stripe is PCI-DSS compliant. See <a href="https://stripe.com/gb/privacy" target="_blank" rel="noopener noreferrer" className="text-teal hover:underline">stripe.com/gb/privacy</a>.</li>
            <li><strong className="text-navy font-medium">Supabase</strong> — our database and authentication provider, hosted in the EU.</li>
            <li><strong className="text-navy font-medium">Resend</strong> — transactional email delivery.</li>
          </ul>
          <p>We do not sell your personal data to third parties.</p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-navy">5. Data Retention</h2>
          <p>We retain your data for as long as your account is active. If you delete your account, we will delete your personal data within 30 days, except where we are required to retain it for legal or financial reasons (e.g. billing records, which we keep for 7 years as required by HMRC).</p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-navy">6. Your Rights</h2>
          <p>Under UK GDPR, you have the right to:</p>
          <ul className="list-disc pl-5 space-y-1.5 text-navy/75">
            <li><strong className="text-navy font-medium">Access</strong> — request a copy of the personal data we hold about you.</li>
            <li><strong className="text-navy font-medium">Rectification</strong> — ask us to correct inaccurate data.</li>
            <li><strong className="text-navy font-medium">Erasure</strong> — ask us to delete your data (&ldquo;right to be forgotten&rdquo;).</li>
            <li><strong className="text-navy font-medium">Restriction</strong> — ask us to limit how we use your data.</li>
            <li><strong className="text-navy font-medium">Portability</strong> — receive your data in a portable format.</li>
            <li><strong className="text-navy font-medium">Objection</strong> — object to processing based on legitimate interests.</li>
          </ul>
          <p>To exercise any of these rights, email <a href="mailto:hello@thepracticestandard.co.uk" className="text-teal hover:underline">hello@thepracticestandard.co.uk</a>. We will respond within 30 days.</p>
          <p>You also have the right to lodge a complaint with the <a href="https://ico.org.uk" target="_blank" rel="noopener noreferrer" className="text-teal hover:underline">Information Commissioner&apos;s Office (ICO)</a>.</p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-navy">7. Cookies</h2>
          <p>We use a small number of cookies and similar technologies:</p>
          <ul className="list-disc pl-5 space-y-1.5 text-navy/75">
            <li><strong className="text-navy font-medium">Essential cookies</strong> — authentication session cookies set by Supabase to keep you logged in. These are always active and require no consent.</li>
            <li><strong className="text-navy font-medium">Analytics cookies</strong> — Google Analytics, to understand how the site is used. These are only set if you accept them via our cookie banner. By default they are switched off — we use Google Consent Mode, which denies analytics storage until you consent.</li>
            <li><strong className="text-navy font-medium">Vercel Analytics</strong> — privacy-friendly, aggregated usage measurement that does not use cookies or identify you individually.</li>
          </ul>
          <p>You can accept or decline analytics cookies using the banner shown on your first visit, and we remember your choice. We do not use advertising cookies.</p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-navy">8. Security</h2>
          <p>We use industry-standard security measures including encrypted connections (HTTPS), secure password hashing, and row-level security on our database. No system is 100% secure — if you believe your account has been compromised, contact us immediately.</p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-navy">9. Changes to This Policy</h2>
          <p>We may update this Privacy Policy from time to time. We will notify you of significant changes by email. The date at the top of this page shows when it was last revised.</p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-navy">10. Contact</h2>
          <p>For any privacy-related queries: <a href="mailto:hello@thepracticestandard.co.uk" className="text-teal hover:underline">hello@thepracticestandard.co.uk</a></p>
        </section>

      </div>
    </div>
  )
}
