-- Multi-project support + membership model.
-- Assignees, and eventually teams, need a subject to assign to; owner_id alone
-- can never express that. RLS moves from "is owner" to "is member".

-- 1. A user may own many projects.
alter table public.projects drop constraint projects_owner_id_unique;

-- 2. Human-readable, per-owner-unique slug for URLs (/dashboard/<slug>/bugs).
alter table public.projects add column if not exists slug text;

update public.projects
set slug = trim(both '-' from lower(regexp_replace(name, '[^a-zA-Z0-9]+', '-', 'g')))
where slug is null;

-- Disambiguate any collisions produced by the backfill before enforcing uniqueness.
with dupes as (
  select id, row_number() over (partition by owner_id, slug order by created_at) as rn
  from public.projects
)
update public.projects p
set slug = p.slug || '-' || d.rn
from dupes d
where p.id = d.id and d.rn > 1;

alter table public.projects alter column slug set not null;
alter table public.projects add constraint projects_owner_slug_unique unique (owner_id, slug);

-- 3. Installation / activity signals, so the app can tell "installed" from "waiting".
alter table public.projects add column if not exists installed_at timestamptz;
alter table public.projects add column if not exists first_report_at timestamptz;

-- 4. Membership.
create table if not exists public.project_members (
  project_id uuid not null references public.projects(id) on delete cascade,
  user_id    uuid not null references auth.users(id) on delete cascade,
  role       text not null default 'member' check (role in ('owner','admin','member')),
  created_at timestamptz not null default now(),
  primary key (project_id, user_id)
);

create index if not exists project_members_user_id_idx on public.project_members(user_id);

-- Backfill existing owners as members.
insert into public.project_members (project_id, user_id, role)
select id, owner_id, 'owner' from public.projects
on conflict do nothing;

alter table public.project_members enable row level security;

-- 5. Membership check as SECURITY DEFINER to avoid RLS recursion when a
--    project_members policy needs to read project_members.
create or replace function public.is_project_member(p_project_id uuid)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1 from public.project_members m
    where m.project_id = p_project_id and m.user_id = auth.uid()
  );
$$;

revoke all on function public.is_project_member(uuid) from public;
grant execute on function public.is_project_member(uuid) to authenticated;

-- 6. Re-point policies at membership.
drop policy if exists "Owners can view their project"   on public.projects;
drop policy if exists "Owners can update their project" on public.projects;
drop policy if exists "Owners can delete their project" on public.projects;
drop policy if exists "Owners can create their project" on public.projects;

create policy "Members can view their projects" on public.projects
  for select using (public.is_project_member(id));
create policy "Owners can create projects" on public.projects
  for insert with check (auth.uid() = owner_id);
create policy "Owners can update their projects" on public.projects
  for update using (auth.uid() = owner_id) with check (auth.uid() = owner_id);
create policy "Owners can delete their projects" on public.projects
  for delete using (auth.uid() = owner_id);

create policy "Members can view membership" on public.project_members
  for select using (public.is_project_member(project_id));
create policy "Owners can manage membership" on public.project_members
  for all
  using (exists (select 1 from public.projects p where p.id = project_id and p.owner_id = auth.uid()))
  with check (exists (select 1 from public.projects p where p.id = project_id and p.owner_id = auth.uid()));

drop policy if exists "Owners can view their bug reports"             on public.bug_reports;
drop policy if exists "Owners can update their bug reports"           on public.bug_reports;
drop policy if exists "Owners can delete their bug reports"           on public.bug_reports;
drop policy if exists "Owners can insert bug reports for their project" on public.bug_reports;

create policy "Members can view bug reports" on public.bug_reports
  for select using (public.is_project_member(project_id));
create policy "Members can insert bug reports" on public.bug_reports
  for insert with check (public.is_project_member(project_id));
create policy "Members can update bug reports" on public.bug_reports
  for update using (public.is_project_member(project_id)) with check (public.is_project_member(project_id));
create policy "Members can delete bug reports" on public.bug_reports
  for delete using (public.is_project_member(project_id));
