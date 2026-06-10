import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Sponsor The Standard — The Practice Standard",
  description: "Reach UK private-practice owners, managers and clinicians with a weekly sponsor slot in The Standard newsletter.",
}

const tiers = [
  { size: "Launch (< 500 subs)", issue: "£95", pack: "£320", note: "first slot free for a testimonial" },
  { size: "Growing (500–2,000)", issue: "£200", pack: "£680", note: "quarterly £2,200" },
  { size: "Established (2,000+)", issue: "£450", pack: "£1,530", note: "quarterly £4,800" },
]

const BOOK = "mailto:sponsor@thepracticestandard.co.uk?subject=Sponsor%20The%20Standard"

export default function SponsorPage() {
  return (
    <div className="min-h-screen bg-off-white px-4 py-16">
      <div className="max-w-2xl mx-auto">
        <p className="text-xs font-semibold text-teal uppercase tracking-[0.18em] mb-2">Sponsor</p>
        <h1 className="text-3xl font-black text-navy mb-3">Reach the people who do the hiring in private healthcare.</h1>
        <p className="text-brand-slate text-sm mb-8">
          <strong className="text-navy">The Standard</strong> is a weekly brief read by owners, principals and practice
          managers — plus the registered clinicians they want to hire — across UK private veterinary, optometry,
          physiotherapy, aesthetics and private medical. One sponsor per issue. No ad clutter.
        </p>

        <h2 className="text-lg font-black text-navy mb-3">What you get</h2>
        <ul className="space-y-2 mb-8 text-sm text-brand-slate">
          <li>• A header placement: <em>&ldquo;This week&rsquo;s brief is brought to you by [you].&rdquo;</em></li>
          <li>• 2–3 lines of copy (we&rsquo;ll help write it), your link and logo.</li>
          <li>• The only commercial voice in a genuinely useful email — to a buying audience.</li>
          <li>• Open &amp; click numbers after the issue goes out.</li>
        </ul>

        <h2 className="text-lg font-black text-navy mb-3">Rates</h2>
        <div className="overflow-hidden rounded-xl border-2 border-border bg-white mb-3">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-navy text-off-white">
                <th className="text-left font-semibold px-4 py-2.5">List size</th>
                <th className="text-left font-semibold px-4 py-2.5">Per issue</th>
                <th className="text-left font-semibold px-4 py-2.5">4-issue pack</th>
              </tr>
            </thead>
            <tbody>
              {tiers.map(t => (
                <tr key={t.size} className="border-t border-border">
                  <td className="px-4 py-2.5 text-navy font-medium">{t.size}<div className="text-xs text-brand-slate font-normal">{t.note}</div></td>
                  <td className="px-4 py-2.5 text-navy">{t.issue}</td>
                  <td className="px-4 py-2.5 text-navy">{t.pack}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-xs text-brand-slate mb-8">Add-ons: classified line in The Brief (£50) · featured job (£75) · co-branded salary guide (on request).</p>

        <h2 className="text-lg font-black text-navy mb-3">Book your week</h2>
        <p className="text-brand-slate text-sm mb-5">Tell us which week you&rsquo;d like and we&rsquo;ll confirm availability, take payment and help write your copy. Slots are one-per-issue, first come first served.</p>
        <a href={BOOK} className="inline-block rounded-full bg-teal text-off-white px-6 py-3 text-sm font-semibold hover:bg-teal/90">
          Enquire &amp; book →
        </a>
        <p className="text-xs text-brand-slate mt-6">
          Not on the list yet? <a href="/newsletter" className="text-teal underline">Read The Standard first →</a>
        </p>
      </div>
    </div>
  )
}
