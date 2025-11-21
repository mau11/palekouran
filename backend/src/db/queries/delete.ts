// https://orm.drizzle.team/docs/tutorials/drizzle-with-supabase#delete-data

import { db } from "@db/client";
import { eq } from "drizzle-orm";
import { InsertDeck, decksTable } from "@db/schema";

export async function deleteDeck(id: InsertDeck["id"]) {
  return await db.delete(decksTable).where(eq(decksTable.id, id));
}
