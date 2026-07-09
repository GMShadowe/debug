"use server";

import { redirect } from "next/navigation";

import { createClient } from "@/lib/supabase/server";

type ActionState = { error: string } | undefined;

export async function createProject(
  _prevState: ActionState,
  formData: FormData
): Promise<ActionState> {
  const name = String(formData.get("name") ?? "").trim();
  const domain = String(formData.get("domain") ?? "").trim();

  if (!name) {
    return { error: "Please give your project a name." };
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/auth");
  }

  // Free tier: one project per owner. Bail out if one already exists.
  const { data: existing } = await supabase
    .from("projects")
    .select("id")
    .eq("owner_id", user.id)
    .maybeSingle();

  if (existing) {
    redirect("/dashboard");
  }

  const { error } = await supabase.from("projects").insert({
    domain: domain || null,
    name,
    owner_id: user.id,
  });

  if (error) {
    return { error: error.message };
  }

  redirect("/dashboard");
}
