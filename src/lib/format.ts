import { formatDistanceToNowStrict } from "date-fns";

const NAME_SEPARATORS = /[\s._-]+/;

/** "3 hours ago" style relative time from an ISO timestamp. */
export function relativeTime(iso: string): string {
  return formatDistanceToNowStrict(new Date(iso), { addSuffix: true });
}

/** Masks an API key, revealing only a short prefix. */
export function maskApiKey(key: string): string {
  if (key.length <= 10) {
    return "•".repeat(key.length);
  }
  const prefix = key.slice(0, 7);
  return `${prefix}${"•".repeat(24)}`;
}

/** Builds up-to-two-letter initials from a name or email. */
export function initials(source: string | null | undefined): string {
  if (!source) {
    return "?";
  }
  const base = source.includes("@") ? source.split("@")[0] : source;
  const parts = base.trim().split(NAME_SEPARATORS).filter(Boolean);
  if (parts.length === 0) {
    return "?";
  }
  if (parts.length === 1) {
    return parts[0].slice(0, 2).toUpperCase();
  }
  return (parts[0][0] + parts[1][0]).toUpperCase();
}
