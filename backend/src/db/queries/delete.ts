// https://orm.drizzle.team/docs/tutorials/drizzle-with-supabase#delete-data

import { db } from "@db/client";
import { and, eq } from "drizzle-orm";
import { InsertCard, InsertDeck, cardsTable, decksTable } from "@db/schema";

export function ownedCardFilter(
  userId: string,
  deckId: InsertDeck["id"],
  cardId: InsertCard["id"]
) {
  return and(
    eq(cardsTable.id, cardId),
    eq(cardsTable.deckId, deckId),
    eq(cardsTable.userId, userId)
  );
}

export async function deleteDeck(userId: string, id: InsertDeck["id"]) {
  return await db
    .delete(decksTable)
    .where(and(eq(decksTable.id, id), eq(decksTable.userId, userId)))
    .returning();
}

export async function deleteCard(
  userId: string,
  deckId: InsertDeck["id"],
  cardId: InsertCard["id"]
) {
  return await db
    .delete(cardsTable)
    .where(ownedCardFilter(userId, deckId, cardId))
    .returning();
}
