// https://orm.drizzle.team/docs/tutorials/drizzle-with-supabase#query-examples

import { db } from "@db/client";
import { InsertDeck, decksTable } from "@db/schema";
import { eq } from "drizzle-orm";

export async function editDeck(data: InsertDeck, deckId: number) {
  const { userId, title, notes, sourceLanguage, targetLanguage, isPublic } =
    data;
  return await db
    .update(decksTable)
    .set({ userId, title, notes, sourceLanguage, targetLanguage, isPublic })
    .where(eq(decksTable.id, Number(deckId)))
    .returning();
}
