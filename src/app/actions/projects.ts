"use server";

import { redirect } from "next/navigation";

import { createClient } from "@/lib/supabase/server";

type ActionState = { error: string } | undefined;

const NON_SLUG_CHARS = /[^a-z0-9]+/g;
const EDGE_DASHES = /^-+|-+$/g;

function slugify(value: string): string {
  return value
    .toLowerCase()
    .replace(NON_SLUG_CHARS, "-")
    .replace(EDGE_DASHES, "");
}

export async function createProject(
  _prevState: ActionState,
  formData: FormData
): Promise<ActionState> {
  const name = String(formData.get("name") ?? "").trim();
  const domain = String(formData.get("domain") ?? "").trim();

  if (!name) {
    return { error: "Please give your project a name." };
  }

  const baseSlug = slugify(name) || "project";

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/auth");
  }

  // Narrowing from the guard above does not survive into the closure below.
  const ownerId = user.id;

  // Slugs are unique per owner. Rely on the unique constraint rather than a
  // pre-flight SELECT, so two concurrent creates cannot both pass the check.
  async function insertProject(candidate: string) {
    return await supabase
      .from("projects")
      .insert({
        domain: domain || null,
        name,
        owner_id: ownerId,
        slug: candidate,
      })
      .select("id")
      .single();
  }

  let slug = baseSlug;
  let result = await insertProject(slug);

  // 23505 = unique_violation. One retry with a random suffix is enough; a
  // second collision would mean a 4-byte UUID prefix repeated for one owner.
  if (result.error?.code === "23505") {
    slug = `${baseSlug}-${crypto.randomUUID().slice(0, 4)}`;
    result = await insertProject(slug);
  }

  if (result.error) {
    return { error: result.error.message };
  }

  const projectId = result.data.id;

  // The owner is the first member; assignment and RLS both key off membership.
  await supabase
    .from("project_members")
    .insert({ project_id: projectId, role: "owner", user_id: ownerId });

  // Mint the publishable ingest key the widget will use.
  const key = `lmn_pk_${crypto.randomUUID().replaceAll("-", "")}`;
  await supabase.from("api_keys").insert({
    environment: "production",
    key,
    name: "Default",
    project_id: projectId,
  });

  redirect(`/dashboard/${slug}/install`);
}
