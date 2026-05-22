export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          locale: string;
          display_name: string | null;
          city: string | null;
          country: string | null;
          education_level: string | null;
          device_access: string | null;
          daily_time_budget: string | null;
          work_mode: string | null;
          income_urgency: string | null;
          languages: string[];
          skills: string[];
          constraints: string | null;
          onboarding_completed: boolean;
          subscription_status: string;
          created_at: string;
          updated_at: string;
        };
        Insert: Partial<Database["public"]["Tables"]["profiles"]["Row"]> & { id: string };
        Update: Partial<Database["public"]["Tables"]["profiles"]["Row"]>;
      };
      user_plans: {
        Row: {
          id: string;
          user_id: string;
          profile_snapshot: Json;
          best_route_id: string | null;
          route_scores: Json;
          timeline: Json;
          application_message: string | null;
          cv_summary: string | null;
          status: string;
          created_at: string;
          updated_at: string;
        };
        Insert: Partial<Database["public"]["Tables"]["user_plans"]["Row"]> & { user_id: string; profile_snapshot: Json };
        Update: Partial<Database["public"]["Tables"]["user_plans"]["Row"]>;
      };
    };
  };
}

