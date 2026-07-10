-- Extensions
create extension if not exists "pgcrypto";

-- =========================================================
-- profiles
-- =========================================================
create table if not exists public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  name text,
  avatar_url text,
  created_at timestamptz not null default now()
);

alter table public.profiles enable row level security;

create policy "Profiles are viewable by owner"
  on public.profiles for select
  using (auth.uid() = id);

create policy "Users can insert their own profile"
  on public.profiles for insert
  with check (auth.uid() = id);

create policy "Users can update their own profile"
  on public.profiles for update
  using (auth.uid() = id)
  with check (auth.uid() = id);

-- =========================================================
-- projects  (one project per owner - free tier)
-- =========================================================
create table if not exists public.projects (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null references auth.users (id) on delete cascade,
  name text not null,
  api_key text not null default ('lmn_' || replace(gen_random_uuid()::text, '-', '')),
  -- placeholder fields for future expansion
  domain text,
  widget_settings jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  constraint projects_owner_id_unique unique (owner_id)
);

create unique index if not exists projects_api_key_key on public.projects (api_key);

alter table public.projects enable row level security;

create policy "Owners can view their project"
  on public.projects for select
  using (auth.uid() = owner_id);

create policy "Owners can create their project"
  on public.projects for insert
  with check (auth.uid() = owner_id);

create policy "Owners can update their project"
  on public.projects for update
  using (auth.uid() = owner_id)
  with check (auth.uid() = owner_id);

create policy "Owners can delete their project"
  on public.projects for delete
  using (auth.uid() = owner_id);

-- =========================================================
-- bug_reports
-- =========================================================
create type public.bug_status as enum ('open', 'in_progress', 'resolved', 'closed');
create type public.bug_severity as enum ('low', 'medium', 'high', 'critical');

create table if not exists public.bug_reports (
  id uuid primary key default gen_random_uuid(),
  project_id uuid not null references public.projects (id) on delete cascade,
  title text not null,
  description text,
  status public.bug_status not null default 'open',
  severity public.bug_severity not null default 'medium',
  screenshot_url text,
  browser text,
  os text,
  page_url text,
  -- placeholder fields for future expansion
  reporter_email text,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create index if not exists bug_reports_project_id_idx on public.bug_reports (project_id);
create index if not exists bug_reports_created_at_idx on public.bug_reports (created_at desc);

alter table public.bug_reports enable row level security;

-- Users can only access bug reports belonging to a project they own.
create policy "Owners can view their bug reports"
  on public.bug_reports for select
  using (
    exists (
      select 1 from public.projects p
      where p.id = bug_reports.project_id and p.owner_id = auth.uid()
    )
  );

create policy "Owners can insert bug reports for their project"
  on public.bug_reports for insert
  with check (
    exists (
      select 1 from public.projects p
      where p.id = bug_reports.project_id and p.owner_id = auth.uid()
    )
  );

create policy "Owners can update their bug reports"
  on public.bug_reports for update
  using (
    exists (
      select 1 from public.projects p
      where p.id = bug_reports.project_id and p.owner_id = auth.uid()
    )
  )
  with check (
    exists (
      select 1 from public.projects p
      where p.id = bug_reports.project_id and p.owner_id = auth.uid()
    )
  );

create policy "Owners can delete their bug reports"
  on public.bug_reports for delete
  using (
    exists (
      select 1 from public.projects p
      where p.id = bug_reports.project_id and p.owner_id = auth.uid()
    )
  );

-- =========================================================
-- Auto-create a profile row when a new auth user signs up
-- =========================================================
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, name, avatar_url)
  values (
    new.id,
    coalesce(new.raw_user_meta_data ->> 'full_name', new.raw_user_meta_data ->> 'name'),
    new.raw_user_meta_data ->> 'avatar_url'
  )
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();
