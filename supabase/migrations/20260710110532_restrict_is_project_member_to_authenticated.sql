-- Supabase's default privileges grant EXECUTE on new public functions to anon.
-- REVOKE ... FROM PUBLIC does not remove that explicit role grant, so revoke it
-- by name. is_project_member is an RLS helper and must never be part of the
-- anonymous API surface. (ingest_bug_report keeps anon EXECUTE by design.)
revoke execute on function public.is_project_member(uuid) from anon;
