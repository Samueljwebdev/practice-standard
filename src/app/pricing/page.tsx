import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { LISTING_PRICE_GBP, SUBSCRIPTION_PRICE_GBP } from "@/lib/constants"

export default function PricingPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold text-slate-900 mb-3">Simple, transparent pricing</h1>
        <p className="text-slate-500">Candidates are always free. Practices pay only for what they need.</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6 max-w-2xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle>Pay per listing</CardTitle>
            <CardDescription>Best for occasional hiring</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-4xl font-bold text-slate-900">£{LISTING_PRICE_GBP}<span className="text-lg font-normal text-slate-500">/listing</span></div>
            <ul className="space-y-2 text-sm text-slate-700">
              <li className="flex gap-2"><span>✓</span>Active for 30 days</li>
              <li className="flex gap-2"><span>✓</span>Listed across all relevant profession pages</li>
              <li className="flex gap-2"><span>✓</span>Applications in your dashboard</li>
              <li className="flex gap-2"><span>✓</span>Email notification for every applicant</li>
            </ul>
            <Link href="/auth/register" className="block w-full text-center border border-slate-300 text-slate-700 px-4 py-2.5 rounded-md text-sm font-medium hover:bg-slate-50 transition-colors">
              Post a job
            </Link>
          </CardContent>
        </Card>

        <Card className="border-slate-900">
          <CardHeader>
            <div className="text-xs font-semibold text-slate-900 bg-slate-100 rounded px-2 py-1 w-fit mb-1">BEST VALUE</div>
            <CardTitle>Practice Pro</CardTitle>
            <CardDescription>Best for practices hiring regularly</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-4xl font-bold text-slate-900">£{SUBSCRIPTION_PRICE_GBP}<span className="text-lg font-normal text-slate-500">/month</span></div>
            <ul className="space-y-2 text-sm text-slate-700">
              <li className="flex gap-2"><span>✓</span><strong>Unlimited</strong> job listings</li>
              <li className="flex gap-2"><span>✓</span>Everything in Pay per listing</li>
              <li className="flex gap-2"><span>✓</span>Featured placement in search results</li>
              <li className="flex gap-2"><span>✓</span>Cancel any time</li>
            </ul>
            <Link href="/api/stripe/checkout?mode=subscription" className="block w-full text-center bg-slate-900 text-white px-4 py-2.5 rounded-md text-sm font-medium hover:bg-slate-700 transition-colors">
              Subscribe
            </Link>
          </CardContent>
        </Card>
      </div>

      <p className="text-center text-sm text-slate-400 mt-8">All prices exclude VAT. Candidates can always search and apply for free.</p>
    </div>
  )
}
