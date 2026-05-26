# The Practice Standard — Master Checklist

Last updated: 2026-05-26
Status key: ✅ Done · 🔜 Saved for later · ⚠️ Gap/overlooked · 🔲 Not started

---

## 🏗️ PRODUCT (Core Platform)

### Job board
- ✅ Post a role (pay-per-listing and Practice Pro)
- ✅ Stripe live mode checkout
- ✅ Application flow (candidate applies, practice reviews)
- ✅ Practice dashboard
- ✅ Candidate dashboard / my applications
- ✅ Job published confirmation email (practice)
- ✅ Application notification email (practice)
- ✅ Application confirmation email (candidate)
- ✅ Practice welcome email
- ✅ Candidate welcome email
- ✅ Subscription activated email (Practice Pro)
- ⚠️ No admin notification when a new listing is posted — Sam has no way to know without logging into Supabase
- ⚠️ No mechanism to reject/remove a spam or fake listing — need a moderation flow (even just a Supabase SQL query to set status="removed")
- ⚠️ Practice Pro cancellation — does the subscription cancel cleanly in Stripe? Does access stop? Test this.
- ⚠️ Failed payment handling — if a Stripe payment fails (card declined, etc.), what happens? Check webhook coverage.
- ⚠️ VAT invoices/receipts — UK practices need a proper VAT receipt for their accounts. Stripe Tax is free and generates these automatically. Not confirmed as configured.

### Emails (Resend)
- ✅ All transactional emails exist
- ⚠️ SPF / DKIM / DMARC for thepracticestandard.co.uk — NOT confirmed. If these aren't set on the DNS, benchmark and application emails may land in spam. Check Resend's domain verification dashboard.
- ⚠️ End-to-end test: has the benchmark nurture sequence (day 3 + day 7 cron) been verified in production? Test by signing up with a real email and waiting 3 days.

---

## 🔒 COMPLIANCE & LEGAL

- ✅ Privacy policy (written, up to date)
- ✅ Terms of service (written, up to date)
- ✅ AI bots allowed in robots.ts (GPTBot, PerplexityBot, ClaudeBot, etc.)
- ⚠️ **Cookie consent banner — MISSING.** GA4 sets cookies. UK PECR requires informed consent before analytics cookies fire. This is a real legal gap. Options: simple cookie banner (easy, ~2 hours), or switch GA4 to consent mode (more complex). At minimum, add a simple "We use analytics cookies. [Accept] [Decline]" banner before this becomes a problem.
- ⚠️ No unsubscribe mechanism for benchmark emails beyond "reply with unsubscribe" — if volume grows, a proper one-click unsubscribe link is needed (Resend supports this).
- ⚠️ GDPR data deletion: what happens if a user requests their data to be deleted? There's no user-facing mechanism. At minimum, document the process (Supabase row delete + Stripe customer delete).

---

## 🔒 SECURITY

- ✅ CRON_SECRET set on Vercel production + preview
- ✅ Supabase RLS (assumed — verify in Supabase dashboard that all tables have RLS enabled and correct policies)
- ⚠️ **No rate limiting on /api/leads/salary-benchmark** — anyone can hit this endpoint in a loop and consume your entire Resend free plan (100 emails/day) in seconds. Add a simple IP-based check: store recent IPs in the DB or use Vercel's `request.headers.get("x-forwarded-for")` with a counter. Or just add a CAPTCHA (hCaptcha has a generous free tier).
- ⚠️ No rate limiting on any other API routes either. Low priority now, but worth noting.

---

## 🔍 SEO

- ✅ Google Search Console verified + sitemap submitted
- ✅ 88 profession pages + 1,056 region pages (programmatic)
- ✅ 6 competitor alternatives pages
- ✅ Blog: 5 posts with Article + BreadcrumbList schema
- ✅ Salary benchmark page
- ✅ FAQPage schema on pricing and alternatives pages
- ✅ Organization + WebSite schema on homepage
- ✅ robots.ts correct — allows all major AI bots
- ⚠️ **Blog posts have no internal links to profession/region pages.** This is a significant SEO opportunity. The aesthetics blog post should link to /roles/aesthetic-nurse, the vet post to /roles/veterinarian, etc. Easy wins — just need to add a few links in blog-content.ts. Could also add "Browse [X] roles →" blocks at relevant points.
- ⚠️ **Alternatives pages not linked from within blog posts.** The "real cost of recruitment" post should link to /alternatives/recruitment-agency. Easy fix.
- ⚠️ No meta description on the homepage (check this — the layout.tsx may have a fallback but it might be generic)
- ⚠️ OG image (opengraph-image.tsx exists) — has it been tested? Check what it actually renders at /opengraph-image
- 🔲 Google Business Profile — Tier 1 quick win (saved for later — docs/directory-submissions.md)
- 🔲 Trustpilot business profile — start collecting reviews when first customers arrive
- 🔲 Crunchbase profile — 15 min, free, helps entity recognition
- 🔲 5 more blog posts (aim for 20+ total for SEO mass)
- 🔲 Internal linking audit — once you have 10+ blog posts, build a proper internal link structure

---

## 📣 MARKETING & GROWTH

### Content
- ✅ Blog: 5 posts live
- ✅ Salary benchmark lead magnet
- ✅ 5 Instagram carousels written (docs/social-content.md)
- ✅ 5 LinkedIn posts written (docs/social-content.md) — HOLD for employer clearance
- 🔲 **Start posting on Instagram NOW** — content is ready, no clearance needed
- 🔲 LinkedIn company page (separate from personal profile — no employer issue with this)
- 🔲 LinkedIn personal posts — HOLD until clearance
- 🔲 5 more blog posts (to sustain social content pipeline)
- 🔲 Video content — short-form (Reels/TikTok) version of blog insights

### Cold outreach
- 🔜 Manual test batch: 20 aesthetics practices from Gmail — no setup needed, files ready at outreach/cold-email-aesthetics.md. DO THIS FIRST before any email warmup setup.
- 🔜 Zoho inbox setup → Instantly.ai → 14-day warmup → load 300 leads
- ⚠️ CRITICAL CONSTRAINT: NEVER target dental practices in cold outreach. Dental is inbound-only.

### Directories & listings
- 🔜 Google Business Profile (Tier 1 — docs/directory-submissions.md)
- 🔜 Trustpilot business profile setup
- 🔜 Crunchbase
- 🔜 F6S
- 🔜 Email to CSP, ABDO, BVNA, BAMAN, JCCP for association listings
- 🔜 Product Hunt — wait until 10+ live listings

### Partnerships (not yet considered)
- 🔲 **Indemnity providers** — MDDUS, MDU, Hamilton Fraser advertise to the same audience. A banner swap or directory listing on their sites would be high-quality referral traffic. Cold email their marketing teams.
- 🔲 **CPD providers** — companies like Aesthetic Training Academy, Prime Training, etc. serve the exact same audience. Could offer a "jobs board partner" badge in exchange for a mention.
- 🔲 **Equipment/consumables suppliers** — Allergan/AbbVie, Galderma, Sinclair all have practitioner communities. Newsletter sponsorship or partner listing is worth exploring.
- 🔲 **Healthcare accountants / practice management consultants** — they advise practices on hiring and costs. Could refer them to the platform.

### Paid (not yet considered)
- 🔲 Google Search Ads — high-intent keywords: "aesthetic nurse prescriber jobs", "vet jobs private practice", "physio jobs private clinic". Low volume, low competition. Even £5–10/day would generate measurable traffic. Test before committing budget.
- 🔲 Retargeting — basic Google/Meta retargeting pixel for site visitors. Especially useful once you have a practice-specific audience.

### PR (not yet considered)
- 🔲 **Trade press** — Aesthetic Medicine Magazine, Aesthetic Dentistry Today, Vet Record, Veterinary Times, Optician magazine, Physiotherapy Journal. A press release about "new specialist private practice job board" is newsworthy to these publications. Most have a free news submission process.
- 🔲 **Podcast appearances** — aesthetics, vet, and private GP communities all have active podcasts. Pitching as a guest with data from the salary benchmark is a credible angle.

---

## 💰 REVENUE

- ✅ Pay-per-listing (£149 +VAT) — Stripe live
- ✅ Practice Pro subscription (£249/month +VAT) — Stripe live
- ✅ Pricing page
- ⚠️ Stripe Tax / VAT — UK practices need VAT receipts for business accounts. Stripe Tax is free to configure and handles this automatically. Confirm it's active in your Stripe dashboard.
- ⚠️ Practice Pro cancellation path — test: subscribe, then cancel, confirm access ends correctly
- 🔲 Annual billing option (Practice Pro) — "£2,490/year" = 17% saving. Common conversion tactic. Could add later.
- 🔲 Sponsored/featured listings — once you have volume, practices could pay extra for placement at top of search results. Practice Pro already has this, but a one-off "featured" add-on could work for pay-per-listing users.

---

## 📊 ANALYTICS & MEASUREMENT

- ✅ GA4 (G-215E91WXVX) + @vercel/analytics
- ✅ benchmark_downloaded event tracked
- ⚠️ GA4 conversion events — have you marked key events as conversions in GA4 Admin? Recommend marking: benchmark_downloaded, and any checkout/payment events. This enables conversion tracking in reports.
- ⚠️ No funnel tracking on the checkout flow — how many people start checkout vs complete? Can't optimise without this.
- 🔲 Set up a GA4 dashboard/exploration for: daily benchmark signups, job listing views, application rate, checkout starts vs completions
- 🔲 Monthly review routine — set a recurring reminder to check GSC (search impressions), GA4 (conversions), and Supabase (listing count, benchmark leads count)

---

## 🥇 QUICK WINS THIS WEEK (priority order)

1. **Post first Instagram carousel** — content is at docs/social-content.md. Takes 30 mins in Canva.
2. **Send manual cold email test batch** — 20 aesthetics practices from Gmail, copy at outreach/cold-email-aesthetics.md. No setup needed.
3. **Fix cookie consent** — add a simple banner. Legal requirement. ~2 hours dev work.
4. **Verify email DNS (SPF/DKIM/DMARC)** — check Resend domain dashboard. If not set, benchmark emails may be going to spam right now.
5. **Add rate limiting to /api/leads/salary-benchmark** — Resend free plan is 100 emails/day. One spam attack exhausts it.
6. **Internal links in blog posts** — add 2–3 links per post to profession/region pages. 30 min edit to blog-content.ts.
7. **Google Business Profile** — 15 minutes, free, immediate local SEO value.
8. **Verify Stripe Tax / VAT receipts** — check in Stripe dashboard that tax is configured.
