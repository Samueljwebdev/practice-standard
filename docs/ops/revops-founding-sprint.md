# RevOps — Founding 41 Sprint

Operator-grade layer over the existing engine (no CRM needed yet — `outreach-tracker.csv` is the single source of truth; Supabase is the system of record for who actually paid). Goal: **41 paying practices by 31 July 2026.**

## 1. The pipeline (stages + definitions)

| Stage | Entry | Exit | Owner | SLA |
|---|---|---|---|---|
| **Lead** | Scraped clinic, has email, dental-free | Email 1 sent | Sam | — |
| **Contacted** | Email 1 sent (or LinkedIn DM) | Reply, or sequence ends (E1–E4) | Sam | follow-ups on schedule |
| **Engaged** | Any reply / link click / `founding_view` from their domain | Call booked or "set me up" | Sam | **reply within 4 business hours** |
| **Activating** | Account created (`signup_completed`) | Stripe `subscription_active` | Sam + product | nudge within 24h if not activated |
| **Paying** ✅ | Stripe subscription active | — | — | — |
| **Recycled** | "Not now" / no reply after E4 | Re-touch in 60 days | Sam | — |
| **Lost** | "No thanks" / unsubscribe | — | — | respect it; never re-email |

Map these to the tracker's `Stage` column. Add a `Plan` column (monthly/annual) once they pay.

## 2. The only metrics that matter (weekly)

| Metric | Formula | Healthy for this sprint |
|---|---|---|
| Leads added | new rows | ~75/week |
| Reply rate | replies ÷ emails sent | 3%+ |
| Engaged → Paying | paying ÷ engaged | 30%+ |
| **Paying (cumulative)** | count | **on track to 41 by Jul 31** |
| Monthly : Annual mix | from `Plan` | watch (annual = cash + churn-proof) |
| Avg days Engaged→Paying | date diff | shrink it |

**Speed-to-lead is the lever.** Replies worked within an hour convert far better than next-day. When a "yes" lands, set them up the same day.

## 3. Conversion math (so 41 is a plan, not a hope)
Work backwards from 41 paying:
- At **30% Engaged→Paying**, you need ~**137 engaged** conversations.
- At a **5% reply/engage rate** across email + LinkedIn, that's ~**2,740 touches** over the sprint (~340/week across email + DMs).
- That's why volume matters: 64 leads alone can't get there — scale to ~600 emailed + ~1,000 LinkedIn touches, or lift the engage→pay rate with a sharper offer.
**Lever check:** if Engaged→Paying runs at 40% (better offer/onboarding), required engaged drops to ~103 and the whole thing gets easier. Conversion quality beats raw volume.

## 4. Lightweight scoring (which leads to work first)
No formal model needed — sort the tracker by:
1. **Hiring now** (careers page shows a live vacancy) → top priority, Email 1 references it.
2. **Multi-site / group** → higher LTV, more likely to want the annual plan.
3. **Named contact found** → personalise, higher reply rate.
Work these before generic `info@` single-site leads.

## 5. Weekly review cadence (Fridays, 30 min — already in your calendar)
1. Update the tracker: emails sent, replies, signups, paid, stage moves.
2. Fill the scoreboard row in `growth-sprint-jun-jul-2026.md`.
3. Read 3 numbers: reply rate, Engaged→Paying, cumulative paying vs target line.
4. One question: *is the gap volume (scrape/DM more) or conversion (offer/onboarding)?* Act on that.
5. Reset next week's lead list + content.

## 6. The handoff that leaks (watch this)
**Engaged → Activating → Paying** is where money is lost. A practice says "yes," creates an account, then stalls before paying. Close the leak:
- Reply to "yes" same day with the direct link (`/founding`, or for a logged-in practice the founder-checkout link).
- If `signup_completed` fired but no `subscription_active` within 24h → personal nudge.
- Track it: the GA funnel (`signup_completed` → `subscription_active`) shows the size of this leak in real numbers.

## 7. When to graduate off the CSV
Stay on `outreach-tracker.csv` through this sprint — a CRM is overhead you don't need at 64–600 leads. Move to HubSpot (free tier) only when you're managing >1,000 open leads or a second person joins outreach.
