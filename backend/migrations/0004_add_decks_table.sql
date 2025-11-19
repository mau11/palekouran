CREATE TABLE "decks" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"title" varchar(80) NOT NULL,
	"notes" text,
	"source_language" text NOT NULL,
	"target_language" text NOT NULL,
	"is_public" boolean DEFAULT false,
	"total_cards" integer DEFAULT 0,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "decks" ADD CONSTRAINT "decks_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "user_id_idx" ON "decks" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "language_idx" ON "decks" USING btree ("target_language");