export type {
  BugReport,
  BugSeverity,
  BugStatus,
  Profile,
  Project,
} from "./database";

export interface StatCard {
  /** Percentage change vs. the previous period, e.g. +12. */
  delta?: number;
  hint?: string;
  id: string;
  label: string;
  value: string;
}
