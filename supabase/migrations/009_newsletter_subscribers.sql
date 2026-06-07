-- Newsletter subscribers for "The Standard". Written/read server-side via the
-- service role only (the Resend Audience is the canonical send list; this is our
-- own backup copy + dedup source). RLS is enabled with NO public policies, so the
-- anon key cannot read or write it.
create table if not exists public.newsletter_subscribers (
  id uuid default gen_random_uuid() primary key,
  email text not null unique,
  first_name text,
  source text,
  unsubscribed_at timestamptz,
  created_at timestamptz default now()
);

alter table public.newsletter_subscribers enable row level security;
-- No policies on purpose: service-role access only (bypasses RLS); public denied.
