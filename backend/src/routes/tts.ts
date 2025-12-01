// referenced: https://github.com/CarlosZiegler/hono-supabase
// https://supabase.com/docs/reference/javascript/auth-api

import { Hono } from "hono";
import { supabaseAdmin } from "@lib/supabase";
import { Variables } from "../types";
import { requireAuth } from "../middleware/requireAuth";
import { eq } from "drizzle-orm";
import { db } from "@db/client";
import { cardsTable, ttsAudioTable } from "@db/schema";
import { getTts } from "@db/queries/select";
import { generateAudio, VOICE_ID } from "@lib/elevenLabs";
import { buffer } from "stream/consumers";

const tts = new Hono<{ Variables: Variables }>();

export const AUDIO_BUCKET = "tts";

tts.post("/", requireAuth, async (c) => {
  try {
    const { text, language, cardId } = await c.req.json();

    if (!text || !language) {
      return c.json({ error: "Text and language required" }, 400);
    }

    // check if tts audio already exists for text
    const existing = await getTts(text.toLowerCase(), language);

    if (existing.length > 0) {
      const { data: signedUrl } = await supabaseAdmin.storage
        .from(AUDIO_BUCKET)
        .createSignedUrl(existing[0].audioUrl, 3600);

      // if cardId provided, link existing TTS to card
      if (cardId && cardId !== "new") {
        await db
          .update(cardsTable)
          .set({ ttsAudioId: existing[0].id })
          .where(eq(cardsTable.id, Number(cardId)));
      }

      return c.json(
        {
          ttsAudioId: existing[0].id,
          audioUrl: signedUrl?.signedUrl,
          cached: true,
        },
        200
      );
    }

    // generate new tts audio
    const audioBuffer = await generateAudio(text, language);

    // upload new audio to supabase storage
    // const audioBuffer = await elevenLabsResponse.arrayBuffer();
    const timestamp = Date.now();
    const path = `${language}/${timestamp}.mp3`;

    const { error } = await supabaseAdmin.storage
      .from(AUDIO_BUCKET)
      .upload(path, audioBuffer, {
        contentType: "audio/mpeg",
        upsert: false,
      });

    if (error) {
      console.error("TTS upload error:", error);
      return c.json({ error: error.message }, 400);
    }

    // store path to bucket/audio in db
    const [newTtsAudio] = await db
      .insert(ttsAudioTable)
      .values({
        text,
        language,
        audioUrl: path,
        voiceId: VOICE_ID,
      })
      .returning();

    // if existing card, update card tts column
    // otherwise, add on create
    if (cardId && cardId !== "new") {
      await db
        .update(cardsTable)
        .set({ ttsAudioId: newTtsAudio.id })
        .where(eq(cardsTable.id, Number(cardId)));
    }

    // get signed playback url
    const { data: signedUrl } = await supabaseAdmin.storage
      .from(AUDIO_BUCKET)
      .createSignedUrl(path, 60 * 60 * 24 * 7); // expires in 7 days, but fetches new url each api call

    return c.json(
      {
        ttsAudioId: newTtsAudio.id,
        audioUrl: signedUrl?.signedUrl,
        cached: false,
      },
      200
    );
  } catch (err) {
    console.error("Error uploading tts audio", err);
    return c.json({ error: "Server error" }, 500);
  }
});

export default tts;
