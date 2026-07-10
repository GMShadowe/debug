"use server";

import { revalidatePath } from "next/cache";

import { createClient } from "@/lib/supabase/server";
import type { BugSeverity, BugStatus } from "@/types";

type ActionResult = { error: string } | { ok: true };

/**
 * Every mutation appends to `activity` in the same request. The timeline is a
 * derived record of what happened, not something the UI fabricates at render.
 */
async function recordActivity(
  bugId: string,
  type: string,
  data: Record<string, string | null>
) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  await supabase.from("activity").insert({
    actor_id: user?.id ?? null,
    bug_report_id: bugId,
    data,
    type,
  });
}

export async function updateBugStatus(
  bugId: string,
  status: BugStatus
): Promise<ActionResult> {
  const supabase = await createClient();

  const { data: before } = await supabase
    .from("bug_reports")
    .select("status")
    .eq("id", bugId)
    .maybeSingle();

  if (!before) {
    return { error: "Report not found." };
  }
  if (before.status === status) {
    return { ok: true };
  }

  const { error } = await supabase
    .from("bug_reports")
    .update({
      resolved_at: status === "resolved" ? new Date().toISOString() : null,
      status,
    })
    .eq("id", bugId);

  if (error) {
    return { error: error.message };
  }

  await recordActivity(bugId, "status_changed", {
    from: before.status,
    to: status,
  });

  revalidatePath("/dashboard", "layout");
  return { ok: true };
}

export async function updateBugSeverity(
  bugId: string,
  severity: BugSeverity
): Promise<ActionResult> {
  const supabase = await createClient();

  const { data: before } = await supabase
    .from("bug_reports")
    .select("severity")
    .eq("id", bugId)
    .maybeSingle();

  if (!before) {
    return { error: "Report not found." };
  }
  if (before.severity === severity) {
    return { ok: true };
  }

  const { error } = await supabase
    .from("bug_reports")
    .update({ severity })
    .eq("id", bugId);

  if (error) {
    return { error: error.message };
  }

  await recordActivity(bugId, "severity_changed", {
    from: before.severity,
    to: severity,
  });

  revalidatePath("/dashboard", "layout");
  return { ok: true };
}

export async function assignBug(
  bugId: string,
  assigneeId: string | null
): Promise<ActionResult> {
  const supabase = await createClient();

  const { error } = await supabase
    .from("bug_reports")
    .update({ assignee_id: assigneeId })
    .eq("id", bugId);

  if (error) {
    return { error: error.message };
  }

  await recordActivity(bugId, assigneeId ? "assigned" : "unassigned", {
    assignee_id: assigneeId,
  });

  revalidatePath("/dashboard", "layout");
  return { ok: true };
}

/**
 * Deleting a note is authorised by RLS ("Authors can delete own comments"), not
 * by this function — a non-author's DELETE simply matches zero rows. We ask for
 * the deleted id back so that "matched nothing" surfaces as an error instead of
 * a silent no-op that looks like success.
 */
export async function deleteComment(commentId: string): Promise<ActionResult> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("comments")
    .delete()
    .eq("id", commentId)
    .select("id");

  if (error) {
    return { error: error.message };
  }
  if (!data || data.length === 0) {
    return { error: "You can only delete your own notes." };
  }

  revalidatePath("/dashboard", "layout");
  return { ok: true };
}

export async function addComment(
  bugId: string,
  formData: FormData
): Promise<ActionResult> {
  const body = String(formData.get("body") ?? "").trim();
  if (!body) {
    return { error: "Write something first." };
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { error: "You must be signed in to comment." };
  }

  const { error } = await supabase
    .from("comments")
    .insert({ author_id: user.id, body, bug_report_id: bugId });

  if (error) {
    return { error: error.message };
  }

  revalidatePath("/dashboard", "layout");
  return { ok: true };
}
