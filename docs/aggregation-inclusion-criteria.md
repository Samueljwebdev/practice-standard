# Aggregated listings — inclusion criteria

The board is **"private practice only — no NHS noise."** Sourced (aggregated) listings must
match that positioning or they break the core promise. Inclusion is enforced **in code** on
every scrape by `src/lib/jobs/exclusions.ts` (org name + domain) plus the NHS / non-clinical
filters in `src/lib/jobs/aggregate.ts`.

## INCLUDE
- **Independent / private** practices, ideally 1–3 sites.
- A real **clinical role** in one of our verticals: aesthetics, veterinary, optometry,
  physiotherapy, private medical, dental (inbound/SEO only), plus allied clinical roles.

## HARD-EXCLUDE (maintained in `exclusions.ts`)
- **NHS / public sector:** NHS trusts, GMS/PMS GP surgeries, "Health Centre" / "Medical Centre" /
  "Group Practice", Foundation Trusts, ICB / PCN / CCG, health boards; `nhs.uk` / `nhs.net` domains.
- **Universities & teaching hospitals.**
- **Private hospital GROUPS:** Practice Plus, Nuffield, Spire, Circle, HCA, Ramsay, BMI.
- **National / corporate CHAINS:** Specsavers, Vision Express, Boots Opticians, Optical Express;
  mydentist, Bupa Dental, Portman, Rodericks; sk:n, SkinViva, Ace & Tate; IVC/Evidensia, CVS,
  VetPartners, Medivet, Vets4Pets, Pets at Home, Linnaeus, Goddard.

## AMBIGUOUS
When an employer can't be confidently classified as independent/private, **exclude it** —
protecting the "private only" promise beats one extra listing. Extend the filter by adding the
name pattern / domain to `exclusions.ts`. (Future enhancement: a flag-for-review queue —
`status='review'` — instead of silent exclusion.)

## ENFORCEMENT
`runAggregateIngest` **full-refreshes** the aggregated set on every run (delete `source='aggregated'`
→ re-insert with the filter applied), so any newly-excluded org is **purged automatically on the
next ingest** — no manual cleanup to maintain. To purge immediately, trigger the
`/api/cron/ingest-jobs` cron.
