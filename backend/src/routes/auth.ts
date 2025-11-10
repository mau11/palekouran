// referenced: https://github.com/CarlosZiegler/hono-supabase
// https://supabase.com/docs/reference/javascript/auth-api
import { Hono } from "hono";
import { supabase, supabaseAdmin } from "@lib/supabase";
import { db } from "@db/client";
import { usersTable as users } from "@db/schema";
import { eq } from "drizzle-orm";

const auth = new Hono();

// sign up
auth.post("/signup", async (c) => {
  try {
    const { email, password, username } = await c.req.json();
    if (!email || !password || !username) {
      return c.json({ error: "Email, password, and username required" }, 400);
    }

    // check if username exists
    const existingUser = await db
      .select()
      .from(users)
      .where(eq(users.username, username))
      .limit(1);
    if (existingUser.length > 0) {
      return c.json({ error: "Username already taken" }, 400);
    }

    // add user to supabase auth
    const { data: authData, error: authError } =
      await supabaseAdmin.auth.admin.createUser({
        email,
        password,
        email_confirm: true, // autoconfirm for dev
      });
    if (authError) {
      return c.json({ error: authError.message }, 400);
    }

    // add user to db
    const [user] = await db
      .insert(users)
      .values({
        id: authData.user.id,
        email: authData.user.email,
        username,
      })
      .returning();

    // sign in to start session
    const { data: sessionData, error: sessionError } =
      await supabase.auth.signInWithPassword({
        email,
        password,
      });
    if (sessionError || !sessionData.session) {
      return c.json({ error: "User created, but login failed" }, 500);
    }

    return c.json(
      {
        user: {
          id: user.id,
          email: user.email,
          username: user.username,
        },
        session: sessionData.session,
      },
      201
    );
  } catch (error) {
    console.error("Sign up error:", error);
    return c.json({ error: "Server error" }, 500);
  }
});

// sign in
auth.post("/signin", async (c) => {
  try {
    const { email, password } = await c.req.json();
    if (!email || !password) {
      return c.json({ error: "Email and password required" }, 400);
    }

    // check credentials w/supabase + start session
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) {
      return c.json({ error: "Invalid email or password" }, 401);
    }

    // get user data from db
    const [user] = await db
      .select()
      .from(users)
      .where(eq(users.id, data.user.id));
    if (!user) {
      return c.json({ error: "User not found" }, 404);
    }

    return c.json({
      user: {
        id: user.id,
        email: user.email,
        username: user.username,
      },
      session: data.session,
    });
  } catch (error) {
    console.error("Signin error:", error);
    return c.json({ error: "Server error" }, 500);
  }
});

// sign out
auth.post("/signout", async (c) => {
  try {
    const authHeader = c.req.header("Authorization");
    if (!authHeader) {
      return c.json({ error: "No token provided" }, 401);
    }

    const token = authHeader.replace("Bearer ", "");

    const { error } = await supabase.auth.admin.signOut(token);
    if (error) {
      return c.json({ error: error.message }, 400);
    }

    return c.json({ message: "Signed out successfully" });
  } catch (error) {
    console.error("Signout error:", error);
    return c.json({ error: "Server error" }, 500);
  }
});

export default auth;
