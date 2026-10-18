-- CYBERRECOVER AI: initial secure data foundation
-- Run this in the Supabase SQL Editor for a NEW project before enabling real client records.
-- This schema deliberately scopes records to the authenticated owner. Organization/team sharing
-- is not enabled until a tenant-membership model and its tests are implemented.

create extension if not exists pgcrypto;

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  display_name text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.case_records (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null references auth.users(id) on delete cascade,
  title text not null check (char_length(title) between 1 and 160),
  summary text not null default '' check (char_length(summary) <= 10000),
  status text not null default 'open' check (status in ('open','in_review','resolved','archived')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists case_records_owner_created_idx
  on public.case_records (owner_id, created_at desc);

alter table public.profiles enable row level security;
alter table public.case_records enable row level security;

-- Users can read/update only their own profile. The id cannot be changed to another user.
drop policy if exists "profiles_select_own" on public.profiles;
create policy "profiles_select_own" on public.profiles
  for select to authenticated using (id = (select auth.uid()));

drop policy if exists "profiles_insert_own" on public.profiles;
create policy "profiles_insert_own" on public.profiles
  for insert to authenticated with check (id = (select auth.uid()));

drop policy if exists "profiles_update_own" on public.profiles;
create policy "profiles_update_own" on public.profiles
  for update to authenticated using (id = (select auth.uid()))
  with check (id = (select auth.uid()));

-- All case-record operations are owner-scoped at the database layer.
drop policy if exists "cases_select_own" on public.case_records;
create policy "cases_select_own" on public.case_records
  for select to authenticated using (owner_id = (select auth.uid()));

drop policy if exists "cases_insert_own" on public.case_records;
create policy "cases_insert_own" on public.case_records
  for insert to authenticated with check (owner_id = (select auth.uid()));

drop policy if exists "cases_update_own" on public.case_records;
create policy "cases_update_own" on public.case_records
  for update to authenticated using (owner_id = (select auth.uid()))
  with check (owner_id = (select auth.uid()));

drop policy if exists "cases_delete_own" on public.case_records;
create policy "cases_delete_own" on public.case_records
  for delete to authenticated using (owner_id = (select auth.uid()));

-- No public/anon policies are created. Never put the Supabase service-role key in browser code.
-- Before production: configure email confirmation, password recovery, MFA for privileged users,
-- backups/PITR as appropriate, audit logging, rate limits, and a tested restore procedure.
