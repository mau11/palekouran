import { Context, Next } from "hono";
import { supabaseAdmin } from "@lib/supabase";
import { Variables } from "../types";

export const requireAuth = async (
  c: Context<{ Variables: Variables }>,
  next: Next
) => {
  const authHeader = c.req.header("Authorization");

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return c.json({ error: "Unauthorized. No token provided" }, 401);
  }

  const token = authHeader.replace("Bearer ", "");

  // verify token with supabase
  const { data, error } = await supabaseAdmin.auth.getUser(token);

  if (error || !data.user) {
    return c.json({ error: "Invalid token" }, 401);
  }

  c.set("user", data.user);
  c.set("userId", data.user.id);
  await next();
};
