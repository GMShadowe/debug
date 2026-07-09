import type { BugReport, BugSeverity, StatCard } from "@/types";

/**
 * Placeholder data used to render the dashboard until the reporting widget and
 * live queries are wired up. Not persisted — safe to remove later.
 */

export interface TrendPoint {
  date: string;
  reports: number;
}

// A deterministic 14-day trend so the chart is stable across renders.
const TREND_COUNTS = [4, 6, 5, 9, 7, 11, 8, 6, 12, 10, 14, 9, 13, 16];

export const MOCK_TREND: TrendPoint[] = TREND_COUNTS.map((reports, index) => {
  const date = new Date();
  date.setDate(date.getDate() - (TREND_COUNTS.length - 1 - index));
  return {
    date: date.toISOString().slice(0, 10),
    reports,
  };
});

export const MOCK_SEVERITY_BREAKDOWN: {
  severity: BugSeverity;
  count: number;
}[] = [
  { count: 5, severity: "critical" },
  { count: 18, severity: "high" },
  { count: 41, severity: "medium" },
  { count: 27, severity: "low" },
];

export const MOCK_STATS: StatCard[] = [
  {
    delta: 12,
    hint: "vs. last 30 days",
    id: "total",
    label: "Total reports",
    value: "248",
  },
  {
    delta: -4,
    hint: "vs. last 30 days",
    id: "open",
    label: "Open bugs",
    value: "37",
  },
  {
    delta: 2,
    hint: "needs attention",
    id: "critical",
    label: "Critical bugs",
    value: "5",
  },
  {
    delta: 8,
    hint: "vs. last 30 days",
    id: "fixed",
    label: "Fixed",
    value: "196",
  },
];

const PROJECT_ID = "00000000-0000-0000-0000-000000000000";

export const MOCK_REPORTS: BugReport[] = [
  {
    browser: "Safari 17.4",
    created_at: new Date(Date.now() - 1000 * 60 * 42).toISOString(),
    description:
      "Clicking “Pay now” does nothing on the final checkout step. No network request is fired and the console shows an unhandled promise rejection.",
    id: "rep_1",
    metadata: {},
    os: "macOS 14.5",
    page_url: "https://acme.com/checkout",
    project_id: PROJECT_ID,
    reporter_email: "sam@example.com",
    screenshot_url: null,
    severity: "critical",
    status: "open",
    title: "Checkout button unresponsive on Safari",
  },
  {
    browser: "Chrome 125",
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString(),
    description:
      "On tablet-width viewports the navigation sidebar overlaps the main content column, cutting off the first card in the grid.",
    id: "rep_2",
    metadata: {},
    os: "Windows 11",
    page_url: "https://acme.com/dashboard",
    project_id: PROJECT_ID,
    reporter_email: "dana@example.com",
    screenshot_url: null,
    severity: "medium",
    status: "in_progress",
    title: "Sidebar overlaps content at 1280px",
  },
  {
    browser: "Firefox 126",
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 26).toISOString(),
    description:
      "The welcome email subject reads “Wecome to Acme” — missing an L.",
    id: "rep_3",
    metadata: {},
    os: "Ubuntu 24.04",
    page_url: "https://acme.com/welcome",
    project_id: PROJECT_ID,
    reporter_email: "lee@example.com",
    screenshot_url: null,
    severity: "low",
    status: "resolved",
    title: "Typo in onboarding email subject line",
  },
  {
    browser: "Edge 125",
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 52).toISOString(),
    description:
      "Large image attachments never finish uploading and no error is surfaced to the user. The progress bar stalls at 100%.",
    id: "rep_4",
    metadata: {},
    os: "Windows 10",
    page_url: "https://acme.com/settings/profile",
    project_id: PROJECT_ID,
    reporter_email: "kai@example.com",
    screenshot_url: null,
    severity: "high",
    status: "open",
    title: "Uploads over 5MB silently fail",
  },
  {
    browser: "Chrome 124",
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 24 * 4).toISOString(),
    description:
      "The theme preference is not persisted; the app reverts to light mode after a hard refresh.",
    id: "rep_5",
    metadata: {},
    os: "macOS 13.6",
    page_url: "https://acme.com/settings",
    project_id: PROJECT_ID,
    reporter_email: "morgan@example.com",
    screenshot_url: null,
    severity: "low",
    status: "closed",
    title: "Dark mode toggle resets on reload",
  },
  {
    browser: "Safari 16.6",
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 24 * 6).toISOString(),
    description:
      "Applying a status filter shows results from the previous query for a moment before updating.",
    id: "rep_6",
    metadata: {},
    os: "iOS 17",
    page_url: "https://acme.com/reports",
    project_id: PROJECT_ID,
    reporter_email: "robin@example.com",
    screenshot_url: null,
    severity: "medium",
    status: "in_progress",
    title: "Search returns stale results after filter change",
  },
];

export function getMockReport(id: string): BugReport | undefined {
  return MOCK_REPORTS.find((report) => report.id === id);
}
