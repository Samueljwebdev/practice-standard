-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- Profiles: extends auth.users, one row per user
create table public.profiles (
  id uuid references auth.users(id) on delete cascade primary key,
  role text not null check (role in ('practice', 'candidate')),
  created_at timestamptz default now()
);
alter table public.profiles enable row level security;
create policy "Users can read own profile" on public.profiles
  for select using (auth.uid() = id);
create policy "Users can update own profile" on public.profiles
  for update using (auth.uid() = id);

-- Practices
create table public.practices (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references public.profiles(id) on delete cascade unique not null,
  name text not null,
  practice_type text not null,
  address_line1 text,
  city text,
  postcode text,
  website text,
  phone text,
  stripe_customer_id text,
  subscription_status text default 'inactive' check (
    subscription_status in ('inactive', 'active', 'cancelled', 'past_due')
  ),
  subscription_end timestamptz,
  created_at timestamptz default now()
);
alter table public.practices enable row level security;
create policy "Practices readable by owner" on public.practices
  for select using (auth.uid() = user_id);
create policy "Practices updatable by owner" on public.practices
  for update using (auth.uid() = user_id);
create policy "Practices insertable by owner" on public.practices
  for insert with check (auth.uid() = user_id);

-- Candidates
create table public.candidates (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references public.profiles(id) on delete cascade unique not null,
  full_name text not null,
  profession text not null,
  registration_number text,
  location text,
  region text,
  bio text,
  cv_url text,
  available boolean default true,
  years_experience integer,
  created_at timestamptz default now()
);
alter table public.candidates enable row level security;
create policy "Candidates readable by owner" on public.candidates
  for select using (auth.uid() = user_id);
create policy "Candidates updatable by owner" on public.candidates
  for update using (auth.uid() = user_id);
create policy "Candidates insertable by owner" on public.candidates
  for insert with check (auth.uid() = user_id);
create policy "Practices can read candidates" on public.candidates
  for select using (
    exists (
      select 1 from public.profiles
      where id = auth.uid() and role = 'practice'
    )
  );

-- Jobs
create table public.jobs (
  id uuid default uuid_generate_v4() primary key,
  practice_id uuid references public.practices(id) on delete cascade not null,
  title text not null,
  profession text not null,
  job_type text not null check (job_type in ('permanent', 'part_time', 'locum', 'contract')),
  region text not null,
  city text,
  salary_min integer,
  salary_max integer,
  description text not null,
  requirements text,
  slug text unique not null,
  status text default 'draft' check (status in ('draft', 'active', 'expired', 'filled')),
  payment_status text default 'unpaid' check (payment_status in ('unpaid', 'paid')),
  published_at timestamptz,
  expires_at timestamptz,
  created_at timestamptz default now()
);
alter table public.jobs enable row level security;
create policy "Active jobs are public" on public.jobs
  for select using (status = 'active' and payment_status = 'paid');
create policy "Practice reads own jobs" on public.jobs
  for select using (
    exists (
      select 1 from public.practices p
      where p.id = practice_id and p.user_id = auth.uid()
    )
  );
create policy "Practice inserts own jobs" on public.jobs
  for insert with check (
    exists (
      select 1 from public.practices p
      where p.id = practice_id and p.user_id = auth.uid()
    )
  );
create policy "Practice updates own jobs" on public.jobs
  for update using (
    exists (
      select 1 from public.practices p
      where p.id = practice_id and p.user_id = auth.uid()
    )
  );

-- Applications
create table public.applications (
  id uuid default uuid_generate_v4() primary key,
  job_id uuid references public.jobs(id) on delete cascade not null,
  candidate_id uuid references public.candidates(id) on delete cascade not null,
  cover_letter text,
  status text default 'pending' check (status in ('pending', 'viewed', 'shortlisted', 'rejected')),
  created_at timestamptz default now(),
  unique(job_id, candidate_id)
);
alter table public.applications enable row level security;
create policy "Candidates read own applications" on public.applications
  for select using (
    exists (
      select 1 from public.candidates c
      where c.id = candidate_id and c.user_id = auth.uid()
    )
  );
create policy "Candidates insert applications" on public.applications
  for insert with check (
    exists (
      select 1 from public.candidates c
      where c.id = candidate_id and c.user_id = auth.uid()
    )
  );
create policy "Practices read applications for their jobs" on public.applications
  for select using (
    exists (
      select 1 from public.jobs j
      join public.practices p on p.id = j.practice_id
      where j.id = job_id and p.user_id = auth.uid()
    )
  );
create policy "Practices update application status" on public.applications
  for update using (
    exists (
      select 1 from public.jobs j
      join public.practices p on p.id = j.practice_id
      where j.id = job_id and p.user_id = auth.uid()
    )
  );

-- Job purchases (pay-per-listing records)
create table public.job_purchases (
  id uuid default uuid_generate_v4() primary key,
  job_id uuid references public.jobs(id) on delete cascade not null,
  practice_id uuid references public.practices(id) on delete cascade not null,
  stripe_payment_intent_id text unique,
  amount_pence integer not null,
  created_at timestamptz default now()
);
alter table public.job_purchases enable row level security;
create policy "Practice reads own purchases" on public.job_purchases
  for select using (
    exists (
      select 1 from public.practices p
      where p.id = practice_id and p.user_id = auth.uid()
    )
  );

-- Full-text search index on jobs
create index jobs_search_idx on public.jobs
  using gin(to_tsvector('english', title || ' ' || description || ' ' || coalesce(city, '')));
