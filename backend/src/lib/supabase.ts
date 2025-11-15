// https://supabase.com/docs/reference/javascript/initializing
import { createClient } from "@supabase/supabase-js";
import "dotenv/config";

if (!process.env.SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
  throw new Error("Missing required environment variables");
}

const url = process.env.SUPABASE_URL!;
const publicKey = process.env.SUPABASE_PUBLISHABLE_KEY!;
const secretKey = process.env.SUPABASE_SECRET_KEY!;

// public (for client-side operations)
export const supabase = createClient(url, publicKey);

// admin (for server-side operations)
export const supabaseAdmin = createClient(url, secretKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
  },
});
