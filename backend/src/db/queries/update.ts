// https://orm.drizzle.team/docs/tutorials/drizzle-with-supabase#query-examples

import { db } from "@db/client";
import { InsertCard, InsertDeck, cardsTable, decksTable } from "@db/schema";
import { and, eq } from "drizzle-orm";

export async function editDeck(data: InsertDeck, deckId: number) {
  const { title, notes, sourceLanguage, targetLanguage, isPublic } = data;
  return await db
    .update(decksTable)
    .set({ title, notes, sourceLanguage, targetLanguage, isPublic })
    .where(eq(decksTable.id, Number(deckId)))
    .returning();
}

export async function editCard(data: InsertCard) {
  const {
    id,
    deckId,
    word,
    translation,
    definition,
    notes,
    audioUrl,
    category,
  } = data;
  return await db
    .update(cardsTable)
    .set({
      word,
      translation,
      definition,
      notes,
      audioUrl,
      category,
    })
    .where(and(eq(cardsTable.id, id), eq(cardsTable.deckId, deckId)))
    .returning();
}
