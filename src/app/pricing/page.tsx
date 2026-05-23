import Link from "next/link"
import { AnimateIn } from "@/components/ui/AnimateIn"
import { LISTING_PRICE_GBP, SUBSCRIPTION_PRICE_GBP } from "@/lib/constants"

export default function PricingPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-20">
      <AnimateIn>
        <div className="text-center mb-14">
          <p className="text-xs font-semibold text-teal uppercase tracking-[0.18em] mb-4">Pricing</p>
          <h1 className="text-3xl md:text-4xl font-bold text-navy mb-3">Simple, transparent pricing</h1>
          <p className="text-brand-slate">Candidates are always free. Practices pay only for what they need.</p>
        </div>
      </AnimateIn>

      <div className="grid md:grid-cols-2 gap-5 max-w-2xl mx-auto">
        {/* Pay per listing */}
        <AnimateIn delay={0.05}>
          <div className="bg-white border border-border rounded-2xl p-7 h-full flex flex-col">
            <div className="mb-6">
              <h2 className="text-lg font-bold text-navy mb-1">Pay per listing</h2>
              <p className="text-sm text-brand-slate">Best for occasional hiring</p>
            </div>
            <div className="mb-6">
              <span className="text-4xl font-bold text-navy">£{LISTING_PRICE_GBP}</span>
              <span className="text-brand-slate text-sm ml-1">/ listing</span>
            </div>
            <ul className="space-y-3 text-sm text-navy/70 mb-8 flex-1">
              <li className="flex items-start gap-2.5">
                <span className="text-mint mt-0.5">✓</span>
                <span>Active for 30 days</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-mint mt-0.5">✓</span>
                <span>Listed across all relevant profession pages</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-mint mt-0.5">✓</span>
                <span>Applications in your dashboard</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-mint mt-0.5">✓</span>
                <span>Email notification for every applicant</span>
              </li>
            </ul>
            <Link
              href="/auth/register"
              className="block w-full text-center border-2 border-teal/25 text-teal px-4 py-2.5 rounded-full text-sm font-semibold hover:border-teal hover:bg-teal/5 transition-colors"
            >
              Post a job
            </Link>
          </div>
        </AnimateIn>

        {/* Practice Pro */}
        <AnimateIn delay={0.12}>
          <div className="bg-teal rounded-2xl p-7 h-full flex flex-col relative overflow-hidden">
            <div className="absolute top-4 right-4">
              <span className="text-[10px] font-bold text-teal bg-mint px-2.5 py-1 rounded-full uppercase tracking-wider">
                Best value
              </span>
            </div>
            <div className="mb-6">
              <h2 className="text-lg font-bold text-off-white mb-1">Practice Pro</h2>
              <p className="text-sm text-off-white/55">Best for practices hiring regularly</p>
            </div>
            <div className="mb-6">
              <span className="text-4xl font-bold text-off-white">£{SUBSCRIPTION_PRICE_GBP}</span>
              <span className="text-off-white/55 text-sm ml-1">/ month</span>
            </div>
            <ul className="space-y-3 text-sm text-off-white/75 mb-8 flex-1">
              <li className="flex items-start gap-2.5">
                <span className="text-mint mt-0.5">✓</span>
                <span><strong className="text-off-white font-semibold">Unlimited</strong> job listings</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-mint mt-0.5">✓</span>
                <span>Everything in Pay per listing</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-mint mt-0.5">✓</span>
                <span>Featured placement in search results</span>
              </li>
              <li className="flex items-start gap-2.5">
                <span className="text-mint mt-0.5">✓</span>
                <span>Cancel any time</span>
              </li>
            </ul>
            <Link
              href="/api/stripe/checkout?mode=subscription"
              className="block w-full text-center bg-mint text-navy px-4 py-2.5 rounded-full text-sm font-semibold hover:bg-mint/85 transition-colors"
            >
              Subscribe
            </Link>
          </div>
        </AnimateIn>
      </div>

      <AnimateIn delay={0.2}>
        <p className="text-center text-sm text-brand-slate/60 mt-10">
          All prices exclude VAT. Candidates can always search and apply for free.
        </p>
      </AnimateIn>
    </div>
  )
}
