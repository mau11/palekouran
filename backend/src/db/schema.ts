// https://supabase.com/docs/guides/database/drizzle
// https://orm.drizzle.team/docs/indexes-constraints#indexes

import {
  boolean,
  index,
  integer,
  pgTable,
  serial,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";

// USERS
export const usersTable = pgTable("users", {
  id: text("id").primaryKey(),
  username: text("username").notNull(),
  email: text("email").notNull(),
  nativeLanguage: text("native_language").default("en"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .notNull()
    .$onUpdate(() => new Date()),
}).enableRLS(); // enable Row-Level Security - https://supabase.com/docs/guides/database/postgres/row-level-security

export type InsertUser = typeof usersTable.$inferInsert;
export type SelectUser = typeof usersTable.$inferSelect;

// DECKS
export const decksTable = pgTable(
  "decks",
  {
    id: serial("id").primaryKey(), // serial auto-increments
    userId: text("user_id")
      .notNull()
      .references(() => usersTable.id, { onDelete: "cascade" }),
    title: varchar("title", { length: 80 }).notNull(),
    notes: text("notes"),
    sourceLanguage: text("source_language").notNull(),
    targetLanguage: text("target_language").notNull(),
    isPublic: boolean("is_public").default(false), // TODO - support sharing decks
    totalCards: integer("total_cards").default(0),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at")
      .defaultNow()
      .notNull()
      .$onUpdate(() => new Date()),
  },
  (table) => [
    index("user_id_idx").on(table.userId),
    index("language_idx").on(table.targetLanguage),
  ]
).enableRLS();

export type InsertDeck = typeof decksTable.$inferInsert;
export type SelectDeck = typeof decksTable.$inferSelect;

// CARDS
export const cardsTable = pgTable(
  "cards",
  {
    id: serial("id").primaryKey(),
    deckId: integer("deck_id")
      .notNull()
      .references(() => decksTable.id, { onDelete: "cascade" }),
    userId: text("user_id")
      .notNull()
      .references(() => usersTable.id, { onDelete: "cascade" }),
    word: text("word").notNull(),
    translation: text("translation").notNull(),
    definition: text("definition"),
    notes: text("notes"), // user notes or examples for context
    audioUrl: text("audio_url"), // url to user's audio recording
    ttsAudioId: integer("tts_audio_id").references(() => ttsAudioTable.id),
    category: varchar("category", { length: 50 }), // food, travel, shopping etc
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at")
      .defaultNow()
      .notNull()
      .$onUpdate(() => new Date()),
    nextReviewAt: timestamp("next_review_at").defaultNow(),
    interval: integer("interval").default(1), // in days
  },
  (table) => [
    index("cards_deck_id_idx").on(table.deckId),
    index("cards_user_id_idx").on(table.userId),
    index("cards_category_idx").on(table.category),
    index("cards_tts_audio_idx").on(table.ttsAudioId),
  ]
).enableRLS();

export type InsertCard = typeof cardsTable.$inferInsert;
export type SelectCard = typeof cardsTable.$inferSelect;

// CARD REVIEWS
export const cardReviewsTable = pgTable(
  "card_reviews",
  {
    id: serial("id").primaryKey(),
    cardId: integer("card_id")
      .notNull()
      .references(() => cardsTable.id, { onDelete: "cascade" }),
    userId: text("user_id")
      .notNull()
      .references(() => usersTable.id, { onDelete: "cascade" }),
    rating: varchar("rating", { length: 20 }).notNull(), // "easy", "okay", "hard"
    reviewedAt: timestamp("reviewed_at").defaultNow().notNull(),
  },
  (table) => [index("card_reviews_user_id_idx").on(table.userId)]
).enableRLS();

export type InsertCardReview = typeof cardReviewsTable.$inferInsert;
export type SelectCardReview = typeof cardReviewsTable.$inferSelect;

// TTS AUDIO
export const ttsAudioTable = pgTable(
  "tts_audio",
  {
    id: serial("id").primaryKey(),
    text: text("text").notNull(),
    language: text("language").notNull(),
    audioUrl: text("audio_url").notNull(), // url to tts's audio recording
    voiceId: text("voice_id"), // ElevenLabs voice id used
    createdAt: timestamp("created_at").defaultNow().notNull(),
  },
  (table) => [
    index("tts_text_language_idx").on(table.text, table.language), // find existing audio by text + language
  ]
).enableRLS();

export type InsertTtsAudio = typeof ttsAudioTable.$inferInsert;
export type SelectTtsAudio = typeof ttsAudioTable.$inferSelect;
