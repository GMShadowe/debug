export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      activity: {
        Row: {
          actor_id: string | null;
          bug_report_id: string;
          created_at: string;
          data: Json;
          id: string;
          type: string;
        };
        Insert: {
          actor_id?: string | null;
          bug_report_id: string;
          created_at?: string;
          data?: Json;
          id?: string;
          type: string;
        };
        Update: {
          actor_id?: string | null;
          bug_report_id?: string;
          created_at?: string;
          data?: Json;
          id?: string;
          type?: string;
        };
        Relationships: [];
      };
      api_keys: {
        Row: {
          allowed_origins: string[];
          created_at: string;
          environment: string;
          id: string;
          key: string;
          last_used_at: string | null;
          name: string;
          project_id: string;
          revoked_at: string | null;
        };
        Insert: {
          allowed_origins?: string[];
          created_at?: string;
          environment?: string;
          id?: string;
          key: string;
          last_used_at?: string | null;
          name?: string;
          project_id: string;
          revoked_at?: string | null;
        };
        Update: {
          allowed_origins?: string[];
          created_at?: string;
          environment?: string;
          id?: string;
          key?: string;
          last_used_at?: string | null;
          name?: string;
          project_id?: string;
          revoked_at?: string | null;
        };
        Relationships: [];
      };
      bug_report_labels: {
        Row: { bug_report_id: string; label_id: string };
        Insert: { bug_report_id: string; label_id: string };
        Update: { bug_report_id?: string; label_id?: string };
        Relationships: [];
      };
      bug_reports: {
        Row: {
          assignee_id: string | null;
          browser: string | null;
          console_logs: Json;
          created_at: string;
          description: string | null;
          device: string | null;
          fingerprint: string | null;
          id: string;
          metadata: Json;
          os: string | null;
          page_url: string | null;
          project_id: string;
          reporter_email: string | null;
          resolved_at: string | null;
          screenshot_url: string | null;
          session_id: string | null;
          severity: Database["public"]["Enums"]["bug_severity"];
          status: Database["public"]["Enums"]["bug_status"];
          steps: string | null;
          title: string;
          viewport: string | null;
        };
        Insert: {
          assignee_id?: string | null;
          browser?: string | null;
          console_logs?: Json;
          created_at?: string;
          description?: string | null;
          device?: string | null;
          fingerprint?: string | null;
          id?: string;
          metadata?: Json;
          os?: string | null;
          page_url?: string | null;
          project_id: string;
          reporter_email?: string | null;
          resolved_at?: string | null;
          screenshot_url?: string | null;
          session_id?: string | null;
          severity?: Database["public"]["Enums"]["bug_severity"];
          status?: Database["public"]["Enums"]["bug_status"];
          steps?: string | null;
          title: string;
          viewport?: string | null;
        };
        Update: {
          assignee_id?: string | null;
          browser?: string | null;
          console_logs?: Json;
          created_at?: string;
          description?: string | null;
          device?: string | null;
          fingerprint?: string | null;
          id?: string;
          metadata?: Json;
          os?: string | null;
          page_url?: string | null;
          project_id?: string;
          reporter_email?: string | null;
          resolved_at?: string | null;
          screenshot_url?: string | null;
          session_id?: string | null;
          severity?: Database["public"]["Enums"]["bug_severity"];
          status?: Database["public"]["Enums"]["bug_status"];
          steps?: string | null;
          title?: string;
          viewport?: string | null;
        };
        Relationships: [];
      };
      comments: {
        Row: {
          author_id: string;
          body: string;
          bug_report_id: string;
          created_at: string;
          id: string;
          updated_at: string;
        };
        Insert: {
          author_id: string;
          body: string;
          bug_report_id: string;
          created_at?: string;
          id?: string;
          updated_at?: string;
        };
        Update: {
          author_id?: string;
          body?: string;
          bug_report_id?: string;
          created_at?: string;
          id?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      labels: {
        Row: {
          color: string;
          created_at: string;
          id: string;
          name: string;
          project_id: string;
        };
        Insert: {
          color?: string;
          created_at?: string;
          id?: string;
          name: string;
          project_id: string;
        };
        Update: {
          color?: string;
          created_at?: string;
          id?: string;
          name?: string;
          project_id?: string;
        };
        Relationships: [];
      };
      profiles: {
        Row: {
          avatar_url: string | null;
          created_at: string;
          id: string;
          name: string | null;
        };
        Insert: {
          avatar_url?: string | null;
          created_at?: string;
          id: string;
          name?: string | null;
        };
        Update: {
          avatar_url?: string | null;
          created_at?: string;
          id?: string;
          name?: string | null;
        };
        Relationships: [];
      };
      project_members: {
        Row: {
          created_at: string;
          project_id: string;
          role: string;
          user_id: string;
        };
        Insert: {
          created_at?: string;
          project_id: string;
          role?: string;
          user_id: string;
        };
        Update: {
          created_at?: string;
          project_id?: string;
          role?: string;
          user_id?: string;
        };
        Relationships: [];
      };
      projects: {
        Row: {
          api_key: string;
          created_at: string;
          domain: string | null;
          first_report_at: string | null;
          id: string;
          installed_at: string | null;
          name: string;
          owner_id: string;
          slug: string;
          widget_settings: Json;
        };
        Insert: {
          api_key?: string;
          created_at?: string;
          domain?: string | null;
          first_report_at?: string | null;
          id?: string;
          installed_at?: string | null;
          name: string;
          owner_id: string;
          slug: string;
          widget_settings?: Json;
        };
        Update: {
          api_key?: string;
          created_at?: string;
          domain?: string | null;
          first_report_at?: string | null;
          id?: string;
          installed_at?: string | null;
          name?: string;
          owner_id?: string;
          slug?: string;
          widget_settings?: Json;
        };
        Relationships: [];
      };
      sessions: {
        Row: {
          created_at: string;
          duration_ms: number;
          event_count: number;
          events_url: string | null;
          id: string;
          project_id: string;
          recorded_at: string;
        };
        Insert: {
          created_at?: string;
          duration_ms?: number;
          event_count?: number;
          events_url?: string | null;
          id?: string;
          project_id: string;
          recorded_at?: string;
        };
        Update: {
          created_at?: string;
          duration_ms?: number;
          event_count?: number;
          events_url?: string | null;
          id?: string;
          project_id?: string;
          recorded_at?: string;
        };
        Relationships: [];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      ingest_bug_report: {
        Args: { p_key: string; p_origin?: string; p_payload: Json };
        Returns: string;
      };
      is_project_member: {
        Args: { p_project_id: string };
        Returns: boolean;
      };
    };
    Enums: {
      bug_severity: "low" | "medium" | "high" | "critical";
      bug_status: "open" | "in_progress" | "resolved" | "closed";
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
}

type PublicSchema = Database["public"];

export type Profile = PublicSchema["Tables"]["profiles"]["Row"];
export type Project = PublicSchema["Tables"]["projects"]["Row"];
export type BugReport = PublicSchema["Tables"]["bug_reports"]["Row"];
export type ApiKey = PublicSchema["Tables"]["api_keys"]["Row"];
export type Label = PublicSchema["Tables"]["labels"]["Row"];
export type Comment = PublicSchema["Tables"]["comments"]["Row"];
export type Activity = PublicSchema["Tables"]["activity"]["Row"];
export type Session = PublicSchema["Tables"]["sessions"]["Row"];
export type ProjectMember = PublicSchema["Tables"]["project_members"]["Row"];

export type BugSeverity = PublicSchema["Enums"]["bug_severity"];
export type BugStatus = PublicSchema["Enums"]["bug_status"];
