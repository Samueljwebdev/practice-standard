-- Fixes "infinite recursion detected in policy for relation candidates".
--
-- The candidates "Practices can read applicant candidates" policy (migration 001)
-- queries public.applications, whose own policies query public.candidates — a
-- mutual RLS loop that Postgres rejects. This breaks every candidate-session read
-- of the candidates table (profile, dashboard, apply, verification).
--
-- Fix: move the cross-table checks into SECURITY DEFINER functions, which run
-- with the owner's privileges and therefore do NOT re-trigger RLS on the inner
-- tables, breaking the cycle.

create or replace function public.candidate_applied_to_my_practice(_candidate_id uuid)
returns boolean
language sql
security definer
set search_path = public
stable
as $$
  select exists (
    select 1
    from public.applications a
    join public.jobs j on j.id = a.job_id
    join public.practices p on p.id = j.practice_id
    where a.candidate_id = _candidate_id
      and p.user_id = auth.uid()
  );
$$;

create or replace function public.user_applied_to_my_practice(_user_id uuid)
returns boolean
language sql
security definer
set search_path = public
stable
as $$
  select exists (
    select 1
    from public.applications a
    join public.candidates c on c.id = a.candidate_id
    join public.jobs j on j.id = a.job_id
    join public.practices p on p.id = j.practice_id
    where c.user_id = _user_id
      and p.user_id = auth.uid()
  );
$$;

-- Replace the recursive candidates policy with the non-recursive function call.
drop policy if exists "Practices can read applicant candidates" on public.candidates;
create policy "Practices can read applicant candidates" on public.candidates
  for select using (public.candidate_applied_to_my_practice(id));

-- Make the candidate_verifications policy use the same safe pattern.
drop policy if exists "Practices read applicant verification" on public.candidate_verifications;
create policy "Practices read applicant verification" on public.candidate_verifications
  for select using (public.user_applied_to_my_practice(user_id));
