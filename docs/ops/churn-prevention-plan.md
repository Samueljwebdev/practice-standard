# Churn Prevention — The Practice Standard

**The core risk (you named it):** a practice pays on signup, the marketplace is still thin on candidates, they don't see a verified applicant fast enough, and they cancel in month 2. So the whole game is **getting them to first value before the first renewal** — and recovering the ones who still wobble.

Stack: Supabase · Stripe (subscriptions + webhooks) · Resend.

---

## 1. Define "first value" — then engineer the days to it
First value for a practice = **a verified applicant lands on a role they posted** (or, weaker but earlier: candidates are visibly browsing/available in their discipline). Everything below drives that.

**Activation checklist (the first 7 days decide month 2):**
1. Day 0 — they pay → immediately route them to "post your first role" (not a bare dashboard).
2. Day 0 — confirmation email that sets the expectation: *"Here's what happens next and when to expect applicants."*
3. Day 1 — if no role posted, nudge: *"Your founding rate is live — post your first role in 2 minutes."*
4. Day 2–3 — when the role is live, show/seed candidate supply in their discipline so the page never looks empty.
5. Day 7 — "your first week" recap: who's viewed/applied, what to do next.

**The supply problem is the churn problem.** A practice churns because the marketplace looked empty. Counter it honestly: surface live candidate counts in their discipline, push the professional-side content hard, and (where true) tell them "X verified [physios] joined this week."

## 2. Health signals (you can compute all of these from Supabase + Stripe + GA4)

| Signal | Source | Risk |
|---|---|---|
| No role posted within 3 days of paying | `jobs` table | **High** — paid, never activated |
| Role posted but 0 applicants after 14 days | `jobs` + `applications` | **High** — paid, no value |
| No dashboard login in 14 days | auth/last_sign_in | Medium |
| Visited billing/cancel page | GA4 / Stripe portal | **Critical** — days from cancel |
| Annual renewal or monthly month-2 charge approaching | Stripe | act 7–14 days before |

**Simple health score:** Green = posted a role AND got an applicant. Amber = posted, no applicant yet. Red = paid, no role posted. Triage Red and Amber every week.

## 3. Proactive interventions (before they ever click cancel)

| Trigger | Intervention (Resend email + in-app) |
|---|---|
| Paid, no role in 3 days | "Post your first role" + offer to set it up for them |
| Role live, 0 applicants @ 14 days | Personal email from Sam: "Let me help your listing land" — review the ad (salary named? CPD? title?), push it in content, share to the candidate side |
| No login in 14 days | "Here's who's new in [discipline] this week" |
| Month-2 charge in 7 days (monthly) | Value recap: views, applicants, what's coming — pre-empt the "is this worth it?" moment |

For an early marketplace, **the single highest-ROI retention act is Sam personally making sure each founding practice's first role gets seen.** At 41 practices that's manageable and it's what turns a founding member into a reference.

## 4. The cancel flow (build when you wire the Stripe billing portal)
Don't let cancel be one silent click. Structure: **survey → matched save offer → confirm (end of period) → win-back**.

| Cancel reason | Save offer |
|---|---|
| "Not getting applicants yet" (your #1) | **Pause 1 month, free** + a personal commitment to push their listing — *not* a discount. The problem is value, not price. |
| "Too expensive" | Downgrade to pay-per-listing (£149) instead of losing them entirely |
| "Hired already / don't need it now" | Pause 1–3 months (60–80% of pausers return); keep their data |
| "Missing a feature" | Log it, show what's coming, offer a workaround |
| "Closing / changed" | Respect it, no offer, ask for feedback |

Keep "continue cancelling" always visible (no dark patterns; also the law). Save-rate target 25–35%.

## 5. Involuntary churn (the cheap 30–50% win — set up now, it's free)
This is the easiest retention you'll ever get, and it's mostly Stripe config:
- **Turn on Stripe Smart Retries** (Billing → retries) — recovers most soft declines automatically.
- **Turn on Stripe dunning emails** (or send via Resend): Day 0, 3, 7, 10 — "your card didn't go through, update it" with a one-click update link, no login.
- **Card-expiry pre-alerts** (Stripe Billing) — 30/15/7 days before expiry.
- Annual founders: a **pre-billing notice 5 days before** the renewal charge (£1,990 is a chunk — don't surprise them).
Benchmark: 50–60% of failed payments recoverable. On a small base, that's real MRR saved for near-zero effort.

## 6. Win-back (after cancel)
- Keep their account + data warm; one-click reactivation.
- Resend sequence: Day 3 ("what we've added since"), Day 30 ("X new candidates in [discipline]"), Day 90 ("come back at your founder rate" — honour it for ex-founders within the window; it's a stronger hook than a discount).

## 7. Metrics to watch
Monthly churn (target <3–5% as you scale), cancel-flow save rate (25–35%), pause→reactivation (60–80%), dunning recovery (50–60%), and the leading one for *this* business: **% of paying practices that received an applicant within 14 days.** If that number is high, churn takes care of itself.

---

**Build order:** (1) the Day-0→Day-7 activation emails (Resend) + post-pay routing to "post a role"; (2) Stripe Smart Retries + dunning (free, today); (3) the manual "make every founding listing land" habit; (4) the cancel flow with the pause-not-discount save offer, when you wire the billing portal. Items 1–3 cost almost nothing and address 80% of the risk.
