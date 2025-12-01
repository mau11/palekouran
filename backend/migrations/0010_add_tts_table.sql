CREATE TABLE "tts_audio" (
	"id" serial PRIMARY KEY NOT NULL,
	"text" text NOT NULL,
	"language" text NOT NULL,
	"audio_url" text NOT NULL,
	"voice_id" text,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "tts_audio" ENABLE ROW LEVEL SECURITY;--> statement-breakpoint
CREATE INDEX "tts_text_language_idx" ON "tts_audio" USING btree ("text","language");