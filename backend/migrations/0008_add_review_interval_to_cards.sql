ALTER TABLE "cards" ADD COLUMN "next_review_at" timestamp DEFAULT now();--> statement-breakpoint
ALTER TABLE "cards" ADD COLUMN "interval" integer DEFAULT 1;