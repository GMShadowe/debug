-- Public ingest entry point for the widget.
--
-- SECURITY DEFINER so anon can insert without a service-role key and without
-- any direct table grant: RLS on bug_reports stays fully enforced for every
-- other caller. All validation lives here.

create or replace function public.ingest_bug_report(
  p_key     text,
  p_payload jsonb,
  p_origin  text default null
)
returns uuid
language plpgsql
volatile
security definer
set search_path = public
as $$
declare
  v_key       public.api_keys%rowtype;
  v_title     text;
  v_severity  public.bug_severity;
  v_id        uuid;
  v_logs      jsonb;
begin
  select * into v_key
  from public.api_keys
  where key = p_key and revoked_at is null;

  if not found then
    raise exception 'invalid_api_key' using errcode = '28000';
  end if;

  -- Origin allow-list. Empty array = allow any origin (dev-friendly default).
  if array_length(v_key.allowed_origins, 1) is not null
     and (p_origin is null or not (p_origin = any (v_key.allowed_origins))) then
    raise exception 'origin_not_allowed' using errcode = '42501';
  end if;

  v_title := nullif(btrim(coalesce(p_payload->>'title', '')), '');
  if v_title is null then
    raise exception 'title_required' using errcode = '22023';
  end if;
  v_title := left(v_title, 200);

  begin
    v_severity := coalesce(nullif(p_payload->>'severity', ''), 'medium')::public.bug_severity;
  exception when others then
    v_severity := 'medium';
  end;

  -- Bound the console-log payload; a runaway client must not fill the table.
  v_logs := coalesce(p_payload->'console_logs', '[]'::jsonb);
  if jsonb_typeof(v_logs) <> 'array' then
    v_logs := '[]'::jsonb;
  end if;
  if jsonb_array_length(v_logs) > 200 then
    v_logs := (select jsonb_agg(e) from (
      select e from jsonb_array_elements(v_logs) e
      offset greatest(jsonb_array_length(v_logs) - 200, 0)
    ) t);
  end if;

  insert into public.bug_reports (
    project_id, title, description, severity, screenshot_url,
    browser, os, page_url, reporter_email, viewport, device,
    console_logs, steps, metadata, fingerprint
  ) values (
    v_key.project_id,
    v_title,
    left(nullif(btrim(coalesce(p_payload->>'description','')), ''), 10000),
    v_severity,
    p_payload->>'screenshot_url',
    p_payload->>'browser',
    p_payload->>'os',
    p_payload->>'page_url',
    p_payload->>'reporter_email',
    p_payload->>'viewport',
    p_payload->>'device',
    v_logs,
    left(nullif(btrim(coalesce(p_payload->>'steps','')), ''), 5000),
    coalesce(p_payload->'metadata', '{}'::jsonb),
    md5(v_key.project_id::text || lower(v_title) || coalesce(p_payload->>'page_url',''))
  )
  returning id into v_id;

  update public.api_keys set last_used_at = now() where id = v_key.id;

  update public.projects
  set first_report_at = coalesce(first_report_at, now()),
      installed_at    = coalesce(installed_at, now())
  where id = v_key.project_id;

  return v_id;
end;
$$;

revoke all on function public.ingest_bug_report(text, jsonb, text) from public;
grant execute on function public.ingest_bug_report(text, jsonb, text) to anon, authenticated;

-- Realtime, so the onboarding "waiting for first report" screen flips live.
alter publication supabase_realtime add table public.bug_reports;
