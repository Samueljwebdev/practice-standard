# The Practice Standard — Tracking Plan (founding funnel)

**Tool:** GA4 `G-215E91WXVX` (via the `track()` helper in `src/lib/analytics.ts`). Consent-gated by `CookieBanner`. **Decisions this informs:** where practices drop between landing on `/founding` and paying, and whether monthly vs annual intent differs.

## The funnel (what to watch in GA4)
```
founding_view → register_started(role=practice) → signup_completed(role=practice)
   → founding_checkout_clicked(plan) → subscription_active(plan)
```

## Events (implemented in code)

| Event | Fires when | Properties | File |
|---|---|---|---|
| `founding_view` | `/founding` loads | — | TrackEvent in `app/founding/page.tsx` |
| `founding_checkout_clicked` | A plan card CTA is clicked | `plan` = founder_monthly \| founder_annual | `PlanCTA` on `/founding` |
| `register_started` | Role chosen on `/auth/register` | `role` = practice \| candidate | register page |
| `signup_completed` | Account created | `role`, `plan`, `practice_type` | register page (existing, now + plan) |
| `subscription_active` | Dashboard loads with `?subscribed=true` | `plan` = founder \| standard | dashboard |
| `checkout_started` | Job listing checkout (post a role) | (existing) | `practice/post` |
| `application_submitted` | Candidate applies | `job_id`, `profession` (existing) | ApplyButton |
| `benchmark_downloaded` | Salary benchmark lead magnet (existing) | `practice_type` | salary-benchmark |

## Mark as GA4 conversions (Admin → Events → Mark as conversion)
`signup_completed`, `founding_checkout_clicked`, `subscription_active`. (Optional: `application_submitted` to watch candidate-side supply.)

## Build these in GA4 (Explore → Funnel exploration)
**Founder funnel:** `founding_view` → `register_started` → `signup_completed` → `founding_checkout_clicked` → `subscription_active`. Breakdown by `plan` to compare monthly vs annual. The biggest drop tells you what to fix next (page-cro vs signup-flow-cro).

## UTMs for outreach/social (so attribution works)
Append to every link you share:
- Cold email → `?utm_source=email&utm_medium=outreach&utm_campaign=founding41`
- LinkedIn → `?utm_source=linkedin&utm_medium=social&utm_campaign=founding41`
- Instagram bio/posts → `?utm_source=instagram&utm_medium=social&utm_campaign=founding41`
Keep them lowercase. The `/founding` page already tracks the view; UTMs let GA4 attribute which channel produced the founders.

## Validate (10 min)
GA4 → Admin → **DebugView**, open `/founding` in a browser with the GA debug extension (or `?gtm_debug=x`), walk the funnel, confirm each event + properties fire once. Note: `subscription_active` only fires on the real post-checkout redirect (`/practice/dashboard?subscribed=true&founder=1`).
