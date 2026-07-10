import { createClient } from "@supabase/supabase-js";
import { type NextRequest, NextResponse } from "next/server";

import type { Database, Json } from "@/types/database";

/**
 * Public ingest endpoint for the Lumen widget.
 *
 * The widget runs on the customer's origin, so this route is cross-origin and
 * unauthenticated. It never touches a table directly: it forwards to the
 * `ingest_bug_report` SECURITY DEFINER function, which owns key validation,
 * origin checks, and payload bounds. That keeps RLS enforced for every other
 * caller and means this route needs no service-role key.
 */

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

const MAX_BODY_BYTES = 512 * 1024;

function corsHeaders(origin: string | null) {
  return {
    "Access-Control-Allow-Headers": "content-type, x-lumen-key",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    // The key is publishable and the function does its own origin allow-list,
    // so reflecting the origin here is safe and keeps setup zero-config.
    "Access-Control-Allow-Origin": origin ?? "*",
    Vary: "Origin",
  };
}

export function OPTIONS(request: NextRequest) {
  return new NextResponse(null, {
    headers: corsHeaders(request.headers.get("origin")),
    status: 204,
  });
}

export async function POST(request: NextRequest) {
  const origin = request.headers.get("origin");
  const cors = corsHeaders(origin);

  if (!(SUPABASE_URL && SUPABASE_ANON_KEY)) {
    return NextResponse.json(
      { error: "server_misconfigured" },
      { headers: cors, status: 500 }
    );
  }

  const apiKey =
    request.headers.get("x-lumen-key") ??
    request.nextUrl.searchParams.get("key");

  if (!apiKey) {
    return NextResponse.json(
      { error: "missing_api_key" },
      { headers: cors, status: 401 }
    );
  }

  const rawBody = await request.text();
  if (rawBody.length > MAX_BODY_BYTES) {
    return NextResponse.json(
      { error: "payload_too_large" },
      { headers: cors, status: 413 }
    );
  }

  let payload: Json;
  try {
    payload = JSON.parse(rawBody) as Json;
  } catch {
    return NextResponse.json(
      { error: "invalid_json" },
      { headers: cors, status: 400 }
    );
  }

  const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_ANON_KEY, {
    auth: { persistSession: false },
  });

  const { data, error } = await supabase.rpc("ingest_bug_report", {
    p_key: apiKey,
    // A same-origin or server-side caller sends no Origin header. Pass undefined
    // so the SQL default (null) applies and the allow-list check still runs.
    p_origin: origin ?? undefined,
    p_payload: payload,
  });

  if (error) {
    // The function raises named exceptions; map them to honest status codes
    // instead of collapsing everything into a 500.
    const status = (() => {
      if (error.message.includes("invalid_api_key")) {
        return 401;
      }
      if (error.message.includes("origin_not_allowed")) {
        return 403;
      }
      if (error.message.includes("title_required")) {
        return 422;
      }
      return 500;
    })();

    const code =
      status === 500 ? "ingest_failed" : error.message.split("\n")[0];
    return NextResponse.json({ error: code }, { headers: cors, status });
  }

  return NextResponse.json(
    { id: data, ok: true },
    { headers: cors, status: 201 }
  );
}
