export type {
  Activity,
  ApiKey,
  BugReport,
  BugSeverity,
  BugStatus,
  Comment,
  Label,
  Profile,
  Project,
  ProjectMember,
  Session,
} from "./database";

/** A console entry captured by the widget alongside a report. */
export interface ConsoleLog {
  level: "log" | "info" | "warn" | "error";
  message: string;
  timestamp?: string;
}
