import "server-only";

import { cache } from "react";

import { createClient } from "@/lib/supabase/server";
import type {
  Activity,
  ApiKey,
  BugReport,
  BugSeverity,
  BugStatus,
  Comment,
  Profile,
  Project,
} from "@/types";

/**
 * Server-side data access. Everything here uses the authenticated Supabase
 * client, so row-level security — not application code — is what scopes a query
 * to the caller's projects. `cache()` dedupes within a single render pass.
 */

export const getCurrentUser = cache(async () => {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return user;
});

export const getProfile = cache(async (): Promise<Profile | null> => {
  const supabase = await createClient();
  const user = await getCurrentUser();
  if (!user) {
    return null;
  }

  const { data } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .maybeSingle();

  return data;
});

/** Every project the caller can see, oldest first. Drives the switcher. */
export const getProjects = cache(async (): Promise<Project[]> => {
  const supabase = await createClient();
  const { data } = await supabase
    .from("projects")
    .select("*")
    .order("created_at", { ascending: true });

  return data ?? [];
});

export const getProjectBySlug = cache(
  async (slug: string): Promise<Project | null> => {
    const supabase = await createClient();
    const { data } = await supabase
      .from("projects")
      .select("*")
      .eq("slug", slug)
      .maybeSingle();

    return data;
  }
);

export interface BugFilters {
  q?: string;
  severity?: BugSeverity;
  status?: BugStatus;
}

/**
 * Filters run in Postgres rather than in the client, so the list stays correct
 * once a project holds more reports than a single page can show.
 */
export const getBugs = cache(
  async (projectId: string, filters: BugFilters = {}): Promise<BugReport[]> => {
    const supabase = await createClient();
    let query = supabase
      .from("bug_reports")
      .select("*")
      .eq("project_id", projectId)
      .order("created_at", { ascending: false })
      .limit(200);

    if (filters.status) {
      query = query.eq("status", filters.status);
    }
    if (filters.severity) {
      query = query.eq("severity", filters.severity);
    }
    if (filters.q) {
      // `,` and `)` terminate a PostgREST `or` group — strip them so a search
      // term cannot break out of the filter expression.
      const term = filters.q.replaceAll(",", " ").replaceAll(")", " ");
      query = query.or(`title.ilike.%${term}%,description.ilike.%${term}%`);
    }

    const { data } = await query;
    return data ?? [];
  }
);

export interface BugCounts {
  byStatus: Record<BugStatus, number>;
  total: number;
}

/**
 * Counts for every status, not just a favoured few — a filter bar that labels
 * some options with a number and others without is telling the reader those
 * options are different in kind, when they are not.
 */
export const getBugCounts = cache(
  async (projectId: string): Promise<BugCounts> => {
    const supabase = await createClient();
    const base = () =>
      supabase
        .from("bug_reports")
        .select("id", { count: "exact", head: true })
        .eq("project_id", projectId);

    const [total, open, inProgress, resolved, closed] = await Promise.all([
      base(),
      base().eq("status", "open"),
      base().eq("status", "in_progress"),
      base().eq("status", "resolved"),
      base().eq("status", "closed"),
    ]);

    return {
      byStatus: {
        closed: closed.count ?? 0,
        in_progress: inProgress.count ?? 0,
        open: open.count ?? 0,
        resolved: resolved.count ?? 0,
      },
      total: total.count ?? 0,
    };
  }
);

export const getBug = cache(async (id: string): Promise<BugReport | null> => {
  const supabase = await createClient();
  const { data } = await supabase
    .from("bug_reports")
    .select("*")
    .eq("id", id)
    .maybeSingle();

  return data;
});

/** Newest first — the latest note is the one anyone opening a report wants. */
export const getComments = cache(async (bugId: string): Promise<Comment[]> => {
  const supabase = await createClient();
  const { data } = await supabase
    .from("comments")
    .select("*")
    .eq("bug_report_id", bugId)
    .order("created_at", { ascending: false });

  return data ?? [];
});

export const getActivity = cache(async (bugId: string): Promise<Activity[]> => {
  const supabase = await createClient();
  const { data } = await supabase
    .from("activity")
    .select("*")
    .eq("bug_report_id", bugId)
    .order("created_at", { ascending: true });

  return data ?? [];
});

export const getApiKeys = cache(
  async (projectId: string): Promise<ApiKey[]> => {
    const supabase = await createClient();
    const { data } = await supabase
      .from("api_keys")
      .select("*")
      .eq("project_id", projectId)
      .is("revoked_at", null)
      .order("created_at", { ascending: true });

    return data ?? [];
  }
);
