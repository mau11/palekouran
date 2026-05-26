// https://orm.drizzle.team/docs/tutorials/drizzle-with-supabase#delete-data

import { db } from "@db/client";
import { and, eq } from "drizzle-orm";
import { InsertCard, InsertDeck, cardsTable, decksTable } from "@db/schema";

export async function deleteDeck(userId: string, id: InsertDeck["id"]) {
  return await db
    .delete(decksTable)
    .where(and(eq(decksTable.id, id), eq(decksTable.userId, userId)))
    .returning();
}

export async function deleteCard(
  deckId: InsertDeck["id"],
  cardId: InsertCard["id"]
) {
  return await db
    .delete(cardsTable)
    .where(and(eq(cardsTable.id, cardId), eq(cardsTable.deckId, deckId)));
}
