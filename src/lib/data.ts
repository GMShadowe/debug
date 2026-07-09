import "server-only";

import { cache } from "react";

import { createClient } from "@/lib/supabase/server";
import type { Profile, Project } from "@/types";

/**
 * Server-side data access. These wrap the authenticated Supabase client and are
 * `cache()`-wrapped so they can be called from multiple Server Components in a
 * single render without re-fetching.
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
  const {
    data: { user },
  } = await supabase.auth.getUser();
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

/**
 * Returns the current user's single project (free tier = one per owner), or
 * null if they haven't created one yet.
 */
export const getUserProject = cache(async (): Promise<Project | null> => {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    return null;
  }

  const { data } = await supabase
    .from("projects")
    .select("*")
    .eq("owner_id", user.id)
    .maybeSingle();

  return data;
});
