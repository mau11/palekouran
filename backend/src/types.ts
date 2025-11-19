import { SelectUser } from "./db/schema";
import type { User as SupabaseUser } from "@supabase/supabase-js";

export type User = SelectUser;

export type Variables = {
  user: SupabaseUser;
  userId: string;
};
