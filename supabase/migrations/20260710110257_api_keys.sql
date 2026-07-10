-- Publishable ingest keys.
--
-- The widget runs in the customer's browser, so this key is shipped to end
-- users and is NOT a secret (cf. a Sentry DSN). Hashing it would be theatre:
-- anyone can read it from the bundle. It is stored in plaintext so the UI can
-- display it, and is defended by revocation + allowed_origins instead.

create table if not exists public.api_keys (
  id              uuid primary key default gen_random_uuid(),
  project_id      uuid not null references public.projects(id) on delete cascade,
  name            text not null default 'Default',
  key             text not null unique,
  environment     text not null default 'production'
                    check (environment in ('production','preview','development')),
  allowed_origins text[] not null default '{}',
  last_used_at    timestamptz,
  revoked_at      timestamptz,
  created_at      timestamptz not null default now()
);

create index if not exists api_keys_project_id_idx on public.api_keys(project_id);
create index if not exists api_keys_key_idx on public.api_keys(key) where revoked_at is null;

-- Carry the existing per-project key over so nothing that already works breaks.
insert into public.api_keys (project_id, name, key, environment)
select id, 'Default', api_key, 'production' from public.projects
on conflict (key) do nothing;

alter table public.api_keys enable row level security;

create policy "Members can view api keys" on public.api_keys
  for select using (public.is_project_member(project_id));
create policy "Owners can manage api keys" on public.api_keys
  for all
  using (exists (select 1 from public.projects p where p.id = project_id and p.owner_id = auth.uid()))
  with check (exists (select 1 from public.projects p where p.id = project_id and p.owner_id = auth.uid()));
