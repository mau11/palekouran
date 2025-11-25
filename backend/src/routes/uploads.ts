// referenced: https://github.com/CarlosZiegler/hono-supabase
// https://supabase.com/docs/reference/javascript/auth-api

import { Hono } from "hono";
import { supabaseAdmin } from "@lib/supabase";
import { Variables } from "../types";
import { requireAuth } from "../middleware/requireAuth";

const uploads = new Hono<{ Variables: Variables }>();

const AUDIO_BUCKET = "pronunciations";

uploads.post("/audio/:deckId", requireAuth, async (c) => {
  try {
    const userId = c.get("userId");
    const deckId = c.req.param("deckId");

    const formData = await c.req.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return c.json({ error: "Missing audio file" }, 400);
    }

    const path = `${userId}/${deckId}/`;

    const { data, error } = await supabaseAdmin.storage
      .from(AUDIO_BUCKET)
      .upload(path, file, { upsert: true });

    if (error) {
      return c.json({ error: error.message }, 400);
    }

    const publicUrl = supabaseAdmin.storage
      .from("pronunciations")
      .getPublicUrl(path);

    return c.json(
      { message: "Audio uploaded", data: publicUrl.data.publicUrl },
      200
    );
  } catch (err) {
    console.error("Error uploading audio", err);
    return c.json({ error: "Server error" }, 500);
  }
});

export default uploads;
