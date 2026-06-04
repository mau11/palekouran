// https://orm.drizzle.team/docs/tutorials/drizzle-with-supabase#query-examples

import { db } from "@db/client";
import { InsertCard, InsertDeck, cardsTable, decksTable } from "@db/schema";
import { and, eq } from "drizzle-orm";

export async function editDeck(
  userId: string,
  deckId: number,
  data: Pick<
    InsertDeck,
    "title" | "notes" | "sourceLanguage" | "targetLanguage" | "isPublic"
  >
) {
  const { title, notes, sourceLanguage, targetLanguage, isPublic } = data;
  return await db
    .update(decksTable)
    .set({ title, notes, sourceLanguage, targetLanguage, isPublic })
    .where(and(eq(decksTable.id, deckId), eq(decksTable.userId, userId)))
    .returning();
}

export async function editCard(
  userId: string,
  data: Pick<
    InsertCard,
    | "id"
    | "deckId"
    | "word"
    | "translation"
    | "definition"
    | "notes"
    | "audioUrl"
    | "category"
  >
) {
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
    .where(
      and(
        eq(cardsTable.id, id),
        eq(cardsTable.deckId, deckId),
        eq(cardsTable.userId, userId)
      )
    )
    .returning();
}
