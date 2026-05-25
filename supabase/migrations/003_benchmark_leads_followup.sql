-- Track which follow-up emails have been sent to each benchmark lead
alter table public.benchmark_leads
  add column if not exists followup1_sent boolean default false,
  add column if not exists followup2_sent boolean default false;

-- Index to make the cron query fast
create index if not exists benchmark_leads_followup_idx
  on public.benchmark_leads (followup1_sent, followup2_sent, created_at);
