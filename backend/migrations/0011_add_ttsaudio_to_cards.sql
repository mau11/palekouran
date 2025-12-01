ALTER TABLE "cards" ADD COLUMN "tts_audio_id" integer;--> statement-breakpoint
ALTER TABLE "cards" ADD CONSTRAINT "cards_tts_audio_id_tts_audio_id_fk" FOREIGN KEY ("tts_audio_id") REFERENCES "public"."tts_audio"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "cards_tts_audio_idx" ON "cards" USING btree ("tts_audio_id");