-- Public clinic directory (seeded from scraped Google Maps data) + claim funnel.

create table if not exists public.clinics (
  id uuid default uuid_generate_v4() primary key,
  slug text unique not null,
  name text not null,
  category text,
  vertical text,
  city text,
  region text,
  street text,
  website text,
  phone text,
  rating numeric,
  reviews_count integer,
  is_hiring boolean not null default false,
  careers_url text,
  claimed_by_practice_id uuid references public.practices(id) on delete set null,
  source text not null default 'directory',
  created_at timestamptz default now()
);

alter table public.clinics enable row level security;

-- Public directory: anyone can read.
drop policy if exists "Clinics are public" on public.clinics;
create policy "Clinics are public" on public.clinics for select using (true);
-- Claiming is performed server-side with the service role (no public write policy).

create index if not exists clinics_vertical_region_idx on public.clinics (vertical, region);

notify pgrst, 'reload schema';
