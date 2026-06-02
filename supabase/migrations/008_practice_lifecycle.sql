-- 008: Practice activation lifecycle tracking
-- Adds timestamps used by the daily lifecycle cron to send the right onboarding
-- email once per practice (idempotent — a non-null timestamp means "already sent").

alter table practices
  add column if not exists activated_at           timestamptz,
  add column if not exists nudge_sent_at           timestamptz,
  add column if not exists week1_sent_at           timestamptz,
  add column if not exists no_applicants_sent_at   timestamptz;

-- Fast lookup for the cron (only paying, activated practices matter).
create index if not exists practices_activated_at_idx
  on practices (activated_at)
  where activated_at is not null;

-- Confirmation
select
  count(*) filter (where activated_at is not null) as activated_practices
from practices;
