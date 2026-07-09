export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.5";
  };
  public: {
    Tables: {
      bug_reports: {
        Row: {
          browser: string | null;
          created_at: string;
          description: string | null;
          id: string;
          metadata: Json;
          os: string | null;
          page_url: string | null;
          project_id: string;
          reporter_email: string | null;
          screenshot_url: string | null;
          severity: Database["public"]["Enums"]["bug_severity"];
          status: Database["public"]["Enums"]["bug_status"];
          title: string;
        };
        Insert: {
          browser?: string | null;
          created_at?: string;
          description?: string | null;
          id?: string;
          metadata?: Json;
          os?: string | null;
          page_url?: string | null;
          project_id: string;
          reporter_email?: string | null;
          screenshot_url?: string | null;
          severity?: Database["public"]["Enums"]["bug_severity"];
          status?: Database["public"]["Enums"]["bug_status"];
          title: string;
        };
        Update: {
          browser?: string | null;
          created_at?: string;
          description?: string | null;
          id?: string;
          metadata?: Json;
          os?: string | null;
          page_url?: string | null;
          project_id?: string;
          reporter_email?: string | null;
          screenshot_url?: string | null;
          severity?: Database["public"]["Enums"]["bug_severity"];
          status?: Database["public"]["Enums"]["bug_status"];
          title?: string;
        };
        Relationships: [
          {
            foreignKeyName: "bug_reports_project_id_fkey";
            columns: ["project_id"];
            isOneToOne: false;
            referencedRelation: "projects";
            referencedColumns: ["id"];
          },
        ];
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
      projects: {
        Row: {
          api_key: string;
          created_at: string;
          domain: string | null;
          id: string;
          name: string;
          owner_id: string;
          widget_settings: Json;
        };
        Insert: {
          api_key?: string;
          created_at?: string;
          domain?: string | null;
          id?: string;
          name: string;
          owner_id: string;
          widget_settings?: Json;
        };
        Update: {
          api_key?: string;
          created_at?: string;
          domain?: string | null;
          id?: string;
          name?: string;
          owner_id?: string;
          widget_settings?: Json;
        };
        Relationships: [];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
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

export type BugSeverity = PublicSchema["Enums"]["bug_severity"];
export type BugStatus = PublicSchema["Enums"]["bug_status"];
