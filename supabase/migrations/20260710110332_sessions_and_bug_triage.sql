-- Session replay. Events live in Storage; the row is the index.
create table if not exists public.sessions (
  id           uuid primary key default gen_random_uuid(),
  project_id   uuid not null references public.projects(id) on delete cascade,
  events_url   text,
  duration_ms  integer not null default 0,
  event_count  integer not null default 0,
  recorded_at  timestamptz not null default now(),
  created_at   timestamptz not null default now()
);
create index if not exists sessions_project_id_idx on public.sessions(project_id);

alter table public.sessions enable row level security;
create policy "Members can view sessions" on public.sessions
  for select using (public.is_project_member(project_id));
create policy "Members can manage sessions" on public.sessions
  for all using (public.is_project_member(project_id)) with check (public.is_project_member(project_id));

-- Triage + richer capture on bug reports.
alter table public.bug_reports
  add column if not exists assignee_id  uuid references auth.users(id) on delete set null,
  add column if not exists session_id   uuid references public.sessions(id) on delete set null,
  add column if not exists viewport     text,
  add column if not exists device        text,
  add column if not exists console_logs jsonb not null default '[]'::jsonb,
  add column if not exists steps         text,
  -- Stable hash of (project, normalised title, page_url) so repeat reports of
  -- the same defect can be grouped instead of flooding the inbox.
  add column if not exists fingerprint  text,
  add column if not exists resolved_at  timestamptz;

create index if not exists bug_reports_project_created_idx on public.bug_reports(project_id, created_at desc);
create index if not exists bug_reports_fingerprint_idx     on public.bug_reports(project_id, fingerprint);
create index if not exists bug_reports_assignee_idx        on public.bug_reports(assignee_id);

-- Labels (per project).
create table if not exists public.labels (
  id         uuid primary key default gen_random_uuid(),
  project_id uuid not null references public.projects(id) on delete cascade,
  name       text not null,
  color      text not null default 'neutral',
  created_at timestamptz not null default now(),
  unique (project_id, name)
);
alter table public.labels enable row level security;
create policy "Members can view labels" on public.labels
  for select using (public.is_project_member(project_id));
create policy "Members can manage labels" on public.labels
  for all using (public.is_project_member(project_id)) with check (public.is_project_member(project_id));

create table if not exists public.bug_report_labels (
  bug_report_id uuid not null references public.bug_reports(id) on delete cascade,
  label_id      uuid not null references public.labels(id) on delete cascade,
  primary key (bug_report_id, label_id)
);
alter table public.bug_report_labels enable row level security;
create policy "Members can view bug labels" on public.bug_report_labels
  for select using (exists (
    select 1 from public.bug_reports b where b.id = bug_report_id and public.is_project_member(b.project_id)));
create policy "Members can manage bug labels" on public.bug_report_labels
  for all using (exists (
    select 1 from public.bug_reports b where b.id = bug_report_id and public.is_project_member(b.project_id)))
  with check (exists (
    select 1 from public.bug_reports b where b.id = bug_report_id and public.is_project_member(b.project_id)));

-- Comments.
create table if not exists public.comments (
  id            uuid primary key default gen_random_uuid(),
  bug_report_id uuid not null references public.bug_reports(id) on delete cascade,
  author_id     uuid not null references auth.users(id) on delete cascade,
  body          text not null check (length(trim(body)) > 0),
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now()
);
create index if not exists comments_bug_report_idx on public.comments(bug_report_id, created_at);
alter table public.comments enable row level security;
create policy "Members can view comments" on public.comments
  for select using (exists (
    select 1 from public.bug_reports b where b.id = bug_report_id and public.is_project_member(b.project_id)));
create policy "Members can write comments" on public.comments
  for insert with check (author_id = auth.uid() and exists (
    select 1 from public.bug_reports b where b.id = bug_report_id and public.is_project_member(b.project_id)));
create policy "Authors can edit own comments" on public.comments
  for update using (author_id = auth.uid()) with check (author_id = auth.uid());
create policy "Authors can delete own comments" on public.comments
  for delete using (author_id = auth.uid());

-- Activity timeline. Append-only: no update/delete policy on purpose.
create table if not exists public.activity (
  id            uuid primary key default gen_random_uuid(),
  bug_report_id uuid not null references public.bug_reports(id) on delete cascade,
  actor_id      uuid references auth.users(id) on delete set null,
  type          text not null,
  data          jsonb not null default '{}'::jsonb,
  created_at    timestamptz not null default now()
);
create index if not exists activity_bug_report_idx on public.activity(bug_report_id, created_at);
alter table public.activity enable row level security;
create policy "Members can view activity" on public.activity
  for select using (exists (
    select 1 from public.bug_reports b where b.id = bug_report_id and public.is_project_member(b.project_id)));
create policy "Members can append activity" on public.activity
  for insert with check (exists (
    select 1 from public.bug_reports b where b.id = bug_report_id and public.is_project_member(b.project_id)));
