// https://orm.drizzle.team/docs/tutorials/drizzle-with-supabase#query-examples

import { db } from "@db/client";
import { cardsTable, decksTable } from "@db/schema";
import { eq, and } from "drizzle-orm";

// TODO - refactor routes/auth.ts to use drizzle to get user data from db

// get decks
export async function getDecks(userId: string) {
  return await db
    .select()
    .from(decksTable)
    .where(eq(decksTable.userId, userId));
}

// get a deck of cards
export async function getDeckOfCards(userId: string, deckId: string) {
  return await db
    .select()
    .from(cardsTable)
    .where(
      and(eq(cardsTable.deckId, Number(deckId)), eq(cardsTable.userId, userId))
    );
}
