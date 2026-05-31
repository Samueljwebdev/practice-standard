-- Candidate credential verification.
-- This table is written ONLY by the server (service role). There are deliberately
-- no insert/update/delete RLS policies, so a candidate can never mark themselves
-- "verified" from the client — the authoritative result is server-controlled.

create table public.candidate_verifications (
  user_id uuid references public.profiles(id) on delete cascade primary key,
  regulator text,                          -- nmc | gmc | gdc | hcpc | rcvs | goc | gphc | gosc | gcc | null
  registration_number text,                -- the number the candidate submitted
  status text not null default 'unverified'
    check (status in ('unverified', 'verified', 'pending_review', 'failed', 'not_applicable')),
  verified_name text,                      -- name returned by the official register (if matched)
  registrant_type text,                    -- e.g. "Dentist", "Dental Nurse"
  reason text,                             -- short machine reason: bad_format, not_found, status_not_registered, lookup_unavailable…
  checked_at timestamptz,
  meta jsonb,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

alter table public.candidate_verifications enable row level security;

-- Candidates can read their own verification status.
create policy "Owner reads own verification" on public.candidate_verifications
  for select using (auth.uid() = user_id);

-- Practices can read the verification status of candidates who applied to their jobs.
create policy "Practices read applicant verification" on public.candidate_verifications
  for select using (
    exists (
      select 1
      from public.applications a
      join public.candidates c on c.id = a.candidate_id
      join public.jobs j on j.id = a.job_id
      join public.practices p on p.id = j.practice_id
      where c.user_id = candidate_verifications.user_id
        and p.user_id = auth.uid()
    )
  );
