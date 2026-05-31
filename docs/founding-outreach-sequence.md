# Founding-Member Outreach Sequence

For the **64 hot-lead clinics that are hiring right now** (`hot_leads_hiring_now.csv`).
Angle: *timely demand* ("you're hiring") + *the moat* (register-verified candidates, not the Indeed flood) + *zero risk* (free founding listing).

> **Rule:** do **not** use this for dental practices (employer constraint). The hot-lead list is vet / physio / optometry / private-medical — all fine.

## Personalisation tokens
- `{{First}}` — contact first name (use "there" if unknown)
- `{{Clinic}}` — clinic name
- `{{City}}` — town/city
- `{{Role}}` — the specific role they're advertising (e.g. "physiotherapist")
- `{{Discipline}}` — plural (e.g. "physios", "vets", "optometrists")
- `{{You}}` — your name / sign-off

## Cadence (4 touches over ~12 days)
| # | Day | Goal |
|---|-----|------|
| 1 | 0   | Timely demand hook |
| 2 | 3   | Differentiator + free founding offer (reply on thread) |
| 3 | 7   | Founding-member scarcity |
| 4 | 12  | Breakup |

Send **Tue–Thu, 8–10am**. Personalise the first line of each. Send the first batch **manually from Gmail** (no tooling needed) so you can react to replies.

---

### Email 1 — Day 0 — the hook
**Subject (pick one):**
- `{{Role}} candidates in {{City}}`
- `Verified {{Discipline}} near {{Clinic}}`
- `Saw you're hiring a {{Role}}`

```
Hi {{First}},

I noticed {{Clinic}} is advertising for a {{Role}} — so this is well timed.

I run The Practice Standard, a UK job board only for private practices. We have
register-verified {{Discipline}} in and around {{City}} actively looking right now.
Every candidate's professional registration (NMC / RCVS / GOC / HCPC) is checked,
so you skip the Indeed flood of unqualified applicants.

Want me to set your {{Role}} role up — free, as a founding member? Takes 2 minutes
and you'll see who's out there.

{{You}}
The Practice Standard · thepracticestandard.co.uk

Not for you? Reply "no thanks" and I won't email again.
```

### Email 2 — Day 3 — the differentiator (reply on the same thread)
**Subject:** `Re: {{Role}} candidates in {{City}}`

```
Hi {{First}},

Quick follow-up. The reason clinics switch to us from Indeed: Indeed runs ~£20/day
and sends 40 applicants, most without a valid pin. We send a handful — all
register-verified, private-practice only, no NHS noise.

As a founding member your first listing is free (normally £149). Hire from it —
great. If not, it cost you nothing.

Shall I set up your {{Role}} role? I just need the basics and I'll do the rest.

{{You}}

Reply "stop" to opt out.
```

### Email 3 — Day 7 — founding scarcity
**Subject:** `Founding clinics — {{City}}`

```
Hi {{First}},

We're onboarding a small group of founding clinics in {{City}} before we open up
more widely. Founding members keep free listings now and locked pricing later.

If the {{Role}} hire is still live, this is the moment to grab a spot. Happy to do
a 5-minute call, or just build the listing for you — your call.

{{You}}

Reply "stop" to opt out.
```

### Email 4 — Day 12 — breakup
**Subject:** `Close your file?`

```
Hi {{First}},

I haven't heard back, so I'll assume the timing's off and stop here. If you ever
want those register-verified {{Discipline}} in {{City}}, reply and I'll reopen
your founding spot.

Good luck with the {{Role}} search.

{{You}}
```

---

## Compliance (UK)
- **B2B legitimate interest:** emailing a corporate address about a relevant business service is permitted under PECR. Keep records of why each clinic is relevant (they're publicly advertising the role).
- **Opt-out in every email** (lines above). Honour it immediately — keep a suppression list.
- **No dental practices** in outbound (employer constraint).
- Don't make claims you can't back: only say "we have verified {{Discipline}} in {{City}}" when you genuinely do. Early on, soften to "we verify every candidate's registration."

## After a reply
- Interested → set up their listing free, then walk them to **£249/mo Practice Pro** once they've felt the value (verified applicants in the dashboard).
- Use the **tracking sheet** (`outreach-tracker.csv`) to log every touch and never double-send.
