-- Support aggregated ("wrapped") job listings sourced from public feeds.
-- These have no practice account, never go through Stripe, link out to the
-- source to apply, and are noindexed to protect the domain's SEO.

alter table public.jobs
  add column if not exists source text not null default 'practice',
  add column if not exists source_url text,
  add column if not exists external_org_name text,
  add column if not exists external_org_url text,
  add column if not exists noindex boolean not null default false;

-- Aggregated jobs have no owning practice.
alter table public.jobs alter column practice_id drop not null;

-- Public read for aggregated active listings (they bypass the paid check).
drop policy if exists "Aggregated jobs are public" on public.jobs;
create policy "Aggregated jobs are public" on public.jobs
  for select using (source = 'aggregated' and status = 'active');

notify pgrst, 'reload schema';
