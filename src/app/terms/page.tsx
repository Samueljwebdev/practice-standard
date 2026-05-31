import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Terms of Service | The Practice Standard",
  description: "Terms and conditions for using The Practice Standard job board.",
}

export default function TermsPage() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-16">
      <div className="mb-10">
        <p className="text-xs font-semibold text-teal uppercase tracking-[0.18em] mb-3">Legal</p>
        <h1 className="text-3xl font-bold text-navy mb-2">Terms of Service</h1>
        <p className="text-sm text-brand-slate">Last updated: 31 May 2026</p>
      </div>

      <div className="prose-custom space-y-8 text-[15px] leading-relaxed text-navy/80">

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-navy">1. About Us and Our Role</h2>
          <p>The Practice Standard (&ldquo;we&rdquo;, &ldquo;us&rdquo;, &ldquo;our&rdquo;) operates the website at thepracticestandard.co.uk — an online platform for advertising healthcare job vacancies in the UK.</p>
          <p>We are an <strong className="text-navy font-semibold">advertising platform only</strong>. We are <strong className="text-navy font-semibold">not a recruitment agency, employment agency, or employment business</strong> within the meaning of the Employment Agencies Act 1973 or the Conduct of Employment Agencies and Employment Businesses Regulations 2003.</p>
          <p>We do not introduce, select, recommend, supply, vet for suitability, or place candidates, and we are not an employer, agent, or party to any application, engagement, contract, or hiring decision between a practice and a candidate. Practices advertise their own vacancies and make their own hiring decisions; candidates choose which roles to apply for and apply directly.</p>
          <p>Our fees are charged to practices for advertising and listing visibility only — we never charge a placement, introduction, or success fee, and the platform is free for candidates. We are not responsible for the content of any listing, the conduct of any user, the accuracy of any profile or application, or the outcome of any application or hiring process.</p>
          <p>By using our website, you agree to these Terms. If you do not agree, please stop using the site.</p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-navy">2. Eligibility</h2>
          <p>You must be at least 18 years old and based in the United Kingdom to use this service. By creating an account, you confirm that the information you provide is accurate and up to date.</p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-navy">3. Accounts</h2>
          <p>You are responsible for keeping your account credentials secure. You are responsible for all activity that occurs under your account. Notify us immediately at hello@thepracticestandard.co.uk if you suspect unauthorised access.</p>
          <p>We reserve the right to suspend or delete accounts that violate these Terms.</p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-navy">4. For Practices — Job Listings</h2>
          <p>Practices may post job listings either on a pay-per-listing basis (currently £149 + VAT per listing, active for 30 days) or via a Practice Pro subscription (currently £249 + VAT per month, unlimited listings).</p>
          <ul className="list-disc pl-5 space-y-1.5 text-navy/75">
            <li>All listings must be for genuine, legal vacancies at a real UK practice.</li>
            <li>You must have authority to hire for the role you post.</li>
            <li>Listings must accurately describe the role, location, and requirements.</li>
            <li>We reserve the right to remove listings that are inaccurate, misleading, or in breach of UK employment law.</li>
          </ul>
          <p>Listings are activated once payment is confirmed. Pay-per-listing fees are non-refundable once a listing goes live. Subscriptions may be cancelled at any time; you retain access until the end of the current billing period.</p>
          <p><strong className="text-navy font-semibold">Candidate verification.</strong> Where we display a registration or verification status (for example, a &ldquo;Verified&rdquo; badge, or a regulator and registration number), this is provided on a best-efforts, informational basis only. It is generated automatically or through limited checks, may be incomplete, out of date, or inaccurate, and is <strong className="text-navy font-semibold">not a guarantee</strong> of a candidate&rsquo;s registration, qualifications, identity, or right to work. As the prospective employer you remain solely responsible for your own pre-employment checks — including confirming current registration directly with the relevant regulator (such as the GDC, GMC, or NMC), right-to-work, references, and any DBS checks — before making any hiring decision.</p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-navy">5. For Candidates</h2>
          <p>Browsing jobs and submitting applications is free. By applying for a role you confirm that:</p>
          <ul className="list-disc pl-5 space-y-1.5 text-navy/75">
            <li>The information in your profile and application is truthful and accurate.</li>
            <li>You hold any registrations, qualifications, or right to work that you claim.</li>
            <li>You consent to your application being shared with the relevant practice.</li>
          </ul>
          <p>Where you submit a registration number for verification, you consent to us checking it against the relevant regulator&rsquo;s public register. Submitting a number does not guarantee a verified status, and a verified status is an informational indicator only — it is not an endorsement of you by us.</p>
          <p>We are not responsible for the outcome of any application or the conduct of any practice.</p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-navy">6. Prohibited Conduct</h2>
          <p>You must not use The Practice Standard to:</p>
          <ul className="list-disc pl-5 space-y-1.5 text-navy/75">
            <li>Post false, misleading, or fraudulent content.</li>
            <li>Scrape, copy, or redistribute content without permission.</li>
            <li>Attempt to access another user&apos;s account or data.</li>
            <li>Use the platform for any unlawful purpose.</li>
            <li>Post roles that discriminate unlawfully on the basis of age, sex, race, disability, religion, or any other protected characteristic.</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-navy">7. Payments & Billing</h2>
          <p>Payments are processed securely by Stripe. By making a payment you agree to Stripe&apos;s terms of service. All prices are shown in GBP and exclude VAT unless stated otherwise. VAT will be added at checkout where applicable.</p>
          <p>Subscriptions renew automatically each month until cancelled. You can cancel at any time from your dashboard.</p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-navy">8. Intellectual Property</h2>
          <p>All content on this site — including design, copy, and code — is owned by or licensed to The Practice Standard. You may not reproduce it without our written permission. You retain ownership of any content you submit (job descriptions, profiles), but grant us a licence to display it on the platform.</p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-navy">9. Limitation of Liability</h2>
          <p>We provide this platform &ldquo;as is&rdquo;. We do not guarantee that the platform will be uninterrupted or error-free. We are not liable for any loss arising from your use of the site, the conduct of other users, or the outcome of any hiring process.</p>
          <p>To the maximum extent permitted by UK law, our total liability to you shall not exceed the amount you have paid to us in the 12 months preceding the claim.</p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-navy">10. Changes to These Terms</h2>
          <p>We may update these Terms from time to time. We will notify registered users of material changes by email. Continued use of the platform after changes are posted constitutes acceptance of the new Terms.</p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-navy">11. Governing Law</h2>
          <p>These Terms are governed by the laws of England and Wales. Any disputes shall be subject to the exclusive jurisdiction of the courts of England and Wales.</p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-bold text-navy">12. Contact</h2>
          <p>Questions about these Terms? Email us at <a href="mailto:hello@thepracticestandard.co.uk" className="text-teal hover:underline">hello@thepracticestandard.co.uk</a>.</p>
        </section>

      </div>
    </div>
  )
}
