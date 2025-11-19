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
