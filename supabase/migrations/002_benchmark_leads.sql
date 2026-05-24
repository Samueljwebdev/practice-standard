-- Benchmark leads: captures emails from the salary benchmark lead magnet
create table public.benchmark_leads (
  id uuid default gen_random_uuid() primary key,
  email text not null,
  name text,
  practice_type text,
  created_at timestamptz default now()
);

-- No RLS needed — this table is only written via service role in API routes
-- and read only by admin. Public insert is via the API route (server-side).
alter table public.benchmark_leads enable row level security;
